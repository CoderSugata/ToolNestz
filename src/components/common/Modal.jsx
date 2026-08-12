import React, { useEffect } from 'react';
import { Search, X, Star } from 'lucide-react';
import * as Icons from 'lucide-react';

export function SearchModal({ isOpen, onClose, searchQuery, setSearchQuery, results, onSelectTool, isFavorite }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-modal-header">
          <Search size={20} className="text-muted" />
          <input
            type="text"
            className="search-modal-input"
            placeholder="Type a tool name or math keyword... (e.g. 'scientific', 'age', 'qr')"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button className="fav-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="search-results-list">
          {results.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No matching tools found for "{searchQuery}". Try another keyword!
            </div>
          ) : (
            results.map(tool => {
              const IconComponent = Icons[tool.icon] || Icons.Wrench;
              return (
                <div
                  key={tool.id}
                  className="search-result-item"
                  onClick={() => {
                    onSelectTool(tool.id);
                    onClose();
                  }}
                >
                  <div className="tool-icon-wrapper" style={{ background: tool.bg, color: tool.accent, width: 40, height: 40 }}>
                    <IconComponent size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {tool.title}
                      {isFavorite(tool.id) && <Star size={14} fill="var(--accent-amber)" color="var(--accent-amber)" />}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{tool.description}</div>
                  </div>
                  <span className="tool-category-badge">{tool.category}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
