import React from 'react'
import { useParams, Link } from 'react-router-dom'
import './AppWrapper.css'
import WordleClone from './WordleClone'

const AppWrapper = () => {
  const { slug } = useParams()

  const appData = {
    'wordle': {
      name: 'Wordle Clone',
      description: 'Custom Wordle game with difficulty levels, statistics tracking, and daily challenges',
      icon: '🎮',
      category: 'Games',
      component: WordleClone,
      githubUrl: '#',
      features: [
        'Multiple difficulty levels',
        'Daily challenges',
        'Statistics tracking',
        'Share results'
      ]
    }
    // Add more apps here as you build them
  }

  const app = appData[slug]

  if (!app) {
    return (
      <div className='app-wrapper page-enter'>
        <div className='app-not-found'>
          <h2>App Not Found 😕</h2>
          <p>The app you're looking for doesn't exist or hasn't been built yet.</p>
          <Link to='/apps' className='back-btn'>← Back to Apps</Link>
        </div>
      </div>
    )
  }

  const AppComponent = app.component

  return (
    <section className='app-wrapper page-enter'>
      <div className='app-header'>
        <Link to='/apps' className='back-link'>← Back to Apps</Link>
        
        <div className='app-title-section'>
          <div className='app-icon-large'>{app.icon}</div>
          <div>
            <h1 className='app-title'>{app.name}</h1>
            <p className='app-subtitle'>{app.description}</p>
            <div className='app-meta'>
              <span className='app-category-badge'>{app.category}</span>
              {app.githubUrl && app.githubUrl !== '#' && (
                <a href={app.githubUrl} target='_blank' rel='noopener noreferrer' className='github-link'>
                  View on GitHub →
                </a>
              )}
            </div>
          </div>
        </div>

        {app.features && (
          <div className='app-features'>
            <h3>Features:</h3>
            <ul>
              {app.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className='app-container'>
        {AppComponent ? (
          <AppComponent />
        ) : (
          <div className='app-coming-soon'>
            <h2>Coming Soon! 🚧</h2>
            <p>This app is currently under development.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default AppWrapper