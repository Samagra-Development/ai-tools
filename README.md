# AI Toolchain
AI Toolchain is a collection of tools for quickly building and deploying machine learning models for various use cases. Currently, the toolchain includes a text translation model, and more models may be added in the future.

## How to Run
To deploy all models, simply execute the deploy.sh script located in the root folder. This script calls the deployment files of each model. Note that the toolchain may switch to using Docker in the future for deployment.

To create a new model class, use the template_batch_model.py file as a starting point. Your new model class should implement the method mentioned in the template file.

To create a new request class, use the template_model_request.py file as a starting point. This class is used to map the incoming request to the data needed by the model.

To add your new model and request to the API, modify the repository dictionary in api.py.

## Repository
The repository is structured as follows

## Setup
To set up the AI Toolchain environment, follow these steps:
```shell
python3 -m venv venv
source venv/bin/activate
pip install poetry
poetry install
quart --app api --debug run
```

You can use `/health` endpoint to check if the system is running or not. 

## Poetry Fixes

```shell
poetry lock --no-update
```

## Contributing
Contributions to AI Toolchain are welcome! To contribute, please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Write tests for your changes.
3. Submit a pull request describing your changes and why they are needed.

Thank you for considering contributing to AI Toolchain!