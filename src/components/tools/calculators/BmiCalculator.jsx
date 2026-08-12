import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function BmiCalculator() {
  const [unit, setUnit] = useState('metric'); // metric (kg/cm) or imperial (lbs/inch)
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState('male');

  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;

  let bmi = 0;
  if (unit === 'metric' && h > 0) {
    bmi = w / ((h / 100) * (h / 100));
  } else if (unit === 'imperial' && h > 0) {
    bmi = (w / (h * h)) * 703;
  }

  const getBmiStatus = (score) => {
    if (score < 18.5) return { label: 'Underweight', color: '#3b82f6', pos: Math.min(Math.max((score / 40) * 100, 5), 22) };
    if (score <= 24.9) return { label: 'Normal / Healthy', color: '#10b981', pos: Math.min(Math.max((score / 40) * 100, 25), 55) };
    if (score <= 29.9) return { label: 'Overweight', color: '#f59e0b', pos: Math.min(Math.max((score / 40) * 100, 60), 75) };
    return { label: 'Obese', color: '#ef4444', pos: Math.min((score / 40) * 100, 95) };
  };

  const status = getBmiStatus(bmi);

  // BMR (Basal Metabolic Rate) Harris-Benedict formula
  let bmr = 0;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * (unit === 'metric' ? w : w * 0.453592)) + (4.799 * (unit === 'metric' ? h : h * 2.54)) - (5.677 * (parseInt(age) || 25));
  } else {
    bmr = 447.593 + (9.247 * (unit === 'metric' ? w : w * 0.453592)) + (3.098 * (unit === 'metric' ? h : h * 2.54)) - (4.330 * (parseInt(age) || 25));
  }

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button className={`pill-btn ${unit === 'metric' ? 'active' : ''}`} onClick={() => { setUnit('metric'); setWeight('70'); setHeight('175'); }}>Metric (kg, cm)</button>
        <button className={`pill-btn ${unit === 'imperial' ? 'active' : ''}`} onClick={() => { setUnit('imperial'); setWeight('154'); setHeight('69'); }}>Imperial (lbs, inches)</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
        <div className="form-group">
          <label className="form-label">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
          <input type="number" className="form-input" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
          <input type="number" className="form-input" value={height} onChange={e => setHeight(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Age (Years)</label>
          <input type="number" className="form-input" value={age} onChange={e => setAge(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Gender</label>
          <select className="form-select" value={gender} onChange={e => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* Visual BMI Pointer & Gauge */}
      <div style={{ margin: '2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>YOUR BMI SCORE</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: status.color, fontFamily: 'var(--font-mono)' }}>
              {bmi > 0 ? bmi.toFixed(1) : '--'}
            </div>
          </div>
          <div style={{
            background: status.color,
            color: '#ffffff',
            padding: '0.5rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            fontWeight: 800,
            fontSize: '1rem'
          }}>
            {status.label}
          </div>
        </div>

        <div className="bmi-gauge-bar">
          <div className="bmi-pointer" style={{ left: `${status.pos}%` }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          <span>Underweight (&lt;18.5)</span>
          <span>Normal (18.5 - 24.9)</span>
          <span>Overweight (25 - 29.9)</span>
          <span>Obese (30+)</span>
        </div>
      </div>

      {/* BMR Stats */}
      <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-label">Daily BMR Calories</div>
          <div className="stat-value">{Math.round(bmr)} kcal</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Light Activity Calories</div>
          <div className="stat-value">{Math.round(bmr * 1.375)} kcal</div>
        </div>
      </div>
    </div>
  );
}
