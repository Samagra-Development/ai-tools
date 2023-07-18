# Use an official Python runtime as a parent image
FROM python:3.9-slim

WORKDIR /app

# Copy the .env file to the container
COPY .env /app/.env

# Set environment variables from .env file
ENV $(cat .env | xargs)

# Install Hypercorn
RUN pip3 install hypercorn

# Install requirements
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . /app/

EXPOSE 5000

# Set the entrypoint for the container
CMD ["hypercorn", "--bind", "0.0.0.0:5000", "api:app"]