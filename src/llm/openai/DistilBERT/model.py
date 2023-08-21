from transformers import pipeline, DistilBertTokenizer, DistilBertForQuestionAnswering, GPT2LMHeadModel

# Load pre-trained DistilBERT model and tokenizer
model_name = "distilbert-base-cased-distilled-squad"
model = DistilBertForQuestionAnswering.from_pretrained(model_name)
tokenizer = DistilBertTokenizer.from_pretrained(model_name)

# Define the context, paragraphs, questions, and answers
context = "Perfect leveling is crucial... In agricultural practices, various techniques... Deficiency symptoms of essential nutrients..."

paragraphs = [
    "Perfect leveling is crucial...",
    "In agricultural practices, various techniques...",
    "Deficiency symptoms of essential nutrients..."
]

questions = [
    "What are the essential nutrients mentioned...",
    "What agricultural practices contribute...",
    "What are the deficiency symptoms of nitrogen...",
]

answers = [
    "The essential nutrients mentioned...",
    "Agricultural practices such as applying organic...",
    "The deficiency symptoms of nitrogen include...",
]

# Initialize the question generation pipeline
question_generator = pipeline("text-generation", model=GPT2LMHeadModel.from_pretrained("gpt2"), tokenizer=tokenizer)

# Iterate through paragraphs, questions, and answers
for i, paragraph in enumerate(paragraphs):
    question = questions[i]
    expected_answer = answers[i]

    # Generate a detailed question based on the paragraph
    detailed_question = question_generator(context + " " + paragraph, max_length=50, num_return_sequences=1)[0]['generated_text']

    # Combine the user's question and detailed question for answering
    combined_question = f"{question} {detailed_question}"

    # Tokenize and find answer using DistilBERT
    inputs = tokenizer.encode_plus(combined_question, context + " " + paragraph, add_special_tokens=True, return_tensors="pt")
    start_scores, end_scores = model(**inputs)
    start_index = start_scores.argmax()
    end_index = end_scores.argmax() + 1
    answer = tokenizer.decode(inputs["input_ids"][0][start_index:end_index], skip_special_tokens=True)

    print(f"Paragraph {i + 1}:\n{paragraph}\n")
    print(f"Question {i + 1}:\n{question}")
    print(f"Expected Answer {i + 1}:\n{expected_answer}")
    print(f"Generated Question {i + 1}:\n{detailed_question}")
    print(f"Combined Question {i + 1}:\n{combined_question}")
    print(f"Answer {i + 1}:\n{answer}\n")
