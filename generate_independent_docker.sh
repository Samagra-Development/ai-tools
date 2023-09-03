#!/bin/bash
source .generate.env
# Install jq based on the operating system
os_name=$(uname -s)
if [ "$os_name" == "Darwin" ]; then
    brew install jq
else
    sudo apt-get install jq
fi

# Get the number of models from the config.json file
count=$(jq '.models | length' config.json)

# Generate docker-compose.yaml file
printf "version: '3'\nservices:\n" > docker-compose-independent-generated.yaml

# Loop through each model
for ((i=0; i<$count; i++)); do
    # Get model details from config.json
    serviceName=$(jq -r ".models[$i].serviceName" config.json)
    modelBasePath=$(jq -r ".models[$i].modelBasePath" config.json)
    apiBasePath=$(jq -r ".models[$i].apiBasePath" config.json)
    containerPort=$(jq -r ".models[$i].containerPort" config.json)

    countConstraints=$(jq ".models[$i].constraints | length" config.json)

    # Calculate the exposed port for the model
    exposedPort=$((8000 + i))

    # Get environment variables for the model
    environment=($(jq -r ".models[$i].environment | keys[]" config.json))

    # Add service details to docker-compose.yaml
    printf "  ${serviceName}:\n    image: ${DOCKER_REGISTRY_URL}/${GITHUB_REPOSITORY_URL}/${serviceName}:latest\n    ports:\n      - ${exposedPort}:${containerPort}\n" >> docker-compose-independent-generated.yaml

    if [[ countConstraints -gt 0 ]]; then
        printf "    deploy:\n      placement:\n        constraints:\n" >> docker-compose-independent-generated.yaml
    fi
    for ((j=0; j<$countConstraints; j++)); do
        constraintLine=$(jq -r ".models[$i].constraints[$j]" config.json)

        printf "          - ${constraintLine}\n" >> docker-compose-independent-generated.yaml
    done

    # Add environment variables to docker-compose.yaml
    if [[ ${#environment[@]} -gt 0 ]]; then
        printf "    environment:\n" >> docker-compose-independent-generated.yaml
    fi
    for key in "${environment[@]}"; do
        printf "      - ${key}=\${${key}}\n" >> docker-compose-independent-generated.yaml
    done
done
