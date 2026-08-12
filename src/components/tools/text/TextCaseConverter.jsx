import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function TextCaseConverter() {
  const [text, setText] = useState('Hello world! ToolNestz makes everyday tasks super simple and fun.');

  const convertCase = (type) => {
    if (!text) return;
    let converted = text;
    switch (type) {
      case 'upper':
        converted = text.toUpperCase();
        break;
      case 'lower':
        converted = text.toLowerCase();
        break;
      case 'title':
        converted = text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case 'sentence':
        converted = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        break;
      case 'camel':
        converted = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
        break;
      case 'pascal':
        converted = text.replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase()).replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
        break;
      case 'snake':
        converted = text.toLowerCase().trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        break;
      case 'kebab':
        converted = text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        break;
      case 'constant':
        converted = text.toUpperCase().trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        break;
      case 'alternating':
        converted = text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
        break;
      default:
        break;
    }
    setText(converted);
  };

  return (
    <div className="tool-widget-card">
      <div className="form-group">
        <label className="form-label">Input Text</label>
        <textarea
          className="form-textarea"
          rows={6}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type or paste your text here..."
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.25rem 0' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => convertCase('upper')}>UPPERCASE</button>
        <button className="btn btn-secondary btn-sm" onClick={() => convertCase('lower')}>lowercase</button>
        <button className="btn btn-secondary btn-sm" onClick={() => convertCase('title')}>Title Case</button>
        <button className="btn btn-secondary btn-sm" onClick={() => convertCase('sentence')}>Sentence case</button>
        <button className="btn btn-secondary btn-sm" onClick={() => convertCase('camel')}>camelCase</button>
        <button className="btn btn-secondary btn-sm" onClick={() => convertCase('pascal')}>PascalCase</button>
        <button className="btn btn-secondary btn-sm" onClick={() => convertCase('snake')}>snake_case</button>
        <button className="btn btn-secondary btn-sm" onClick={() => convertCase('kebab')}>kebab-case</button>
        <button className="btn btn-secondary btn-sm" onClick={() => convertCase('constant')}>CONSTANT_CASE</button>
        <button className="btn btn-secondary btn-sm" onClick={() => convertCase('alternating')}>aLtErNaTiNg</button>
      </div>

      <div style={{ textAlign: 'right' }}>
        <CopyButton text={text} label="Copy Transformed Text" />
      </div>
    </div>
  );
}
