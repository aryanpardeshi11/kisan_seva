import React, { useState } from 'react';
import { initialCropLogs } from '../data/agriData';
import { X, TrendingUp, Search, PlusCircle, Calendar } from 'lucide-react';

export const CropMonitorModal = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState(initialCropLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // New Log Form
  const [crop, setCrop] = useState('');
  const [stage, setStage] = useState('');
  const [height, setHeight] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const filtered = logs.filter((l) =>
    l.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!crop || !stage) return;

    const newLog = {
      id: Date.now(),
      crop,
      stage,
      area: "3.0 Acres",
      date: "Today",
      height: height ? `${height} cm` : "45 cm",
      status: "Healthy Log",
      notes: notes || "Regular crop observation log added."
    };
    setLogs([newLog, ...logs]);
    setCrop('');
    setStage('');
    setHeight('');
    setNotes('');
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
            <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: '#7E22CE', color: '#ffffff' }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Crop Growth Tracker</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>25 Field Inspection Logs & Height Metrics</p>
            </div>
          </div>
          <button className="btn-secondary" onClick={() => setShowAddForm((prev) => !prev)} style={{ padding: '8px 12px', fontSize: '12px' }}>
            <PlusCircle size={16} /> Add Log
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <form onSubmit={handleAddLog} style={{ backgroundColor: 'var(--bg-canvas)', padding: '14px', borderRadius: '10px', marginBottom: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 'bold' }}>Record Field Observation Log</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <input type="text" placeholder="Crop (e.g. Soybean)" value={crop} onChange={(e) => setCrop(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
              <input type="text" placeholder="Growth Stage (e.g. Flowering)" value={stage} onChange={(e) => setStage(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
            </div>
            <input type="text" placeholder="Plant Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
            <input type="text" placeholder="Field Notes / Sprays given" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
            <button type="submit" className="btn-primary" style={{ padding: '8px', fontSize: '12px' }}>Save Log Entry</button>
          </form>
        )}

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search crop or stage (e.g. Cotton, Flowering...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-canvas)', color: 'var(--text-main)', fontSize: '13px' }}
          />
        </div>

        {/* Logs Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-canvas)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>🌱 {item.crop} ({item.area})</span>
                <span className="badge badge-success">{item.status}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Stage: <strong>{item.stage}</strong> | Height: <strong>{item.height}</strong> | Date: <strong>{item.date}</strong>
              </div>
              <p style={{ fontSize: '12px', fontStyle: 'italic', marginTop: '4px' }}>
                "{item.notes}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
