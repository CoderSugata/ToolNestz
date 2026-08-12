import React, { useState, useEffect } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function HashGenerator() {
  const [inputText, setInputText] = useState('ToolNestz 🪹');
  const [hashes, setHashes] = useState({ sha256: '', sha512: '', sha1: '' });

  useEffect(() => {
    const computeHashes = async () => {
      if (!inputText) {
        setHashes({ sha256: '', sha512: '', sha1: '' });
        return;
      }
      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);

      const hash256 = await crypto.subtle.digest('SHA-256', data);
      const hash512 = await crypto.subtle.digest('SHA-512', data);
      const hash1 = await crypto.subtle.digest('SHA-1', data);

      const hex = (buffer) => Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');

      setHashes({
        sha256: hex(hash256),
        sha512: hex(hash512),
        sha1: hex(hash1)
      });
    };

    computeHashes();
  }, [inputText]);

  return (
    <div className="tool-widget-card">
      <div className="form-group">
        <label className="form-label">Input String</label>
        <textarea className="form-textarea" rows={4} value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Type text to hash..." />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.25rem' }}>
        <div className="output-box" style={{ marginTop: 0 }}>
          <div className="output-box-header">SHA-256 HASH</div>
          <div className="output-value" style={{ fontSize: '0.95rem' }}>{hashes.sha256}</div>
          <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
            <CopyButton text={hashes.sha256} label="Copy SHA-256" className="btn-sm" />
          </div>
        </div>

        <div className="output-box" style={{ marginTop: 0 }}>
          <div className="output-box-header">SHA-1 HASH</div>
          <div className="output-value" style={{ fontSize: '0.95rem' }}>{hashes.sha1}</div>
          <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
            <CopyButton text={hashes.sha1} label="Copy SHA-1" className="btn-sm" />
          </div>
        </div>

        <div className="output-box" style={{ marginTop: 0 }}>
          <div className="output-box-header">SHA-512 HASH</div>
          <div className="output-value" style={{ fontSize: '0.85rem' }}>{hashes.sha512}</div>
          <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
            <CopyButton text={hashes.sha512} label="Copy SHA-512" className="btn-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
