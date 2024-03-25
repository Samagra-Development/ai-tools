## Token counter:
Simple API to count tokens (GPT 3.5)


### Testing the model deployment :  
To run for testing just the Hugging Face deployment for grievence recognition, you can follow the following steps : 

- Git clone the repo
- Go to current folder location i.e. ``` cd /src/token_counter/openai/local ```
- Create docker image file and test the api:  
```
docker build -t testmodel .
docker run -p 8000:8000 testmodel
curl -X POST -H "Content-Type: application/json" -d '{"text": "Where is my money? "}' http://localhost:8000/
curl -X POST -H "Content-Type: application/json" -d '{"query": "Where is my money? "}' http://aitools.v2.akai.samagra.io/token_counter/openai/local/
```
