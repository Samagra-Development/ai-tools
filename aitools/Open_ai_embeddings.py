!pip install openai
!pip3 install tiktoken
!pip install sentence-transformers



import pandas as pd
from sentence_transformers import SentenceTransformer
import numpy as np
import json
from sklearn.metrics.pairwise import cosine_similarity



import numpy as np
import openai
import pandas as pd
import pickle
import tiktoken
import openai
COMPLETIONS_MODEL = "text-davinci-003"
EMBEDDING_MODEL = "text-embedding-ada-002"

from openai.embeddings_utils import get_embedding


import os 
os.environ['OPENAI_API_KEY'] = 'sk-'
openai.api_key = os.getenv("OPENAI_API_KEY")

prompt = "Who won the 2020 Summer Olympics men's high jump?"


# embedding model parameters
embedding_model = "text-embedding-ada-002"
embedding_encoding = "cl100k_base"  # this the encoding for text-embedding-ada-002
max_tokens = 8000  # the maximum for text-embedding-ada-002 is 8191


def combine_dataframes(folder_path='folder with files'):
    """
    Reads all CSV files in a folder, applies the create_prompt_df function to each dataframe,
    and combines the resulting dataframes into a single dataframe.
    
    Args:
        folder_path (str): The path to the folder containing the CSV files. Default is 'folder with files'.
    
    Returns:
        A pandas dataframe with the combined content and prompt columns from all input dataframes.
    """
    # Initialize an empty list to store the dataframes
    dfs = []
    
    # Iterate over the files in the folder
    for filename in os.listdir(folder_path):
        # Check if the file is a CSV file
        if filename.endswith('.csv'):
            # Read the CSV file into a dataframe
            filepath = os.path.join(folder_path, filename)
            df = pd.read_csv(filepath,encoding = "ISO-8859-1")
            
            # Apply the create_prompt_df function to the dataframe
            df = create_prompt_df(df)
            
            # Append the resulting dataframe to the list
            dfs.append(df)
    
    # Combine the dataframes into a single dataframe
    combined_df = pd.concat(dfs, ignore_index=True)
    
    return combined_df



def create_prompt_df (df1): 
  prompt_columns =  df1.columns[df1.columns.str.contains('Prompt_')]
  content_columns =  df1.columns[df1.columns.str.contains('Content_')]
  df1[pd.isnull(df1)]= ""

  df1["combined_prompt"] = ''

  for column in prompt_columns:  
    df1["combined_prompt"] = df1["combined_prompt"] + "; " + column.replace('Prompt_','') + ": " + df1[column].str.strip().str.replace("\n",'')

  df1["combined_prompt"] = df1["combined_prompt"].str[2:]

  df1["combined_content"] = ''

  for column in content_columns:  
    df1["combined_content"] = df1["combined_content"] + "; " + column.replace('Content_','') + ": " + df1[column].str.strip().str.replace("\n",'')

  df1['combined_content']=  df1['combined_content'].str[2:]

  return(df1[['combined_content','combined_prompt']])
  
  
  
  
def create_embeddings(df1): 
  encoding = tiktoken.get_encoding(embedding_encoding)
  df1["n_tokens"] = df1.combined_prompt.apply(lambda x: len(encoding.encode(x)))
  df1["embedding"] = df1.combined_prompt.apply(lambda x: get_embedding(x, engine=embedding_model))
  return(df1)


def return_most_similar(prompt):
  new_prompt_embedding = get_embedding(prompt, engine=embedding_model)
  similarity_scores = cosine_similarity([new_prompt_embedding], np.stack(df1['embedding'], axis=0))[0]
  most_similar_indices = np.argsort(similarity_scores)[::-1]
  most_similar_prompts = df1.loc[most_similar_indices, ['combined_prompt','combined_content']]
  most_similar_prompts['similarity_score']=   np.sort(similarity_scores)[::-1]

  return(most_similar_prompts.iloc[0])
  
  
df1 = combine_dataframes(folder_path='folder with files')
df1 = create_embeddings(df1)


prompt =  "Management of blast in rice"
similar_content = return_most_similar(prompt)