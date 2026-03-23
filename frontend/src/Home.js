import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const nav = useNavigate()

  return (
        <div className="page">
      <header className="header">
        <h1 className="logo">E-Vote</h1>
        <div className="header-buttons">
          <button className="btn primary" onClick={()=>nav('/viewresult')}>View Results</button>
          <button className="btn outline" onClick={()=>nav('/login')}>Login</button>
        </div>
      </header>

      <main className="hero">
        <div className="hero-text fade-slide">
          <h2>
            Secure & Transparent
            <span>Online Voting System</span>
          </h2>
          <p>
            Cast your vote anytime, anywhere with high security, real-time
            results and a simple user-friendly interface.
          </p>
          <div className="hero-buttons">
            <button className="btn primary large">Get Started</button>
            <button className="btn outline large">Learn More</button>
          </div>
        </div>

        <div className="hero-animation scale-in">
          <div className="circle-outer">
            <div className="circle-inner float">
              Vote Now
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">© 2026 Online Voting System</footer>
    </div>

  )
}

export default Home