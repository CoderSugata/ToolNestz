import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { CopyButton } from '../../common/CopyButton';

export function CountdownTimer() {
  const [totalSeconds, setTotalSeconds] = useState(300); // 5 mins default
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (soundEnabled) {
        // Simple Web Audio API chime tone
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
          osc.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.8);
        } catch (e) {}
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, soundEnabled]);

  const handleSetPreset = (mins) => {
    setIsRunning(false);
    setTotalSeconds(mins * 60);
    setTimeLeft(mins * 60);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPct = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  return (
    <div className="tool-widget-card">
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.5rem' }}>
        {[1, 3, 5, 10, 15, 25, 30, 60].map(m => (
          <button key={m} className={`pill-btn ${totalSeconds === m * 60 ? 'active' : ''}`} onClick={() => handleSetPreset(m)}>
            {m} {m === 60 ? 'Hour' : 'Min'}
          </button>
        ))}
      </div>

      {/* Visual Ring & Display */}
      <div className="timer-ring-container">
        <div className="timer-display">{formatTime(timeLeft)}</div>

        {/* Progress Bar */}
        <div style={{ width: '100%', maxWidth: '360px', height: '10px', borderRadius: 'var(--radius-full)', background: 'var(--border-color)', overflow: 'hidden', margin: '1rem 0' }}>
          <div style={{ width: `${progressPct}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 1s linear' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
        <button className={`btn ${isRunning ? 'btn-secondary' : 'btn-primary'}`} onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>

        <button className="btn btn-secondary btn-icon" onClick={handleReset} title="Reset Timer">
          <RotateCcw size={20} />
        </button>

        <button className="btn btn-secondary btn-icon" onClick={() => setSoundEnabled(!soundEnabled)} title="Toggle Chime Sound">
          {soundEnabled ? <Volume2 size={20} color="var(--accent-success)" /> : <VolumeX size={20} color="var(--text-muted)" />}
        </button>
      </div>
    </div>
  );
}
