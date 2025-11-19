import React from 'react'

const Bubble = ({ message }) => {
  // Handle different message formats from AI SDK
  let content = ''
  
  if (typeof message.content === 'string') {
    content = message.content
  } else if (message.parts && Array.isArray(message.parts)) {
    content = message.parts
      .map((part) => part.text || '')
      .join('')
  } else if (message.text) {
    content = message.text
  }
  
  const { role } = message

  return (
    <div className={`bubble message ${role}`}>
      <p>{content}</p>
    </div>
  )
}

export default Bubble

