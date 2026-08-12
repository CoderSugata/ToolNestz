import React from 'react';

export function Mascot({ size = 80, mood = 'happy', message = '' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(99, 102, 241, 0.25))', flexShrink: 0 }}
        className="animate-pulse"
      >
        {/* Nest Base */}
        <ellipse cx="60" cy="100" rx="45" ry="14" fill="#d97706" opacity="0.3" />
        <path d="M25 90 C 25 105, 95 105, 95 90 C 95 105, 25 105, 25 90 Z" fill="#b45309" />
        
        {/* Bird Body */}
        <circle cx="60" cy="62" r="36" fill="url(#birdGrad)" />
        {/* Belly */}
        <circle cx="60" cy="68" r="24" fill="#ffffff" opacity="0.9" />

        {/* Cute Eyes */}
        <circle cx="48" cy="54" r="6" fill="#0f172a" />
        <circle cx="72" cy="54" r="6" fill="#0f172a" />
        <circle cx="50" cy="52" r="2.2" fill="#ffffff" />
        <circle cx="74" cy="52" r="2.2" fill="#ffffff" />

        {/* Cute Cheeks */}
        <circle cx="40" cy="62" r="4.5" fill="#ec4899" opacity="0.6" />
        <circle cx="80" cy="62" r="4.5" fill="#ec4899" opacity="0.6" />

        {/* Beak */}
        <polygon points="60,59 53,67 67,67" fill="#f59e0b" />

        {/* Feather Tufts on Head */}
        <path d="M60 26 C 56 16, 50 18, 52 26" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
        <path d="M60 26 C 64 16, 70 18, 68 26" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />

        {/* Wings */}
        <path d="M24 64 C 18 72, 28 82, 34 76" fill="#6366f1" />
        <path d="M96 64 C 102 72, 92 82, 86 76" fill="#6366f1" />

        <defs>
          <linearGradient id="birdGrad" x1="24" y1="26" x2="96" y2="98" gradientUnits="userSpaceOnUse">
            <stop stopColor="#818cf8" />
            <stop offset="1" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      {message && (
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '0.6rem 1rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          boxShadow: 'var(--shadow-sm)',
          position: 'relative'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}
