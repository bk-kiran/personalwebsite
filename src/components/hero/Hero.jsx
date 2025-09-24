import React from 'react'
import './Hero.css'
import profile from '../../assets/profile.png'
import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github.png'
import gmail from '../../assets/gmail.png'
import html from '../../assets/html.png'
import css3 from '../../assets/css.png'
import js from '../../assets/js.png'
import reactlogo from '../../assets/react.png'
import python from '../../assets/python.png'
import profilepic from '../../assets/yo.png'
import java from '../../assets/java.webp'
import sql from '../../assets/sql.png'
import updatedprofilepic from '../../assets/updatedprofilepic.png'
import tailwind from '../../assets/tailwind.png'
import spring from '../../assets/sprin.png'
import c from '../../assets/C_Logo.png'
import nodejs from '../../assets/nodejs.webp'
import express from '../../assets/express.svg'
import psql from '../../assets/psql.png'
import mongodb from '../../assets/mongodb.png'
import aws from '../../assets/aws.png'
import azure from '../../assets/azure.png'


const Hero = () => {
  return (
    <section className='hero'>
        <div className='content'>
            <h1 className="title">Hi, I'm <span className='titlename'>Kiran</span> 👋</h1>
            <p className="caption"><strong>Hi I'm Kiran BK!</strong> A Computer Science Junior studying at the University of Massachusetts Amherst📍</p>
            
            <div className='socialmediaicons'>
                <a href="https://www.linkedin.com/in/bk-kiran/" target='__blank' rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn" className='socialmedia'/></a>
                <a href="https://github.com/bk-kiran" target='__blank' rel="noopener noreferrer"><img src={github} alt="GitHub" className='socialmedia'/></a>
                <a href="mailto:kbalasundara@umass.edu" target='__blank' rel="noopener noreferrer"><img src={gmail} alt="Gmail" className='socialmedia'/></a>
            </div>

            <div className='techstackitems'>
                <p><strong>Tech Stack |</strong></p>
                <img src={python} className='techstack'/>
                <img src={java} className='techstack'/>
                <img src={js} className='techstack'/>
                <img src={c} className='techstack'/>
                <img src={reactlogo} className='techstack'/>
                <img src={html} className='techstack'/>
                <img src={tailwind} className='techstack'/>
                <img src={spring} className='techstack'/>
                <img src={nodejs} className='techstack'/>
                <img src={express} className='techstack'/>
                <img src={psql} className='techstack'/>
                <img src={mongodb} className='techstack'/>
                <img src={aws} className='techstack'/>
                <img src={azure} className='techstack'/>

            </div>

        </div>
        <img src={updatedprofilepic} alt="ProfilePic" className='heroimage'/>
        

    



    </section>
  )
}

export default Hero
