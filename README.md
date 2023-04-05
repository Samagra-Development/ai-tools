# aitools
"AI Tooling to bootstrap applications fast"

## Steps to Run
Execute deploy.sh in root folder, it is run for deploying all the models. It calls each of the deployment files of the model, maybe switch to Docker in future\
There is a text_translation model already present \
Create model class using template_batch_model.py, it should implemnt the method mentioned \
Create request class using template_model_request.py, it is used to map the incoming request to the data needed by the model \
Mention the models and request in repository dictionary in api.py