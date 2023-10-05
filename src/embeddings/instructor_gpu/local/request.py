import json
import pandas as pd


class ModelRequest():
    def __init__(self, query=None, df = pd.DataFrame()):
         # Url to download csv file
        self.query = query # String
        self.df = df

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)