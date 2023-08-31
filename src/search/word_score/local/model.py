from request import ModelRequest
import pandas as pd
from math import log
from thefuzz import fuzz
import numpy as np
from cache import AsyncTTL
from tqdm import tqdm
import os   


class Model:
    def __init__(self, seed_df,pesticide_df, fertilizer_df, global_df, request: ModelRequest, search_categoty= 'others' ):
        self.search_category =  request.search_category
        if self.search_category == 'seed':
            self.df = seed_df
        elif self.search_category == 'fertilizer':
            self.df = fertilizer_df
        elif self.search_category == 'pesticide':
            self.df = pesticide_df
        else :
            self.df = global_df
        self.idf_dict = self.__compute_idf(self.df)
    
    @staticmethod
    def __compute_idf(df):
        N = len(df)
        all_tags = df['tags'].str.split().explode()
        df_count_series = all_tags.drop_duplicates().value_counts()
        idf_dict = {tag: log(N / (df_count + 1)) for tag, df_count in df_count_series.items()}
        return idf_dict

    def __fuzzy_match(self, query_tokens, doc_tokens):
        weighted_fuzzy_scores = []
        query_set = set(query_tokens)
        doc_set = set(doc_tokens)

        for q_token in query_set:
            max_ratio = None
            max_token = None
            for token in doc_set:
                ratio = fuzz.ratio(token, q_token)
                if max_ratio == None or ratio > max_ratio:
                   max_ratio = ratio
                   max_token = token

            
            idf_weight = self.idf_dict.get(max_token, 0.0)
            weighted_fuzzy_scores.append((max_ratio / 100) * idf_weight)

        return np.mean(weighted_fuzzy_scores)


    @AsyncTTL(time_to_live=600000, maxsize=1024)
    async def inference(self, request: ModelRequest):
        scores = []
        query = request.query
        n = int(request.n)
        query_tokens = query.lower().split()

        for _, row in tqdm(self.df.iterrows()):
            doc_tokens = str(row['tags']).split()
            fuzzy_score = self.__fuzzy_match(query_tokens, doc_tokens)
            scores.append(fuzzy_score)

        max_score = max(scores) if scores else 1
        scores = [score / max_score for score in scores]

        new_df = self.df.copy(deep=True)
        new_df['scores'] = scores
        new_df_sorted = new_df.sort_values(by=['scores'], ascending=False).head(n)
        return {"docs": new_df_sorted['tags'].to_list()}
    