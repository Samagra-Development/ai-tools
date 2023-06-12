from model import Model
from request import ModelRequest
from quart import Quart, request
import aiohttp

app = Quart(__name__)

@app.before_serving
async def startup():
    app.client = aiohttp.ClientSession()

@app.route('/', methods=['POST'])
async def embed():
    data = await request.get_json()
    req = ModelRequest(**data)
    model = Model(app)
    return await model.inference(req)
