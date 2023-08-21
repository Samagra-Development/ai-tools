from cache import AsyncTTL
from request import ModelRequest
import requests
import json
import os
import uuid
import re
import asyncio
import aiohttp
import logging
logging.basicConfig(level=logging.DEBUG)


class Model:
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            # Set up service account credentials and other setup tasks
            cls.endpoint = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0'
            cls.subscription_key = os.getenv("AZURE_TRANSLATE_KEY")
            cls.headers = {
                'Ocp-Apim-Subscription-Key': cls.subscription_key,
                'Content-type': 'application/json',
                'Ocp-Apim-Subscription-Region': 'southeastasia',
                'X-ClientTraceId': str(uuid.uuid4())
            }
            cls.instance = super(Model, cls).__new__(cls)
            cls.data_dict = {}
        return cls.instance

    @staticmethod
    def wrap_phrases(sentence, phrases, pattern):
        result = pattern.sub(lambda x: '<mstrans:dictionary translation=' + phrases[x.group()] + '>' + x.group() + '</mstrans:dictionary>', sentence)
        return result
    

    @classmethod
    async def update_translation_dictionary(self):
        print("Attempting to fetch translation dictionary...")
        url = 'https://bff.akai.samagra.io/translationdictionary'
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                data = await response.json()
        print(f"Fetched data: {data}")
        Model.data_dict.update({item['source']: item['translation'] for item in data['data'] if item['use']})
        print(f"Updated data_dict: {self.data_dict}")
        await asyncio.sleep(10)


    async def inference(self, request: ModelRequest):
        # Regenerate the pattern based on updated data_dict
        keys = [re.escape(k) for k in self.data_dict.keys()]
        
        pattern = re.compile('|'.join(keys))
        
        self.data_dict = Model.data_dict
        # current implementation for or -> en translation only. 
        params = '&to=' + request.target_language
        if not self.data_dict:
            body = [{'text': request.text}]
        elif request.source_language == 'or' and request.target_language == 'en':
            if pattern.search(request.text):
                body = [{'text': self.wrap_phrases(request.text, self.data_dict, pattern)}]
            else:
                body = [{'text': request.text}]
        else:
            body = [{'text': request.text}]
        
        request = requests.post(self.endpoint + params, headers=self.headers, data=json.dumps(body))
        response = request.json()
        translated_text = response[0]['translations'][0]['text']
        
        return {
            "success": True,
            "translated": translated_text,
            "data_dic" : self.data_dict
        }
