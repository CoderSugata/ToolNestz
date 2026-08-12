import React from 'react';
import { Sun, Moon, Search, Star, Home, Sparkles } from 'lucide-react';
import { Mascot } from '../common/Mascot';

export function Header({ currentToolId, onNavigateHome, onOpenSearch, isDark, toggleTheme, favoritesCount }) {
  return (
    <header style={{
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0.85rem 1rem'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand Logo */}
        <div
          onClick={onNavigateHome}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
        >
          <Mascot size={38} />
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-cute-pink))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ToolNestz
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              Everyday Tools Hub
            </span>
          </div>
        </div>

        {/* Global Search Bar Trigger */}
        <button className="search-trigger-btn" onClick={onOpenSearch}>
          <Search size={18} />
          <span style={{ fontSize: '0.9rem' }}>Search 35+ tools...</span>
          <span className="shortcut-badge">Ctrl + K</span>
        </button>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {currentToolId && (
            <button className="btn btn-secondary btn-sm" onClick={onNavigateHome}>
              <Home size={16} />
              <span style={{ display: 'none', minWidth: '640px' }}>Dashboard</span>
            </button>
          )}

          {/* Dark / Light Mode Toggle */}
          <button
            className="btn btn-secondary btn-icon"
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {isDark ? <Sun size={18} color="var(--accent-cute-amber)" /> : <Moon size={18} color="var(--accent-primary)" />}
          </button>
        </div>
      </div>
    </header>
  );
}
