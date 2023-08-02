from model import Model
from request import ModelRequest
from quart import Quart, request, Response, send_file  # <- Don't forget to import send_file
import aiohttp
import pandas as pd
import io
from PyPDF2 import PdfReader
import os 

def extract_text_from_txt(txt_path):
    with open(txt_path, 'r', encoding='utf-8') as file:
        return file.read()

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    number_of_pages = len(reader.pages)
    all_text = ""

    for page in reader.pages:
        all_text += page.extract_text()

    return all_text

app = Quart(__name__)

model = None

@app.before_serving
async def startup():
    app.client = aiohttp.ClientSession()
    global model
    model = Model(app)
    

@app.route('/', methods=['POST'])
async def embed():
    global model
    data = await request.get_json()
    files = await request.files  # await the coroutine
    uploaded_file = files.get('file')  # now you can use .get()

    if uploaded_file:
        print("1- File uploaded")

        if uploaded_file:
            file_extension = os.path.splitext(uploaded_file.filename)[1].lower()

            if file_extension == '.txt':
                text_data = uploaded_file.stream.read().decode('utf-8')
            elif file_extension == '.pdf':
                pdf_file_stream = io.BytesIO(uploaded_file.stream.read())
                reader = PdfReader(pdf_file_stream)
                pages = [(i, page.extract_text()) for i, page in enumerate(reader.pages)]  # Modified line
                text_data = pages
            else:
                return (print('Wrong format of file submitted'))
        
        req = ModelRequest(text = text_data)
        response = await model.inference(req)


    else : 
        req = ModelRequest(**data)
        response = await model.inference(req)  # Await the coroutine to get the actual response

    df = pd.read_csv(io.StringIO(response))  # Convert the CSV string back to a DataFrame

    # Save the DataFrame to a CSV file
    df.to_csv('output.csv', index=False)

    return await send_file('output.csv', mimetype='text/csv', as_attachment=True, attachment_filename='output.csv')  # Updated line
