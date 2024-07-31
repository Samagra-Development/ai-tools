import os
from pydub import AudioSegment
from pytube import Playlist
from openai import OpenAI
import sqlite3
from datetime import datetime

# Function to download audio from the playlist URL
def download_audio_from_playlist(playlist_url, download_directory):
    # Create a Playlist object
    playlist = Playlist(playlist_url)

    # Create the directory if it doesn't exist
    if not os.path.exists(download_directory):
        os.makedirs(download_directory)

    # Iterate through each video in the playlist
    for video in playlist.videos:
        try:
            # Get the highest resolution audio stream
            audio_stream = video.streams.filter(only_audio=True, file_extension='wav').first()

            # Download the audio stream
            audio_stream.download(output_path=download_directory)

            print(f"Audio downloaded for video: {video.title}")

        except Exception as e:
            print(f"Error downloading audio for video {video.title}: {str(e)}")

    print("Audio download complete.")

# Function to slice audio into 4-minute chunks
def slice_audio(input_dir, file_name, output_dir, target_length):
    song = AudioSegment.from_wav("%s/%s.wav" % (input_dir, file_name))
    timestamps = []
    chunks = []

    i = 0
    while i < len(song)/(float(target_length)*1000):
        seconds = float(target_length) * 1000 * i
        seconds2 = float(target_length) * 1000 * (i+1)
        cut = song[seconds:seconds2]

        # Store timestamp and chunk name
        timestamp = datetime.now()
        chunk_name = f"{file_name}-{float(target_length)}sec-{i}.wav"
        cut.export(f"{output_dir}/{chunk_name}", format="wav")

        timestamps.append(timestamp)
        chunks.append(chunk_name)
        i += 1

    print("Audio slicing complete.")
    return timestamps, chunks

# Function to perform speech-to-text using Whisper model
def transcribe_audio_with_whisper(audio_directory):
    client = OpenAI(api_key='your_openai_api_key')  # Replace with your OpenAI API key

    transcripts = []

    # Iterate through each audio file in the directory
    for audio_file_name in os.listdir(audio_directory):
        if audio_file_name.endswith('.wav'):
            audio_file_path = os.path.join(audio_directory, audio_file_name)

            # Open the audio file
            with open(audio_file_path, "rb") as audio_file:
                # Perform transcription using Whisper ASR model
                transcript = client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    response_format="text"
                )

                print(f"Transcription for {audio_file_name}:")
                print(transcript)

                transcripts.append(transcript)

    return transcripts

# Function to perform text summarization using Whisper model
def text_summarization(transcripts):
    client = OpenAI(api_key='your_openai_api_key')  # Replace with your OpenAI API key

    summarizations = []

    # Iterate through each transcription
    for transcript in transcripts:
        # Extract text from the transcription
        text = transcript['data'][0]['text']

        # Perform text summarization using Whisper model
        summary = client.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=f"Summarize the text: {text}",
            temperature=0.7,
            max_tokens=300,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )

        if 'choices' in summary and len(summary['choices']) > 0:
            summarization = summary['choices'][0]['text']
            print(f"Summarization for the transcription:")
            print(summarization)

            summarizations.append(summarization)

    return summarizations

def save_to_database(link, chunks, timestamps, summarizations):
    connection = sqlite3.connect('TextSummarisation.db')  
    cursor = connection.cursor()

    for i, (chunk, timestamp, summarization) in enumerate(zip(chunks, timestamps, summarizations), start=1):
        # Assuming you have a table named 'audio_data' with columns 'link', 'chunk_number', 'timestamp', 'summarization'
        query = "INSERT INTO audio_data (link, chunk_number, timestamp, summarization) VALUES (?, ?, ?, ?)"
        cursor.execute(query, (link, i, timestamp, summarization))

    connection.commit()
    connection.close()

def main():
    global input_dir, target_length, file_name, output_dir, playlist_url, chunks, timestamps

    # Get user input for playlist URL
    playlist_url = input("Enter the playlist video link: ")

    # Set parameters (you can modify these as needed)
    input_dir = 'audio_downloads'
    file_name = 'output'
    output_dir = 'audio_chunks'
    target_length = 240  # in seconds
    chunks = []
    timestamps = []

    # Download audio from the user-provided playlist URL
    download_audio_from_playlist(playlist_url, input_dir)

    # Slice the downloaded audio files into 4-minute chunks
    timestamps, chunks = slice_audio(input_dir, file_name, output_dir, target_length)

    # Perform speech-to-text using Whisper model
    transcripts = transcribe_audio_with_whisper(output_dir)

    # Perform text summarization using Whisper model
    summarizations = text_summarization(transcripts)

    save_to_database(playlist_url, chunks, timestamps, summarizations)

    print("Text Summarizations:")
    print(summarizations)

if __name__ == "__main__":
    main()
