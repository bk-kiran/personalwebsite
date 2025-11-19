import { useState, useEffect } from "react";
import Wordle from "./components/Wordle.jsx";
import StatsModal from "./components/StatsModal.jsx";
import MessageModal from "./components/MessageModal.jsx";

export default function App() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(5);
  const [showStats, setShowStats] = useState(false);
  const [gameState, setGameState] = useState(null);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    winPercentage: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0]
  });

  const STORAGE_KEY = (len) => `wordle:solution:${len}`;
  const GAME_STATE_KEY = (len) => `wordle:gameState:${len}`;

  useEffect(() => {
    const savedStats = JSON.parse(localStorage.getItem('wordle:stats') || 'null');
    if (savedStats) {
      setStats(savedStats);
    }
  }, []);

  const saveStats = (newStats) => {
    setStats(newStats);
    localStorage.setItem('wordle:stats', JSON.stringify(newStats));
  };

  const handleGameEnd = (won, guessCount) => {
    const newStats = { ...stats };
    newStats.gamesPlayed += 1;
    
    if (won) {
      newStats.gamesWon += 1;
      newStats.currentStreak += 1;
      newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
      newStats.guessDistribution[guessCount - 1] += 1;
    } else {
      newStats.currentStreak = 0;
    }
    
    newStats.winPercentage = Math.round((newStats.gamesWon / newStats.gamesPlayed) * 100);
    saveStats(newStats);
    
    // Mark game as complete
    const state = JSON.parse(localStorage.getItem(GAME_STATE_KEY(length)) || '{}');
    state.gameComplete = true;
    localStorage.setItem(GAME_STATE_KEY(length), JSON.stringify(state));
  };

  const fetchRandomWord = async (len) => {
    try {
      setLoading(true);
      const res = await fetch(`https://random-word-api.herokuapp.com/word?length=${len}`);
      const data = await res.json();
      const w = (data?.[0] || "").toUpperCase();
      setWord(w);
      console.log("Solution:", w);
      localStorage.setItem(STORAGE_KEY(len), w);
      // Clear game state for new word
      localStorage.removeItem(GAME_STATE_KEY(len));
      setGameState(null);
    } catch (e) {
      console.error(e);
      const fallback = len === 5 ? "REACT" : "PROGRAM";
      setWord(fallback);
      localStorage.setItem(STORAGE_KEY(len), fallback);
      localStorage.removeItem(GAME_STATE_KEY(len));
      setGameState(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedWord = localStorage.getItem(STORAGE_KEY(length));
    const savedState = JSON.parse(localStorage.getItem(GAME_STATE_KEY(length)) || 'null');
    
    // If game was complete, fetch new word
    if (savedState && savedState.gameComplete) {
      fetchRandomWord(length);
    } else if (savedWord) {
      // Load existing word and game state
      setWord(savedWord);
      setGameState(savedState);
      setLoading(false);
    } else {
      // No saved word, fetch new one
      fetchRandomWord(length);
    }
  }, [length]);

  const handleNewGame = () => {
    fetchRandomWord(length);
  };

  const changeMode = (newLength) => {
    setLength(newLength);
  };

  return (
    <div className="App wordle-app-body">
      <h1>Wordle</h1>

      <div className="wordle-controls" style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
        <button 
          onClick={() => changeMode(5)}
          className={`wordle-btn ${length === 5 ? 'active' : ''}`}
        >
          Normal (5)
        </button>
        <button 
          onClick={() => changeMode(7)}
          className={`wordle-btn ${length === 7 ? 'active' : ''}`}
        >
          Hard (7)
        </button>
        <button 
          onClick={handleNewGame}
          className="wordle-btn wordle-btn-primary"
        >
          New Word
        </button>
        <button 
          onClick={() => setShowStats(true)}
          className="wordle-btn wordle-btn-secondary"
        >
          Stats
        </button>
      </div>

      {loading ? (
        <div className="wordle-loading">Loading...</div>
      ) : (
        word && <Wordle solution={word} length={length} onGameEnd={handleGameEnd} savedGameState={gameState} />
      )}

      <StatsModal 
        isOpen={showStats} 
        onClose={() => setShowStats(false)} 
        stats={stats}
      />
    </div>
  );
}
