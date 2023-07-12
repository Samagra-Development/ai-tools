# AI Toolchain
AI Toolchain is a collection of tools for quickly building and deploying machine learning models for various use cases. Currently, the toolchain includes a text translation model, and more models may be added in the future.

## Prerequisites

- [Docker](https://docs.docker.com/)
- [NginX](https://www.nginx.com/resources/wiki/start/)

## Setup

AI-Tools Models at present can be packaged and deployed in two ways:
- As a Single Image
- Multiple Images

### Single Image
In single image setup, we have a single quart app hosting all the models. It is bundled as a single Docker Image. All models can be accessed following this path convention 
`http://domain_name/<use_case>/<provider>/<mode>`

Services are usually provided in either **remote** mode or **local** mode.  

For example, the text_translation service provided by google can be accessed on your local system at this URL:
`http://localhost:8000/text_translation/google/remote`

### Deploy Single Image Setup
```
docker build -t <image-name> .
docker run -p <host_port>:<container_port> <image-name>
```

### Multiple Image
In Multi Image Setup, each model has its own quart application and docker image. All model APIs are served via NGINX by utilizing proxies to route incoming requests to the appropriate destinations.  

There won't be any difference in accessing the models. The text_translation service provided by google can still be accessed on your local system at this endpoint:
`http://domain_name/text_translation/google/remote`

### Deploy Multi Image Setup
For mutliple image setup, the docker-compose file and nginx configuration files are generated dynamically based on the config.json file. The following commands might require sudo privileges.   

Run this script to generate the configuration files. 
```
./generate.sh
```
Setup NginX configuration
```
sudo cp <DOMAIN_NAME>.conf /etc/nginx/conf.d/
nginx -t //Checks for configuration errors
sudo nginx -s reload
```
- For **Windows** copy to `C:\nginx\conf\` and reload the server.
- For **MacOS** copy to `/usr/local/etc/nginx/` and reload the server.

The .conf file will be present in your project root path after running the `generate.sh` script.  

Build Image
```
docker-compose -f ./docker-compose-generated.yaml build
docker-compose -f docker-compose-generated.yaml up
```

## Adding a new model locally
To add a new model you need to create sub-directory in `src`. The subdirectory will follow `use_case/provider/mode` format.

To deploy your application, the dockerfile must:
- copy program files
- install requirements
- build and run the application

After you have developed and dockerized the application, to add a new model, you need to add a key pair inside models object in the config file with the following properties:

- serviceName : Name of the service. This will also be the docker image's name. 
- modelBasePath: Dockerfile location of your model.
- apiBasePath: Endpoint from where you wish to access the model. Should follow this convention: `<use_case>/<provider>/<mode>`.
- containerPort: Port at which the application will be hosted inside the container.
- environment: Another JSON object with key-value pairs. Should contain any relevant secrets or API_KEYS required to run the application.

For example, if you want to add a new Text Translation AI Model from OPENAI in remote mode, you need to do as follows:
```
{
      "serviceName": "text_translation_google",
      "modelBasePath": "src/text_translation/google/remote/.",
      "apiBasePath": "text_translation/google/remote",
      "containerPort": 8000,
      "environment": {
        "OPENAI_API_KEY": "${OPENAI_API_KEY}",
        "GOOGLE_CLOUD_SECRET": "${GCP_SECRET}"
      }
}
```
## Run Ansible Script

### Requirements
- HashiCorp Vault
- Docker Swarm

### Steps

1. Create a `inventory.ini` file with target machine configuration. Target Machine is where the ansible script will run.  
Here is a sample `inventory.ini` file:  
```
[swarm_manager]
ee01:ac8:1561::2 ansible_connection=ssh ansible_user=github ansible_ssh_private_key_file=/home/github/.ssh/id_rsa
```  
You may modify it according to your needs.  
2. Create a Hashicorp Vault to store your secrets. You need to store two types of secrets (In separate Secret Paths mentioned below. This is not optional),
- Github Credentials. (Path = `secret/github`)
  - Github Username
  - Github Personal Access Token
- Environement Secrets for the Docker Images (Path  = `secret/config`)  
3. Lastly, you need to add the `Vault Address` and `Vault Root Token` to your environment in the target machine so that it can access the remotely hosted Hashicorp Vault.  

Alternatively, you can pass the variables during run time as Command Line Arguments using `--extra-vars` field. 
Here is an example:   
```
ansible-playbook -i inventory.ini swarm.yml --extra-vars "VAULT_ADDR='http://127.0.0.1:8200' VAULT_TOKEN=s.j37242368726583746A2iu" --ask-become-pass
```

### To run the Ansible Playbook
```
ansible-playbook swarm.yml -i inventory.ini
```
## Contributing
Contributions to AI Toolchain are welcome! To contribute, please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Write tests for your changes.
3. Submit a pull request describing your changes and why they are needed.

Thank you for considering contributing to AI Toolchain!
