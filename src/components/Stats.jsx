import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";

function Counter({ end, duration = 1.8 }) {
  const nodeRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [displayValue, setDisplayValue] = useState(() => {
    const raw = String(end ?? "");
    const match = raw.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) return raw;
    const [, prefix, numStr, suffix] = match;
    const decimals = numStr.includes(".") ? (numStr.split(".")[1] || "").length : 0;
    return `${prefix}${(0).toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const raw = String(end ?? "");
    const match = raw.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

    if (!match) {
      setDisplayValue(raw);
      return;
    }

    if (!inView) {
      const [, prefix, numStr, suffix] = match;
      const decimals = numStr.includes(".") ? (numStr.split(".")[1] || "").length : 0;
      setDisplayValue(`${prefix}${(0).toFixed(decimals)}${suffix}`);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    if (isNaN(target)) {
      setDisplayValue(raw);
      return;
    }

    const decimals = numStr.includes(".") ? (numStr.split(".")[1] || "").length : 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;
    let animId;

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;

      setDisplayValue(`${prefix}${current.toFixed(decimals)}${suffix}`);

      if (progress < 1) {
        animId = requestAnimationFrame(update);
      } else {
        setDisplayValue(`${prefix}${target.toFixed(decimals)}${suffix}`);
      }
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [inView, end, duration]);

  return (
    <span ref={nodeRef} className="font-mono tabular-nums">
      {displayValue}
    </span>
  );
}


export function Stats() {
  const { data } = usePortfolio();
  const statsList = data.stats || [
    { value: "700+", label: "DSA Problems Solved" },
    { value: "100+", label: "CP Contests" },
    { value: "3★", label: "CodeChef Rating" },
    { value: "8.33", label: "Current CGPA" },
    { value: "4+", label: "Production Projects" },
    { value: "SIH", label: "2025 Participant" }
  ];

  return (
    <section className="py-16 border-y border-white/5 bg-surfaceHighlight/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {statsList.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col items-center justify-center text-center group"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1.5 group-hover:text-primary transition-colors font-mono">
                <Counter end={stat.value} />
              </div>
              <div className="text-xs text-textMuted font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
