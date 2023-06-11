#!/bin/bash

source .env

os_name=$(uname -s)

if [ "$os_name" == "Darwin" ]; then
    brew install jq
else
    sudo apt-get install jq
fi

count=$(jq '.models | length' config.json)

printf "version: '3'\nservices:\n" > docker-compose-generated.yaml

printf "server {\n    server_name ${DOMAIN_NAME};\n" > "${DOMAIN_NAME}.conf.d"

for ((i=0; i<$count; i++)); do
    serviceName=$(jq -r ".models[$i].serviceName" config.json)
    modelBasePath=$(jq -r ".models[$i].modelBasePath" config.json)
    apiBasePath=$(jq -r ".models[$i].apiBasePath" config.json)
    containerPort=$(jq -r ".models[$i].containerPort" config.json)

    exposedPort=$((8000 + i))

    environment=($(jq -r ".models[$i].environment | keys[]" config.json))

    printf "    location ${apiBasePath} {\n        proxy_pass http://localhost:${exposedPort};\n    }\n" >> "${DOMAIN_NAME}.conf.d"

    printf "  ${serviceName}:\n    build:\n      context: ${modelBasePath}\n    ports:\n      - ${exposedPort}:${containerPort}\n    environment:\n" >> docker-compose-generated.yaml

    for key in "${environment[@]}"; do
        value=$(jq -r ".models[$i].environment[\"$key\"]" config.json)
        printf "      - ${key}=${value}\n" >> docker-compose-generated.yaml
    done

done

echo "Script execution completed."
