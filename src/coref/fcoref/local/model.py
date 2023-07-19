from cache import AsyncTTL
from request import ModelRequest
from fastcoref import spacy_component
import spacy


class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.nlp = spacy.load("en_core_web_sm", exclude=["parser", "lemmatizer", "ner", "textcat"])
            cls.nlp.add_pipe("fastcoref")
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    @AsyncTTL(time_to_live=600000, maxsize=1024)
    async def inference(self, request: ModelRequest):
        text = request.text
        doc = self.nlp(text, component_cfg={"fastcoref": {'resolve_text': True}})
        text = doc._.resolved_text

        return {"text": text}
    