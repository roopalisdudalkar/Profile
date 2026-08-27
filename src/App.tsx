import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import './index.css'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
        </nav>
        <h1>Profile</h1>
        <p>Welcome to your Vite + React + TypeScript profile app.</p>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="footer">Built with Vite • Deploy on Vercel</footer>
    </div>
  )
}
