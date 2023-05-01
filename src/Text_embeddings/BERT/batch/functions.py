import numpy as np
import openai
import pandas as pd
import tiktoken
from openai.embeddings_utils import get_embedding
EMBEDDING_MODEL = "text-embedding-ada-002"


class embeddings():

	def create_prompt_df (df1): 
	  df1.columns = df1.columns.str.lower()
	  prompt_columns =  df1.columns[df1.columns.str.contains('prompt_')]
	  content_columns =  df1.columns[df1.columns.str.contains('content_')]
	  df1 = df1[prompt_columns.append(content_columns)]
	  df1[pd.isnull(df1)]= ""

	  df1["combined_prompt"] = ''

	  for column in prompt_columns:  
		df1["combined_prompt"] = df1["combined_prompt"] + "; " + column.replace('prompt_','') + ": " + df1[column].str.strip().str.replace("\n",'')

	  df1["combined_prompt"] = df1["combined_prompt"].str[2:]

	  df1["combined_content"] = ''

	  for column in content_columns:  
		df1["combined_content"] = df1["combined_content"] + "; " + column.replace('content_','') + ": " + df1[column].str.strip().str.replace("\n",'')

	  df1['combined_content']=  df1['combined_content'].str[2:]

	  return(df1[['combined_content','combined_prompt']])
	  
	def create_embeddings(df1): 
	  encoding = tiktoken.get_encoding(embedding_encoding)
	  df1["n_tokens"] = df1.combined_prompt.apply(lambda x: len(encoding.encode(x)))
	  df1["embedding"] = df1.combined_prompt.apply(lambda x: get_embedding(x, engine=embedding_model))
	  return(df1)
