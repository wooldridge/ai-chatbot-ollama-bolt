# Ollama Chatbot with Llama 3.2

A React-based chatbot that connects to Ollama running locally to provide a chat interface for the Llama 3.2 model.

## Prerequisites

1. [Ollama](https://ollama.ai/) installed on your machine
2. Llama 3.2 model pulled in Ollama
3. Node.js and npm

## Setup Instructions

1. Install Ollama from [ollama.ai](https://ollama.ai/)
2. Pull the Llama 3.2 model:
   ```
   ollama pull llama3.2
   ```
3. Start Ollama:
   ```
   ollama serve
   ```
4. Install and run this application:
   ```
   npm install
   npm run dev
   ```

## Features

- Clean, modern UI for chatting with Llama 3.2
- Message history with timestamps
- Loading indicators
- Error handling for Ollama connection issues
- Example questions to get started
- Ability to clear chat history

## Technical Details

- Built with React and TypeScript
- Styled with Tailwind CSS
- Uses the Ollama API to communicate with the LLM
- Fully responsive design
