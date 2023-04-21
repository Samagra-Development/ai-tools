import importlib

from quart import Quart, g, request, jsonify, abort
from markupsafe import escape
import json
import aiohttp
import os
from functools import wraps
from dotenv import load_dotenv
from quart.wrappers.response import Response

load_dotenv()

app = Quart(__name__)
 
with open('repository_data.json') as f:
    repository_data = json.load(f)

AUTH_HEADER = os.getenv("AUTH_HEADER")
AUTH_HEADER_KEY = os.getenv("AUTH_HEADER_KEY")


def verify_auth_header(auth_header_key, expected_value):
    def decorator(f):
        @wraps(f)
        async def decorated_function(*args, **kwargs):
            auth_header = request.headers.get(auth_header_key)
            if not auth_header or auth_header != expected_value:
                print("Unauthorized access");
                abort(401)  # Unauthorized
            return await f(*args, **kwargs)

        return decorated_function

    return decorator


@app.route("/")
def welcome():
    return "<p>Welcome!</p>"


@app.route("/repository")
def repository():
    """ Returns the repository data, which contains the available models and their configurations"""
    return jsonify(repository_data)


def json_to_object(request_class, json_str):
    """Converts a JSON string to an object of the given class at level 1."""
    data = json.loads(json_str)
    return request_class(**data)


def get_model_config(use_case, provider, mode):
    """ Returns the model config for the given use case, provider and mode """
    use_case_data = repository_data.get('use_cases').get(use_case)
    if use_case_data is None:
        return f'{escape(use_case)} Use case is not available', 400

    provider_data = use_case_data.get(provider)
    if provider_data is None:
        return f'{escape(provider)} Provider is not available', 400

    mode = provider_data.get(mode)
    if mode is None:
        return f'{escape(mode)} Mode is not available', 400

    return mode, 200


@app.route("/<use_case>/<provider>/<mode>", methods=['POST'])
@verify_auth_header(AUTH_HEADER_KEY, AUTH_HEADER)
async def transformer(use_case, provider, mode):
    """ Returns the translation for the given tex; provider and mode are as mentioned in the repository"""
    model_config = get_model_config(use_case, provider, mode)
    if model_config[1] != 200:
        return model_config

    model_class_name = model_config[0].get('model_class')
    model_request_class_name = model_config[0].get('request_class')
    module = importlib.import_module("src" + "." + use_case + "." + provider + "." + mode)
    model = getattr(module, model_class_name)(app)
    model_request = getattr(module, model_request_class_name)
    request_class = json_to_object(model_request, json.dumps(await request.json))
    if model_config[0].get("__is_async"):
        response = await model.inference(request_class)
    else:
        response = model.inference(request_class)

    # check if the response came from a cached function
    if isinstance(response, Response) and response.status_code == 200 and response.headers.get('ai-tools-cached') is None:
        # if it is, then add custom header to the response        
        response.headers['ai-tools-cached'] = 'true'
    return response


@app.before_serving
async def startup():
    app.client = aiohttp.ClientSession()

# quart --app api --debug run
# hypercorn api -b 0.0.0.0:8000