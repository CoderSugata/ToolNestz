import React, { useState } from 'react';
import { CopyButton } from '../../common/CopyButton';

const THEMES = {
  classic: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ],
  emoji: [
    "✨ Happy vibes 🚀 spark joy 🌈 sunshine sprinkles 🦄 unicorn dreams ⭐ stellar bright!",
    "🎉 Party balloon 🍩 sweet donut 🍦 ice cream smile 🎈 floating high 🎨 color magic!",
    "🧁 Cupcake sweetness 🌸 blossom spring 🐥 cute chick 🍕 pizza slice 🌟 shining bright!",
    "🍓 Strawberry sweet 🎈 celebration 🚀 blast off 🤖 robot buddy 🎨 artistic fun!"
  ],
  foodie: [
    "Crispy golden french fries dipped in truffle mayo, paired with a juicy artisanal cheeseburger on toasted brioche.",
    "Creamy avocado toast topped with poached eggs, chili flakes, microgreens, and a drizzle of balsamic glaze.",
    "Freshly baked sourdough bread with melted garlic butter, wood-fired margherita pizza, and basil leaves.",
    "Warm chocolate lava cake served with vanilla bean ice cream and freshly brewed espresso coffee."
  ],
  cat: [
    "Meow meow purr purr scratch the sofa, zoomies at 3 AM, nap in sunny spot on the carpet.",
    "Groom paws, headbutt human for treats, knock water glass off the table, purr softly.",
    "Tail flick, stare intensely at invisible wall ghost, curl into tiny fuzzy donut bowl.",
    "Chirp at birds outside the window, demand wet food immediately, stretch long fluffy belly."
  ]
};

export function LoremIpsumGenerator() {
  const [theme, setTheme] = useState('classic');
  const [count, setCount] = useState(3);

  const paragraphs = Array.from({ length: count }, (_, i) => {
    const list = THEMES[theme];
    return list[i % list.length];
  }).join('\n\n');

  return (
    <div className="tool-widget-card">
      <div className="category-pills">
        <button className={`pill-btn ${theme === 'classic' ? 'active' : ''}`} onClick={() => setTheme('classic')}>Classic Lorem</button>
        <button className={`pill-btn ${theme === 'emoji' ? 'active' : ''}`} onClick={() => setTheme('emoji')}>✨ Emoji Ipsum</button>
        <button className={`pill-btn ${theme === 'foodie' ? 'active' : ''}`} onClick={() => setTheme('foodie')}>🍔 Foodie Ipsum</button>
        <button className={`pill-btn ${theme === 'cat' ? 'active' : ''}`} onClick={() => setTheme('cat')}>🐱 Cat Ipsum</button>
      </div>

      <div className="form-group" style={{ maxWidth: '200px', margin: '0 auto 1.5rem auto' }}>
        <label className="form-label">Paragraph Count: {count}</label>
        <input type="range" min="1" max="10" className="form-input" value={count} onChange={e => setCount(parseInt(e.target.value, 10))} />
      </div>

      <div className="output-box" style={{ marginTop: 0 }}>
        <div className="output-box-header">GENERATED DUMMY TEXT</div>
        <textarea
          className="form-textarea"
          rows={8}
          readOnly
          value={paragraphs}
          style={{ background: 'transparent', border: 'none', padding: 0 }}
        />
        <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
          <CopyButton text={paragraphs} label="Copy Text" />
        </div>
      </div>
    </div>
  );
}
