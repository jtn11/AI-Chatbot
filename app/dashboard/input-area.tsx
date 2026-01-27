import { FileText, LoaderCircle, Paperclip, Send, X } from "lucide-react";
import React, { useState } from "react";
import { uploadPdf } from "./upload-doc-function";

interface InputAreaProps {
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => Promise<void>;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  setIsRagActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPdfUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  pdfUploaded: boolean;
}

export const InputArea = ({
  inputRef,
  inputValue,
  setInputValue,
  handleSend,
  handleKeyPress,
  setIsRagActive,
  setPdfUploaded,
  pdfUploaded,
}: InputAreaProps) => {
  const [pdfloading, setpdfloading] = useState(false);

  const handleUpload = async () => {
    try {
      await uploadPdf(setpdfloading); // async upload function
      setIsRagActive(true);
      setPdfUploaded(true);
    } catch (err) {
      console.error(err);
    } finally {
      setpdfloading(false);
    }
  };

  const handleDelete = async () => {
    setPdfUploaded(false);
    setIsRagActive(false);

    await fetch("http://localhost:8000/clear", {
      method: "POST",
    });
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between space-x-3 bg-gray-50 rounded-2xl border border-gray-200 p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
          <div className="ml-2 flex items-center">
            {pdfloading ? (
              // 🔵 Upload in progress
              <LoaderCircle className="w-5 h-5 text-purple-600 animate-spin" />
            ) : pdfUploaded ? (
              // 🟢 PDF already uploaded → show doc + delete
              <div className="flex items-center space-x-2 bg-linear-to-br from-blue-400 to-purple-400 text-white text-sm p-1 border border-white rounded-xl">
                <FileText className="w-4 h-4" />
                <p>docs</p>
                <X className="w-4 h-4 cursor-pointer" onClick={handleDelete} />
              </div>
            ) : (
              // ⚪ No PDF yet → show upload icon
              <Paperclip
                className="w-5 h-5 text-purple-600 cursor-pointer"
                onClick={handleUpload}
              />
            )}
          </div>

          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 bg-transparent px-3 py-2 outline-none resize-none max-h-32 text-gray-900 placeholder-gray-400"
            style={{ minHeight: "40px" }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg shrink-0"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};
