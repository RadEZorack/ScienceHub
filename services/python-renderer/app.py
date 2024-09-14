from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import hashlib
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

CDN_PATH = os.getenv("CDN_PATH", "/shared-cdn")
CDN_URL = os.getenv("CDN_URL", "http://localhost:8080")

def ensure_directory_exists(directory):
    """Ensure that the directory exists."""
    if not os.path.exists(directory):
        os.makedirs(directory)

@app.route('/execute', methods=['POST'])
def execute_python_code():
    data = request.json
    python_code = data.get('python_code', '')
    code_hash = hashlib.md5(python_code.encode('utf-8')).hexdigest()
    output_file_path = os.path.join(CDN_PATH, f"{code_hash}.html")

    # If the output file already exists, return the cached result
    # if os.path.exists(output_file_path):
    #     return jsonify({'url': f"{CDN_URL}/{code_hash}.html"})

    try:
        # Write the Python code to a temporary file
        code_file_path = os.path.join('/tmp', f"{code_hash}.py")
        with open(code_file_path, 'w') as code_file:
            code_file.write(python_code)

        # Execute the Python code and capture its output
        result = subprocess.run(['python3', code_file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        # Write the output to the CDN path
        with open(output_file_path, 'w') as output_file:
            output_file.write(f"<pre>{result.stdout}</pre><pre>{result.stderr}</pre>")

        return jsonify({'url': f"{CDN_URL}/{code_hash}.html"})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    ensure_directory_exists(CDN_PATH)
    app.run(host='0.0.0.0', port=5002, debug=True)
