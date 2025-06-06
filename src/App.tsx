import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ChatHeader from './components/ChatHeader';
import StatusIndicator from './components/StatusIndicator';
import EmptyState from './components/EmptyState';
import { Message, ChatState } from './types';
import { generateId, fetchOllamaResponse } from './utils';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  useEffect(() => {
    // Listen for example question clicks
    const handleExampleQuestion = (e: Event) => {
      const { question } = (e as CustomEvent).detail;
      handleSendMessage(question);
    };

    document.addEventListener('example-question', handleExampleQuestion);
    
    return () => {
      document.removeEventListener('example-question', handleExampleQuestion);
    };
  }, []);

  const handleSendMessage = async (content: string) => {
    if (chatState.isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      // Get all messages for context
      const allMessages = [...chatState.messages, userMessage];
      
      // Get response from Ollama
      const responseContent = await fetchOllamaResponse(allMessages);
      
      // Add assistant message
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: responseContent,
        timestamp: Date.now()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to connect to Ollama. Make sure Ollama is running and the llama3.2 model is installed.'
      }));
    }
  };

  const clearChat = () => {
    setChatState({
      messages: [],
      isLoading: false,
      error: null
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatHeader onClearChat={clearChat} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatState.messages.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {chatState.messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {chatState.isLoading && (
              <StatusIndicator isLoading={chatState.isLoading} error={null} />
            )}
            {chatState.error && (
              <StatusIndicator isLoading={false} error={chatState.error} />
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={chatState.isLoading} 
      />
    </div>
  );
}

export default App;