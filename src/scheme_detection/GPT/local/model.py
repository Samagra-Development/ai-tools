import openai
import os
import requests
import json
from request import ModelRequest
import urllib.parse

openai.api_key = os.getenv("OPENAI_API_KEY")

query_def=  ''' For the given json schema
"properties": {
    "gender": {
       "enum": ["Male", "Female","Transgender"]
    },
    "age-obc": {
      "type": "number"
    },
    "residence": {
      "type": "string"
    },
    "caste": {
	  "enum": ["General", "SC", "ST", "Other Backward Class (OBC)"]
    },
    "disability": {
      "type": "boolean"
    },
    "isStudent": {
      "type": "boolean"
    },

    "isGovEmployee": {
      "type": "boolean"
    },
    "isBpl": {
      "type": "boolean"
    },
    "isEconomicDistress": {
      "type": "boolean"
    },
    "minority": {
      "type": "boolean"
    },
    "disabilitypercentage": {
      "type": "number"
    },
    "familyIncomeAnnual": {
      "type": "number"
    },
    "IndividualIncomeAnnual": {
      "type": "number"
    }, "required": [
    "age",
    "gender",
    "caste"
  ]
  }

Convert a an Indian user question to a dictionary file similar to an example shared that helps search the scheme DB for the required scheme.
The dictionary created requires the fields mentioned as required. Rest are optional
enum mens you can pick values only from the given list. Make sure you dont pick other values. for example caste can only be one of  ["General", "SC", "ST", "Other Backward Class (OBC)"]
Make assumptions wherever necessary. Assume numbers to be 0 where not given except for age.  Always assume age as 19 if no detail is given.
{"gender": "Male",
    "age-obc": 10,
    "residence": "Rural",
    "caste": "General",
    "caste": "All",
    "disability": false,
    "isStudent": false,
    "isGovEmployee": false,
    "occupation": "Data scientist",
    "isBpl": true,
    "isEconomicDistress": false,
    "minority": false,
    "residence": "Both",
    "gender": "All",
    "caste": "All",
    "disabilitypercentage":  10,
    "familyIncomeAnnual":  2200,
    "IndividualIncomeAnnual": 2200}


 '''


general_append = [{"identifier": "gender", "value": "All"},
                  {"identifier": "caste", "value": "All"},
                  {"identifier": "residence", "value": "Both"},
                  {"identifier": "isGovEmployee", "value": "No"},
                  {"identifier": "isBpl", "value": "No"},
                  ]


payload = {}
headers = {
  'authority': 'api.myscheme.in',
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'en-US,en;q=0.9',
  'origin': 'https://www.myscheme.gov.in',
  'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'cross-site',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  'x-api-key': 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc'
}


class Scheme_dicovery():
    def custom_quote(self, string):
        encoded = ""
        for char in string:
            if char in ("(", ")"):
                encoded += char
            else:
                encoded += urllib.parse.quote(char)
        return encoded

    def convert_to_url(self, lst):
        encoded_lst = self.custom_quote(json.dumps(lst))
        base_url = "https://api.myscheme.in/search/v2/schemes"
        params = f"?lang=en&q={encoded_lst}&keyword=&sort=&from=0&size=10"
        url = urllib.parse.urljoin(base_url, params)
        return url

    def dictionary_to_scheme(self, dict_scheme):
        url = self.convert_to_url(dict_scheme)
        response = requests.request("GET", url, headers=headers, data=payload)
        result_json = json.loads(response.text)
        scheme_results = result_json['data']['hits']['items']
        return scheme_results, result_json

    def create_formatted_list(self, dict_returned):
        list_of_dic = []
        for i in dict_returned.keys():
            if type(dict_returned[i]) is int:
                dic_created = {"identifier": i, "min": dict_returned[i], "max": dict_returned[i]}
            elif type(dict_returned[i]) is bool:
                if dict_returned[i]:
                    dic_created = {"identifier": i, "value": "Yes"}
                else:
                    dic_created = {"identifier": i, "value": "No"}
            else:
                dic_created = {"identifier": i, "value": dict_returned[i]}
            list_of_dic.append(dic_created)
        return list_of_dic

    def append_gen_categories(self, q, general_append):
        for i in general_append:
            q.append(i)
        return q

    def answer_user_prompts(self, user_question):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": 'You are a coding assistant who helps with providing dictionaries as response succinctly.' + query_def},
                      {"role": "user", "content": "User question: " + user_question}
                      ],
            temperature=0
        )
        return response["choices"][0]["message"]["content"]
  

class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        cls.scheme_discovery = Scheme_dicovery()  # Instantiating the Scheme_dicovery class
        return cls.instance
    
    async def inference(self,  request: ModelRequest):
        user_question = request.text
        #user_question = " I am  a Muslim boy"
        response = self.scheme_discovery.answer_user_prompts(user_question)
        dict_returned =  json.loads(response.replace("\n",""))
        scheme_list =  self.scheme_discovery.create_formatted_list(dict_returned)
        scheme_list = self.scheme_discovery.append_gen_categories (scheme_list, general_append)
        schemes,output = self.scheme_discovery.dictionary_to_scheme ( scheme_list )
        slug_list =  [{ "link":  "https://www.myscheme.gov.in/schemes/" +  schemes[i]['fields']['slug'] , "name" : schemes[i]['fields']['schemeName'],"description":  schemes[i]['fields']['briefDescription']}   for i in range(0,len(schemes)) ]
        return slug_list