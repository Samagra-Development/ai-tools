#!/bin/bash

python3 -m venv venv
source venv/bin/activate
cd ./src/text_translation/ai4bharat & sh deploy.sh & cd .. & cd ..
gunicorn api:app --workers 5 --timeout 600