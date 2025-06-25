# Project Blueprint: CrawlWise (GEOAgent)
> **DOCUMENT ID:** `design.md`
> **PROJECT:** CrawlWise: Generative Engine Optimization Agent
> **TARGET:** AI Development Agent
> **PURPOSE:** To provide a complete technical specification for building the CrawlWise application.

---

## 1. Project Mission

The objective is to construct an autonomous AI agent, **CrawlWise**, that audits and optimizes a public webpage for **Generative Engine Optimization (GEO)**. The agent will accept a URL, analyze its content and structure, and return a structured JSON object containing a detailed audit and generated content improvements.

## 2. Core Components & Technology Stack

The system will be built using the following technologies. Adherence to this stack is mandatory for component compatibility.

| Component         | Tool/Framework      | Function                                                                       |
| ----------------- | ------------------- | ------------------------------------------------------------------------------ |
| **Agent Framework** | `PocketFlow`        | An agent development framework used to orchestrate the multi-step workflow.    |
| **Web Crawler**     | `Crawl4AI`          | A specialized crawler for fetching and parsing web content for AI applications.|
| **LLM Access**      | `Alchemyst LLM Proxy` | A proxy for interfacing with Large Language Models.                              |
| **Backend/API**     | `FastAPI`           | A Python framework for building the API endpoint.                                |
| **Language**        | `Python`            | The core programming language for the entire project.                          |

## 3. System Execution Flow

The agent operates as a sequential workflow orchestrated by `PocketFlow`. Each node in the flow performs a distinct task and passes its output to the subsequent node.

Node 1: Crawl & Extract (Crawl4AI)
Action: Initialize the Crawl4AI crawler with the url from the input payload.
Extraction Process: Crawl4AI is tasked with fetching and processing the webpage. It must extract the following data:
Primary Content (fit_markdown): The crawler will use its .fit_markdown capability to get the most concise version of the core article content. This output will be the primary input for the subsequent LLM-powered nodes. [9]
Metadata: The crawler should also extract existing metadata from the raw HTML, including:
Current <title> tag content.
Current <meta name="description"> content.
A count of heading tags (<h1>, <h2>, <h3>, etc.).
Output: A data object containing fit_markdown and the extracted metadata.


Node 2: Audit Content
Action: The first agentic step, focused on analysis.
Input: The fit_markdown content, the metadata object from Node 1, and the user-provided keywords.
Process: Construct a prompt for the LLM via the Alchemyst proxy. The prompt will instruct the model to act as a technical SEO expert. It will perform the following checks:
Structural Validation: Analyze the metadata for common SEO issues (e.g., "Missing H1", "Multiple H1 tags", "Missing meta description").
Keyword Presence: Check if the provided keywords appear in the fit_markdown and existing metadata.
E-E-A-T Signal Check: Scan the fit_markdown for the presence of signals that correlate with Experience, Expertise, Authoritativeness, and Trustworthiness. This includes looking for author names, publication/update dates, and outbound links (citations). The audit should flag the absence of these signals.
FAQ Section: Determine if a structured FAQ section exists.
Output: A structured audit JSON object containing issues and recommendations.
Node 3: Generate Enhancements
Action: The second agentic step, focused on content generation.
Input: The fit_markdown from Node 1, the audit object from Node 2, and the user-provided keywords and tone.
Process: Construct a second, distinct prompt for the LLM. This prompt will be generative and will use the context from the audit to inform its creations. It must generate:
Rewritten Introduction: A new opening paragraph for the article, adhering to the specified tone.
Optimized Meta Tags: A new title (approx. 60 characters) and description (approx. 155 characters) that incorporate the keywords.
FAQ Section: A list of question-and-answer pairs derived from the fit_markdown content.
Output: A structured improvements JSON object.
4. Input & Output Specification
The agent's interface is a single FastAPI endpoint.
API Endpoint: POST /api/v1/audit
Request Payload
Generated json
{
  "agent": "seo",
  "url": "https://example.com/your-blog-post",
  "keywords": ["LLM SEO", "AI search"],
  "tone": "professional"
}
Use code with caution.
Json
agent (string): A field for routing, must be set to "seo".
url (string, required): The public URL to be processed.
keywords (list[string], optional): Keywords to guide audit and generation.
tone (string, optional): The desired tone for generated content (e.g., "professional", "casual").
Success Response (200 OK)
The final output must strictly adhere to this JSON schema. It combines the outputs from the Audit and Enhancement nodes.
Generated json
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
Use code with caution.
Json
---------------
System Flow

1. Input Submission

A user provides a URL + optional keywords and tone via API or GUI.

2. Web Crawling

crawl4ai is used to fetch the webpage.

.fit_markdown is extracted to get a clean, structured version of the content.

3. Audit Step (PocketFlow Agent Node 1)

The markdown content is sent to the Alchemyst LLM with a prompt asking to:

Evaluate structure (headings, schema, meta)

Check for content gaps or E-E-A-T violations

Recommend improvements

4. Enhancement Step (PocketFlow Agent Node 2)

A second LLM prompt uses the same markdown and returns:

A rewritten intro

An SEO-optimized title & description

A new FAQ section

5. Return Output

The result is returned as a structured JSON.