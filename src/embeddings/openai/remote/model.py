from request import ModelRequest
from openai import OpenAI


class Model:
    embedding_model = "text-embedding-ada-002"

    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = client = OpenAI(
                api_key=os.getenv("OPENAI_API_KEY"),
            )
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    async def inference(self, request: ModelRequest):
    # Modify this function according to model requirements such that inputs and output remains the same
        query = request.query

        if(query != None):
            embedding = client.embeddings.create(
                input=query,
                model=self.embedding_model,
            ).data[0].embedding
            return [embedding]
        
        return "Invalid input"
