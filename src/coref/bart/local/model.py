import torch
from request import ModelRequest
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        model_name = "ksgr5566/bartlg-coreference-resolution"
        cls.tokenizer = AutoTokenizer.from_pretrained(model_name)
        cls.model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
        cls.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        cls.model.to(cls.device)
        return cls.instance
    

    def inference(self, request: ModelRequest):
        encoded_prompt = self.tokenizer(request.text, return_tensors="pt", padding=True, truncation=True, max_length=512).to(self.device)
        with torch.no_grad():
            output = self.model.generate(
                **encoded_prompt, 
                max_length=request.max_length, 
                num_beams=request.num_beams,
                temperature=request.temperature
            )
        decode = self.tokenizer.batch_decode(output, skip_special_tokens=True)
        return { "text" : decode[0]} 
