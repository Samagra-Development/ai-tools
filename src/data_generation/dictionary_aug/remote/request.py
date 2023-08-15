import json


class ModelRequest():
    def __init__(self, source, translation):
        self.source = source
        self.translation =  translation

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)
