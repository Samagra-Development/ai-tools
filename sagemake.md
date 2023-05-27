# Sagemaker Deployment Guide for AI Toolchain

This guide will walk you through the process of deploying machine learning models from the AI Toolchain repository using Amazon SageMaker. AI Toolchain is a collection of tools for building and deploying machine learning models, and it currently includes a text translation model.

## Prerequisites
Before getting started, make sure you have the following:

- An AWS account with appropriate permissions to create and manage SageMaker resources.
- The AWS Command Line Interface (CLI) installed and configured on your local machine.
- Basic knowledge of machine learning model deployment and Amazon SageMaker.

## Step 1: Set up the AI Toolchain Environment
To set up the AI Toolchain environment, follow these steps:

1. Clone the AI Toolchain repository:
```shell
git clone https://github.com/your-username/ai-toolchain.git
```

2. Change into the repository directory:
```shell
cd ai-toolchain
```

3. Create a Python virtual environment:
```shell
python3 -m venv venv
```

4. Activate the virtual environment:
- On macOS and Linux:
  ```
  source venv/bin/activate
  ```
- On Windows:
  ```
  venv\Scripts\activate
  ```

5. Install the required dependencies using Poetry:
```shell
pip install poetry
poetry install
```

6. Run the AI Toolchain API locally for testing:
```shell
quart --app api --debug run
```

## Step 2: Prepare the Model for Deployment
In this step, you will prepare the machine learning model for deployment on SageMaker. AI Toolchain provides a template file (`template_batch_model.py`) that you can use as a starting point for creating a new model class. Follow these steps:

1. Copy the `template_batch_model.py` file and rename it to reflect your model's name, e.g., `my_model.py`.
2. Open the `my_model.py` file and implement the necessary methods and logic for your specific model.
3. Save your changes.

## Step 3: Create a SageMaker Endpoint
To deploy the model on SageMaker, you need to create a SageMaker endpoint. Follow these steps:

1. Open the AWS Management Console and navigate to the SageMaker service.
2. Click on "Endpoints" in the left navigation menu.
3. Click "Create endpoint" to start the endpoint creation process.
4. Provide a name for your endpoint and select the instance type and count based on your requirements.
5. Under "Model settings," select "Provide model artifacts" and enter the S3 location of your trained model artifacts.
6. Choose "No" for "Enable data capture" unless you specifically require it.
7. Configure other settings as desired and click "Create endpoint."

## Step 4: Update the AI Toolchain API
To integrate your newly created model with the AI Toolchain API, you need to update the repository dictionary in `api.py`. Follow these steps:

1. Open the `api.py` file located in the AI Toolchain repository.
2. Locate the `repository` dictionary.
3. Add an entry for your model, specifying the appropriate model class and request class.
4. Save your changes.

## Step 5: Deploy the Models to SageMaker
To deploy all models to SageMaker, execute the `deploy.sh` script located in the root folder of the AI Toolchain repository. This script calls the deployment files of each model. Follow these steps:

1. Open a terminal or command prompt.
2. Change into the AI Toolchain repository directory if you're not already there.
3. Run the `deploy.sh` script:
```shell
sh deploy.sh
```

The script will iterate through each model in the `repository` dictionary and deploy them to SageMaker as separate endpoints.

## Conclusion
Congratulations! You have successfully deployed the machine learning models from the AI Toolchain repository to Amazon SageMaker. You can now use these models for various use cases. Remember to manage your SageMaker resources appropriately to avoid incurring unnecessary costs.

For more information and advanced SageMaker usage, refer to the [Amazon SageMaker documentation](https://docs.aws.amazon.com/sagemaker/).

Thank you for using AI Toolchain and SageMaker for your machine learning deployment needs!

