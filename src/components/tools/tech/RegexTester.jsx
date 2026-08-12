import React, { useState } from 'react';

export function RegexTester() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('Contact us at hello@toolnestz.com or support@nest.io for help!');

  let matches = [];
  let regexError = '';

  try {
    if (pattern) {
      const reg = new RegExp(pattern, flags);
      matches = Array.from(testText.matchAll(reg));
    }
  } catch (err) {
    regexError = err.message;
  }

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '1rem', marginBottom: '1.25rem' }}>
        <div className="form-group">
          <label className="form-label">Regex Pattern</label>
          <input type="text" className="form-input" value={pattern} onChange={e => setPattern(e.target.value)} style={{ fontFamily: 'var(--font-mono)' }} />
        </div>
        <div className="form-group">
          <label className="form-label">Flags (g, i, m)</label>
          <input type="text" className="form-input" value={flags} onChange={e => setFlags(e.target.value)} style={{ fontFamily: 'var(--font-mono)' }} />
        </div>
      </div>

      {regexError && (
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--accent-danger)', color: 'var(--accent-danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
          ⚠️ Regex Error: {regexError}
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Test String</label>
        <textarea className="form-textarea" rows={4} value={testText} onChange={e => setTestText(e.target.value)} />
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <div className="output-box-header">MATCH RESULTS ({matches.length} MATCHES FOUND)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
          {matches.map((m, idx) => (
            <div key={idx} style={{ background: 'var(--bg-tertiary)', padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{m[0]}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Index: {m.index}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
