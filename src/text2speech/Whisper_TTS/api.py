from quart import Quart, request, send_file
from model import Model
from request import ModelRequest
import logging
import os

app = Quart(__name__)
model = None

logging.basicConfig(level=logging.DEBUG)

@app.before_serving
async def startup():
    global model
    app.logger.info("Initializing model...")
    model = Model()
    app.logger.info("Model initialized successfully")

@app.route('/tts', methods=['POST'])
async def text_to_speech():
    global model
    app.logger.info("Received request for text-to-speech")
    try:
        data = await request.get_json()
        app.logger.debug(f"Received data: {data}")

        use_voice_cloning = data.get('use_voice_cloning', False)
        req = ModelRequest(data)

        if use_voice_cloning:
            app.logger.info("Voice cloning requested")
            reference_audio_path = 'reference_audio.wav'
            if not os.path.exists(reference_audio_path):
                raise FileNotFoundError("Reference audio file not found in the current directory")
            with open(reference_audio_path, 'rb') as voice_cloning_audio:
                result = await model.inference(req, voice_cloning_audio)
        else:
            result = await model.inference(req)

        app.logger.info("Text-to-speech process completed successfully")
        return await send_file(result['output_file'])
    except Exception as e:
        app.logger.error(f"Error in text_to_speech: {str(e)}")
        return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)
