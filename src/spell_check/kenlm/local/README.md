curl request : 

curl -X POST -H "Content-Type: application/json" -d '{
"text": "ପାମ ମିଶନରୀ ଉପରେ କେତେ % ରିହାତି ଧୈର୍ଯ ହୋଇଛି",
"BEAM_WIDTH": 5,
"SCORE_THRESHOLD": 1.5,
"max_distance": 1
}' http://localhost:8000/