class AI4BharatBatchModel():
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(AI4BharatBatchModel, cls).__new__(cls)
            cls.load_model(cls)
        return cls.instance

    def load_model(self):
        """ Loads the model. This method is called only once when the model is first loaded."""
        pass

    def inference(self, request):
        """ Performs inference on the given request. This method is called for every request."""
        pass