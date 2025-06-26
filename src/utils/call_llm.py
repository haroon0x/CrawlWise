# utils/call_llm.py
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
import os

def call_llm(prompt: str) -> str:
    """
    Call the Alchemyst AI Proxy using direct requests to the proxy.
    """
    load_dotenv()
    ALCHEMYST_API_KEY = os.environ.get("ALCHEMYST_API_KEY")
    BASE_URL_WITH_PROXY = "https://platform-backend.getalchemystai.com/api/v1/proxy/default"
    llm = ChatOpenAI(
    api_key=ALCHEMYST_API_KEY,
    model="alchemyst-ai/alchemyst-c1",
    base_url=BASE_URL_WITH_PROXY,
    )
    result = llm.invoke([{"role": "user", "content": prompt}])
    return result.content
   

if __name__ == "__main__":
    prompt = "What is the meaning of life?"
    print(call_llm(prompt))
