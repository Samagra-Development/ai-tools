from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
from request import ModelRequest

class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        model_name = "GautamR/model_grievance_class"
        cls.tokenizer = AutoTokenizer.from_pretrained(model_name)
        cls.model = AutoModelForSequenceClassification.from_pretrained(model_name)
        return cls.instance


    async def inference(self,  request: ModelRequest):
        inputs = self.tokenizer(request.text, return_tensors="pt")
        with torch.no_grad():
            logits = self.model(**inputs).logits
        predicted_class_id = logits.argmax().item()
        return self.model.config.id2label[predicted_class_id]