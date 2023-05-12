# Split the text by examples
examples = text.strip().split('Example ')[1:]

# Function to parse input and output
def parse_example(example):
    input_start = example.find("Input") + 5
    output_start = example.find("Output") + 6
    input_text = example[input_start:output_start].strip()
    output_text = example[output_start:].strip()
    return (input_text, output_text)

# Create tuples for each example
tuples = [parse_example(example) for example in examples]