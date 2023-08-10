

docker build -t testmodel1 .
docker run -p 8000:8000 testmodel1

curl --location 'http://localhost:8000/' --header 'accept: */*' --header 'content-type: application/json' --header 'Authorization: ' --data '{"source_language": "or", "target_language": "en", "text": "ଚାଷୀମାନଙ୍କୁ କିପରୀ ଘର ପାଖରେ ବିହନ ସୁବିଧାରେ ପାଇପାରିବେ"}'