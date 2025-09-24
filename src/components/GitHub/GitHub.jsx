import React from 'react'
import './GitHub.css'


const GitHub = () => {
  return (
    <section className='aboutpage' id="aboutpage">
        <div className='aboutpagecontent'>
            <img className='aboutpageimage' alt="background" src={umassbg}></img>      
        </div>
        <div className='aboutpagetext'>
            <p className='aboutpagetitle'>GITHUB STATS</p>

            <h2>Software Engineer & AI/ML Enthusiast 🍀</h2>

            <p className="aboutpagecaption">I previously worked as a Software Engineer Intern at Lee Yuen Housewares and a Data Science Intern at TruBridge Healthcare, where I contributed to building forecasting systems, scalable data pipelines, and applied ML to solve real-world problems.</p>

            <p className='aboutpagecaption'>I'm passionate about leveraging technology to create intelligent, scalable systems that integrate AI in predictive analytics, NLP, and automation to optimize efficiency and drive impact.</p>
        </div>

        <img src="https://ghchart.rshah.org/bk-kiran" alt="Kiran's Github chart" />
    </section>
      
  )
}

export default GitHub
