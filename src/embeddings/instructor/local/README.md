## Instructor Embedding model:

### Purpose :
Model to Create Embeddings from given text using Instructor Large model.

### Testing the model deployment :  
To run for testing just the Hugging Face deployment for grievence recognition, you can follow the following steps : 

- Git clone the repo
- Go to current folder location i.e. ``` cd src/embeddings/instructor/local ```
- Create docker image file and test the api:  
```
docker build -t testmodel .
docker run -p 8000:8000 testmodel
curl -X POST -H "Content-Type: application/json" -d '{"query": "Where is my money? "}' http://localhost:8000/
```
