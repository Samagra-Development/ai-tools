from model import Model
from request import ModelRequest
from quart import Quart, request
import aiohttp
import os
import tempfile

app = Quart(__name__)

model = None

@app.before_serving
async def startup():
    app.client = aiohttp.ClientSession()
    global model
    model = Model(app)

@app.route('/', methods=['POST'])
async def embed():
    global model

    temp_dir = tempfile.mkdtemp()
    data = await request.get_json()
    files = await request.files  # await the coroutine
    uploaded_file = files.get('file')  # now you can use .get()

    file_path = os.path.join(temp_dir, uploaded_file.name)
    await uploaded_file.save(file_path)

    req = ModelRequest(wav_file=file_path) 
    response = await model.inference(req)

    os.remove(file_path)
    os.rmdir(temp_dir)
    
    return response

if __name__ == "__main__":
    app.run()