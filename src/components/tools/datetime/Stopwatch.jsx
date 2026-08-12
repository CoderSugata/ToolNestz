import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flag, Download } from 'lucide-react';
import { CopyButton } from '../../common/CopyButton';

export function Stopwatch() {
  const [timeMs, setTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeMs(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleRecordLap = () => {
    if (timeMs === 0) return;
    const lastLapTime = laps.length > 0 ? laps[0].rawMs : 0;
    const lapSplit = timeMs - lastLapTime;
    setLaps(prev => [{ num: prev.length + 1, rawMs: timeMs, splitMs: lapSplit }, ...prev]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeMs(0);
    setLaps([]);
  };

  const formatTimeStr = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milli = Math.floor((ms % 1000) / 10);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milli < 10 ? '0' : ''}${milli}`;
  };

  const exportLapsCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Lap,Total Time,Split Time\n" +
      laps.map(l => `${l.num},${formatTimeStr(l.rawMs)},${formatTimeStr(l.splitMs)}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "stopwatch_laps.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="tool-widget-card">
      <div className="timer-display" style={{ color: 'var(--accent-primary)' }}>
        {formatTimeStr(timeMs)}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1.5rem 0' }}>
        <button className={`btn ${isRunning ? 'btn-secondary' : 'btn-primary'}`} onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>

        <button className="btn btn-secondary" onClick={handleRecordLap} disabled={!isRunning && timeMs === 0}>
          <Flag size={20} />
          <span>Lap</span>
        </button>

        <button className="btn btn-secondary btn-icon" onClick={handleReset} title="Reset Stopwatch">
          <RotateCcw size={20} />
        </button>
      </div>

      {laps.length > 0 && (
        <div style={{ marginTop: '1.5rem', borderTop: '1px dashed var(--border-color)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>RECORDED LAPS ({laps.length})</h4>
            <button className="btn btn-secondary btn-sm" onClick={exportLapsCSV}>
              <Download size={14} /> Export CSV
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '200px', overflowY: 'auto' }}>
            {laps.map(lap => (
              <div key={lap.num} style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: 700 }}>Lap {lap.num}</span>
                <span style={{ color: 'var(--text-secondary)' }}>Split: +{formatTimeStr(lap.splitMs)}</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{formatTimeStr(lap.rawMs)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
