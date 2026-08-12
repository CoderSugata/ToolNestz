import React, { useState } from 'react';
import { Star, RotateCcw, Share2, ArrowLeft, Check } from 'lucide-react';
import * as Icons from 'lucide-react';

export function ToolHeader({ tool, isFavorite, onToggleFavorite, onReset, onBack }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const IconComponent = Icons[tool.icon] || Icons.Wrench;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="tool-view-header">
      <div className="tool-view-title-group">
        <button className="btn btn-secondary btn-icon" onClick={onBack} title="Back to Dashboard">
          <ArrowLeft size={20} />
        </button>
        <div className="tool-view-icon" style={{ background: tool.bg, color: tool.accent }}>
          <IconComponent size={28} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{tool.title}</h1>
            <span className="tool-category-badge">{tool.category}</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            {tool.description}
          </p>
        </div>
      </div>

      <div className="tool-view-actions">
        <button
          className={`btn ${isFavorite ? 'btn-primary' : 'btn-outline'} btn-sm`}
          onClick={onToggleFavorite}
        >
          <Star size={16} fill={isFavorite ? '#ffffff' : 'none'} />
          <span>{isFavorite ? 'Saved' : 'Favorite'}</span>
        </button>

        {onReset && (
          <button className="btn btn-secondary btn-sm" onClick={onReset} title="Reset Form">
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        )}

        <button className="btn btn-secondary btn-sm" onClick={handleShare} title="Share Tool Link">
          {copiedLink ? <Check size={16} color="var(--accent-success)" /> : <Share2 size={16} />}
          <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
        </button>
      </div>
    </div>
  );
}
