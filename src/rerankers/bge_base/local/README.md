## Grievance classification:


### Purpose :
Re rank given a question and a list of contetn


### Testing the model deployment :  
To run for testing just the Hugging Face deployment for grievence recognition, you can follow the following steps : 

- Git clone the repo
- Go to current folder location i.e. ``` cd /src/rerankers/bge_base/local ```
- Create docker image file and test the api:  
```
docker build -t testmodel .
docker run -p 8000:8000 testmodel
curl -X POST -H "Content-Type: application/json" \
    -d '{"question": "What is agriculture ?", "content_chunks": ["Farming is a practice of growing crops to sell them to generate money", "LLM are the present day hype machine but will they be useful until you can truly reason with them?  ", "Things are generally better than what people deep into it feel"]}' \
    http://localhost:8000/
```
