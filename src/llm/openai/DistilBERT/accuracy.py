from transformers import DistilBertTokenizer, DistilBertForQuestionAnswering, TrainingArguments, Trainer
import torch
import time

# Load pre-trained DistilBERT model and tokenizer
model_name = "distilbert-base-cased"
model = DistilBertForQuestionAnswering.from_pretrained(model_name)
tokenizer = DistilBertTokenizer.from_pretrained(model_name)


# Define dataset
context = """
Perfect leveling is crucial for the successful cultivation of the paddy crop. The Soil and Plant Nutrition Farmer's Handbook on Basic Agriculture provides a range of soil pH levels from strongly acidic to strongly alkaline (4.0 to 10). It also emphasizes the importance of nitrogen, phosphorus, potassium, sulfur, calcium, magnesium, iron, manganese, boron, copper, zinc, and molybdenum as essential nutrients for crop growth. Legumes are particularly valuable in agriculture due to their high nitrogen content and low Carbon-Nitrogen Ratio (C:N Ratio), which makes them highly desirable for cultivation.In agricultural practices, various techniques contribute to successful crop cultivation and soil health. These include applying organic manures, mulching organic wastes, using green manures and cover crops, implementing suitable crop rotation, reducing soil tillage, and preventing soil erosion. The Carbon-Nitrogen Ratio (C:N Ratio) is an essential factor in organic matter decomposition, with a balanced ratio promoting effective breakdown. For example, legumes with a low C:N Ratio, like composted manure (20:1), are highly desirable for their nitrogen content. Farmers can enhance decomposition by using nitrogen-rich organic materials such as blood meal, bone meal, poultry manure, cottonseed meal, and soybean meal. Additionally, Electrical Conductivity (EC) measurement helps address saline/sodic soils through gypsum application, determined by the EC value. Soil testing and expert guidance are recommended for farmers facing such soil issues.
Deficiency symptoms of essential nutrients in plants can significantly impact crop health and productivity. For nitrogen deficiency, symptoms include stunted growth, light green to pale-yellow color on older leaves, reduced flowering, and lower protein content. Phosphorus deficiency leads to an overall stunted appearance, dark to blue-green coloration in mature leaves, restricted root development, occasional purpling of leaves and stems, and delayed maturity with poor seed and fruit development. Potassium deficiency manifests as chlorosis along leaf margins, scorching and browning of older leaf tips, slow and stunted plant growth, weak stalks leading to lodging, and shriveled seeds or fruits. Calcium deficiencies, while not commonly seen in the field due to secondary effects of high acidity, can affect young leaves of new plants, causing distortion, small and abnormally dark green appearance, cup-shaped and crinkled leaves, and deterioration of terminal buds with root growth impairment.

"""

paragraphs = [
    "Perfect leveling is crucial for the successful cultivation of the paddy crop. The Soil and Plant Nutrition Farmer's Handbook on Basic Agriculture provides a range of soil pH levels from strongly acidic to strongly alkaline (4.0 to 10). It also emphasizes the importance of nitrogen, phosphorus, potassium, sulfur, calcium, magnesium, iron, manganese, boron, copper, zinc, and molybdenum as essential nutrients for crop growth. Legumes are particularly valuable in agriculture due to their high nitrogen content and low Carbon-Nitrogen Ratio (C:N Ratio), which makes them highly desirable for cultivation.",
    "In agricultural practices, various techniques contribute to successful crop cultivation and soil health. These include applying organic manures, mulching organic wastes, using green manures and cover crops, implementing suitable crop rotation, reducing soil tillage, and preventing soil erosion. The Carbon-Nitrogen Ratio (C:N Ratio) is an essential factor in organic matter decomposition, with a balanced ratio promoting effective breakdown. For example, legumes with a low C:N Ratio, like composted manure (20:1), are highly desirable for their nitrogen content. Farmers can enhance decomposition by using nitrogen-rich organic materials such as blood meal, bone meal, poultry manure, cottonseed meal, and soybean meal. Additionally, Electrical Conductivity (EC) measurement helps address saline/sodic soils through gypsum application, determined by the EC value. Soil testing and expert guidance are recommended for farmers facing such soil issues.",
    "Deficiency symptoms of essential nutrients in plants can significantly impact crop health and productivity. For nitrogen deficiency, symptoms include stunted growth, light green to pale-yellow color on older leaves, reduced flowering, and lower protein content. Phosphorus deficiency leads to an overall stunted appearance, dark to blue-green coloration in mature leaves, restricted root development, occasional purpling of leaves and stems, and delayed maturity with poor seed and fruit development. Potassium deficiency manifests as chlorosis along leaf margins, scorching and browning of older leaf tips, slow and stunted plant growth, weak stalks leading to lodging, and shriveled seeds or fruits. Calcium deficiencies, while not commonly seen in the field due to secondary effects of high acidity, can affect young leaves of new plants, causing distortion, small and abnormally dark green appearance, cup-shaped and crinkled leaves, and deterioration of terminal buds with root growth impairment."
]

