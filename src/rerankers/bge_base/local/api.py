from model import Model
from request import ModelRequest
from quart import Quart, request,jsonify
import aiohttp

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
    data = await request.get_json()
    req = ModelRequest(**data)
    prediction = await model.inference(req)
    # Convert the NumPy array to a list (or another serializable format) and return as JSON
    if prediction is not None:
        return jsonify(prediction.tolist())  # Assuming 'prediction' is a NumPy array
    else:
        # Return a meaningful error message if prediction is None
        return jsonify({'error': 'Prediction failed'}), 500

if __name__ == "__main__":
    app.run()