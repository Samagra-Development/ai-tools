import requests
import json

class ModelRequest():
    def __init__(self, text, BEAM_WIDTH, SCORE_THRESHOLD, max_distance, lang='ory'):
        self.text = text
        self.BEAM_WIDTH = BEAM_WIDTH
        self.SCORE_THRESHOLD = SCORE_THRESHOLD
        self.max_distance = max_distance
        self.lang = lang  

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
