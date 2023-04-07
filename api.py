from flask import Flask, request
from markupsafe import escape
import json

from src.text_translation.ai4bharat.batch_model import AI4BharatBatchModel
from src.text_translation.ai4bharat.batch_model_request import AI4BharatBatchModelRequest

app = Flask(__name__)

repository_data = {
    'use_cases': {
        'text_translation': {
            'models': {
                'ai4bharat': {
                    'modes': {
                        'batch': {
                            'model_class': AI4BharatBatchModel,
                            'request_class': AI4BharatBatchModelRequest
                        }
                    },
                }
            }
        },
        'asr': {
            'models': {
                'ai4bharat': {
                    'modes': {
                        'url': {
                            'model_class': None
                        }
                    },
                },
                'whisper': {
                    'modes': {
                        'url': {
                            'model_class': None
                        }
                    }
                }
            }
        }
    }
}


@app.route("/")
def welcome():
    return "<p>Welcome!</p>"

@app.route("/repository")
def repository():
    """ Returns the repository data, which contains the available models and their configurations"""
    return repository_data

def json_to_object(request_class, json_str):
    """ Converts a json string to an object of the given class"""
    return json.loads(json_str, object_hook=lambda d: request_class(**d))

def get_model_config(use_case, provider, mode):
    """ Returns the model config for the given use case, provider and mode """
    use_case_data = repository_data.get('use_cases').get(use_case)
    if use_case_data is None:
        return f'{escape(use_case)} is not available', 400
    
    provider_data = use_case_data.get('models').get(provider)
    if provider_data is None:
        return f'{escape(provider)} is not available', 400
    
    mode = provider_data.get('modes').get(mode)
    if mode is None:
        return f'{escape(mode)} is not available', 400
    
    return mode, 200

@app.route("/text_translation/<provider>/<mode>", methods=['POST'])
def text_translation_ai4bharat_batch(provider, mode):
    """ Returns the translation for the given tex; provider and mode are as mentioned in the repository"""
    model_config = get_model_config('text_translation', provider, mode)
    if model_config[1] != 200:
        return model_config
    model = model_config[0].get('model_class')()
    request_class = json_to_object(model_config[0].get('request_class'), request.json)
    return model.inference(request_class)

# flask --app api run
