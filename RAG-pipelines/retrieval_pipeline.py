import os
from langchain_chroma import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHROMA_DIR = os.path.join(BASE_DIR, "db", "chroma_db")

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

db = Chroma(
    persist_directory=CHROMA_DIR,
    embedding_function=embedding_model
)

def retrieve_chunks(query: str, k: int = 5):
    """
    Retrieve top-k relevant document chunks for a query.
    """
    return db.similarity_search(query, k=k)
