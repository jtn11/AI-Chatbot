import { Menu, Sparkles } from "lucide-react";

interface TopBarProps {
  setSidebarOpen: () => void;
}

export const TopBar = ({ setSidebarOpen }: TopBarProps) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={setSidebarOpen}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <h1 className="text-lg font-semibold text-gray-900">AI Assistant</h1>
        </div>
      </div>
    </div>
  );
};
