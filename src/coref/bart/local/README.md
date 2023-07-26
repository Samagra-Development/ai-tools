# Coreference Resolution

## Test Deployment

- Git clone the repo and cd to the project location.
- cd to `local`, i.e., `cd ./src/coref/bart/local`.
- Start your docker engine and `docker build -t bart .`
- Do `docker run -p 8000:8000 bart`.
- `curl -X POST -H "Content-Type: application/json" -d '{"text": TEXT}' http://localhost:8000`. <br> Replace `TEXT` with a sentence that needs coreference resolution, for example: <br> "User: Can you give me more details on application process for the kisan credit card loan with State Bank of India? AI: Yes, I can provide some details on the application process for the Kisan Credit Card loan with State Bank of India. You would need to visit your nearest State Bank of India branch and submit your Aadhar Card and PAN card as mandatory documents along with other documents they may require. The loan has a tenure of 5 years subject to annual review and the effective rate of interest will be linked to One Year MCLR of the Bank. The present one year MCLR of Bank is 7.70% for loans up to 3.00 lakhs and 10.95% for loans above Rs.3.00 lakhs. User: Where is the bank located?"
- The reponse for above might be: <br>
[
    "User: Where is the State Bank of India located?
]
- Additional optional parameters are `temperature`, `num_beams`, and `max_length` : `curl -X POST -H "Content-Type: application/json" -d '{"text": TEXT, "temperature": TEMPERATURE, "num_beams": NUM_BEAMS, "max_length": MAX_LENGTH}' http://0.0.0.0:8000`.

