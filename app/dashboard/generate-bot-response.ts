import { getGroqChatCompletion } from "@/lib/model";

export async function GenerateBotResponse (userInput : string , isRagActive :boolean){
    const input = userInput.toLowerCase(); 
    try {
        if(isRagActive){
        const res = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify({query : input})
        })
        const data = await res.json();
        return data.answer
    } 
      const completions = await getGroqChatCompletion(input);
      const botmessage =
      completions.choices[0]?.message?.content || "No response";

    return botmessage;
  } catch (error) {
    console.log("Chat Error", error);
    return "Something went wrong.";
  }
}