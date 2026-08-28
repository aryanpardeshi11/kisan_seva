import React, { useState } from 'react';
import { initialSoilRecommendations } from '../data/agriData';
import { X, TestTube, Calculator, Search, CheckCircle } from 'lucide-react';

export const SoilNpkModal = ({ isOpen, onClose }) => {
  const [recommendations, setRecommendations] = useState(initialSoilRecommendations);
  const [searchTerm, setSearchTerm] = useState('');

  // Calculator State
  const [acres, setAcres] = useState(2);
  const [selectedCrop, setSelectedCrop] = useState('Soybean');
  const [calculatedBags, setCalculatedBags] = useState(null);

  if (!isOpen) return null;

  const filtered = recommendations.filter((r) =>
    r.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateFertilizerBags = (e) => {
    e.preventDefault();
    const multiplier = parseFloat(acres) || 1;
    setCalculatedBags({
      urea: Math.round(multiplier * 1.8 * 10) / 10,
      ssp: Math.round(multiplier * 3.5 * 10) / 10,
      mop: Math.round(multiplier * 1.2 * 10) / 10,
      zinc: Math.round(multiplier * 10),
    });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 1000 }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: '#B8821D', color: '#ffffff' }}>
            <TestTube size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Soil NPK Recommender</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>25 Crop NPK Ratios & Fertilizer Bag Calculator</p>
          </div>
        </div>

        {/* NPK Bag Calculator Box */}
        <div style={{ backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calculator size={18} color="var(--secondary)" /> Custom Fertilizer Bag Calculator
          </h3>
          <form onSubmit={calculateFertilizerBags} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '130px' }}>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Crop</label>
              <select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '12px' }}>
                {recommendations.map((r) => <option key={r.id} value={r.crop}>{r.crop}</option>)}
              </select>
            </div>
            <div style={{ width: '90px' }}>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Acres</label>
              <input type="number" step="0.5" value={acres} onChange={(e) => setAcres(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '12px' }} />
            </div>
            <button type="submit" className="btn-secondary" style={{ padding: '8px 14px', fontSize: '12px' }}>
              Calculate
            </button>
          </form>

          {calculatedBags && (
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', fontSize: '12px' }}>
                ⚡ <strong>Urea (46% N):</strong> {calculatedBags.urea} Bags (50kg)
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', fontSize: '12px' }}>
                🌾 <strong>SSP (16% P):</strong> {calculatedBags.ssp} Bags (50kg)
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', fontSize: '12px' }}>
                🌱 <strong>MOP (60% K):</strong> {calculatedBags.mop} Bags (50kg)
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', fontSize: '12px' }}>
                🧪 <strong>Zinc Sulphate:</strong> {calculatedBags.zinc} kg
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search crop target (e.g. Cotton, Wheat...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-canvas)', color: 'var(--text-main)', fontSize: '13px' }}
          />
        </div>

        {/* Recommendations Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-canvas)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>🌱 {item.crop}</span>
                <span className="badge badge-success">Target: {item.targetYield}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <strong>NPK Dosage Ratio:</strong> <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>{item.npkRatio}</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                <strong>Organic & FYM:</strong> {item.organoRatio} | <strong>Micronutrients:</strong> {item.MicroNutrients}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
