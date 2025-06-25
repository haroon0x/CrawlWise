from pocketflow import Node
from utils.call_llm import call_llm
import asyncio
from crawler import crawl

class CrawlExtractNode(Node):
    def prep(self, shared):
        return shared["url"]

    def exec(self, url):
        # Use the async crawl function from crawler.py
        result = asyncio.run(crawl(url))
        # Assume result is a dict with 'markdown' and 'meta' keys
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
        response = call_llm(prompt)
        import json
        return json.loads(response)

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
        response = call_llm(prompt)
        import json
        return json.loads(response)

    def post(self, shared, prep_res, exec_res):
        shared["improvements"] = exec_res
        return "default"