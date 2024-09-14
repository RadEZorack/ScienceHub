# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Define environment variables
ENV CDN_PATH=/shared-cdn
ENV CDN_URL=http://localhost:8080

# Expose the port the app runs on
EXPOSE 5002

# Run the application
CMD ["python", "app.py"]
