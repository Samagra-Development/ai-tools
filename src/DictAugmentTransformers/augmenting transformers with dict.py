import pandas as pd 
import numpy as np 
import json
import os
from dotenv import load_dotenv
import requests
import re
import uuid

# Load variables from .env file
load_dotenv()

api_key  = os.getenv("AZURE_TRANSLATE_KEY")

# Specify the path to your JSON file
json_file_path = 'odia_pests.json'

# Open the JSON file and load its contents into a dictionary
with open(json_file_path) as file:
    data_dict = json.load(file)

    

input_text =  'ବିଲେଇମାନେ ପତ୍ର ଖାଉଛନ୍ତି |'

def translate_api( input_text, model_type, api_key = '' ):

  if model_type == 'bhashini':

    url = "https://nmt-api.ai4bharat.org/translate_sentence"
    payload = {
        "text": input_text,
        "source_language": 'or',
        "target_language": 'en'
    }
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

    response = requests.post(url, headers=headers, data=json.dumps(payload))
    resp = response.json()['text']

  if model_type == 'azure':
    endpoint = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0'
    headers = {
        'Ocp-Apim-Subscription-Key': api_key,
        'Content-type': 'application/json',
        'Ocp-Apim-Subscription-Region': 'southeastasia',
        'X-ClientTraceId': str(uuid.uuid4())
    }

    params = '&to=' + 'en'
    body = [{'text': input_text}]
    response = requests.post(endpoint + params, headers=headers, data=json.dumps(body))

    resp = response.json()[0]['translations'][0]['text']


  return(resp)


def check_phrases(sentence, phrases):
    for key in phrases:
        if key in sentence:
            return key
    return None
    
def replace_between_symbols(sentence, replacement_word):
    pattern = r'\+(.*?)\+'

    # Find all matches
    matches = re.findall(pattern, sentence)

    # Replace each match with the replacement word
    for match in matches:
        sentence = sentence.replace("+" + match + "+", replacement_word)

    return sentence
    
    

sentence =  "ଗୋଲକାଣ୍ଠୀ ପୋକେ ଦ୍ୱାରା ଆକ୍ରମଣକୁ କିପରି ରୋକାଯାଇପାରିବ |"

matched_key = check_phrases(sentence, data_dict)
new_sentence =  sentence.replace(matched_key, "+"+ matched_key + "+")
translate_api(new_sentence, 'azure', api_key)
replace_between_symbols( translate_api(new_sentence, 'azure', api_key), data_dict[matched_key])