from cache import AsyncTTL
from request import ModelRequest
import json
import requests



class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    @AsyncTTL(time_to_live=600000, maxsize=1024)
    async def inference(self, request: ModelRequest):
        url = "https://nmt-api.ai4bharat.org/translate_sentence"
        payload = json.dumps({
            "text": request.text,
            "source_language": request.source_language,
            "target_language": request.target_language
        })
        headers = {
            'authority': 'nmt-api.ai4bharat.org',
            'accept': '*/*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'content-type': 'application/json',
            'origin': 'https://models.ai4bharat.org',
            'referer': 'https://models.ai4bharat.org/',
            'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
        }

        response = requests.post(url, headers=headers, data=payload)
        resp = response.json()
        print(resp)
        return {"translated": resp["text"], "success": True}
