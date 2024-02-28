from request import ModelRequest
from sentence_transformers.cross_encoder import CrossEncoder
import torch

class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        model_name = "BAAI/bge-reranker-base"
        cls.model = CrossEncoder(model_name)
        return cls.instance


    async def inference(self,  request: ModelRequest):
        predict_array = request.predict_array
        predictions = self.model.predict(predict_array)
        return (predictions)
