import React from 'react'
import { useParams, Link } from 'react-router-dom'
import './AppWrapper.css'
import WordleClone from './WordleClone'
import PomodoroTimer from './PomodoroTimer'
import JSONFormatter from './JSONFormatter'
import GradeCalculator from './GradeCalculator'
import GPACalculator from './GPACalculator'

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
    },
    'pomodoro': {
      name: 'Pomodoro Timer',
      description: 'Boost your productivity with the Pomodoro Technique. Set work and break intervals, track sessions, and stay focused.',
      icon: '⏰',
      category: 'Productivity',
      component: PomodoroTimer,
      githubUrl: '#',
      features: [
        'Customizable work/break durations',
        'Audio notifications',
        'Session tracking',
        'Auto-start options',
        'Daily statistics'
      ]
    },
    'json-formatter': {
      name: 'JSON Formatter',
      description: 'Format, validate, minify, and manipulate JSON data with this comprehensive developer tool.',
      icon: '🛠️',
      category: 'Developer Tools',
      component: JSONFormatter,
      githubUrl: '#',
      features: [
        'Format & pretty-print JSON',
        'Minify JSON',
        'Validate syntax',
        'Sort object keys',
        'Escape/Unescape strings',
        'Copy & download output'
      ]
    },
    'grade-calculator': {
      name: 'Grade Calculator',
      description: 'Calculate your overall course percentage based on component grades and weightages.',
      icon: '📊',
      category: 'Academic Tools',
      component: GradeCalculator,
      githubUrl: '#',
      features: [
        'Add multiple grade components',
        'Set custom weightages',
        'Calculate weighted average',
        'Real-time percentage calculation'
      ]
    },
    'gpa-calculator': {
      name: 'GPA Calculator',
      description: 'Track your GPA across multiple semesters and calculate your cumulative GPA with course grades and credits.',
      icon: '🎓',
      category: 'Academic Tools',
      component: GPACalculator,
      githubUrl: '#',
      features: [
        'Add multiple semesters',
        'Track courses per semester',
        'Calculate semester GPA',
        'Calculate cumulative GPA',
        'Standard 4.0 GPA scale',
        'Credit-weighted calculation'
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