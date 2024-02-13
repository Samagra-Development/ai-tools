from request import ModelRequest
import dsp
from utils import DSP


class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.dsp = DSP()
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance
    

    def inference(self, request: ModelRequest):
        train = [dsp.Example(question=question, answer=answer) for question, answer in request.train]
        answer, history = self.dsp(request.text, train, request.server, request.hf_model)
        return {"text": answer, "history": history}
