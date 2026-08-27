# Profile (Vite + React + TypeScript)

This repository was scaffolded by an automated assistant into a Vite + React + TypeScript starter. I also added a simple built-in chatbot UI (client-side simulated bot) so you can interact without external APIs.

OpenAI integration (serverless proxy)

I added a Vercel serverless function at `api/chat` that forwards user prompts to OpenAI's Chat Completions API. To enable it in production, add the following environment variable to your Vercel project:

- `OPENAI_API_KEY` — your OpenAI API key (do NOT commit this to the repository)
- Optional: `OPENAI_MODEL` — defaults to `gpt-4o-mini` if not set

How to run locally (dev)

1. git fetch origin
2. git checkout -b scaffold/vite-react-ts origin/scaffold/vite-react-ts
3. npm install
4. npm run dev

Open http://localhost:5173/chat to see the chatbot. If you want to use the OpenAI integration locally, set `OPENAI_API_KEY` in your environment and run a local environment that supports serverless functions (Vercel CLI `vercel dev` works well).

Security & notes

- Never commit your OpenAI API key. Use Vercel's dashboard to set `OPENAI_API_KEY` for the project.
- The serverless function simply proxies requests to OpenAI and returns the assistant reply. For public deployments consider adding rate-limiting or authentication to prevent abuse.

If you want, I can add optional features: streaming responses, server-side persistence of conversations, or authentication on the API endpoint.
