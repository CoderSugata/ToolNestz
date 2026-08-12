import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function DiscountCalculator() {
  const [price, setPrice] = useState('120.00');
  const [discount, setDiscount] = useState('25');
  const [coupon, setCoupon] = useState('10');
  const [tax, setTax] = useState('8');

  const p = parseFloat(price) || 0;
  const dPct = parseFloat(discount) || 0;
  const cPct = parseFloat(coupon) || 0;
  const tPct = parseFloat(tax) || 0;

  const afterDiscount = p * (1 - dPct / 100);
  const afterCoupon = afterDiscount * (1 - cPct / 100);
  const finalTax = (afterCoupon * tPct) / 100;
  const finalPrice = afterCoupon + finalTax;
  const totalSaved = p - afterCoupon;

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
        <div className="form-group">
          <label className="form-label">Original Price ($)</label>
          <input type="number" step="0.01" className="form-input" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Store Discount (%)</label>
          <input type="number" className="form-input" value={discount} onChange={e => setDiscount(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Extra Coupon (%)</label>
          <input type="number" className="form-input" value={coupon} onChange={e => setCoupon(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Sales Tax (%)</label>
          <input type="number" step="0.1" className="form-input" value={tax} onChange={e => setTax(e.target.value)} />
        </div>
      </div>

      <div className="stats-grid" style={{ margin: '1.5rem 0' }}>
        <div className="stat-card">
          <div className="stat-label">Final Price</div>
          <div className="stat-value" style={{ color: 'var(--accent-success)', fontSize: '1.8rem' }}>${finalPrice.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total You Save</div>
          <div className="stat-value" style={{ color: 'var(--accent-cute-pink)' }}>${totalSaved.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Sales Tax Added</div>
          <div className="stat-value">${finalTax.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <CopyButton text={`Final Price: $${finalPrice.toFixed(2)} (You Save $${totalSaved.toFixed(2)})`} label="Copy Deal Result" />
      </div>
    </div>
  );
}
