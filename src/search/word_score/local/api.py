from model import Model
from request import ModelRequest
from quart import Quart, request
import aiohttp
import os
import pandas as pd

app = Quart(__name__)

# Global variable for the dataframe
global_df = None

@app.before_serving
async def startup():
    app.client = aiohttp.ClientSession()
    
    # Load the dataframe during startup
    global global_df
    global seed_df 
    global pesticide_df
    global fertilizer_df
    files = os.listdir("./content")
    global_df = pd.read_csv(os.path.join("./content", files[0]))
    global_df['tags'] = global_df['tags'].str.lower()
    seed_df = global_df.loc[global_df.category == 'seed',: ]
    pesticide_df = global_df.loc[global_df.category == 'pesticide',: ]
    fertilizer_df = global_df.loc[global_df.category == 'fertilizer',: ]

@app.route('/', methods=['POST'])
async def translate():
    data = await request.get_json()
    req = ModelRequest(**data)
    # Pass the dataframe as an argument to the Model class
    model = Model(seed_df,pesticide_df, fertilizer_df, global_df , req)
    return await model.inference(req)

@app.route('/', methods=['GET'])
async def hi():
    return "hi"
