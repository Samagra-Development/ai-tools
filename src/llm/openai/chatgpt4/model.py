import os
import openai
import openai_async
from cache import AsyncTTL
from request import ModelRequest
from tenacity import retry, wait_random_exponential, stop_after_attempt

openai.api_key = os.getenv("OPENAI_API_KEY")


class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    @retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(6))
    async def inference(self, request: ModelRequest):
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
