import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const EmptyState = ({ setInputValue }: EmptyStateProps) => {
  return (
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
  );
};
