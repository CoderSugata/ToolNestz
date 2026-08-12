import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function SpeedConverter() {
  const [speed, setSpeed] = useState('10'); // in km/h

  const kmh = parseFloat(speed) || 0;
  const mph = kmh * 0.621371;
  const ms = kmh / 3.6;
  const knots = kmh * 0.539957;

  // Running Pace (min/km and min/mile)
  const paceMinKm = kmh > 0 ? 60 / kmh : 0;
  const paceMinMile = mph > 0 ? 60 / mph : 0;

  const formatPace = (minDecimal) => {
    if (minDecimal <= 0) return '0:00';
    const mins = Math.floor(minDecimal);
    const secs = Math.round((minDecimal - mins) * 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const time5k = kmh > 0 ? formatPace((5 / kmh) * 60) : '0:00';
  const time10k = kmh > 0 ? formatPace((10 / kmh) * 60) : '0:00';
  const timeHalf = kmh > 0 ? formatPace((21.0975 / kmh) * 60) : '0:00';
  const timeFull = kmh > 0 ? formatPace((42.195 / kmh) * 60) : '0:00';

  return (
    <div className="tool-widget-card">
      <div className="form-group" style={{ maxWidth: '300px', margin: '0 auto 1.5rem auto' }}>
        <label className="form-label">Speed in km/h</label>
        <input type="number" className="form-input" value={speed} onChange={e => setSpeed(e.target.value)} />
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Miles Per Hour</div>
          <div className="stat-value">{mph.toFixed(2)} mph</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Meters Per Second</div>
          <div className="stat-value">{ms.toFixed(2)} m/s</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Knots</div>
          <div className="stat-value">{knots.toFixed(2)} kts</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pace (min / km)</div>
          <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>{formatPace(paceMinKm)} /km</div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          ESTIMATED RUNNING RACE TIMES
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>5k Race</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-cute-pink)' }}>{time5k}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>10k Race</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-cute-pink)' }}>{time10k}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Half Marathon</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-cute-teal)' }}>{timeHalf}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Marathon</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-primary)' }}>{timeFull}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
