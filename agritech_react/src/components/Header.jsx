import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Settings, Sparkles } from 'lucide-react';

export const Header = ({ onOpenSettings }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentUser } = useAuth();

  return (
    <header className="glass-card" style={{
      borderRadius: 0,
      padding: '12px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'var(--primary)',
      color: '#ffffff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--secondary)'
        }}>
          🌾
        </div>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: 1.2 }}>Kisan Seva</h1>
          <div style={{ fontSize: '11px', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} color="var(--secondary)" />
            Smart Farmer & APMC Portal
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Dark Mode Quick Switch */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            color: '#ffffff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun size={18} color="#FBBF24" /> : <Moon size={18} />}
        </button>

        {/* Settings & Profile Shortcut */}
        <button
          onClick={onOpenSettings}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            color: '#ffffff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="App Settings & Profile"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};
