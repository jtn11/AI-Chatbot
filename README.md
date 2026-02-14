# 🤖 AI Chatbot Application (RAG-enabled)

A modern **AI-powered chatbot application** built with **Next.js 14 (App Router)**, **Firebase**, and a **Retrieval-Augmented Generation (RAG)** backend.  
The application supports **secure authentication**, **document-based question answering (PDF / TXT)**, and a scalable architecture ready for production use.

---

## 🚀 Features

### 💬 AI Chatbot

- Context-aware chatbot powered by **RAG (Retrieval-Augmented Generation)**
- Answers user queries based on uploaded documents (PDF / TXT)
- Reduces hallucinations by grounding responses in real data

### 📂 Document Upload & Knowledge Base

- Upload documents (PDF / TXT)
- Automatic document ingestion:
  - Chunking
  - Embedding generation
  - Vector storage
- Persistent vector database (no reprocessing on restart)

### 🔐 Secure Authentication

- Firebase Authentication
- Sign up, Sign in, Sign out
- Protected routes with redirects for unauthenticated users
- Global auth state using `AuthContext`
- Server-side session validation via API routes

### 🧱 Modern Architecture

- Next.js 14 App Router
- React Server Components + Client Components
- Clean separation of frontend, API, and AI pipelines

---

## 🧠 RAG Architecture Overview

User Uploads PDF / TXT
↓
Document Loader
↓
Text Splitter
↓
Embeddings (OpenAI)
↓
ChromaDB (Vector Store)
↓
Retriever
↓
LLM
↓
Final Answer

---

## 🛠️ Tech Stack

### Frontend

- Next.js 14 (App Router)
- React
- TypeScript / JavaScript
- Tailwind CSS / CSS Modules

### Backend & AI

- LangChain
- OpenAI Embeddings (`text-embedding-3-small`)
- ChromaDB (Vector Store)

### Authentication

- Firebase Authentication
- Custom Auth Context

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory.

### 🔥 Firebase Configuration

Get these values from **Firebase Console → Project Settings**.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

🤖 AI / Backend Configuration
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_API_URL=http://localhost:3000/api
📥 Document Ingestion (RAG)

Uploaded documents are:

Loaded (PDF / TXT)

Split into chunks

Embedded using OpenAI

Stored in ChromaDB

Vector data is persisted locally to avoid reprocessing.

🔎 Chat Flow

User asks a question

Query is embedded

Relevant document chunks are retrieved

Context is injected into the LLM prompt

Final answer is generated
```
