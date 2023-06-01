from cache import AsyncTTL
from request import ModelRequest
import spacy


class Model:
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.nlp = spacy.load("en_core_web_trf")
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    @AsyncTTL(time_to_live=600000, maxsize=1024)
    async def inference(self, request: ModelRequest):
        text = request.text
        doc = self.nlp(text)
        offset = 0
        reindex = []
        for chain in doc.spans:
            for idx, span in enumerate(doc.spans[chain]):
                if idx > 0:
                    reindex.append([span.start_char, span.end_char, doc.spans[chain][0].text])

        for span in sorted(reindex, key=lambda x: x[0]):
            text = text[0:span[0] + offset] + span[2] + text[span[1] + offset:]
            offset += len(span[2]) - (span[1] - span[0])

        return {"text": text}
