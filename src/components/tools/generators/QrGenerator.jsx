import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';

export function QrGenerator() {
  const [text, setText] = useState('https://toolnestz.app');
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && text) {
      QRCode.toCanvas(canvasRef.current, text, {
        width: 240,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor
        }
      }, (err) => {
        if (err) console.error('QR code generation error:', err);
      });
    }
  }, [text, fgColor, bgColor]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'toolnestz_qr.png';
    a.click();
  };

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
        <div>
          <div className="form-group">
            <label className="form-label">URL or Text to Encode</label>
            <input type="text" className="form-input" value={text} onChange={e => setText(e.target.value)} placeholder="https://..." />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div className="form-group">
              <label className="form-label">QR Color</label>
              <input type="color" className="form-input" style={{ height: '42px', padding: '0.2rem' }} value={fgColor} onChange={e => setFgColor(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Background</label>
              <input type="color" className="form-input" style={{ height: '42px', padding: '0.2rem' }} value={bgColor} onChange={e => setBgColor(e.target.value)} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: bgColor, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <canvas ref={canvasRef} />
          </div>

          <button className="btn btn-primary" onClick={handleDownload}>
            <Download size={18} /> Download PNG
          </button>
        </div>
      </div>
    </div>
  );
}
