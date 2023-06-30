from langchain.document_loaders import PyPDFLoader
from transformers import GPT2TokenizerFast
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceInstructEmbeddings
import PyPDF2

import re
from fastapi import FastAPI, File, UploadFile
from io import BytesIO
import pymongo
from bson import ObjectId

app = FastAPI()

""" tokenizer """
tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")

""" model for embedding """
model_name = "hkunlp/instructor-large"
model_kwargs = {'device': 'cpu'}
hf = HuggingFaceInstructEmbeddings(
    model_name=model_name, model_kwargs=model_kwargs
)

""" connecting to mongoDB """
def get_database():
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    # database name
    mydb = myclient["C4GT"]
    # calling collections
    documents = mydb["Doc"]

    print("Connected Succesfully...")
    return mydb,documents

def merge_hyphenated_words(text: str) -> str:
    return re.sub(r"(\w)-\n(\w)", r"\1\2", text)

def fix_newlines(text: str) -> str:
    return re.sub(r"(?<!\n)\n(?!\n)", " ", text)

def remove_multiple_newlines(text: str) -> str:
    return re.sub(r"\n{2,}", "\n", text)


""" Extract the text from the PDF file. """
def extract_text(file):
    pdf_reader = PyPDF2.PdfReader(file)
    text = ""

    for page in range(len(pdf_reader.pages)): 
        text += pdf_reader.pages[page].extract_text()

    text = merge_hyphenated_words(text)
    text = fix_newlines(text)
    text = remove_multiple_newlines(text)
    return text

""" Tokenize the extracted text and create chunks. """
def create_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 100,
        chunk_overlap  = 0,
        length_function = len,
    )
    tokens = text_splitter.create_documents([text])
    return tokens


"""  For each chunk, create vector embeddings using an Instructor Model. """
def create_embeddings(tokens):
    embeddings = []
    for token in tokens:
        embedding = hf.embed_documents([token.page_content])
        embeddings.append(embedding)
    return embeddings


# connecting to mongoDB
mydb,documents = get_database()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/uploadfile")
async def create_upload_file(file: UploadFile=File(...)):
    if not file:
        return {"message": "No upload file sent"}
    else:
        file_content = await file.read()
        pdf_buffer = BytesIO(file_content)
        text = extract_text(pdf_buffer)

        chunks = create_chunks(text)
        embeddings = create_embeddings(chunks)

        val = {"embeddings": str(embeddings)}
        mycol = mydb["Doc"]
        r = mycol.insert_one(val).inserted_id

        #returning a docID using which they can get their report
        return {"DocID": str(r)}

    
@app.get("/get_embeddings/{Doc_ID}")
async def get_embeddings(Doc_ID:str):
    mycol = mydb["Doc"]
    object_id = ObjectId(Doc_ID)
    #finding the DocID in mongoDB
    document = mycol.find_one({'_id': object_id})

    if(document==None):
        return {"Status" : "Not Found"}
    return {"Status" : "Found"}



    
