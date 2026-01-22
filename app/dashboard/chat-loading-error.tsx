"use client";
import { MessageSquareOff, RefreshCw, AlertCircle } from "lucide-react";

export default function ChatsNotLoaded() {
  const handleRetry = () => {
    console.log("Retrying to load chats...");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <MessageSquareOff className="h-10 w-10 text-red-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Unable to Load Chats
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            We're having trouble loading your conversations. This might be due
            to a network issue or server problem.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-red-900 mb-1">
                  Error Details
                </p>
                <p className="text-sm text-red-700">
                  Failed to fetch chat history. Please check your connection and
                  try again.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium flex items-center justify-center space-x-2"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Retry Loading</span>
            </button>

            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all border border-gray-300 font-medium"
            >
              Refresh Page
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Still having issues?{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
