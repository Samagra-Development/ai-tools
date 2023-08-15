import json

class ModelRequest():
    def __init__(self, text, source_language, target_language, source=None, translation=None):
        self.text = text
        self.source_language = source_language
        self.target_language = target_language
        self.source = source
        self.translation = translation

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
