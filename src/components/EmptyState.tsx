import React from 'react';
import { MessageSquare } from 'lucide-react';

const EmptyState: React.FC = () => {
  const exampleQuestions = [
    "What are the main features of Llama 3.2?",
    "Can you explain how large language models work?",
    "Write a short poem about artificial intelligence",
    "What's the difference between AI and machine learning?"
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <MessageSquare size={32} className="text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Start a conversation</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        This chatbot uses Llama 3.2 running locally on your machine via Ollama.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-xl">
        {exampleQuestions.map((question, index) => (
          <button
            key={index}
            className="text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => {
              const event = new CustomEvent('example-question', { 
                detail: { question } 
              });
              document.dispatchEvent(event);
            }}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;