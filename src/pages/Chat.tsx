import React, { useEffect, useRef, useState } from 'react'
import './chat.css'

type Message = {
  id: string
  sender: 'user' | 'bot'
  text: string
  time: string
}

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function generateBotReply(userText: string) {
  const text = userText.toLowerCase()
  if (/hi|hello|hey/.test(text)) return `Hello! How can I help you today?`
  if (/help|how|what/.test(text)) return `You can ask me about this profile app: try \"show profile\", \"edit bio\", or simple greetings.`
  if (/profile|bio|edit/.test(text)) return `This app stores a simple profile in React Context. Use the Home page to view and edit your bio.`
  const fallbacks = [
    `Interesting — tell me more!`,
    `I don't have an answer for that, but I can echo: "${userText}"`,
    `Nice question — I'm a demo chatbot, so I might not know everything.`
  ]
  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem('chat:messages')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    localStorage.setItem('chat:messages', JSON.stringify(messages))
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function postUserMessage(text: string) {
    if (!text.trim()) return
    const msg: Message = { id: Date.now().toString() + Math.random().toString(36).slice(2), sender: 'user', text, time: formatTime() }
    setMessages((m) => [...m, msg])
    setInput('')
    setSending(true)

    // Try server-side OpenAI proxy first
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      })
      const data = await r.json()
      if (r.ok && data.reply) {
        const botMsg: Message = { id: Date.now().toString() + Math.random().toString(36).slice(2), sender: 'bot', text: data.reply, time: formatTime() }
        setMessages((m) => [...m, botMsg])
      } else {
        // fallback to local generator
        const botText = generateBotReply(text)
        const botMsg: Message = { id: Date.now().toString() + Math.random().toString(36).slice(2), sender: 'bot', text: botText, time: formatTime() }
        setMessages((m) => [...m, botMsg])
      }
    } catch (err) {
      console.error('Chat API error', err)
      const botText = generateBotReply(text)
      const botMsg: Message = { id: Date.now().toString() + Math.random().toString(36).slice(2), sender: 'bot', text: botText, time: formatTime() }
      setMessages((m) => [...m, botMsg])
    } finally {
      setSending(false)
    }
  }

  function onSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    postUserMessage(input)
  }

  function clearChat() {
    setMessages([])
    localStorage.removeItem('chat:messages')
  }

  return (
    <div className="chat-container card">
      <div className="chat-header">
        <h3>Chatbot</h3>
        <div>
          <button className="btn btn-ghost" onClick={clearChat}>Clear</button>
        </div>
      </div>

      <div className="chat-window" role="log" aria-live="polite">
        {messages.length === 0 && (
          <div className="chat-empty">Say hi — try: "hello" or "help"</div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`chat-msg ${m.sender === 'user' ? 'user' : 'bot'}`}>
            <div className="chat-bubble">
              <div className="chat-text">{m.text}</div>
              <div className="chat-time">{m.time}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form className="chat-form" onSubmit={onSubmit}>
        <textarea
          placeholder={sending ? 'Waiting for bot...' : 'Type a message...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          disabled={sending}
        />
        <div className="chat-actions">
          <button type="submit" className="btn" disabled={sending || !input.trim()}>
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
