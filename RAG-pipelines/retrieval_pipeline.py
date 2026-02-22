import os
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

def retrieve_chunks(query: str, persist_directory: str, k: int = 5):

    if not os.path.exists(persist_directory):
        print("[RAG] No vectorstore found for this chat.")
        return []

    db = Chroma(
        persist_directory=persist_directory,
        embedding_function=embedding_model
    )

    print("[RAG] Vector count:", db._collection.count())
    
    docs = db.similarity_search(query, k=k)

    print(f"[RAG] Retrieved {len(docs)} chunks for query: {query}")

    return docs
