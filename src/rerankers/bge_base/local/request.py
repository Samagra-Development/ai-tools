import requests
import json

class ModelRequest():
    def __init__(self, question, content_chunks):
        self.question = question
        self.content_chunks = content_chunks
        self.predict_array = [[question, content] for content in content_chunks]

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)
    

 