import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.body.classList.add('dark-mode')
    }
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <nav className='navbar'>
      <div className='navbar-social'>
        <a 
          href="https://github.com/bk-kiran" 
          target='_blank' 
          rel="noopener noreferrer"
          className='navbar-social-link'
        >
          <FontAwesomeIcon icon={faGithub} className="navbar-social-icon" />
        </a>
        <a 
          href="https://www.linkedin.com/in/bk-kiran/" 
          target='_blank' 
          rel="noopener noreferrer"
          className='navbar-social-link'
        >
          <FontAwesomeIcon icon={faLinkedin} className="navbar-social-icon" />
        </a>
      </div>

      <ul>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to="/about">About</Link>
        </li>
        <li className={location.pathname === '/apps' ? 'active' : ''}>
          <Link to="/apps">Apps</Link>
        </li>
        <li className={location.pathname === '/experience' ? 'active' : ''}>
          <Link to="/experience">Experience</Link>
        </li>
        <li className={location.pathname === '/projects' ? 'active' : ''}>
          <Link to="/projects">Projects</Link>
        </li>
      </ul>

      <div className='theme-toggle' onClick={toggleTheme}>
        <span className={`theme-icon ${!darkMode ? 'active' : ''}`}>☀️</span>
        <span className={`theme-icon ${darkMode ? 'active' : ''}`}>🌙</span>
      </div>
    </nav>
  )
}

export default Navbar