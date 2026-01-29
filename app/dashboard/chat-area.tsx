import { Sparkles, User } from "lucide-react";
import ChatsNotLoaded from "./chat-loading-error";
import { Chat } from "../types/chat-type";

interface chatAreaProps {
  currentChat: Chat | undefined;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatArea = ({
  currentChat,
  isTyping,
  messagesEndRef,
  setInputValue,
}: chatAreaProps) => {
  if (!currentChat) {
    return <ChatsNotLoaded />;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {currentChat?.messages.length === 0 ? (
        // Empty State
        <div className="h-full flex items-center justify-center p-8">
          <div className="text-center max-w-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How can I help you today?
            </h2>
            <p className="text-gray-600 mb-8">
              Ask me anything or start a conversation
            </p>

            {/* Suggestion Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                {
                  title: "Explain concepts",
                  text: "Help me understand complex topics",
                },
                {
                  title: "Write content",
                  text: "Draft emails, articles, or messages",
                },
                {
                  title: "Solve problems",
                  text: "Get help with tasks and challenges",
                },
                {
                  title: "Learn something",
                  text: "Discover new information",
                },
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputValue(suggestion.text)}
                  className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all text-left"
                >
                  <p className="font-medium text-gray-900 mb-1">
                    {suggestion.title}
                  </p>
                  <p className="text-sm text-gray-600">{suggestion.text}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Messages
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          {currentChat?.messages.map((message) => (
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
