# utils/call_llm.py
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
import os

def call_llm(prompt: str, system_prompt: str) -> str:
    """
    Call the Alchemyst AI Proxy using direct requests to the proxy, with a provided system prompt.
    """
    load_dotenv()
    ALCHEMYST_API_KEY = os.environ.get("ALCHEMYST_API_KEY")
    BASE_URL_WITH_PROXY = "https://platform-backend.getalchemystai.com/api/v1/proxy/default"
    llm = ChatOpenAI(
        api_key=ALCHEMYST_API_KEY,
        model="alchemyst-ai/alchemyst-c1",
        base_url=BASE_URL_WITH_PROXY,
    )
    result = llm.invoke([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt}
    ])
    return result.content
   

if __name__ == "__main__":
    prompt = "What is the meaning of life?"
    system_prompt = "You are an API agent. Only output valid JSON. Do not include any explanations, markdown, or extra text."
    print(call_llm(prompt, system_prompt))
