# CrawlWise
CrawlWise – The GEOAgent
GEOAgent is an autonomous AI agent that audits and optimizes webpages for **Generative Engine Optimization (GEO)**. In a world where search is increasingly dominated by AI-generated answers (ChatGPT, Perplexity, Gemini), CrawlWise ensures your content is primed to be featured.

---

## 🚀 Features

- 🕸️ Crawls URLs using [Crawl4AI](https://github.com/alchemystlabs/crawl4ai)
- 📄 Extracts and parses clean Markdown from web pages
- 🧠 Audits structure, E-E-A-T, and SEO/GEO readiness via LLM
- ✍️ Suggests optimized intros, meta titles/descriptions, and FAQs
- 📦 Returns structured JSON outputs for integration or display

---

🧪 Tech Stack
FastAPI (via MCP Server)

Crawl4AI

Alchemyst Proxy (LLM)

PocketFlow - Agent Framework


## 📥 Input

```json
{
  "url": "https://example.com/your-blog-post",
  "keywords": ["LLM SEO", "AI search"],
  "tone": "professional"
}

```
CrawlWise
├─ .cursor
│  └─ rules
├─ backend
├─ Dockerfile
├─ error.txt
├─ README.md
├─ requirements.txt
└─ src
   ├─ .clinerules
   ├─ .cursorrules
   ├─ .python-version
   ├─ crawler.py
   ├─ docs
   │  ├─ design.md
   │  └─ project.md
   ├─ flow.py
   ├─ index.css
   ├─ main.py
   ├─ main.tsx
   ├─ nodes.py
   ├─ pyproject.toml
   ├─ README.md
   ├─ utils
   │  ├─ call_llm.py
   │  ├─ __init__.py
   │  └─ __pycache__
   │     ├─ call_llm.cpython-311.pyc
   │     └─ __init__.cpython-311.pyc
   ├─ uv.lock
   └─ __pycache__
      ├─ crawler.cpython-311.pyc
      ├─ flow.cpython-311.pyc
      ├─ main.cpython-311.pyc
      └─ nodes.cpython-311.pyc

```