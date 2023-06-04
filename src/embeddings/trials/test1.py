import nltk
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import AgglomerativeClustering
from nltk.cluster import util
from sklearn.metrics.pairwise import cosine_distances
import PyPDF2


def extract_text(filepath):
    with open(filepath, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in range(len(pdf_reader.pages)):
            temp_text = pdf_reader.pages[page].extract_text()
            print(temp_text)
            text+= pdf_reader.pages[page].extract_text()
    return text

def clean_text(text):
    # Customize this method based on your specific cleaning requirements
    cleaned_text = text.replace('\n', ' ').replace('\r', '')
    # Clean the text and remove punctuation
    return cleaned_text

extracted_text = extract_text("cgt.pdf")
cleaned_text = clean_text(extracted_text)

# Tokenize the text into sentences
sentences = nltk.sent_tokenize(cleaned_text)


# Calculate the TF-IDF matrix
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(sentences)

# Calculate the pairwise similarity matrix using cosine distances
similarity_matrix = 1 - cosine_distances(tfidf_matrix)

# Perform hierarchical clustering
agg_clustering = AgglomerativeClustering(n_clusters=None, affinity='precomputed', linkage='complete', distance_threshold=0.5)
clustering = agg_clustering.fit(similarity_matrix)

# Get the cluster labels
labels = clustering.labels_

# Create a dictionary to store sentences for each topic
topic_sentences = {}
for i, label in enumerate(labels):
    if label not in topic_sentences:
        topic_sentences[label] = []
    topic_sentences[label].append(sentences[i])


# Print the identified topics and their sentences
for topic, sentences in topic_sentences.items():
    print(f"Topic {topic + 1}:")
    for sentence in sentences:
        print("- " + sentence)
    print()
