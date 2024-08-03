"""
transform transcipted data and devides it into chunks.
Initially chunking 4mins video frame is implemented, 
other more optimized algorithms will be implemented in 
further iterations. 
"""

import json 
from typing import List,Dict,Any
import pandas as pd 


class TranscriptChunker:
    """
    TranscriptChunker class for processing youtube transcript.

    Attributes:
        chunk_size_seconds (int): The size of each chunk in seconds.
    
    Methods:
        fit(transcript_path: str) -> None:
            Reads the transcript data from a JSON file and prepares the class for transformation.

        _transform() -> Dict[str,List[Dict[str,Any]]]:
            Transforms the transcript data into chunks of specified size.

        chunks() ->Dict[str,List[Dict[str,Any]]] :
            Returns the resulting chunks .

        metadata() -> Dict[str,Dict[str,Any]]:
            Returns metadata about the chunks, such as the number of chunks and their durations.
    
    
        Example:
            chunker = TranscriptChunker(chunk_size_seconds=240)
            chunker.fit('transcript.json')
            chunks_df = chunker.chunks()
            metadata = chunker.metadata()
    """

    def __init__(self,chunk_size_seconds:int=240)->None:
        self.chunk_size_seconds:int=chunk_size_seconds
        # transcipt will be converted to pandas dataframe for better data manipulation 
        self.transcript_df:pd.DataFrame = None
        self.result_chunks:Dict[str,List[Dict[str,Any]]] = None
        
        
    def fit(self,transcript_path:str)->None:
        with open(transcript_path,'r') as file:
            transcript_data=json.load(file)
        self.transcript_df=pd.DataFrame(transcript_data)
        self.result_chunks=self._transform() 
        
    
    def _transform(self)->List[Dict[str,Any]]:
        
        if self.transcript_df is None:
            raise ValueError("Transcript data not provided.")
        
        current_chunk=[]
        current_chunk_duration = 0 
        
        # Dictionary to store all chunks 
        self.all_chunks={}

        chunk_counter=1

        for index,row in self.transcript_df.iterrows():

            if current_chunk_duration+row['duration']<=self.chunk_size_seconds:

                current_chunk.append(row.to_dict())
                current_chunk_duration+=row['duration']
            else:
                self.all_chunks[f'chunk{chunk_counter}']=current_chunk
                current_chunk=[row.to_dict()]
                current_chunk_duration = row['duration']
                chunk_counter+=1
        
        if current_chunk:
            self.all_chunks[f'chunk{chunk_counter}'] = current_chunk

        return self.all_chunks


    
    def chunks(self)->Dict[str,List[Dict[str,Any]]]:
        if self.result_chunks is None:
            raise ValueError("Call .fit() method first to transform data into chunks")
        
        return self.result_chunks  
         
   
    #this method returns meta data about chunks like size of each chunk 
    #start duration and end duration of chunk  
    def metadata(self)->Dict[str,Dict[str,Any]]:
        if self.result_chunks is None:
            raise ValueError("Call .fit() method first to transform data into chunks")
        
        self.meta_dict={}
        for chunk in self.result_chunks.keys():
            dict={}
    
            #calculating length of chunk(number of words)
            text=" "
            for item in self.result_chunks[chunk]:
                text=text+" "+item['text']
                chunk_length=len(text.split())
                dict['chunk_length']=chunk_length

            #calculating duration of each chunk in minutes 
                start_time=self.result_chunks[chunk][0]['start']
                length=len(self.result_chunks[chunk])
                end_time=self.result_chunks[chunk][length-1]['start']+self.result_chunks[chunk][length-1]['duration']

                dict['start_time']=round((start_time)/60,2)
                dict['end_time']=round((end_time)/60,2)
                self.meta_dict[chunk]=dict

        
        return self.meta_dict
            

if __name__=='__main__':

    chunks=TranscriptChunker()
    chunks.fit('/home/suyash/samagra/ai-tools/src/youtube_embedding/scraper/transcript.json')
    print(chunks.metadata())
