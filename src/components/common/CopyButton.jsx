import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyButton({ text, label = 'Copy', className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`btn ${copied ? 'btn-primary' : 'btn-secondary'} btn-sm ${className}`}
      title="Copy to clipboard"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      <span>{copied ? 'Copied!' : label}</span>
    </button>
  );
}
