import { Message } from './types';

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit'
  });
}

export async function fetchOllamaResponse(messages: Message[]): Promise<string> {
  try {
    // Format messages for Ollama API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const response = await fetch('http://127.0.0.1:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2',
        messages: formattedMessages,
        stream: false
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    return data.message.content;
  } catch (error) {
    console.error('Error fetching from Ollama:', error);
    throw error;
  }
}