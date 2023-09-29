# Weather Update

## Test Deployment

- Git clone the repo and cd to the project location.
- cd to `local`, i.e., `cd ./src/weather_update/local`.
- Make a `.env` following the template in `.env_template` file.
- Start your docker engine and `docker build -t weather_update .`.
- Do `docker run --env-file .env -p 8000:8000 weather_update`.
- `curl -X POST -H "Content-Type: application/json" -d '{}' http://0.0.0.0:8000/`.
- The reponse for above would be: <br>
`
{
    "status_code": status code of the post request to database.
}
`

