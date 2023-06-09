Embedding text content such that they can be searched using vector search techniques

# Chunking

1. Segregate paragraphs to similar topic from PDFs/audio or video transcripts.

2. Get the topic of that paragraph, which will later used to map the embeddings while storing in DB.

3. Divide the paragraph into chunks.

4. Generate the embeddings of chunk and store it in CSV/DB.

ex- If text is getting extracted from PDF all the paragraphs get joined to become a single paragraph.
Now, we should be able to get back paragraphs as they were before extracting in PDFs approximately.
Atleast the paragraphs should be of similar context. Then divide the paragraphs into several chunks genrate
the embeddings of the chunks and store in DB 
