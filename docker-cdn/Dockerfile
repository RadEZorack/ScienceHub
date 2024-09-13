FROM nginx:alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the content directory into the Nginx document root
COPY content /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080
