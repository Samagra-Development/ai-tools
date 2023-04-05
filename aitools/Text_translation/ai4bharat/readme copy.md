In any nvidia gpu machine, create a folder, drop two files(api_main.py and deploy.sh). \
Run the 'deploy' shell script.
Script will gather all the dependencies and start the API.

There are 3 APIs:

1. Test API to see if API is running

> curl --location 'http://127.0.0.1:8000/'

2. translate_paragraph from any Indian language to English

> curl --location 'http://127.0.0.1:8000/translate_paragraph' \
--header 'Content-Type: application/json' \
--data '{
    "source":"or",
    "target":"en",
    "paragraph": "ବହୁତ ଦିନ ହେଲାଣି ଦେଖା ନାହିଁ"
}'

3. translate batch of sentences from any Indian language to English

> curl --location 'http://127.0.0.1:8000/batch_translate' \
--header 'Content-Type: application/json' \
--header 'Cookie: refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4ODA2Nzc2MywiaWF0IjoxNjc5NDI3NzYzLCJqdGkiOiIzYWViYTliYjc1MzE0NWFlODBlZGQwNTA0MDdmOGVmYyIsInVzZXJfaWQiOjF9.gE9ln1fZrS6CCjWNzr67dk263PiVGVPLqK2DNmw1zX4' \
--data '{
    "source":"or",
    "target":"en",
    "batch": ["ବହୁତ ଦିନ ହେଲାଣି ଦେଖା", "ନାହିଁ"]
}'