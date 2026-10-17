import { motion } from "framer-motion";
import { BookOpen, ArrowRight, ExternalLink } from "lucide-react";

export function Research() {
  const pipeline = [
    "Data", "Cleaning", "Entity Extraction", "Normalization", 
    "Semantic Representation", "Similarity", "Rule Engine", 
    "Validation", "Standardized Output"
  ];

  return (
    <section id="research" className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="text-accent" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Research & Thesis</h2>
          </div>
          <div className="w-12 h-1 bg-accent rounded-full mb-6 mt-4"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl border border-white/10 p-8 md:p-12"
        >
          <div className="max-w-3xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              AI-Driven Material Master Standardization
            </h3>
            <p className="text-lg text-primary font-mono mb-6">
              Topic: National Unified Material Master Platform (NUMMP)
            </p>
            
            <div className="mb-8 flex flex-wrap gap-2">
              {["NLP", "NER", "Semantic Similarity", "Embeddings", "Entity Resolution", "Knowledge Representation", "Machine Learning", "Enterprise AI"].map((area, i) => (
                <span key={i} className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-xs font-semibold">
                  {area}
                </span>
              ))}
            </div>

            <p className="text-textMuted text-lg leading-relaxed mb-10">
              My research focuses on utilizing advanced Natural Language Processing and Machine Learning techniques to harmonize and standardize scattered enterprise material data. By leveraging Named Entity Recognition and Semantic Embeddings, the system identifies duplicate entries and establishes a unified catalog across different domains.
            </p>
          </div>

          <div className="bg-[#0a0a0a] rounded-xl p-6 md:p-8 border border-white/5 mb-10 overflow-x-auto">
            <h4 className="text-sm font-semibold text-textMuted uppercase tracking-wider mb-6">Research Pipeline</h4>
            <div className="flex items-center gap-4 min-w-max">
              {pipeline.map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-surfaceHighlight rounded-lg border border-white/5 text-sm font-mono text-white whitespace-nowrap">
                    {step}
                  </div>
                  {i < pipeline.length - 1 && <ArrowRight size={16} className="text-accent" />}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-md font-medium transition-all flex items-center gap-2">
              Read Thesis <ArrowRight size={18} />
            </button>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-white font-medium transition-all flex items-center gap-2">
              View Architecture <ExternalLink size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
