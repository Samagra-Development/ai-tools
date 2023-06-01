from transformers import AutoTokenizer, TFBertForSequenceClassification, BertTokenizer
import tensorflow as tf
from request import ModelRequest

class Model:

    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        model_name = 'Chakshu/conversation_terminator_classifier' 
        cls.tokenizer = BertTokenizer.from_pretrained(model_name)
        cls.model = TFBertForSequenceClassification.from_pretrained(model_name)
        return cls.instance

    async def inference(self, request: ModelRequest):
        inputs = self.tokenizer(request.text,return_tensors="np", padding=True)
        outputs = self.model(inputs.input_ids, inputs.attention_mask)
        probabilities = tf.nn.sigmoid(outputs.logits)
        predicted_class = tf.round(probabilities)
        return {"ans":"'ENDED'" if int(predicted_class.numpy()) == 1 else "'NOT ENDED'"}
