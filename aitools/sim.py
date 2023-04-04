import json
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


async def load_similarity_model():
    df1 = pd.read_csv('df_all_new_data.csv')
    content = df1['Content']
    actual_sentences = df1['sentence_constructed']
    encoded_string = df1['encoded_sentence']

    encoded = []
    for en_str in encoded_string:
        encoded.append(np.array(json.loads(en_str)))
    encoded = np.array(encoded)

    model = SentenceTransformer('bert-base-nli-mean-tokens')

    async def get_prediction(sent):
        sim = cosine_similarity(
            model.encode([sent]),
            encoded
        )
        max_prob = np.argmax(sim)
        max_sim = np.max(sim)
        return actual_sentences[max_prob], content[max_prob], max_sim

    return {"get_similarity": get_prediction}