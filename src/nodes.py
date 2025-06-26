from pocketflow import Node
from utils.call_llm import call_llm
import asyncio
from crawler import crawl
import re

# Helper to run async code from sync context, even if already in an event loop
def run_async(coro):
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        loop = None
    if loop and loop.is_running():
        # If already in an event loop, run in a new thread
        import threading
        result = []
        def runner():
            result.append(asyncio.run(coro))
        t = threading.Thread(target=runner)
        t.start()
        t.join()
        return result[0]
    else:
        return asyncio.run(coro)

def extract_json_from_response(response: str) -> str:
    # Remove markdown code block if present
    match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", response, re.DOTALL)
    if match:
        return match.group(1)
    # Fallback: try to find the first { ... }
    start = response.find('{')
    end = response.rfind('}')
    if start != -1 and end != -1 and end > start:
        return response[start:end+1]
    return response  # as-is

class CrawlExtractNode(Node):
    def prep(self, shared):
        return shared["url"]

    def exec(self, url):
        result = run_async(crawl(url))
        fit_markdown = result["markdown"]
        meta = result.get("meta", {})
        return {"fit_markdown": fit_markdown, "meta": meta}

    def post(self, shared, prep_res, exec_res):
        shared["fit_markdown"] = exec_res["fit_markdown"]
        shared["meta"] = exec_res["meta"]
        return "default"

class AuditContentNode(Node):
    def prep(self, shared):
        return {
            "fit_markdown": shared["fit_markdown"],
            "meta": shared["meta"],
            "keywords": shared.get("keywords", [])
        }

    def exec(self, inputs):
        fit_markdown = inputs["fit_markdown"]
        meta = inputs["meta"]
        keywords = inputs["keywords"]
        prompt = (
            "You are a technical SEO expert. Audit the following webpage content and metadata for SEO and GEO (Generative Engine Optimization) readiness.\n"
            f"Content (Markdown):\n{fit_markdown}\n\nMetadata: {meta}\n\nKeywords: {keywords}\n\n"
            "Checklist:\n"
            "- Structural Validation (missing/multiple H1, missing meta description, heading structure)\n"
            "- Keyword Presence in content and meta\n"
            "- E-E-A-T signals (author, date, outbound links/citations)\n"
            "- FAQ section presence\n\n"
            "Return a JSON with keys: structure (list), issues (list), recommendations (list)."
        )
        system_prompt = (
            "You are CrawlWise, an autonomous AI agent for Generative Engine Optimization (GEO). "
            "Your task is to audit webpage content and metadata for SEO and GEO readiness. "
            "You must output ONLY valid, minified JSON (no markdown, no code block, no explanations, no extra text). "
            "The JSON must have these keys: "
            '"structure" (list of strings), '
            '"issues" (list of strings), '
            '"recommendations" (list of strings). '
            "If any field is missing, output an empty list for it. "
            "Do not include any comments, trailing commas, or text outside the JSON object. "
            "Example output: {\"structure\":[],\"issues\":[],\"recommendations\":[]}. "
            "If you do not follow these instructions, your output will be rejected."
        )
        import json
        response = call_llm(prompt, system_prompt)
        print("LLM RAW RESPONSE:", response)
        json_str = extract_json_from_response(response)
        return json.loads(json_str)

    def post(self, shared, prep_res, exec_res):
        shared["audit"] = exec_res
        return "default"

class GenerateEnhancementsNode(Node):
    def prep(self, shared):
        return {
            "fit_markdown": shared["fit_markdown"],
            "audit": shared["audit"],
            "keywords": shared.get("keywords", []),
            "tone": shared.get("tone", "professional")
        }

    def exec(self, inputs):
        fit_markdown = inputs["fit_markdown"]
        audit = inputs["audit"]
        keywords = inputs["keywords"]
        tone = inputs["tone"]
        prompt = (
            f"You are an expert SEO content generator. Based on the following content and audit, generate:\n"
            f"- A rewritten introduction in a {tone} tone\n"
            "- An optimized meta title (~60 chars) and description (~155 chars) using the keywords\n"
            "- A FAQ section (list of Q&A pairs)\n\n"
            f"Content (Markdown):\n{fit_markdown}\n\nAudit: {audit}\n\nKeywords: {keywords}\n\n"
            "Return a JSON with keys: intro (str), meta (dict with title/description), faqs (list of dicts with question/answer)."
        )
        system_prompt = (
            "You are CrawlWise, an autonomous AI agent for Generative Engine Optimization (GEO). "
            "Your task is to generate content improvements for a webpage. "
            "You must output ONLY valid, minified JSON (no markdown, no code block, no explanations, no extra text). "
            "The JSON must have these keys: "
            '"intro" (string), '
            '"meta" (object with keys "title" (string) and "description" (string)), '
            '"faqs" (list of objects, each with keys "question" (string) and "answer" (string)). '
            "If any field is missing, output an empty string, object, or list as appropriate. "
            "Do not include any comments, trailing commas, or text outside the JSON object. "
            "Example output: {\"intro\":\"\",\"meta\":{\"title\":\"\",\"description\":\"\"},\"faqs\":[]}. "
            "If you do not follow these instructions, your output will be rejected."
        )
        import json
        response = call_llm(prompt, system_prompt)
        print("LLM RAW RESPONSE:", response)
        json_str = extract_json_from_response(response)
        return json.loads(json_str)

    def post(self, shared, prep_res, exec_res):
        shared["improvements"] = exec_res
        return "default"