import os
import openai
from openai.embeddings_utils import get_embedding
from cache import AsyncTTL
from request import ModelRequest
import numpy as np
import pandas as pd
import tiktoken
import ast
from sklearn.metrics.pairwise import cosine_similarity

openai.api_key = os.getenv("OPENAI_API_KEY")


class Model:
    embedding_df = None
    embedding_model = "text-embedding-ada-002"
    embedding_encoding = "cl100k_base"  # this the encoding for text-embedding-ada-002
    max_tokens = 8000  # the maximum for text-embedding-ada-002 is 8191

    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.embedding_df = pd.read_csv('src/embeddings/openai/remote/akai.csv')
            cls.embedding_df['embedding'] = cls.embedding_df['embedding'].apply(ast.literal_eval)
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    @AsyncTTL(time_to_live=600000, maxsize=1024)
    async def inference(self, request: ModelRequest):
        print("request.prompt", request.prompt)
        new_prompt_embedding = get_embedding(request.prompt, engine=self.embedding_model)
        similarity_scores = cosine_similarity(
            [new_prompt_embedding], np.stack(self.embedding_df['embedding'], axis=0))[0]
        most_similar_indices = np.argsort(similarity_scores)[::-1]
        most_similar_prompts = self.embedding_df.loc[most_similar_indices, ['combined_prompt', 'combined_content']]
        most_similar_prompts['similarity_score'] = np.sort(similarity_scores)[::-1]
        similar_content = most_similar_prompts.iloc[0:20]
        sim_cutoff_range = np.max(similar_content['similarity_score']) - request.similarity_score_range
        similar_content_df = similar_content.loc[similar_content['similarity_score'] >= sim_cutoff_range, :]
        similar_content_df1 = similar_content_df.drop(columns='similarity_score')
        similar_content_dict = similar_content_df1.to_dict('records')
        # modified_content_dict = remove_content_tags_from_dic(similar_content_dict)
        print("similar_content_dict", similar_content_dict)
        return (similar_content_dict)

    async def create_embeddings(self, embedding_df):
        encoding = tiktoken.get_encoding(self.embedding_encoding)
        embedding_df["n_tokens"] = embedding_df.combined_prompt.apply(lambda x: len(encoding.encode(x)))
        embedding_df["embedding"] = embedding_df.combined_prompt.apply(
            lambda x: get_embedding(x, engine=self.embedding_model))
        return embedding_df