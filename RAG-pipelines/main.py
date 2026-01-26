from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware


from ingestion_pipeline import run_ingestion
from retrieval_pipeline import retrieve_chunks
from generation_pipeline import generate_answer

# Load environment variables once, globally
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

class IngestRequest(BaseModel):
    filePath: str

@app.post("/ingest")
def ingest(req: IngestRequest):
    """
    Ingest a document (PDF already saved on disk).
    This runs chunking + embedding and stores vectors.
    """
    run_ingestion(req.filePath)
    return {"status": "ingestion completed"}


def rag_chat(query: str) -> str:
    """
    Full RAG flow:
    1. Retrieve relevant chunks
    2. Generate grounded answer using Groq
    """
    docs = retrieve_chunks(query)
    chunks = [doc.page_content for doc in docs]
    return generate_answer(query, chunks)


@app.post("/chat")
def chat(req: QueryRequest):
    """
    Production chat endpoint.
    Returns a final, grounded answer.
    """
    answer = rag_chat(req.query)
    return {
        "query": req.query,
        "answer": answer
    }

@app.post("/_debug")
def debug(req: QueryRequest):
    docs = retrieve_chunks(req.query)
    return {
        "count": len(docs),
        "samples": [d.page_content[:200] for d in docs]
    }

