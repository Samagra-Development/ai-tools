# Current Deployment

Currently we have a single Dockerfile and a single api.py file for the complete repository and all the models are packaged as a single docker image.

This limits us to scale a particular model independently, also deploying a new version of a particular model, takes a lot of time.

# Work In Progress

[Track Changes Here](https://github.com/Samagra-Development/ai-tools/tree/restructure)

We are restructuring it in a way such that each model has a separate Dockerfile and api.py file. Each model can be separately packaged as a image. We can deploy all models at once using docker compose and to allow a common endpoint to access any model, we are using nginx as a reverse proxy which proxies the request to given model on the basis of request's base path.

Currently, we are using Docker Swarm as an orchestrator.

# Future Scopes

In future, we are planning to use k8s as a orchestrator.
