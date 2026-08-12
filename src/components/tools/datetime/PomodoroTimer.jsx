import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Brain, Coffee, Sparkles } from 'lucide-react';

const MODES = {
  work: { label: 'Focus Work', duration: 25 * 60, color: 'var(--accent-primary)', icon: Brain },
  shortBreak: { label: 'Short Break', duration: 5 * 60, color: 'var(--accent-success)', icon: Coffee },
  longBreak: { label: 'Long Break', duration: 15 * 60, color: 'var(--accent-cute-pink)', icon: Sparkles }
};

export function PomodoroTimer() {
  const [currentMode, setCurrentMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(MODES.work.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [taskName, setTaskName] = useState('Study / Deep Work Task');

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (currentMode === 'work') {
        setSessionsCompleted(prev => prev + 1);
        setCurrentMode('shortBreak');
        setTimeLeft(MODES.shortBreak.duration);
      } else {
        setCurrentMode('work');
        setTimeLeft(MODES.work.duration);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, currentMode]);

  const switchMode = (modeKey) => {
    setIsRunning(false);
    setCurrentMode(modeKey);
    setTimeLeft(MODES[modeKey].duration);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const ActiveIcon = MODES[currentMode].icon;

  return (
    <div className="tool-widget-card">
      <div className="category-pills" style={{ justifyContent: 'center' }}>
        {Object.keys(MODES).map(modeKey => (
          <button
            key={modeKey}
            className={`pill-btn ${currentMode === modeKey ? 'active' : ''}`}
            onClick={() => switchMode(modeKey)}
          >
            {MODES[modeKey].label}
          </button>
        ))}
      </div>

      <div className="form-group" style={{ maxWidth: '360px', margin: '0 auto 1.5rem auto' }}>
        <input
          type="text"
          className="form-input"
          placeholder="What are you focusing on?"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          style={{ textAlign: 'center', fontWeight: 600 }}
        />
      </div>

      <div className="timer-ring-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: MODES[currentMode].color, fontWeight: 700 }}>
          <ActiveIcon size={24} />
          <span>{MODES[currentMode].label}</span>
        </div>

        <div className="timer-display" style={{ color: MODES[currentMode].color }}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1.5rem 0' }}>
        <button className={`btn ${isRunning ? 'btn-secondary' : 'btn-primary'}`} onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
        </button>

        <button className="btn btn-secondary btn-icon" onClick={() => switchMode(currentMode)} title="Reset Cycle">
          <RotateCcw size={20} />
        </button>
      </div>

      <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>
        🍅 Pomodoro Sessions Completed Today: <strong style={{ color: 'var(--accent-primary)' }}>{sessionsCompleted}</strong>
      </div>
    </div>
  );
}
