from pocketflow import Flow
from nodes import CrawlExtractNode, AuditContentNode, GenerateEnhancementsNode

def create_crawlwise_flow():
    """Create and return the CrawlWise GEOAgent flow."""
    crawl_node = CrawlExtractNode()
    audit_node = AuditContentNode()
    enhance_node = GenerateEnhancementsNode()
    crawl_node >> audit_node >> enhance_node
    return Flow(start=crawl_node)