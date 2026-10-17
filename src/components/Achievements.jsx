import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { Trophy, Code, Medal, Star, Users, Sparkles, Plus } from "lucide-react";

export function Achievements() {
  const { data, openEditorWithTab, isAdmin } = usePortfolio();
  const { achievements } = data;

  const getIcon = (title) => {
    const t = (title || "").toLowerCase();
    if (t.includes("codechef") || t.includes("star")) return Star;
    if (t.includes("dsa") || t.includes("problem")) return Code;
    if (t.includes("hackathon") || t.includes("sih")) return Medal;
    if (t.includes("tedx") || t.includes("organizing") || t.includes("team")) return Users;
    if (t.includes("contest")) return Trophy;
    return Sparkles;
  };

  return (
    <section className="py-24 relative bg-surfaceHighlight/20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">
              Honors & Achievements
            </h2>
            <div className="w-12 h-1 bg-primary rounded-full mb-4" />
            <p className="text-textMuted text-base sm:text-lg max-w-2xl">
              Milestones from competitive programming, national hackathons, and university leadership.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => openEditorWithTab("achievements")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-xs font-semibold transition-all w-fit shadow-md shadow-primary/10"
            >
              <Plus size={14} /> Add Achievement
            </button>
          )}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => {
            const Icon = getIcon(ach.title);
            return (
              <motion.div
                key={ach.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/40 hover:bg-surfaceHighlight/50 transition-all group flex items-start gap-4"
              >
                <div className="p-3 bg-white/5 rounded-xl text-textMuted group-hover:text-primary transition-colors shrink-0 group-hover:scale-105">
                  <Icon size={22} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">
                      {ach.title}
                    </h4>
                  </div>
                  {ach.badge && (
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25">
                      {ach.badge}
                    </span>
                  )}
                  <p className="text-xs text-textMuted leading-relaxed pt-1">
                    {ach.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
