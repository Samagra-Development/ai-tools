from request import ModelRequest

import numpy as np
from cache import AsyncTTL
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import linear_kernel


class Model:
    def __init__(self, df1, matrix, vec, req: ModelRequest):
        self.df = df1
        self.content_matrix = matrix
        self.vectorizer = vec

        print("Inside Model's constructor, type of vectorizer:", type(self.vectorizer))
           

    @AsyncTTL(time_to_live=600000, maxsize=1024)
    async def inference(self, request: ModelRequest):
          
        query = [request.query]
        query_vector = self.vectorizer.transform(query)    
        k = int(request.k) # k is the number of top k words to consider for the score
        
        count_scores = linear_kernel(query_vector, self.content_matrix).flatten()

  # Create a new DataFrame with content and count scores
        result_df = pd.DataFrame({
            'content': self.df['content'],
            'count_score': count_scores,
            'chunk_id' :  self.df['chunkId']
        })

        # Sort the DataFrame based on count scores in descending order
        sorted_df = result_df.sort_values(by='count_score', ascending=False)
        sorted_df = sorted_df.head(k)

        return sorted_df.to_dict()
    