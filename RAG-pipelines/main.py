# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from ingestion_pipeline import run_ingestion

app = FastAPI()

class IngestRequest(BaseModel):
    filePath: str

@app.post("/ingest")
def ingest(req: IngestRequest):
    run_ingestion(req.filePath)
    return {"status": "ingestion completed"}

