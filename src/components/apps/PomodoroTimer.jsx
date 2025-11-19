import React from 'react'
import PomodoroApp from './pomodoro-timer/App.jsx'
import './pomodoro-timer/index.css'
import './PomodoroTimer.css'

const PomodoroTimer = () => {
  return (
    <section className='pomodoro-page page-enter'>
      <div className='pomodoro-page-header'>
        <p className='pomodoro-page-title'>PRODUCTIVITY TOOL</p>
        <h2>Pomodoro Timer ⏰</h2>
        <p className='pomodoro-page-subtitle'>
          Stay focused and boost productivity with the Pomodoro Technique. Set custom work/break intervals and track your progress throughout the day.
        </p>
      </div>
      <div className='pomodoro-game-wrapper'>
        <PomodoroApp />
      </div>
    </section>
  )
}

export default PomodoroTimer