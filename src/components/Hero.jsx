import { motion } from "framer-motion";
import { Mail, Code2, ArrowRight, Code, Sparkles, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { usePortfolio } from "../context/PortfolioContext";

export function Hero() {
  const { data, openEditorWithTab, isAdmin } = usePortfolio();
  const { personalInfo } = data;

  const roles = [
    "Full-Stack Developer",
    "Competitive Programmer (3★)",
    "Backend & Systems Engineer",
    "AI & LLM Application Builder",
    "Continuous Learner"
  ];

  return (
    <section className="min-h-screen flex items-center pt-28 pb-16 relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.08),transparent_60%)]" />
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-accent/10 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* College & CGPA badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-textMuted mb-4 backdrop-blur-sm">
              <img 
                src={personalInfo.avatar || "/profile.jpg"} 
                alt={personalInfo.name || "Harsh Mishra"} 
                className="w-5 h-5 rounded-full object-cover ring-1 ring-primary/50"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              <span>{personalInfo.college || "IET Lucknow"} • CGPA: {personalInfo.cgpa || "8.33/10"}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white">
              Hi, I&apos;m <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">
                {personalInfo.name || "Harsh Mishra"}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-textMuted max-w-xl font-normal leading-relaxed">
              Computer Science student at IET Lucknow building scalable web apps with React, Node.js, FastAPI, and PostgreSQL. 700+ DSA problems solved, CodeChef 3★, and passionate about continuous learning.
            </p>
          </motion.div>

          {/* Animated dynamic role rotator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3 text-base sm:text-lg font-mono text-primary h-8"
          >
            <span className="text-textMuted">&gt;</span>
            <div className="relative overflow-hidden h-full flex flex-col justify-center">
              <motion.div
                animate={{ y: ["0%", "-80%"] }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="flex flex-col gap-8"
              >
                {roles.map((role, i) => (
                  <span key={i} className="h-8 flex items-center whitespace-nowrap font-semibold">
                    {role}
                  </span>
                ))}
                <span className="h-8 flex items-center whitespace-nowrap font-semibold">{roles[0]}</span>
              </motion.div>
            </div>
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8, ease: "stepEnd" }}
              className="w-2 h-5 bg-primary"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <a 
              href="#projects" 
              className="px-6 py-3 bg-primary hover:bg-primaryHover text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-primary/25 hover:-translate-y-0.5"
            >
              View Featured Work <ArrowRight size={18} />
            </a>

            {isAdmin ? (
              <button
                onClick={() => openEditorWithTab("learning")}
                className="px-5 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary hover:text-white rounded-xl transition-all font-semibold flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Sparkles size={16} className="text-primary" /> Owner: Update Tech
              </button>
            ) : (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-xl transition-all font-semibold flex items-center gap-2 hover:-translate-y-0.5"
              >
                <FaGithub size={18} /> Explore GitHub
              </a>
            )}
          </motion.div>

          {/* Social Profiles & Contact Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-3 mt-2"
          >
            {[
              { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
              { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
              { icon: Code2, href: personalInfo.codeforces, label: "Codeforces" },
              { icon: Code, href: personalInfo.codechef, label: "CodeChef" },
              { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
              { icon: Phone, href: `tel:${personalInfo.phone}`, label: "Phone" }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-surfaceHighlight/50 hover:bg-surfaceHighlight rounded-full text-textMuted hover:text-white transition-all border border-white/5 hover:border-primary/40 hover:scale-105"
                aria-label={social.label}
                title={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right side Interactive Mock Terminal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-5 relative"
        >
          <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="bg-[#18181c] px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-textMuted">
                  <img 
                    src={personalInfo.avatar || "/profile.jpg"} 
                    alt="avatar" 
                    className="w-4 h-4 rounded-full object-cover ring-1 ring-primary/40"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span>harsh@iet-lucknow:~</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                ACTIVE
              </span>
            </div>

            <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed flex flex-col gap-3 min-h-[320px]">
              <div className="text-textMuted">
                <span className="text-green-400">harsh@iet</span>:<span className="text-blue-400">~</span>$ cat profile.json
              </div>

              <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-textMuted space-y-1 font-mono text-xs">
                <div>&quot;name&quot;: <span className="text-white">&quot;Harsh Mishra&quot;</span>,</div>
                <div>&quot;college&quot;: <span className="text-primary">&quot;IET Lucknow&quot;</span>,</div>
                <div>&quot;batch&quot;: <span className="text-accent">&quot;2024 - 2028 (B.Tech CSE)&quot;</span>,</div>
                <div>&quot;cgpa&quot;: <span className="text-green-400">8.33</span>,</div>
                <div>&quot;dsa_solved&quot;: <span className="text-yellow-400">&quot;700+ across platforms&quot;</span>,</div>
                <div>&quot;codechef&quot;: <span className="text-yellow-400">&quot;3-Star (3★)&quot;</span>,</div>
                <div>&quot;hackathon&quot;: <span className="text-white">&quot;Smart India Hackathon 2025&quot;</span>,</div>
                <div>&quot;learning_mode&quot;: <span className="text-primary font-bold">&quot;CONTINUOUS_SYNC&quot;</span></div>
              </div>

              <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-xs text-textMuted">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>READY FOR HIRE & COLLAB</span>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => openEditorWithTab("learning")}
                    className="text-xs text-primary hover:underline font-mono"
                  >
                    [edit info]
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Decorative glow background */}
          <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
