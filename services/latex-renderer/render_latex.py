import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib
from sympy import preview  # To render LaTeX equations as images

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Get the CDN path and URL from environment variables
cdn_path = os.getenv('CDN_PATH', '/shared-cdn')
cdn_url = os.getenv('CDN_URL', 'http://localhost:8080')

@app.route('/render', methods=['POST'])
def render_latex():
    # Debugging: Print the received data
    print("Received data:", request.json, flush=True)
    latex_code = request.json.get('latex_code')
    if not latex_code:
        return "Error: No LaTeX code provided.", 400

    # Create a unique hash for the LaTeX code
    latex_hash_checker = hashlib.md5(latex_code.encode('utf-8')).hexdigest()
    latex_hash = request.json.get('hash')
    # These should match so the user isn't lying about which file to change.
    if not latex_hash_checker == latex_hash:
        return "Error: you did not provide a correct hash.", 400

    output_file_name = f"{latex_hash}.pdf"
    output_file_path = os.path.join(cdn_path, output_file_name)

    try:
        # Save or render your LaTeX file (implement your LaTeX rendering logic here)
        # Example: Assume a function render_latex_to_pdf(latex_code, output_image_path) exists
        render_latex_to_pdf(latex_code, output_file_path)

        # Return the URL to access the rendered PDF
        file_url = f"{cdn_url}/{output_file_name}"
        return jsonify({'url': file_url}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def render_latex_to_pdf(latex_code, output_file_path):
    # Wrap the LaTeX code in a complete document structure
    # full_latex_document = f"""
    # \\documentclass{{article}}
    # \\usepackage{{amsmath}}  % Include packages for additional math formatting
    # \\usepackage[utf8]{{inputenc}}  % Ensure proper encoding
    # \\begin{{document}}
    # {latex_code}  % Insert the provided LaTeX code here
    # \\end{{document}}
    # """
    # I've decided to start with not to use the above as people will most likely copy/paste. I need to get user feedback.

    # Write the complete LaTeX document to a temporary file
    with open('tmp.tex', 'w') as f:
        f.write(latex_code)

    # Run the LaTeX command to generate a PDF (ensure pdflatex or equivalent is installed)
    os.system(f"pdflatex -output-directory {cdn_path} tmp.tex")

    # Move the generated PDF to the output path
    os.rename(os.path.join(cdn_path, 'tmp.pdf'), output_file_path)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
