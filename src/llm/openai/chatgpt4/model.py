import os
import openai
import openai_async
from cache import AsyncTTL
from .request import ModelRequest
from tenacity import retry, wait_random_exponential, stop_after_attempt
from rebuff import Rebuff

openai.api_key = os.getenv("OPENAI_API_KEY")

# Set up Rebuff with your playground.rebuff.ai API key, or self-host Rebuff 
rb = Rebuff(api_token="<your_rebuff_api_token>", api_url="https://alpha.rebuff.ai")


class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    @AsyncTTL(time_to_live=600000, maxsize=1024)
    @retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(6))
    async def inference(self, request: ModelRequest):
        user_input = request.prompt
        detection_metrics, is_injection = rb.detect_injection(user_input)

        if is_injection:
            print("Possible injection detected. Take corrective action.")
        response = await openai_async.chat_complete(
            openai.api_key,
            timeout=20000,
            payload={
                "model": "gpt-4",
                "temperature": 0,
                "messages": request.prompt,
            },
        )
        return response.json()
