import React, { createContext, useContext, useState, useEffect } from "react";
import { defaultPortfolioData } from "../data/defaultData";

const STORAGE_KEY = "harsh_portfolio_data_v3";
const OLD_STORAGE_KEY = "harsh_portfolio_data_v2";
const ADMIN_AUTH_KEY = "harsh_owner_auth_session";
const ADMIN_PASSKEY_KEY = "harsh_owner_passkey";
const DEFAULT_PASSKEY = "harsh2026";

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.personalInfo?.cgpa === "8.39/10" || parsed.personalInfo?.cgpa === "8.39" || parsed.personalInfo?.cgpa === "833") {
          parsed.personalInfo.cgpa = "8.33/10";
        }
        if (Array.isArray(parsed.stats)) {
          parsed.stats = parsed.stats.map(s => {
            if (s.value === "8.39" || s.value === "833" || (s.label?.toLowerCase().includes("cgpa") && s.value === "833")) {
              return { ...s, value: "8.33" };
            }
            return s;
          });
        }
        return {
          ...defaultPortfolioData,
          ...parsed,
          personalInfo: { ...defaultPortfolioData.personalInfo, ...(parsed.personalInfo || {}) }
        };
      }
    } catch (e) {
      console.warn("Failed to load portfolio data from localStorage, using defaults", e);
    }
    return defaultPortfolioData;
  });

  // Authentication State
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState("learning");
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, [data]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Admin authentication handlers
  const loginAdmin = (passkey) => {
    const stored = localStorage.getItem(ADMIN_PASSKEY_KEY) || DEFAULT_PASSKEY;
    if (passkey === stored) {
      setIsAdmin(true);
      try {
        localStorage.setItem(ADMIN_AUTH_KEY, "true");
      } catch (e) {
        console.warn("localStorage error", e);
      }
      setIsAuthModalOpen(false);
      showToast("Owner Mode Unlocked! You can now edit and update your portfolio.");
      return true;
    } else {
      showToast("Incorrect passkey. Access denied.", "error");
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setIsEditorOpen(false);
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch (e) {
      console.warn("localStorage error", e);
    }
    showToast("Logged out of Owner Mode. Public visitor view active.");
  };

  const changeAdminPasskey = (currentPass, newPass) => {
    const stored = localStorage.getItem(ADMIN_PASSKEY_KEY) || DEFAULT_PASSKEY;
    if (currentPass !== stored) {
      showToast("Current passkey is incorrect.", "error");
      return false;
    }
    if (!newPass || newPass.trim().length < 4) {
      showToast("New passkey must be at least 4 characters.", "error");
      return false;
    }
    localStorage.setItem(ADMIN_PASSKEY_KEY, newPass.trim());
    showToast("Passkey changed successfully!");
    return true;
  };

  // Open editor only if authenticated as Owner
  const openEditorWithTab = (tab = "learning") => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    setEditorTab(tab);
    setIsEditorOpen(true);
  };

  // Personal Info update
  const updatePersonalInfo = (updates) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...updates }
    }));
    showToast("Profile details updated!");
  };

  // Skills updates
  const addSkill = (categoryId, newSkill) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!newSkill || !newSkill.trim()) return;
    const trimmed = newSkill.trim();
    setData((prev) => ({
      ...prev,
      skillsCategories: prev.skillsCategories.map((cat) => {
        if (cat.id === categoryId || cat.title.toLowerCase() === categoryId.toLowerCase()) {
          if (cat.skills.includes(trimmed)) return cat;
          return { ...cat, skills: [...cat.skills, trimmed] };
        }
        return cat;
      })
    }));
    showToast(`Added "${trimmed}" to skills!`);
  };

  const removeSkill = (categoryId, skillToRemove) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    setData((prev) => ({
      ...prev,
      skillsCategories: prev.skillsCategories.map((cat) => {
        if (cat.id === categoryId || cat.title.toLowerCase() === categoryId.toLowerCase()) {
          return { ...cat, skills: cat.skills.filter((s) => s !== skillToRemove) };
        }
        return cat;
      })
    }));
    showToast(`Removed "${skillToRemove}" from skills.`);
  };

  const addSkillCategory = (title) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!title || !title.trim()) return;
    const trimmed = title.trim();
    const id = trimmed.toLowerCase().replace(/[^a-z0-9]/g, "-");
    setData((prev) => ({
      ...prev,
      skillsCategories: [...prev.skillsCategories, { id, title: trimmed, skills: [] }]
    }));
    showToast(`Category "${trimmed}" created!`);
  };

  // Learning Roadmap updates
  const addLearningItem = (item) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    const newItem = {
      id: "learn-" + Date.now(),
      category: item.category || "General Tech",
      tech: item.tech,
      status: item.status || "Actively Learning",
      progress: item.progress || 50,
      notes: item.notes || ""
    };
    setData((prev) => ({
      ...prev,
      learningRoadmap: [newItem, ...prev.learningRoadmap]
    }));
    showToast(`Added "${item.tech}" to your Learning Radar!`);
  };

  const updateLearningItem = (id, updates) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    setData((prev) => ({
      ...prev,
      learningRoadmap: prev.learningRoadmap.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    }));
    showToast("Learning item updated!");
  };

  const deleteLearningItem = (id) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    setData((prev) => ({
      ...prev,
      learningRoadmap: prev.learningRoadmap.filter((item) => item.id !== id)
    }));
    showToast("Removed from learning roadmap.");
  };

  // Projects updates
  const addProject = (project) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    const newProject = {
      ...project,
      id: "proj-" + Date.now(),
      bullets: Array.isArray(project.bullets)
        ? project.bullets
        : (project.bullets || "").split("\n").filter(Boolean),
      tech: Array.isArray(project.tech)
        ? project.tech
        : (project.tech || "").split(",").map((t) => t.trim()).filter(Boolean)
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
    showToast(`Project "${project.title}" added successfully!`);
  };

  const updateProject = (id, updates) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...updates,
            bullets: Array.isArray(updates.bullets)
              ? updates.bullets
              : typeof updates.bullets === "string"
              ? updates.bullets.split("\n").filter(Boolean)
              : p.bullets,
            tech: Array.isArray(updates.tech)
              ? updates.tech
              : typeof updates.tech === "string"
              ? updates.tech.split(",").map((t) => t.trim()).filter(Boolean)
              : p.tech
          };
        }
        return p;
      })
    }));
    showToast("Project details saved!");
  };

  const deleteProject = (id) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
    showToast("Project deleted.");
  };

  // Achievements updates
  const addAchievement = (ach) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    const newAch = {
      ...ach,
      id: "ach-" + Date.now()
    };
    setData((prev) => ({
      ...prev,
      achievements: [newAch, ...prev.achievements]
    }));
    showToast(`Achievement "${ach.title}" added!`);
  };

  const deleteAchievement = (id) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id)
    }));
    showToast("Achievement removed.");
  };

  // Stats updates
  const updateStats = (newStats) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    setData((prev) => ({
      ...prev,
      stats: newStats
    }));
    showToast("Key metrics updated!");
  };

  // Export / Import
  const exportDataJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `harsh_mishra_portfolio_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Portfolio backup downloaded as JSON!");
  };

  const importDataJSON = (jsonString) => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return false;
    }
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.personalInfo || !parsed.skillsCategories) {
        throw new Error("Invalid portfolio data structure.");
      }
      setData(parsed);
      showToast("Portfolio data restored successfully!");
      return true;
    } catch (err) {
      showToast("Failed to parse JSON file: " + err.message, "error");
      return false;
    }
  };

  const resetToDefaults = () => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      return;
    }
    if (window.confirm("Are you sure you want to reset all portfolio data back to resume defaults?")) {
      setData(defaultPortfolioData);
      localStorage.removeItem(STORAGE_KEY);
      showToast("Reset to default resume data.");
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdmin,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginAdmin,
        logoutAdmin,
        changeAdminPasskey,
        isEditorOpen,
        setIsEditorOpen,
        editorTab,
        setEditorTab,
        openEditorWithTab,
        toast,
        updatePersonalInfo,
        addSkill,
        removeSkill,
        addSkillCategory,
        addLearningItem,
        updateLearningItem,
        deleteLearningItem,
        addProject,
        updateProject,
        deleteProject,
        addAchievement,
        deleteAchievement,
        updateStats,
        exportDataJSON,
        importDataJSON,
        resetToDefaults
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toast && (
        <div
          className={`fixed bottom-24 right-6 z-[200] px-5 py-3 rounded-xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 animate-fade-in transition-all text-sm font-medium ${
            toast.type === "error"
              ? "bg-red-950/85 border-red-500/50 text-red-200"
              : "bg-surfaceHighlight/90 border-primary/50 text-white shadow-primary/20"
          }`}
        >
          <div className={`w-2.5 h-2.5 rounded-full ${toast.type === "error" ? "bg-red-400" : "bg-primary animate-pulse"}`} />
          <span>{toast.message}</span>
        </div>
      )}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
