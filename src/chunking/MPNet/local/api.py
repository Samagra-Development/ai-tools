from model import Model
from request import ModelRequest
from quart import Quart, request, Response, send_file  # <- Don't forget to import send_file
import aiohttp
import pandas as pd
import io

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
    response = await model.inference(req)  # Await the coroutine to get the actual response

    df = pd.read_csv(io.StringIO(response))  # Convert the CSV string back to a DataFrame

    # Save the DataFrame to a CSV file
    df.to_csv('output.csv', index=False)

    return await send_file('output.csv', mimetype='text/csv', as_attachment=True, attachment_filename='output.csv')  # Updated line
