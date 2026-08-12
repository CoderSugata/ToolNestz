import React from 'react';
import { Heart, ShieldCheck, Zap } from 'lucide-react';

export function Footer({ onSelectCategory }) {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '2.5rem 1rem 1.5rem 1rem',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
              ToolNestz 🪹
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Your cute, fast, and secure everyday tools hub. 35+ client-side calculators, converters, generators, and productivity utilities.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
              Categories
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => onSelectCategory('calculators')}>Calculators</span>
              <span style={{ cursor: 'pointer' }} onClick={() => onSelectCategory('converters')}>Converters</span>
              <span style={{ cursor: 'pointer' }} onClick={() => onSelectCategory('datetime')}>Date & Time</span>
              <span style={{ cursor: 'pointer' }} onClick={() => onSelectCategory('text')}>Text & Words</span>
              <span style={{ cursor: 'pointer' }} onClick={() => onSelectCategory('generators')}>Generators</span>
              <span style={{ cursor: 'pointer' }} onClick={() => onSelectCategory('tech')}>Developer Utilities</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
              Privacy & Performance
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="var(--accent-success)" />
                <span>100% Client-Side Privacy</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={16} color="var(--accent-cute-amber)" />
                <span>Instant Offline Calculations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={16} color="var(--accent-cute-pink)" />
                <span>Child-Friendly & Simple UI</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span>© {new Date().getFullYear()} ToolNestz. Made with ❤️ by</span>
            <a
              href="https://github.com/CoderSugata"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--accent-primary)',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              Sugata Mondal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
