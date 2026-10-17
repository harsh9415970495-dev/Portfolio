import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { Calendar, Users, Award, Code, Sparkles } from "lucide-react";

export function Experience() {
  const { openEditorWithTab, isAdmin } = usePortfolio();

  const experiences = [
    {
      id: "exp-1",
      title: "Organizing Team Member",
      company: "TEDx IET Lucknow",
      role: "Event Management & Technical Coordination",
      date: "2024 - Present",
      icon: Users,
      description: "Organizing and executing high-impact conference sessions and university events.",
      details: [
        "Worked on event management, coordination, and technical initiatives at IET Lucknow.",
        "Facilitated technology setups, audio-visual workflows, and audience management for speaker sessions.",
        "Collaborated with multidisciplinary teams for marketing, operations, and staging."
      ],
      tag: "Leadership & Organization"
    },
    {
      id: "exp-2",
      title: "Smart India Hackathon (SIH) 2025",
      company: "National Level Innovation Hackathon",
      role: "Full-Stack AI Developer",
      date: "2025",
      icon: Award,
      description: "Designed enterprise-grade architecture for large-scale real-world problem statements.",
      details: [
        "Architected full-stack and AI solutions tackling complex national-scale engineering challenges.",
        "Integrated FastAPI backends with NLP entity extraction and PostgreSQL database models.",
        "Collaborated in rapid sprints under stringent hackathon constraints."
      ],
      outcome: "Selected Participant (SIH 2025)",
      tag: "National Hackathon"
    },
    {
      id: "exp-3",
      title: "Competitive Programming & Technical Community",
      company: "IET Lucknow Coding Initiatives",
      role: "Active Contributor & Peer Mentor",
      date: "Aug 2024 - Present",
      icon: Code,
      description: "Actively involved in competitive programming, hackathons, and software development communities.",
      details: [
        "Solved 700+ DSA problems across CodeChef, Codeforces, AtCoder, and LeetCode.",
        "Participated in 100+ rated programming contests, achieving CodeChef 3-Star status.",
        "Mentored peers in algorithmic problem solving, graph theory, and dynamic programming."
      ],
      tag: "Competitive Programming"
    }
  ];

  return (
    <section id="experience" className="py-24 relative bg-surfaceHighlight/15 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">
              Experience & Leadership
            </h2>
            <div className="w-12 h-1 bg-primary rounded-full mb-4" />
            <p className="text-textMuted text-base sm:text-lg max-w-2xl">
              Leadership roles, hackathon sprints, and campus technical initiatives.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => openEditorWithTab("bio")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-semibold hover:text-white transition-colors w-fit"
            >
              <Sparkles size={13} /> Update Timeline
            </button>
          )}
        </motion.div>

        <div className="relative border-l-2 border-white/10 ml-3 md:ml-6 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-[#0a0a0a]" />
              
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-primary/40 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      {exp.tag && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {exp.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-base font-medium text-textMain/90 mb-1">{exp.company}</div>
                    {exp.role && <div className="text-xs text-primary font-mono">{exp.role}</div>}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-textMuted font-mono bg-white/5 px-3 py-1 rounded-full whitespace-nowrap h-fit border border-white/5">
                    <Calendar size={13} /> {exp.date}
                  </div>
                </div>

                <p className="text-textMuted text-sm mb-4 leading-relaxed">{exp.description}</p>
                
                <ul className="list-disc list-outside ml-5 space-y-2 text-xs sm:text-sm text-textMuted mb-4 leading-relaxed">
                  {exp.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>

                {exp.outcome && (
                  <div className="inline-block px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-lg border border-green-500/20 font-mono">
                    Outcome: {exp.outcome}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
