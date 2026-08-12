import React, { useState } from 'react';
import { Droplet, Plus, RotateCcw } from 'lucide-react';
import { CopyButton } from '../../common/CopyButton';

export function WaterIntakeTracker() {
  const [weightKg, setWeightKg] = useState('65');
  const [activityMin, setActivityMin] = useState('30');
  const [glassesLogged, setGlassesLogged] = useState(3);

  const w = parseFloat(weightKg) || 0;
  const act = parseFloat(activityMin) || 0;

  // Formula: ~35ml per kg + 350ml per 30 mins exercise
  const targetMl = Math.round(w * 35 + (act / 30) * 350);
  const targetLiters = (targetMl / 1000).toFixed(1);
  const targetGlasses = Math.ceil(targetMl / 250); // 250ml per glass

  const currentLoggedMl = glassesLogged * 250;
  const progressPct = Math.min(100, Math.round((currentLoggedMl / (targetMl || 1)) * 100));

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
        <div className="form-group">
          <label className="form-label">Body Weight (kg)</label>
          <input type="number" className="form-input" value={weightKg} onChange={e => setWeightKg(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Daily Exercise (Minutes)</label>
          <input type="number" className="form-input" value={activityMin} onChange={e => setActivityMin(e.target.value)} />
        </div>
      </div>

      <div className="output-box" style={{ marginTop: '1.25rem', textAlign: 'center' }}>
        <div className="output-box-header">DAILY HYDRATION GOAL</div>
        <div className="output-value" style={{ fontSize: '2.2rem', color: 'var(--accent-cute-cyan)' }}>
          {targetLiters} Liters ({targetGlasses} Cups)
        </div>
      </div>

      {/* Interactive Water Glass Tracker */}
      <div style={{ margin: '1.5rem 0', background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
          TODAY'S LOGGED WATER ({glassesLogged} / {targetGlasses} Glasses • {progressPct}%)
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', margin: '1rem 0' }}>
          {Array.from({ length: Math.max(targetGlasses, glassesLogged) }).map((_, idx) => (
            <div
              key={idx}
              onClick={() => setGlassesLogged(idx + 1)}
              style={{
                width: '36px',
                height: '44px',
                borderRadius: '6px 6px 12px 12px',
                border: '2px solid var(--accent-cute-cyan)',
                background: idx < glassesLogged ? 'var(--accent-cute-cyan)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={`Glass ${idx + 1}`}
            >
              <Droplet size={18} color={idx < glassesLogged ? '#ffffff' : 'var(--accent-cute-cyan)'} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
          <button className="btn btn-primary btn-sm" onClick={() => setGlassesLogged(prev => prev + 1)}>
            <Plus size={16} /> Drink a Glass (+250ml)
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setGlassesLogged(0)}>
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
