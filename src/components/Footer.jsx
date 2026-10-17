import { usePortfolio } from "../context/PortfolioContext";
import { Lock, Unlock } from "lucide-react";

export function Footer() {
  const { data, openEditorWithTab, isAdmin, logoutAdmin, setIsAuthModalOpen } = usePortfolio();
  const { personalInfo } = data;

  return (
    <footer className="border-t border-white/10 py-12 relative z-10 backdrop-blur-sm bg-[#0a0a0a]/60">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <div className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            <span>{personalInfo.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono">
              B.Tech CSE &apos;28
            </span>
          </div>
          <div className="text-xs font-mono text-textMuted">
            {personalInfo.college || "Institute of Engineering and Technology (IET), Lucknow"}
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5 text-xs font-mono text-textMuted">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href={personalInfo.codeforces} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Codeforces</a>
          <a href={personalInfo.codechef} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">CodeChef</a>
          <a href={personalInfo.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LeetCode</a>
          <a href="https://atcoder.jp/users/harshmishra555" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">AtCoder</a>
          
          {/* Owner Mode Actions */}
          {isAdmin ? (
            <div className="flex items-center gap-3 pl-2 border-l border-white/10">
              <button 
                onClick={() => openEditorWithTab("learning")} 
                className="text-primary hover:text-white flex items-center gap-1 font-semibold transition-colors"
              >
                <Unlock size={12} />
                <span>Owner Dashboard</span>
              </button>
              <button 
                onClick={logoutAdmin} 
                className="text-red-400/80 hover:text-red-300 transition-colors"
                title="Logout from Owner Mode"
              >
                (Logout)
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-textMuted/40 hover:text-textMuted flex items-center gap-1 pl-2 border-l border-white/5 transition-colors"
              title="Owner access only"
            >
              <Lock size={11} />
              <span>Owner</span>
            </button>
          )}
        </div>

        <div className="text-center md:text-right">
          <div className="text-xs text-textMuted mb-1">
            Built with React, Vite & Tailwind CSS.
          </div>
          <div className="text-[11px] text-textMuted/60 font-mono">
            &copy; 2026 Harsh Mishra. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