questions = [
    "What are the essential nutrients mentioned in the Soil and Plant Nutrition Farmer's Handbook for crop growth, and why are legumes considered highly desirable for cultivation based on their nitrogen content and Carbon-Nitrogen Ratio (C:N Ratio)?",
    "What agricultural practices contribute to successful crop cultivation and soil health, and how does the Carbon-Nitrogen Ratio (C:N Ratio) impact organic matter decomposition? Provide examples of nitrogen-rich organic materials that can enhance decomposition.",
    "What are the deficiency symptoms of nitrogen, phosphorus, potassium, and calcium in plants, and how do these symptoms affect crop health? Explain the reason why calcium deficiencies are not commonly observed in the field.",
]

answers = [
    "The essential nutrients mentioned in the handbook are nitrogen, phosphorus, potassium, sulfur, calcium, magnesium, iron, manganese, boron, copper, zinc, and molybdenum. Legumes are highly desirable for cultivation due to their high nitrogen content and low C:N Ratio, making them valuable for promoting crop growth.",
    "Agricultural practices such as applying organic manures, mulching organic wastes, using green manures and cover crops, implementing suitable crop rotation, reducing soil tillage, and preventing soil erosion are essential for successful crop cultivation and soil health. The C:N Ratio plays a significant role in organic matter decomposition, and a balanced ratio facilitates effective breakdown. For example, nitrogen-rich organic materials like blood meal, bone meal, poultry manure, cottonseed meal, and soybean meal enhance decomposition.",
    "The deficiency symptoms of nitrogen include stunted growth, pale-yellow color on older leaves, reduced flowering, and lower protein content. Phosphorus deficiency leads to an overall stunted appearance, dark to blue-green coloration in mature leaves, restricted root development, occasional purpling of leaves and stems, and delayed maturity with poor seed and fruit development. Potassium deficiency manifests as chlorosis along leaf margins, scorching and browning of older leaf tips, slow and stunted plant growth, weak stalks leading to lodging, and shriveled seeds or fruits. Calcium deficiencies are not commonly seen in the field due to secondary effects of high acidity, which limits growth and masks the typical symptoms.",
]

# Create a test dataset
test_dataset = []
for question, context, answer in zip(questions, paragraphs, answers):
    encoded_inputs = tokenizer(question, context, return_tensors="pt")
    output = model(**encoded_inputs)
    start_logits, end_logits = output.start_logits, output.end_logits
    start_pred = torch.argmax(start_logits)
    end_pred = torch.argmax(end_logits)
    predicted_answer = tokenizer.decode(encoded_inputs["input_ids"][start_pred:end_pred+1], skip_special_tokens=True)
    test_dataset.append({
        "question": question,
        "context": context,
        "answer": answer,
        "predicted_answer": predicted_answer,
    })

# Calculate accuracy
correct_predictions = 0
for example in test_dataset:
    if example["predicted_answer"] == example["answer"]:
        correct_predictions += 1
accuracy = correct_predictions / len(test_dataset)

# Calculate performance time
total_time = 0
for example in test_dataset:
    start = time.time()
    encoded_inputs = tokenizer(example["question"], example["context"], return_tensors="pt")
    output = model(**encoded_inputs)
    end = time.time()
    total_time += end - start
performance_time = total_time / len(test_dataset)

print("Accuracy:", accuracy)
print("Performance time:", performance_time, "seconds")
