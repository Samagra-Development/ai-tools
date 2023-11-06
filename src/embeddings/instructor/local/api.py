from model import Model
from request import ModelRequest
from quart import Quart, request,Response, send_file 
import aiohttp
import pandas as pd
import io
from quart import jsonify 

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
    files = await request.files
    uploaded_file = files.get('file')

    if uploaded_file:
        df = pd.read_csv(uploaded_file.stream)
        if df.empty or df['content'].isnull().any():
            return jsonify({'error': 'There are nonzero null rows'}), 400  # Return a 400 Bad Request response with the error message

        req = ModelRequest(df=df)
        response = await model.inference(req)

        # If the response from the model is an error message, return it with a 400 status
        if response == 'There are nonzero null rows':
            return jsonify({'error': response}), 400

        # Otherwise, assume response is a CSV string
        df = pd.read_csv(io.StringIO(response))
        df.to_csv('output.csv', index=False)
        return await send_file('output.csv', mimetype='text/csv', as_attachment=True, attachment_filename='output.csv')
    else:
        req = ModelRequest(**data)
        response = await model.inference(req)

        # Handle potential error from model inference in a similar way
        if response == 'There are nonzero null rows':
            return jsonify({'error': response}), 400

        # Otherwise, send back the model's response
        return response