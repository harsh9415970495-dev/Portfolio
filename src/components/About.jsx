import { motion } from "framer-motion";
import { GraduationCap, Award, MapPin, ChevronRight, Sparkles } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export function About() {
  const { data, openEditorWithTab, isAdmin } = usePortfolio();
  const { personalInfo } = data;

  const interests = [
    "Data Structures & Algorithms",
    "Competitive Programming (3★)",
    "Backend & System Design",
    "FastAPI & Microservices",
    "PostgreSQL & Databases",
    "Artificial Intelligence & Agents",
    "Operating Systems & Networks",
    "Full-Stack Web Engineering"
  ];

  const timeline = ["Learn Tech", "Solve 700+ DSA", "Build AI Systems", "Compete & Hack", "Iterate & Ship"];

  return (
    <section id="about" className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">About Me</h2>
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>

          {isAdmin && (
            <button
              onClick={() => openEditorWithTab("bio")}
              className="text-xs text-primary hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 w-fit transition-colors"
            >
              <Sparkles size={13} /> Edit Bio / Education
            </button>
          )}
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 items-start">
          {/* Left: Avatar + Education Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 lg:col-span-4 flex flex-col gap-6"
          >
            {/* Profile Avatar Frame */}
            <div className="relative group mx-auto w-3/4 md:w-full">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-colors duration-500" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 glass-card flex items-center justify-center bg-surfaceHighlight/50">
                <img 
                  src="/profile.jpg" 
                  alt="Harsh Mishra" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 object-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://ui-avatars.com/api/?name=Harsh+Mishra&size=512&background=0e0e11&color=3b82f6&font-size=0.33&length=2";
                  }}
                />
              </div>
            </div>

            {/* Education Highlight Card */}
            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Education</h4>
                  <p className="text-xs text-textMuted">{personalInfo.duration || "Aug 2024 – May 2028"}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs">
                <div className="text-white font-semibold">
                  {personalInfo.college || "Institute of Engineering and Technology (IET), Lucknow"}
                </div>
                <div className="text-textMuted">
                  {personalInfo.degree || "Bachelor of Technology in Computer Science and Engineering"}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-textMuted flex items-center gap-1">
                    <MapPin size={12} className="text-primary" /> Lucknow, India
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 font-mono font-bold border border-green-500/20">
                    CGPA: {personalInfo.cgpa || "8.39/10"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Summary, Highlights, Interests */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-5 text-base sm:text-lg text-textMuted leading-relaxed"
            >
              <p className="text-white font-medium text-lg sm:text-xl leading-relaxed">
                {personalInfo.summary ||
                  "Computer Science undergraduate at Institute of Engineering and Technology (IET), Lucknow with a strong interest in Software Development, Backend Engineering, Artificial Intelligence, and Competitive Programming."}
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-textMuted">
                Experienced in developing scalable web applications using <span className="text-white font-medium">React, Node.js, Express.js, FastAPI, and PostgreSQL</span>. Strong foundation in Data Structures and Algorithms, DBMS, Operating Systems, and Computer Networks with <span className="text-primary font-mono font-semibold">700+ DSA problems solved</span> and participation in <span className="text-primary font-mono font-semibold">100+ coding contests</span>.
              </p>

              {/* Engineering philosophy steps */}
              <div className="p-5 glass rounded-xl border border-white/5 relative overflow-hidden group">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
                  {timeline.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-white font-semibold">{step}</span>
                      {idx < timeline.length - 1 && <ChevronRight size={14} className="text-primary shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Core Interests Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h3 className="text-base font-semibold mb-4 text-white flex items-center gap-2">
                <Award size={18} className="text-primary" /> Focus & Core Strengths
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {interests.map((interest, idx) => (
                  <span 
                    key={idx}
                    className="px-3.5 py-1.5 bg-surfaceHighlight/50 hover:bg-primary/20 border border-white/5 hover:border-primary/30 rounded-xl text-xs sm:text-sm font-medium text-textMain transition-all cursor-default"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
