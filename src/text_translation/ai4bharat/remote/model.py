from cache import AsyncTTL
from request import ModelRequest
import json
import requests
import os 

authorization_key = os.getenv("AI4BHARAT_KEY")


class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    @AsyncTTL(time_to_live=600000, maxsize=1024)
    async def inference(self, request: ModelRequest):
        
        url = "https://api.dhruva.ai4bharat.org/services/inference/translation?serviceId=ai4bharat%2Findictrans-v2-all-gpu--t4"
        headers = {
            "Content-Type": "application/json",
            "authorization": authorization_key
        }
        payload = {
            "config": {
                "language": {
                    "sourceLanguage": request.source_language,
                    "targetLanguage": request.target_language
                }
            },
            "input": [
                {
                    "source": request.text
                }
            ]
        }

        response = requests.post(url, headers=headers, json=payload)
        resp = response.json()
        
        return {"translated": resp['output'][0]['target'], "success": True}
