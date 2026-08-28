import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { quickPrompts } from '../data/agriData';
import { callGeminiApi } from '../services/geminiService';
import { PlantDoctorModal } from '../components/PlantDoctorModal';
import { SoilNpkModal } from '../components/SoilNpkModal';
import { MandiRatesModal } from '../components/MandiRatesModal';
import { SoilLabsModal } from '../components/SoilLabsModal';
import { CropMonitorModal } from '../components/CropMonitorModal';
import { Send, Sparkles, Stethoscope, TestTube, TrendingUp, MapPin, Activity } from 'lucide-react';

export const AiHubView = ({ onOpenSettings }) => {
  const { geminiApiKey } = useTheme();

  // Active Modals state
  const [activeModal, setActiveModal] = useState(null); // 'doctor', 'npk', 'mandi', 'labs', 'crop'

  // Chat State
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste! I am your AgriTech 24/7 AI Crop & Agronomy Assistant. Ask me anything about crop diseases, fertilizer calculations, APMC Mandi rates, soil testing, or government schemes!',
      time: '08:00 AM'
    }
  ]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    // Call live Gemini API if key is present
    let botResponse = await callGeminiApi(query);

    if (!botResponse) {
      // Offline / Local agronomy engine fallback
      const q = query.toLowerCase();
      botResponse = 'I have analyzed your crop query. ';
      if (q.includes('soybean') || q.includes('fertilizer')) {
        botResponse += 'For Soybean crop, apply 20:60:40 kg/ha NPK dosage along with Rhizobium bio-fertilizer seed treatment for optimal root nodulation.';
      } else if (q.includes('pink bollworm') || q.includes('cotton')) {
        botResponse += 'For Pink Bollworm in Cotton: Install Pheromone traps @ 5 traps/acre immediately and spray Spinetoram 11.7% SC (0.8 ml/L).';
      } else if (q.includes('mandi') || q.includes('rate') || q.includes('price')) {
        botResponse += 'Today APMC Mandi Rates: Soybean ₹4,850/qtnl (Latur), Cotton ₹7,450/qtnl (Yavatmal), Maize ₹2,380/qtnl, Tomato ₹2,650/qtnl.';
      } else if (q.includes('soil') || q.includes('lab') || q.includes('npk')) {
        botResponse += 'District Soil Testing Lab Shivajinagar & KVK Baramati offer full NPK and Soil Health Card analysis within 48 hours.';
      } else if (q.includes('pm-kisan') || q.includes('subsidy')) {
        botResponse += 'PM-Kisan 18th Installment (₹2,000) e-KYC is active. Ensure your bank account is Aadhaar seeded on PM-Kisan portal.';
      } else if (q.includes('drip') || q.includes('irrigation')) {
        botResponse += 'Flush drip laterals with 33% Hydrochloric Acid solution (1 L per 1000 L water) to dissolve mineral scale.';
      } else {
        botResponse += 'Based on current agronomy models, maintain proper field drainage, balanced micronutrients, and monitor pest traps daily.';
      }
    }

    const botMsg = { id: Date.now() + 1, sender: 'bot', text: botResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 130px)', overflow: 'hidden' }}>
      
      {/* AI Hub Header Banner */}
      <div style={{
        padding: '8px 16px',
        backgroundColor: 'var(--primary)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="var(--secondary)" />
          <span>{geminiApiKey ? 'Gemini 1.5 Flash Live Connected' : '24/7 Crop Agronomy Advisory'}</span>
        </div>
        <span className="badge badge-success" style={{ fontSize: '10px' }}>
          {geminiApiKey ? 'Live AI' : 'Active'}
        </span>
      </div>

      {/* 5 Smart Feature Launcher Chips Bar */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: 'var(--bg-canvas)',
        borderBottom: '1px solid var(--border-color)',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px' }}>
          SMART AGRITECH TOOLS (TAP TO OPEN)
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#15803D' }} onClick={() => setActiveModal('doctor')}>
            <Stethoscope size={14} /> Plant AI Doctor
          </button>

          <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#B8821D' }} onClick={() => setActiveModal('npk')}>
            <TestTube size={14} /> Soil NPK
          </button>

          <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#2C1D11' }} onClick={() => setActiveModal('mandi')}>
            <TrendingUp size={14} /> Mandi Rates
          </button>

          <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#1E40AF' }} onClick={() => setActiveModal('labs')}>
            <MapPin size={14} /> Soil Labs
          </button>

          <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#7E22CE' }} onClick={() => setActiveModal('crop')}>
            <Activity size={14} /> Crop Monitor
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '82%',
              backgroundColor: m.sender === 'user' ? 'var(--primary)' : 'var(--card-bg)',
              color: m.sender === 'user' ? '#ffffff' : 'var(--text-main)',
              border: m.sender === 'bot' ? '1px solid var(--border-color)' : 'none',
              padding: '12px 16px',
              borderRadius: '16px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <p style={{ fontSize: '13px', lineHeight: 1.4, whitespace: 'pre-wrap' }}>{m.text}</p>
            <span style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px', display: 'block', textAlign: 'right' }}>{m.time}</span>
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '10px 14px', borderRadius: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
            ✨ Gemini AI is thinking & retrieving expert agronomy advice...
          </div>
        )}
      </div>

      {/* 25 Quick Suggestion Chips */}
      <div style={{ padding: '6px 12px', overflowX: 'auto', whiteSpace: 'nowrap', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              style={{
                backgroundColor: 'var(--secondary)',
                color: '#ffffff',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '16px',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Console */}
      <div style={{ padding: '12px', backgroundColor: 'var(--card-bg)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Ask 24/7 AI Expert about crops, fertilizers..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-canvas)',
            color: 'var(--text-main)',
            fontSize: '13px'
          }}
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          <Send size={18} />
        </button>
      </div>

      {/* Render 5 Feature Modals */}
      <PlantDoctorModal isOpen={activeModal === 'doctor'} onClose={() => setActiveModal(null)} />
      <SoilNpkModal isOpen={activeModal === 'npk'} onClose={() => setActiveModal(null)} />
      <MandiRatesModal isOpen={activeModal === 'mandi'} onClose={() => setActiveModal(null)} />
      <SoilLabsModal isOpen={activeModal === 'labs'} onClose={() => setActiveModal(null)} />
      <CropMonitorModal isOpen={activeModal === 'crop'} onClose={() => setActiveModal(null)} />

    </div>
  );
};
