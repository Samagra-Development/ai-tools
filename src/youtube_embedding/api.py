from quart import Quart, request, jsonify
from scraper import transcript  
import aiohttp
import io 
from model import Model
from request import ModelRequest
from chunking import TranscriptChunker
import json

app = Quart(__name__)


model = None

@app.before_serving
async def startup():
    app.client = aiohttp.ClientSession()
    global model
    model = Model(app)


transcript_data_store = {}
@app.route('/get_transcript', methods=['POST'])
async def get_transcript():
    data = await request.get_json()

    if 'url' not in data:
        return jsonify({'error': 'URL is required'}), 400

    url = data['url']
    transcript_path, transcript_content = transcript(url)

    transcript_data_store[url] = {
        'transcript_path': transcript_path,
        'transcript_data': transcript_content
    }
    return jsonify({
        'transcript_path': transcript_path,
        'transcript_data': transcript_content
    })


@app.route('/Query',methods=['POST'])
async def query():
    global model
    data= await request.get_json()

    
    if 'url' not in data or 'query' not in data:
        return jsonify({'error': 'URL and query are required'}), 400
    
    url=data['url']
    user_query = data['query']

    if url not in transcript_data_store:
        transcript_path, transcript_content = transcript(url)
        transcript_data_store[url] = {
        'transcript_path': transcript_path,
        'transcript_data': transcript_content
        }
    else:
        req=ModelRequest(data,transcript_data_store)
        response=await model.inference(req)

    return jsonify({
        'search_results':response
    })

