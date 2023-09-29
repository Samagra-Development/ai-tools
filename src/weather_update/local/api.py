from model import Model
from request import ModelRequest
from quart import Quart, request
import aiohttp

app = Quart(__name__)

model = None

@app.before_serving
async def startup():
    app.client = aiohttp.ClientSession()
    global model
    model = Model(app)

@app.route('/', methods=['POST'])
async def update():
    global model
    data = await request.get_json()
    req = ModelRequest(**data)
    return model.inference(req)

if __name__ == "__main__":
    app.run()