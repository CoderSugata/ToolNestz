import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function PercentageCalculator() {
  const [val1, setVal1] = useState('15');
  const [val2, setVal2] = useState('200');

  // Mode 1: What is X% of Y?
  const res1 = ((parseFloat(val1) || 0) * (parseFloat(val2) || 0)) / 100;

  // Mode 2: X is what % of Y?
  const res2 = (parseFloat(val2) || 0) !== 0 ? (((parseFloat(val1) || 0) / (parseFloat(val2) || 0)) * 100) : 0;

  // Mode 3: % Change from X to Y
  const diff = (parseFloat(val2) || 0) - (parseFloat(val1) || 0);
  const res3 = (parseFloat(val1) || 0) !== 0 ? ((diff / (parseFloat(val1) || 0)) * 100) : 0;

  return (
    <div className="tool-widget-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Box 1: X% of Y */}
      <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>1. What is X% of Y?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Percentage (X %)</label>
            <input type="number" className="form-input" value={val1} onChange={e => setVal1(e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Total Value (Y)</label>
            <input type="number" className="form-input" value={val2} onChange={e => setVal2(e.target.value)} />
          </div>
          <div className="output-box" style={{ marginTop: 0 }}>
            <div className="output-box-header">RESULT</div>
            <div className="output-value" style={{ fontSize: '1.2rem' }}>{res1.toFixed(2)}</div>
            <CopyButton text={res1.toFixed(2)} label="Copy" className="btn-sm" />
          </div>
        </div>
      </div>

      {/* Box 2: X is what % of Y */}
      <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--accent-cute-pink)' }}>2. X is what percent of Y?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          <div className="output-box" style={{ marginTop: 0, gridColumn: 'span 2' }}>
            <div className="output-box-header">{val1} IS WHAT % OF {val2}?</div>
            <div className="output-value" style={{ fontSize: '1.4rem' }}>{res2.toFixed(2)}%</div>
          </div>
          <CopyButton text={`${res2.toFixed(2)}%`} label="Copy %" />
        </div>
      </div>

      {/* Box 3: % Increase / Decrease */}
      <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--accent-cute-teal)' }}>3. Percentage Change (From X to Y)</h3>
        <div className="output-box" style={{ marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="output-box-header">PERCENTAGE DIFFERENCE</div>
            <div className="output-value" style={{ fontSize: '1.4rem', color: res3 >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)' }}>
              {res3 >= 0 ? `+${res3.toFixed(2)}%` : `${res3.toFixed(2)}%`}
            </div>
          </div>
          <CopyButton text={`${res3.toFixed(2)}%`} label="Copy Change" />
        </div>
      </div>
    </div>
  );
}
