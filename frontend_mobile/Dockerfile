# Build stage
FROM ghcr.io/cirruslabs/flutter:stable AS build

WORKDIR /app

# Copy pubspec file
COPY pubspec.yaml ./

# Get dependencies (this will generate pubspec.lock if it doesn't exist)
RUN flutter pub get

# Copy source code
COPY . .

# Build Flutter web app
RUN flutter build web --release

# Production stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/build/web /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

