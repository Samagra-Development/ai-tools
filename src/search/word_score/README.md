# Word Score

This folder consists of an API that scores documents based on an approach that combines IDF and Fuzzy word matching.

For a given query, it calculates fuzzy matching scores for words in query (max score for a word from entire row), weights them with IDF, takes average of the scores of all words in the query to give a score for the entire query, sorts them, and returns the top n matches.