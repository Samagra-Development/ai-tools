import json


class ModelRequest():
    def __init__(self, text, temperature: float = 0.7, max_length: int = 512, num_beams: int = 5):
        self.text = text
        self.temperature = temperature
        self.max_length = max_length
        self.num_beams = num_beams

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)