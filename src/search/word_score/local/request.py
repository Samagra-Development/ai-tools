import json


class ModelRequest():
    def __init__(self, query, n):
        self.query = query
        self.n = n

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)
