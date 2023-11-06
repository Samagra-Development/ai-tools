import torch
from request import ModelRequest
from InstructorEmbedding import INSTRUCTOR
import wget
import pandas as pd
import os
from quart import jsonify  # Import jsonify to send JSON responses


class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        model_name = "hkunlp/instructor-large"
        cls.model = INSTRUCTOR(model_name)
        return cls.instance

    async def inference(self, request: ModelRequest):
    # Modify this function according to model requirements such that inputs and output remains the same
        corpus_instruction = "Represent the document for retrieval:"
        query_instruction = 'Represent the question for retrieving supporting documents: '
        query = request.query
        query_type =  request.query_type

        if(query != None):
            # print('Query Encoding Process :-')
            if query_type ==  'retrieval': 
                query_embeddings = self.model.encode(
                    [[corpus_instruction, query]],
                    show_progress_bar=False,
                    batch_size=32,
                    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
                )

            else :  
                query_embeddings = self.model.encode(
                    [[query_instruction, query]],
                    show_progress_bar=False,
                    batch_size=32,
                    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
                )
            return query_embeddings.tolist()

        if not request.df.empty:
            # print('Text corpus Encoding Process :-')
            data = request.df
            data = data.loc[~pd.isnull(data['content']),:]
            data['content'] = data['content'].astype(str)

            if data.empty or data['content'].isnull().any():
                return 'There are nonzero null rows'
                
            else :  
                text_corpus = data.loc[:,'content'].to_list()
         
                if not text_corpus: 
                    corpus_embeddings = self.model.encode(
                            [[corpus_instruction, text] for text in text_corpus],
                            show_progress_bar=False,
                            batch_size=32,
                            device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
                    )
                    data['embeddings'] = corpus_embeddings.tolist()
                    csv_string = data.to_csv(index=False)
                else:
                    return 'There are nonzero null rows'


            return str(csv_string)
