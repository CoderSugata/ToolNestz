import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function Base64Encoder() {
  const [inputText, setInputText] = useState('ToolNestz 🪹 Everyday Tools Hub');
  const [mode, setMode] = useState('encode'); // encode or decode
  const [imgBase64, setImgBase64] = useState('');

  const getResult = () => {
    try {
      if (mode === 'encode') return btoa(unescape(encodeURIComponent(inputText)));
      return decodeURIComponent(escape(atob(inputText)));
    } catch (e) {
      return 'Invalid Base64 string';
    }
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImgBase64(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const output = getResult();

  return (
    <div className="tool-widget-card">
      <div className="category-pills" style={{ justifyContent: 'center' }}>
        <button className={`pill-btn ${mode === 'encode' ? 'active' : ''}`} onClick={() => setMode('encode')}>Text Encode</button>
        <button className={`pill-btn ${mode === 'decode' ? 'active' : ''}`} onClick={() => setMode('decode')}>Text Decode</button>
        <button className={`pill-btn ${mode === 'image' ? 'active' : ''}`} onClick={() => setMode('image')}>Image to Base64</button>
      </div>

      {mode !== 'image' ? (
        <div>
          <div className="form-group">
            <label className="form-label">{mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}</label>
            <textarea className="form-textarea" rows={4} value={inputText} onChange={e => setInputText(e.target.value)} />
          </div>

          <div className="output-box" style={{ marginTop: '1.25rem' }}>
            <div className="output-box-header">{mode === 'encode' ? 'BASE64 ENCODED RESULT' : 'DECODED PLAIN TEXT'}</div>
            <div className="output-value" style={{ fontSize: '0.95rem', wordBreak: 'break-all' }}>{output}</div>
            <div style={{ textAlign: 'right', marginTop: '0.75rem' }}>
              <CopyButton text={output} label="Copy Output" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label className="form-label">Upload Image File</label>
            <input type="file" accept="image/*" className="form-input" onChange={handleImageFile} />
          </div>

          {imgBase64 && (
            <div>
              <div style={{ margin: '1rem 0', textAlign: 'center' }}>
                <img src={imgBase64} alt="Preview" style={{ maxHeight: '150px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }} />
              </div>
              <div className="output-box">
                <div className="output-box-header">DATA URI BASE64</div>
                <textarea className="form-textarea" rows={4} readOnly value={imgBase64} style={{ background: 'transparent', border: 'none' }} />
                <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                  <CopyButton text={imgBase64} label="Copy Data URI" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
