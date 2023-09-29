# Use an official Python runtime as a parent image
FROM python:3.9-slim

WORKDIR /app


#install requirements
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN apt-get update && apt-get install -y libgl1-mesa-glx libglib2.0-0
RUN DEBIAN_FRONTEND=noninteractive apt install -y ghostscript python3-tk


# Copy the rest of the application code to the working directory
COPY . /app/
EXPOSE 8000
# Set the entrypoint for the container
CMD ["hypercorn", "--bind", "0.0.0.0:8000", "api:app"]