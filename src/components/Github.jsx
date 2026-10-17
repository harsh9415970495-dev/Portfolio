import { motion } from "framer-motion";
import { GitMerge, GitPullRequest, GitCommit, ArrowRight } from "lucide-react";
import { FaGithub as GithubIcon } from "react-icons/fa";

export function Github() {
  return (
    <section className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <GithubIcon className="text-white" size={32} />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Open Source</h2>
            </div>
            <p className="text-lg text-textMuted leading-relaxed mb-8">
              I actively build and contribute to open-source projects. Check out my GitHub to see my latest commits, repositories, and what I'm currently working on.
            </p>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 p-4 glass rounded-lg border border-white/5 flex-1 text-center">
                <GitCommit className="mx-auto text-primary mb-2" />
                <span className="text-2xl font-bold text-white">400+</span>
                <span className="text-xs text-textMuted uppercase tracking-wider">Contributions</span>
              </div>
              <div className="flex flex-col gap-2 p-4 glass rounded-lg border border-white/5 flex-1 text-center">
                <GitPullRequest className="mx-auto text-accent mb-2" />
                <span className="text-2xl font-bold text-white">25+</span>
                <span className="text-xs text-textMuted uppercase tracking-wider">Repositories</span>
              </div>
              <div className="flex flex-col gap-2 p-4 glass rounded-lg border border-white/5 flex-1 text-center hidden sm:flex">
                <GitMerge className="mx-auto text-green-400 mb-2" />
                <span className="text-2xl font-bold text-white">5+</span>
                <span className="text-xs text-textMuted uppercase tracking-wider">Organizations</span>
              </div>
            </div>

            <a 
              href="https://github.com/harsh9415970495-dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-primary font-medium hover:text-primaryHover transition-colors"
            >
              Explore GitHub <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            {/* Github Heatmap Mock */}
            <div className="glass-card p-6 rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <GithubIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">harsh9415970495-dev</div>
                    <div className="text-xs text-textMuted">github.com</div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold border border-green-500/20 rounded-full">
                  Active
                </div>
              </div>
              
              <div className="overflow-hidden rounded-md border border-white/5 mt-6">
                <img 
                  src="https://ghchart.rshah.org/3b82f6/harsh9415970495-dev" 
                  alt="GitHub Contributions" 
                  className="w-full grayscale-[0.2] hover:grayscale-0 transition-all opacity-80 hover:opacity-100 invert"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                {/* Fallback heatmap block if image fails to load */}
                <div className="w-full flex gap-1 p-2">
                   {Array.from({ length: 40 }).map((_, c) => (
                      <div key={c} className="flex flex-col gap-1 w-full">
                         {Array.from({ length: 7 }).map((_, r) => {
                            const active = Math.random() > 0.7;
                            return <div key={r} className={`w-full aspect-square rounded-[2px] ${active ? 'bg-primary/80' : 'bg-white/5'}`} />
                         })}
                      </div>
                   ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
