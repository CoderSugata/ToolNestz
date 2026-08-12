import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function MarkdownPreviewer() {
  const [mdText, setMdText] = useState(
`# Welcome to ToolNestz 🪹

## Features
- **35+ Essential Tools**: Calculators, Converters, Generators & Tech
- **Simple & Modern UI**: Built for everyone from kids to pros
- *100% Client-Side*: Privacy guaranteed!

### Sample Code
\`\`\`js
const nest = "ToolNestz";
console.log(\`Enjoy \${nest}!\`);
\`\`\`

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci
`
  );

  // Simple Markdown parser for client-side rendering
  const parseMarkdownToHtml = (md) => {
    let html = md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/\n$/gim, '<br />');

    return html.trim();
  };

  const renderedHtml = parseMarkdownToHtml(mdText);

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <div>
          <div className="form-group">
            <label className="form-label">Markdown Input</label>
            <textarea
              className="form-textarea"
              rows={12}
              value={mdText}
              onChange={e => setMdText(e.target.value)}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}
            />
          </div>
        </div>

        <div>
          <div className="output-box-header">LIVE HTML PREVIEW</div>
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1.5px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              minHeight: '260px',
              overflowY: 'auto',
              fontSize: '0.95rem',
              lineHeight: 1.6
            }}
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>

      <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <CopyButton text={renderedHtml} label="Copy HTML Code" />
        <CopyButton text={mdText} label="Copy Markdown" />
      </div>
    </div>
  );
}
