import json


class ModelRequest():
    def __init__(self, text_corpus=None, query=None):
        self.text_corpus = text_corpus # Url to download csv file
        self.query = query # String

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)