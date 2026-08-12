import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

const PRESETS = [
  { label: '16:9 Widescreen', w: 16, h: 9 },
  { label: '4:3 Classic TV', w: 4, h: 3 },
  { label: '1:1 Square', w: 1, h: 1 },
  { label: '9:16 Vertical / Reel', w: 9, h: 16 },
  { label: '21:9 Ultrawide', w: 21, h: 9 }
];

export function AspectRatioCalculator() {
  const [ratioW, setRatioW] = useState('16');
  const [ratioH, setRatioH] = useState('9');
  const [targetWidth, setTargetWidth] = useState('1920');

  const rw = parseFloat(ratioW) || 1;
  const rh = parseFloat(ratioH) || 1;
  const tw = parseFloat(targetWidth) || 0;

  const targetHeight = Math.round((tw * rh) / rw);

  const applyPreset = (w, h) => {
    setRatioW(w.toString());
    setRatioH(h.toString());
  };

  return (
    <div className="tool-widget-card">
      <div className="category-pills" style={{ justifyContent: 'center' }}>
        {PRESETS.map(p => (
          <button key={p.label} className={`pill-btn ${ratioW === p.w.toString() && ratioH === p.h.toString() ? 'active' : ''}`} onClick={() => applyPreset(p.w, p.h)}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', margin: '1.5rem 0' }}>
        <div className="form-group">
          <label className="form-label">Ratio Width (W)</label>
          <input type="number" className="form-input" value={ratioW} onChange={e => setRatioW(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Ratio Height (H)</label>
          <input type="number" className="form-input" value={ratioH} onChange={e => setRatioH(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Known Width (px)</label>
          <input type="number" className="form-input" value={targetWidth} onChange={e => setTargetWidth(e.target.value)} />
        </div>
      </div>

      <div className="output-box" style={{ marginTop: 0, textAlign: 'center' }}>
        <div className="output-box-header">CALCULATED HEIGHT</div>
        <div className="output-value" style={{ fontSize: '2.5rem', color: 'var(--accent-primary)' }}>{targetHeight} px</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Dimension: {tw} × {targetHeight} ({ratioW}:{ratioH})
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <CopyButton text={`${tw}x${targetHeight}`} label="Copy Dimensions" />
        </div>
      </div>

      {/* Visual Aspect Ratio Preview Box */}
      <div style={{ marginTop: '1.5rem' }}>
        <div className="output-box-header" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>VISUAL BOX PREVIEW</div>
        <div className="aspect-preview-container">
          <div className="aspect-preview-box" style={{ aspectRatio: `${rw} / ${rh}` }}>
            {ratioW}:{ratioH} Box
          </div>
        </div>
      </div>
    </div>
  );
}
