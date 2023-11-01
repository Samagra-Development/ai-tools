import json


class ModelRequest():
    def __init__(self, query, k=4):
        self.query = query
        self.k = k
     

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)
