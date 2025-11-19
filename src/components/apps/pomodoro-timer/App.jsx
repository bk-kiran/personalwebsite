import React, { useState, useEffect, useRef } from 'react'
import './index.css'

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState('work') // 'work', 'shortBreak', 'longBreak'
  const [sessions, setSessions] = useState(0)
  const [settings, setSettings] = useState({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false
  })
  const [showSettings, setShowSettings] = useState(false)
  const audioRef = useRef(null)

  // Load settings and sessions from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoro-settings')
    const savedSessions = localStorage.getItem('pomodoro-sessions')
    
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      setSettings(parsed)
      setMinutes(parsed.workDuration)
    }
    
    if (savedSessions) {
      setSessions(parseInt(savedSessions))
    }
  }, [])

  // Timer logic
  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            handleTimerComplete()
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, minutes, seconds])

  const handleTimerComplete = () => {
    // Play notification sound
    if (audioRef.current) {
      audioRef.current.play()
    }

    if (mode === 'work') {
      const newSessions = sessions + 1
      setSessions(newSessions)
      localStorage.setItem('pomodoro-sessions', newSessions.toString())

      // Determine next mode
      if (newSessions % 4 === 0) {
        switchMode('longBreak', settings.autoStartBreaks)
      } else {
        switchMode('shortBreak', settings.autoStartBreaks)
      }
    } else {
      switchMode('work', settings.autoStartPomodoros)
    }
  }

  const switchMode = (newMode, autoStart = false) => {
    setMode(newMode)
    setIsActive(autoStart)

    switch (newMode) {
      case 'work':
        setMinutes(settings.workDuration)
        break
      case 'shortBreak':
        setMinutes(settings.shortBreakDuration)
        break
      case 'longBreak':
        setMinutes(settings.longBreakDuration)
        break
    }
    setSeconds(0)
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setSeconds(0)
    switch (mode) {
      case 'work':
        setMinutes(settings.workDuration)
        break
      case 'shortBreak':
        setMinutes(settings.shortBreakDuration)
        break
      case 'longBreak':
        setMinutes(settings.longBreakDuration)
        break
    }
  }

  const updateSettings = (key, value) => {
    const newSettings = { ...settings, [key]: parseInt(value) || value }
    setSettings(newSettings)
    localStorage.setItem('pomodoro-settings', JSON.stringify(newSettings))
  }

  const resetSessions = () => {
    setSessions(0)
    localStorage.setItem('pomodoro-sessions', '0')
  }

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    const totalSeconds = mode === 'work' 
      ? settings.workDuration * 60
      : mode === 'shortBreak'
      ? settings.shortBreakDuration * 60
      : settings.longBreakDuration * 60
    
    const currentSeconds = minutes * 60 + seconds
    return ((totalSeconds - currentSeconds) / totalSeconds) * 100
  }

  const getModeColor = () => {
    switch (mode) {
      case 'work':
        return '#ef4444'
      case 'shortBreak':
        return '#10b981'
      case 'longBreak':
        return '#3b82f6'
      default:
        return '#ef4444'
    }
  }

  const getModeLabel = () => {
    switch (mode) {
      case 'work':
        return 'Focus Time'
      case 'shortBreak':
        return 'Short Break'
      case 'longBreak':
        return 'Long Break'
      default:
        return 'Focus Time'
    }
  }

  return (
    <div className='pomodoro-timer-app'>
      <audio ref={audioRef} src="data:audio/wav;base64,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" />

      <div className='pomodoro-timer-container'>
        {/* Header */}
        <div className='pomodoro-header'>
          <h2 className='pomodoro-title'>Pomodoro Timer</h2>
          <button 
            className='settings-btn'
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️
          </button>
        </div>

        {/* Mode Switcher */}
        <div className='mode-switcher'>
          <button
            className={`mode-btn ${mode === 'work' ? 'active' : ''}`}
            onClick={() => switchMode('work')}
            disabled={isActive}
          >
            Focus
          </button>
          <button
            className={`mode-btn ${mode === 'shortBreak' ? 'active' : ''}`}
            onClick={() => switchMode('shortBreak')}
            disabled={isActive}
          >
            Short Break
          </button>
          <button
            className={`mode-btn ${mode === 'longBreak' ? 'active' : ''}`}
            onClick={() => switchMode('longBreak')}
            disabled={isActive}
          >
            Long Break
          </button>
        </div>

        {/* Timer Display */}
        <div className='timer-display' style={{ borderColor: getModeColor() }}>
          <div className='mode-label' style={{ color: getModeColor() }}>
            {getModeLabel()}
          </div>
          <div className='time-text'>{formatTime(minutes, seconds)}</div>
          <div className='progress-ring'>
            <svg width="280" height="280">
              <circle
                cx="140"
                cy="140"
                r="130"
                fill="none"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="8"
              />
              <circle
                cx="140"
                cy="140"
                r="130"
                fill="none"
                stroke={getModeColor()}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 130}`}
                strokeDashoffset={`${2 * Math.PI * 130 * (1 - getProgress() / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 140 140)"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
          </div>
        </div>

        {/* Controls */}
        <div className='timer-controls'>
          <button
            className='control-btn primary'
            onClick={toggleTimer}
            style={{ background: getModeColor() }}
          >
            {isActive ? '⏸ Pause' : '▶ Start'}
          </button>
          <button
            className='control-btn secondary'
            onClick={resetTimer}
          >
            🔄 Reset
          </button>
        </div>

        {/* Sessions Counter */}
        <div className='sessions-counter'>
          <div className='sessions-label'>Sessions Completed Today</div>
          <div className='sessions-count'>{sessions}</div>
          <button className='reset-sessions-btn' onClick={resetSessions}>
            Reset Counter
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className='settings-panel'>
            <h3>Settings</h3>
            
            <div className='setting-group'>
              <label>Focus Duration (minutes)</label>
              <input
                type='number'
                min='1'
                max='60'
                value={settings.workDuration}
                onChange={(e) => updateSettings('workDuration', e.target.value)}
              />
            </div>

            <div className='setting-group'>
              <label>Short Break (minutes)</label>
              <input
                type='number'
                min='1'
                max='30'
                value={settings.shortBreakDuration}
                onChange={(e) => updateSettings('shortBreakDuration', e.target.value)}
              />
            </div>

            <div className='setting-group'>
              <label>Long Break (minutes)</label>
              <input
                type='number'
                min='1'
                max='60'
                value={settings.longBreakDuration}
                onChange={(e) => updateSettings('longBreakDuration', e.target.value)}
              />
            </div>

            <div className='setting-group checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={settings.autoStartBreaks}
                  onChange={(e) => updateSettings('autoStartBreaks', e.target.checked)}
                />
                Auto-start Breaks
              </label>
            </div>

            <div className='setting-group checkbox-group'>
              <label>
                <input
                  type='checkbox'
                  checked={settings.autoStartPomodoros}
                  onChange={(e) => updateSettings('autoStartPomodoros', e.target.checked)}
                />
                Auto-start Focus Sessions
              </label>
            </div>

            <button 
              className='close-settings-btn'
              onClick={() => setShowSettings(false)}
            >
              Close Settings
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PomodoroTimer