## Instructor Embedding model:

### Purpose :
Model to Create Embeddings from given text using Instructor Large model.

### Testing the model deployment :  
To run for testing just the Hugging Face deployment for grievence recognition, you can follow the following steps : 

- Git clone the repo
- Go to current folder location i.e. ``` cd src/chunking/MPNet/local ```
- Create docker image file and test the api:  
```
docker build -t testmodel .
docker run -p 8000:8000 testmodel
curl -X POST -H "Content-Type: application/json" -d '{"text": "The English Wikipedia is the primary[a] English-language edition of Wikipedia, an online encyclopedia. It was created by Jimmy Wales and Larry Sanger on January 15, 2001, as Wikipedia'\''s first edition.English Wikipedia is hosted alongside other language editions by the Wikimedia Foundation, an American non-profit organization. Its content is written independently of other editions[1] in various varieties of English, aiming to stay consistent within articles. Its internal newspaper is The Signpost.English Wikipedia is the most-read version of Wikipedia[2] and has the most articles of any edition, at 6,689,175 as of July 2023.[3] It contains 10.9% of articles in all Wikipedias,[3] although it lacks millions of articles found in other editions.[1] The edition'\''s one-billionth edit was made on January 13, 2021.[4]English Wikipedia, often as a stand-in for Wikipedia overall, has been praised for its enablement of the democratization of knowledge, extent of coverage, unique structure, culture, and reduced degree of commercial bias. It has been criticized for exhibiting systemic bias, particularly gender bias against women and ideological bias.[5][6] While its reliability was frequently criticized in the 2000s, it has improved over time, receiving greater praise in the late 2010s and early 2020s,[7][5][8][b] having become an important fact-checking site.[9][10] English Wikipedia has been characterized as having less cultural bias than other language editions due to its broader editor base.[2] "}' http://localhost:8000/ -o output.csv
```


```
curl -X POST -F "file=@content_text.txt"  http://localhost:8000/chunking/instructor/local -o output4.csv
```
