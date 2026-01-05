# RAG (Retrieval-Augmented Generation) Feature Roadmap

## Overview

This document outlines the implementation plan for adding RAG capabilities to the chatbot, enabling users to upload PDFs and get answers based on the content of those documents.

## Architecture

### Tech Stack

- **Frontend**: Next.js 16 (React 19), TypeScript, Tailwind CSS
- **Backend (RAG)**: Python FastAPI
- **LLM**: Groq (existing)
- **Vector Database**: ChromaDB (lightweight, embedded)
- **Embeddings**: OpenAI embeddings (or alternative like Sentence Transformers)
- **PDF Processing**: PyPDF2 or pdfplumber
- **Storage**: Firebase Storage (for PDFs)

### System Architecture

```
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │
         │ HTTP/API Calls
         │
┌────────▼─────────────────┐
│   Next.js API Routes     │
│   (/api/upload, /api/rag)│
└────────┬─────────────────┘
         │
         ├─────────────────┐
         │                 │
┌────────▼────────┐  ┌─────▼──────────┐
│  Python FastAPI │  │ Firebase Storage│
│  RAG Service    │  │  (PDF Files)   │
│  (Port 8000)    │  └────────────────┘
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──────┐
│ChromaDB│ │  Groq   │
│(Vector │ │  LLM    │
│ Store) │ └─────────┘
└────────┘
```

## Implementation Phases

### Phase 1: Python RAG Backend Setup ✅

**Goal**: Create a Python FastAPI service that handles PDF processing and RAG queries

**Components**:

1. FastAPI application with CORS enabled
2. PDF upload and processing endpoint
3. Text extraction from PDFs
4. Text chunking (with overlap for context)
5. Embedding generation
6. Vector store (ChromaDB) for storing embeddings
7. RAG query endpoint that:
   - Embeds the query
   - Retrieves relevant chunks
   - Formats context for LLM
   - Calls Groq API with context
   - Returns response

**Files to Create**:

- `rag_backend/main.py` - FastAPI app
- `rag_backend/pdf_processor.py` - PDF extraction logic
- `rag_backend/vector_store.py` - ChromaDB management
- `rag_backend/config.py` - Configuration
- `rag_backend/requirements.txt` - Python dependencies
- `rag_backend/.env.example` - Environment variables template

### Phase 2: Next.js API Integration ✅

**Goal**: Create API routes in Next.js that communicate with Python backend

**Components**:

1. `/api/rag/upload` - Handles PDF upload, forwards to Python backend
2. `/api/rag/query` - Handles RAG queries, communicates with Python backend
3. `/api/rag/documents` - List uploaded documents (optional)

**Files to Create**:

- `app/api/rag/upload/route.ts`
- `app/api/rag/query/route.ts`
- `app/api/rag/documents/route.ts` (optional)

### Phase 3: Frontend PDF Upload UI ✅

**Goal**: Add PDF upload functionality to the dashboard

**Components**:

1. PDF upload button/component in sidebar or top bar
2. File upload dialog
3. Upload progress indicator
4. List of uploaded documents
5. Document management (delete, view)

**Files to Modify/Create**:

- `app/dashboard/sidebar.tsx` - Add upload section
- `app/dashboard/document-manager.tsx` - New component for document management
- Update `app/dashboard/dashboard.tsx` - Add document state management

### Phase 4: RAG Integration in Chat ✅

**Goal**: Integrate RAG responses into the chat flow

**Components**:

1. Toggle for RAG mode (use uploaded documents)
2. Modify chat query to use RAG endpoint when enabled
3. Display source documents in responses (optional)
4. Handle mixed queries (some with RAG, some without)

**Files to Modify**:

- `app/dashboard/dashboard.tsx` - Add RAG mode toggle and query logic
- `app/dashboard/input-area.tsx` - Add RAG mode indicator
- `lib/rag-api.ts` - New utility for RAG API calls

## Detailed Implementation Steps

### Step 1: Python Backend Setup

1. **Create Python environment**

   ```bash
   cd rag_backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Key Dependencies**:
   - `fastapi` - Web framework
   - `uvicorn` - ASGI server
   - `python-multipart` - File upload handling
   - `pypdf2` or `pdfplumber` - PDF processing
   - `chromadb` - Vector database
   - `openai` - For embeddings (or use sentence-transformers)
   - `groq` - For LLM (if needed in Python)
   - `python-dotenv` - Environment variables

3. **Features to implement**:
   - PDF text extraction with metadata
   - Text chunking (500-1000 chars with 200 char overlap)
   - Embedding generation (store in ChromaDB)
   - Semantic search (retrieve top-k chunks)
   - Context formatting for LLM
   - Response generation

### Step 2: Integration Points

1. **Python Backend** runs on `http://localhost:8000`
2. **Next.js API routes** proxy requests to Python backend
3. **Error handling** and fallback to regular chat if RAG fails
4. **User-specific document stores** (using user ID from Firebase auth)

### Step 3: User Experience Flow

1. User uploads PDF → Stored in Firebase Storage
2. PDF sent to Python backend → Processed and embedded
3. User asks question with RAG enabled
4. Query sent to RAG endpoint → Retrieves relevant chunks
5. Context + query sent to Groq → Response generated
6. Response displayed in chat

## Environment Variables

### Python Backend (.env)

```
GROQ_API_KEY=your_groq_api_key
OPENAI_API_KEY=your_openai_api_key  # For embeddings
CHROMA_PERSIST_DIR=./chroma_db
```

### Next.js (.env.local)

```
GROQ_API_KEY=your_groq_api_key
RAG_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
```

## File Structure

```
ai-chatbot/
├── app/
│   ├── api/
│   │   └── rag/
│   │       ├── upload/
│   │       │   └── route.ts
│   │       ├── query/
│   │       │   └── route.ts
│   │       └── documents/
│   │           └── route.ts
│   └── dashboard/
│       ├── document-manager.tsx (new)
│       └── ...
├── lib/
│   └── rag-api.ts (new)
├── rag_backend/ (new)
│   ├── main.py
│   ├── pdf_processor.py
│   ├── vector_store.py
│   ├── config.py
│   ├── requirements.txt
│   ├── .env.example
│   └── chroma_db/ (generated)
└── ...
```

## Testing Strategy

1. **Unit Tests**: Test PDF processing, chunking, embedding
2. **Integration Tests**: Test API endpoints
3. **E2E Tests**: Test full flow from upload to response
4. **Error Handling**: Test with invalid PDFs, network failures

## Future Enhancements

1. Support for other file types (DOCX, TXT, MD)
2. Multiple document collections/namespaces
3. Document metadata and tagging
4. Advanced chunking strategies
5. Hybrid search (semantic + keyword)
6. Response citations with page numbers
7. Document preview in UI
8. Batch document upload
9. Document versioning
10. User permissions and sharing

## Security Considerations

1. Validate PDF files (size limits, file type)
2. Sanitize extracted text
3. User isolation in vector store
4. Rate limiting on API endpoints
5. Authentication checks on all endpoints
6. Secure file storage in Firebase

## Performance Optimization

1. Async processing for large PDFs
2. Batch embedding generation
3. Caching frequently accessed documents
4. Lazy loading of vector stores
5. Connection pooling for database
6. Compression for large documents

## Deployment Considerations

1. Python backend can be deployed as:
   - Docker container
   - Serverless function (if lightweight)
   - Separate service on cloud (AWS, GCP, Azure)
2. Vector database persistence
3. Environment variables management
4. Scaling considerations for multiple users
