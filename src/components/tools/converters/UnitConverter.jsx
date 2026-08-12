import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

const UNIT_DATA = {
  length: {
    name: 'Length',
    units: { m: 1, km: 0.001, cm: 100, mm: 1000, inch: 39.3701, ft: 3.28084, yd: 1.09361, mi: 0.000621371 }
  },
  mass: {
    name: 'Mass & Weight',
    units: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274, ton: 0.001 }
  },
  volume: {
    name: 'Volume',
    units: { liter: 1, ml: 1000, cup: 4.22675, pt: 2.11338, gal: 0.264172, floz: 33.814 }
  },
  temperature: {
    name: 'Temperature',
    special: true
  },
  area: {
    name: 'Area',
    units: { sqm: 1, sqkm: 0.000001, sqft: 10.7639, acre: 0.000247105, hectare: 0.0001 }
  },
  storage: {
    name: 'Digital Data Storage',
    units: { B: 1, KB: 1 / 1024, MB: 1 / (1024 ** 2), GB: 1 / (1024 ** 3), TB: 1 / (1024 ** 4) }
  }
};

export function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [amount, setAmount] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');

  const val = parseFloat(amount) || 0;

  const convertValue = () => {
    if (category === 'temperature') {
      if (fromUnit === toUnit) return val;
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return (val * 9 / 5) + 32;
      if (fromUnit === 'fahrenheit' && toUnit === 'celsius') return (val - 32) * 5 / 9;
      if (fromUnit === 'celsius' && toUnit === 'kelvin') return val + 273.15;
      if (fromUnit === 'kelvin' && toUnit === 'celsius') return val - 273.15;
      if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') return ((val - 32) * 5 / 9) + 273.15;
      if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') return ((val - 273.15) * 9 / 5) + 32;
      return val;
    }

    const catObj = UNIT_DATA[category];
    if (!catObj || !catObj.units) return val;
    const baseMeters = val / (catObj.units[fromUnit] || 1);
    const converted = baseMeters * (catObj.units[toUnit] || 1);
    return converted;
  };

  const outputVal = convertValue();

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    if (newCat === 'temperature') {
      setFromUnit('celsius');
      setToUnit('fahrenheit');
    } else {
      const keys = Object.keys(UNIT_DATA[newCat].units);
      setFromUnit(keys[0]);
      setToUnit(keys[1] || keys[0]);
    }
  };

  const getUnitOptions = () => {
    if (category === 'temperature') {
      return [
        { key: 'celsius', label: 'Celsius (°C)' },
        { key: 'fahrenheit', label: 'Fahrenheit (°F)' },
        { key: 'kelvin', label: 'Kelvin (K)' }
      ];
    }
    return Object.keys(UNIT_DATA[category].units).map(u => ({ key: u, label: u }));
  };

  return (
    <div className="tool-widget-card">
      <div className="category-pills">
        {Object.keys(UNIT_DATA).map(catKey => (
          <button
            key={catKey}
            className={`pill-btn ${category === catKey ? 'active' : ''}`}
            onClick={() => handleCategoryChange(catKey)}
          >
            {UNIT_DATA[catKey].name}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
        <div>
          <div className="form-group">
            <label className="form-label">Value</label>
            <input type="number" className="form-input" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">From Unit</label>
            <select className="form-select" value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
              {getUnitOptions().map(u => (
                <option key={u.key} value={u.key}>{u.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="output-box" style={{ marginTop: 0 }}>
            <div className="output-box-header">CONVERTED RESULT</div>
            <div className="output-value" style={{ fontSize: '1.6rem' }}>
              {Number.isInteger(outputVal) ? outputVal : parseFloat(outputVal.toFixed(6))} {toUnit}
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <CopyButton text={`${outputVal.toFixed(4)} ${toUnit}`} label="Copy Output" />
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label className="form-label">To Unit</label>
            <select className="form-select" value={toUnit} onChange={e => setToUnit(e.target.value)}>
              {getUnitOptions().map(u => (
                <option key={u.key} value={u.key}>{u.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
