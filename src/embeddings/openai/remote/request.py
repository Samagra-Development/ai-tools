import json

class ModelRequest():
    def __init__(self, query=None, df = None, query_type =  None):
         # Url to download csv file
        self.query = query # String
        self.query_type =  query_type
        self.df = df

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)
