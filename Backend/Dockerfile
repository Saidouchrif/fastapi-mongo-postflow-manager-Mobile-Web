# ==== Build minimal Python image ====
FROM python:3.12-slim

# System deps (optional but useful)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source
COPY app ./app

# Env (can be overridden by compose/.env)
ENV MONGO_URL="mongodb://mongo:27017" \
    MONGO_DB="postflow_db" \
    PYTHONUNBUFFERED=1

EXPOSE 5050

# Run uvicorn on 0.0.0.0:5050
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5050"]
