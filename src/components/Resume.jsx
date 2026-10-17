import { motion } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";

export function Resume() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-primary/5 skew-y-3 transform origin-bottom-left -z-10" />
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-3xl border border-primary/20 shadow-[0_0_50px_rgba(59,130,246,0.1)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <FileText className="mx-auto text-primary mb-6" size={48} />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Want the complete picture?</h2>
          <p className="text-xl text-textMuted max-w-2xl mx-auto mb-10 leading-relaxed">
            Download my resume to explore my education, technical skills, projects, achievements and experience in a concise format.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <a 
              href="/resume.pdf" 
              download
              className="px-8 py-4 bg-primary hover:bg-primaryHover text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
            >
              <Download size={20} /> Download Resume
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all flex items-center gap-2 hover:-translate-y-1"
            >
              <ExternalLink size={20} /> View Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
