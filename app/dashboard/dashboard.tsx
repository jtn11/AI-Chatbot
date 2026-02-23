"use client";
import { useState, useRef, useEffect } from "react";
import { SideBar } from "./sidebar";
import { ChatArea } from "./chat-area";
import { InputArea } from "./input-area";
import { TopBar } from "./top-bar";
import { ChatMeta, Message } from "../types/chat-type";
import { useAuth } from "../context/authcontext";

export default function Dashboard() {
  const [chats, setChats] = useState<ChatMeta[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isRagActive, setIsRagActive] = useState<boolean>(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { userid } = useAuth();

  const currentChat = chats.find((chat) => chat.id === currentChatId) ?? null;

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentChatId]);

  const handleSend = async (): Promise<void> => {
    if (!inputValue.trim()) return;

    const messageText = inputValue;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      createdAt: new Date(),
    };

    // Update chat with user message
    setMessages((prev) => [...prev, userMessage]);

    setInputValue("");
    setIsTyping(true);

    // Simulate bot response

    console.log({
      userid,
      chatId: currentChatId,
      message: messageText,
    });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid,
          chatId: currentChatId,
          message: messageText,
        }),
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();
      console.log("This is the data after /api/chat", data);
      setCurrentChatId(data.chatId);
      console.log("Data to see chatid", data);

      // If this was a new chat, register it in sidebar
      if (currentChat === null) {
        const newChat: ChatMeta = {
          id: data.chatId,
          title: messageText.slice(0, 30),
          createdAt: new Date(),
          updatedAt: new Date(),
          isRagActive: false,
          activeDocumentName: null,
        };

        setChats((prev) => [newChat, ...prev]);
        setCurrentChatId(data.chatId);
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.reply,
        sender: "bot",
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Send error:", error);
    } finally {
      setIsTyping(false);
    }
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
          setIsRagActive={setIsRagActive}
          setPdfUploaded={setPdfUploaded}
          pdfUploaded={pdfUploaded}
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
          messages={messages}
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
