import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export function Terminal({ isOpen, onClose }) {
  const { data, openEditorWithTab, isAdmin, setIsAuthModalOpen, logoutAdmin } = usePortfolio();
  const [history, setHistory] = useState([
    { type: 'system', content: 'Harsh Mishra Dev Terminal v2.1.0' },
    { type: 'system', content: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = "";

    switch (trimmed) {
      case "help":
        response = `Available commands:
  help      - Show this help message
  about     - Display academic & developer bio
  skills    - List full technical arsenal
  projects  - View featured production projects
  cp        - View live LeetCode, Codeforces & CodeChef stats
  learning  - Show active learning roadmap & tech radar
  admin     - Owner login (Passkey protected)
  update    - Open profile editor (Owner only)
  logout    - Exit Owner mode
  github    - Open GitHub profile
  contact   - Go to contact section
  clear     - Clear terminal screen`;
        break;
      case "about":
        response = `Name: ${data.personalInfo.name}
College: ${data.personalInfo.college}
Batch: ${data.personalInfo.duration} (CGPA: ${data.personalInfo.cgpa})
Focus: Software Development, Backend Architecture, AI & Competitive Programming`;
        break;
      case "skills":
        response = data.skillsCategories
          .map((cat) => `[${cat.title}] -> ${cat.skills.join(", ")}`)
          .join("\n");
        break;
      case "projects":
        response = data.projects
          .map((p) => `* ${p.title} (${p.tag}): ${p.tech.join(", ")}`)
          .join("\n");
        break;
      case "cp":
      case "coding":
        response = `COMPETITIVE PROGRAMMING STATS:
* Total Solved: 865+ problems across platforms
* CodeChef: 3-Star (3★), 409+ Solved (handle: harshmishra555)
* LeetCode: 102+ Solved (47 Easy, 45 Med, 10 Hard) (handle: harshmishra5554)
* Codeforces: 1050 Rating (Max 1149), 354 Unique Solved (handle: Harsh_mishra5554)
* AtCoder: 570 Rating, Top 24% (handle: harshmishra555)`;
        break;
      case "learning":
        response = data.learningRoadmap
          .map((l) => `* [${l.category}] ${l.tech} (${l.status}) - ${l.notes}`)
          .join("\n");
        break;
      case "admin":
      case "login":
        if (isAdmin) {
          response = "You are already authenticated in Owner Mode. Type 'update' to edit or 'logout' to switch to visitor view.";
        } else {
          onClose();
          setIsAuthModalOpen(true);
          response = "Opening Owner Passkey prompt...";
        }
        break;
      case "logout":
        logoutAdmin();
        response = "Logged out from Owner mode. Public visitor view active.";
        break;
      case "update":
      case "edit":
        if (!isAdmin) {
          onClose();
          setIsAuthModalOpen(true);
          response = "Owner authentication required. Opening passkey prompt...";
        } else {
          onClose();
          openEditorWithTab("learning");
          response = "Opening Profile Editor...";
        }
        break;
      case "projects_nav":
        document.getElementById("projects")?.scrollIntoView({ behavior: 'smooth' });
        response = "Navigating to Projects...";
        setTimeout(onClose, 800);
        break;
      case "contact":
        document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' });
        response = "Navigating to Contact...";
        setTimeout(onClose, 800);
        break;
      case "github":
        window.open(data.personalInfo.github, "_blank");
        response = "Opening GitHub...";
        break;
      case "clear":
        setHistory([]);
        return;
      case "":
        return;
      default:
        response = `Command not found: "${trimmed}". Type "help" for available commands.`;
    }

    setHistory((prev) => [
      ...prev, 
      { type: 'input', content: cmd },
      { type: 'output', content: response }
    ]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full max-w-2xl bg-[#121215] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[520px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-[#18181c] border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-xs font-mono text-textMuted">harsh@iet-lucknow:~</div>
            <button onClick={onClose} className="text-textMuted hover:text-white"><X size={16} /></button>
          </div>
          
          <div 
            className="flex-1 p-5 font-mono text-xs sm:text-sm overflow-y-auto leading-relaxed"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div key={i} className="mb-2">
                {line.type === 'input' && (
                  <div className="text-textMuted">
                    <span className="text-green-400">harsh@iet</span>:<span className="text-blue-400">~</span>$ <span className="text-white">{line.content}</span>
                  </div>
                )}
                {line.type === 'output' && (
                  <div className="text-textMuted whitespace-pre-wrap">{line.content}</div>
                )}
                {line.type === 'system' && (
                  <div className="text-primary font-semibold">{line.content}</div>
                )}
              </div>
            ))}
            
            <div className="flex items-center text-textMuted mt-2">
              <span className="text-green-400">harsh@iet</span>:<span className="text-blue-400">~</span>$ 
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white ml-2 focus:ring-0"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <div ref={endRef} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
