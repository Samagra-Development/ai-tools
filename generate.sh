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
printf "version: '3'\nservices:\n" > docker-compose-generated.yaml

# Generate Nginx configuration file
printf "server { listen 80; \n listen [::]:80; \n server_name ${DOMAIN_NAME};\n" > "${DOMAIN_NAME}.conf"

# Loop through each model
for ((i=0; i<$count; i++)); do
    # Get model details from config.json
    serviceName=$(jq -r ".models[$i].serviceName" config.json)
    modelBasePath=$(jq -r ".models[$i].modelBasePath" config.json)
    apiBasePath=$(jq -r ".models[$i].apiBasePath" config.json)
    containerPort=$(jq -r ".models[$i].containerPort" config.json)
    
    countNginx=$(jq ".models[$i].nginx | length" config.json)
    
    # Error Handling
    # Check if the path starts with /
    if [[ "${apiBasePath}" != /* ]]; then
        apiBasePath="/${apiBasePath}"
    fi

    # Check if the path ends with /
    if [[ "${apiBasePath}" != */ ]]; then
        apiBasePath="${apiBasePath}/"
    fi
    
    if ! [[ $containerPort =~ ^[0-9]+$ ]]; then
        echo "Error: Container Port is not a positive numeral, Skipping $serviceName service"
        continue
    fi

    # Calculate the exposed port for the model
    exposedPort=$((8000 + i))

    # Get environment variables for the model
    environment=($(jq -r ".models[$i].environment | keys[]" config.json))

    # Add location block to Nginx configuration
    printf "            location ${apiBasePath} {\n                proxy_pass http://${INGRESS_IP}:${exposedPort}/;\n            " >> "${DOMAIN_NAME}.conf"

    for ((j=0; j<$countNginx; j++)); do
        configLine=$(jq -r ".models[$i].nginx[$j]" config.json)

        printf "${configLine} \n" >> "${DOMAIN_NAME}.conf"
    done

    printf "}\n" >> "${DOMAIN_NAME}.conf"


    # Add service details to docker-compose.yaml
    printf "  ${serviceName}:\n    build:\n      context: ${modelBasePath}\n    ports:\n      - ${exposedPort}:${containerPort}\n" >> docker-compose-generated.yaml

    # Add environment variables to docker-compose.yaml
    if [[ ${#environment[@]} -gt 0 ]]; then
        printf "    environment:\n" >> docker-compose-generated.yaml
    fi
    for key in "${environment[@]}"; do
        printf "      - ${key}= \${${key}}\n" >> docker-compose-generated.yaml
    done
done

printf "    }\n" >> "${DOMAIN_NAME}.conf"

if [ "${USE_HTTPS}" = "true" ]; then
    printf "\nserver { listen 443; \n listen [::]:443; \n server_name ${DOMAIN_NAME};\n" >> "${DOMAIN_NAME}.conf"

    printf "            ssl_certificate /etc/nginx/certificates/${DOMAIN_NAME}/fullchain.pem;\n" >> "${DOMAIN_NAME}.conf"
    printf "            ssl_certificate_key /etc/nginx/certificates/${DOMAIN_NAME}/privkey.pem;\n" >> "${DOMAIN_NAME}.conf"
    printf "            ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;\n" >> "${DOMAIN_NAME}.conf"
    printf "            ssl_ciphers         HIGH:!aNULL:!MD5;\n" >> "${DOMAIN_NAME}.conf"

    # Loop through each model
    for ((i=0; i<$count; i++)); do
        # Get model details from config.json
        apiBasePath=$(jq -r ".models[$i].apiBasePath" config.json)

        # Calculate the exposed port for the model
        exposedPort=$((8000 + i))

        # Add location block to Nginx configuration
        printf "            location ${apiBasePath}/ {\n                proxy_pass http://${INGRESS_IP}:${exposedPort}/;\n            }\n" >> "${DOMAIN_NAME}.conf"
    done

    printf "    }\n" >> "${DOMAIN_NAME}.conf"
fi
