# AI Toolchain
This is a collection of AI tools that can be used to quickly build and deploy machine learning models for various use cases. Currently, there is a text translation model available, and more models may be added in the future.

## How to Run
To deploy all the models, simply execute the deploy.sh script located in the root folder. This script calls the deployment files of each model. Note that we may switch to using Docker in the future for deployment.

To create a new model class, use the template_batch_model.py file as a starting point. Your new model class should implement the method mentioned in the template file.

To create a new request class, use the template_model_request.py file as a starting point. This class is used to map the incoming request to the data needed by the model.

To add your new model and request to the API, modify the repository dictionary in api.py.

## Repository
This repository is available on GitHub. Contributions are welcome, and we encourage you to submit pull requests with your own models and improvements to the existing ones.