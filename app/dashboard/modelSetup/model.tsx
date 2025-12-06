import Groq from "groq-sdk";

const groq = new Groq({
    apiKey : process.env.GROQ_API_KEY,
});

export const getGroqChatCompletion = async(userInput : string)=>{
    return groq.chat.completions.create({
        messages : [
            {role : "system" , content : "You are a helpful assistant."},
            {role : "user" , content : userInput}, 
        ] , 
        model : "gpt-3.5-turbo"
    })
}