import React, { useState } from 'react';
import { initialSoilLabs } from '../data/agriData';
import { X, MapPin, Phone, Search, Calendar, CheckCircle } from 'lucide-react';

export const SoilLabsModal = ({ isOpen, onClose }) => {
  const [labs, setLabs] = useState(initialSoilLabs);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookedLab, setBookedLab] = useState(null);

  if (!isOpen) return null;

  const filtered = labs.filter((l) =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 1000 }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: '#1E40AF', color: '#ffffff' }}>
            <MapPin size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Soil Labs & Cold Storage</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>25 Soil Testing Centers & Grain Storage Hubs</p>
          </div>
        </div>

        {bookedLab && (
          <div style={{ backgroundColor: '#DBEAFE', border: '1px solid #93C5FD', borderRadius: '10px', padding: '12px', marginBottom: '16px', color: '#1E40AF', fontSize: '12px' }}>
            <CheckCircle size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            <strong>Slot Reserved:</strong> Sample pickup request submitted for <strong>{bookedLab.name}</strong>!
          </div>
        )}

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search lab or location (e.g. Baramati, Cold Storage...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-canvas)', color: 'var(--text-main)', fontSize: '13px' }}
          />
        </div>

        {/* Labs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-canvas)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>📍 {item.name}</span>
                <span className="badge badge-info">{item.type}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                {item.location} • {item.contact}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--border-color)' }}>
                <span style={{ fontSize: '11px', color: '#15803D', fontWeight: 'bold' }}>Fee: {item.fee} ({item.capacity})</span>
                <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => setBookedLab(item)}>
                  <Calendar size={12} /> Book Test / Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
