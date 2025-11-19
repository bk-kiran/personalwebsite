import React from 'react';

export default function Keyboard({ usedKeys, onKeyClick }) {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];

  const handleClick = (key) => {
    onKeyClick({ key });
  };

  const getKeyColor = (key) => {
    if (usedKeys[key] === 'green') return '#6aaa64';
    if (usedKeys[key] === 'yellow') return '#c9b458';
    if (usedKeys[key] === 'grey') return '#787c7e';
    return '#d3d6da';
  };

  const isDarkMode = document.body.classList.contains('dark-mode');
  const defaultBg = isDarkMode ? '#2a2a2a' : '#d3d6da';
  const defaultColor = isDarkMode ? '#ffffff' : '#1f2937';

  return (
    <div style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto' }}>
      {keys.map((row, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
          {row.map((key) => {
            const keyColor = getKeyColor(key);
            const isColored = usedKeys[key] && (keyColor !== '#d3d6da');
            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                style={{
                  padding: '10px',
                  minWidth: key === 'ENTER' || key === 'BACKSPACE' ? '60px' : '40px',
                  height: '50px',
                  backgroundColor: isColored ? keyColor : defaultBg,
                  color: isColored ? 'white' : defaultColor,
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: key === 'ENTER' || key === 'BACKSPACE' ? '11px' : '13px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.3s ease'
                }}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}