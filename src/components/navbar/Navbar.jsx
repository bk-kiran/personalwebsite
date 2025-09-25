import React from 'react'
import './Navbar.css'
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';

const Navbar = () => {

  return (
    <nav className='navbar'>
      <p className = 'logo'><span className='name'>@kiranbk</span></p>
      <ul>
        <li className='projects'><Link to="portfoliopage" spy={true} smooth={true} offset={-50} duration={500}>Projects</Link></li>
        <li className='experiences'><Link to="experiencepage" spy={true} smooth={true} offset={-50} duration={500}>Experience</Link></li>
        <li className='metrics'><Link to="metricspage" spy={true} smooth={true} offset={-50} duration={500}>Metrics</Link></li>
        <li className='about'><Link to="aboutpage" spy={true} smooth={true} offset={-150} duration={500}>About</Link></li>
      </ul>

    </nav>
  )
}

export default Navbar
