## Grievance classification:


### Purpose :
Model to classify grievances into 3 buckets :
- Label 0: 'Account number is not Correct'
- Label 1: 'Installment not received'
- Label 2: 'Others' 

**'Account number not correct'**: This is for those grievances/ feedback which talk about the bank account not being correct on the portal for these farmers.

**'Installment not received':** This is for those feedback which talk about the farmer not receiving the installment/money for that month. 

**'Others':** This cover all other types of grievances - including 'Gender being wrong ,'Online Application pnding approval,' other Payment Related issues','Problem in Adhaar Correction' ,'problem in bio-metric based e-kyc','Problem in OTP based e-kyc', 'Tansaction Failed' etc etc.


### Testing the model deployment :  
To run for testing just the Hugging Face deployment for grievence recognition, you can follow the following steps : 

- Git clone the repo
- Go to above location : ``` cd /src/text_classification/grievance_recognition/local ```
- Create docker image file and test the api:  
```
docker build -t testmodel .
docker run -p 5000:5000 testmodel
curl -X POST -H "Content-Type: application/json" -d '{"text": "Where is my money? "}' http://localhost:5000/
```
