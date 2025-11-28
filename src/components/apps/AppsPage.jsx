import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons' 
import { faSearchengin } from '@fortawesome/free-brands-svg-icons' 
import './AppsPage.css'

const AppsPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Apps')
  const [animationKey, setAnimationKey] = useState(0)

  const apps = [
    {
      id: 1,
      name: 'Wordle Clone',
      slug: 'wordle',
      description: "Play today's Wordle and test your word skills!",
      icon: '🎮',
      category: 'Games',
      featured: true,
      githubUrl: 'https://github.com/bk-kiran/wordleclone',
      hasApp: true,
    },
    {
      id: 2,
      name: 'Pomodoro Timer',
      slug: 'pomodoro',
      description: 'Stay focused with this productivity timer. Customize work/break intervals and track your progress!',
      icon: '⏰',
      category: 'Productivity',
      featured: false,
      githubUrl: '#',
      hasApp: true,
    },
    {
      id: 3,
      name: 'JSON Formatter',
      slug: 'json-formatter',
      description: 'Format, validate, and manipulate JSON data with ease. Perfect for developers!',
      icon: '🛠️',
      category: 'Developer Tools',
      featured: true,
      githubUrl: '#',
      hasApp: true,
    },
  ]

  const categories = ['All Apps', 'Featured', ...new Set(apps.map(app => app.category))]

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All Apps' || 
                           (selectedCategory === 'Featured' && app.featured) ||
                           app.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Trigger animation when filters change
  useEffect(() => {
    setAnimationKey(prev => prev + 1)
  }, [searchTerm, selectedCategory])

  const handleTryNow = (app) => {
    if (app.hasApp) {
      navigate(`/app/${app.slug}`)
    } else {
      alert('This app is coming soon! 🚧')
    }
  }

  const handleGithubClick = (app) => {
    if (app.githubUrl && app.githubUrl !== '#') {
      window.open(app.githubUrl, '_blank')
    } else {
      alert('GitHub repo coming soon!')
    }
  }

  return (
    <section className='appspage page-enter'>
      <div className='appspage-header'>
        <div className='appspage-headings'>
          <p className='appspage-title'>MINI APPLICATIONS</p>
          <h2>Explore My Apps 🚀</h2>
          <p className='appspage-subtitle'>
            A collection of interactive applications demonstrating various technologies, skills, and creative solutions. Each app is built with modern tools and focuses on user experience and functionality.
          </p>
        </div>

        <div className='appspage-controls'>
          <div className='search-bar'>
            <FontAwesomeIcon icon={faSearchengin} className="search-icon" />
            <input
              type='text'
              placeholder='Search applications...'
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
      </div>

      <div className='apps-grid'>
        {filteredApps.map((app, index) => (
          <div 
            key={`${app.id}-${animationKey}`} 
            className='app-card app-fade-in'
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {app.featured && <span className='featured-badge'>⭐</span>}
            <div className='app-icon'>{app.icon}</div>
            <h3 className='app-name'>{app.name}</h3>
            <p className='app-description'>{app.description}</p>
            <div className='app-footer'>
              <FontAwesomeIcon
                icon={faGithub}
                className="github-icon"
                onClick={() => handleGithubClick(app)}
              />
              <button className='try-now-btn' onClick={() => handleTryNow(app)}>
                {app.hasApp ? 'Try Now' : 'Coming Soon'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className='no-results'>
          <p>No apps found matching your search.</p>
        </div>
      )}
    </section>
  )
}

export default AppsPage
