"use client";
import { useState, useRef, useEffect } from "react";
import { getGroqChatCompletion } from "../../lib/model";
import { SideBar } from "./sidebar";
import { ChatArea } from "./chat-area";
import { InputArea } from "./input-area";
import { TopBar } from "./top-bar";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function Dashboard() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(1);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  // if(!currentChat){
  //   return (<div>Chat not loaded </div>)
  // }

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }; 

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentChatId]);

  const generateBotResponse = async (userInput: string) => {
    const input = userInput.toLowerCase();

    try {
      const completions = await getGroqChatCompletion(input);
      const botmessage =
        completions.choices[0]?.message?.content || "No response";
      return botmessage;
    } catch (error) {
      console.log("Groq API Error", error);
      return "No response";
    }
  };

  const handleSend = async (): Promise<void> => {
    if (!inputValue.trim() || !currentChat) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    // Update chat with user message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              title:
                chat.messages.length === 0
                  ? inputValue.slice(0, 30) +
                    (inputValue.length > 30 ? "..." : "")
                  : chat.title,
            }
          : chat,
      ),
    );

    setInputValue("");
    setIsTyping(true);

    // Simulate bot response

    const botRespone = await generateBotResponse(userMessage.text);
    const botMessage: Message = {
      id: Date.now(),
      text: botRespone,
      sender: "bot",
      timestamp: new Date(),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, botMessage] }
          : chat,
      ),
    );
    setIsTyping(false);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {sidebarOpen && (
        <SideBar
          sidebarOpen={sidebarOpen}
          chats={chats}
          setchats={setChats}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar setSidebarOpen={() => setSidebarOpen(!sidebarOpen)} />

        {/* Messages Area */}
        <ChatArea
          currentChat={currentChat}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          setInputValue={setInputValue}
        />

        {/* Input Area */}
        <InputArea
          inputRef={inputRef}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSend={handleSend}
          handleKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}
