import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function UrlEncoder() {
  const [input, setInput] = useState('https://toolnestz.app/search?query=scientific calculator & date=2026!');
  const [mode, setMode] = useState('encode'); // encode or decode

  const getResult = () => {
    try {
      if (mode === 'encode') return encodeURIComponent(input);
      return decodeURIComponent(input);
    } catch (e) {
      return 'Invalid URI string';
    }
  };

  const output = getResult();

  return (
    <div className="tool-widget-card">
      <div className="category-pills" style={{ justifyContent: 'center' }}>
        <button className={`pill-btn ${mode === 'encode' ? 'active' : ''}`} onClick={() => setMode('encode')}>URL Encode</button>
        <button className={`pill-btn ${mode === 'decode' ? 'active' : ''}`} onClick={() => setMode('decode')}>URL Decode</button>
      </div>

      <div className="form-group">
        <label className="form-label">Input URL String</label>
        <textarea className="form-textarea" rows={4} value={input} onChange={e => setInput(e.target.value)} />
      </div>

      <div className="output-box" style={{ marginTop: '1.25rem' }}>
        <div className="output-box-header">{mode === 'encode' ? 'ENCODED URL' : 'DECODED URL'}</div>
        <div className="output-value" style={{ fontSize: '1rem', wordBreak: 'break-all' }}>{output}</div>
        <div style={{ textAlign: 'right', marginTop: '0.75rem' }}>
          <CopyButton text={output} label="Copy Result" />
        </div>
      </div>
    </div>
  );
}
