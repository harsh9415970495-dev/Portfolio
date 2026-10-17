import { Code2, Server, Database, Brain, Wrench } from "lucide-react";

export const skillsCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["C++", "C", "JavaScript", "TypeScript", "Python", "SQL"]
  },
  {
    title: "Frontend",
    icon: Code2, // Will replace with proper icon component mapping later
    skills: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "FastAPI", "Socket.io", "REST APIs"]
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"]
  },
  {
    title: "AI / ML",
    icon: Brain,
    skills: ["Python", "FastAPI", "LangChain", "Agentic AI", "LLM APIs", "NLP", "Semantic Search"]
  },
  {
    title: "Tools / DevOps",
    icon: Wrench,
    skills: ["Git", "GitHub", "Docker", "Postman", "Linux", "Netlify", "Render"]
  }
];

export const cpTopics = [
  "Binary Search", "Arrays", "Strings", "Graphs", "Trees", 
  "Dynamic Programming", "Greedy", "Constructive Algorithms", 
  "Number Theory", "Sorting", "Divide & Conquer", "Prefix Sum", 
  "Two Pointers", "Sliding Window"
];
