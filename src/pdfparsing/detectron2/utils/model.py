from pdf2image import convert_from_path
import layoutparser as lp
import base64
from PIL import Image
import numpy as np
import detectron2
import os

def ml_part(filename, upload_folder):
    ocr_agent = lp.TesseractAgent(languages='eng')
    pdf_path = os.path.join(upload_folder, filename)
    images = convert_from_path(pdf_path)
    
    pagevsnumber = {}
    for i, image in enumerate(images):
        pagevsnumber[f'page_{i+1}.png'] = image
    
    
    
    model = lp.Detectron2LayoutModel('config.yaml',
                                     extra_config=["MODEL.ROI_HEADS.SCORE_THRESH_TEST", 0.4],
                                     label_map={0: "Text"})
    result = []
    for pagenumber, image in pagevsnumber.items():
        layout_result = model.detect(image)
        text_blocks = lp.Layout([b for b in layout_result])
        texts = []
        for block in text_blocks:
            x_1, y_1, x_2, y_2 = block.coordinates
            x_1 -= 15
            y_1 -= 5
            x_2 += 15
            y_2 += 5
            segment_image = image.crop((x_1, y_1, x_2, y_2))
            text = ocr_agent.detect(segment_image)
            block.set(text=text, inplace= True)
            labeled_img = lp.draw_box(image, text_blocks,  box_width=5, box_alpha=0.2, show_element_type=True, show_element_id=True)
            texts.append(text)
        result.append({'image': image,'labeled_image': labeled_img, 'text': '\n----\n'.join(texts), 'page': pagenumber})
    return result
      
