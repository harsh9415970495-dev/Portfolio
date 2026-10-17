import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { Code2, Server, Database, Brain, Wrench, Cpu, Plus, Sparkles } from "lucide-react";

export function Skills() {
  const { data, openEditorWithTab, isAdmin } = usePortfolio();
  const { skillsCategories } = data;

  const getCategoryIcon = (id, title) => {
    const key = (id || title || "").toLowerCase();
    if (key.includes("lang")) return Code2;
    if (key.includes("front")) return Code2;
    if (key.includes("back")) return Server;
    if (key.includes("data")) return Database;
    if (key.includes("ai") || key.includes("ml")) return Brain;
    if (key.includes("tool") || key.includes("devops")) return Wrench;
    if (key.includes("core") || key.includes("cs")) return Cpu;
    return Wrench;
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">Technical Arsenal</h2>
            <div className="w-12 h-1 bg-primary rounded-full mb-4" />
            <p className="text-textMuted text-base sm:text-lg max-w-2xl">
              Languages, frameworks, databases, and AI tooling I work with daily. Always expanding as I learn new tech.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => openEditorWithTab("skills")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-xs font-semibold transition-all w-fit shadow-md shadow-primary/10"
            >
              <Plus size={14} /> Add / Manage Skills
            </button>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsCategories.map((category, idx) => {
            const IconComponent = getCategoryIcon(category.id, category.title);
            return (
              <motion.div
                key={category.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass p-6 rounded-2xl hover:border-primary/40 transition-all group relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-surfaceHighlight rounded-xl text-primary group-hover:scale-105 transition-transform">
                        <IconComponent size={22} />
                      </div>
                      <h3 className="text-lg font-bold text-white">{category.title}</h3>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => openEditorWithTab("skills")}
                        className="opacity-0 group-hover:opacity-100 text-xs text-primary hover:underline transition-opacity"
                        title="Edit this category"
                      >
                        + Add
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-textMuted group-hover:text-textMain hover:border-primary/40 hover:bg-primary/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-textMuted/70">
                  <span>{category.skills.length} competencies</span>
                  <span className="text-green-400">Verified</span>
                </div>
              </motion.div>
            );
          })}

          {/* Quick Add Custom Skill Tile (Owner Only) */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: skillsCategories.length * 0.08 }}
              onClick={() => openEditorWithTab("skills")}
              className="p-6 rounded-2xl border-2 border-dashed border-white/15 hover:border-primary/50 flex flex-col items-center justify-center text-center cursor-pointer group bg-surfaceHighlight/10 hover:bg-surfaceHighlight/30 transition-all min-h-[180px]"
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">Learning New Tech?</h4>
              <p className="text-xs text-textMuted max-w-[220px]">
                Click here to add new frameworks, tools, or languages right into your live portfolio.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
