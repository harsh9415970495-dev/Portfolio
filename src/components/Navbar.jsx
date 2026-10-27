import { useState, useEffect } from "react";
import { cn } from "../utils/cn";
import { Menu, X, Terminal as TerminalIcon, Sparkles } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export function Navbar({ onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openEditorWithTab, isAdmin, data } = usePortfolio();
  const personalInfo = data?.personalInfo || {};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "CP", href: "#cp" },
    { name: "Learning", href: "#learning" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-[#0a0a0a]/85 backdrop-blur-md border-white/10 shadow-lg py-3.5" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img 
              src={personalInfo.avatar || "/profile.jpg"} 
              alt={personalInfo.name || "Harsh Mishra"} 
              className="w-7 h-7 rounded-full object-cover ring-2 ring-primary/40 group-hover:ring-primary transition-all"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 ring-1 ring-[#0a0a0a]" />
          </div>
          <span className="font-mono font-bold text-xl tracking-tighter text-white">
            <span className="text-primary group-hover:text-accent transition-colors">HM</span>.dev
          </span>
          <span className="hidden sm:inline-flex text-[11px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            CSE @ IET Lucknow
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-textMuted hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}

          {/* Quick Update Profile Button (Owner Only) */}
          {isAdmin && (
            <button
              onClick={() => openEditorWithTab("learning")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30 border border-primary/40 text-primary hover:text-white text-xs font-semibold transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              title="Update skills, tech you are learning, or projects"
            >
              <Sparkles size={13} className="text-primary animate-pulse" />
              <span>Owner Mode</span>
            </button>
          )}
          
          <button 
            onClick={onOpenTerminal}
            className="text-textMuted hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-mono px-2 py-1 bg-white/5 rounded-md border border-white/5"
            title="Terminal (Press / or Cmd+K)"
          >
            <TerminalIcon size={14} />
            <span>/</span>
          </button>
          
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-primary hover:bg-primaryHover text-white rounded-md transition-all text-xs font-semibold shadow-md shadow-primary/20"
          >
            Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {isAdmin && (
            <button
              onClick={() => openEditorWithTab("learning")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-semibold"
            >
              <Sparkles size={12} />
              <span>Owner</span>
            </button>
          )}

          <button
            className="text-textMain p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0e0e11]/95 backdrop-blur-xl border-b border-white/10 py-6 px-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-textMuted hover:text-white"
            >
              {link.name}
            </a>
          ))}
          
          {isAdmin && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEditorWithTab("learning");
              }}
              className="flex items-center justify-center gap-2 py-2.5 bg-primary/20 border border-primary/40 rounded-lg text-primary font-semibold text-sm"
            >
              <Sparkles size={16} /> Update Profile & Learning Tech
            </button>
          )}

          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTerminal();
            }}
            className="text-sm font-medium text-textMuted hover:text-primary text-left flex items-center gap-2"
          >
            <TerminalIcon size={16} /> Open Terminal (CLI)
          </button>
          
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-primary text-white text-center rounded-lg font-medium text-sm"
          >
            View Resume PDF
          </a>
        </div>
      )}
    </nav>
  );
}
