import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

const CITIES = [
  { name: 'London (UTC / GMT)', zone: 'Europe/London', flag: '🇬🇧' },
  { name: 'New York (EDT / EST)', zone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Los Angeles (PDT / PST)', zone: 'America/Los_Angeles', flag: '🇺🇸' },
  { name: 'Paris / Berlin (CEST)', zone: 'Europe/Paris', flag: '🇪🇺' },
  { name: 'Dubai (GST)', zone: 'Asia/Dubai', flag: '🇦🇪' },
  { name: 'India (IST)', zone: 'Asia/Kolkata', flag: '🇮🇳' },
  { name: 'Tokyo (JST)', zone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Sydney (AEST)', zone: 'Australia/Sydney', flag: '🇦🇺' }
];

export function TimezoneConverter() {
  const [baseDate, setBaseDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 16);
  });

  const selectedDate = new Date(baseDate);

  const formatCityTime = (timeZone) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(selectedDate);
    } catch (e) {
      return 'Invalid timezone';
    }
  };

  return (
    <div className="tool-widget-card">
      <div className="form-group" style={{ maxWidth: '340px', margin: '0 auto 1.5rem auto' }}>
        <label className="form-label">Reference Date & Time</label>
        <input type="datetime-local" className="form-input" value={baseDate} onChange={e => setBaseDate(e.target.value)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {CITIES.map(city => (
          <div key={city.zone} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{city.flag} {city.name}</span>
              <CopyButton text={`${city.name}: ${formatCityTime(city.zone)}`} label="Copy" className="btn-sm" />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              {formatCityTime(city.zone)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
