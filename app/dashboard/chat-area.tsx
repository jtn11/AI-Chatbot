import { Sparkles, User } from "lucide-react";
import { ChatMeta, Message } from "../types/chat-type";
import { EmptyState } from "./empty-state";

interface chatAreaProps {
  isTyping: boolean;
  currentChatId: string | null;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
}

export const ChatArea = ({
  currentChatId,
  isTyping,
  messagesEndRef,
  setInputValue,
  messages,
}: chatAreaProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {!currentChatId && messages.length === 0 ? (
        // Empty State
        <EmptyState setInputValue={setInputValue} />
      ) : (
        // Messages
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start space-x-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "bot"
                      ? "bg-linear-to-br from-blue-500 to-purple-600"
                      : "bg-gray-600"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <Sparkles className="h-5 w-5 text-white" />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === "bot"
                      ? "bg-white border text-black border-gray-200"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="bg-white border text-black border-gray-200 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};
