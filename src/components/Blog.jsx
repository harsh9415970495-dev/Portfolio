import { motion } from "framer-motion";
import { BookText } from "lucide-react";

export function Blog() {
  return (
    <section className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-2">
            <BookText className="text-primary" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Engineering Notes</h2>
          </div>
          <div className="w-12 h-1 bg-primary rounded-full mb-6 mt-4"></div>
          <p className="text-textMuted text-lg max-w-2xl">
            Thoughts, tutorials, and deep-dives into software engineering.
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 mb-6 rounded-full bg-surfaceHighlight flex items-center justify-center border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
            <BookText size={32} className="text-primary relative z-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Writing in progress</h3>
          <p className="text-textMuted max-w-md mx-auto">
            I'm currently documenting my thoughts on System Design, Backend Engineering, and Agentic AI. Articles will be published soon.
          </p>
        </div>
      </div>
    </section>
  );
}
