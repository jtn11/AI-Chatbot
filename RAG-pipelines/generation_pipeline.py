import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables once
load_dotenv()

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def build_rag_prompt(query: str, chunks: list[str]) -> str:
    """
    Build a grounded RAG prompt from retrieved document chunks.
    """
    # Limit context to avoid token overflow and noise
    context = "\n\n".join(chunks[:3])

    return f"""
You are an AI assistant answering questions based only on the provided document context.

Instructions:
- The context may be unstructured (e.g., extracted from a PDF).
- You may summarize, reorganize, and rephrase the information.
- Do NOT add facts that are not supported by the context.
- If the answer is not present, respond exactly with:
  "I don't know based on the provided document."

Context:
{context}

Question:
{query}

Answer:
""".strip()


def generate_answer(query: str, chunks: list[str]) -> str:
    """
    Generate a grounded answer using Groq + retrieved chunks.
    """
    if not chunks:
        return "I don't know based on the provided document."

    prompt = build_rag_prompt(query, chunks)

    response = client.chat.completions.create(
       model="llama-3.1-8b-instant",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.3,
        max_tokens=512,
    )

    return response.choices[0].message.content.strip()
