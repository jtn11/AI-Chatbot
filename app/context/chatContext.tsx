"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ChatMeta, Message } from "../types/chat-type";
import { useAuth } from "./authcontext";

interface ChatContextTypes {
  chats: ChatMeta[];
  currentChatId: string | null;
  messages: Message[];
  setCurrentChatId: (id: string | null) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  createNewChat: () => void;
  refreshChats: () => Promise<void>;
  loadMessages: (chatId: string) => Promise<void>;
  deleteChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextTypes | undefined>(undefined);

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userid } = useAuth();

  const [chats, setChats] = useState<ChatMeta[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const refreshChats = async () => {
    if (!userid) {
      return;
    }
    const res = await fetch(`/api/chats?userId=${userid}`);
    const data = await res.json();
    setChats(data.chats || []);
  };

  const loadMessages = async (chatId: string) => {
    if (!userid) {
      const res = await fetch(`/api/messages?chatId=${chatId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    }
  };

  const createNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  };

  const deleteChat = async (chatId: string) => {
    if (!userid) return;

    await fetch(`/api/chats/${chatId}`, {
      method: "DELETE",
    });

    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
    }

    refreshChats();
  };

  useEffect(() => {
    if (!userid) return;
    refreshChats();
  }, [userid]);

  useEffect(() => {
    if (!currentChatId) {
      setMessages([]);
      return;
    }
    loadMessages(currentChatId);
  }, [currentChatId]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChatId,
        messages,
        setCurrentChatId,
        setMessages,
        refreshChats,
        loadMessages,
        createNewChat,
        deleteChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatContextProvider");
  }
  return context;
};
