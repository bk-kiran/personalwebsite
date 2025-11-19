import React from 'react';

export default function MessageModal({ message, onClose }) {
  if (!message) return null;

  const isDarkMode = document.body.classList.contains('dark-mode');

  return (
    <div 
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
        style={{
          backgroundColor: isDarkMode ? '#1a1a1a' : 'white',
          border: isDarkMode ? '1px solid #2a2a2a' : 'none',
          borderRadius: '12px',
          padding: '32px 48px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
          transition: 'background-color 0.3s ease, border-color 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ 
          fontSize: 'clamp(16px, 2.5vw, 20px)', 
          fontWeight: 'bold', 
          marginBottom: '20px',
          color: isDarkMode ? '#ffffff' : '#1f2937',
          fontFamily: "'Inter', sans-serif"
        }}>
          {message}
        </div>
        <button 
          onClick={onClose}
          style={{
            padding: '10px 24px',
            backgroundColor: '#6aaa64',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '13px',
            fontFamily: "'Inter', sans-serif",
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#5a9a54'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6aaa64'}
        >
          OK
        </button>
      </div>
    </div>
  );
}