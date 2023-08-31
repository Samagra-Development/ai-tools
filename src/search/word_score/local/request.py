import json


class ModelRequest():
    def __init__(self, query, n, search_category):
        self.query = query
        self.n = n
        self.search_category =  search_category

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)
