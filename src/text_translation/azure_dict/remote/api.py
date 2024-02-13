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
    print("Startup function is being called!")
    app.client = aiohttp.ClientSession()
    app.model_instance = Model()  # instantiate the model
    app.update_task = asyncio.create_task(app.model_instance.update_translation_dictionary())  # update the dictionary

@app.after_serving
async def cleanup():
    app.update_task.cancel()

@app.route('/', methods=['POST'])
async def translate():
    data = await request.get_json()
    req = ModelRequest(**data)
    
    if req.source and req.translation:
        app.model_instance.data_dict[req.source] = req.translation

    return await app.model_instance.inference(req)
