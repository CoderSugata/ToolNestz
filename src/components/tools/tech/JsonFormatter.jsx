import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState('{"name":"ToolNestz","version":1,"awesome":true,"tags":["tools","everyday","privacy"]}');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, indent);
      setJsonInput(formatted);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setJsonInput(minified);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="tool-widget-card">
      <div className="form-group">
        <label className="form-label">Input / Output JSON</label>
        <textarea
          className="form-textarea"
          rows={10}
          value={jsonInput}
          onChange={e => { setJsonInput(e.target.value); setError(''); }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}
        />
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--accent-danger)', color: 'var(--accent-danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
          ⚠️ JSON Syntax Error: {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <select className="form-select" style={{ width: '120px' }} value={indent} onChange={e => setIndent(parseInt(e.target.value, 10))}>
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
          </select>
          <button className="btn btn-primary btn-sm" onClick={formatJson}>Format / Beautify</button>
          <button className="btn btn-secondary btn-sm" onClick={minifyJson}>Minify</button>
        </div>

        <CopyButton text={jsonInput} label="Copy JSON" />
      </div>
    </div>
  );
}
