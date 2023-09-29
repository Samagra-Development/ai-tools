from request import ModelRequest
from utils import parse_pdfs
from datetime import date
import requests
import json
import os

secret = os.environ.get('HASURA_ADMIN_SECRET')
token = os.environ.get('AKAI_AUTH_BEARER')


class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance
        
    def inference(self, request: ModelRequest):
        df = parse_pdfs()
        json_df = df.to_dict(orient='records')

        url = 'https://hasura.staging.akai.samagra.io/api/rest/getlastdocumentid'
        headers = {
            'x-hasura-admin-secret': secret
        }
        response = requests.get(url, headers=headers)
        data = json.loads(response.text)
        id = data['document'][0]['id']
        today = date.today()

        data = []
        for item in json_df:
            id += 1
            ob = {
                "id": id,
                "content": str(item),
                "tags": str(today) + " Weather Update"
            }
            data.append(ob)
        
        url = 'https://staging.akai.samagra.io/document'
        headers = {
            'Authorization': f'bearer {token}',
            'Content-Type': 'application/json'
        }

        response = requests.post(url, headers=headers, json=data)
        return {"status_code": response.status_code}
 




