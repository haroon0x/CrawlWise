
FROM python:3.11

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Playwright and setup crawl4ai
RUN python -m playwright install --with-deps chromium
RUN crawl4ai-setup

# Copy the entire project
COPY . .

# Set the working directory to src where main.py is located
WORKDIR /app/src

# Debug: List files to verify structure
RUN ls -la

EXPOSE 8000

# Run uvicorn from the src directory
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]