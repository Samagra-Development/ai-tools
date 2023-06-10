from cache import AsyncTTL
from .request import ModelRequest
import io
import requests
import json
import os
import uuid
import re

# Specify the path to your JSON file
json_file_path = 'odia_pests.json'

# Open the JSON file and load its contents into a dictionary
with open(json_file_path, 'r+b') as file:
    data_dict = json.load(file)

# precompute the pattern to match using the noun translation dictionary
keys = (re.escape(k) for k in data_dict.keys())
pattern = re.compile('|'.join(keys))

def check_phrases(sentence, phrases):
    for key in phrases:
        if key in sentence:
            return key
    return None

# wrapper function to wrap every instance of original word to its target translation
# example:       <mstrans:dictionary translation=target>original</mstrans:dictionary>
def wrap_phrases(sentence, phrases, pattern):
    result = pattern.sub(lambda x: '<mstrans:dictionary translation=' + phrases[x.group()] + '>' + x.group() + '</mstrans:dictionary>', sentence)
    return result

class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            # Set up service account credentials
            cls.endpoint = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0'
            cls.subscription_key = os.getenv("AZURE_TRANSLATE_KEY")
            print(cls.subscription_key)
            cls.headers = {
                'Ocp-Apim-Subscription-Key': cls.subscription_key,
                'Content-type': 'application/json',
                'Ocp-Apim-Subscription-Region': 'southeastasia',
                'X-ClientTraceId': str(uuid.uuid4())
            }

            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    async def inference(self, request: ModelRequest):
        # current implementation for or -> en translation only. I guess this will be updated to a general scheme for multiple languages later.
        params = '&to=' + request.target_language
        if request.source_language == 'or' and request.target_language == 'en':
            body = [{'text': wrap_phrases(request.text, data_dict, pattern)}]
        else:
            body = [{'text': request.text}]
        print(self.headers)
        request = requests.post(self.endpoint + params, headers=self.headers, data=json.dumps(body))
        print('bruh' + request.text)
        response = request.json()

        print(response)

        translated_text = response[0]['translations'][0]['text']
        print(translated_text)

        return {
            "success": True,
            "translated": translated_text
        }
