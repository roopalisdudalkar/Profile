import React from 'react'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Profile</h1>
        <p>Welcome to your Vite + React + TypeScript profile app.</p>
      </header>

      <main className="main">
        <section className="card">
          <img className="avatar" src="https://avatars.githubusercontent.com/u/36775904?v=4" alt="avatar" />
          <h2>roopalisdudalkar</h2>
          <p className="description">This is a starter profile application scaffolded with Vite + React + TypeScript.</p>
        </section>
      </main>

      <footer className="footer">Built with Vite • Deploy on Vercel</footer>
    </div>
  )
}
