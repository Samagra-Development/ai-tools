# Use an official Python runtime as a parent image
FROM python:3.9-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install requirements
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

RUN apt-get update && apt-get install -y wget
# Download necessary files
RUN gdown "https://drive.google.com/uc?id=1VlLcGWmDKAoK3aUthVXOFxzOdgzf-SNo" -O Testing1.csv

# Clone necessary repositories
RUN apt-get update && apt-get install -y git
RUN git clone https://huggingface.co/GautamR/colbert_agri_embeddings

# Copy the rest of the application code to the working directory
COPY . /app/
EXPOSE 8000
# Set the entrypoint for the container
CMD ["hypercorn", "--bind", "0.0.0.0:8000", "api:app"]
