# Word Score

## Test Deployment

- Git clone the repo and cd to the project location.
- cd to `local`, i.e., `cd ./src/search/word_score/local`.
- Replace the link in the Dockerfile to a downloadable csv file of your choice, but the data column should be named `tags`.
- Start your docker engine and `docker build -t word_score .`.
- Do `docker run -p 8000:8000 word_score`.
- `curl -X POST -H "Content-Type: application/json" -d '{"query": "seed procurement district", "n": "5", "search_category" : "seed", "threshold": "0.8", "k": "6"}' http://localhost:8000/`. <br> Replace `seed procurement district` with a query you want to search and `5` with the number of rows you want to retrieve. Change `threshold` value (0 to 1) to retrieve documents whose score cross the specific threshold. `k` is the number of top k words to consider for thresholding of the score.
- The reponse for above would be: <br>
`
{
    "docs": ["row1", "row2", ... , "rowN"]
}
`
The list of strings contains the top N rows.

