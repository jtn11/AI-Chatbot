"use client";
import { MessageSquare, Plus, Trash2, User } from "lucide-react";
import { useState } from "react";

interface Chat {
  id: number;
  title: string;
  messages: Message[];
  createdAt: Date;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface SideBarProps {
  sidebarOpen: boolean;
  chats: Chat[];
  setchats: (value: Chat[] | ((prev: Chat[]) => Chat[])) => void;
}

export const SideBar = ({ sidebarOpen, chats, setchats }: SideBarProps) => {
  const [currentChatId, setCurrentChatId] = useState(chats[0].id);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    };
    setchats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const deleteChat = (chatId: number) => {
    if (chatId != chats[0].id) {
      setchats((prev) => prev.filter((chat) => chat.id !== chatId));
    }
  };

  return (
    <div
      className={`${sidebarOpen ? "w-64" : "w-0"} bg-gray-900 text-white transition-all duration-300 flex flex-col overflow-hidden`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={createNewChat}
          className="w-full flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">New Chat</span>
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setCurrentChatId(chat.id)}
            className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              currentChatId === chat.id ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <MessageSquare className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <span className="text-sm truncate">{chat.title}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-opacity"
            >
              <Trash2 className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">User Account</p>
            <p className="text-xs text-gray-400">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};
