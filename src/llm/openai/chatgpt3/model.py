import os
import openai
import openai_async
from cache import AsyncTTL
from .request import ModelRequest
from tenacity import retry, wait_random_exponential, stop_after_attempt
from rebuff import Rebuff
import guardrails as gd

rail_str = """
    <rail version="0.1">

    <output>
        <string name="text" description="The generated text"/>
    </output>

    <prompt>
    </prompt>

    <instructions>
    You are a helpful assistant made to answer the questions posed
    </instructions>

    </rail>
"""

openai.api_key = os.getenv("OPENAI_API_KEY")

# Set up Rebuff with your playground.rebuff.ai API key, or self-host Rebuff 
rb = Rebuff(api_token="<your_rebuff_api_token>", api_url="https://alpha.rebuff.ai")
guard = gd.Guard.from_rail_string(rail_str)

class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    # @AsyncTTL(time_to_live=600000, maxsize=1024)
    @retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(6))
    async def inference(self, request: ModelRequest):
        user_input = request.prompt
        detection_metrics, is_injection = rb.detect_injection(user_input)

        if is_injection:
            print("Possible injection detected. Take corrective action.")
        response,validated_output = await guard(openai_async.chat_complete(
            openai.api_key,
            timeout=20000,
            payload={
                "model": "gpt-3.5-turbo-0301",
                "temperature": 1,
                "messages": request.prompt,
                },
            )
        )
        return response.json()
