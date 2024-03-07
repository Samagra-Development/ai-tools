import pdfquery

pdf = pdfquery.PDFQuery('ICT_India_Working_Paper_50.pdf.pdf')
pdf.load()

pdf.tree.write('customers.xml', pretty_print = True)
