import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { ExternalLink, ArrowRight, X, Plus, Sparkles, CheckCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function Projects() {
  const { data, openEditorWithTab, isAdmin } = usePortfolio();
  const { projects } = data;
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">Featured Projects</h2>
            <div className="w-12 h-1 bg-primary rounded-full mb-4" />
            <p className="text-textMuted text-base sm:text-lg max-w-2xl">
              Production web applications, AI platforms, and real-time systems built with modern engineering stacks.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => openEditorWithTab("projects")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-xs font-semibold transition-all w-fit shadow-md shadow-primary/10"
            >
              <Plus size={14} /> Add New Project
            </button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group glass-card rounded-2xl overflow-hidden cursor-pointer hover:border-primary/40 transition-all flex flex-col justify-between ${
                project.size === "large" ? "lg:col-span-2" : ""
              }`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="p-7 sm:p-8">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold tracking-wide border border-primary/20 font-mono">
                    {project.tag || "Full-Stack Project"}
                  </span>
                  <div className="flex items-center gap-3">
                    {project.github && project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-textMuted hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
                        title="View Source on GitHub"
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                    {project.live && project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-textMuted hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
                        title="Open Live Application"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                </h3>

                <p className="text-textMuted text-sm sm:text-base mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Key bullets preview */}
                {project.bullets && project.bullets.length > 0 && (
                  <div className="mb-6 space-y-1.5 text-xs text-textMuted">
                    {project.bullets.slice(0, 2).map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="line-clamp-1">{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech chips */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-textMuted bg-white/5 border border-white/5 px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-7 py-3 bg-surfaceHighlight/30 border-t border-white/5 flex items-center justify-between text-xs text-textMuted">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  Live Verified
                </span>
                <span className="group-hover:text-white font-medium transition-colors">
                  Click for architecture & deep dive &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Add Project Bottom Banner (Owner Only) */}
        {isAdmin && (
          <div className="mt-10 p-6 rounded-2xl border border-white/10 glass flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <Sparkles size={22} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Building another system or hackathon project?</h4>
                <p className="text-xs text-textMuted">
                  Easily showcase your newest deployed application or repository on your live portfolio.
                </p>
              </div>
            </div>
            <button
              onClick={() => openEditorWithTab("projects")}
              className="px-5 py-2.5 bg-primary hover:bg-primaryHover text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-primary/20 shrink-0"
            >
              + Add Project to Website
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[115] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#121215] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[88vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#121215]/95 backdrop-blur-xl border-b border-white/10 p-5 sm:p-6 flex justify-between items-center z-10">
                <div>
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">
                    {selectedProject.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-textMuted hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    Executive Summary
                  </h4>
                  <p className="text-base text-textMuted leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Key Bullet Points from Resume */}
                {selectedProject.bullets && selectedProject.bullets.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                      Key Engineering Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedProject.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-textMuted leading-relaxed">
                          <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedProject.problem && (
                  <div>
                    <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      The Problem Solved
                    </h4>
                    <p className="text-sm text-textMuted leading-relaxed">{selectedProject.problem}</p>
                  </div>
                )}
                
                {selectedProject.solution && (
                  <div>
                    <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      Solution & Architecture
                    </h4>
                    <p className="text-sm text-textMuted leading-relaxed">{selectedProject.solution}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono font-medium text-white">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 mt-2">
                  {selectedProject.github && selectedProject.github !== "#" && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white transition-all flex items-center gap-2"
                    >
                      <FaGithub size={16} /> View GitHub Source
                    </a>
                  )}
                  {selectedProject.live && selectedProject.live !== "#" && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-primary hover:bg-primaryHover text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                    >
                      <ExternalLink size={16} /> Open Live Application
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
