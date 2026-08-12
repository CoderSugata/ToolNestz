import React from 'react';
import { Star } from 'lucide-react';
import * as Icons from 'lucide-react';

export function ToolCard({ tool, isFavorite, onToggleFavorite, onClick }) {
  const IconComponent = Icons[tool.icon] || Icons.Wrench;

  return (
    <div className="tool-card" onClick={onClick}>
      <div className="tool-card-header">
        <div className="tool-icon-wrapper" style={{ background: tool.bg, color: tool.accent }}>
          <IconComponent size={24} />
        </div>
        <button
          className={`fav-btn ${isFavorite ? 'is-favorite' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(tool.id);
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star size={18} fill={isFavorite ? 'var(--accent-amber)' : 'none'} />
        </button>
      </div>

      <div>
        <h3 className="tool-card-title">{tool.title}</h3>
        <p className="tool-card-desc">{tool.description}</p>
      </div>

      <div className="tool-card-footer">
        <span className="tool-category-badge">{tool.category}</span>
        <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>Open Tool →</span>
      </div>
    </div>
  );
}
