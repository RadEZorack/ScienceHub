# Use a Node.js image to build the React app
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app with environment variables
ARG REACT_APP_CDN_URL
ARG REACT_APP_LATEX_RENDERER_URL
ARG REACT_APP_PYTHON_RENDERER_URL
ARG REACT_APP_R_RENDERER_URL
RUN REACT_APP_CDN_URL=$REACT_APP_CDN_URL REACT_APP_LATEX_RENDERER_URL=$REACT_APP_LATEX_RENDERER_URL \
    REACT_APP_PYTHON_RENDERER_URL=$REACT_APP_PYTHON_RENDERER_URL REACT_APP_R_RENDERER_URL=$REACT_APP_R_RENDERER_URL npm run build

# Install a simple HTTP server to serve the built files
RUN npm install -g serve

# Expose port 3000 for the React app
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "build"]
