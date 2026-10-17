export const defaultPortfolioData = {
  personalInfo: {
    name: "Harsh Mishra",
    title: "Computer Science Engineer & Full-Stack Developer",
    phone: "+91 9569015554",
    email: "harsh9415970495@gmail.com",
    github: "https://github.com/harsh9415970495-dev",
    linkedin: "https://linkedin.com/in/harsh-mishra-183a45327",
    codeforces: "https://codeforces.com/profile/Harsh_mishra5554",
    codechef: "https://www.codechef.com/users/harsh_mishra",
    leetcode: "https://leetcode.com/",
    location: "Lucknow, India",
    college: "Institute of Engineering and Technology (IET), Lucknow",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    duration: "Aug 2024 – May 2028",
    cgpa: "8.39/10",
    summary:
      "Computer Science undergraduate at Institute of Engineering and Technology (IET), Lucknow with a strong interest in Software Development, Backend Engineering, Artificial Intelligence, and Competitive Programming. Experienced in developing scalable web applications using React, Node.js, Express.js, FastAPI, and PostgreSQL. Strong foundation in Data Structures and Algorithms, DBMS, Operating Systems, and Computer Networks with 700+ DSA problems solved and participation in 100+ coding contests."
  },

  skillsCategories: [
    {
      id: "languages",
      title: "Languages",
      skills: ["C", "C++", "JavaScript", "SQL", "Python"]
    },
    {
      id: "frontend",
      title: "Frontend",
      skills: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "Framer Motion"]
    },
    {
      id: "backend",
      title: "Backend",
      skills: ["Node.js", "Express.js", "FastAPI", "Socket.io", "REST APIs"]
    },
    {
      id: "databases",
      title: "Databases",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"]
    },
    {
      id: "ai-ml",
      title: "AI / ML",
      skills: ["LLMs", "LangChain", "Prompt Engineering", "RAG", "Agentic AI", "Embeddings", "NLP"]
    },
    {
      id: "tools",
      title: "Tools & Platforms",
      skills: ["Git", "GitHub", "VS Code", "Postman", "Docker", "Linux"]
    },
    {
      id: "core-cs",
      title: "Core CS",
      skills: ["Data Structures & Algorithms", "OOPs", "DBMS", "Operating Systems", "Computer Networks"]
    }
  ],

  learningRoadmap: [
    {
      id: "learn-1",
      category: "Artificial Intelligence & Agents",
      tech: "Agentic AI & Multi-Agent Workflows",
      status: "Actively Learning",
      progress: 75,
      notes: "Building autonomous tool-calling agents using LangChain, LangGraph, and OpenAI/Gemini SDKs."
    },
    {
      id: "learn-2",
      category: "Backend & Distributed Systems",
      tech: "High-Throughput Streaming & Caching",
      status: "In Progress",
      progress: 65,
      notes: "Studying Kafka event streaming, Redis caching patterns, and distributed database sharding."
    },
    {
      id: "learn-3",
      category: "Systems & Low Level",
      tech: "Operating Systems Internals & Memory",
      status: "Deep Dive",
      progress: 80,
      notes: "Virtual memory, demand paging, process synchronization primitives, and socket programming."
    },
    {
      id: "learn-4",
      category: "Competitive Programming",
      tech: "Advanced Graph Algorithms & DP",
      status: "Continuous Practice",
      progress: 90,
      notes: "Centroid decomposition, flow networks, segment trees with lazy propagation, and tree DP."
    }
  ],

  projects: [
    {
      id: "tradeflow-ai",
      title: "TradeFlow AI",
      tag: "FinTech / AI Platform",
      description: "AI-powered stock trading platform featuring portfolio management, technical analysis and trading simulation.",
      problem: "Traditional stock analysis tools lack real-time AI-generated insights and accessible simulation environments for emerging traders.",
      solution: "Engineered an AI-driven trading portal with automated technical indicators, real-time market simulation, and sentiment analysis.",
      bullets: [
        "Built an AI-powered stock trading platform featuring portfolio management, technical analysis and trading simulation.",
        "Integrated FastAPI services for technical indicators, stock analysis and AI-generated trading insights.",
        "Designed PostgreSQL database architecture and scalable backend APIs for user and portfolio management.",
        "Implemented real-time market updates, dashboards and financial analytics."
      ],
      tech: ["React", "FastAPI", "PostgreSQL", "Node.js", "WebSockets", "Technical Analysis"],
      github: "https://github.com/harsh9415970495-dev/TradeFLow-AI",
      live: "https://tradeflowsai.netlify.app/",
      featured: true,
      size: "large"
    },
    {
      id: "vibechat",
      title: "VibeChat",
      tag: "Real-time Messaging",
      description: "Real-time chat application supporting multiple private rooms and low-latency messaging.",
      problem: "Building a responsive, scalable real-time chat with presence tracking without sacrificing performance or user experience.",
      solution: "Implemented WebSocket communication with Socket.io, private rooms, presence indicators, and optimized media delivery.",
      bullets: [
        "Developed a real-time chat application supporting multiple private rooms and low-latency messaging.",
        "Implemented typing indicators, online user tracking, image sharing and emoji support.",
        "Built scalable room-based messaging architecture using Socket.io and REST APIs.",
        "Designed responsive UI/UX for seamless communication."
      ],
      tech: ["React", "Node.js", "Socket.io", "Express.js", "REST APIs"],
      github: "https://github.com/harsh9415970495-dev/VibeChat",
      live: "https://vibechats.netlify.app/",
      featured: true,
      size: "normal"
    },
    {
      id: "capitalspend-ai",
      title: "CapitalSpend AI",
      tag: "AI Personal Finance",
      description: "AI-powered personal finance and expense management application with predictive budgeting.",
      problem: "Users struggle to visualize where capital is spent and lack predictive insights for smart savings.",
      solution: "Built dynamic expense dashboards with category-wise insights, predictive AI budgeting, and automated reports.",
      bullets: [
        "Developed an AI-powered personal finance and expense management application.",
        "Built dashboards for expense tracking, budgeting and financial analytics.",
        "Implemented category-wise transaction management and spending insights.",
        "Designed and integrated REST APIs for secure and efficient data handling."
      ],
      tech: ["React", "Express.js", "MongoDB", "Node.js", "AI Analytics"],
      github: "https://github.com/harsh9415970495-dev/CapitalSpend-AI",
      live: "https://capitalspend.netlify.app/",
      featured: true,
      size: "normal"
    },
    {
      id: "nummp",
      title: "NUMMP (National Unified Material Master Platform)",
      tag: "SIH 2025 / Enterprise AI",
      description: "AI-driven standardization and harmonization of material codes across central public enterprises.",
      problem: "Inconsistent material descriptions across enterprise units leading to duplicate procurement and inventory bloat.",
      solution: "Developed an AI NLP pipeline to normalize material data, extract entities, and identify semantic similarities.",
      bullets: [
        "Selected as a solution for Smart India Hackathon (SIH) 2025.",
        "Architected an NLP pipeline using Named Entity Recognition and Semantic Similarity embeddings.",
        "Unified heterogeneous catalogs into standardized master codes with high confidence scoring."
      ],
      tech: ["Python", "FastAPI", "React", "NLP", "Semantic Search", "PostgreSQL"],
      github: "https://github.com/harsh9415970495-dev",
      live: "#",
      featured: true,
      size: "large"
    }
  ],

  achievements: [
    {
      id: "ach-1",
      title: "CodeChef 3-Star Programmer",
      description: "Consistent competitive performance with high percentile in rated contests",
      badge: "3★ CodeChef"
    },
    {
      id: "ach-2",
      title: "700+ DSA Problems Solved",
      description: "Solved across CodeChef, Codeforces, AtCoder, and LeetCode",
      badge: "700+ Solved"
    },
    {
      id: "ach-3",
      title: "100+ Coding Contests",
      description: "Actively participated across major competitive programming platforms",
      badge: "100+ Contests"
    },
    {
      id: "ach-4",
      title: "Smart India Hackathon (SIH) 2025",
      description: "Participated and built enterprise-grade solutions solving national challenges",
      badge: "SIH 2025"
    },
    {
      id: "ach-5",
      title: "TEDx IET Lucknow Organizing Team",
      description: "Organizing Team Member handling technical coordination and event management",
      badge: "TEDx Organiser"
    },
    {
      id: "ach-6",
      title: "Active Community Contributor",
      description: "Mentoring peers and contributing to coding initiatives at IET Lucknow",
      badge: "Community Mentor"
    }
  ],

  leadership: [
    {
      id: "lead-1",
      role: "Organizing Team Member",
      organization: "TEDx IET Lucknow",
      period: "2024 - Present",
      description: "Worked on event management, coordination, and technical initiatives for prestigious university conferences.",
      bullets: [
        "Coordinated technical infrastructure, speaker sessions, and digital event workflows.",
        "Collaborated across multifaceted student teams to ensure flawless event execution.",
        "Managed stage operations and audience experience for university-wide attendees."
      ]
    },
    {
      id: "lead-2",
      role: "Technical Contributor & Problem Solver",
      organization: "Coding Initiatives & CP Club, IET Lucknow",
      period: "2024 - Present",
      description: "Active contributor in competitive programming, hackathons, and software development communities.",
      bullets: [
        "Mentored fellow students on algorithmic problem-solving techniques and time complexity analysis.",
        "Organized coding contests and mock hackathon sessions for peers.",
        "Represented IET Lucknow in nationwide programming challenges and hackathons."
      ]
    }
  ],

  stats: [
    { value: "700+", label: "DSA Problems Solved" },
    { value: "100+", label: "Coding Contests" },
    { value: "3★", label: "CodeChef Rating" },
    { value: "8.39", label: "Current CGPA" },
    { value: "4+", label: "Production Projects" },
    { value: "SIH", label: "2025 Participant" }
  ]
};
