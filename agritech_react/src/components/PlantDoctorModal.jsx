import React, { useState } from 'react';
import { initialDiseaseModels } from '../data/agriData';
import { X, Search, Camera, Stethoscope, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PlantDoctorModal = ({ isOpen, onClose }) => {
  const [diseases, setDiseases] = useState(initialDiseaseModels);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  if (!isOpen) return null;

  const filteredDiseases = diseases.filter(
    (d) =>
      d.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const simulateCameraScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      const randomItem = diseases[Math.floor(Math.random() * diseases.length)];
      setScanResult(randomItem);
    }, 2000);
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
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '24px',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: '#15803D', color: '#ffffff' }}>
            <Stethoscope size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Plant AI Doctor</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>28 Crop Disease Diagnosis Models & Chemical Remedies</p>
          </div>
        </div>

        {/* Camera Scanner Simulation Banner */}
        <div style={{ backgroundColor: 'var(--primary)', color: '#ffffff', borderRadius: '12px', padding: '16px', marginBottom: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', marginBottom: '10px', opacity: 0.9 }}>
            Upload crop leaf photo or scan directly using camera for instant AI diagnosis:
          </p>
          <button className="btn-secondary" onClick={simulateCameraScan} disabled={isScanning}>
            <Camera size={18} /> {isScanning ? 'AI Scanning Crop Leaf...' : 'Scan Crop Leaf Now'}
          </button>
        </div>

        {scanResult && (
          <div style={{ backgroundColor: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: '12px', padding: '14px', marginBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#15803D', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              <CheckCircle2 size={18} /> AI Scan Diagnosis: {scanResult.crop} - {scanResult.disease} ({scanResult.confidence})
            </div>
            <div style={{ fontSize: '12px', marginTop: '6px', color: '#166534' }}>
              <strong>Remedy:</strong> {scanResult.treatment}
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search crop or disease name (e.g. Cotton, Yellow Rust...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-canvas)', color: 'var(--text-main)', fontSize: '13px' }}
          />
        </div>

        {/* Models List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredDiseases.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDisease(item)}
              style={{
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-canvas)',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>🌱 {item.crop} - {item.disease}</span>
                <span className={`badge ${item.severity === 'Critical' ? 'badge-danger' : item.severity === 'High' ? 'badge-warning' : 'badge-info'}`}>
                  {item.severity}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                <strong>Treatment:</strong> {item.treatment}
              </p>
              <p style={{ fontSize: '11px', color: '#15803D' }}>
                <strong>Prevention:</strong> {item.preventive}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
