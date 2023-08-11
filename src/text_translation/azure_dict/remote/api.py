from model import Model
from request import ModelRequest
from quart import Quart, request
import aiohttp
import asyncio
from quart_cors import cors

app = Quart(__name__)
app = cors(app) 

@app.before_serving
async def startup():
    app.client = aiohttp.ClientSession()
    app.update_task = asyncio.create_task(Model.update_translation_dictionary())

@app.after_serving
async def cleanup():
    app.update_task.cancel()

@app.route('/', methods=['POST'])
async def translate():
    data = await request.get_json()
    req = ModelRequest(**data)
    
    if req.source and req.translation:
        Model.data_dict[req.source] = req.translation

    model = Model()
    return await model.inference(req)


