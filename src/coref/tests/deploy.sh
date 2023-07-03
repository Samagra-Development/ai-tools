# Activate virtual environment
python3 -m venv venv
source venv/bin/activate

pip install openai
pip install tiktoken
pip install transformers
pip install nltk
pip install pandas 
pip install numpy 

# Set environment variables
export FLASK_APP=testing_script.py

# Start Gunicorn
gunicorn -b :6333 testing_script:app --workers 5 --timeout 600
