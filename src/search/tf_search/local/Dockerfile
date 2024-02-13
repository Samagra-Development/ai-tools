# Use an official Python runtime as a parent image
FROM python:3.9-slim

WORKDIR /app

#install requirements
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# Download the CSV from Google Drive and store it in the "content" directory
RUN apt-get update && apt-get install -y curl && \
    mkdir content && \
    curl -L 'https://drive.google.com/uc?export=download&id=13aDWCvj7PqFw7aPvPK_Qli3-Ei9mVwaO' -o content/data.csv && \
    apt-get remove -y curl && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

# Copy the rest of the application code to the working directory
COPY . /app/
EXPOSE 8000

# Set the entrypoint for the container
CMD ["hypercorn", "--bind", "0.0.0.0:8000", "api:app"]
