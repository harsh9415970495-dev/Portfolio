import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { Plus, Sparkles, BookOpen, Cpu, Server, Brain, Code2 } from "lucide-react";

export function Learning() {
  const { data, openEditorWithTab, isAdmin } = usePortfolio();
  const { learningRoadmap } = data;

  const getTopicIcon = (category) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("ai") || cat.includes("agent")) return Brain;
    if (cat.includes("back") || cat.includes("stream")) return Server;
    if (cat.includes("sys") || cat.includes("low")) return Cpu;
    return Code2;
  };

  return (
    <section id="learning" className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-mono font-semibold tracking-wider uppercase mb-2">
              <Sparkles size={14} /> Continuous Growth
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Currently Learning & Tech Radar
            </h2>
            <div className="w-12 h-1 bg-primary rounded-full mb-4" />
            <p className="text-textMuted text-base sm:text-lg max-w-2xl">
              Engineering never stops. Here are the architectures, languages, and AI paradigms I am actively experimenting with and deep-diving right now.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => openEditorWithTab("learning")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primaryHover text-white text-xs font-semibold transition-all w-fit shadow-lg shadow-primary/20 hover:-translate-y-0.5 shrink-0"
            >
              <Plus size={15} /> Add Tech You&apos;re Learning
            </button>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningRoadmap.map((item, idx) => {
            const IconComponent = getTopicIcon(item.category);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-surfaceHighlight rounded-xl text-primary group-hover:scale-105 transition-transform">
                      <IconComponent size={22} />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {item.status || "Active"}
                    </span>
                  </div>

                  <span className="text-xs text-textMuted uppercase tracking-wider font-semibold">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-3 group-hover:text-primary transition-colors">
                    {item.tech}
                  </h3>

                  <p className="text-xs text-textMuted leading-relaxed mb-4">
                    {item.notes}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-green-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    In Progress
                  </span>
                  {isAdmin ? (
                    <button
                      onClick={() => openEditorWithTab("learning")}
                      className="text-primary hover:underline text-[11px] font-mono transition-colors"
                    >
                      Update &rarr;
                    </button>
                  ) : (
                    <span className="text-textMuted/60 text-[10px] font-mono">
                      Active
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Quick Add Card (Owner Only) */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: learningRoadmap.length * 0.08 }}
              onClick={() => openEditorWithTab("learning")}
              className="p-6 rounded-2xl border-2 border-dashed border-white/15 hover:border-primary/50 flex flex-col items-center justify-center text-center cursor-pointer group bg-surfaceHighlight/10 hover:bg-surfaceHighlight/30 transition-all min-h-[200px]"
            >
              <div className="p-3.5 rounded-full bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">Studying New Technology?</h4>
              <p className="text-xs text-textMuted max-w-[200px]">
                Click here to log a new topic or project directly into your profile radar.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
