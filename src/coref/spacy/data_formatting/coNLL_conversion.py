from spacy_conll import init_parser

nlp = init_parser("en",
                  "stanza",
                  parser_opts={"use_gpu": True, "verbose": False},
                  include_headers=True)

doc = nlp("A cookie is a baked or cooked food that is typically small, flat and sweet. It usually contains flour, sugar and some type of oil or fat.")

# Get the CoNLL representation of the whole document, including headers
conll = doc._.conll_str
print(conll)