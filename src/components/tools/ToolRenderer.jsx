import React from 'react';

// Calculators
import { ScientificCalculator } from './calculators/ScientificCalculator';
import { PercentageCalculator } from './calculators/PercentageCalculator';
import { BmiCalculator } from './calculators/BmiCalculator';
import { TipCalculator } from './calculators/TipCalculator';
import { BillSplitter } from './calculators/BillSplitter';
import { LoanCalculator } from './calculators/LoanCalculator';
import { CompoundInterest } from './calculators/CompoundInterest';

// Converters
import { UnitConverter } from './converters/UnitConverter';
import { CurrencyConverter } from './converters/CurrencyConverter';
import { ColorConverter } from './converters/ColorConverter';
import { SpeedConverter } from './converters/SpeedConverter';

// Date & Time
import { AgeCalculator } from './datetime/AgeCalculator';
import { TimezoneConverter } from './datetime/TimezoneConverter';
import { DateCalculator } from './datetime/DateCalculator';
import { CountdownTimer } from './datetime/CountdownTimer';
import { Stopwatch } from './datetime/Stopwatch';
import { PomodoroTimer } from './datetime/PomodoroTimer';

// Text & Productivity
import { TextCaseConverter } from './text/TextCaseConverter';
import { WordCounter } from './text/WordCounter';
import { LoremIpsumGenerator } from './text/LoremIpsumGenerator';
import { MarkdownPreviewer } from './text/MarkdownPreviewer';
import { DiffChecker } from './text/DiffChecker';

// Generators
import { QrGenerator } from './generators/QrGenerator';
import { PasswordGenerator } from './generators/PasswordGenerator';
import { RandomGenerator } from './generators/RandomGenerator';
import { UuidGenerator } from './generators/UuidGenerator';
import { HashGenerator } from './generators/HashGenerator';

// Developer Tech
import { JsonFormatter } from './tech/JsonFormatter';
import { UrlEncoder } from './tech/UrlEncoder';
import { Base64Encoder } from './tech/Base64Encoder';
import { RegexTester } from './tech/RegexTester';

// Everyday Utilities
import { AspectRatioCalculator } from './everyday/AspectRatioCalculator';
import { DiscountCalculator } from './everyday/DiscountCalculator';
import { FuelCalculator } from './everyday/FuelCalculator';
import { WaterIntakeTracker } from './everyday/WaterIntakeTracker';

const TOOL_COMPONENTS = {
  'scientific-calculator': ScientificCalculator,
  'percentage-calculator': PercentageCalculator,
  'bmi-calculator': BmiCalculator,
  'tip-calculator': TipCalculator,
  'bill-splitter': BillSplitter,
  'loan-calculator': LoanCalculator,
  'compound-interest': CompoundInterest,

  'unit-converter': UnitConverter,
  'currency-converter': CurrencyConverter,
  'color-converter': ColorConverter,
  'speed-converter': SpeedConverter,

  'age-calculator': AgeCalculator,
  'time-zone-converter': TimezoneConverter,
  'date-calculator': DateCalculator,
  'countdown-timer': CountdownTimer,
  'stopwatch': Stopwatch,
  'pomodoro-timer': PomodoroTimer,

  'text-case-converter': TextCaseConverter,
  'word-counter': WordCounter,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'markdown-previewer': MarkdownPreviewer,
  'diff-checker': DiffChecker,

  'qr-generator': QrGenerator,
  'password-generator': PasswordGenerator,
  'random-generator': RandomGenerator,
  'uuid-generator': UuidGenerator,
  'hash-generator': HashGenerator,

  'json-formatter': JsonFormatter,
  'url-encoder': UrlEncoder,
  'base64-encoder': Base64Encoder,
  'regex-tester': RegexTester,

  'aspect-ratio': AspectRatioCalculator,
  'discount-calculator': DiscountCalculator,
  'fuel-calculator': FuelCalculator,
  'water-intake': WaterIntakeTracker
};

export function ToolRenderer({ toolId }) {
  const Component = TOOL_COMPONENTS[toolId];

  if (!Component) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Tool not found or under construction.
      </div>
    );
  }

  return <Component />;
}
