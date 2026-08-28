import React from 'react';
import { Bot, Users } from 'lucide-react';

export const BottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <nav style={{
      position: 'sticky',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--nav-bg)',
      height: '65px',
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid var(--border-color)',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
      zIndex: 100
    }}>
      <button
        onClick={() => setActiveTab(0)}
        style={{
          flex: 1,
          height: '100%',
          border: 'none',
          background: 'none',
          color: activeTab === 0 ? 'var(--secondary)' : 'rgba(255,255,255,0.7)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          fontWeight: activeTab === 0 ? 'bold' : 'normal',
          transition: 'color 0.2s ease'
        }}
      >
        <Bot size={22} />
        <span style={{ fontSize: '12px' }}>AI Hub & Services</span>
      </button>

      <button
        onClick={() => setActiveTab(1)}
        style={{
          flex: 1,
          height: '100%',
          border: 'none',
          background: 'none',
          color: activeTab === 1 ? 'var(--secondary)' : 'rgba(255,255,255,0.7)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          fontWeight: activeTab === 1 ? 'bold' : 'normal',
          transition: 'color 0.2s ease'
        }}
      >
        <Users size={22} />
        <span style={{ fontSize: '12px' }}>Community Feed</span>
      </button>
    </nav>
  );
};
