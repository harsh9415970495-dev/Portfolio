import { motion } from "framer-motion";

export function Philosophy() {
  const statements = [
    "First understand the problem.",
    "Then understand the constraints.",
    "Design before coding.",
    "Make it work.",
    "Make it correct.",
    "Make it scalable.",
    "Then make it beautiful."
  ];

  return (
    <section className="py-32 relative flex items-center justify-center min-h-[60vh]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-semibold text-primary uppercase tracking-[0.3em] mb-12"
        >
          How I think about engineering
        </motion.h2>

        <div className="flex flex-col gap-6">
          {statements.map((stmt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className={`text-2xl md:text-4xl font-bold tracking-tight ${idx === statements.length - 1 ? "text-primary mt-4" : "text-textMuted/70"}`}
            >
              {stmt}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
