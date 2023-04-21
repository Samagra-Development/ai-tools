# AI Toolchain
This is a collection of AI tools that can be used to quickly build and deploy machine learning models for various use cases. Currently, there is a text translation model available, and more models may be added in the future.

## How to Run
To deploy all the models, simply execute the deploy.sh script located in the root folder. This script calls the deployment files of each model. Note that we may switch to using Docker in the future for deployment.

To create a new model class, use the template_batch_model.py file as a starting point. Your new model class should implement the method mentioned in the template file.

To create a new request class, use the template_model_request.py file as a starting point. This class is used to map the incoming request to the data needed by the model.

To add your new model and request to the API, modify the repository dictionary in api.py.

## Repository
The repository is structured as follows

## Setup
```shell
python3 -m venv venv
source venv/bin/activate
pip install poetry
poetry install
quart --app api --debug run
```

## Poetry Fixes

```shell
poetry lock --no-update
```