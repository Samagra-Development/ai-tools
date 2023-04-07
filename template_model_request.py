class BatchModelRequest():
    def __init__(self):
        """ Initializes the request object with the given parameters"""
        pass

    def to_json(self):
        """ Returns the json representation of the object"""
        import json
        return json.dumps(self, default=lambda o: o.__dict__, 
                          sort_keys=True, indent=4)