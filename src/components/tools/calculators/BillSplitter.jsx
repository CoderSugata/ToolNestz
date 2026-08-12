import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CopyButton } from '../../common/CopyButton';

export function BillSplitter() {
  const [billTitle, setBillTitle] = useState('Friday Pizza Night');
  const [friends, setFriends] = useState([
    { id: '1', name: 'Alex', amount: 35 },
    { id: '2', name: 'Sam', amount: 25 },
    { id: '3', name: 'Jordan', amount: 40 }
  ]);
  const [tax, setTax] = useState('8.5');
  const [tip, setTip] = useState('15');

  const addFriend = () => {
    setFriends(prev => [...prev, { id: Date.now().toString(), name: `Friend ${prev.length + 1}`, amount: 20 }]);
  };

  const removeFriend = (id) => {
    setFriends(prev => prev.filter(f => f.id !== id));
  };

  const updateFriend = (id, field, val) => {
    setFriends(prev => prev.map(f => f.id === id ? { ...f, [field]: val } : f));
  };

  const subtotal = friends.reduce((sum, f) => sum + (parseFloat(f.amount) || 0), 0);
  const taxPct = parseFloat(tax) || 0;
  const tipPct = parseFloat(tip) || 0;

  const totalTax = (subtotal * taxPct) / 100;
  const totalTip = (subtotal * tipPct) / 100;
  const grandTotal = subtotal + totalTax + totalTip;

  const summaryText = `${billTitle} Breakdown:\n` +
    friends.map(f => {
      const friendShare = (parseFloat(f.amount) || 0) + (((parseFloat(f.amount) || 0) / (subtotal || 1)) * (totalTax + totalTip));
      return `• ${f.name}: $${friendShare.toFixed(2)}`;
    }).join('\n') +
    `\nTotal: $${grandTotal.toFixed(2)}`;

  return (
    <div className="tool-widget-card">
      <div className="form-group">
        <label className="form-label">Event / Bill Title</label>
        <input type="text" className="form-input" value={billTitle} onChange={e => setBillTitle(e.target.value)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
        <div className="form-group">
          <label className="form-label">Tax (%): {tax}%</label>
          <input type="number" className="form-input" value={tax} onChange={e => setTax(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Tip (%): {tip}%</label>
          <input type="number" className="form-input" value={tip} onChange={e => setTip(e.target.value)} />
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Group Members & Subtotals</h4>
          <button className="btn btn-secondary btn-sm" onClick={addFriend}>
            <Plus size={16} /> Add Member
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {friends.map(f => {
            const friendShare = (parseFloat(f.amount) || 0) + (((parseFloat(f.amount) || 0) / (subtotal || 1)) * (totalTax + totalTip));
            return (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-tertiary)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)' }}>
                <input type="text" className="form-input" style={{ flex: 1 }} value={f.name} onChange={e => updateFriend(f.id, 'name', e.target.value)} />
                <input type="number" className="form-input" style={{ width: '100px' }} value={f.amount} onChange={e => updateFriend(f.id, 'amount', e.target.value)} />
                <div style={{ width: '100px', fontWeight: 700, textAlign: 'right', color: 'var(--accent-primary)', fontSize: '0.9rem' }}>
                  ${friendShare.toFixed(2)}
                </div>
                {friends.length > 1 && (
                  <button className="fav-btn" onClick={() => removeFriend(f.id)}>
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="output-box" style={{ marginTop: '1.5rem' }}>
        <div className="output-box-header">SUMMARY BREAKDOWN</div>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
          Grand Total: ${grandTotal.toFixed(2)}
        </div>
        <pre style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
          {summaryText}
        </pre>
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <CopyButton text={summaryText} label="Copy Text Summary" />
        </div>
      </div>
    </div>
  );
}
