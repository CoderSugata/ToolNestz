import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function TipCalculator() {
  const [bill, setBill] = useState('85.00');
  const [tipPercent, setTipPercent] = useState('18');
  const [people, setPeople] = useState('3');
  const [roundUp, setRoundUp] = useState(false);

  const billNum = parseFloat(bill) || 0;
  const tipPct = parseFloat(tipPercent) || 0;
  const numPeople = Math.max(parseInt(people, 10) || 1, 1);

  let rawTip = (billNum * tipPct) / 100;
  let rawTotal = billNum + rawTip;

  if (roundUp) {
    rawTotal = Math.ceil(rawTotal);
    rawTip = rawTotal - billNum;
  }

  const tipPerPerson = rawTip / numPeople;
  const totalPerPerson = rawTotal / numPeople;

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        <div className="form-group">
          <label className="form-label">Bill Amount ($)</label>
          <input type="number" step="0.01" className="form-input" value={bill} onChange={e => setBill(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Number of People</label>
          <input type="number" min="1" className="form-input" value={people} onChange={e => setPeople(e.target.value)} />
        </div>
      </div>

      <div className="form-group" style={{ margin: '1rem 0' }}>
        <label className="form-label">Tip Percentage ({tipPercent}%)</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          {[10, 15, 18, 20, 25].map(pct => (
            <button
              key={pct}
              className={`pill-btn ${parseInt(tipPercent) === pct ? 'active' : ''}`}
              onClick={() => setTipPercent(pct.toString())}
            >
              {pct}%
            </button>
          ))}
        </div>
        <input type="range" min="0" max="50" className="form-input" value={tipPercent} onChange={e => setTipPercent(e.target.value)} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input type="checkbox" id="roundup" checked={roundUp} onChange={e => setRoundUp(e.target.checked)} />
        <label htmlFor="roundup" style={{ fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600 }}>Round total up to nearest dollar</label>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Tip Amount</div>
          <div className="stat-value">${rawTip.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Bill</div>
          <div className="stat-value" style={{ color: 'var(--accent-pink)' }}>${rawTotal.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tip / Person</div>
          <div className="stat-value">${tipPerPerson.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total / Person</div>
          <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>${totalPerPerson.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
        <CopyButton text={`Total: $${rawTotal.toFixed(2)} ($${totalPerPerson.toFixed(2)} per person)`} label="Copy Summary" />
      </div>
    </div>
  );
}
