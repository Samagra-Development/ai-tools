from flask import Flask, jsonify
import requests
app = Flask(__name__)
model_endpoints = {
    'model1': 'https://example.com/model1/health',
    'model2': 'https://example.com/model2/health',
    # Add more models here as needed and add the link for individual model if there...
}


@app.route('/health', methods=['GET'])
def health_check():
    model_statuses = []

    # Check the status of each individual model here by calling their respective /health endpoints.
    for name, url in model_endpoints.items():

        response = requests.get(url)

        if response.status_code == 200:
            is_healthy = True
            message = "Model is healthy and ready to serve predictions."
        else:
            is_healthy = False
            message = "Model is not healthy and cannot serve predictions at this time."

        # Append the result to our list of model statuses.
        model_statuses.append({
            "name": f"{name}",
            "status": {
                "is_healthy": f"{is_healthy}",
                "message": f"{message}"
            }
        })

    return jsonify(model_statuses), 200


if __name__ == '__main__':
    app.run(debug=True)