import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { usePortfolio } from "../context/PortfolioContext";

export function Contact() {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 900);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-white/5 bg-surfaceHighlight/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-primary text-xs font-mono font-semibold tracking-wider uppercase mb-2">
                <MessageSquare size={14} /> Get In Touch
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                Let&apos;s build something exceptional.
              </h2>
              <div className="w-12 h-1 bg-primary rounded-full mb-6" />
              
              <p className="text-base text-textMuted leading-relaxed mb-8">
                Whether you have an engineering internship, full-time opportunity, open-source project, or want to discuss AI architectures and competitive algorithms — feel free to reach out.
              </p>

              <div className="space-y-3.5 mb-8">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3.5 text-textMuted hover:text-white transition-colors p-3.5 glass border border-white/5 rounded-xl hover:border-primary/40 group"
                >
                  <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:scale-105 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-textMuted font-mono">Email Address</div>
                    <div className="text-sm font-medium text-white">{personalInfo.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-3.5 text-textMuted hover:text-white transition-colors p-3.5 glass border border-white/5 rounded-xl hover:border-primary/40 group"
                >
                  <div className="p-2 bg-green-500/10 text-green-400 rounded-lg group-hover:scale-105 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-textMuted font-mono">Direct Phone / WhatsApp</div>
                    <div className="text-sm font-medium text-white">{personalInfo.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 text-textMuted p-3.5 glass border border-white/5 rounded-xl">
                  <div className="p-2 bg-accent/10 text-accent rounded-lg">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-textMuted font-mono">Location</div>
                    <div className="text-sm font-medium text-white">Lucknow, Uttar Pradesh, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-textMuted hover:text-white transition-colors"
                title="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-textMuted hover:text-white transition-colors"
                title="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={personalInfo.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-mono text-textMuted hover:text-white transition-colors"
              >
                Codeforces
              </a>
              <a
                href={personalInfo.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-mono text-textMuted hover:text-white transition-colors"
              >
                CodeChef
              </a>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card p-7 sm:p-9 rounded-2xl border border-white/10 flex flex-col gap-5 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-1">Send a Message Directly</h3>

              <div>
                <label htmlFor="name" className="block text-xs font-medium text-textMuted mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary text-sm transition-colors"
                  placeholder="e.g. Satya Nadella / Recruiter"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-textMuted mb-1.5">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary text-sm transition-colors"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-textMuted mb-1.5">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary text-sm transition-colors resize-none leading-relaxed"
                  placeholder="Hi Harsh, I checked out your portfolio and projects..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-sm mt-1 shadow-lg ${
                  status === "success" 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                    : "bg-primary hover:bg-primaryHover text-white shadow-primary/25"
                }`}
              >
                {status === "idle" && (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
                {status === "submitting" && "Sending Message..."}
                {status === "success" && "Message Sent Successfully!"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
