import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function LoanCalculator() {
  const [principal, setPrincipal] = useState('250000');
  const [rate, setRate] = useState('6.5');
  const [years, setYears] = useState('30');

  const p = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 12 / 100;
  const n = (parseFloat(years) || 0) * 12;

  let emi = 0;
  if (r > 0 && n > 0) {
    emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else if (n > 0) {
    emi = p / n;
  }

  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;
  const interestPct = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
        <div className="form-group">
          <label className="form-label">Loan Principal Amount ($)</label>
          <input type="number" className="form-input" value={principal} onChange={e => setPrincipal(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Annual Interest Rate (%)</label>
          <input type="number" step="0.1" className="form-input" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Loan Term (Years)</label>
          <input type="number" className="form-input" value={years} onChange={e => setYears(e.target.value)} />
        </div>
      </div>

      <div className="stats-grid" style={{ margin: '1.5rem 0' }}>
        <div className="stat-card">
          <div className="stat-label">Monthly EMI</div>
          <div className="stat-value" style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>${emi.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Interest</div>
          <div className="stat-value" style={{ color: 'var(--accent-pink)' }}>${totalInterest > 0 ? totalInterest.toFixed(2) : '0.00'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Payment</div>
          <div className="stat-value">${totalPayment > 0 ? totalPayment.toFixed(2) : '0.00'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Interest Ratio</div>
          <div className="stat-value">{interestPct.toFixed(1)}%</div>
        </div>
      </div>

      {/* Visual Bar Ratio */}
      <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>PRINCIPAL VS INTEREST BREAKDOWN</div>
        <div style={{ height: '16px', borderRadius: 'var(--radius-full)', background: 'var(--border-color)', display: 'flex', overflow: 'hidden' }}>
          <div style={{ width: `${100 - interestPct}%`, background: 'var(--accent-primary)' }} title="Principal" />
          <div style={{ width: `${interestPct}%`, background: 'var(--accent-pink)' }} title="Interest" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--accent-primary)' }}>Principal: ${p.toLocaleString()}</span>
          <span style={{ color: 'var(--accent-pink)' }}>Interest: ${Math.round(totalInterest).toLocaleString()}</span>
        </div>
      </div>

      <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
        <CopyButton text={`Loan EMI: $${emi.toFixed(2)}/mo | Principal: $${p} | Interest: $${totalInterest.toFixed(2)}`} label="Copy Loan Summary" />
      </div>
    </div>
  );
}
