import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import About from './components/about/About'
import Portfolio from './components/portfolio/Portfolio'
import Experience from './components/experience/Experience'
import AppsPage from './components/apps/AppsPage'
import AppWrapper from './components/apps/AppWrapper'

const App = () => {
  return (
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Portfolio />} />
        <Route path="/apps" element={<AppsPage />} />
        <Route path="/app/:slug" element={<AppWrapper />} />
      </Routes>
    </div>
  )
}

export default App