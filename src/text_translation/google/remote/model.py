from cache import AsyncTTL
from request import ModelRequest
from google.oauth2.service_account import Credentials
from google.cloud import translate

class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            # Set up service account credentials
            cls.credentials = Credentials.from_service_account_file('google-creds.json')

            # Create a client for the Speech-to-Text API with the service account credentials
            cls.client = translate.TranslationServiceClient(credentials=cls.credentials)

            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    async def inference(self, request: ModelRequest):
        translation = self.client.translate_text(
            request={
                "parent": "projects/samagragovernance-in-new",
                "mime_type": "text/plain",
                "source_language_code": request.source_language,
                "target_language_code": request.target_language,
                "contents": [request.text],
            }
        )

        response = translation.translations[0].translated_text
        print(response)

        return {
            "success": True,
            "translated": response
        }
