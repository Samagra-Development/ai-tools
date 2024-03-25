from model import Model
from request import ModelRequest
from quart import Quart, request
import aiohttp

app = Quart(__name__)

model = None

model_paths = {
    'ory': '5gram_model.bin',
    'eng': '5gram_model_eng.bin'
}

vocab_paths = {
    'ory': 'lexicon.txt',
    'eng': 'lexicon_eng.txt'
}



@app.before_serving
async def startup():
    app.client = aiohttp.ClientSession()
    global model
    model = Model(app, model_paths, vocab_paths)

@app.route('/', methods=['POST'])
async def embed():
    global model
    data = await request.get_json()
    req = ModelRequest(**data)
    result = await model.inference(req)
    return result

if __name__ == "__main__":
    app.run()
