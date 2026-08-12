import React, { useState } from 'react';
import { Sparkles, Dices } from 'lucide-react';
import { CopyButton } from '../../common/CopyButton';

export function RandomGenerator() {
  const [tab, setTab] = useState('number'); // number, picker, coin, dice
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [numResult, setNumResult] = useState('42');

  // Item Picker
  const [items, setItems] = useState('Pizza\nSushi\nTacos\nBurger\nSalad');
  const [pickedItem, setPickedItem] = useState('');

  // Coin Flip
  const [coinSide, setCoinSide] = useState('Heads 🪙');

  // Dice Roll
  const [diceSides, setDiceSides] = useState(6);
  const [diceResult, setDiceResult] = useState(6);

  const generateRandomNum = () => {
    const minN = parseInt(min, 10) || 0;
    const maxN = parseInt(max, 10) || 100;
    const res = Math.floor(Math.random() * (maxN - minN + 1)) + minN;
    setNumResult(res.toString());
  };

  const handlePickItem = () => {
    const list = items.split('\n').map(i => i.trim()).filter(Boolean);
    if (list.length === 0) return;
    const randIdx = Math.floor(Math.random() * list.length);
    setPickedItem(list[randIdx]);
  };

  const handleFlipCoin = () => {
    const sides = ['Heads 🪙', 'Tails 🪙'];
    setCoinSide(sides[Math.floor(Math.random() * 2)]);
  };

  const handleRollDice = (sides) => {
    setDiceSides(sides);
    setDiceResult(Math.floor(Math.random() * sides) + 1);
  };

  return (
    <div className="tool-widget-card">
      <div className="category-pills" style={{ justifyContent: 'center' }}>
        <button className={`pill-btn ${tab === 'number' ? 'active' : ''}`} onClick={() => setTab('number')}>Random Number</button>
        <button className={`pill-btn ${tab === 'picker' ? 'active' : ''}`} onClick={() => setTab('picker')}>Decision Picker</button>
        <button className={`pill-btn ${tab === 'coin' ? 'active' : ''}`} onClick={() => setTab('coin')}>Coin Flip</button>
        <button className={`pill-btn ${tab === 'dice' ? 'active' : ''}`} onClick={() => setTab('dice')}>Dice Roller</button>
      </div>

      {tab === 'number' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Min Value</label>
              <input type="number" className="form-input" value={min} onChange={e => setMin(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Max Value</label>
              <input type="number" className="form-input" value={max} onChange={e => setMax(e.target.value)} />
            </div>
          </div>

          <div className="output-box" style={{ marginTop: 0, textAlign: 'center' }}>
            <div className="output-box-header">RANDOM NUMBER</div>
            <div className="output-value" style={{ fontSize: '3rem', color: 'var(--accent-primary)' }}>{numResult}</div>
            <div style={{ marginTop: '1rem' }}>
              <button className="btn btn-primary" onClick={generateRandomNum}>
                <Sparkles size={18} /> Generate Number
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === 'picker' && (
        <div>
          <div className="form-group">
            <label className="form-label">Enter Options (One per line)</label>
            <textarea className="form-textarea" rows={5} value={items} onChange={e => setItems(e.target.value)} />
          </div>

          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <button className="btn btn-primary" onClick={handlePickItem}>
              <Sparkles size={18} /> Pick Random Item!
            </button>
          </div>

          {pickedItem && (
            <div className="output-box" style={{ textAlign: 'center' }}>
              <div className="output-box-header">SELECTED WINNER</div>
              <div className="output-value" style={{ fontSize: '2rem', color: 'var(--accent-pink)' }}>{pickedItem}</div>
            </div>
          )}
        </div>
      )}

      {tab === 'coin' && (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{coinSide}</div>
          <button className="btn btn-primary" onClick={handleFlipCoin}>
            Flip Coin 🪙
          </button>
        </div>
      )}

      {tab === 'dice' && (
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
            {[4, 6, 8, 10, 12, 20].map(sides => (
              <button key={sides} className={`pill-btn ${diceSides === sides ? 'active' : ''}`} onClick={() => handleRollDice(sides)}>
                D{sides}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
            🎲 {diceResult}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Rolled D{diceSides}</p>
        </div>
      )}
    </div>
  );
}
