# Word Score

## Test Deployment

- Git clone the repo and cd to the project location.
- cd to `local`, i.e., `cd ./src/search/word_score/local`.
- Replace the file in `./content` with a csv file of your choice, but the data column should be named `tags` column.
- Start your docker engine and `docker build -t word_score .`.
- Do `docker run -p 8000:8000 word_score`.
- `curl -X POST -H "Content-Type: application/json" -d '{"query": QUERY, "n": N}' http://0.0.0.0:8000`. <br> Replace `QUERY` with a query and `N` with the number of rows you want to retrieve.
- The reponse for above would be: <br>
`
{
    "docs": ["row1", "row2", ... , "rowN"]
}
`
The list of strings contains the top N rows.

