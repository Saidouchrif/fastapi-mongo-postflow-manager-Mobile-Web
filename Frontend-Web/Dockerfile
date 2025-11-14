FROM nginx:alpine

# Copy static files
COPY src/ /usr/share/nginx/html/

# Copy custom nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

