import os
import openai
import openai_async
from cache import AsyncTTL
from request import ModelRequest
from tenacity import retry, wait_random_exponential, stop_after_attempt

openai.api_key = "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"


class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    @AsyncTTL(time_to_live=600000, maxsize=1024)
    @retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(6))
    async def inference(self, request: ModelRequest):
        messages = [
            {
                "role": "user",
                "content": f"""{{Answer as succinctly as possible}}
Generate 3 sentences in Odia containing the word {request.source} assuming it means the word {request.translation}. The word must be in different positions in the sentence (middle, beginning, end, etc.). Also provide translations for each sentence to English. Give the output in this format:
[["sentence1", "translation1"],
["sentence2", "translation2"],
.
.
.
["sentenceN", "translationN"]]"""
            }
        ]
        response = await openai_async.chat_complete(
            openai.api_key,
            timeout=20000,
            payload={
                "model": "gpt-3.5-turbo-0301",
                "temperature": 0.5,
                "messages": messages,
            },
        )
        try:
            gpt_text = response.json()["choices"][0]["message"]["content"]
            gpt_text = ''.join(gpt_text.split('\n'))
            sentence_translations = json.loads(gpt_text)
            return {"sentence_translations": sentence_translations}
        except:
            return response.json()