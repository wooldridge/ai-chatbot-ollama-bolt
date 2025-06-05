import React from 'react';
import { AlertCircle } from 'lucide-react';

interface StatusIndicatorProps {
  error: string | null;
  isLoading: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ error, isLoading }) => {
  if (!error && !isLoading) return null;
  
  return (
    <div className={`p-3 rounded-lg ${error ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'} mb-4`}>
      {error ? (
        <div className="flex items-center gap-2">
          <AlertCircle size={18} />
          <span>Error: {error}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="animate-pulse flex space-x-2">
            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
          </div>
          <span>Llama is thinking...</span>
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;