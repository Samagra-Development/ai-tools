This project uses WhisperSpeech to convert text to speech, with an option for voice cloning.
reference - https://github.com/collabora/WhisperSpeech

## Endpoints

### Text-to-Speech

**Endpoint:** `/tts`  
**Method:** `POST`  
**Description:** Converts text to speech and returns an audio file.

**Request Body:**
```json
{
  "text": "Your text here",
  "language": "en",
  "cps": 15,
  "use_voice_cloning": false
}
```

- `text`: The text to be converted to speech.
- `language`: The language for the speech output (default: "en").
- `cps`: Characters per second for speech synthesis (default: 10.5).
- `use_voice_cloning`: Optional flag to enable voice cloning (default: false).

**Example Request:**

Basic TTS:
```bash
curl -X POST http://localhost:8000/tts \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, world! This is a test of the text-to-speech system.",
    "language": "en",
    "cps": 15
  }' \
  --output output.wav
```

Text-to-Speech with Voice Cloning:
```bash
curl -X POST http://localhost:8000/tts \
  -H "Content-Type: application/json" \
  -d '{
    "text": "This is a voice cloning test.",
    "language": "en",
    "cps": 15,
    "use_voice_cloning": true
  }' \
  --output cloned_output.wav
```

**Notes:**

- For voice cloning to work, ensure that `reference_audio.wav` is present in the same directory as the server script.

## Docker Deployment

1. **Build the Docker Image:**
   ```bash
   docker build -t quart-tts-gpu-app .
   ```

2. **Run the Docker Container:**
   ```bash
   docker run --gpus all -p 8000:8000 quart-tts-gpu-app
   ```

## Setting Up Without Docker

1. **Clone the Repository:**

2. **Set Up a Virtual Environment (Optional but recommended):**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install Dependencies:**

   Ensure `requirements.txt` is present in the directory, then run:
   ```bash
   pip install --no-cache-dir -r requirements.txt
   ```

4. **Prepare the Reference Audio (For Voice Cloning):**

   Place `reference_audio.wav` in the same directory as your `api.py` script if you plan to use voice cloning.

5. **Run the Quart Application:**

   ```bash
   python api.py
   ```

   The service will be accessible at `http://localhost:8000`.

5. **Example Ouput:**
    - ouptut with cloning
        https://github.com/user-attachments/assets/fa4bc138-e17a-4e1c-a88a-8dd5f37e0db4


    - output without cloning
        https://github.com/user-attachments/assets/1bb4ee27-3730-4cca-85f0-f72629d7c640

