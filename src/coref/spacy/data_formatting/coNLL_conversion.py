from spacy_conll import init_parser
# text = '''
#   'User': 'How can i apply for a kisan credit card loan?',
#   'AI': "To apply for a Kisan Credit Card loan, you need to visit a bank that offers this loan product. Different banks have different requirements for mandatory documents, loan tenure, and effective rate of interest. Some banks that offer Kisan Credit Card loans include State Bank of India, Punjab and Sind Bank, Indian Bank, Bank of India, and Union Bank. It is recommended that you bring along some important documents such as Aadhar card, pan card, voter ID card, bank statement, land documents, and others depending on the bank's requirements. You can contact your nearest bank branch or visit their website to know more about their specific loan requirements and application process."}]
#   'User': 'Can you give me more details on application process for above with State Bank of India? '
#   '''

def conversion(fname, outname):
  nlp = init_parser("en",
                    "stanza",
                    parser_opts={"use_gpu": True, "verbose": False},
                    include_headers=True)

  with open(fname, encoding = "utf-8") as infile:
        text = infile.read()


  # doc = nlp("A cookie is a baked or cooked food that is typically small, flat and sweet. It usually contains flour, sugar and some type of oil or fat.")
  doc = nlp(text)

  # Get the CoNLL representation of the whole document, including headers
  conll = doc._.conll_str

  with open(outname, 'w', encoding='utf-8') as f:
    f.write(conll)

  # conll.to_disk(outname)
  # return conll

#example of conversion of training.txt
conversion('/content/training.txt', '/content/output.conll')
