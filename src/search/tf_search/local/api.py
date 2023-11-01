from model import Model
from request import ModelRequest
from quart import Quart, request
import aiohttp
import os
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import linear_kernel

app = Quart(__name__)

# Global variable for the dataframe
df = None
vectorizer = None
content_matrix = None

files = os.listdir("./content")
df = pd.read_csv(os.path.join("./content", files[0]))
print(df.columns)


@app.before_serving
async def startup():
    app.client = aiohttp.ClientSession()
    
    # Load the dataframe during startup
    global df 
    global content_matrix
    global vectorizer
    files = os.listdir("./content")
    df = pd.read_csv(os.path.join("./content", files[0]))
    print(df.columns)
    # Initialize a CountVectorizer with additional parameters
    vectorizer = CountVectorizer(lowercase=True, ngram_range=(1, 2), binary=True, stop_words='english')

    # Fit the vectorizer on the content column and transform it
    content_matrix = vectorizer.fit_transform(df['heading'] + df['content'])
    print("Type of vectorizer:", type(vectorizer))

@app.route('/', methods=['POST'])
async def translate():
    global vectorizer, content_matrix
    data = await request.get_json()
    req = ModelRequest(**data)

    print("Inside translate function, type of vectorizer:", type(vectorizer))
    
    # Pass the dataframe as an argument to the Model class
    model = Model(df, content_matrix, vectorizer, req)
    return await model.inference(req)

@app.route('/', methods=['GET'])
async def hi():
    return df.columns


if __name__ == "__main__":
    app.run(debug=True, port=8000)
