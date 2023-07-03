import numpy as np
import os 
import openai
import pandas as pd
import re
import tiktoken
import nltk
nltk.download('punkt')
from flask import Flask, request, jsonify
from openai.embeddings_utils import get_embedding
import torch
from transformers import AutoTokenizer, AutoModel

COMPLETIONS_MODEL = "text-davinci-003"
EMBEDDING_MODEL = "text-embedding-ada-002"

model_name = 'bert-base-uncased'
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

with open('positive_tests.txt', 'r') as file:
    input_str = file.read()

pattern = r'(Output\n)((?:(?!Example \d+:).)*)'
matches = re.findall(pattern, input_str, re.DOTALL)

list_of_output = [match[1].strip() for match in matches]

pattern = r'Example \d+:\nInput((?:\nQ:.*\nA:.*(?:\nQ:.*\n)*)+)\nOutput(?:\nQ:.*\nA:.*(?:\nQ:.*\n)*)+'
matches = re.findall(pattern, input_str)

list_of_input = [match.strip() for match in matches]

coreferenced_list = []

for text in list_of_output:
  lines = text.split('\n')

  # reverse the list and select the first non-empty string
  last_question = next(filter(None, reversed(lines)), None)
  last_question = last_question.replace("Q:","").strip()
  coreferenced_list.append(last_question)

input_last_q = []
for text in list_of_input:
  lines = text.split('\n')

  # reverse the list and select the first non-empty string
  last_question = next(filter(None, reversed(lines)), None)
  last_question = last_question.replace("Q:","").strip()
  input_last_q.append(last_question)


app = Flask(__name__)


class Neural_coref():
    
    @staticmethod
    def setup_openai(api_key):
        os.environ['OPENAI_API_KEY'] = api_key
        openai.api_key = os.getenv("OPENAI_API_KEY")

    @staticmethod
    def gpt_answer(prompt) :
        answer = openai.Completion.create(
        prompt=prompt,
        temperature=0,
        max_tokens=300,
        model=COMPLETIONS_MODEL
        )["choices"][0]["text"].strip(" \n")
        return(answer)
    
    @staticmethod
    def sent_sim_jacc(sent1, sent2):
        # Tokenize the sentences
        tokens1 = nltk.word_tokenize(sent1.lower())
        tokens2 = nltk.word_tokenize(sent2.lower())

        # Convert tokens to sets
        set1 = set(tokens1)
        set2 = set(tokens2)

        # Calculate the Jaccard similarity between the sets
        jaccard_sim = len(set1.intersection(set2)) / len(set1.union(set2))

        # Return the Jaccard similarity score
        return jaccard_sim
    
    @staticmethod
    def get_bert_embeddings(sentence):
        # Tokenize the sentence
        tokens = tokenizer.encode(sentence, add_special_tokens=True)
        
        # Convert the tokens to tensors
        input_ids = torch.tensor(tokens).unsqueeze(0)
        
        # Get the embeddings from the model
        with torch.no_grad():
            embeddings = model(input_ids)[0]
        
        # Remove the padding tokens from the embeddings
        embeddings = embeddings[:, 1:-1, :]
        
        # Average the embeddings to get a single vector representation of the sentence
        embeddings = torch.mean(embeddings, dim=1)
        
        return embeddings
    
    @staticmethod
    def sent_sim_cosine(embeddings1, embeddings2):
        # Calculate the cosine similarity between the sentence embeddings
        cosine_sim = torch.nn.functional.cosine_similarity(embeddings1, embeddings2, dim=1)
        
        # Return the cosine similarity score
        return cosine_sim.item()


class Neural_coref_sim_scores():
    @staticmethod
    def get_sim_scores(prompt, list_of_input = list_of_input, input_last_q= input_last_q, coreferenced_list= coreferenced_list,bert_cutoff = 0.92):
        
        result_list= []
        for i in range(0,len(list_of_input)):

            input_prompt = prompt.replace('</conversation/>',str(list_of_input[i])) + '/n'
            result =  Neural_coref.gpt_answer(input_prompt)
            result = result.replace("Output:","").replace("User:","").replace("A:","").strip()
            result_list.append(result)

        results_df = pd.DataFrame({'last_question': input_last_q, 'actual_coref': coreferenced_list, 'predicted_coref':result_list})
        results_df['Jacc_similarity'] = results_df.apply(lambda row: Neural_coref.sent_sim_jacc(row['actual_coref'], row['predicted_coref']), axis=1)

        results_df['actual_coref_embeddings'] = results_df['actual_coref'].apply(Neural_coref.get_bert_embeddings)
        results_df['predicted_coref_embeddings'] = results_df['predicted_coref'].apply(Neural_coref.get_bert_embeddings)

        results_df['BERT_similarity_score'] = results_df.apply(lambda x: Neural_coref.sent_sim_cosine(x['actual_coref_embeddings'], x['predicted_coref_embeddings']), axis=1)
        results_df['Bert_Match'] = 0
        results_df.loc[results_df['BERT_similarity_score'] > bert_cutoff,'Bert_Match'] = 1

        results_df = results_df.drop(columns = ['actual_coref_embeddings','predicted_coref_embeddings']) 
        Jacc_sim = results_df['Jacc_similarity'].mean()
        Bert_sim_score =  results_df['BERT_similarity_score'].mean()
        Bert_match_score = results_df['Bert_Match'].mean()
        
        print( 'Jaccard similarity : ',Jacc_sim, "\n")
        print('Bert similarity: ', Bert_sim_score , "\n")
        print('Bert matches %: ',Bert_match_score , "\n" )
        return(results_df,Jacc_sim,Bert_sim_score,Bert_match_score )
            

@app.route('/testing_script', methods=['POST'])
def embeddings_api():
    request_json = request.json
    prompt= str(request_json['prompt'])
    neural_coref = Neural_coref()
    neural_coref.setup_openai(str(request_json['api_key']))
    results_df,Jacc_sim,Bert_sim_score,Bert_match_score  = Neural_coref_sim_scores.get_sim_scores(prompt)
    return (str(Jacc_sim),str(Bert_sim_score),str(Bert_match_score))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 6333 )))
