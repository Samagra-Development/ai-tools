import asyncio
import os
import openai
from request import ModelRequest
from tenacity import retry, wait_random_exponential, stop_after_attempt

openai.api_key = os.getenv("OPENAI_API_KEY")


class Model:
    embedding_df = None
    embedding_model = "text-embedding-ada-002"
    embedding_encoding = "cl100k_base"  # this the encoding for text-embedding-ada-002
    max_tokens = 8000  # the maximum for text-embedding-ada-002 is 8191

    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    @retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(6))
    async def get_embedding(self, text, model):
        embedding = await openai.Embedding.acreate(input=[text], model=model)
        return {"text": text, "embedding": embedding["data"][0]["embedding"]}

    async def inference(self, request: ModelRequest):
        tasks = [self.get_embedding(t, self.embedding_model) for t in request.text]
        e = await asyncio.gather(*tasks)
        return e
