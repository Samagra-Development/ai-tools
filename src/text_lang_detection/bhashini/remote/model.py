import os
import openai
import openai_async
from cache import AsyncTTL
from .request import ModelRequest
import json

openai.api_key = os.getenv("OPENAI_API_KEY")


class Model:
    def __new__(cls, context):
        if not hasattr(cls, 'instance'):
            cls.context = context
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    @AsyncTTL(time_to_live=600000, maxsize=1024)
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

        response = await self.context.client.post(url, headers=headers, data=payload)

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
        resp = await response.json()
        return {"language": resp["output"][0]["langPrediction"][0]["langCode"], "success": True}
