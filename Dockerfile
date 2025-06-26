FROM python:3.11
COPY /requirements.txt /src/
WORKDIR /src
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN python -m playwright install --with-deps chromium
RUN crawl4ai-setup
RUN crawl4ai-doctor
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]