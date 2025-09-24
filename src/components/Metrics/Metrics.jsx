import React, { useState, useEffect, useRef } from 'react';
import './Metrics.css'

const MetricsSection = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    technologies: 0,
    commits: 0,
    experience: 0
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const finalCounts = {
    projects: 10,
    technologies: 20,
    commits: 4,
    experience: 3
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const interval = 50;
      const steps = duration / interval;

      Object.keys(finalCounts).forEach((key) => {
        const increment = finalCounts[key] / steps;
        let currentCount = 0;
        
        const counter = setInterval(() => {
          currentCount += increment;
          setCounts(prev => ({
            ...prev,
            [key]: Math.min(Math.floor(currentCount), finalCounts[key])
          }));
          
          if (currentCount >= finalCounts[key]) {
            clearInterval(counter);
          }
        }, interval);
      });
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="metricspage" id="metricspage">
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
      
      <div className="metrics-status">
        <div className="status-indicator">
          <div className="status-dot"></div>
          <span className="status-text">
            <strong>Currently seeking Winter 2025 + Summer 2026 SWE/AI internships</strong>
          </span>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;