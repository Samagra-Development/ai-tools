from model import Model
from request import ModelRequest
from quart import Quart, request
import aiohttp

#from fastapi import FastAPI, Body
app = Quart(__name__)
#app.client = aiohttp.ClientSession()
#app = FastAPI()

@app.before_serving
async def startup():
    app.client = aiohttp.ClientSession()

@app.route('/health') # this endpoint returns health of the particular model
def health():
    return "up" # custom checks can be written to indicate various cases

@app.route('/transcript', methods=['POST'])
async def translate():
    data = await request.get_json()
    req = ModelRequest(**data)
    model = Model(app)
    return await model.inference(req)
