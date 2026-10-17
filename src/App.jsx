import { useState, useEffect } from "react";
import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Stats } from "./components/Stats";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { CompetitiveProgramming } from "./components/CompetitiveProgramming";
import { Experience } from "./components/Experience";
import { Research } from "./components/Research";
import { Learning } from "./components/Learning";
import { Achievements } from "./components/Achievements";
import { Github } from "./components/Github";
import { Philosophy } from "./components/Philosophy";
import { Resume } from "./components/Resume";
import { Blog } from "./components/Blog";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Terminal } from "./components/Terminal";
import { Background } from "./components/Background";
import { ProfileEditorModal } from "./components/ProfileEditorModal";
import { AdminLoginModal } from "./components/AdminLoginModal";
import { Sparkles, Terminal as TerminalIcon, ShieldAlert } from "lucide-react";

function PortfolioContent() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const { openEditorWithTab, isAdmin, setIsAuthModalOpen, logoutAdmin } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K or / to open terminal/command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      } else if (
        e.key === "/" &&
        !terminalOpen &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setTerminalOpen(true);
      }

      // Owner shortcut: Cmd/Ctrl + Shift + A
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        setIsAuthModalOpen(true);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [terminalOpen, setIsAuthModalOpen]);

  return (
    <div className="min-h-screen selection:bg-primary/30 selection:text-white relative bg-transparent">
      {/* Discreet Owner Notification Banner */}
      {isAdmin && (
        <div className="bg-primary/20 border-b border-primary/40 px-4 py-2 text-xs font-mono text-white flex items-center justify-between sticky top-0 z-[60] backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-primary">👑 Owner Access Mode Active</span>
            <span className="hidden md:inline text-zinc-300">• Harsh Mishra (Update permissions unlocked)</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => openEditorWithTab("learning")}
              className="text-xs text-primary hover:text-white underline transition-colors"
            >
              Open Editor
            </button>
            <button
              onClick={logoutAdmin}
              className="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-[11px] transition-colors flex items-center gap-1"
            >
              <ShieldAlert size={12} /> Exit Owner Mode
            </button>
          </div>
        </div>
      )}

      <Background />
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      
      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Projects />
        <CompetitiveProgramming />
        <Learning />
        <Experience />
        <Achievements />
        <Research />
        <Github />
        <Philosophy />
        <Resume />
        <Blog />
        <Contact />
      </main>

      <Footer />
      
      {/* Interactive Terminal */}
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* Dynamic Profile & Tech Radar Editor Modal */}
      <ProfileEditorModal />

      {/* Secret Owner Passkey Login Modal */}
      <AdminLoginModal />
      
      {/* Floating Control Bar: Quick Update (ONLY for Owner) & Terminal */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3 z-40">
        {isAdmin && (
          <button
            onClick={() => openEditorWithTab("learning")}
            className="px-4 py-3 bg-[#161619]/90 hover:bg-primary text-white rounded-full shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] border border-primary/40 hover:border-primary transition-all flex items-center gap-2 group backdrop-blur-md text-xs font-semibold"
            title="Update Tech You Are Learning or Profile Info"
          >
            <Sparkles size={16} className="text-primary group-hover:text-white transition-colors animate-pulse" />
            <span className="hidden sm:inline">Update Profile</span>
          </button>
        )}

        <button
          onClick={() => setTerminalOpen(true)}
          className="p-3.5 bg-primary text-white rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105 transition-all flex items-center justify-center group"
          title="Open Terminal (Press / or Cmd+K)"
        >
          <TerminalIcon size={20} />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
