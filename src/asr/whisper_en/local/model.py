import torch
import torchaudio
from transformers import pipeline
from request import ModelRequest


class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        
        # Initialize Whisper ASR pipeline
        device = "cuda:0" if torch.cuda.is_available() else "cpu"
        cls.pipe = pipeline(
            "automatic-speech-recognition",
            model="openai/whisper-tiny.en",
            chunk_length_s=10,
            device=device,
        )
        return cls.instance

    def transcribe_audio(self, audio_path): 
        audio_input, sampling_rate = torchaudio.load(audio_path)
        audio_data = {
            "array": audio_input.squeeze().numpy(),
            "sampling_rate": sampling_rate
        }

        # Get the transcription
        prediction = self.pipe(audio_data.copy(), batch_size=8)["text"]
        return prediction

    async def inference(self, request: ModelRequest):
        transcription = self.transcribe_audio(request.wav_file)
        if not transcription:
            transcription = 'Unable to transcribe the audio.'
        return transcription



