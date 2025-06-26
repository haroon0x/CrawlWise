FROM python:3.11

WORKDIR /src

COPY requirements.txt .
COPY . .

RUN pip install --no-cache-dir -r requirements.txt
RUN python -m playwright install --with-deps chromium
RUN crawl4ai-setup

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]