from cache import AsyncTTL
from request import ModelRequest
import io
import requests
import json
import os
import uuid


class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            # Set up service account credentials
            cls.endpoint = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0'
            cls.subscription_key = os.getenv("AZURE_TRANSLATE_KEY")
            cls.headers = {
                'Ocp-Apim-Subscription-Key': cls.subscription_key,
                'Content-type': 'application/json',
                'Ocp-Apim-Subscription-Region': 'southeastasia',
                'X-ClientTraceId': str(uuid.uuid4())
            }

            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    async def inference(self, request: ModelRequest):
        params = '&to=' + request.target_language
        body = [{'text': request.text}]
        request = requests.post(self.endpoint + params, headers=self.headers, data=json.dumps(body))
        print(request.text)
        response = request.json()

        print(response)

        translated_text = response[0]['translations'][0]['text']
        print(translated_text)

        return {
            "success": True,
            "translated": translated_text
        }