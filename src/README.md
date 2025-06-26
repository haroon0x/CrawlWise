# CrawlWise: GEO Agent System

CrawlWise is an end-to-end Generative Engine Optimization (GEO) agent system that audits and improves webpages for SEO and AI-readiness. It combines a FastAPI backend, a modern React/Tailwind frontend, the [PocketFlow](https://github.com/The-Pocket/PocketFlow) agent framework, and the [AlchemystAI LLM Proxy](https://getalchemystai.com) for robust, production-grade content analysis and generation.

---

## 🚀 What is CrawlWise?

- **Input:** A user submits a public URL (plus optional keywords and tone).
- **Process:**
  1. The backend crawls the page (using [Crawl4AI](https://pypi.org/project/crawl4ai/)), extracts content and metadata.
  2. PocketFlow orchestrates a multi-step agent pipeline:
     - **Audit Node:** Analyzes structure, SEO/GEO issues, and provides recommendations (via AlchemystAI LLM).
     - **Enhancement Node:** Generates improved intro, meta tags, and FAQ (via AlchemystAI LLM).
  3. The frontend displays results in a clean, animated UI.
- **Output:** A structured JSON with audit and improvement suggestions.

---

## 🛠️ Tech Stack

- **Backend:** FastAPI, [PocketFlow](https://github.com/The-Pocket/PocketFlow), [Crawl4AI](https://pypi.org/project/crawl4ai/), [LangChain](https://python.langchain.com/), [AlchemystAI LLM Proxy](https://getalchemystai.com)
- **Frontend:** React, TailwindCSS
- **Agent Orchestration:** [PocketFlow](https://github.com/The-Pocket/PocketFlow)
- **LLM Provider:** [AlchemystAI](https://getalchemystai.com)

---

## 🏗️ Architecture

```mermaid
graph TD
    A[User (Frontend)] -->|Submits URL| B[FastAPI Backend]
    B --> C[Crawl4AI Crawler]
    C --> D[Extracted Content & Metadata]
    D --> E[PocketFlow Agent Pipeline]
    E --> F[Audit Node (LLM via AlchemystAI)]
    E --> G[Enhancement Node (LLM via AlchemystAI)]
    F --> H[Audit JSON]
    G --> I[Improvements JSON]
    H & I --> J[API Response]
    J -->|Display Results| A
    F & G --> K[AlchemystAI LLM Proxy]
    K -.->|LLM Calls| F
    K -.->|LLM Calls| G
```

---

## 🌐 Key Links

- **PocketFlow Agent Framework:** [https://github.com/The-Pocket/PocketFlow](https://github.com/The-Pocket/PocketFlow)
- **AlchemystAI LLM Proxy:** [https://getalchemystai.com](https://getalchemystai.com)

---

## ⚡ Quickstart

1. **Clone the repo**
   ```bash
   git clone <your-fork-or-this-repo>
   cd CrawlWise
   ```
2. **Set up environment**
   - Create a `.env` file in `src/` with your AlchemystAI API key:
     ```env
     ALCHEMYST_API_KEY=sk-...  # Get yours at https://getalchemystai.com
     ```
3. **Install backend dependencies**
   ```bash
   cd src
   pip install -r requirements.txt
   # or
   pip install .
   ```
4. **Run the backend**
   ```bash
   uvicorn main:app --reload
   ```
5. **Run the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 🔑 Get an AlchemystAI API Key
- Sign up at [https://getalchemystai.com](https://getalchemystai.com)
- Copy your API key and add it to your `.env` as `ALCHEMYST_API_KEY`

---

## 📡 Example API Usage

**Request:**
```json
POST /api/v1/audit
{
  "agent": "seo",
  "url": "https://example.com/your-blog-post",
  "keywords": ["LLM SEO", "AI search"],
  "tone": "professional"
}
```

**Response:**
```json
{
  "audit": {
    "structure": ["Missing H1", "Too many H3s"],
    "issues": ["No meta title", "No structured FAQ section"],
    "recommendations": ["Add a meta title using keywords", "Use structured data"]
  },
  "improvements": {
    "intro": "In this article, we explore how to use large language models for modern SEO...",
    "meta": {
      "title": "Mastering SEO for LLMs in 2025",
      "description": "Learn how to optimize your content for AI-driven search engines using LLM strategies."
    },
    "faqs": [
      {
        "question": "What is Generative Engine Optimization (GEO)?",
        "answer": "GEO is the practice of optimizing your content for inclusion in AI-generated answers."
      }
    ]
  }
}
```

---

## 🤖 How It Works (Agent Pipeline)

- **PocketFlow** orchestrates the agent pipeline:
  1. **CrawlExtractNode:** Fetches and parses the webpage.
  2. **AuditContentNode:** Audits content/metadata for SEO/GEO (via LLM).
  3. **GenerateEnhancementsNode:** Generates improved intro, meta, FAQ (via LLM).
- All LLM calls are routed through the **AlchemystAI Proxy** for reliability and cost efficiency.

