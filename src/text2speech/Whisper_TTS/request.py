class ModelRequest:
    def __init__(self, data):
        self.text = data.get('text', '')
        self.language = data.get('language', 'en')
        self.cps = data.get('cps', 10.5)
        self.use_voice_cloning = data.get('use_voice_cloning', False)
