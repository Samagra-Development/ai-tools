import json 


class ModelRequest():

    def __init__(self,data,trasnscript_data_store):
        self.query=data['query']
        self.url=data['url']
        self.transcript_path=trasnscript_data_store[self.url]['transcript_path']
        self.transcript_data=trasnscript_data_store[self.url]['transcript_data']


    def to_json(self):
        return json.dump(self,default=lambda o:o.__dict__,sort_keys=2,indent=4)