import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function CompoundInterest() {
  const [initial, setInitial] = useState('5000');
  const [monthly, setMonthly] = useState('200');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('10');
  const [frequency, setFrequency] = useState('12'); // 12 = monthly, 1 = yearly, 365 = daily

  const P = parseFloat(initial) || 0;
  const PMT = parseFloat(monthly) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const t = parseFloat(years) || 0;
  const n = parseInt(frequency, 10) || 12;

  // Compound calculation year by year
  let totalSaved = P;
  let totalDeposited = P;

  for (let year = 1; year <= t; year++) {
    for (let period = 1; period <= n; period++) {
      totalSaved += PMT * (12 / n);
      totalDeposited += PMT * (12 / n);
      totalSaved *= (1 + r / n);
    }
  }

  const totalInterest = Math.max(0, totalSaved - totalDeposited);

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.25rem' }}>
        <div className="form-group">
          <label className="form-label">Initial Deposit ($)</label>
          <input type="number" className="form-input" value={initial} onChange={e => setInitial(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Monthly Deposit ($)</label>
          <input type="number" className="form-input" value={monthly} onChange={e => setMonthly(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Annual Interest Rate (%)</label>
          <input type="number" step="0.1" className="form-input" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Years of Growth</label>
          <input type="number" className="form-input" value={years} onChange={e => setYears(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Compounding Interval</label>
          <select className="form-select" value={frequency} onChange={e => setFrequency(e.target.value)}>
            <option value="12">Monthly</option>
            <option value="1">Annually</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>

      <div className="stats-grid" style={{ margin: '1.5rem 0' }}>
        <div className="stat-card">
          <div className="stat-label">Future Balance</div>
          <div className="stat-value" style={{ color: 'var(--accent-success)', fontSize: '1.8rem' }}>${Math.round(totalSaved).toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Contributions</div>
          <div className="stat-value">${Math.round(totalDeposited).toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Interest Earned</div>
          <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>${Math.round(totalInterest).toLocaleString()}</div>
        </div>
      </div>

      <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
        <CopyButton text={`Future Wealth: $${Math.round(totalSaved).toLocaleString()} | Total Interest: $${Math.round(totalInterest).toLocaleString()}`} label="Copy Savings Projection" />
      </div>
    </div>
  );
}
