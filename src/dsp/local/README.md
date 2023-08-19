# DSP

## Test Deployment

- Git clone the repo and cd to the project location.
- cd to `local`, i.e., `cd ./src/dsp/local`.
- Use openai api key.
- Start your docker engine and `docker build -t dsp .`.
- Do `docker run -p 8000:8000 dsp`.
- `curl -X POST -H "Content-Type: application/json" -d '{"text": TEXT, "train": TRAIN, "server": SERVER, "model": MODEL}' http://0.0.0.0:8000`.

`TEXT` is the question. `TRAIN` is the labeled samples required in list format. Ex: `[("Question1", ["Answer1"]), ("Question2", ["Answer2"])]`. `SERVER` is the retrieval model server's api endpoint. Make sure to implement the server so the endpoints work as required for [this](https://github.com/stanfordnlp/dspy/blob/main/dsp/modules/colbertv2.py). `MODEL` is the hugging face model that you may want to use instead of gpt-3+, it is optional. Leave it blank if you want to use gpt-3+.
