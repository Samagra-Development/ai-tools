# Use an official Python runtime as a parent image
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . /app/

# Set the entrypoint for the container
ENTRYPOINT ["hypercorn", "api", "-b", "0.0.0.0"]

