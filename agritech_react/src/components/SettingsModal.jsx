import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { X, Sun, Moon, Globe, LogOut, Smartphone, Sparkles } from 'lucide-react';

export const SettingsModal = ({ isOpen, onClose, onOpenAuth }) => {
  const { isDarkMode, toggleTheme, geminiApiKey, language, setLanguage } = useTheme();
  const { currentUser, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      zIndex: 1000
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '460px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '24px',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '18px' }}>
          App Settings & Profile
        </h2>

        {/* User Profile Card */}
        {currentUser ? (
          <div style={{
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '20px'
            }}>
              {currentUser.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{currentUser.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{currentUser.userType} • {currentUser.phone}</div>
              <div style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: 'bold', marginTop: '2px' }}>📍 {currentUser.location} ({currentUser.landArea})</div>
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '13px', marginBottom: '10px' }}>You are currently browsing as Guest</p>
            <button className="btn-primary" onClick={() => { onClose(); onOpenAuth(); }}>
              Sign In or Register Account
            </button>
          </div>
        )}

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Dark Mode Switch */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: 'var(--bg-canvas)',
            borderRadius: '10px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isDarkMode ? <Moon size={20} color="var(--secondary)" /> : <Sun size={20} color="#F59E0B" />}
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Dark Mode Theme</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{isDarkMode ? 'Dark Emerald Active' : 'Light Canvas Active'}</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
              style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--secondary)' }}
            />
          </div>

          {/* Developer API Status Display */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: 'var(--bg-canvas)',
            borderRadius: '10px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={20} color="#F59E0B" />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Agronomy AI Intelligence</div>
                <div style={{ fontSize: '11px', color: geminiApiKey ? '#15803D' : 'var(--text-muted)', fontWeight: 'bold' }}>
                  {geminiApiKey ? 'Gemini AI Engine Active' : 'Offline Crop Models Active'}
                </div>
              </div>
            </div>
            <span className={`badge ${geminiApiKey ? 'badge-success' : 'badge-info'}`}>
              {geminiApiKey ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Language Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: 'var(--bg-canvas)',
            borderRadius: '10px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={20} color="#3B82F6" />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '13px' }}>App Language</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{language}</div>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '12px' }}
            >
              <option value="English">English</option>
              <option value="हिंदी (Hindi)">हिंदी (Hindi)</option>
              <option value="मराठी (Marathi)">मराठी (Marathi)</option>
            </select>
          </div>

          {/* App Version Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: 'var(--bg-canvas)',
            borderRadius: '10px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Smartphone size={20} color="#10B981" />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Application Version</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>React + Vite 60fps Native DOM</div>
              </div>
            </div>
            <span className="badge badge-success">v3.0.0 Fast</span>
          </div>

        </div>

        {/* Sign Out Button */}
        {currentUser && (
          <button
            onClick={() => { logout(); onClose(); }}
            style={{
              width: '100%',
              marginTop: '20px',
              backgroundColor: '#EF4444',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <LogOut size={16} /> Sign Out Account
          </button>
        )}
      </div>
    </div>
  );
};
