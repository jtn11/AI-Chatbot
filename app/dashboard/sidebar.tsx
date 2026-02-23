"use client";
import { MessageSquare, Plus, Trash2, User } from "lucide-react";
import { UploadDocument } from "./upload-doc-component";
import { useAuth } from "../context/authcontext";
import { ChatMeta } from "../types/chat-type";

interface SideBarProps {
  sidebarOpen: boolean;
  chats: ChatMeta[];
  setchats: (value: ChatMeta[] | ((prev: ChatMeta[]) => ChatMeta[])) => void;
  currentChatId?: string | null;
  setCurrentChatId: (id: string | null) => void;
  setIsRagActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPdfUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  pdfUploaded: boolean;
}

export const SideBar = ({
  sidebarOpen,
  chats,
  setchats,
  currentChatId,
  setCurrentChatId,
  setIsRagActive,
  setPdfUploaded,
  pdfUploaded,
}: SideBarProps) => {
  const { userid } = useAuth();
  if (!userid) return;

  const createNewChat = () => {
    setCurrentChatId(null);
  };

  const deleteChat = (chatId: string) => {
    if (chatId != chats[0].id) {
      setchats((prev) => prev.filter((chat) => chat.id !== chatId));
    }
  };

  return (
    <div
      className={`${sidebarOpen ? "w-64" : "w-0"} fixed md:sticky left-0 top-0 bottom-0 bg-gray-900 text-white transition-all duration-300 z-40 flex flex-col overflow-hidden`}
    >
      <UploadDocument
        userid={userid}
        setIsRagActive={setIsRagActive}
        setPdfUploaded={setPdfUploaded}
        pdfUploaded={pdfUploaded}
        setCurrentChatId={setCurrentChatId}
        currentChatId={currentChatId}
      />

      {/* Sidebar Header */}
      <div className="pt-3 pl-3 pr-3 flex text-gray-300 items-center justify-between">
        <span className="text-sm truncate">Your Chats</span>
        <button
          onClick={createNewChat}
          className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
        >
          <Plus className="h-3 w-3" />
          <span className="text-sm truncate">New Chat</span>
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => {
              setCurrentChatId(chat.id);
              console.log("ChatId :", chat.id);
            }}
            className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              currentChatId === chat.id ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <MessageSquare className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="text-sm truncate">{chat.title}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-opacity"
            >
              <Trash2 className="h-4 w-4 text-red-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
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
