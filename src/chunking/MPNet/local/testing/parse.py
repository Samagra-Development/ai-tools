import xml.etree.ElementTree as ET
import csv

def extract_text_from_pages(xml_file, output_csv):
    tree = ET.parse(xml_file)
    root = tree.getroot()

    with open(output_csv, 'w', newline='', encoding='utf-8') as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow(['text', 'page_number', 'index'])  # CSV header

        recent_index = None

        for _, page in enumerate(root.findall('.//LTPage'), start=0):
            for element in page.iter():
                if element.tag.startswith('LTText'):
                    text = element.text
                    if text is not None:
                        text = text.strip()
                        if text:
                            page_number = page.get('page_index')
                            if 'index' in element.attrib:
                                recent_index = element.text
                            csv_writer.writerow([text, page_number, recent_index])

if __name__ == '__main__':
    input_xml_file = 'customers.xml'   # Replace with your input XML file path
    output_csv_file = 'output.csv' # Replace with your desired output CSV file path
    
    extract_text_from_pages(input_xml_file, output_csv_file)
