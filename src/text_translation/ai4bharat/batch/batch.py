import sys
# sys.path.insert(0,".")
from . import batch_request


class AI4BharatBatchModel():
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(AI4BharatBatchModel, cls).__new__(cls)
            cls.load_model(cls)
        return cls.instance

    def load_model(self):
        from inference.engine import Model
        self.model = Model(expdir='../indic-en')

    def inference(self, request: batch_request.AI4BharatBatchModelRequest):
        return self.model.batch_translate(request.batch, request.source, request.target)
