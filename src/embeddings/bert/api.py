
import os
import json
import PyPDF2
import numpy as np
from transformers.models.bert.modeling_bert import BertModel,BertForMaskedLM
from transformers import BertTokenizer
import torch
import warnings
warnings.filterwarnings("ignore")
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from sentence_transformers import SentenceTransformer
from fastapi import FastAPI, File, UploadFile
from io import BytesIO
import pymongo
from bson import ObjectId

app = FastAPI()

""" connecting the database """
def get_database():
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    # database name
    mydb = myclient["C4GT"]
    # calling collections
    documents = mydb["Doc"]

    print("Connected Succesfully...")
    return mydb,documents

""" PDF Parser """
class PDFProcessor:
    def __init__(self, filepath, window_size=100, step_size=50, state_file='state.json'):
        self.filepath = filepath
        self.window_size = window_size
        self.step_size = step_size
        self.state_file = state_file
        self.state = {'position': 0}
        if os.path.exists(state_file):
            with open(state_file) as f:
                self.state = json.load(f)

    def extract_text(self):
        # with open(self.filepath, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(self.filepath)
        text = ""
        for page in range(len(pdf_reader.pages)):
            text += pdf_reader.pages[page].extract_text()
            
        return text

    def clean_text(self, text):
        newtext = ""
        for s in text:
            s = s.replace(' ', '')  # removing all the whitespaces
            newtext += s

        cleaned_text = newtext.replace('\n', ' ').replace('\r', '')
        return cleaned_text

    def process(self):
        text = self.extract_text()
        text = self.clean_text(text)
        words = text.split()
        position = self.state['position']

        embedding = []
        while position + self.window_size < len(words):
            chunk = " ".join(words[position:position+self.window_size])
            # Process the chunk with BERT or another model here
            # ...
            embedding.append(chunk_text(chunk))
            position += self.step_size
            self.state['position'] = position
            with open(self.state_file, 'w') as f:
                json.dump(self.state, f)

        return embedding


""" Chunking Mechanism """
def calculate_embedding_difference(embeddings):
    return [1 - cosine_similarity(embeddings[i].reshape(1, -1), embeddings[i + 1].reshape(1, -1))[0][0] for i in range(len(embeddings) - 1)]

""" Initialize the tokenizer and model """
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

""" Chunk the text """
def chunk_text_by_words(text, chunk_size):
    tokens = nltk.word_tokenize(text)
    chunks = []
    current_chunk = []
    for token in tokens:
        current_chunk.append(token)
        if len(current_chunk) == chunk_size:
            chunks.append(current_chunk)
            current_chunk = []

    # Add any remaining tokens to the last chunk
    if current_chunk:
        chunks.append(current_chunk)

    return chunks


def create_embeddings(text_chunks):
    text = " ".join(text_chunks)
    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    embedding = model.encode(text)
    return embedding

def chunk_text(text):
    if(text==None):
        return
    chunk_size = 10
    chunks = chunk_text_by_words(text, chunk_size)
 
    # Generate embeddings for each chunk
    embeddings = []
    for chunk in chunks:
        chunk = " ".join(chunk)
        inputs = tokenizer(chunk, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
        embeddings.append(outputs.pooler_output.squeeze().numpy())

    # Calculate differences between consecutive embeddings
    differences = calculate_embedding_difference(embeddings)
    # Analyze the differences and find sharp changes
    threshold = 0.1
    sharp_changes = [i for i, diff in enumerate(differences) if diff >= threshold]
    # Merge chunks based on sharp changes
    context_chunks = []
    start = 0
    for idx in sharp_changes:
        context_chunks.append(" ".join(chunks[start:idx + 1][0]))
        start = idx + 1
    context_chunks.append(" ".join(chunks[start:][0]))

    vector_embeddings = create_embeddings(context_chunks)
    return vector_embeddings

# connecting to mongoDB
mydb,documents = get_database()

@app.get("/")
async def root():
    return {"message": "Hello World"}

""" to upload the PDF files """
@app.post("/uploadfile")
async def create_upload_file(file: UploadFile):
    if not file:
        return {"message": "No upload file sent"}
    else:
        file_content = await file.read()
        pdf_buffer = BytesIO(file_content)
        pdfpr = PDFProcessor(pdf_buffer)
        embeddings = pdfpr.process()

        val = {"embeddings": str(embeddings)}
        mycol = mydb["Doc"]
        r = mycol.insert_one(val).inserted_id

        #returning a reportID using which they can get their report
        return {"DocID": str(r)}

""" get the embeddings from the MongoDB """  
@app.get("/get_embeddings/{Doc_ID}")
async def get_embeddings(Doc_ID:str):
    mycol = mydb["Doc"]
    object_id = ObjectId(Doc_ID)
    #finding the DocID in mongoDB
    document = mycol.find_one({'_id': object_id})

    if(document==None):
        return {"Status" : "Not Found"}
    return {"Status" : "Found"}
