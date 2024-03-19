import pandas as pd
from ragatouille import RAGPretrainedModel
from request import ModelRequest
from colbert import Indexer, Searcher
from colbert.infra import Run, RunConfig, ColBERTConfig
from colbert.data import Queries, Collection



class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        # Initialize Colbert
        cls.df = pd.read_csv('/Testing1.csv')
        cls.df['PID'] = cls.df.index.astype(str)
        with Run().context(RunConfig(experiment='notebook')):
            cls.searcher = Searcher(index='/colbert_agri_embeddings/', collection=cls.df['content'].to_list())
        print(cls.df.columns)
        
        return cls.instance

    async def inference(self, request: ModelRequest):
        query = request.text
        k = request.k  
        column_returned = 'id'  
        results = self.searcher.search(query, k)
        searched_ids = self.df.loc[results[0], column_returned].to_list()
        searched_content = self.df.loc[results[0], 'content'].to_list()
        return {"ids": searched_ids, "content": searched_content, "scores": results[2]}
