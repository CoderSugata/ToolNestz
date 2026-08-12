import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function DateCalculator() {
  const [mode, setMode] = useState('diff'); // diff or addsub
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-12-25');

  // Add / Subtract state
  const [baseDate, setBaseDate] = useState('2026-08-12');
  const [amount, setAmount] = useState('30');
  const [unit, setUnit] = useState('days'); // days, weeks, months, years
  const [operation, setOperation] = useState('add'); // add or sub

  // Mode 1 calculation
  const d1 = new Date(startDate);
  const d2 = new Date(endDate);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = (diffDays / 7).toFixed(1);

  // Business days
  const countBusinessDays = (start, end) => {
    let count = 0;
    const cur = new Date(Math.min(start, end));
    const target = new Date(Math.max(start, end));
    while (cur < target) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) count++;
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  };

  const bDays = countBusinessDays(d1, d2);

  // Mode 2 calculation
  const getCalculatedDate = () => {
    const d = new Date(baseDate);
    const num = (parseInt(amount, 10) || 0) * (operation === 'add' ? 1 : -1);

    if (unit === 'days') d.setDate(d.getDate() + num);
    else if (unit === 'weeks') d.setDate(d.getDate() + (num * 7));
    else if (unit === 'months') d.setMonth(d.getMonth() + num);
    else if (unit === 'years') d.setFullYear(d.getFullYear() + num);

    return d.toDateString();
  };

  return (
    <div className="tool-widget-card">
      <div className="category-pills" style={{ justifyContent: 'center' }}>
        <button className={`pill-btn ${mode === 'diff' ? 'active' : ''}`} onClick={() => setMode('diff')}>Date Difference</button>
        <button className={`pill-btn ${mode === 'addsub' ? 'active' : ''}`} onClick={() => setMode('addsub')}>Add or Subtract Days</button>
      </div>

      {mode === 'diff' ? (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input type="date" className="form-input" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input type="date" className="form-input" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className="stats-grid" style={{ margin: '1.5rem 0' }}>
            <div className="stat-card">
              <div className="stat-label">Total Days</div>
              <div className="stat-value" style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>{diffDays} Days</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Business Days</div>
              <div className="stat-value">{bDays} Days</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Weeks</div>
              <div className="stat-value">{diffWeeks} Weeks</div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input type="date" className="form-input" value={baseDate} onChange={e => setBaseDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Action</label>
              <select className="form-select" value={operation} onChange={e => setOperation(e.target.value)}>
                <option value="add">Add (+)</option>
                <option value="sub">Subtract (-)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Amount</label>
              <input type="number" className="form-input" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Unit</label>
              <select className="form-select" value={unit} onChange={e => setUnit(e.target.value)}>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>

          <div className="output-box" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <div className="output-box-header">RESULTING DATE</div>
            <div className="output-value" style={{ fontSize: '1.8rem', color: 'var(--accent-success)' }}>
              {getCalculatedDate()}
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <CopyButton text={getCalculatedDate()} label="Copy Date" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
