from ragatouille import RAGPretrainedModel
import re
import sqlite_utils
import llm
from datetime import datetime

# Function to strip HTML tags from text
def strip_html_tags(text):
    return re.compile(r'<[^>]+>').sub('', text)

# Function to retrieve data from the SQL database based on user query
def retrieve_data_from_database(query):
    db = sqlite_utils.Database("TextSummarisation.db")
    entries = db.execute(f"SELECT * FROM blog_entry WHERE title LIKE '%{query}%' OR body LIKE '%{query}%'").fetchall()

    return entries

# Function to perform document retrieval and summarization
def retrieve_and_summarize(query):
    entries = retrieve_data_from_database(query)

    # Initialize Ragoutille model
    rag = RAGPretrainedModel.from_pretrained("colbert-ir/colbertv2.0")

    # Extract information and index the documents
    entry_texts = []
    entry_ids = []
    entry_metadatas = []

    for entry in entries:
        entry_text = entry["title"] + '\n' + strip_html_tags(entry["body"])
        entry_texts.append(entry_text)
        entry_ids.append(str(entry["id"]))
        entry_metadatas.append({"slug": entry["slug"], "created": entry["created"]})

    # Index the documents
    rag.index(
        collection=entry_texts,
        document_ids=entry_ids,
        document_metadatas=entry_metadatas,
        index_name="blog",
        max_document_length=180,
        split_documents=True
    )

    # Search for documents based on user query
    docs = rag.search(query)

    # Use LLM for summarization
    model = llm.get_model("gpt-4-turbo")
    model.key = ''

    prompt = ' '.join([d['content'] for d in docs])

    # Generate the summary using LLM
    response = model.prompt(prompt, system=query)

    # Store the results in the database
    result_summary = ' '.join(chunk for chunk in response)
    youtube_link = "https://www.youtube.com/example"  # Replace with the actual YouTube link
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    db = sqlite_utils.Database("TextSummarisation.db")
    db["search_results"].insert({
        "query": query,
        "summary": result_summary,
        "youtube_link": youtube_link,
        "timestamp": timestamp
    })

    # Display the result
    print("Summary:", result_summary)
    print("YouTube Link:", youtube_link)
    print("Timestamp:", timestamp)

# Example usage:
user_query = input("Enter your query: ")
retrieve_and_summarize(user_query)