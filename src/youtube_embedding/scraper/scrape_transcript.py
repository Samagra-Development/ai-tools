"""
scrape transcript of youtube vedios along with time frames.
"""
from youtube_transcript_api import YouTubeTranscriptApi
import json 
import re
import os 


def vid_id(Url:str)->str:
    """
    retrieves vedio id from url. 
    args:
        Url:url of the vedio in the form of string. 
    returns: 
        vedio_id:returns vedio_id os the url.  
    """
    try:
        match = re.search(r'(?<=v=)[^&]+', Url)
        video_id = match.group(0) if match else None
    except AttributeError:
        print("Video ID not foud in URL.")
    
    return video_id

def transcript(Url:str)->str:
    """
    retrieves the transcript from the youtube video along with timeframe 
    and stores it in json file
    args:
        Url:Url of the vedio.
    returns: 
        output_path:returns absolute path of transcript. 
    """
    output_file='transcript.json'
    v_id=vid_id(Url)

    try:
        transcript = YouTubeTranscriptApi.get_transcript(v_id)
        with open('transcript.json', 'w') as f:
            json.dump(transcript, f)
        
        print("Transcript successfully saved to transcript.json")
    
    except Exception as e:
         print(f"An error occurred: {e}")
    
    absolute_path=os.path.abspath(output_file)
    return absolute_path,transcript




if __name__=='__main__':
    
    pass 