import React, { useState } from 'react';

export function DiffChecker() {
  const [text1, setText1] = useState('ToolNestz is a tools hub.\nIt includes calculators.\nFast and easy to use!');
  const [text2, setText2] = useState('ToolNestz is an all-in-one everyday tools hub.\nIt includes calculators & converters.\nFast and super smooth to use!');

  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');

  const maxLines = Math.max(lines1.length, lines2.length);
  const diffs = [];

  for (let i = 0; i < maxLines; i++) {
    const l1 = lines1[i] || '';
    const l2 = lines2[i] || '';

    if (l1 === l2) {
      diffs.push({ line: i + 1, type: 'same', text: l1 });
    } else {
      if (l1) diffs.push({ line: i + 1, type: 'removed', text: l1 });
      if (l2) diffs.push({ line: i + 1, type: 'added', text: l2 });
    }
  }

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="form-group">
          <label className="form-label">Original Text (A)</label>
          <textarea className="form-textarea" rows={5} value={text1} onChange={e => setText1(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Modified Text (B)</label>
          <textarea className="form-textarea" rows={5} value={text2} onChange={e => setText2(e.target.value)} />
        </div>
      </div>

      <div>
        <div className="output-box-header">LINE-BY-LINE DIFFERENCES</div>
        <div style={{ background: 'var(--bg-secondary)', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          {diffs.map((d, idx) => (
            <div
              key={idx}
              style={{
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                background: d.type === 'added' ? 'rgba(16, 185, 129, 0.15)' : d.type === 'removed' ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                color: d.type === 'added' ? 'var(--accent-success)' : d.type === 'removed' ? 'var(--accent-danger)' : 'var(--text-secondary)',
                fontWeight: d.type !== 'same' ? 700 : 400
              }}
            >
              <span style={{ display: 'inline-block', width: '30px', opacity: 0.5 }}>{d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ' '}</span>
              {d.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
