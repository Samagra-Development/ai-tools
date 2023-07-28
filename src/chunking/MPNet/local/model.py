import numpy as np
import pandas as pd
import segeval
import textwrap
import json
from nltk.tokenize import sent_tokenize
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import math
from scipy.signal import argrelextrema
from PyPDF2 import PdfReader
from request import ModelRequest
import torch
import nltk 
from quart import Response

nltk.download('punkt')

class Splitter:
    def __init__(self,doc,max_chunk_length):
        self.doc = doc
        self.sentencesInDoc = []
        self.max_chunk_length = max_chunk_length
        self.embedding = None
        self.docToSentences()

    def docToSentences(self):
        sentences = sent_tokenize(self.doc)
        for sentence in sentences:
            currSentenceSplits = textwrap.wrap(sentence.strip(), self.max_chunk_length)
            self.sentencesInDoc.extend(currSentenceSplits)

    def getChunksConsideringSentences(self):
      ## chunk having one sentence only. Keep on adding sentences using docToSentences until you reach maximum words threshold
        chunks = []
        curr_sentence = ''
        for sentence in self.sentencesInDoc:
            if len(curr_sentence + sentence) > self.max_chunk_length:
                chunks.append(curr_sentence)
                curr_sentence = sentence
            else:
                curr_sentence = curr_sentence + ' ' + sentence
        chunks.append(curr_sentence)
        return chunks

    # taken from https://medium.com/@npolovinkin/how-to-chunk-text-into-paragraphs-using-python-8ae66be38ea6
    def getChunksConsideringNeighbouringSimilarity(self,numberOfSentencesToCalculatedWeightedSum=10):
        encoding_model = SentenceTransformer('all-mpnet-base-v2')

        if self.embedding is None:
            print('Document Encoding Process :-')
            self.embedding = encoding_model.encode(
                    self.sentencesInDoc,
                    show_progress_bar=True,
                    batch_size=32,
                    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
                )

        similarities = cosine_similarity(self.embedding)
        activated_similarities = self.activate_similarities(similarities, p_size=numberOfSentencesToCalculatedWeightedSum)
        minimas = argrelextrema(activated_similarities, np.less, order=2)[0].reshape(-1)
        return self.getChunksWithMinimas(minimas)

    def getChunksWithMinimas(self,minimas):
        chunks = []
        chunk_start = 0
        for minima in minimas:
            mergedSentence = ' '.join(self.sentencesInDoc[chunk_start:minima])
            chunk_start = minima
            currSentenceSplits = textwrap.wrap(mergedSentence, self.max_chunk_length)
            chunks.extend(currSentenceSplits)
        if(chunk_start != len(self.sentencesInDoc) - 1):
            chunks.extend(self.sentencesInDoc[chunk_start:])
        return chunks


    def rev_sigmoid(self,x:float)->float:
        return (1 / (1 + math.exp(0.5*x)))

    def activate_similarities(self,similarities:np.array, p_size=10)->np.array:
        """ Function returns list of weighted sums of activated sentence similarities
        Args:
            similarities (numpy array): it should square matrix where each sentence corresponds to another with cosine similarity
            p_size (int): number of sentences are used to calculate weighted sum
        Returns:
            list: list of weighted sums
        """
        x = np.linspace(-10,10,p_size)
        y = np.vectorize(self.rev_sigmoid)
        activation_weights = np.pad(y(x),(0,similarities.shape[0]-p_size))
        diagonals = [similarities.diagonal(each) for each in range(0,similarities.shape[0])]
        diagonals = [np.pad(each, (0,similarities.shape[0]-len(each))) for each in diagonals]
        diagonals = np.stack(diagonals)
        diagonals = diagonals * activation_weights.reshape(-1,1)
        activated_similarities = np.sum(diagonals, axis=0)
        return activated_similarities
    


def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    number_of_pages = len(reader.pages)
    all_text = ""

    for page in reader.pages:
        all_text += page.extract_text()

    return all_text

# Replace "NEP_Final_English.pdf" with the path to your PDF file
pdf_text = extract_text_from_pdf("NEP_Final_English.pdf")


class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    async def inference(self, request: ModelRequest):
    # Modify this function according to model requirements such that inputs and output remains the same
        splitter = Splitter(request.text, 4 * 1024)
        chunks = splitter.getChunksConsideringNeighbouringSimilarity()
        df = pd.DataFrame({'content': chunks})
        # Convert DataFrame to a CSV string
        csv_string = df.to_csv(index=False)

        # Properly escape the CSV string
        
        return csv_string