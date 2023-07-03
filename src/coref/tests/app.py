import os
import openai
import pandas as pd
import tiktoken
from flask import Flask, request, jsonify

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")

class Embeddings():

    @staticmethod
    def setup_openai(API_key):
        os.environ['OPENAI_API_KEY'] = API_key
        openai.api_key = os.getenv("OPENAI_API_KEY")

    @staticmethod
    def create_prompt_df(df1):
        df1.columns = df1.columns.str.lower()
        prompt_columns = df1.columns[df1.columns.str.contains('prompt_')]
        content_columns = df1.columns[df1.columns.str.contains('content_')]
        df1 = df1[prompt_columns.append(content_columns)]
        df1[pd.isnull(df1)] = ""

        df1["combined_prompt"] = ''

        for column in prompt_columns:
            df1["combined_prompt"] = df1["combined_prompt"] + "; " + column.replace('prompt_', '') + ": " + df1[
                column].str.strip().str.replace("\n", '')

        df1["combined_prompt"] = df1["combined_prompt"].str[2:]

        df1["combined_content"] = ''

        for column in content_columns:
            df1["combined_content"] = df1["combined_content"] + "; " + column.replace('content_', '') + ": " + df1[
                column].str.strip().str.replace("\n", '')

        df1['combined_content'] = df1['combined_content'].str[2:]

        return df1[['combined_content', 'combined_prompt']]

    @staticmethod
    def create_embeddings(df1, engine, encoding):
      encoding = tiktoken.get_encoding(embedding_encoding)
      df1["n_tokens"] = df1.combined_prompt.apply(lambda x: len(encoding.encode(x)))
      df1["embedding"] = df1.combined_prompt.apply(lambda x: get_embedding(x, engine=embedding_model))
  
      return df1

@app.route('/embeddings', methods=['POST'])
def embeddings_api():
    request_json = request.json
    df = pd.read_csv(request_json['file_path'])
    Embeddings.setup_openai(request_json['api_key'])
    prompt_df = Embeddings.create_prompt_df(df)
    embeddings_df = Embeddings.create_embeddings(prompt_df, request_json['engine'], request_json['encoding'])
    return embeddings_df.to_csv(index=False)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8831 )))
