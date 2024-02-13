### Testing the model deployment :  
To run for testing  you can follow the following steps : 

- Git clone the repo
- Go to current folder location i.e. ``` cd /src/asr/whisper_lang_rec/local ```
- Create docker image file and test the api:  
```
docker build -t testmodel .
docker run -p 8000:8000 testmodel
curl -X POST -F "file=@male.wav" -F "n_seconds=5" http://localhost:8000/
```
