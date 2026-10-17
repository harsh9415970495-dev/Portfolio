import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Code, Cpu, ExternalLink, RefreshCw, CheckCircle2, Trophy, Flame } from "lucide-react";
import { fetchAllCodingStats, getCachedCodingStats } from "../utils/codingProfiles";
import { cpTopics } from "../data/skills";

export function CompetitiveProgramming() {
  const [stats, setStats] = useState(getCachedCodingStats);
  const [loading, setLoading] = useState(false);
  const [syncedRecently, setSyncedRecently] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchStats = async () => {
      setLoading(true);
      try {
        const liveData = await fetchAllCodingStats();
        if (active) setStats(liveData);
      } catch (e) {
        console.warn("Failed to load live coding stats:", e);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchStats();

    // Auto-refresh every 3 minutes in the background
    const timer = setInterval(() => {
      fetchStats();
    }, 180000);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  const handleManualRefresh = async () => {
    setLoading(true);
    try {
      const liveData = await fetchAllCodingStats();
      setStats(liveData);
      setSyncedRecently(true);
      setTimeout(() => setSyncedRecently(false), 3000);
    } catch (e) {
      console.warn("Failed to refresh stats:", e);
    } finally {
      setLoading(false);
    }
  };

  const { platforms } = stats;

  return (
    <section id="cp" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Live Sync Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Terminal className="text-primary" size={28} />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Competitive Programming & DSA
              </h2>
            </div>
            <div className="w-12 h-1 bg-primary rounded-full mb-4" />
            <p className="text-textMuted text-base sm:text-lg max-w-2xl">
              Real-time synchronization connected directly to my coding profiles. Automatically updates whenever I solve problems or participate in contests.
            </p>
          </div>

          {/* Sync Trigger and Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>{syncedRecently ? "Updated Just Now!" : stats.isLive ? `Live Synced (${stats.lastUpdated || "Active"})` : "Live Connected"}</span>
            </div>

            <button
              onClick={handleManualRefresh}
              disabled={loading}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-textMuted hover:text-white transition-all disabled:opacity-50"
              title="Refresh live platform data"
            >
              <RefreshCw size={16} className={loading ? "animate-spin text-primary" : ""} />
            </button>
          </div>
        </motion.div>

        {/* Live Aggregate Stat Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass-card p-4 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 text-primary rounded-lg">
              <Flame size={20} />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                {stats.totalProblemsSolved}+
              </div>
              <div className="text-[11px] text-textMuted uppercase tracking-wider">Total Solved (Live)</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="p-2.5 bg-yellow-500/10 text-yellow-400 rounded-lg">
              <Trophy size={20} />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">3★</div>
              <div className="text-[11px] text-textMuted uppercase tracking-wider">CodeChef Rating</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="p-2.5 bg-accent/10 text-accent rounded-lg">
              <Code size={20} />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">100+</div>
              <div className="text-[11px] text-textMuted uppercase tracking-wider">Contests Given</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="p-2.5 bg-green-500/10 text-green-400 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                {platforms.codeforces.solvedCount}+
              </div>
              <div className="text-[11px] text-textMuted uppercase tracking-wider">Codeforces Solved</div>
            </div>
          </div>
        </motion.div>

        {/* 4 Platform Profile Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* 1. LeetCode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-yellow-500/30 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-white text-base">LeetCode</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                  {platforms.leetcode.handle}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-extrabold text-white font-mono">
                  {platforms.leetcode.totalSolved}
                </div>
                <div className="text-xs text-textMuted">Problems Solved</div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-white/5 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-green-400">Easy:</span>
                  <span className="text-white font-bold">{platforms.leetcode.easy}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400">Medium:</span>
                  <span className="text-white font-bold">{platforms.leetcode.medium}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-400">Hard:</span>
                  <span className="text-white font-bold">{platforms.leetcode.hard}</span>
                </div>
              </div>
            </div>

            <a
              href={platforms.leetcode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-2 bg-white/5 hover:bg-yellow-500/20 border border-white/10 hover:border-yellow-500/40 text-textMuted hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <span>View LeetCode Profile</span>
              <ExternalLink size={13} />
            </a>
          </motion.div>

          {/* 2. Codeforces */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-blue-500/30 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-white text-base">Codeforces</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-primary border border-primary/20">
                  {platforms.codeforces.handle}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-extrabold text-white font-mono">
                  {platforms.codeforces.rating}
                </div>
                <div className="text-xs text-textMuted">
                  Current Rating (Max: {platforms.codeforces.maxRating})
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-white/5 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-textMuted">Rank:</span>
                  <span className="text-primary font-bold capitalize">{platforms.codeforces.rank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textMuted">Unique Solved:</span>
                  <span className="text-white font-bold">{platforms.codeforces.solvedCount}+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textMuted">College:</span>
                  <span className="text-textMuted truncate">{platforms.codeforces.organization}</span>
                </div>
              </div>
            </div>

            <a
              href={platforms.codeforces.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-2 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-primary/40 text-textMuted hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <span>View Codeforces Profile</span>
              <ExternalLink size={13} />
            </a>
          </motion.div>

          {/* 3. CodeChef */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-amber-500/30 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-white text-base">CodeChef</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {platforms.codechef.handle}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-extrabold text-amber-400 font-mono">
                  {platforms.codechef.stars}
                </div>
                <div className="text-xs text-textMuted">Competitive Rating (3-Star)</div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-white/5 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-textMuted">Problems Solved:</span>
                  <span className="text-white font-bold">{platforms.codechef.solvedCount}+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textMuted">Peak Level:</span>
                  <span className="text-white font-bold">{platforms.codechef.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textMuted">Contests:</span>
                  <span className="text-amber-400 font-bold">Active Starters</span>
                </div>
              </div>
            </div>

            <a
              href={platforms.codechef.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-2 bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/40 text-textMuted hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <span>View CodeChef Profile</span>
              <ExternalLink size={13} />
            </a>
          </motion.div>

          {/* 4. AtCoder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-orange-500/30 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-white text-base">AtCoder</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {platforms.atcoder.handle}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-extrabold text-orange-300 font-mono">
                  {platforms.atcoder.rating}
                </div>
                <div className="text-xs text-textMuted">Rating ({platforms.atcoder.color})</div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-white/5 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-textMuted">Global Rank:</span>
                  <span className="text-white font-bold">{platforms.atcoder.rank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textMuted">Percentile:</span>
                  <span className="text-green-400 font-bold">{platforms.atcoder.topPercentage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textMuted">Contests:</span>
                  <span className="text-white">ABC Regular</span>
                </div>
              </div>
            </div>

            <a
              href={platforms.atcoder.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-2 bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 text-textMuted hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <span>View AtCoder Profile</span>
              <ExternalLink size={13} />
            </a>
          </motion.div>
        </div>

        {/* Live Recent Submissions Feed */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Live Solves Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 glass-card p-6 sm:p-7 rounded-2xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-400" />
                <span>Live Recent Solves (Auto-Updated)</span>
              </h3>
              <span className="text-[11px] font-mono text-textMuted">LeetCode & Codeforces</span>
            </div>

            <div className="space-y-2.5">
              {platforms.leetcode.recentSubmissions.slice(0, 4).map((sub, idx) => (
                <div
                  key={`lc-${idx}`}
                  className="p-3 bg-surfaceHighlight/40 rounded-xl border border-white/5 flex items-center justify-between text-xs hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate mr-2">
                    <span className="px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 font-mono text-[10px]">
                      LC
                    </span>
                    <span className="text-white font-medium truncate">{sub.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-textMuted">{sub.lang}</span>
                    <span className="text-green-400 font-semibold text-[11px] bg-green-500/10 px-2 py-0.5 rounded-full">
                      Accepted
                    </span>
                  </div>
                </div>
              ))}

              {platforms.codeforces.recentSubmissions.slice(0, 3).map((sub, idx) => (
                <div
                  key={`cf-${idx}`}
                  className="p-3 bg-surfaceHighlight/40 rounded-xl border border-white/5 flex items-center justify-between text-xs hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate mr-2">
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-primary font-mono text-[10px]">
                      CF
                    </span>
                    <span className="text-white font-medium truncate">{sub.title}</span>
                  </div>
                  <span className="text-green-400 font-semibold text-[11px] bg-green-500/10 px-2 py-0.5 rounded-full shrink-0">
                    Accepted
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Strong Algorithmic Topics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 glass-card p-6 sm:p-7 rounded-2xl border border-white/10"
          >
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Cpu size={18} className="text-accent" />
              <span>Core Algorithms & Topics Mastered</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {cpTopics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-surfaceHighlight/30 border border-white/5 rounded-lg text-xs font-medium text-textMuted hover:text-white hover:border-primary/50 transition-colors"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-textMuted">Problem Solving Streak</span>
                <span className="text-xs font-mono text-green-400 font-semibold">Active Daily</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-accent h-full w-[88%] rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
