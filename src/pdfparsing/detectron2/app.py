
import os
import base64
import json
from flask import Flask, render_template, request, redirect, url_for
import tempfile
from pdf2image import convert_from_path
from PIL import Image
from utils.model import ml_part
app = Flask(__name__)

ALLOWED_EXTENSIONS = {'pdf'}

app.config['UPLOAD_FOLDER'] = tempfile.mkdtemp()
app.config['OUTPUT_FOLDER'] = tempfile.mkdtemp()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        return redirect(url_for('display_images', filename=filename))
    return redirect(request.url)

@app.route('/display/<filename>')
def display_images(filename):
    output_dir = app.config['OUTPUT_FOLDER']
    result = ml_part(filename, app.config['UPLOAD_FOLDER'])
    sorted_results = sorted(result, key=lambda x: x['page'])
    texts = {}
    for item in sorted_results:
        pagenumber = item['page']
        labeled_img = item['labeled_image']
        file_path = os.path.join(output_dir, f"{pagenumber}")
        labeled_img.save(file_path)
        texts[file_path] = item['text']
    images = []
    for image_file in sorted(os.listdir(output_dir)):
        if image_file.endswith('.png'):
            try:
                page_number = int(image_file.split('_')[-1].split('.')[0])
            except ValueError:
                continue
            with open(os.path.join(output_dir, image_file), 'rb') as img_file:
                img_data = base64.b64encode(img_file.read()).decode('utf-8')
                images.append({
                    'data': f"data:image/png;base64,{img_data}",
                    'page_number': page_number,
                    'text': texts[f"{app.config['OUTPUT_FOLDER']}\\{image_file}"],
                })
    return render_template('display.html', images=sorted(images, key=lambda x: x['page_number']))



if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8000)
