export const TOOLS = [
  // 1. CALCULATORS (7)
  {
    id: 'scientific-calculator',
    title: 'Scientific Calculator',
    description: 'Full scientific math calculator with trig, log, pi, roots, memory & history.',
    category: 'calculators',
    icon: 'Calculator',
    accent: 'var(--accent-pink)',
    bg: 'var(--accent-pink-light)',
    tags: ['math', 'calculator', 'trig', 'sin', 'cos', 'log', 'pi', 'square root', 'numbers'],
    tip: 'Press keys on screen or use your physical keyboard to do math fast!'
  },
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Calculate X% of Y, percentage increase/decrease, ratios, and reverse percentage.',
    category: 'calculators',
    icon: 'Percent',
    accent: 'var(--accent-teal)',
    bg: 'var(--accent-teal-light)',
    tags: ['percent', 'math', 'ratio', 'discount', 'increase', 'decrease', 'growth'],
    tip: 'Great for math homework, sales, and finding discounts!'
  },
  {
    id: 'bmi-calculator',
    title: 'BMI & Health Calculator',
    description: 'Check Body Mass Index, target healthy weight range, and daily BMR calorie intake.',
    category: 'calculators',
    icon: 'Activity',
    accent: 'var(--accent-amber)',
    bg: 'var(--accent-amber-light)',
    tags: ['health', 'bmi', 'weight', 'height', 'fitness', 'calories', 'bmr'],
    tip: 'Supports both Metric (kg/cm) and Imperial (lbs/inches) units!'
  },
  {
    id: 'tip-calculator',
    title: 'Tip & Gratuity Calculator',
    description: 'Quick tip percentage solver with per-person bill split and round-up helper.',
    category: 'calculators',
    icon: 'DollarSign',
    accent: 'var(--accent-cyan)',
    bg: 'var(--accent-cyan-light)',
    tags: ['tip', 'restaurant', 'food', 'dinning', 'split', 'gratuity', 'bill'],
    tip: 'Tap quick tip presets (15%, 18%, 20%) to calculate in seconds.'
  },
  {
    id: 'bill-splitter',
    title: 'Quick Bill Splitter',
    description: 'Split group bills fairly with custom shares, tax, tip allocation & summary.',
    category: 'calculators',
    icon: 'Receipt',
    accent: 'var(--accent-rose)',
    bg: 'var(--accent-rose-light)',
    tags: ['bill', 'split', 'friends', 'dinner', 'expense', 'share', 'money'],
    tip: 'Copy the friendly text summary to paste straight into your group chat!'
  },
  {
    id: 'loan-calculator',
    title: 'Mortgage & EMI Loan Calculator',
    description: 'Calculate monthly loan EMI payments, total interest cost, and breakdown chart.',
    category: 'calculators',
    icon: 'Home',
    accent: 'var(--accent-primary)',
    bg: 'var(--accent-primary-light)',
    tags: ['loan', 'mortgage', 'emi', 'interest', 'bank', 'finance', 'house', 'car'],
    tip: 'Adjust principal and interest to see how much monthly payment changes.'
  },
  {
    id: 'compound-interest',
    title: 'Compound Interest Growth',
    description: 'Calculate savings investment growth over time with regular monthly deposits.',
    category: 'calculators',
    icon: 'TrendingUp',
    accent: 'var(--accent-teal)',
    bg: 'var(--accent-teal-light)',
    tags: ['invest', 'savings', 'interest', 'compound', 'wealth', 'stock', 'bank'],
    tip: 'Compounding works like magic over long years!'
  },

  // 2. CONVERTERS (4)
  {
    id: 'unit-converter',
    title: 'Universal Unit Converter',
    description: 'Convert Length, Mass, Volume, Temp, Area, Speed, Energy & Storage units.',
    category: 'converters',
    icon: 'ArrowLeftRight',
    accent: 'var(--accent-teal)',
    bg: 'var(--accent-teal-light)',
    tags: ['convert', 'unit', 'meter', 'feet', 'kg', 'lb', 'celsius', 'fahrenheit', 'liter', 'gallon'],
    tip: 'Switch categories using the dropdown menu above.'
  },
  {
    id: 'currency-converter',
    title: 'Instant Currency Converter',
    description: 'Convert 30+ major world currencies with manual rates & live refresh rates.',
    category: 'converters',
    icon: 'Coins',
    accent: 'var(--accent-amber)',
    bg: 'var(--accent-amber-light)',
    tags: ['currency', 'money', 'usd', 'eur', 'gbp', 'inr', 'jpy', 'forex', 'exchange'],
    tip: '100% offline ready with customizable baseline conversion rates!'
  },
  {
    id: 'color-converter',
    title: 'Color Studio & Palette',
    description: 'HEX, RGB, HSL, CMYK, CSS color formats converter with contrast checker.',
    category: 'converters',
    icon: 'Palette',
    accent: 'var(--accent-pink)',
    bg: 'var(--accent-pink-light)',
    tags: ['color', 'hex', 'rgb', 'hsl', 'cmyk', 'design', 'palette', 'picker', 'contrast'],
    tip: 'Click any swatch to copy its HEX code instantly.'
  },
  {
    id: 'speed-converter',
    title: 'Speed & Running Pace Converter',
    description: 'Convert km/h, mph, m/s, knots, and running pace (min/km, min/mile).',
    category: 'converters',
    icon: 'Zap',
    accent: 'var(--accent-cyan)',
    bg: 'var(--accent-cyan-light)',
    tags: ['speed', 'pace', 'kmh', 'mph', 'running', 'marathon', 'jogging', 'knots'],
    tip: 'Includes estimated completion times for 5k, 10k, half & full marathons!'
  },

  // 3. DATE & TIME (6)
  {
    id: 'age-calculator',
    title: 'Exact Age Calculator',
    description: 'Calculate your exact age in years, months, days, total hours & birthday countdown!',
    category: 'datetime',
    icon: 'Gift',
    accent: 'var(--accent-rose)',
    bg: 'var(--accent-rose-light)',
    tags: ['age', 'birthday', 'days', 'years', 'born', 'date', 'celebration', 'confetti'],
    tip: 'Celebrates your special day with celebratory confetti!'
  },
  {
    id: 'time-zone-converter',
    title: 'World Timezone Converter',
    description: 'Compare local times across major world cities and timezones effortlessly.',
    category: 'datetime',
    icon: 'Globe',
    accent: 'var(--accent-primary)',
    bg: 'var(--accent-primary-light)',
    tags: ['timezone', 'world time', 'utc', 'gmt', 'city', 'travel', 'clock'],
    tip: 'Move the slider to see what time it will be around the globe.'
  },
  {
    id: 'date-calculator',
    title: 'Date Difference & Add/Sub',
    description: 'Find exact days between two dates or add/subtract days, weeks, months.',
    category: 'datetime',
    icon: 'Calendar',
    accent: 'var(--accent-amber)',
    bg: 'var(--accent-amber-light)',
    tags: ['date', 'calendar', 'difference', 'days between', 'add days', 'subtract days'],
    tip: 'Great for tracking project deadlines or countdowns to vacation!'
  },
  {
    id: 'countdown-timer',
    title: 'Event Countdown & Alarm',
    description: 'Circular visual progress countdown timer for study, cooking, or events.',
    category: 'datetime',
    icon: 'Hourglass',
    accent: 'var(--accent-cyan)',
    bg: 'var(--accent-cyan-light)',
    tags: ['timer', 'countdown', 'alarm', 'clock', 'cook', 'event', 'ring'],
    tip: 'Turn on audio chime so you hear a bell when time finishes!'
  },
  {
    id: 'stopwatch',
    title: 'Precision Stopwatch & Laps',
    description: 'Millisecond accurate stopwatch with lap recording and CSV export.',
    category: 'datetime',
    icon: 'Timer',
    accent: 'var(--accent-teal)',
    bg: 'var(--accent-teal-light)',
    tags: ['stopwatch', 'laps', 'race', 'time', 'milliseconds', 'sport', 'run'],
    tip: 'Press Spacebar to Start/Pause and L key to record a lap!'
  },
  {
    id: 'pomodoro-timer',
    title: 'Pomodoro Focus Companion',
    description: 'Productivity focus timer with 25m work / 5m break cycles & sound alerts.',
    category: 'datetime',
    icon: 'Brain',
    accent: 'var(--accent-pink)',
    bg: 'var(--accent-pink-light)',
    tags: ['pomodoro', 'focus', 'study', 'work', 'productivity', 'break', 'task'],
    tip: 'Work for 25 mins, then enjoy a refreshing 5 min break!'
  },

  // 4. TEXT & PRODUCTIVITY (5)
  {
    id: 'text-case-converter',
    title: 'Text Case Converter',
    description: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case.',
    category: 'text',
    icon: 'Type',
    accent: 'var(--accent-cyan)',
    bg: 'var(--accent-cyan-light)',
    tags: ['text', 'case', 'uppercase', 'lowercase', 'titlecase', 'camelcase', 'snakecase', 'kebabcase'],
    tip: 'Transform entire paragraphs with 1-click preset buttons!'
  },
  {
    id: 'word-counter',
    title: 'Word & Character Counter',
    description: 'Real-time word, character, sentence, paragraph, reading time & keyword counter.',
    category: 'text',
    icon: 'FileText',
    accent: 'var(--accent-teal)',
    bg: 'var(--accent-teal-light)',
    tags: ['words', 'characters', 'counter', 'reading time', 'paragraphs', 'essay', 'keywords'],
    tip: 'Paste your draft essay to check word count limits instantly.'
  },
  {
    id: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum & Dummy Text Generator',
    description: 'Generate classic Lorem Ipsum, Emoji Ipsum, Foodie Ipsum & Cat Ipsum placeholder text.',
    category: 'text',
    icon: 'Smile',
    accent: 'var(--accent-rose)',
    bg: 'var(--accent-rose-light)',
    tags: ['lorem', 'ipsum', 'dummy text', 'placeholder', 'generator', 'emoji', 'cat', 'food'],
    tip: 'Try Foodie or Emoji Ipsum for a fun placeholder text experience!'
  },
  {
    id: 'markdown-previewer',
    title: 'Markdown Live Editor',
    description: 'Side-by-side Markdown editor with live rendered HTML preview & copy HTML.',
    category: 'text',
    icon: 'FileCode',
    accent: 'var(--accent-primary)',
    bg: 'var(--accent-primary-light)',
    tags: ['markdown', 'md', 'html', 'preview', 'editor', 'documentation', 'notes'],
    tip: 'Type Markdown on the left and see formatted output on the right.'
  },
  {
    id: 'diff-checker',
    title: 'Text Diff & Comparator',
    description: 'Compare two blocks of text side-by-side to highlight added/removed lines.',
    category: 'text',
    icon: 'Split',
    accent: 'var(--accent-amber)',
    bg: 'var(--accent-amber-light)',
    tags: ['diff', 'compare', 'text difference', 'code compare', 'changes', 'lines'],
    tip: 'Great for comparing updated document drafts or code snippets.'
  },

  // 5. GENERATORS (5)
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    description: 'Create QR codes for links, text, Wi-Fi details with custom colors & PNG download.',
    category: 'generators',
    icon: 'QrCode',
    accent: 'var(--accent-rose)',
    bg: 'var(--accent-rose-light)',
    tags: ['qr', 'qrcode', 'barcode', 'link', 'url', 'download', 'wifi', 'custom color'],
    tip: 'Customize foreground and background colors before saving as PNG!'
  },
  {
    id: 'password-generator',
    title: 'Strong Password Generator',
    description: 'Generate secure random passwords or memorable passphrases with strength meter.',
    category: 'generators',
    icon: 'ShieldCheck',
    accent: 'var(--accent-teal)',
    bg: 'var(--accent-teal-light)',
    tags: ['password', 'passphrase', 'security', 'random', 'generator', 'pin', 'strong'],
    tip: 'Use passphrase mode for passwords that are easy to remember but hard to guess!'
  },
  {
    id: 'random-generator',
    title: 'Random Number & Decision Picker',
    description: 'Pick random numbers in range, select item from list, flip coins & roll dice.',
    category: 'generators',
    icon: 'Dices',
    accent: 'var(--accent-amber)',
    bg: 'var(--accent-amber-light)',
    tags: ['random', 'picker', 'dice', 'coin', 'flip', 'number', 'wheel', 'decision'],
    tip: 'Can’t decide what to eat for dinner? Type your options into the item picker!'
  },
  {
    id: 'uuid-generator',
    title: 'UUID / GUID Generator',
    description: 'Batch generate v4 UUID strings with uppercase, lowercase, and hyphens toggles.',
    category: 'generators',
    icon: 'Fingerprint',
    accent: 'var(--accent-primary)',
    bg: 'var(--accent-primary-light)',
    tags: ['uuid', 'guid', 'v4', 'random id', 'unique', 'identifier', 'developer'],
    tip: 'Generate up to 50 UUIDs at once with single-click bulk copy!'
  },
  {
    id: 'hash-generator',
    title: 'Cryptographic Hash Generator',
    description: 'Generate SHA-256, SHA-512, SHA-1, and MD5 cryptographic hashes client-side.',
    category: 'generators',
    icon: 'Key',
    accent: 'var(--accent-cyan)',
    bg: 'var(--accent-cyan-light)',
    tags: ['hash', 'sha256', 'sha512', 'md5', 'sha1', 'crypto', 'checksum', 'security'],
    tip: 'Processed entirely inside your browser using Web Crypto API.'
  },

  // 6. DEVELOPER / TECH UTILITIES (4)
  {
    id: 'json-formatter',
    title: 'JSON Formatter & Validator',
    description: 'Beautify, minify, validate, and inspect JSON tree structure with syntax highlighting.',
    category: 'tech',
    icon: 'Code',
    accent: 'var(--accent-primary)',
    bg: 'var(--accent-primary-light)',
    tags: ['json', 'formatter', 'beautify', 'minify', 'validate', 'syntax', 'tree', 'code'],
    tip: 'Pinpoints exact line numbers if your JSON string has syntax errors.'
  },
  {
    id: 'url-encoder',
    title: 'URL Encoder & Decoder',
    description: 'Encode special characters into web-safe URL formats or decode URI components.',
    category: 'tech',
    icon: 'Link',
    accent: 'var(--accent-pink)',
    bg: 'var(--accent-pink-light)',
    tags: ['url', 'uri', 'encode', 'decode', 'web', 'link', 'percent encoding'],
    tip: 'Safe for converting query strings and URL parameters.'
  },
  {
    id: 'base64-encoder',
    title: 'Base64 Encoder & Decoder',
    description: 'Convert text or image files into Base64 format strings and decode them back.',
    category: 'tech',
    icon: 'Binary',
    accent: 'var(--accent-teal)',
    bg: 'var(--accent-teal-light)',
    tags: ['base64', 'encode', 'decode', 'binary', 'string', 'image base64', 'data uri'],
    tip: 'Drop an image file to generate its data:image base64 URI!'
  },
  {
    id: 'regex-tester',
    title: 'Regex Matcher & Tester',
    description: 'Test regular expression patterns in real-time with flags, highlights & group details.',
    category: 'tech',
    icon: 'SearchCode',
    accent: 'var(--accent-amber)',
    bg: 'var(--accent-amber-light)',
    tags: ['regex', 'regexp', 'match', 'pattern', 'test', 'replace', 'flags', 'groups'],
    tip: 'Toggle flags (g, i, m) to customize your regular expression test.'
  },

  // 7. EVERYDAY UTILITIES (4)
  {
    id: 'aspect-ratio',
    title: 'Aspect Ratio Calculator',
    description: 'Calculate missing dimensions for 16:9, 4:3, 1:1, 9:16 with visual preview box.',
    category: 'everyday',
    icon: 'Maximize2',
    accent: 'var(--accent-pink)',
    bg: 'var(--accent-pink-light)',
    tags: ['aspect ratio', 'width', 'height', '16:9', '4:3', 'image resize', 'screen', 'video'],
    tip: 'Type a target width to find the exact proportional height.'
  },
  {
    id: 'discount-calculator',
    title: 'Discount & Sales Savings',
    description: 'Calculate original price, sale discount %, coupon % off, tax & net savings.',
    category: 'everyday',
    icon: 'Tag',
    accent: 'var(--accent-cyan)',
    bg: 'var(--accent-cyan-light)',
    tags: ['discount', 'sale', 'savings', 'shopping', 'price', 'coupon', 'tax', 'deal'],
    tip: 'Stack extra coupon percentages on top of store discounts!'
  },
  {
    id: 'fuel-calculator',
    title: 'Fuel Cost & Trip Splitter',
    description: 'Calculate trip fuel volume needed, total gas money cost & per-passenger share.',
    category: 'everyday',
    icon: 'Fuel',
    accent: 'var(--accent-amber)',
    bg: 'var(--accent-amber-light)',
    tags: ['fuel', 'gas', 'trip', 'road trip', 'car', 'mpg', 'liters', 'cost', 'passenger'],
    tip: 'Supports both liters/100km and MPG efficiency calculations.'
  },
  {
    id: 'water-intake',
    title: 'Daily Hydration & Water Tracker',
    description: 'Find your target daily water intake based on weight & activity with glass logger.',
    category: 'everyday',
    icon: 'Droplet',
    accent: 'var(--accent-cyan)',
    bg: 'var(--accent-cyan-light)',
    tags: ['water', 'hydration', 'health', 'daily intake', 'glasses', 'tracker', 'drink'],
    tip: 'Click the water glass icons to log your daily water progress!'
  }
];
