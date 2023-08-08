

### Testing the model deployment :  
To run for testing just the Hugging Face deployment for grievence recognition, you can follow the following steps : 

- Git clone the repo
- Go to current folder location i.e. ``` cd /src/text_classification/grievance_recognition/local ```
- Create docker image file and test the api:  
```
docker build -t testmodel .
docker run -p 5000:5000 testmodel
curl -X POST -H "Content-Type: application/json" -d '{"text": "Where is my money? "}' http://localhost:5000/
```





Required curls request : 

curl -X POST   http://localhost:8000/  -H 'Content-Type: application/json'   -d '{
    "source": "ନଡ଼ିଆ",
    "translation": "coconut"
}'
