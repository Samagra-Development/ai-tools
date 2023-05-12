#!/bin/bash

git clone https://github.com/AI4Bharat/indicTrans.git
git clone https://github.com/anoopkunchukuttan/indic_nlp_library.git
git clone https://github.com/anoopkunchukuttan/indic_nlp_resources.git
git clone https://github.com/rsennrich/subword-nmt.git
git clone https://github.com/pytorch/fairseq.git
wget https://ai4b-public-nlu-nlg.objectstore.e2enetworks.net/indic2en.zip
unzip indic2en.zip
cd indicTrans
pip install --ignore-installed pexpect
pip install poetry
poetry add gunicorn flask_cors sacremoses pandas mock sacrebleu tensorboardX pyarrow indic-nlp-library mosestokenizer subword-nmt xformers torch==2.0.0 triton flask_cors webvtt-py
poetry add fairseq
