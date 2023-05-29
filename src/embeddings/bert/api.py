import json
import os

import PyPDF2
import torch
from sklearn.metrics.pairwise import cosine_similarity
from transformers import BertTokenizer, BertModel

text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " \
       "sed do eiusmod tempor incididunt ut labore et dolore magna " \
       "aliqua. Ut enim ad minim veniam, quis nostrud exercitation " \
       "ullamco laboris nisi ut aliquip ex ea commodo consequat. " \
       "Duis aute irure dolor in reprehenderit in voluptate velit " \
       "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint " \
       "occaecat cupidatat non proident, sunt in culpa qui officia " \
       "deserunt mollit anim id est laborum."


# --------------------------------------------------------------------- #
# PDF Parser and vector embedding based on cosine distance chunking.#

class PDFProcessor:
    def __init__(
            self,
            filepath,
            window_size=100,
            step_size=50,
            state_file='state.json',
            tokenizer='bert-base-uncased',
            model='bert-base-uncased'
    ):
        # saving pdf tokenizer parameters
        self.__filepath = filepath
        self.__window_size = window_size
        self.__step_size = step_size
        self.__state_file = state_file
        self.__state = {'position': 0}

        # Initialize the tokenizer and model
        self.__tokenizer = BertTokenizer.from_pretrained(tokenizer)
        self.__model = BertModel.from_pretrained(model)

        # Load saved state if exists
        if os.path.exists(state_file):
            with open(state_file) as f:
                self.__state = json.load(f)

    @staticmethod
    def extract_text(filepath):
        with open(filepath, "rb") as file:
            pdf_reader = PyPDF2.PdfFileReader(file)
            text = ""
            for page in range(pdf_reader.getNumPages()):
                text += pdf_reader.getPage(page).extractText()
        return text

    @staticmethod
    def clean_text(text):
        # Customize this method based on your specific cleaning requirements
        cleaned_text = text.replace('\n', ' ').replace('\r', '')
        return cleaned_text

    @staticmethod
    def calculate_embedding_difference(embeddings):
        return [1 - cosine_similarity(embeddings[i].reshape(1, -1), embeddings[i + 1].reshape(1, -1))[0][0] for i in
                range(len(embeddings) - 1)]

    @staticmethod
    def chunk_text_by_words(text, chunk_size):
        start = 0
        end = 0
        while start < len(text) and end != -1:
            end = text.rfind(" ", start, start + chunk_size + 1)
            if (end == -1):
                end = text.find(" ", start)
            if (end == -1):
                yield text[start:]
            else:
                yield text[start:end]
            start = end + 1

    def __chunk_text_by_cosine_distance(self, text, threshold=0.3, chunk_size=10):
        # Chunk the text
        chunks = list(self.chunk_text_by_words(text, chunk_size))

        # Generate embeddings for each chunk
        embeddings = []
        for chunk in chunks:
            inputs = self.__tokenizer(chunk, return_tensors="pt")
            with torch.no_grad():
                outputs = self.__model(**inputs)
            embeddings.append(outputs.pooler_output.squeeze().numpy())

        # Calculate differences between consecutive embeddings
        differences = self.calculate_embedding_difference(embeddings)

        # Analyze the differences and find sharp changes
        sharp_changes = [i for i, diff in enumerate(differences) if diff >= threshold]

        # Merge chunks based on sharp changes
        context_chunks = []
        start = 0
        for idx in sharp_changes:
            context_chunks.append(" ".join(chunks[start:idx + 1]))
            start = idx + 1
        context_chunks.append(" ".join(chunks[start:]))

        return context_chunks

    def vector_embedding(self):
        text = self.extract_text(self.__filepath)
        text = self.clean_text(text)
        words = text.split()
        position = self.__state['position']
        embeddings = []
        while position + self.__window_size < len(words):
            # Chunking window based on cosine distance.
            chunk = " ".join(words[position:position + self.__window_size])
            cosine_chunks = self.__chunk_text_by_cosine_distance(text=chunk)

            # Generate embeddings for each chunk.
            for cosine_chunk in cosine_chunks:
                inputs = self.__tokenizer(cosine_chunk, return_tensors="pt")
                with torch.no_grad():
                    outputs = self.__model(**inputs)
                embeddings.append(outputs.pooler_output.squeeze().numpy())

            # Saving position in state.
            position += self.__step_size
            self.__state['position'] = position
            with open(self.__state_file, 'w') as f:
                json.dump(self.__state, f)

        return embeddings