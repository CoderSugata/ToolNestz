import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { CopyButton } from '../../common/CopyButton';

const WORDS = ['apple', 'bravo', 'cosmic', 'dragon', 'eagle', 'forest', 'galaxy', 'happy', 'island', 'jungle', 'kitten', 'lemon', 'magic', 'nectar', 'ocean', 'planet', 'rocket', 'sunshine', 'tiger', 'unicorn', 'violet', 'whisper', 'yellow', 'zephyr'];

export function PasswordGenerator() {
  const [mode, setMode] = useState('random'); // random or passphrase
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [wordCount, setWordCount] = useState(4);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    if (mode === 'passphrase') {
      const selectedWords = [];
      for (let i = 0; i < wordCount; i++) {
        const randIdx = Math.floor(Math.random() * WORDS.length);
        selectedWords.push(WORDS[randIdx]);
      }
      setPassword(selectedWords.join('-'));
      return;
    }

    let charset = '';
    if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';

    let res = '';
    for (let i = 0; i < length; i++) {
      const randIdx = Math.floor(Math.random() * charset.length);
      res += charset[randIdx];
    }
    setPassword(res);
  };

  React.useEffect(() => {
    generatePassword();
  }, [mode, length, useUpper, useLower, useNumbers, useSymbols, wordCount]);

  const getStrength = (pwd) => {
    if (pwd.length < 8) return { label: 'Weak', color: '#ef4444', pct: 25 };
    if (pwd.length < 12) return { label: 'Moderate', color: '#f59e0b', pct: 50 };
    if (pwd.length < 16) return { label: 'Strong', color: '#10b981', pct: 75 };
    return { label: 'Very Strong ✨', color: '#6366f1', pct: 100 };
  };

  const strength = getStrength(password);

  return (
    <div className="tool-widget-card">
      <div className="category-pills" style={{ justifyContent: 'center' }}>
        <button className={`pill-btn ${mode === 'random' ? 'active' : ''}`} onClick={() => setMode('random')}>Random Characters</button>
        <button className={`pill-btn ${mode === 'passphrase' ? 'active' : ''}`} onClick={() => setMode('passphrase')}>Memorable Passphrase</button>
      </div>

      <div className="output-box" style={{ marginTop: 0, textAlign: 'center', padding: '1.25rem' }}>
        <div className="output-box-header">GENERATED PASSWORD</div>
        <div className="output-value" style={{ fontSize: '1.6rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
          {password}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={generatePassword}>
            <RefreshCw size={14} /> Regenerate
          </button>
          <CopyButton text={password} label="Copy Password" className="btn-sm" />
        </div>
      </div>

      {/* Strength Bar */}
      <div style={{ margin: '1.25rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          <span>SECURITY STRENGTH</span>
          <span style={{ color: strength.color }}>{strength.label}</span>
        </div>
        <div style={{ height: '8px', borderRadius: 'var(--radius-full)', background: 'var(--border-color)', overflow: 'hidden' }}>
          <div style={{ width: `${strength.pct}%`, height: '100%', background: strength.color, transition: 'width 0.3s ease' }} />
        </div>
      </div>

      {mode === 'random' ? (
        <div>
          <div className="form-group">
            <label className="form-label">Password Length: {length} characters</label>
            <input type="range" min="6" max="48" className="form-input" value={length} onChange={e => setLength(parseInt(e.target.value, 10))} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
              <input type="checkbox" checked={useUpper} onChange={e => setUseUpper(e.target.checked)} /> Uppercase (A-Z)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
              <input type="checkbox" checked={useLower} onChange={e => setUseLower(e.target.checked)} /> Lowercase (a-z)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
              <input type="checkbox" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} /> Numbers (0-9)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
              <input type="checkbox" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} /> Symbols (!@#$)
            </label>
          </div>
        </div>
      ) : (
        <div className="form-group">
          <label className="form-label">Number of Words: {wordCount}</label>
          <input type="range" min="3" max="7" className="form-input" value={wordCount} onChange={e => setWordCount(parseInt(e.target.value, 10))} />
        </div>
      )}
    </div>
  );
}
