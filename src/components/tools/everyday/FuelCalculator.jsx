import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function FuelCalculator() {
  const [distance, setDistance] = useState('450'); // in km
  const [efficiency, setEfficiency] = useState('7.5'); // L/100km
  const [pricePerUnit, setPricePerUnit] = useState('1.65'); // $ per liter
  const [passengers, setPassengers] = useState('3');

  const dist = parseFloat(distance) || 0;
  const eff = parseFloat(efficiency) || 0;
  const price = parseFloat(pricePerUnit) || 0;
  const numPassengers = Math.max(parseInt(passengers, 10) || 1, 1);

  const totalFuelVolume = (dist / 100) * eff;
  const totalCost = totalFuelVolume * price;
  const costPerPerson = totalCost / numPassengers;

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
        <div className="form-group">
          <label className="form-label">Trip Distance (km)</label>
          <input type="number" className="form-input" value={distance} onChange={e => setDistance(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Fuel Efficiency (L/100km)</label>
          <input type="number" step="0.1" className="form-input" value={efficiency} onChange={e => setEfficiency(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Gas Price ($/Liter)</label>
          <input type="number" step="0.01" className="form-input" value={pricePerUnit} onChange={e => setPricePerUnit(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Passengers</label>
          <input type="number" min="1" className="form-input" value={passengers} onChange={e => setPassengers(e.target.value)} />
        </div>
      </div>

      <div className="stats-grid" style={{ margin: '1.5rem 0' }}>
        <div className="stat-card">
          <div className="stat-label">Total Gas Cost</div>
          <div className="stat-value" style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>${totalCost.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Fuel Needed</div>
          <div className="stat-value">{totalFuelVolume.toFixed(1)} Liters</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cost Per Person</div>
          <div className="stat-value" style={{ color: 'var(--accent-success)' }}>${costPerPerson.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <CopyButton text={`Trip Fuel Cost: $${totalCost.toFixed(2)} ($${costPerPerson.toFixed(2)} per person)`} label="Copy Fuel Summary" />
      </div>
    </div>
  );
}
