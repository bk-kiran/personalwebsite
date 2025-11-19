import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission (you can add email service integration here)
    console.log('Form submitted:', formData)
    alert('Message sent! I will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section className='contactpage page-enter'>
      <div className='contactpage-header'>
        <p className='contactpage-title'>GET IN TOUCH</p>
        <h2>Let's Connect 📬</h2>
        <p className='contactpage-subtitle'>
          Have a project in mind or want to discuss opportunities? I'd love to hear from you!
        </p>
      </div>

      <div className='contact-content'>
        <div className='contact-info'>
          <div className='info-card'>
            <div className='info-icon'>📧</div>
            <h3>Email</h3>
            <p>kbalasundara@umass.edu</p>
            <a href="mailto:kbalasundara@umass.edu" className='info-link'>Send an email</a>
          </div>

          <div className='info-card'>
            <div className='info-icon'>📍</div>
            <h3>Location</h3>
            <p>Amherst, Massachusetts</p>
            <p className='availability'>Available for Summer 2026 internships</p>
          </div>

          <div className='info-card'>
            <div className='info-icon'>🔗</div>
            <h3>Connect</h3>
            <div className='social-links'>
              <a href="https://www.linkedin.com/in/bk-kiran/" target='_blank' rel="noopener noreferrer" className='social-btn linkedin'>
                LinkedIn
              </a>
              <a href="https://github.com/bk-kiran" target='_blank' rel="noopener noreferrer" className='social-btn github'>
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className='contact-form-container'>
          <form className='contact-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Your name'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='your.email@example.com'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='subject'>Subject</label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                placeholder='What is this about?'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='message'>Message</label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                placeholder='Your message...'
                rows='6'
                required
              ></textarea>
            </div>

            <button type='submit' className='submit-btn'>
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact