import React, { useState } from 'react'
import Bubble from './components/Bubble'
import LoadingBubble from './components/LoadingBubble'
import PromptSuggestionRow from './components/PromptSuggestionRow'
import logo from './app/assets/yo.png'
import './ChatApp.css'

// Note: You'll need to install 'ai' package: npm install ai
// And set up the API endpoint. For now, using a simple mock implementation
const ChatApp = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // TODO: Replace with your actual API endpoint
      // If using the Next.js backend, point to: http://localhost:3000/api/chat (or your deployed URL)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = { role: 'assistant', content: '' }
      setMessages(prev => [...prev, assistantMessage])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(line => line.trim())

        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              const data = JSON.parse(line.slice(2))
              if (data.type === 'text-delta' && data.textDelta) {
                assistantMessage.content += data.textDelta
                setMessages(prev => {
                  const newMessages = [...prev]
                  newMessages[newMessages.length - 1] = { ...assistantMessage }
                  return newMessages
                })
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting to the server. Please make sure the API endpoint is configured correctly.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const noMessages = !messages || messages.length === 0

  const handlePrompt = (promptText) => {
    setInput(promptText)
    setTimeout(() => {
      const form = document.querySelector('.chat-form')
      if (form) {
        const fakeEvent = {
          preventDefault: () => {},
          target: form
        }
        handleSubmit(fakeEvent)
      }
    }, 10)
  }

  return (
    <div className="chat-app-container">
      <div className="chat-container">
        <img src={logo} alt="BK Kiran Logo" className="chat-logo" />
        <section className={noMessages ? '' : 'populated'}>
          {noMessages ? (
            <>
              <p className="starter-text">Ask anything about BK Kiran!</p>
              <br />
              <PromptSuggestionRow onPromptClick={handlePrompt} />
            </>
          ) : (
            <div className="messages-container">
              {messages.map((msg, index) => (
                <Bubble key={`message-${index}`} message={msg} />
              ))}
              {isLoading && <LoadingBubble />}
            </div>
          )}

          <form onSubmit={handleSubmit} className="chat-form">
            <input
              className="question-box"
              onChange={handleInputChange}
              value={input}
              placeholder="Ask Me Anything..."
              name="prompt"
              disabled={isLoading}
            />
            <input type="submit" value="Submit" disabled={isLoading} />
          </form>
        </section>
      </div>
    </div>
  )
}

export default ChatApp

