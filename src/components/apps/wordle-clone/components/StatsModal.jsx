import React from 'react';

export default function StatsModal({ isOpen, onClose, stats }) {
  if (!isOpen) return null;

  const maxCount = Math.max(...stats.guessDistribution, 1);

  const isDarkMode = document.body.classList.contains('dark-mode');

  return (
    <div 
      className="stats-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div 
        className="stats-modal-content"
        style={{
          backgroundColor: isDarkMode ? '#1a1a1a' : 'white',
          border: isDarkMode ? '1px solid #2a2a2a' : 'none',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          transition: 'background-color 0.3s ease, border-color 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            color: isDarkMode ? '#ffffff' : '#1f2937',
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontWeight: 700
          }}>Statistics</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2em',
              cursor: 'pointer',
              padding: '0',
              lineHeight: '1',
              color: isDarkMode ? '#b3b3b3' : '#666',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = isDarkMode ? '#ffffff' : '#1f2937'}
            onMouseLeave={(e) => e.target.style.color = isDarkMode ? '#b3b3b3' : '#666'}
          >
            &times;
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#1f2937' }}>{stats.gamesPlayed}</div>
            <div style={{ fontSize: '12px', color: isDarkMode ? '#b3b3b3' : '#666' }}>Played</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#1f2937' }}>{stats.winPercentage}</div>
            <div style={{ fontSize: '12px', color: isDarkMode ? '#b3b3b3' : '#666' }}>Win %</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#1f2937' }}>{stats.currentStreak}</div>
            <div style={{ fontSize: '12px', color: isDarkMode ? '#b3b3b3' : '#666' }}>Current Streak</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#1f2937' }}>{stats.maxStreak}</div>
            <div style={{ fontSize: '12px', color: isDarkMode ? '#b3b3b3' : '#666' }}>Max Streak</div>
          </div>
        </div>

        <h3 style={{ 
          marginBottom: '12px', 
          fontSize: 'clamp(14px, 2vw, 16px)',
          color: isDarkMode ? '#ffffff' : '#1f2937',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600
        }}>Guess Distribution</h3>
        <div>
          {stats.guessDistribution.map((count, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '20px', fontSize: '12px', color: isDarkMode ? '#b3b3b3' : '#666' }}>{i + 1}</div>
              <div style={{ flex: 1, backgroundColor: isDarkMode ? '#2a2a2a' : '#e0e0e0', height: '24px', position: 'relative', borderRadius: '4px' }}>
                <div 
                  style={{
                    backgroundColor: '#6aaa64',
                    height: '100%',
                    width: `${count > 0 ? Math.max((count / maxCount) * 100, 10) : 0}%`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '8px',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }}
                >
                  {count > 0 && count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}