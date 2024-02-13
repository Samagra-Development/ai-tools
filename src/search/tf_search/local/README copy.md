# Word Score

## Test Deployment

- Git clone the repo and cd to the project location.
- cd to `local`, i.e., `cd ./src/search/word_score/local`.
- Replace the link in the Dockerfile to a downloadable csv file of your choice, but the data column should be named `tags`.
- Start your docker engine and `docker build -t word_score .`.
- Do `docker run -p 8000:8000 word_score`.
- `curl -X POST -H "Content-Type: application/json" -d '{"query": "leave policy planned leaves",  "k": "6"}' http://localhost:8000/`. <
`


