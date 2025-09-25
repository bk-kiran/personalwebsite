import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import About from './components/about/About'
import Portfolio from './components/portfolio/Portfolio'
import Experience from './components/experience/Experience'
import Metrics from './components/Metrics/Metrics'
import Footer from './components/footer/Footer'

const App = () => {

  return (
    <div className='container'>
      <Navbar/>
      <Hero/>
      <About/>
      <Metrics/>
      <Experience/>
      <Portfolio/>
      <Footer/>
    </div>
  )
}

export default App
