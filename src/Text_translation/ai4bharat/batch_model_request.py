class AI4BharatBatchModelRequest():
    def __init__(self, batch, source, target):
        self.batch = batch
        self.source = source
        self.target = target

    def to_json(self):
        import json
        return json.dumps(self, default=lambda o: o.__dict__, 
                          sort_keys=True, indent=4)