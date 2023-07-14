from transformers import AutoModelForSequenceClassification
from transformers import AutoTokenizer
import torch
# Load the model and tokenizer
model = AutoModelForSequenceClassification.from_pretrained("GautamR/model_grievance_class", force_download=True)
tokenizer = AutoTokenizer.from_pretrained("GautamR/model_grievance_class", force_download=True)

# Set the device to CPU
device = torch.device("cpu")

# Move the model to CPU
model = model.to(device)

# Tokenize the input text
inputs = tokenizer("How to use this portal?", return_tensors="pt")

# Move the inputs to CPU
inputs = {k: v.to(device) for k, v in inputs.items()}

# Perform inference on CPU
with torch.no_grad():
    logits = model(**inputs).logits

# Move logits to CPU
logits = logits.to(device)

# Move the predicted class to CPU
predicted_class_id = logits.argmax().item()

# Get the label corresponding to the predicted class
predicted_label = model.config.id2label[predicted_class_id]

# Print the predicted label
print("Predicted Label:", predicted_label)


print( 'What is this test? ')