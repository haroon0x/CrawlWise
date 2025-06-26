from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Literal
from flow import create_crawlwise_flow
import uvicorn

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],  # Allow frontend dev and all for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AuditRequest(BaseModel):
    agent: Literal['seo'] = 'seo'
    url: str
    keywords: list[str] = []
    tone: str = "professional"

class AuditResponse(BaseModel):
    audit: dict
    improvements: dict

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/v1/audit", response_model=AuditResponse)
def audit_endpoint(request: AuditRequest):
    if request.agent != "seo":
        raise HTTPException(status_code=400, detail="Only 'seo' agent is supported.")
    shared = {
        "url": request.url,
        "keywords": request.keywords,
        "tone": request.tone
    }
    flow = create_crawlwise_flow()
    flow.run(shared)
    if "audit" not in shared or "improvements" not in shared:
        raise HTTPException(status_code=500, detail="Flow did not produce expected output.")
    return {"audit": shared["audit"], "improvements": shared["improvements"]}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
