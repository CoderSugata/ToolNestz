import React, { useState, useEffect } from 'react';
import { CopyButton } from '../../common/CopyButton';

export function ScientificCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState([]);

  const handleAppend = (val) => {
    setExpression(prev => prev + val);
  };

  const handleClear = () => {
    setExpression('');
    setResult('0');
  };

  const handleBackspace = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const calculateFactorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  const handleEvaluate = () => {
    if (!expression) return;
    try {
      let sanitized = expression
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');

      // Handle factorials (e.g. 5!)
      sanitized = sanitized.replace(/(\d+)!/g, (match, p1) => {
        return calculateFactorial(parseInt(p1, 10));
      });

      // eslint-disable-next-line no-new-func
      const evalRes = Function('"use strict"; return (' + sanitized + ')')();
      const formatted = Number.isInteger(evalRes) ? evalRes.toString() : parseFloat(evalRes.toFixed(8)).toString();
      setResult(formatted);
      setHistory(prev => [{ expr: expression, res: formatted }, ...prev.slice(0, 4)]);
    } catch (err) {
      setResult('Error');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') handleAppend(e.key);
      else if (['+', '-', '*', '/', '.', '(', ')'].includes(e.key)) handleAppend(e.key);
      else if (e.key === 'Enter') handleEvaluate();
      else if (e.key === 'Backspace') handleBackspace();
      else if (e.key === 'Escape') handleClear();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression]);

  return (
    <div className="tool-widget-card">
      <div className="calc-display">
        <div className="calc-history">{expression || '0'}</div>
        <div className="calc-current">{result}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <span>Memory: {memory}</span>
        <CopyButton text={result} label="Copy Result" />
      </div>

      {/* Calculator Buttons Grid */}
      <div className="calc-grid calc-grid-sci">
        <button className="calc-btn calc-btn-action" onClick={() => setMemory(0)}>MC</button>
        <button className="calc-btn calc-btn-action" onClick={() => setExpression(memory.toString())}>MR</button>
        <button className="calc-btn calc-btn-action" onClick={() => setMemory(prev => prev + parseFloat(result || '0'))}>M+</button>
        <button className="calc-btn calc-btn-action" onClick={() => setMemory(prev => prev - parseFloat(result || '0'))}>M-</button>
        <button className="calc-btn calc-btn-action" onClick={handleClear}>C</button>

        <button className="calc-btn" onClick={() => handleAppend('sin(')}>sin</button>
        <button className="calc-btn" onClick={() => handleAppend('cos(')}>cos</button>
        <button className="calc-btn" onClick={() => handleAppend('tan(')}>tan</button>
        <button className="calc-btn" onClick={() => handleAppend('log(')}>log</button>

        <button className="calc-btn calc-btn-action" onClick={handleBackspace}>⌫</button>

        <button className="calc-btn" onClick={() => handleAppend('ln(')}>ln</button>
        <button className="calc-btn" onClick={() => handleAppend('√(')}>√</button>
        <button className="calc-btn" onClick={() => handleAppend('^')}>x^y</button>
        <button className="calc-btn" onClick={() => handleAppend('!')}>x!</button>
        <button className="calc-btn calc-btn-op" onClick={() => handleAppend('/')}>÷</button>

        <button className="calc-btn" onClick={() => handleAppend('π')}>π</button>
        <button className="calc-btn" onClick={() => handleAppend('7')}>7</button>
        <button className="calc-btn" onClick={() => handleAppend('8')}>8</button>
        <button className="calc-btn" onClick={() => handleAppend('9')}>9</button>
        <button className="calc-btn calc-btn-op" onClick={() => handleAppend('*')}>×</button>

        <button className="calc-btn" onClick={() => handleAppend('e')}>e</button>
        <button className="calc-btn" onClick={() => handleAppend('4')}>4</button>
        <button className="calc-btn" onClick={() => handleAppend('5')}>5</button>
        <button className="calc-btn" onClick={() => handleAppend('6')}>6</button>
        <button className="calc-btn calc-btn-op" onClick={() => handleAppend('-')}>-</button>

        <button className="calc-btn" onClick={() => handleAppend('(')}>(</button>
        <button className="calc-btn" onClick={() => handleAppend('1')}>1</button>
        <button className="calc-btn" onClick={() => handleAppend('2')}>2</button>
        <button className="calc-btn" onClick={() => handleAppend('3')}>3</button>
        <button className="calc-btn calc-btn-op" onClick={() => handleAppend('+')}>+</button>

        <button className="calc-btn" onClick={() => handleAppend(')')}>)</button>
        <button className="calc-btn" onClick={() => handleAppend('0')}>0</button>
        <button className="calc-btn" onClick={() => handleAppend('.')}>.</button>
        <button className="calc-btn calc-btn-equal" onClick={handleEvaluate}>=</button>
      </div>

      {history.length > 0 && (
        <div style={{ marginTop: '1.5rem', borderTop: '1px dashed var(--border-color)', paddingTop: '1rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>RECENT CALCULATIONS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
            {history.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>{item.expr}</span>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>= {item.res}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
