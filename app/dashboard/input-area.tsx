import { Send } from "lucide-react"

interface InputAreaProps {
    inputRef : React.RefObject<HTMLTextAreaElement | null> , 
    inputValue : string , 
    setInputValue: React.Dispatch<React.SetStateAction<string>> ,
    handleSend: () => Promise<void>;
    handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;


}

export const InputArea = ({inputRef , inputValue , setInputValue , handleSend , handleKeyPress} : InputAreaProps)=>{
    
    return(
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end space-x-3 bg-gray-50 rounded-2xl border border-gray-200 p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex-shrink-0"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
    )
}