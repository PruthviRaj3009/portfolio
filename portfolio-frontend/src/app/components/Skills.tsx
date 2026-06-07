import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const tabs = ["Languages", "Frameworks", "Databases", "Tools"];

const skills: Record<string, { name: string; icon: string; level: number }[]> = {
  Languages: [
    { name: "Python", icon: "🐍", level: 92 },
    { name: "JavaScript", icon: "⚡", level: 80 },
    { name: "TypeScript", icon: "📘", level: 72 },
    { name: "HTML/CSS", icon: "🎨", level: 88 },
    { name: "SQL", icon: "📊", level: 78 },
    { name: "Bash", icon: "💻", level: 65 },
  ],
  Frameworks: [
    { name: "Django", icon: "🎯", level: 94 },
    { name: "Django REST", icon: "🔌", level: 90 },
    { name: "React", icon: "⚛️", level: 78 },
    { name: "Celery", icon: "🌿", level: 72 },
    { name: "FastAPI", icon: "🚀", level: 68 },
    { name: "Bootstrap", icon: "🅱️", level: 82 },
  ],
  Databases: [
    { name: "PostgreSQL", icon: "🐘", level: 85 },
    { name: "MySQL", icon: "🗄️", level: 80 },
    { name: "Redis", icon: "🔴", level: 72 },
    { name: "MongoDB", icon: "🍃", level: 65 },
    { name: "SQLite", icon: "📁", level: 88 },
    { name: "Elasticsearch", icon: "🔍", level: 60 },
  ],
  Tools: [
    { name: "Docker", icon: "🐳", level: 75 },
    { name: "Git / GitHub", icon: "🐙", level: 90 },
    { name: "AWS", icon: "☁️", level: 65 },
    { name: "Linux", icon: "🐧", level: 78 },
    { name: "Postman", icon: "📬", level: 88 },
    { name: "VS Code", icon: "🔷", level: 95 },
  ],
};

function SkillCard({ name, icon, level, index }: { name: string; icon: string; level: number; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="rounded-2xl p-5 cursor-default transition-all duration-300"
      style={{
        background: "#13131F",
        border: hovered ? "1px solid rgba(108,99,255,0.6)" : "1px solid #1E1E3A",
        boxShadow: hovered ? "0 0 24px rgba(108,99,255,0.2)" : "none",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <span style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{name}</span>
        <span className="ml-auto text-xs" style={{ color: "#6C63FF", fontFamily: "'JetBrains Mono', monospace" }}>
          {level}%
        </span>
      </div>
      {/* Progress bar */}
      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: "#1E1E3A" }}>
        <motion.div
          className="absolute h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #6C63FF, #00D4FF)" }}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: index * 0.06 + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [activeTab, setActiveTab] = useState("Languages");

  return (
    <section id="skills" className="py-24" style={{ background: "#0A0A0F" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs mb-3 uppercase tracking-widest"
            style={{ color: "#6C63FF", fontFamily: "'JetBrains Mono', monospace" }}
          >
            // my stack
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Technical{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Skills
            </span>
          </h2>
          <div
            className="mx-auto mt-4 h-px w-48"
            style={{ background: "linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)" }}
          />
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: activeTab === tab ? "linear-gradient(135deg, #6C63FF, #00D4FF)" : "#13131F",
                color: activeTab === tab ? "#fff" : "#A0A0B8",
                border: activeTab === tab ? "none" : "1px solid #1E1E3A",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: activeTab === tab ? "0 4px 20px rgba(108,99,255,0.35)" : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Skill cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {skills[activeTab].map((skill, i) => (
              <SkillCard key={skill.name} {...skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
