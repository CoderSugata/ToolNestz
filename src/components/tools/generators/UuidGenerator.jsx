import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { CopyButton } from '../../common/CopyButton';

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState([]);

  const generateUuidV4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const list = [];
    for (let i = 0; i < count; i++) {
      let uid = generateUuidV4();
      if (!hyphens) uid = uid.replace(/-/g, '');
      if (uppercase) uid = uid.toUpperCase();
      list.push(uid);
    }
    setUuids(list);
  };

  React.useEffect(() => {
    handleGenerate();
  }, [count, uppercase, hyphens]);

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        <div className="form-group">
          <label className="form-label">Batch Quantity: {count}</label>
          <input type="range" min="1" max="25" className="form-input" value={count} onChange={e => setCount(parseInt(e.target.value, 10))} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
            <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} /> UPPERCASE
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
            <input type="checkbox" checked={hyphens} onChange={e => setHyphens(e.target.checked)} /> Include Hyphens (-)
          </label>
        </div>
      </div>

      <div className="output-box" style={{ marginTop: 0 }}>
        <div className="output-box-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>GENERATED UUID (v4)</span>
          <button className="btn btn-secondary btn-sm" onClick={handleGenerate}>
            <RefreshCw size={14} /> Regenerate
          </button>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-primary)', display: 'flex', flexDirection: 'column', gap: '0.3rem', margin: '0.5rem 0' }}>
          {uuids.map((id, idx) => (
            <div key={idx}>{id}</div>
          ))}
        </div>
        <div style={{ textAlign: 'right', marginTop: '0.75rem' }}>
          <CopyButton text={uuids.join('\n')} label="Copy All UUIDs" />
        </div>
      </div>
    </div>
  );
}
