import React from 'react'
import './About.css'
import aboutbg from '../../assets/aboutbg.jpg'
import umassbg from '../../assets/umass2.avif'

const About = () => {
  return (
    <section className='aboutpage' id="aboutpage">
        <div className='aboutpagecontent'>
            <img className='aboutpageimage' alt="background" src={umassbg}></img>      
        </div>
        <div className='aboutpagetext'>
            <p className='aboutpagetitle'>ABOUT ME</p>

            <h2>Software Engineer & AI/ML Enthusiast 🍀</h2>

            <p className="aboutpagecaption">I previously worked as a Software Engineer Intern at Lee Yuen Housewares and a Data Science Intern at TruBridge Healthcare, where I contributed to building forecasting systems, scalable data pipelines, and applied ML to solve real-world problems.</p>

            <p className='aboutpagecaption'>I'm passionate about leveraging technology to create intelligent, scalable systems that integrate AI in predictive analytics, NLP, and automation to optimize efficiency and drive impact.</p>
        </div>
    </section>
      
  )
}

export default About
