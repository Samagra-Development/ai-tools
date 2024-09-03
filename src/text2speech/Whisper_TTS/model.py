import torchaudio
from whisperspeech.pipeline import Pipeline
from request import ModelRequest
import uuid

class Model:

    def __init__(self):
        self.pipe = Pipeline(s2a_ref='collabora/whisperspeech:s2a-q4-tiny-en+pl.model')
    
    def generate_uuid(self):
        return uuid.uuid4()
        
    async def inference(self, request: ModelRequest, voice_cloning_audio=None):
        reference_audio_path = None
        if request.use_voice_cloning and voice_cloning_audio:
            reference_audio_path = 'reference_audio.wav'
        audio = self.text_to_speech(request.text, language=request.language, cps=request.cps, reference_audio_path=reference_audio_path)
        
        output_file = f"audio/output_{self.generate_uuid()}.wav" if not reference_audio_path else f"audio/output_cloned_{self.generate_uuid()}.wav"
        self.save_audio(audio, output_file)
        return {"output_file": output_file}

    def text_to_speech(self, text, language='en', cps=10.5, reference_audio_path=None):
        if reference_audio_path:
            audio = self.pipe.generate(text, lang=language, cps=cps, speaker=reference_audio_path)
        else:
            audio = self.pipe.generate(text, lang=language, cps=cps)
        
        audio_cpu = audio.cpu().squeeze()
        if audio_cpu.dim() == 1:
            audio_cpu = audio_cpu.unsqueeze(0)
        return audio_cpu

    def save_audio(self, audio, output_file, sample_rate=24000):
        torchaudio.save(output_file, audio, sample_rate=sample_rate, encoding="PCM_F")
        print(f"Generated audio file: {output_file}")
