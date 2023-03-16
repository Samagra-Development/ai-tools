import json

from .utils import async_request

def translate(text: str, source_lang: str, target_lang: str):
    """
    Translate a text using ai4bharat APIs
    """
    url = "https://nmt-api.ai4bharat.org/translate_sentence"
    payload = json.dumps({
        "text": text,
        "source_language": source_lang,
        "target_language": target_lang
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

    return async_request('POST', url, headers, payload)
    

def detect_lang(text: str, source_lang: str, target_lang: str):
    """
    Translate a text using ai4bharat APIs
    """
    url = "https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/compute"

    payload = json.dumps({
        "modelId": "631736990154d6459973318e",
        "task": "txt-lang-detection",
        "input": [
            {
                "source": text
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

    return async_request('POST', url, headers, payload)
    

