import React from 'react'
import './Footer.css'
import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github.png'
import gmail from '../../assets/gmail.png'
import { Link } from 'react-scroll'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <section className='footerpage' id="footerpage">
      <div className='footerpageheadings'>
        <p className='footerpagetitle'>LET'S CONNECT</p>
        <br></br>
        <h2>Ready to build something amazing together?</h2>
      </div>

      <div className='footer-content'>
        <div className='footer-section footer-left'>
          <h3 className='footer-name'>Kiran BK</h3>
          <p className='footer-tagline'>Software Engineer & AI/ML Enthusiast</p>
          <div className='footer-social'>
            <a href="https://www.linkedin.com/in/bk-kiran/" target='_blank' rel="noopener noreferrer">
              <img src={linkedin} alt="LinkedIn" className='footer-social-icon'/>
            </a>
            <a href="https://github.com/bk-kiran" target='_blank' rel="noopener noreferrer">
              <img src={github} alt="GitHub" className='footer-social-icon'/>
            </a>
            <a href="mailto:kbalasundara@umass.edu" target='_blank' rel="noopener noreferrer">
              <img src={gmail} alt="Gmail" className='footer-social-icon'/>
            </a>
          </div>
        </div>

        <div className='footer-section footer-center'>
          <h4>Quick Links</h4>
          <ul className='footer-links'>
            <li><Link to="aboutpage" spy={true} smooth={true} offset={-150} duration={500}>About</Link></li>
            <li><Link to="metricspage" spy={true} smooth={true} offset={-50} duration={500}>Metrics</Link></li>
            <li><Link to="experiencepage" spy={true} smooth={true} offset={-50} duration={500}>Experience</Link></li>
            <li><Link to="portfoliopage" spy={true} smooth={true} offset={-50} duration={500}>Projects</Link></li>
          </ul>
        </div>

        <div className='footer-section footer-right'>
          <h4>Get In Touch</h4>
          <p className='footer-contact'>kbalasundara@umass.edu</p>
          <p className='footer-location'>Amherst, Massachusetts</p>
          <p className='footer-availability'>Currently seeking Summer 2026 SWE internships</p>
          <button onClick={scrollToTop} className='back-to-top'>Back to Top ↑</button>
        </div>
      </div>
      
      <div className='footer-bottom'>
        <div className='footer-copyright'>
          <p>&copy; {currentYear} Kiran BK. All rights reserved.</p>
        </div>
        <div className='footer-built-with'>
          <p>Built with React</p>
        </div>
      </div>
    </section>
  )
}

export default Footer