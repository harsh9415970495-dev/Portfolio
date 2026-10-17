import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import {
  X,
  Plus,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  BookOpen,
  Wrench,
  FolderGit2,
  Trophy,
  User,
  Save,
  CheckCircle2,
  Copy
} from "lucide-react";

export function ProfileEditorModal() {
  const {
    data,
    isEditorOpen,
    setIsEditorOpen,
    editorTab,
    setEditorTab,
    updatePersonalInfo,
    addSkill,
    removeSkill,
    addSkillCategory,
    addLearningItem,
    deleteLearningItem,
    addProject,
    deleteProject,
    addAchievement,
    deleteAchievement,
    updateStats,
    exportDataJSON,
    importDataJSON,
    resetToDefaults,
    changeAdminPasskey,
    logoutAdmin
  } = usePortfolio();

  const [passChange, setPassChange] = useState({ current: "", newPass: "" });

  // Local form states
  const [newSkillInputs, setNewSkillInputs] = useState({});
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  // New Learning item form
  const [learningForm, setLearningForm] = useState({
    tech: "",
    category: "Artificial Intelligence",
    status: "Actively Learning",
    progress: 70,
    notes: ""
  });

  // New Project form
  const [projectForm, setProjectForm] = useState({
    title: "",
    tag: "",
    description: "",
    tech: "",
    github: "",
    live: "",
    bullets: ""
  });

  // New Achievement form
  const [achForm, setAchForm] = useState({
    title: "",
    description: "",
    badge: ""
  });

  // Personal Info form
  const [bioForm, setBioForm] = useState({ ...data.personalInfo });

  // Stats edit form
  const [statsForm, setStatsForm] = useState([...data.stats]);

  const [copiedCode, setCopiedCode] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isEditorOpen) {
        setIsEditorOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditorOpen, setIsEditorOpen]);

  const handleAddSkill = (catId) => {
    const val = newSkillInputs[catId];
    if (val && val.trim()) {
      addSkill(catId, val.trim());
      setNewSkillInputs((prev) => ({ ...prev, [catId]: "" }));
    }
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (newCategoryTitle.trim()) {
      addSkillCategory(newCategoryTitle.trim());
      setNewCategoryTitle("");
    }
  };

  const handleAddLearning = (e) => {
    e.preventDefault();
    if (!learningForm.tech.trim()) return;
    addLearningItem(learningForm);
    setLearningForm({
      tech: "",
      category: "Artificial Intelligence",
      status: "Actively Learning",
      progress: 70,
      notes: ""
    });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;
    addProject(projectForm);
    setProjectForm({
      title: "",
      tag: "",
      description: "",
      tech: "",
      github: "",
      live: "",
      bullets: ""
    });
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (!achForm.title.trim()) return;
    addAchievement(achForm);
    setAchForm({ title: "", description: "", badge: "" });
  };

  const handleSaveBio = (e) => {
    e.preventDefault();
    updatePersonalInfo(bioForm);
  };

  const handleSaveStats = () => {
    updateStats(statsForm);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        importDataJSON(content);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const tabs = [
    { id: "learning", label: "Learning & Tech Radar", icon: BookOpen },
    { id: "skills", label: "Skills Arsenal", icon: Wrench },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "achievements", label: "Achievements & Metrics", icon: Trophy },
    { id: "bio", label: "Bio & Education", icon: User },
    { id: "backup", label: "Export / Backup", icon: Download }
  ];

  return (
    <AnimatePresence>
      {isEditorOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setIsEditorOpen(false)}
        >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 bg-[#161619] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Live Portfolio Editor
                  <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                    Real-time Sync
                  </span>
                </h3>
                <p className="text-xs text-textMuted">
                  Easily update tech you are learning, skills, projects, and achievements.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditorOpen(false)}
              className="p-2 text-textMuted hover:text-white hover:bg-white/5 rounded-full transition-colors"
              title="Close (ESC)"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Bar / Tabs */}
          <div className="flex items-center gap-1 px-4 py-2 bg-[#141417] border-b border-white/5 overflow-x-auto scrollbar-none shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = editorTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setEditorTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    active
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-textMuted hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0e0e11] text-sm">
            {/* 1. CURRENTLY LEARNING & TECH RADAR */}
            {editorTab === "learning" && (
              <div className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold text-base mb-1">
                    Continuous Learning Roadmap
                  </h4>
                  <p className="text-textMuted text-xs">
                    As you learn new tech (AI agents, backend architectures, system design, or low-level concepts), log them here. They immediately appear in the &quot;Currently Learning&quot; section on your live site!
                  </p>
                </div>

                {/* Add new learning item form */}
                <form
                  onSubmit={handleAddLearning}
                  className="bg-[#161619] border border-white/10 rounded-xl p-4 sm:p-5 space-y-4"
                >
                  <div className="font-semibold text-white flex items-center gap-2">
                    <Plus size={16} className="text-primary" />
                    <span>Add New Tech / Topic You Are Learning</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Technology / Concept Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. LangGraph, Kafka, Rust, CUDA"
                        value={learningForm.tech}
                        onChange={(e) =>
                          setLearningForm({ ...learningForm, tech: e.target.value })
                        }
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Domain / Category
                      </label>
                      <select
                        value={learningForm.category}
                        onChange={(e) =>
                          setLearningForm({ ...learningForm, category: e.target.value })
                        }
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                      >
                        <option value="Artificial Intelligence">Artificial Intelligence & Agents</option>
                        <option value="Backend & Distributed Systems">Backend & Distributed Systems</option>
                        <option value="Systems & Low Level">Systems & Low Level</option>
                        <option value="Competitive Programming">Competitive Programming</option>
                        <option value="Cloud & DevOps">Cloud & DevOps</option>
                        <option value="Frontend & UI">Frontend & UI</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Status Tag
                      </label>
                      <select
                        value={learningForm.status}
                        onChange={(e) =>
                          setLearningForm({ ...learningForm, status: e.target.value })
                        }
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                      >
                        <option value="Actively Learning">Actively Learning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Deep Dive">Deep Dive</option>
                        <option value="Hands-on Project">Hands-on Project</option>
                        <option value="Mastered">Mastered / Production</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-textMuted mb-1">
                      Notes / What You Are Building or Exploring
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Implementing multi-agent reflection loops, building streaming microservices"
                      value={learningForm.notes}
                      onChange={(e) =>
                        setLearningForm({ ...learningForm, notes: e.target.value })
                      }
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg font-medium transition-all text-xs flex items-center gap-2"
                  >
                    <Plus size={14} /> Add to Live Radar
                  </button>
                </form>

                {/* List of current learning roadmap items */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-white text-xs uppercase tracking-wider text-textMuted">
                    Active Tech Radar Items ({data.learningRoadmap.length})
                  </h5>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {data.learningRoadmap.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-[#141417] border border-white/10 rounded-xl flex flex-col justify-between group hover:border-primary/40 transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono">
                              {item.category}
                            </span>
                            <button
                              onClick={() => deleteLearningItem(item.id)}
                              className="text-textMuted hover:text-red-400 p-1 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="text-white font-bold text-sm mb-1">{item.tech}</div>
                          <div className="text-xs text-textMuted mb-2">
                            <span className="text-green-400 font-medium">[{item.status}]</span>{" "}
                            {item.notes}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. SKILLS ARSENAL */}
            {editorTab === "skills" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#161619] p-4 rounded-xl border border-white/10">
                  <div>
                    <h4 className="text-white font-semibold">Technical Arsenal Manager</h4>
                    <p className="text-textMuted text-xs">
                      Click the &times; on any chip to remove it, or type below any category to add new skills instantly.
                    </p>
                  </div>

                  {/* Add New Category */}
                  <form onSubmit={handleCreateCategory} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="New Category (e.g. Cloud)"
                      value={newCategoryTitle}
                      onChange={(e) => setNewCategoryTitle(e.target.value)}
                      className="bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      + Category
                    </button>
                  </form>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {data.skillsCategories.map((cat) => (
                    <div
                      key={cat.id || cat.title}
                      className="bg-[#141417] border border-white/10 rounded-xl p-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-bold text-white text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            {cat.title}
                          </h5>
                          <span className="text-xs text-textMuted font-mono">
                            {cat.skills.length} skills
                          </span>
                        </div>

                        {/* Skill Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {cat.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white group hover:border-red-500/40 transition-colors"
                            >
                              <span>{skill}</span>
                              <button
                                type="button"
                                onClick={() => removeSkill(cat.id || cat.title, skill)}
                                className="text-textMuted hover:text-red-400 font-bold ml-1"
                                title={`Remove ${skill}`}
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Add skill input for this category */}
                      <div className="flex gap-2 pt-2 border-t border-white/5">
                        <input
                          type="text"
                          placeholder={`Add to ${cat.title}...`}
                          value={newSkillInputs[cat.id || cat.title] || ""}
                          onChange={(e) =>
                            setNewSkillInputs({
                              ...newSkillInputs,
                              [cat.id || cat.title]: e.target.value
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddSkill(cat.id || cat.title);
                            }
                          }}
                          className="flex-1 bg-[#0a0a0c] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddSkill(cat.id || cat.title)}
                          className="px-3 py-1.5 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary hover:text-white rounded-lg text-xs font-semibold transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. PROJECTS */}
            {editorTab === "projects" && (
              <div className="space-y-6">
                <form
                  onSubmit={handleAddProject}
                  className="bg-[#161619] border border-white/10 rounded-xl p-4 sm:p-5 space-y-4"
                >
                  <div className="font-semibold text-white flex items-center gap-2">
                    <Plus size={16} className="text-primary" />
                    <span>Add New Project</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CodeForge AI"
                        value={projectForm.title}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, title: e.target.value })
                        }
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Tag / Subtitle
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. AI / FinTech Platform"
                        value={projectForm.tag}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, tag: e.target.value })
                        }
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/..."
                        value={projectForm.github}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, github: e.target.value })
                        }
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Live Demo URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://... or #"
                        value={projectForm.live}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, live: e.target.value })
                        }
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-textMuted mb-1">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="React, FastAPI, PostgreSQL, Socket.io"
                      value={projectForm.tech}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, tech: e.target.value })
                      }
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-textMuted mb-1">
                      Short Description / Overview
                    </label>
                    <input
                      type="text"
                      placeholder="A high-level summary of what the system does."
                      value={projectForm.description}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, description: e.target.value })
                      }
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-textMuted mb-1">
                      Key Highlights / Bullets (One per line)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="• Built AI-powered architecture...&#10;• Designed PostgreSQL database...&#10;• Implemented real-time market updates..."
                      value={projectForm.bullets}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, bullets: e.target.value })
                      }
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg font-medium transition-all text-xs flex items-center gap-2"
                  >
                    <Plus size={14} /> Add Project
                  </button>
                </form>

                {/* Existing Projects List */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-white text-xs uppercase tracking-wider text-textMuted">
                    Current Featured Projects ({data.projects.length})
                  </h5>
                  <div className="space-y-3">
                    {data.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="bg-[#141417] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-base">{proj.title}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                              {proj.tag}
                            </span>
                          </div>
                          <p className="text-xs text-textMuted max-w-2xl">{proj.description}</p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {proj.tech.map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 rounded text-textMuted"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => deleteProject(proj.id)}
                            className="p-2 text-textMuted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-xs flex items-center gap-1"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. ACHIEVEMENTS & METRICS */}
            {editorTab === "achievements" && (
              <div className="space-y-6">
                {/* Stats Metrics Counters */}
                <div className="bg-[#161619] border border-white/10 rounded-xl p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-white text-sm">
                      Key Metrics & Numbers (Displayed on Stats Bar)
                    </h5>
                    <button
                      onClick={handleSaveStats}
                      className="px-3 py-1.5 bg-primary hover:bg-primaryHover text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <Save size={14} /> Save Metrics
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {statsForm.map((stat, idx) => (
                      <div key={idx} className="bg-[#0a0a0c] p-2.5 rounded-lg border border-white/5">
                        <label className="block text-[10px] text-textMuted font-mono mb-1 truncate">
                          {stat.label}
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const updated = [...statsForm];
                            updated[idx] = { ...updated[idx], value: e.target.value };
                            setStatsForm(updated);
                          }}
                          className="w-full bg-transparent border-b border-white/20 text-white font-bold text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Achievement Form */}
                <form
                  onSubmit={handleAddAchievement}
                  className="bg-[#161619] border border-white/10 rounded-xl p-4 sm:p-5 space-y-4"
                >
                  <div className="font-semibold text-white flex items-center gap-2">
                    <Plus size={16} className="text-primary" />
                    <span>Add New Achievement / Contest Milestone</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Achievement Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CodeChef 4-Star or Hackathon 1st Place"
                        value={achForm.title}
                        onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Badge Tag
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 4★ or Winner"
                        value={achForm.badge}
                        onChange={(e) => setAchForm({ ...achForm, badge: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-textMuted mb-1">
                      Description / Context
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Solved 800+ problems across CodeChef and Codeforces"
                      value={achForm.description}
                      onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg font-medium transition-all text-xs flex items-center gap-2"
                  >
                    <Plus size={14} /> Add Achievement
                  </button>
                </form>

                {/* Achievements List */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-white text-xs uppercase tracking-wider text-textMuted">
                    Current Achievements ({data.achievements.length})
                  </h5>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {data.achievements.map((ach) => (
                      <div
                        key={ach.id}
                        className="p-3.5 bg-[#141417] border border-white/10 rounded-xl flex items-start justify-between gap-3 group"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-white text-sm">{ach.title}</span>
                            {ach.badge && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30 font-mono">
                                {ach.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-textMuted">{ach.description}</p>
                        </div>
                        <button
                          onClick={() => deleteAchievement(ach.id)}
                          className="text-textMuted hover:text-red-400 p-1 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. BIO & EDUCATION */}
            {editorTab === "bio" && (
              <form onSubmit={handleSaveBio} className="space-y-5">
                <div className="bg-[#161619] border border-white/10 rounded-xl p-4 sm:p-5 space-y-4">
                  <h4 className="font-semibold text-white text-sm">
                    Personal Details & Social Links
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={bioForm.name || ""}
                        onChange={(e) => setBioForm({ ...bioForm, name: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={bioForm.phone || ""}
                        onChange={(e) => setBioForm({ ...bioForm, phone: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={bioForm.email || ""}
                        onChange={(e) => setBioForm({ ...bioForm, email: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={bioForm.linkedin || ""}
                        onChange={(e) => setBioForm({ ...bioForm, linkedin: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={bioForm.github || ""}
                        onChange={(e) => setBioForm({ ...bioForm, github: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Codeforces Profile
                      </label>
                      <input
                        type="url"
                        value={bioForm.codeforces || ""}
                        onChange={(e) => setBioForm({ ...bioForm, codeforces: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <h4 className="font-semibold text-white text-sm pt-3 border-t border-white/5">
                    Education & College
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        University / Institute
                      </label>
                      <input
                        type="text"
                        value={bioForm.college || ""}
                        onChange={(e) => setBioForm({ ...bioForm, college: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        CGPA
                      </label>
                      <input
                        type="text"
                        value={bioForm.cgpa || ""}
                        onChange={(e) => setBioForm({ ...bioForm, cgpa: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Degree Program
                      </label>
                      <input
                        type="text"
                        value={bioForm.degree || ""}
                        onChange={(e) => setBioForm({ ...bioForm, degree: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-textMuted mb-1">
                        Duration / Batch
                      </label>
                      <input
                        type="text"
                        value={bioForm.duration || ""}
                        onChange={(e) => setBioForm({ ...bioForm, duration: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <h4 className="font-semibold text-white text-sm pt-3 border-t border-white/5">
                    Summary / Bio
                  </h4>

                  <div>
                    <textarea
                      rows={4}
                      value={bioForm.summary || ""}
                      onChange={(e) => setBioForm({ ...bioForm, summary: e.target.value })}
                      className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs leading-relaxed focus:outline-none focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-primary hover:bg-primaryHover text-white rounded-lg font-medium transition-all text-xs flex items-center gap-2"
                  >
                    <Save size={16} /> Save Profile Details
                  </button>
                </div>
              </form>
            )}

            {/* 6. BACKUP & SYNC */}
            {editorTab === "backup" && (
              <div className="space-y-6">
                <div className="bg-[#161619] border border-white/10 rounded-xl p-5 space-y-4">
                  <h4 className="text-white font-semibold text-base">
                    Backup, Export & Commit Data
                  </h4>
                  <p className="text-textMuted text-xs leading-relaxed">
                    All edits are saved live in your browser&apos;s <code className="text-primary font-mono">localStorage</code>. To keep a permanent file or transfer updates to other machines, you can download a JSON backup or copy the code.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={exportDataJSON}
                      className="px-4 py-2.5 bg-primary hover:bg-primaryHover text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
                    >
                      <Download size={16} /> Download JSON Backup
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all"
                    >
                      <Upload size={16} /> Restore from JSON File
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <button
                      onClick={handleCopyCode}
                      className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all"
                    >
                      {copiedCode ? (
                        <>
                          <CheckCircle2 size={16} className="text-green-400" /> Copied to Clipboard!
                        </>
                      ) : (
                        <>
                          <Copy size={16} /> Copy Clean JSON Data
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Owner Security Settings */}
                <div className="bg-[#161619] border border-white/10 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-white text-sm">
                        Owner Security & Passkey Settings
                      </h5>
                      <p className="text-textMuted text-xs">
                        Change the secret passkey required to access this editor and update your portfolio.
                      </p>
                    </div>
                    <button
                      onClick={logoutAdmin}
                      className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 rounded-lg text-xs font-medium transition-colors"
                    >
                      Logout of Owner Mode
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (changeAdminPasskey(passChange.current, passChange.newPass)) {
                        setPassChange({ current: "", newPass: "" });
                      }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2"
                  >
                    <div>
                      <label className="block text-[11px] font-medium text-textMuted mb-1">
                        Current Passkey
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Current passkey..."
                        value={passChange.current}
                        onChange={(e) => setPassChange({ ...passChange, current: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-textMuted mb-1">
                        New Passkey (min 4 chars)
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="New secret passkey..."
                        value={passChange.newPass}
                        onChange={(e) => setPassChange({ ...passChange, newPass: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full py-2 bg-primary hover:bg-primaryHover text-white rounded-lg text-xs font-semibold transition-all shadow-md shadow-primary/20"
                      >
                        Update Secret Passkey
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h5 className="font-semibold text-red-300 text-sm">
                      Reset Everything to Resume Defaults
                    </h5>
                    <p className="text-textMuted text-xs">
                      Discard all browser changes and restore the default state from your resume.
                    </p>
                  </div>
                  <button
                    onClick={resetToDefaults}
                    className="px-4 py-2 bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all border border-red-500/40 w-fit"
                  >
                    <RotateCcw size={14} /> Reset to Defaults
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 border-t border-white/10 bg-[#141417] flex items-center justify-between text-xs text-textMuted shrink-0">
            <span>
              💡 <span className="text-white font-medium">Tip:</span> You can also press <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white text-[10px]">ESC</kbd> or click the &quot;Update Profile&quot; button in the header anytime.
            </span>
            <button
              onClick={() => setIsEditorOpen(false)}
              className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs font-medium transition-colors"
            >
              Done & Close
            </button>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
