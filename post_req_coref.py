# import aiohttp
# import asyncio
# import json

# async def post_request(url, data):
#     headers = {
#         'Content-Type': 'application/json'
#     }

#     async with aiohttp.ClientSession(headers=headers) as session:
#         async with session.post(url, data=json.dumps(data)) as response:
#             response_data = await response.json()
#             return response_data

# async def main():
#     url = "http://127.0.0.1:5000/coref/spacy/local"
#     data = {
#         "text": "How can I increase the yield of my tomato crop? Using high-quality seeds and proper fertilization techniques can increase tomato yield. When should I apply them?",
#     }

#     response = await post_request(url, data)
#     print(response)

# asyncio.run(main())



import requests

url = "http://127.0.0.1:5000/coref/spacy/local"
headers = {
    'Content-Type': 'application/json'
}
payload = {
    'text': "How can I increase the yield of my tomato crop? Using high-quality seeds and proper fertilization techniques can increase tomato yield. When should I apply them?"
}

response = requests.post(url, headers=headers)

if response.status_code == 200:
    print('POST request was successful!')
    print('Response:', response.json())
else:
    print('POST request failed with status code:', response.status_code)





# async def post_request(url, data):
#     headers = {
#         'Content-Type': 'application/json'
#     }

#     async with aiohttp.ClientSession(headers=headers) as session:
#         async with session.post(url, data=json.dumps(data)) as response:
#             response_data = await response.text()
#             print(response.status, response_data)  # Print the status code and response content
#             return response_data

# asyncio.run(post_request('http://127.0.0.1:5000/coref/spacy/local', "How can I increase the yield of my tomato crop? Using high-quality seeds and proper fertilization techniques can increase tomato yield. When should I apply them?"))
