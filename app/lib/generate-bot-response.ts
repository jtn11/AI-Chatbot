export async function GenerateBotResponse(
  userInput: string,
  isRagActive: boolean,
  pdfUploaded: boolean,
) {
  try {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: userInput,
        is_rag_active: isRagActive,
        is_pdf_uploaded: pdfUploaded,
      }),
    });
    const data = await res.json();
    return data.answer;
  } catch (error) {
    console.log("Chat Error", error);
    return "Something went wrong.";
  }
}
