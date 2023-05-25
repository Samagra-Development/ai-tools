# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory to /app
WORKDIR /app

# Copy the poetry.lock and pyproject.toml files to the working directory
COPY poetry.lock pyproject.toml /app/

# Install dependencies using Poetry
RUN pip install poetry && \
    poetry config virtualenvs.create false && \
    poetry install --no-dev --no-root

# Copy the rest of the application code to the working directory
COPY . /app/

# Expose the necessary port(s) for the application
EXPOSE 8000
