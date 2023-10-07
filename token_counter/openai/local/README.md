## Grievance classification:


### Purpose :
Model to classify grievances into 3 buckets :
- Label 0: 'Agri scheme'
- Label 1: 'Other agri content'
- Label 2: 'pest flow'
- Label 3: 'seed flow'


### Testing the model deployment :  
To run for testing just the Hugging Face deployment for grievence recognition, you can follow the following steps : 

- Git clone the repo
- Go to current folder location i.e. ``` cd /src/text_classification/flow_classification/local ```
- Create docker image file and test the api:  
```
docker build -t testmodel .
docker run -p 8000:8000 testmodel
curl -X POST -H "Content-Type: application/json" -d '{"text": "Where is my money? "}' http://localhost:8000/
```
