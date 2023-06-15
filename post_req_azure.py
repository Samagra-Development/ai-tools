import requests

url = 'http://127.0.0.1:5000/dictionary_augmented_text_translation/azure/remote'
headers = {
    'Content-Type': 'application/json',
    'AUTH_HEADER_KEY': 'Authorization',
    'AUTH_HEADER': '"$AZURE_TRANSLATE_KEY"'
}
payload = {
    'text': 'ମାଟିରେ ଯଥେଷ୍ଟ ବତର ଥିଲେ ସେହି ସମୟରେ ଜଳସେଚନର ଆବଶ୍ୟକତା ନଥାଏ',
    'source_language': 'or',
    'target_language': 'en'
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    print('POST request was successful!')
    print('Response:', response.json())
else:
    print('POST request failed with status code:', response.status_code)
