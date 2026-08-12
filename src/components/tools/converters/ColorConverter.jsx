import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function ColorConverter() {
  const [hex, setHex] = useState('#6366f1');

  // Convert Hex to RGB
  const hexToRgb = (h) => {
    let cleanHex = h.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    if (cleanHex.length !== 6) return { r: 99, g: 102, b: 241 };
    const num = parseInt(cleanHex, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };

  const rgb = hexToRgb(hex);

  // RGB to HSL
  const rgbToHsl = ({ r, g, b }) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hsl = rgbToHsl(rgb);
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  // Palette variations
  const shades = [15, 30, 45, 60, 75, 90].map(lightness => `hsl(${hsl.h}, ${hsl.s}%, ${lightness}%)`);

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
        <div>
          <div className="form-group">
            <label className="form-label">Pick Color or Type HEX</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="color"
                value={hex.startsWith('#') && hex.length === 7 ? hex : '#6366f1'}
                onChange={e => setHex(e.target.value)}
                style={{ width: '56px', height: '48px', border: 'none', background: 'none', cursor: 'pointer' }}
              />
              <input type="text" className="form-input" value={hex} onChange={e => setHex(e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <div className="output-box" style={{ marginTop: 0, padding: '0.75rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>HEX: </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{hex.toUpperCase()}</span>
                </div>
                <CopyButton text={hex.toUpperCase()} label="Copy" className="btn-sm" />
              </div>
            </div>

            <div className="output-box" style={{ marginTop: 0, padding: '0.75rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>RGB: </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{rgbStr}</span>
                </div>
                <CopyButton text={rgbStr} label="Copy" className="btn-sm" />
              </div>
            </div>

            <div className="output-box" style={{ marginTop: 0, padding: '0.75rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>HSL: </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{hslStr}</span>
                </div>
                <CopyButton text={hslStr} label="Copy" className="btn-sm" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="color-preview-box" style={{ backgroundColor: hex }}>
            <span>{hex.toUpperCase()}</span>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SHADE VARIATIONS</div>
            <div className="palette-grid">
              {shades.map((shade, idx) => (
                <div
                  key={idx}
                  className="palette-swatch"
                  style={{ backgroundColor: shade }}
                  onClick={() => setHex(shade)}
                  title={`Click to select ${shade}`}
                >
                  {shade}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
