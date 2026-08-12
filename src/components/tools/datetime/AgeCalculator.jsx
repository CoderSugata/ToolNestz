import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift } from 'lucide-react';
import { CopyButton } from '../../common/CopyButton';

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('2000-05-15');

  const now = new Date();
  const dob = new Date(birthDate);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getExactAge = () => {
    if (isNaN(dob.getTime())) return null;

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffTime = Math.max(0, now - dob);
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffTime / (1000 * 60));

    // Day of week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayBorn = daysOfWeek[dob.getDay()];

    // Next birthday countdown
    let nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (now > nextBday) {
      nextBday.setFullYear(now.getFullYear() + 1);
    }
    const daysToNextBday = Math.ceil((nextBday - now) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays, totalHours, totalMinutes, dayBorn, daysToNextBday };
  };

  const ageData = getExactAge();

  return (
    <div className="tool-widget-card">
      <div className="form-group" style={{ maxWidth: '320px', margin: '0 auto 1.5rem auto' }}>
        <label className="form-label">Select Your Birth Date</label>
        <input type="date" className="form-input" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
      </div>

      {ageData && (
        <>
          <div className="output-box" style={{ marginTop: 0, textAlign: 'center', padding: '1.5rem' }}>
            <div className="output-box-header">YOUR EXACT AGE</div>
            <div className="output-value" style={{ fontSize: '2.2rem', color: 'var(--accent-cute-pink)' }}>
              {ageData.years} Years, {ageData.months} Months, {ageData.days} Days
            </div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Born on a happy <strong>{ageData.dayBorn}</strong>! 🎉
            </div>
          </div>

          <div style={{ margin: '1.5rem 0', textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={triggerConfetti}>
              <Gift size={18} /> Celebrate Birthday Confetti! 🥳
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Days Lived</div>
              <div className="stat-value">{ageData.totalDays.toLocaleString()}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Hours</div>
              <div className="stat-value">{ageData.totalHours.toLocaleString()}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Minutes</div>
              <div className="stat-value">{ageData.totalMinutes.toLocaleString()}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Next Birthday In</div>
              <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>{ageData.daysToNextBday} Days</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
