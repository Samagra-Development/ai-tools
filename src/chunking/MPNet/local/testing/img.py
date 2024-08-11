import fitz  # PyMuPDF

def extract_images_from_pdf(pdf_path, output_folder):
    pdf_document = fitz.open(pdf_path)
    
    for page_num in range(pdf_document.page_count):
        page = pdf_document[page_num]
        images = page.get_images(full=True)
        
        for img_index, img in enumerate(images):
            xref = img[0]
            base_image = pdf_document.extract_image(xref)
            image = base_image["image"]
            
            image_file_extension = base_image["ext"]
            image_filename = f"{output_folder}/image_page_{page_num + 1}_img_{img_index + 1}.{image_file_extension}"
            
            with open(image_filename, "wb") as image_file:
                image_file.write(image)
                
    pdf_document.close()

if __name__ == "__main__":
    pdf_path = "ICT_India_Working_Paper_50.pdf"  # Change this to your PDF file's path
    output_folder = "output_images"    # Change this to the desired output folder
    
    extract_images_from_pdf(pdf_path, output_folder)
