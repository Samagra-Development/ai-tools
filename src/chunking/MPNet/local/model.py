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
import fitz
from request import ModelRequest
import torch
import nltk 
from quart import Response

nltk.download('punkt')
class Splitter:
    def __init__(self, pages, max_chunk_length):
        self.pages = pages
        self.sentencesInDoc = []
        self.max_chunk_length = max_chunk_length
        self.embedding = None
        self.docToSentences()

    def docToSentences(self):
        for page_num, page_content in self.pages:
            sentences = sent_tokenize(page_content)
            for sentence in sentences:
                currSentenceSplits = textwrap.wrap(sentence.strip(), self.max_chunk_length)
                for split in currSentenceSplits:
                    self.sentencesInDoc.append((split, page_num))


    def getChunksConsideringSentences(self):
        chunks = []
        curr_sentence = ''
        start_page = end_page = None
        for sentence, page_num in self.sentencesInDoc:
            if len(curr_sentence + sentence) > self.max_chunk_length:
                chunks.append((curr_sentence, start_page, end_page))
                curr_sentence = sentence
                start_page = end_page = page_num
            else:
                curr_sentence = curr_sentence + ' ' + sentence
                end_page = page_num
                if start_page is None:
                    start_page = page_num
        chunks.append((curr_sentence, start_page, end_page))
        return chunks


    # taken from https://medium.com/@npolovinkin/how-to-chunk-text-into-paragraphs-using-python-8ae66be38ea6
    def getChunksConsideringNeighbouringSimilarity(self, numberOfSentencesToCalculatedWeightedSum=10):
        encoding_model = SentenceTransformer('all-mpnet-base-v2')

        if self.embedding is None:
            print('Document Encoding Process :-')
            sentences_only = [sentence for sentence, _ in self.sentencesInDoc]
            self.embedding = encoding_model.encode(
                    sentences_only,
                    show_progress_bar=True,
                    batch_size=32,
                    device=torch.device("cuda" if torch.cuda.is_available() else "cpu")
                )

        similarities = cosine_similarity(self.embedding)
        activated_similarities = self.activate_similarities(similarities, p_size=numberOfSentencesToCalculatedWeightedSum)
        minimas = argrelextrema(activated_similarities, np.less, order=2)[0].reshape(-1)
        return self.getChunksWithMinimas(minimas)


    def getChunksWithMinimas(self, minimas):
        chunks = []
        chunk_start = 0
        chunk_text = ''
        start_page = None
        end_page = None

        for minima in minimas:
            for i in range(chunk_start, minima):
                sentence, page_num = self.sentencesInDoc[i]
                chunk_text += ' ' + sentence
                end_page = page_num
                if start_page is None:
                    start_page = page_num

            chunks.append((chunk_text.strip(), start_page, end_page))
            chunk_text = ''
            start_page = end_page = None
            chunk_start = minima

        if chunk_start != len(self.sentencesInDoc):
            for i in range(chunk_start, len(self.sentencesInDoc)):
                sentence, page_num = self.sentencesInDoc[i]
                chunk_text += ' ' + sentence
                end_page = page_num
                if start_page is None:
                    start_page = page_num
            chunks.append((chunk_text.strip(), start_page, end_page))

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
    doc = fitz.open(pdf_path) # open a document
    all_text = ""
    for page in doc: # iterate the document pages
        all_text += page.get_text("text")

    return all_text

# Replace "NEP_Final_English.pdf" with the path to your PDF file
#pdf_text = extract_text_from_pdf("NEP_Final_English.pdf")


class Model():
    def __new__(cls, context):
        cls.context = context
        if not hasattr(cls, 'instance'):
            cls.instance = super(Model, cls).__new__(cls)
        return cls.instance

    async def inference(self, request: ModelRequest):
    # Modify this function according to model requirements such that inputs and output remains the same
        pages =  request.text
        splitter = Splitter(pages, 4 * 1024)
        chunks = splitter.getChunksConsideringNeighbouringSimilarity()
        df = pd.DataFrame({'content': [content for content, _, _ in chunks],
                        'start_page': [start_page for _, start_page, _ in chunks],
                        'end_page': [end_page for _, _, end_page in chunks]})

        csv_string = df.to_csv(index=False)

        # Properly escape the CSV string
        
        return csv_string