import React from 'react'
import JSONFormatterApp from './json-formatter/App.jsx'
import './json-formatter/index.css'
import './JSONFormatter.css'

const JSONFormatter = () => {
  return (
    <section className='json-formatter-page page-enter'>
      <div className='json-formatter-page-header'>
        <p className='json-formatter-page-title'>DEVELOPER TOOL</p>
        <h2>JSON Formatter & Validator 🛠️</h2>
        <p className='json-formatter-page-subtitle'>
          Format, validate, minify, and manipulate JSON data. A comprehensive tool for developers working with JSON APIs and configuration files.
        </p>
      </div>
      <div className='json-formatter-game-wrapper'>
        <JSONFormatterApp />
      </div>
    </section>
  )
}

export default JSONFormatter