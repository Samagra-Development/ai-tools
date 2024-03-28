
FROM python:3.9-slim

WORKDIR /app


#install requirements
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . /app/
EXPOSE 8000
# Set the entrypoint for the container
CMD ["hypercorn", "--bind", "0.0.0.0:8000", "api:app"]
