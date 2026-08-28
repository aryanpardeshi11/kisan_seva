import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SettingsModal } from './components/SettingsModal';
import { AuthModal } from './components/AuthModal';
import { AiHubView } from './views/AiHubView';
import { CommunityView } from './views/CommunityView';
import './index.css';

function AppContent() {
  const [activeTab, setActiveTab] = useState(0); // 0: AI Hub & Tools, 1: Community
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div id="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
      {/* Top Header */}
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Main Tab Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeTab === 0 ? (
          <AiHubView onOpenSettings={() => setIsSettingsOpen(true)} />
        ) : (
          <CommunityView onOpenAuth={() => setIsAuthOpen(true)} />
        )}
      </main>

      {/* Bottom Navigation (Max 2 Tabs) */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Interactive Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
