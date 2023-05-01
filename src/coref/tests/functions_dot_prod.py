import os
import openai
import pandas as pd
import numpy as np
from openai.embeddings_utils import get_embedding
from sklearn.metrics.pairwise import cosine_similarity
import tiktoken
from flask import Flask, request, jsonify
import ast


app = Flask(__name__)

EMBEDDING_MODEL = "text-embedding-ada-002"
CSV_FILE = "embeddings_all.csv"

# Load CSV data and generate embeddings
df1 = pd.read_csv(CSV_FILE)
df1['embedding'] = df1['embedding'].apply(ast.literal_eval)


@app.route("/similar", methods=["POST"])
def get_similar_content():
    request_data = request.get_json()
    prompt = request_data["prompt"]
    range_sim_score = request_data.get("range_sim_score", 0)

    similar_content = Embeddings.return_most_similar(prompt, df, range_sim_score)
    return jsonify(similar_content)

if __name__ == "__main__":
    app.run(port=8833)


class Embeddings():
    @staticmethod
    def setup_openai(API_key):
        os.environ['OPENAI_API_KEY'] = API_key
        openai.api_key = os.getenv("OPENAI_API_KEY")

    @staticmethod
    def return_most_similar(prompt,df1=df1, range_sim_score = 0):
      #Embeddings.setup_openai(API_key)
      new_prompt_embedding = get_embedding(prompt, engine=EMBEDDING_MODEL)
      similarity_scores = cosine_similarity([new_prompt_embedding], np.stack(df1['embedding'], axis=0))[0]
      most_similar_indices = np.argsort(similarity_scores)[::-1]
      most_similar_prompts = df1.loc[most_similar_indices, ['combined_prompt','combined_content']]
      most_similar_prompts['similarity_score']=   np.sort(similarity_scores)[::-1]
      similar_content = most_similar_prompts.iloc[0:20]
      sim_cutoff_range =  np.max(similar_content['similarity_score'])- range_sim_score
      similar_content_df = similar_content.loc[similar_content['similarity_score'] >= sim_cutoff_range, : ]
      similar_content_df1 = similar_content_df.drop(columns = 'similarity_score')
      similar_content_dict = similar_content_df1.to_dict('records')
      #modified_content_dict =  remove_content_tags_from_dic(similar_content_dict)
      print(similar_content_dict[0])
      return( jsonify (similar_content_dict))


@app.route('/embeddings/get_similarity/openai', methods=['POST'])
def embeddings_api():
    request_json = request.json
    API_key =  request_json['api_key']
    prompt = request_json['prompt']
    range_sim_score = float(request_json['range_sim_score'])
    Embeddings.setup_openai(API_key)
    return Embeddings.return_most_similar(prompt = prompt, range_sim_score = range_sim_score)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8833 )))
