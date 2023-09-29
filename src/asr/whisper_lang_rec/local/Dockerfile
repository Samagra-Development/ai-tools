# Use an official Python runtime as a parent image
FROM python:3.9-slim

WORKDIR /app

# Install requirements
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# Update aptitude with new repo info, and install FFmpeg
RUN apt-get update \
    && apt-get install -y ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the rest of the application code to the working directory
COPY . /app/
EXPOSE 8000

# Set the entrypoint for the container
CMD ["hypercorn", "--bind", "0.0.0.0:8000", "api:app"]
