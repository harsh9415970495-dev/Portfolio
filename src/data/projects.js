export const projects = [
  {
    id: "nummp",
    title: "NUMMP (National Unified Material Master Platform)",
    tag: "SIH / AI / NLP / Enterprise Engineering",
    description: "AI-driven standardization and harmonization of material codes across CPSEs.",
    problem: "Inconsistent material descriptions across different enterprise units leading to duplicate procurement and inventory bloat.",
    solution: "Developed an AI-based NLP pipeline to normalize material data, extract entities, and find semantic similarities to detect duplicates and standardize master data.",
    architecture: [
      "Raw Material Data",
      "Preprocessing",
      "NLP / NER",
      "Normalization",
      "Semantic Embeddings",
      "Similarity Engine",
      "Engineering Rules",
      "Confidence Score",
      "Unified Material Code"
    ],
    tech: ["Python", "FastAPI", "React", "NLP", "Semantic Search", "PostgreSQL"],
    github: "https://github.com/harsh9415970495-dev/NUMMP", // Placeholder if not provided
    live: "#",
    featured: true,
    size: "large"
  },
  {
    id: "tradeflow-ai",
    title: "TradeFlow AI",
    tag: "FinTech / AI",
    description: "Professional stock trading simulation and AI-assisted market analysis platform.",
    features: [
      "Portfolio & Market dashboard",
      "Live market data with Candlestick charts",
      "Order book & AI news analysis",
      "Sentiment analysis & Company summaries",
      "Technical indicators & Buy/Sell signals"
    ],
    tech: ["React", "Node.js", "FastAPI", "PostgreSQL", "WebSockets", "AI"],
    github: "https://github.com/harsh9415970495-dev/TradeFLow-AI",
    live: "https://tradeflowsai.netlify.app/",
    featured: true,
    size: "normal"
  },
  {
    id: "capitalspend-ai",
    title: "CapitalSpend AI",
    tag: "AI / Product Engineering",
    description: "AI-powered application for analyzing and managing capital expenditure.",
    features: [
      "AI-driven expenditure analysis",
      "Budget tracking and forecasting",
      "Automated report generation"
    ],
    tech: ["React", "Node.js", "Python", "LLMs", "MongoDB"],
    github: "https://github.com/harsh9415970495-dev/CapitalSpend-AI",
    live: "https://capitalspend.netlify.app/",
    featured: true,
    size: "normal"
  },
  {
    id: "vibechat",
    title: "VibeChat",
    tag: "Real-time / Full-Stack",
    description: "Real-time chat application with private rooms and live indicators.",
    features: [
      "Authentication",
      "Private rooms & Real-time messaging",
      "Typing indicator & Online users",
      "Image upload & Emoji support"
    ],
    tech: ["React", "Node.js", "Express.js", "Socket.io", "Multer"],
    github: "https://github.com/harsh9415970495-dev/VibeChat",
    live: "https://vibechats.netlify.app/",
    featured: true,
    size: "normal"
  }
];
