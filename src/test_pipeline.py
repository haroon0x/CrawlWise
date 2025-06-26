from flow import create_crawlwise_flow

if __name__ == "__main__":
    shared = {
        "url": "https://github.com/haroon0x/CrawlWise",  # or any real article/blog URL
        "keywords": ["LLM SEO", "AI search"],
        "tone": "professional"
    }
    flow = create_crawlwise_flow()
    flow.run(shared)
    print("AUDIT RESULT:")
    print(shared.get("audit"))
    print("\nIMPROVEMENTS RESULT:")
    print(shared.get("improvements"))