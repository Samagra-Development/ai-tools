# AI Toolchain
AI Toolchain is a collection of tools for quickly building and deploying machine learning models for various use cases. Currently, the toolchain includes a text translation model, and more models may be added in the future.


## Setup
To set up the AI Toolchain environment, follow these steps:
```shell
python3 -m venv venv
source venv/bin/activate
pip install poetry
poetry install
quart --app api --debug run
```

## Data Conversion
In the [folder](src/coref/spacy/data_formatting), parse your dataset through [conll_conversion.py](src/coref/spacy/data_formatting/coNLL_conversion.py)
This will convert your txt file and save CoNLL formatted file to mentioned output directory
### Example
[Training](src/coref/spacy/data_formatting/training.txt) to [Output CoNLL](src/coref/spacy/data_formatting/output.conll) data file 
