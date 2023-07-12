# Frequently Asked Questions

## I'm not able to access vault from my machine

### How to create a HashiCorp Vault
Check https://developer.hashicorp.com/vault/tutorials/getting-started/getting-started-first-secret

### Server gave `http` response to `https` client
Add the VAULT Address to your Environement. You might want it to persist.
```
export VAULT_ADDR=x.y.x.z:8200
```
You may also want to disbale TLS Certficate verification.  
You can do that by accessing the vault config file (/etc/vaults or create one in the working directory) and set `tls_disable`=1. Refer to [Vault Config](https://developer.hashicorp.com/vault/tutorials/operations/configure-vault) for more Details.

### Secret Path does not exist in Vault
You might have forgotten to enable the secret engine.
```
vault secrets enable -version=2 -path=secret kv
```
### How to add secrets to Ansible
To add secrets, you first need to enable the [secrets](#secret-path-does-not-exist-in-vault).

To add keys in a secret path:
```
vault kv put secret/my-app/ password=123
```
Here, you are adding the key `password` in secret path secret/my-app
To add multiple keys to your secret path
```
vault kv put secret/my-app/cred username=xyz password=123
```
Here, you are adding the keys `password` and `username` in secret path secret/my-app/cred  
For more examples refer https://blog.ruanbekker.com/blog/2019/05/06/setup-hashicorp-vault-server-on-docker-and-cli-guide/

## How to Access Ansible Target Machine
You need to generate a [ssh key pair](https://docs.oracle.com/en/cloud/cloud-at-customer/occ-get-started/generate-ssh-key-pair.html#GUID-8B9E7FCB-CEA3-4FB3-BF1A-FD3406A2432F) in the local machine (Where ansible script is present) and copy the public key onto the Target Machine. 

## How to create a Github Personal Access Token
Check https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens