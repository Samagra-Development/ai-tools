import importlib

from quart import Quart, g, request, jsonify
from markupsafe import escape
import json

from src.text_translation.ai4bharat.batch import AI4BharatBatchModel
from src.text_translation.ai4bharat.batch import AI4BharatBatchModelRequest

app = Quart(__name__)

with open('repository_data.json') as f:
    repository_data = json.load(f)


@app.route("/")
def welcome():
    return "<p>Welcome!</p>"


@app.route("/repository")
def repository():
    """ Returns the repository data, which contains the available models and their configurations"""
    return jsonify(repository_data)


def json_to_object(request_class, json_str):
    """ Converts a json string to an object of the given class"""
    return json.loads(json_str, object_hook=lambda d: request_class(**d))


def get_model_config(use_case, provider, mode):
    """ Returns the model config for the given use case, provider and mode """
    use_case_data = repository_data.get('use_cases').get(use_case)
    if use_case_data is None:
        return f'{escape(use_case)} is not available', 400

    provider_data = use_case_data.get(provider)
    if provider_data is None:
        return f'{escape(provider)} is not available', 400

    mode = provider_data.get(mode)
    if mode is None:
        return f'{escape(mode)} is not available', 400

    return mode, 200


@app.route("/<use_case>/<provider>/<mode>", methods=['POST'])
async def transformer(use_case, provider, mode):
    """ Returns the translation for the given tex; provider and mode are as mentioned in the repository"""
    model_config = get_model_config(use_case, provider, mode)
    print(model_config)
    if model_config[1] != 200:
        return model_config

    model_class_name = model_config[0].get('model_class')
    model_request_class_name = model_config[0].get('request_class')
    module = importlib.import_module("src" + "." + use_case + "." + provider + "." + mode)
    model = getattr(module, model_class_name)()
    model_request = getattr(module, model_class_name)()
    request_class = json_to_object(model_request, request.json)
    return model.inference(request_class)

# quart --app api --debug run
