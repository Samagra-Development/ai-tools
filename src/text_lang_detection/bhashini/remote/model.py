from cache import AsyncTTL
from request import ModelRequest
import json
from tenacity import retry, wait_random_exponential, stop_after_attempt
import requests



class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    @AsyncTTL(time_to_live=600000, maxsize=1024)
    @retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(6))
    async def inference(self, request: ModelRequest):
        url = "https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/compute"

        payload = json.dumps({
            "modelId": "631736990154d6459973318e",
            "task": "txt-lang-detection",
            "input": [
                {
                    "source": request.text
                }
            ],
            "userId": None
        })
        headers = {
            'authority': 'meity-auth.ulcacontrib.org',
            'accept': '*/*',
            'content-type': 'application/json',
            'origin': 'https://bhashini.gov.in'
        }

        response = requests.post(url, headers=headers, data=payload)

        # {
        #     "output": [
        #         {
        #             "source": "महात्मा गांधी का जन्म कहाँ हुआ था?",
        #             "langPrediction": [
        #                 {
        #                     "langCode": "hi",
        #                     "ScriptCode": null,
        #                     "langScore": 100
        #                 }
        #             ]
        #         }
        #     ],
        #     "config": null
        # }
        resp = response.json()
        return {"language": resp["output"][0]["langPrediction"][0]["langCode"], "success": True}
