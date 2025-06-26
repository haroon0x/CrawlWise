# Use an official Python image
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for Playwright/Chromium
RUN apt-get update && \
    apt-get install -y wget gnupg curl ca-certificates fonts-liberation libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 libgbm1 libxshmfence1 && \
    rm -rf /var/lib/apt/lists/*

# Copy all code (including requirements.txt) first
COPY . .

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Install crawl4ai and Playwright (with Chromium)
RUN pip install -U crawl4ai && \
    python -m playwright install --with-deps chromium

# Run post-installation setup for crawl4ai
RUN crawl4ai-setup

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 