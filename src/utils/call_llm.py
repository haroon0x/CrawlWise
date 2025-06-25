# utils/call_llm.py
# for Alchemyst LLM Proxy integration
import os
import requests

def call_llm(prompt):
    """
    Call the Alchemyst AI Proxy with the given prompt.
    No OpenAI API key is needed, only the Alchemyst platform API key.
    """
    url = "https://platform-backend.getalchemystai.com/api/v1/proxy/default"
    api_key = os.environ.get("ALCHEMYST_API_KEY", "your-alchemyst-api-key")
    payload = {
        "model": "alchemyst-ai/alchemyst-c1",
        "messages": [{"role": "user", "content": prompt}]
    }   
    headers = {"Authorization": f"Bearer {api_key}"}
    response = requests.post(url, json=payload, headers=headers, timeout=60)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

if __name__ == "__main__":
    prompt = "What is the meaning of life?"
    print(call_llm(prompt))
