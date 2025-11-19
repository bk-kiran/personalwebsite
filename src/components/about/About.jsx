import './About.css'
import aboutbg from '../../assets/aboutbg.jpg'
import umassbg from '../../assets/umass2.avif'
import React, { useState, useEffect } from 'react';
import './Metrics.css'

const About = () => {
  const [counts, setCounts] = useState({
      projects: 0,
      technologies: 0,
      commits: 0,
      experience: 0
  });

  const finalCounts = {
    projects: 10,
    technologies: 20,
    commits: 4,
    experience: 3
  };

  // Start counting immediately on mount (no scroll detection)
  useEffect(() => {
    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;

    Object.keys(finalCounts).forEach((key) => {
      const target = finalCounts[key];
      const increment = target / steps;
      let currentCount = 0;

      const counter = setInterval(() => {
        currentCount += increment;

        setCounts(prev => ({
          ...prev,
          [key]: Math.min(Math.floor(currentCount), target)
        }));

        if (currentCount >= target) {
          clearInterval(counter);
        }
      }, interval);
    });
  }, []); // Empty dependency array - runs once on mount

  return (
    <section>
      <section className='aboutpage page-enter' id="aboutpage">
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

      <section className="metricspage page-enter" id="metricspage">
        <div className='metricspageheadings'>
          <p className='metricspagetitle'>BY THE NUMBERS</p>
          <br></br>
          <h2>Metrics 🚀</h2>
        </div>
        
        <div className="metrics-grid">
          <div className="metrics-card">
            <div className="metrics-number projects">
              {counts.projects}+
            </div>
            <div className="metrics-label">
              Projects Built
            </div>
            <div className="metrics-description">
              Full-stack apps, AI pipelines, and data tools
            </div>
          </div>
          
          <div className="metrics-card">
            <div className="metrics-number technologies">
              {counts.technologies}+
            </div>
            <div className="metrics-label">
              Technologies
            </div>
            <div className="metrics-description">
              Backend, frontend, cloud, and ML frameworks
            </div>
          </div>
          
          <div className="metrics-card">
            <div className="metrics-number experience">
              {counts.experience}+
            </div>
            <div className="metrics-label">
              Software Internships
            </div>
            <div className="metrics-description">
              Built scalable AI, healthcare, and SaaS systems
            </div>
          </div>

          <div className="metrics-card">
            <div className="metrics-number commits">
              {counts.commits}+
            </div>
            <div className="metrics-label">
              Leadership Roles & Organizations
            </div>
            <div className="metrics-description">
              BUILD UMass, GDSC, TA, Researcher
            </div>
          </div>
        </div>

        <div className='github'>
          <img src="http://ghchart.rshah.org/bk-kiran" alt="bk-kiran's Github chart" />
        </div>

      </section>
    </section>
  )
}

export default About