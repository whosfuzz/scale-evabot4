// ThemeToggle.jsx
import React from 'react';
import { useTheme } from './context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      style={{
        padding: '8px 16px',
        cursor: 'pointer',
        borderRadius: '8px',
        border: '1px solid var(--text-color)',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        fontWeight: 'bold'
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
