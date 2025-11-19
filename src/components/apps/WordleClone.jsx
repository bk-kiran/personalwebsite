import React from 'react'
import WordleApp from './wordle-clone/App.jsx'
import './wordle-clone/index.css'
import './WordleClone.css'

const WordleClone = () => {
  return (
    <section className='wordle-page page-enter'>
      <div className='wordle-page-header'>
        <p className='wordle-page-title'>WORDLE CLONE</p>
        <h2>Play Wordle 🟩</h2>
        <p className='wordle-page-subtitle'>
          Guess the word! Each guess must be a valid word. The color of the tiles will change to show how close your guess was to the word.
        </p>
      </div>
      <div className='wordle-game-wrapper'>
        <WordleApp />
      </div>
    </section>
  )
}

export default WordleClone