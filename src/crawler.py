import asyncio
from crawl4ai import *
from bs4 import BeautifulSoup

async def crawl(url: str):
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url=url)
        markdown = result.markdown
        html = result.html
        # Extract meta info
        soup = BeautifulSoup(html, "html.parser")
        title = soup.title.string if soup.title else ""
        description = ""
        desc_tag = soup.find("meta", attrs={"name": "description"})
        if desc_tag and desc_tag.has_attr("content"):
            description = desc_tag["content"]
        headings = {f"h{i}": len(soup.find_all(f"h{i}")) for i in range(1, 7)}
        meta = {
            "title": title,
            "description": description,
            "headings": headings
        }
        return {"markdown": markdown, "meta": meta}

if __name__ == "__main__":
    import sys
    url = sys.argv[1] if len(sys.argv) > 1 else None
    if url:
        print(asyncio.run(crawl(url)))
    else:
        print("Usage: python crawler.py <url>")tr