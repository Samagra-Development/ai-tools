# Use an official Python runtime as a parent image
FROM python:3.9-slim

WORKDIR /app

# Install system packages required for building kenlm
RUN apt-get update && apt-get install -y cmake g++ zlib1g-dev

# Install requirements
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# Install kenlm using pip
RUN pip3 install https://github.com/kpu/kenlm/archive/master.zip
RUN apt-get update && apt-get install -y wget

# Download the files using wget
RUN wget "https://drive.google.com/uc?export=download&id=1frSw5-qfRMgrYs4QL961s2yYuq2KplEM" -O '5gram_model.bin'
RUN wget "https://drive.google.com/uc?export=download&id=1o31Z4TZbAOEt6E8Rx7VMONJOGJH-5Mwk" -O 'lexicon.txt'

# Copy the rest of the application code to the working directory
COPY . /app/

EXPOSE 8000

# Set the entrypoint for the container
CMD ["hypercorn", "--bind", "0.0.0.0:8000", "api:app"]
