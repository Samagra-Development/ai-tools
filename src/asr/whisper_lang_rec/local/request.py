import requests
import json


class ModelRequest():
    def __init__(self, wav_file,n_seconds):
        self.wav_file = wav_file
        self.n_seconds = n_seconds

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)