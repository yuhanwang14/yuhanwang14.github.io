// src/data/projects.ts
export interface Project {
  name: string;
  blurb: string;
  technologies: string[];
  bullets: string[];
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    name: 'ASR-Pipeline',
    blurb: 'Local GPU-Accelerated Speech Transcription',
    technologies: ['Python', 'Whisper', 'Speaker Diarization', 'LLM Post-Processing'],
    bullets: [
      'Built a fully local speech transcription pipeline with <strong>speaker diarization</strong> and LLM post-processing, optimized for RTX 4070 Laptop (8GB VRAM).',
      'Handles multilingual meetings (Chinese/English code-switching) with reliable timestamps and speaker separation.',
      '126+ tests with full CI/CD pipeline.',
    ],
    githubUrl: 'https://github.com/yuhanwang14/ASR-Pipeline',
  },
  {
    name: 'Obsidian-Operator',
    blurb: 'AI-Native Workflow Operator',
    technologies: ['Shell', 'Claude Code', 'Obsidian'],
    bullets: [
      'Built an AI-native operator on <strong>Obsidian + Claude Code</strong> with 17 skills for daily briefings, weekly reviews, strategic planning, and knowledge synthesis.',
      'Single <code>/daily-init</code> command triggers AI workflows that pull vault context, review ongoing work, surface deadlines, and structure the day.',
      'Transforms Obsidian from documentation into a personal OS for thinking and execution.',
    ],
    githubUrl: 'https://github.com/yuhanwang14/Obsidian-Operator',
  },
  {
    name: 'Claude-Usage-TUI',
    blurb: 'Terminal Usage Dashboard',
    technologies: ['Rust'],
    bullets: [
      'Built a <strong>btop-style terminal dashboard</strong> for monitoring Claude.ai usage limits in real time.',
      'Provides live tracking of token consumption and rate limits.',
    ],
    githubUrl: 'https://github.com/yuhanwang14/Claude-Usage-TUI',
  },
  {
    name: 'Spatial Historical Intelligence',
    blurb: 'Interactive AI-driven Map',
    technologies: ['React.js', 'Perplexity API'],
    bullets: [
      'Built an interactive <strong>AI-driven map</strong> that reveals on-click historical, cultural, and contextual narratives for any location (<strong>Perplexity API</strong>).',
      'Engineered a structured-query <strong>backend to Perplexity</strong> and parsed responses into geospatial entities for real-time visualization.',
      'Developed correlation mapping and cross-region connections, including life-journey pathing for notable figures across the globe.',
      'Implemented dynamic country comparisons on AI-derived metrics (<strong>economy, culture, innovation</strong>) with responsive data visualizations.',
    ],
  },
  {
    name: 'Zencraft',
    blurb: 'AI-Powered Personal Growth Platform',
    technologies: ['Flutter', 'Go', 'gRPC', 'PostgreSQL'],
    bullets: [
      'Built an AI-powered <strong>personal growth app</strong> delivering context-aware insights and reflection guidance.',
      'Ran iterative user testing to refine prompts and UX for clearer, measurable progress.',
      'Implemented interview-style flows, skills tracking, and personalized storytelling via a <strong>Go/gRPC backend</strong>.',
    ],
  },
  {
    name: 'NPC Trading System',
    blurb: 'Crypto Spot Trading Engine (npcTrading)',
    technologies: ['C++', 'WebSocket/REST', 'Boost.Beast', 'OpenSSL', 'Binance Spot API', 'GoogleTest'],
    bullets: [
      'Built a message-driven <strong>crypto spot trading engine</strong> with a central <strong>MessageBus</strong> (async send/publish, sync request/response, topic subscriptions, bounded queues, run-loop dispatch).',
      'Implemented core runtime state: component lifecycle FSM and an in-memory <strong>cache</strong> for orders/positions/instruments plus latest quote/bar/book with ring-buffer history.',
      'Exposed <strong>Actor/Strategy APIs</strong> for subscriptions, market-data callbacks, and order helpers; emits order lifecycle events (submitted/accepted/rejected/filled).',
      'Integrated Binance Spot market data (WS + REST) and maintained per-instrument <strong>local order books</strong> via depth snapshots + incremental updates.',
    ],
  },
  {
    name: 'Pre-Market Opening Price Anomaly Detector',
    blurb: 'Forecast & Anomaly Detection for Pre-Open Prices',
    technologies: ['Python', 'Quant Finance', 'Backtesting', 'Gradient Boosting'],
    bullets: [
      'Built a leakage-safe <strong>pre-open forecasting pipeline</strong> for opening prices using prior-day and benchmark signals.',
      'Calibrated detection with a <strong>3σ residual threshold</strong>, flagging 1.6% of test days with significant open deviations.',
      'Ensured reproducibility with strict pre-open feature shifts, a chronological split (372 train / 125 test), and diagnostic plots.',
    ],
  },
  {
    name: 'WACC Compiler',
    blurb: 'AArch64 Compiler for the WACC Language',
    technologies: ['Scala', 'Compiler Design'],
    bullets: [
      'Built a compiler for the <strong>WACC language</strong> targeting AArch64 (ARMv8-A), supporting full compilation from source to executable.',
      'Implemented lexical, syntactic, and semantic analysis, ensuring language correctness before code generation.',
      'Developed a code generator that produces <strong>AArch64 assembly</strong>, enabling execution via GCC and QEMU.',
      'Supported language features such as variables, expressions, control flow, functions, and heap memory management.',
      'Integrated robust error detection and type checking to prevent runtime failures.',
    ],
  },
];
