# Use the texlive/texlive base image
FROM texlive/texlive

# Install Python and venv
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Create a virtual environment
RUN python3 -m venv venv

# Activate the virtual environment and install Python dependencies
COPY requirements.txt /app/requirements.txt
RUN . venv/bin/activate && pip install --upgrade pip && pip install -r /app/requirements.txt

# Copy your Flask application into the container
COPY render_latex.py /app/render_latex.py

# Set correct permissions for the CDN path
RUN mkdir -p /usr/share/nginx/html && chmod -R 777 /usr/share/nginx/html

# Expose the port the service will run on
EXPOSE 5001

# Run the Flask app using the virtual environment's Python
CMD ["venv/bin/python", "render_latex.py"]
