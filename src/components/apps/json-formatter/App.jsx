import React, { useState, useRef } from 'react'
import './index.css'

const JSONFormatter = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indentSize, setIndentSize] = useState(2)
  const [showSuccess, setShowSuccess] = useState(false)
  const textareaRef = useRef(null)

  const formatJSON = () => {
    try {
      setError('')
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutput(formatted)
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
      setOutput('')
    }
  }

  const minifyJSON = () => {
    try {
      setError('')
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
      setOutput('')
    }
  }

  const validateJSON = () => {
    try {
      JSON.parse(input)
      setError('')
      setOutput('✅ Valid JSON!')
    } catch (err) {
      setError(`❌ Invalid JSON: ${err.message}`)
      setOutput('')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (err) {
      alert('Failed to copy to clipboard')
    }
  }

  const downloadJSON = () => {
    if (!output) return

    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const loadSample = () => {
    const sample = {
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
      address: {
        street: "123 Main St",
        city: "Boston",
        state: "MA",
        zipCode: "02101"
      },
      hobbies: ["reading", "coding", "hiking"],
      isActive: true,
      projects: [
        {
          name: "Project Alpha",
          status: "completed",
          technologies: ["React", "Node.js", "MongoDB"]
        },
        {
          name: "Project Beta",
          status: "in-progress",
          technologies: ["Python", "Django", "PostgreSQL"]
        }
      ]
    }
    setInput(JSON.stringify(sample))
  }

  const escapeJSON = () => {
    try {
      setError('')
      const parsed = JSON.parse(input)
      const escaped = JSON.stringify(JSON.stringify(parsed))
      setOutput(escaped)
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
      setOutput('')
    }
  }

  const unescapeJSON = () => {
    try {
      setError('')
      const unescaped = JSON.parse(input)
      if (typeof unescaped === 'string') {
        const parsed = JSON.parse(unescaped)
        const formatted = JSON.stringify(parsed, null, indentSize)
        setOutput(formatted)
      } else {
        setError('Input is not escaped JSON')
      }
    } catch (err) {
      setError(`Invalid escaped JSON: ${err.message}`)
      setOutput('')
    }
  }

  const sortKeys = () => {
    try {
      setError('')
      const parsed = JSON.parse(input)
      const sorted = JSON.stringify(parsed, Object.keys(parsed).sort(), indentSize)
      setOutput(sorted)
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
      setOutput('')
    }
  }

  return (
    <div className='json-formatter-app'>
      <div className='json-formatter-container'>
        {/* Header */}
        <div className='json-header'>
          <h2 className='json-title'>JSON Formatter & Validator</h2>
          <p className='json-subtitle'>Format, validate, and manipulate JSON data</p>
        </div>

        {/* Controls */}
        <div className='json-controls'>
          <div className='control-group'>
            <label htmlFor='indent-size'>Indent Size:</label>
            <select
              id='indent-size'
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className='indent-select'
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>

          <button className='sample-btn' onClick={loadSample}>
            📋 Load Sample
          </button>
        </div>

        {/* Action Buttons */}
        <div className='json-actions'>
          <button className='action-btn primary' onClick={formatJSON}>
            🎨 Format
          </button>
          <button className='action-btn secondary' onClick={minifyJSON}>
            📦 Minify
          </button>
          <button className='action-btn secondary' onClick={validateJSON}>
            ✓ Validate
          </button>
          <button className='action-btn secondary' onClick={sortKeys}>
            🔤 Sort Keys
          </button>
          <button className='action-btn secondary' onClick={escapeJSON}>
            🔒 Escape
          </button>
          <button className='action-btn secondary' onClick={unescapeJSON}>
            🔓 Unescape
          </button>
          <button className='action-btn danger' onClick={clearAll}>
            🗑️ Clear
          </button>
        </div>

        {/* Input/Output Section */}
        <div className='json-editor'>
          {/* Input */}
          <div className='editor-panel'>
            <div className='panel-header'>
              <h3>Input JSON</h3>
              <span className='char-count'>{input.length} characters</span>
            </div>
            <textarea
              ref={textareaRef}
              className='json-textarea'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Paste your JSON here...'
              spellCheck='false'
            />
          </div>

          {/* Output */}
          <div className='editor-panel'>
            <div className='panel-header'>
              <h3>Output</h3>
              <div className='output-actions'>
                {output && (
                  <>
                    <button
                      className='icon-btn'
                      onClick={copyToClipboard}
                      title='Copy to clipboard'
                    >
                      {showSuccess ? '✓' : '📋'}
                    </button>
                    <button
                      className='icon-btn'
                      onClick={downloadJSON}
                      title='Download JSON'
                    >
                      ⬇️
                    </button>
                  </>
                )}
              </div>
            </div>
            <textarea
              className='json-textarea output'
              value={output}
              readOnly
              placeholder='Formatted JSON will appear here...'
              spellCheck='false'
            />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className='error-message'>
            <span className='error-icon'>⚠️</span>
            {error}
          </div>
        )}

        {/* Success Toast */}
        {showSuccess && (
          <div className='success-toast'>
            ✓ Copied to clipboard!
          </div>
        )}

        {/* Info Section */}
        <div className='json-info'>
          <h3>Features:</h3>
          <ul>
            <li><strong>Format:</strong> Pretty-print JSON with customizable indentation</li>
            <li><strong>Minify:</strong> Remove all whitespace for compact output</li>
            <li><strong>Validate:</strong> Check if JSON syntax is valid</li>
            <li><strong>Sort Keys:</strong> Alphabetically sort object keys</li>
            <li><strong>Escape/Unescape:</strong> Convert JSON to/from escaped string format</li>
            <li><strong>Copy & Download:</strong> Easy export options</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default JSONFormatter