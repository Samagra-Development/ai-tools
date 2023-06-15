text = '''

Input:
Q: What are the common pests that attack eggplants?
A: Aphids, spider mites and whiteflies are common pests that attack eggplants.
Q: How can I control them?

Output:
Q: What are the common pests that attack eggplants?
A: Aphids, spider mites and whiteflies are common pests that attack eggplants.
Q: How can I control these pests?

'''


# Split the text by examples
examples = text.strip().split('Example ')[1:]
# print(examples)
# print('$$$$$$$$$$$$$$$$$$$$$')


# Function to parse input and output
def parse_example(example):
    input_start = example.find("Input") + 6
    output_start = example.find("Output") + 7
    input_text = example[input_start:(output_start - 7)].strip()
    output_text = example[output_start:].strip()
    return (input_text, output_text)

# Create tuples for each example
# tuples = [parse_example(example) for example in examples]

parsed_in, parsed_out = parse_example(text)
print(parsed_in)
print('#############################')
print(parsed_out)