import React, { useState } from 'react';
import { initialMandiRates } from '../data/agriData';
import { X, TrendingUp, Search, PlusCircle } from 'lucide-react';

export const MandiRatesModal = ({ isOpen, onClose }) => {
  const [rates, setRates] = useState(initialMandiRates);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // New Mandi Entry Form
  const [newCommodity, setNewCommodity] = useState('');
  const [newMarket, setNewMarket] = useState('');
  const [newModalRate, setNewModalRate] = useState('');

  if (!isOpen) return null;

  const filtered = rates.filter((r) =>
    r.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRate = (e) => {
    e.preventDefault();
    if (!newCommodity || !newMarket || !newModalRate) return;

    const newItem = {
      id: Date.now(),
      commodity: newCommodity,
      market: newMarket,
      district: "User Reported",
      minRate: `₹${Math.round(parseFloat(newModalRate) * 0.9)}`,
      maxRate: `₹${Math.round(parseFloat(newModalRate) * 1.1)}`,
      modalRate: `₹${newModalRate}`,
      trend: "+₹50 📈",
      arrival: "5,000 Qtnl"
    };
    setRates([newItem, ...rates]);
    setNewCommodity('');
    setNewMarket('');
    setNewModalRate('');
    setShowAddForm(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 1000 }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: '#2C1D11', color: '#ffffff' }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>APMC Mandi Rates</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>28 Real-Time Market Commodity Rates</p>
            </div>
          </div>
          <button className="btn-secondary" onClick={() => setShowAddForm((prev) => !prev)} style={{ padding: '8px 12px', fontSize: '12px' }}>
            <PlusCircle size={16} /> Add Rate
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <form onSubmit={handleAddRate} style={{ backgroundColor: 'var(--bg-canvas)', padding: '14px', borderRadius: '10px', marginBottom: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 'bold' }}>Report Today APMC Rate</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <input type="text" placeholder="Commodity (e.g. Soybean)" value={newCommodity} onChange={(e) => setNewCommodity(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
              <input type="text" placeholder="APMC Mandi (e.g. Latur)" value={newMarket} onChange={(e) => setNewMarket(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
            </div>
            <input type="number" placeholder="Modal Rate (₹ / Qtnl)" value={newModalRate} onChange={(e) => setNewModalRate(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
            <button type="submit" className="btn-primary" style={{ padding: '8px', fontSize: '12px' }}>Submit Mandi Rate</button>
          </form>
        )}

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search commodity or market (e.g. Cotton, Latur...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-canvas)', color: 'var(--text-main)', fontSize: '13px' }}
          />
        </div>

        {/* Mandi Items Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-canvas)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>🌾 {item.commodity}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>📍 {item.market} ({item.district})</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Arrivals: {item.arrival}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--secondary)' }}>{item.modalRate}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Min: {item.minRate} | Max: {item.maxRate}</div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '2px' }}>{item.trend}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
