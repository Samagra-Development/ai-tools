import torch
import torchaudio
import whisper  
from request import ModelRequest 
import tempfile
import os 

class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        
        # Load Whisper model
        cls.model = whisper.load_model("base")
        cls.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        cls.model.to(cls.device)
        return cls.instance

    def trim_audio(self, audio_path, n_seconds):
        audio, sr = torchaudio.load(audio_path)
        total_duration = audio.shape[1] / sr  # Total duration of the audio in seconds

        # If the audio duration is less than n_seconds, don't trim the audio
        if total_duration < n_seconds:
            print(f"The audio duration ({total_duration:.2f}s) is less than {n_seconds}s. Using the full audio.")
            return audio, sr

        num_samples = int(n_seconds * sr)
        audio = audio[:, :num_samples]
        return audio, sr

    async def inference(self, request: ModelRequest):
        # The n_seconds is now accessed from the request object
        n_seconds = request.n_seconds  
        trimmed_audio, sr = self.trim_audio(request.wav_file, n_seconds)

        # Save the trimmed audio to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:  # Add a file extension
            torchaudio.save(temp_file.name, trimmed_audio, sr)

            # Process the audio with Whisper
            audio = whisper.load_audio(temp_file.name)
            audio = whisper.pad_or_trim(audio)

        # Clean up the temporary file
        os.unlink(temp_file.name)

        mel = whisper.log_mel_spectrogram(audio).to(self.device)  
        # Detect the spoken language
        _, probs = self.model.detect_language(mel) 
        detected_language = max(probs, key=probs.get)

        return detected_language


