## Content Themes
Content themes are subjects or topics about which information can be added to your GPT-based bot's knowledge base. By adding content about a particular theme, you enable the bot to answer questions related to that theme.

To add content about a theme, you will need to create a CSV file with two types of columns: "prompt_" and "content_". The "prompt_" columns are used to tag the content and are used for searching. The "content_" columns contain the actual content that the bot will use to answer questions. You can create separate tables for each theme and use them to update the bot's knowledge base. The only constraint is that input file should follow a pre-defined structure detailed below.  


### File structure: 
The data is currently input using csv files that follow a defined structure with 'prompt' and 'content' columns. One can have as many rows/columns as one wants in the file. 

#### Prompt columns : 
Some columns are the prompt columns. These have the prefix "prompt_" in their column name. Each "prompt_" column should contain a unique tag or keyword that describes the content in that row. You can have multiple "prompt_" columns in a single row, and each row should have at least one "prompt_" column. Any NA values get replaced by ""


#### Content columns: 
Some columns are content columns. They have the prefix  "content_" in their column name. Each "content_" column should contain the actual content that the bot will use to answer questions related to the tags in the "prompt_" columns. You can have multiple "content_" columns in a single row, each row must have content column. Any 'NA' values get replaced by ""

For example, if you want to create a content theme for "Dog Breeds", you could create a CSV file with the following structure:

| prompt_breed     | prompt_size | content_information                                                                                |
|------------------|-------------|----------------------------------------------------------------------------------------------------|
| Golden Retriever | Large       | The Golden Retriever is a breed of dog that originated in Scotland in the mid-19th century. They are...|
| Bulldog          | Medium      | The Bulldog is a breed of dog that originated in England in the 16th century. They are known for their...|
| Chihuahua        | Small       | The Chihuahua is a breed of dog that originated in Mexico. They are known for their small size and big...|

The same column can be present both with prompt_ sufffix and with content_ suffix. They will then be considered as 'tags' while searching for content. Any column in the csv that doesn't have the prompt_ or the column_ suffix is ignored.  

### Searching for Content: 
When a user asks a question related to a particular theme, the bot will search for relevant content using the "prompt_" columns as tags. The bot will use vector embeddings (such as BERT or OpenAI's embeddings) to search for content that matches the user's question.
For example, if a user asks "What is a good breed of dog for families?", the bot will search for content that matches the tags "breed" and "family". The bot will then use the content in the "content_" columns to generate an answer to the user's question.

### Creating Embeddings: 
Once the csv is set up, one can use the APIs set up to send the csv file as input and receive add the embeddings for the csv file into the vector database

