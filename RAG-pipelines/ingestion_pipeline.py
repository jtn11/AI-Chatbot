import os
import re
from langchain_text_splitters import CharacterTextSplitter
from langchain_chroma import Chroma
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings
from pypdf import PdfReader
from langchain_core.documents import Document



load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def extract_text_from_pdf(pdf_path: str) -> str:
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += (page.extract_text() or "") + "\n"
    return text

# def save_text_to_docs(text: str, filename: str , user_id: str , chat_id: str):
#     docs_dir = os.path.join(BASE_DIR, "docs" , user_id , chat_id)
#     os.makedirs(docs_dir, exist_ok=True)

#     file_path = os.path.join(docs_dir, f"{filename}.txt")
#     with open(file_path, "w", encoding="utf-8") as f:
#         f.write(text)

#     print(f"Saved extracted text to: {file_path}")

def normalize_extracted_text(text: str) -> str:
    text = re.sub(r'(?<=\w)\s(?=\w)', '', text)

    # Normalize excessive whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'[ \t]{2,}', ' ', text)

    return text.strip()


# def load_documents(docs_path):
#     """Load all text files from the docs directory"""
#     print(f"Loading documents from {docs_path}...")
    
#     # Check if docs directory exists
#     if not os.path.exists(docs_path):
#         raise FileNotFoundError(f"The directory {docs_path} does not exist. Please create it and add your company files.")
    
#     # Load all .txt files from the docs directory
#     loader = DirectoryLoader(
#         path=docs_path,
#         glob="*.txt",
#         loader_cls=TextLoader
#     )
    
#     documents = loader.load()
    
#     if len(documents) == 0:
#         raise FileNotFoundError(f"No .txt files found in {docs_path}. Please add your company documents.")
    
   
#     for i, doc in enumerate(documents[:1]):  # Show first 2 documents
#         print(f"\nDocument {i}:")
#         print(f"  Source: {doc.metadata['source']}")
#         print(f"  Content length: {len(doc.page_content)} characters")
#         print(f"  Content preview: {doc.page_content[:100]}...")
#         print(f"  metadata: {doc.metadata}")

#     return documents

def split_documents(documents, chunk_size=1000, chunk_overlap=0):
    """Split documents into smaller chunks with overlap"""
    print("Splitting documents into chunks...")
    
    text_splitter = CharacterTextSplitter(
        chunk_size=chunk_size, 
        chunk_overlap=chunk_overlap
    )
    
    chunks = text_splitter.split_documents(documents)
    
    if chunks:
    
        for i, chunk in enumerate(chunks[:5]):
            print(f"\n--- Chunk {i+1} ---")
            print(f"Metadata: {chunk.metadata}")
            print(f"Length: {len(chunk.page_content)} characters")
            print(f"Content:")
            print(chunk.page_content)
            print("-" * 50)
        
        if len(chunks) > 5:
            print(f"\n... and {len(chunks) - 5} more chunks")
    
    return chunks

def create_vector_store(chunks, persist_directory):
    """Create and persist ChromaDB vector store"""
    print("Creating embeddings and storing in ChromaDB...")

    print("Chunk count before embedding:", len(chunks))

        
    embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)
    
    # Create ChromaDB vector store
    print("--- Creating vector store ---")
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=persist_directory, 
        collection_metadata={"hnsw:space": "cosine"}
    )
    print("--- Finished creating vector store ---")
    print("Vector count after creation:", vectorstore._collection.count())

    print(f"Vector store created and saved to {persist_directory}")
    return vectorstore

def run_ingestion(file_path , user_id , chat_id):
    print("=== RAG Ingestion Pipeline ===")

    print(f"Extracting text from: {file_path}")

    text = extract_text_from_pdf(file_path)
    clean_text = normalize_extracted_text(text)

    # docs_path = os.path.join(BASE_DIR, "docs", user_id, chat_id)

    persist_directory = os.path.join(
    BASE_DIR,
    "db",
    user_id,
    chat_id
)
    os.makedirs(persist_directory, exist_ok=True)


    # documents = load_documents(docs_path)
    documents = [Document(page_content=clean_text)]

    chunks = split_documents(documents)
    create_vector_store(chunks, persist_directory)

    print("✅ Ingestion complete")


# CLI support (optional but correct)
if __name__ == "__main__":
    run_ingestion()