import pandas as pd
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
from sklearn.model_selection import train_test_split
from transformers import TFMobileBertForSequenceClassification
from transformers import BertTokenizer
from transformers import AutoTokenizer


loaded_model = tf.saved_model.load('save_model_mbert')


max_seq_length = 128
tokenizer = AutoTotokenizer = AutoTokenizer.from_pretrained('google/mobilebert-uncased')
def test_agri(text, model): 
# preprocess the new sentence
  encoded = tokenizer.encode_plus(
      text,
      add_special_tokens=True,
      max_length=max_seq_length,
      pad_to_max_length=True,
      return_attention_mask=True,
      return_tensors='tf'
  )
  input_ids_test = encoded['input_ids']
  attention_masks_test = encoded['attention_mask']
  logits =  model.signatures["serving_default"](input_ids=input_ids_test, attention_mask=attention_masks_test)['logits'][0][0]
    # convert logits to probabilities using sigmoid function
  probabilities = tf.nn.sigmoid(logits)

  # classify sentence based on probability threshold
  if probabilities >= 0.5:
      classification = 1
  else:
      classification = 0
    
  return(classification)


test_agri("What is money?", loaded_model)