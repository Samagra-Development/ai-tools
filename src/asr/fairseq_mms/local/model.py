from transformers import Wav2Vec2ForCTC, AutoProcessor
import torch
from request import ModelRequest
import librosa

class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        
        model_name = "facebook/mms-1b-all"
        target_lang = "ory"
        model = Wav2Vec2ForCTC.from_pretrained(model_name)
        model.load_adapter(target_lang)
        cls.model = model 
        processor =  AutoProcessor.from_pretrained(model_name)
        processor.tokenizer.set_target_lang(target_lang)
        cls.processor =  processor
        cls.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        cls.model.to(cls.device)
        return cls.instance


    async def inference(self,  request: ModelRequest):
        wav_file = request.wav_file
        ory_sample, sr = librosa.load(wav_file, sr=16000)
        inputs = self.processor(ory_sample, sampling_rate=16_000, return_tensors="pt")
        with torch.no_grad():
            outputs = self.model(**inputs).logits
        
        ids = torch.argmax(outputs, dim=-1)[0]
        transcription = self.processor.decode(ids)
        
        return transcription