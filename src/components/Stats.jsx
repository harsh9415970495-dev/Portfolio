import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";

function Counter({ end, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (end === "∞" || typeof end === "string" && isNaN(parseInt(end, 10))) {
      return;
    }
    
    let start = 0;
    const endNum = parseInt(end.toString().replace(/[^0-9]/g, ""), 10);
    if (!endNum) return;
    
    const stepTime = Math.max(10, Math.floor((duration * 1000) / endNum));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= endNum) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  const isSpecial = end === "∞" || (typeof end === "string" && isNaN(parseInt(end, 10)));

  return (
    <span ref={nodeRef} className="font-mono tabular-nums">
      {isSpecial ? end : count}
      {suffix}
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
                <Counter end={stat.value} suffix="" />
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
