import tiktoken
from request import ModelRequest

class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        model_name = "gpt-3.5-turbo"
        cls.encoding = tiktoken.encoding_for_model(model_name)
        return cls.instance


    async def inference(self,  request: ModelRequest):
        num_tokens = len(self.encoding.encode(request.text))
        return str(num_tokens)