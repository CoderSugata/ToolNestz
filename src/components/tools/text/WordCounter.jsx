import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function WordCounter() {
  const [text, setText] = useState('ToolNestz is a delightful everyday productivity app with over 35 tools! You can calculate, convert, format, generate, and explore with instant privacy.');

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const sentences = trimmed ? (text.match(/[\.\!\?]+/g) || []).length || 1 : 0;
  const paragraphs = trimmed ? text.split(/\n+/).filter(Boolean).length : 0;

  // Reading time (avg 200 wpm) & Speaking time (avg 130 wpm)
  const readingTimeMin = Math.ceil(words / 200);
  const speakingTimeMin = Math.ceil(words / 130);

  // Keyword frequency top 5
  const getTopKeywords = () => {
    if (!trimmed) return [];
    const wordList = trimmed.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    const freqMap = {};
    wordList.forEach(w => {
      if (w.length > 3) freqMap[w] = (freqMap[w] || 0) + 1;
    });
    return Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const topKeywords = getTopKeywords();

  return (
    <div className="tool-widget-card">
      <div className="form-group">
        <label className="form-label">Type or Paste Document Text</label>
        <textarea
          className="form-textarea"
          rows={7}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Start typing or paste text..."
        />
      </div>

      <div className="stats-grid" style={{ margin: '1.5rem 0' }}>
        <div className="stat-card">
          <div className="stat-label">Words</div>
          <div className="stat-value" style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>{words}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Characters (All)</div>
          <div className="stat-value">{charsWithSpaces}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Characters (No Spaces)</div>
          <div className="stat-value">{charsNoSpaces}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Sentences / Paragraphs</div>
          <div className="stat-value">{sentences} / {paragraphs}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>READING TIME</span>
          <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>~{readingTimeMin} min</div>
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>SPEAKING TIME</span>
          <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>~{speakingTimeMin} min</div>
        </div>
      </div>

      {topKeywords.length > 0 && (
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TOP FREQUENT WORDS</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {topKeywords.map(([word, count]) => (
              <span key={word} className="tool-category-badge">
                {word} ({count})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
