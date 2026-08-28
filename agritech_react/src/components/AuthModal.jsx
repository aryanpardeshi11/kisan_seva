import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Phone, User, MapPin, Zap, AlertCircle } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { loginUser, registerUser } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form Fields
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [userType, setUserType] = useState('Farmer Network');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!phone || !password) {
      setErrorMessage('Please enter your phone number and password.');
      return;
    }
    const err = loginUser(phone, password);
    if (err) {
      setErrorMessage(err);
    } else {
      setErrorMessage('');
      onClose();
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !password) {
      setErrorMessage('Please enter Full Name, Phone Number, and Password.');
      return;
    }
    const err = registerUser({ name, phone, password, userType, location, landArea: '5.0 Acres' });
    if (err) {
      setErrorMessage(err);
    } else {
      setErrorMessage('');
      onClose();
    }
  };

  const fillDemo = () => {
    setPhone('demo');
    setPassword('123');
    setErrorMessage('');
  };

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
        maxWidth: '440px',
        padding: '24px',
        position: 'relative',
        animation: 'fadeIn 0.2s ease'
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

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px',
            fontSize: '24px'
          }}>
            🌾
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {isSignUp ? 'Create Farmer Account' : 'Farmer & Trader Login'}
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {isSignUp ? 'Join AgriTech Nexus smart agricultural network' : 'Enter registered phone or username to continue'}
          </p>
        </div>

        {errorMessage && (
          <div style={{
            backgroundColor: '#FEE2E2',
            border: '1px solid #FCA5A5',
            color: '#991B1B',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '12px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSignUp ? (
          <form onSubmit={handleSignUpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Suresh Patil"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Phone Number / User ID</label>
              <input
                type="text"
                placeholder="e.g. 9822012345"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>District / Location</label>
              <input
                type="text"
                placeholder="e.g. Latur, Maharashtra"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Primary Role</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}
              >
                <option value="Farmer Network">Farmer Network</option>
                <option value="APMC Buyers">APMC Buyer / Trader</option>
                <option value="Agricultural Experts">Agricultural Expert</option>
                <option value="Government Officers">Government Officer</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
              Complete Registration
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Phone Number / Username</label>
              <input
                type="text"
                placeholder="Enter phone or 'demo'"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}
              />
            </div>

            <button type="submit" className="btn-primary">
              Login to App
            </button>

            <button
              type="button"
              onClick={fillDemo}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--secondary)',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Zap size={14} /> Auto-fill Demo Account (demo / 123)
            </button>
          </form>
        )}

        <div style={{ marginTop: '20px', textAlign: 'center', paddingTop: '14px', borderTop: '1px solid var(--border-color)', fontSize: '13px' }}>
          {isSignUp ? (
            <span>
              Already registered?{' '}
              <button onClick={() => { setIsSignUp(false); setErrorMessage(''); }} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: 'bold', cursor: 'pointer' }}>
                Login Here
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{' '}
              <button onClick={() => { setIsSignUp(true); setErrorMessage(''); }} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: 'bold', cursor: 'pointer' }}>
                Sign Up Now
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
