import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#0a0a0a]">
      {/* 1. Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* 2. Interactive Mouse Glow */}
      <motion.div
        className="absolute inset-0 z-0 transition-opacity duration-300"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.06), transparent 40%)`,
        }}
      />

      {/* 3. Floating Animated Orbs */}
      <motion.div
        animate={{
          x: ["0%", "20%", "0%"],
          y: ["0%", "30%", "0%"],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-primary/10 blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: ["0%", "-30%", "0%"],
          y: ["0%", "-10%", "0%"],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-accent/10 blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: ["0%", "10%", "0%"],
          y: ["0%", "-20%", "0%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[20%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-cyan-500/10 blur-[100px]"
      />
    </div>
  );
}
