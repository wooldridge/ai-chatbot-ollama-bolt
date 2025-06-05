import React from 'react';
import { Bot, Trash2 } from 'lucide-react';

interface ChatHeaderProps {
  onClearChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <div className="bg-blue-500 p-2 rounded-full">
          <Bot size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Llama 3.2 Assistant</h1>
          <p className="text-sm text-gray-500">Powered by Ollama</p>
        </div>
      </div>
      <button
        onClick={onClearChat}
        className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
        title="Clear chat"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default ChatHeader;