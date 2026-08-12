import React, { useState } from 'react';
import { ArrowLeftRight, RefreshCw } from 'lucide-react';
import { CopyButton } from '../../common/CopyButton';

const BASE_RATES_USD = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 155.4,
  INR: 83.5,
  CAD: 1.36,
  AUD: 1.51,
  CHF: 0.90,
  CNY: 7.23,
  BRL: 5.15,
  AED: 3.67,
  SGD: 1.35
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState('100');
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('EUR');
  const [rates, setRates] = useState(BASE_RATES_USD);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Offline Defaults');

  const val = parseFloat(amount) || 0;
  const rateFrom = rates[fromCurr] || 1;
  const rateTo = rates[toCurr] || 1;
  const converted = (val / rateFrom) * rateTo;

  const handleSwap = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };

  const handleFetchLiveRates = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data && data.rates) {
        setRates(data.rates);
        setLastUpdated(`Live (${new Date().toLocaleTimeString()})`);
      }
    } catch (err) {
      console.warn('Unable to fetch live rates, using offline baseline rates.');
      setLastUpdated('Offline Rates');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Status: {lastUpdated}</span>
        <button className="btn btn-secondary btn-sm" onClick={handleFetchLiveRates} disabled={loading}>
          <RefreshCw size={14} className={loading ? 'animate-pulse' : ''} />
          <span>{loading ? 'Refreshing...' : 'Refresh Live Rates'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center' }}>
        <div>
          <div className="form-group">
            <label className="form-label">Amount</label>
            <input type="number" className="form-input" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">From Currency</label>
            <select className="form-select" value={fromCurr} onChange={e => setFromCurr(e.target.value)}>
              {Object.keys(rates).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn btn-secondary btn-icon" onClick={handleSwap} style={{ borderRadius: 'var(--radius-full)' }} title="Swap Currencies">
          <ArrowLeftRight size={18} />
        </button>

        <div>
          <div className="output-box" style={{ marginTop: 0 }}>
            <div className="output-box-header">CONVERTED VALUE</div>
            <div className="output-value" style={{ fontSize: '1.5rem', color: 'var(--accent-success)' }}>
              {converted.toFixed(2)} {toCurr}
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label className="form-label">To Currency</label>
            <select className="form-select" value={toCurr} onChange={e => setToCurr(e.target.value)}>
              {Object.keys(rates).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
        <CopyButton text={`${val} ${fromCurr} = ${converted.toFixed(2)} ${toCurr}`} label="Copy Currency Result" />
      </div>
    </div>
  );
}
