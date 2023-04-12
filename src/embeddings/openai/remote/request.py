import json


class ModelRequest():
    def __init__(self, prompt, similarity_score_range=0):
        self.prompt = prompt
        self.similarity_score_range = similarity_score_range

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)
