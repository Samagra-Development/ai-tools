from request import ModelRequest
from thefuzz import fuzz
import numpy as np
from cache import AsyncTTL
from tqdm import tqdm


class Model:
    def __init__(self, seed_df,pesticide_df, fertilizer_df, global_df, request: ModelRequest, search_category= 'others'):
        self.search_category =  request.search_category
        if self.search_category == 'seed':
            self.df = seed_df
        elif self.search_category == 'fertilizer':
            self.df = fertilizer_df
        elif self.search_category == 'pesticide':
            self.df = pesticide_df
        else :
            self.df = global_df
    

    def __fuzzy_match(self, query_tokens, doc_tokens, k):
        fuzzy_scores = []
        query_set = set(query_tokens)
        doc_set = set(doc_tokens)

        for q_token in query_set:
            max_ratio = None
            # max_token = None
            for token in doc_set:
                ratio = fuzz.ratio(token, q_token)
                if max_ratio == None or ratio > max_ratio:
                   max_ratio = ratio
                #    max_token = token

            fuzzy_scores.append((max_ratio / 100))

        fuzzy_scores = sorted(fuzzy_scores, reverse=True)

        return np.mean(fuzzy_scores), np.mean(fuzzy_scores[:k]) 


    @AsyncTTL(time_to_live=600000, maxsize=1024)
    async def inference(self, request: ModelRequest):
        scores = []
        top_k_scores = []
        query = request.query
        threshold = float(request.threshold)
        k = int(request.k) # k is the number of top k words to consider for the score
        n = int(request.n) # n is the number of documents to return
        query_tokens = query.lower().split()

        for _, row in tqdm(self.df.iterrows()):
            doc_tokens = str(row['tags']).split()
            fuzzy_score, top_k_score = self.__fuzzy_match(query_tokens, doc_tokens, k)
            scores.append(fuzzy_score)
            top_k_scores.append(top_k_score)

        new_df = self.df.copy(deep=True)
        new_df['scores'] = scores
        new_df['top_k_scores'] = top_k_scores
        new_df = new_df[new_df['top_k_scores'] > threshold]
        new_df_sorted = new_df.sort_values(by=['scores'], ascending=False).head(n)
        return {"docs": new_df_sorted['tags'].to_list()}
    