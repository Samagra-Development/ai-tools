import torch
from request import ModelRequest
from InstructorEmbedding import INSTRUCTOR
import wget
import pandas as pd
import os

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
        corpus_instruction = "Represent the Wikipedia document for retrieval:"
        query_instruction = 'Represent the Wikipedia question for retrieving supporting documents: '
        query = request.query
        text_corpus = request.text_corpus
        
        if(query == None and text_corpus == None):
            return "Query or url to text corpus not found."

        if(query != None and text_corpus != None):
            return "Cannot embed both query and corpus together."

        if(query != None):
            # print('Query Encoding Process :-')
            query_embeddings = self.model.encode(
                    [[query_instruction, query]],
                    show_progress_bar=False,
                    batch_size=32,
                    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
                )
            return query_embeddings.tolist()

        if(text_corpus != None):
            # print('Text corpus Encoding Process :-')
            url = text_corpus
            filename = wget.download(url)
            data = pd.read_csv(filename)
            text_corpus = data.iloc[:,1].to_list()
            corpus_embeddings = self.model.encode(
                    [[corpus_instruction, text] for text in text_corpus],
                    show_progress_bar=False,
                    batch_size=32,
                    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            )

            path = os.path.abspath(os.getcwd())
            filename = path + '/' + filename # get the full path of the file
            if os.path.exists(filename):
                os.remove(filename) # if exist, remove it directly
            
            return str(corpus_embeddings[0])
