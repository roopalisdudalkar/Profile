# Profile (Vite + React + TypeScript)

This repository was scaffolded by an automated assistant into a Vite + React + TypeScript starter. I also added a simple built-in chatbot UI (client-side simulated bot) so you can interact without external APIs.

What I changed in branch scaffold/vite-react-ts

- Added a Chat page: /chat with a simple chatbot UI and local persistence (localStorage).
- Updated App routes and navigation to include Chat.

How the chatbot works

- The chatbot is a client-side demo that simulates a response based on keywords and simple fallback replies.
- Messages persist in localStorage under the key `chat:messages` so your conversation remains on refresh.
- To extend it with a real LLM (OpenAI, Azure, etc.), add a server endpoint to proxy requests and call that from src/pages/Chat.tsx.

How to run locally

1. git fetch origin
2. git checkout -b scaffold/vite-react-ts origin/scaffold/vite-react-ts
3. npm install
4. npm run dev

Open http://localhost:5173/chat to see the chatbot.

If you want, I can wire the chat UI to an API (OpenAI or your backend). Tell me which provider and whether you'd like me to implement a secure server-side proxy for API keys.
