from cache import AsyncTTL
from request import ModelRequest
import io
from google.oauth2.service_account import Credentials
from google.cloud import speech_v1p1beta1 as speech
from pydub import AudioSegment

class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            # Set up service account credentials
            cls.credentials = Credentials.from_service_account_file('google-creds.json')

            # Create a client for the Speech-to-Text API with the service account credentials
            cls.client = speech.SpeechClient(credentials=cls.credentials)

            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    async def inference(self, request: ModelRequest):
        file_path = '1.mp3'
        audio = AudioSegment.from_file(file_path, format='mp3')

        wav_file_path = '1.wav'
        audio.export(wav_file_path, format='wav')

        # Load the audio file into memory
        with io.open(wav_file_path, 'rb') as audio_file:
            content = audio_file.read()

        # Set up the audio input
        audio = speech.RecognitionAudio(content=content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            language_code='or-IN',
        )

        # Send the API request for speech recognition
        response = self.client.recognize(config=config, audio=audio)

        # Print the transcribed text
        transcript = ''
        for result in response.results:
            print('Transcript: {}'.format(result.alternatives[0].transcript))
            transcript += result.alternatives[0].transcript

        return {"text": transcript}
