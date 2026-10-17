import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { Lock, KeyRound, Eye, EyeOff, X, ShieldCheck } from "lucide-react";

function AdminLoginForm({ onClose, loginAdmin }) {
  const [passkey, setPasskey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passkey.trim()) return;
    const ok = loginAdmin(passkey.trim());
    if (!ok) {
      setError(true);
      setPasskey("");
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-[#121215] border border-white/10 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-textMuted hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Lock Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Lock size={26} />
          </div>
          <h3 className="text-xl font-bold text-white mb-1.5 flex items-center gap-2">
            Owner Access Control
          </h3>
          <p className="text-xs text-textMuted max-w-xs leading-relaxed">
            Only Harsh Mishra has permission to update and edit this portfolio. Regular visitors have view-only access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-textMuted mb-1.5">
              Enter Owner Passkey
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textMuted">
                <KeyRound size={16} />
              </div>
              <input
                ref={inputRef}
                type={showPassword ? "text" : "password"}
                required
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  setError(false);
                }}
                placeholder="Enter passkey..."
                className={`w-full bg-[#0a0a0c] border rounded-xl pl-10 pr-10 py-3 text-white text-sm focus:outline-none transition-colors ${
                  error
                    ? "border-red-500/80 focus:border-red-500"
                    : "border-white/10 focus:border-primary"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-textMuted hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-400 mt-1.5">
                Incorrect passkey. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-primaryHover text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
          >
            <ShieldCheck size={16} /> Unlock Owner Edit Mode
          </button>

          <div className="pt-2 text-center text-[11px] font-mono text-textMuted">
            Default passkey: <span className="text-primary font-bold">harsh2026</span>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export function AdminLoginModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginAdmin } = usePortfolio();

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <AdminLoginForm
          onClose={() => setIsAuthModalOpen(false)}
          loginAdmin={loginAdmin}
        />
      )}
    </AnimatePresence>
  );
}
