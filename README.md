# ScienceHub

ScienceHub is a dynamic content renderer that allows you to render various scientific content types, such as LaTeX documents, Python scripts, and more. It uses a microservices architecture, where each content type is processed by a dedicated Docker service.

## Features

- **Dynamic LaTeX Rendering**: Render LaTeX content to PDF and display it dynamically.
- **Python Code Execution**: Execute Python scripts and display their output dynamically.
- **Flexible Content Parsing**: Supports multiple custom tags (`<latex>`, `<python>`, etc.) for various content types.
- **Microservices Architecture**: Each renderer runs as a separate service, managed by Docker Compose.
- **React Frontend**: A user-friendly React frontend to input URLs and display rendered content.

## Project Structure

. ├── docker-compose.yml # Docker Compose file to define and run services ├── frontend/ # React frontend application │ ├── Dockerfile # Dockerfile for the frontend │ ├── public/ # Public assets │ └── src/ # React source code ├── latex-renderer/ # LaTeX renderer service │ ├── Dockerfile # Dockerfile for LaTeX renderer │ ├── app.py # Flask app for rendering LaTeX │ └── requirements.txt # Python dependencies for LaTeX renderer ├── python-renderer/ # Python code execution service │ ├── Dockerfile # Dockerfile for Python renderer │ ├── app.py # Flask app for executing Python │ └── requirements.txt # Python dependencies for Python renderer └── docker-cdn/ # Local CDN service for storing rendered files ├── Dockerfile # Dockerfile for CDN service

markdown
Copy code

## Getting Started

### Prerequisites

- **Docker** and **Docker Compose**: Ensure Docker and Docker Compose are installed on your system.
- **Git**: Version control to clone the repository.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/YourUsername/ScienceHub.git
   cd ScienceHub
Build and Start the Services:

Use Docker Compose to build and run all services:

bash
Copy code
docker-compose up --build -d
This command will:

Build and start the LaTeX renderer on port 5001.
Build and start the Python renderer on port 5002.
Build and start the local CDN on port 8080.
Build and start the React frontend on port 3000.
Usage
Access the Frontend:

Open your web browser and navigate to http://localhost:3000.

Render Content:

Enter a URL in the input field (e.g., http://localhost:8081/index.html).
Click the "Parse Content" button to fetch and display the content.
Supported Custom Tags:

LaTeX Content: Use the <latex> tag to render LaTeX content.

html
Copy code
<latex>
  The Schrödinger equation is expressed as:
  \[
  i \hbar \frac{\partial}{\partial t} \Psi(x,t) = -\frac{\hbar^2}{2m} \frac{\partial^2}{\partial x^2} \Psi(x,t)
  \]
</latex>
Python Code: Use the <python> tag to execute Python code.

html
Copy code
<python>
print("Hello, World!")
</python>
External File Support: You can also reference external files using the src attribute.

html
Copy code
<latex src="./scripts/sample.tex"></latex>
<python src="./scripts/sample.py"></python>
Environment Variables
CDN_PATH: Path to the directory used to store rendered files. Default: /shared-cdn.
CDN_URL: URL of the local CDN. Default: http://localhost:8080.
Adding More Renderers
Create a New Renderer Folder: Follow the structure of latex-renderer or python-renderer to add new content types.

Update docker-compose.yml: Add a new service definition for your renderer.

Update the Frontend: Add logic to handle new custom tags in DynamicRenderer.js.

Contributing
Feel free to submit issues or pull requests. Contributions are welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Built with ❤️ by the ScienceHub team.
Uses React, Flask, and Docker.
Inspired by the need for a versatile and dynamic scientific content renderer.
Contact
For any questions or feedback, please contact [Your Email].

sql
Copy code

### **How to Use This README:**

- **Replace placeholders** like `https://github.com/YourUsername/ScienceHub.git` and `[Your Email]` with your actual information.
- Add any specific instructions, dependencies, or configurations that are unique to your setup.

This `README.md` should provide a good overview for users and contributors, explaining how to install, use, and contribute to your project.

Would you like to add or adjust anything else? 😊