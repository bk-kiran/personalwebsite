import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons'
import './Portfolio.css'
import waproject from '../../assets/whatsapp.webp'
import djproject from '../../assets/stocks.jpeg'
import financehive from '../../assets/finance.jpeg'
import foodproject from '../../assets/cuisineresultspage.png'
import amazonproject from '../../assets/amazon.jpg'
import vgamefinder from '../../assets/vgamefinder.jpeg'
import resumeister from '../../assets/ResuMeister.png'
import fantasypl from '../../assets/FantasyPL.png'
import summafy from '../../assets/Summafy.png'
import studylensai from "../../assets/studylearnai.png"

const Portfolio = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Projects')
  const [animationKey, setAnimationKey] = useState(0)

  const projects = [
    {
      id: 11,
      title: 'StudyLensAI 🎓🤖',
      description: 'StudyLensAI is an AI-powered course management and smart study assistant platform. Built with Next.js and Convex, it enables students and educators to upload course files (PDFs), extract semantic content, and ask open-ended questions to an intelligent AI that understands class material via vector embeddings and RAG. Features include real-time chat, robust authentication, file management, and lightning-fast semantic search across all uploaded content.',
      image: studylensai,
      tags: ['#nextjs', '#convex', '#rag'],
      githubUrl: 'https://github.com/bk-kiran/StudyLensAI',
      demoUrl: '#',
      category: 'Web Development',
      featured: true
    },
    {
      id: 1,
      title: 'Fantasy EPL Player Finder ⚽🔍',
      description: 'Search, compare, and analyze 500+ soccer players with ease. Featuring an interactive React.js frontend with real-time filters and a Spring Boot + PostgreSQL backend, it handles 5K+ concurrent users while ensuring sub-500ms response times through optimized queries and RESTful APIs.',
      image: fantasypl,
      tags: ['#springboot', '#reactjs', '#postgresql'],
      githubUrl: 'https://github.com/bk-kiran/FantasyPL-DataHub-24-25-',
      demoUrl: '#',
      category: 'Web Development',
      featured: true
    },
    {
      id: 2,
      title: 'Finance Hive 💰',
      description: 'An AI-powered personal finance assistant app for iOS that blends budgeting, stock tracking, simulations, and gamified learning. Built with Swift + SwiftUI in an MVVM architecture, Finance Hive features Finbot (AI assistant), a personalized dashboard, and community-driven challenges to make finance approachable and fun.',
      image: financehive,
      tags: ['#swift', '#mvvm', '#ai'],
      githubUrl: 'https://github.com/Saipulavarthy/FinanceHive',
      demoUrl: '#',
      category: 'AI/ML',
      featured: true
    },
    {
      id: 3,
      title: 'AI Resume Analyzer 📑🤖',
      description: 'Ace the resume screen with this AI-powered analyzer! Built with React.js and Claude APIs, it achieves 92% ATS accuracy and reduces feedback latency by 40% through prompt-engineered NLP pipelines. Securely processes 100+ resumes in parallel with Puter.js serverless auth and encrypted storage, delivering faster and more consistent feedback.',
      image: resumeister,
      tags: ['#react', '#nlp', '#puterjs'],
      githubUrl: 'https://github.com/bk-kiran/ai_resume_analyzer',
      demoUrl: '#',
      category: 'AI/ML',
      featured: false
    },
    {
      id: 4,
      title: 'Summafy 📰',
      description: 'Stay informed in seconds. Summafy is a clean Chrome extension that extracts the main content from any article and generates concise AI-powered summaries using Google Gemini. Designed with a focus on clarity and usability, it transforms long reads into quick takeaways.',
      image: summafy,
      tags: ['#javascript', '#geminiai', '#chromewebextension'],
      githubUrl: 'https://github.com/bk-kiran/Summafy',
      demoUrl: '#',
      category: 'AI/ML',
      featured: false
    },
    {
      id: 5,
      title: 'VGameFinder 2.0 🕹️',
      description: 'Looking for your next video game adventure? Use VGameFinder 2.0 to discover over 3,000 game entries and recieve personalized recommendations based on your previous plays! The front-end application was architected using ReactJS, Tailwind CSS and the RAWG API. Whereas, the game recommendation system integrated pandas dataframes and scikit-learn\'s cosine similarity algorithm.',
      image: vgamefinder,
      tags: ['#react', '#machine learning', '#pandas'],
      githubUrl: 'https://github.com/bk-kiran/VGameFinderFiles',
      demoUrl: 'https://vgamefinder.kiranbk.com/',
      category: 'AI/ML',
      featured: false
    },
    {
      id: 6,
      title: 'Amazon Product Tracker 📦',
      description: 'Never miss a deal with the Amazon Price Tracker! This webscraping tool allows users to securely monitor Amazon product prices in real-time and make smarter purchasing decisions. This project utilized Python, Flask, SQL and BeautifulSoup4 to create the web application, implement a robust authentication system, manage database operations and extract real-time product data from Amazon.com.',
      image: amazonproject,
      tags: ['#flask', '#web scraping', '#python'],
      githubUrl: 'https://github.com/bk-kiran/AmazonProductScraper',
      demoUrl: '#',
      category: 'Web Development',
      featured: false
    },
    {
      id: 7,
      title: 'WhatsApp Chat Analyser 💬',
      description: 'Who are the nicest people in your WhatsApp Chat? Who are the most active? How often do you guys text? Find out through this WhatsApp Chat Analyser. This app utilized pandas dataframes, NLP sentiment analysis through NLTKVader and data visualization through libraries such as matplotlib and seaborn.',
      image: waproject,
      tags: ['#python', '#data visualization', '#NLP sentiment analysis'],
      githubUrl: 'https://github.com/bk-kiran/whatsappchatanalyser',
      demoUrl: 'https://whatsappchatanalyser-cnsjbvlaepxyamcaabw24q.streamlit.app/',
      category: 'Data Science',
      featured: false
    },
    {
      id: 8,
      title: 'Recipe Finder 🍳',
      description: 'Need to chef something up in just 15 minutes? Are you looking to explore fascinating cuisines? Or do you just want to expand your culinary palette? Through this recipe finder, search for 500+ recipes based on cuisine, ingredients or dietary requirements! This app was built using reactjs and utilized the spoonacular API to obtain recipe information.',
      image: foodproject,
      tags: ['#HTML', '#CSS', '#reactjs', '#spoonacular API'],
      githubUrl: 'https://github.com/bk-kiran/recipefinder',
      demoUrl: 'https://drive.google.com/file/d/1UNgvQHlVNIBIbcb2FwobRH0bASfIZlQ7/view?usp=sharing',
      category: 'Web Development',
      featured: false
    },
    {
      id: 9,
      title: 'Predicting Stock Prices 📈',
      description: 'Predict future stock prices of the FAAMG companies! This app was developed using streamlit, a Random Forest Regression machine learning model and utilized web scraping to obtain stock data.',
      image: djproject,
      tags: ['#python', '#machine learning', '#web scraping'],
      githubUrl: 'https://github.com/bk-kiran/stockpricepredictor',
      demoUrl: 'https://stockpricepredictor-wdukdnfvqm84pzvcmavbqe.streamlit.app/',
      category: 'AI/ML',
      featured: false
    }
  ]

  const categories = ['All Projects', 'Featured', ...new Set(projects.map(project => project.category))]

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All Projects' || 
                           (selectedCategory === 'Featured' && project.featured) ||
                           project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Trigger animation when filters change
  useEffect(() => {
    setAnimationKey(prev => prev + 1)
  }, [searchTerm, selectedCategory])

  const handleGithubClick = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank')
    }
  }

  const handleDemoClick = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank')
    } else {
      alert('Demo coming soon! 🚧')
    }
  }

  return (
    <section className='portfoliopage page-enter' id="portfoliopage">
        <div className='portfoliopageheadings'>
            <p className='porfoliopagetitle'>PROJECTS</p>
            <h2>Here is what I have been working on 💡 </h2>
        </div>

        <div className='portfolio-controls'>
          <div className='search-bar'>
            <FontAwesomeIcon icon={faSearchengin} className="search-icon" />
            <input
              type='text'
              placeholder='Search projects...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='search-input'
            />
          </div>

          <div className='category-filters'>
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.map((project, index) => {
          return (
            <div 
              key={`${project.id}-${animationKey}`} 
              className='project1 project-fade-in'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className='project-content-wrapper'>
                <img className='project1screenshot' src={project.image} alt={project.title} />
                <div className='project-details'>
                  <h1 className='project1title'>{project.title}</h1>
                  <p className='project1caption'>{project.description}</p>
                  <p className='project1-tags'>
                    {project.tags.map((tag, index) => {
                      const tagClass = `projecttag${(index % 7) + 1}`
                      return (
                        <span key={index} className={tagClass}>
                          {tag}
                          {index < project.tags.length - 1 && <>&nbsp;&nbsp;&nbsp;</>}
                        </span>
                      )
                    })}
                  </p>
                  <div className='project-links project1-links'>
                    <div className='github-link-wrapper' onClick={() => handleGithubClick(project.githubUrl)}>
                      <FontAwesomeIcon icon={faGithub} className="project-github-icon" />
                    </div>
                    <button 
                      className='demo-btn'
                      onClick={() => handleDemoClick(project.demoUrl)}
                    >
                      Live Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {filteredProjects.length === 0 && (
          <div className='no-results'>
            <p>No projects found matching your search.</p>
          </div>
        )}

    </section>
  )
}

export default Portfolio
