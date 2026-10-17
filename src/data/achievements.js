import { Trophy, Code, Medal, Star, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const achievements = [
  {
    id: "ach-1",
    title: "CodeChef 3-Star",
    description: "Achieved maximum rating of XXXX",
    icon: Star,
  },
  {
    id: "ach-2",
    title: "700+ DSA Problems",
    description: "Solved across LeetCode, Codeforces, and CodeChef",
    icon: Code,
  },
  {
    id: "ach-3",
    title: "100+ Contests",
    description: "Actively participated in competitive programming contests",
    icon: Trophy,
  },
  {
    id: "ach-4",
    title: "SIH 2025 Participant",
    description: "Smart India Hackathon project on YATRI KAVACH",
    icon: Medal,
  },
  {
    id: "ach-5",
    title: "10+ Projects",
    description: "Built multiple full-stack and AI-powered applications",
    icon: FaGithub,
  },
  {
    id: "ach-6",
    title: "Technical Mentorship",
    description: "Active contributor in college coding club",
    icon: BookOpen,
  }
];
