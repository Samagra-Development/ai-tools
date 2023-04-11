import os
import openai
import openai_async
from cache import AsyncTTL
from .request import ModelRequest

openai.api_key = os.getenv("OPENAI_API_KEY")


class Model:
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    @AsyncTTL(time_to_live=600000, maxsize=1024)
    async def inference(self, request: ModelRequest):
        response = await openai_async.chat_complete(
            openai.api_key,
            timeout=20000,
            payload={
                "model": "gpt-3.5-turbo-0301",
                "temperature": 0,
                "messages": request.prompt,
            },
        )
        return response.json()
