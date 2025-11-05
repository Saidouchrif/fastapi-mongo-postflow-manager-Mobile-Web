# Flutter Web Build Dockerfile
# This Dockerfile builds the Flutter app for web deployment

# Use the official Flutter image as base
FROM ghcr.io/cirruslabs/flutter:3.24.3 AS build

# Set working directory
WORKDIR /app

# Copy pubspec files first for dependency caching
COPY pubspec.yaml pubspec.lock ./

# Get Flutter dependencies
RUN flutter pub get

# Copy the rest of the application
COPY . .

# Enable web support and build for web
RUN flutter config --enable-web
RUN flutter build web --release --web-renderer html

# Use nginx to serve the built Flutter web app
FROM nginx:alpine

# Copy the built web app to nginx html directory
COPY --from=build /app/build/web /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
