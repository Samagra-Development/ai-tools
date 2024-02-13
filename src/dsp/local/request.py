import json


class ModelRequest():
    def __init__(self, text, train, server: str, model: str=None):
        self.text = text
        self.train = train
        self.server = server
        self.hf_model = model

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)