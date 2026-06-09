import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSkills } from "../../hooks/usePortfolioData";
import { Skill } from "../../types";

const CATEGORY_LABELS: Record<string, string> = {
  language: "Languages",
  framework: "Frameworks",
  database: "Databases",
  tool: "Tools",
  other: "Other",
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="rounded-2xl p-5 cursor-default transition-all duration-300"
      style={{
        background: "#13131F",
        border: hovered
          ? "1px solid rgba(108,99,255,0.6)"
          : "1px solid #1E1E3A",
        boxShadow: hovered ? "0 0 24px rgba(108,99,255,0.2)" : "none",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-3 mb-4">
        {/* icon_url from database or fallback emoji */}
        {skill.icon_url ? (
          <img
            src={skill.icon_url}
            alt={skill.name}
            className="w-7 h-7 object-contain"
          />
        ) : (
          <span className="text-2xl">💡</span>
        )}
        <span
          style={{
            color: "#fff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
          }}
        >
          {skill.name}
        </span>
      </div>

      {/* Subtle gradient bar — no level needed */}
      <div
        className="relative h-1.5 rounded-full overflow-hidden"
        style={{ background: "#1E1E3A" }}
      >
        <motion.div
          className="absolute h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #6C63FF, #00D4FF)" }}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1,
            delay: index * 0.06 + 0.2,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const { data: skills, loading, error } = useSkills();
  const [activeTab, setActiveTab] = useState("language");

  // ── Loading ──────────────────────────────────────────
  if (loading) {
    return (
      <section id="skills" className="py-24" style={{ background: "#0A0A0F" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div
            className="inline-block w-10 h-10 rounded-full border-2 animate-spin"
            style={{ borderColor: "#6C63FF", borderTopColor: "transparent" }}
          />
          <p className="mt-4 text-sm" style={{ color: "#A0A0B8" }}>
            Loading skills...
          </p>
        </div>
      </section>
    );
  }

  // ── Error ────────────────────────────────────────────
  if (error) {
    return (
      <section id="skills" className="py-24" style={{ background: "#0A0A0F" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p style={{ color: "#FF6B6B" }}>Failed to load skills: {error}</p>
        </div>
      </section>
    );
  }

  // ── Get unique categories from database ──────────────
  const categories = skills ? [...new Set(skills.map((s) => s.category))] : [];

  // ── Filter skills by active tab ──────────────────────
  const filtered = skills?.filter((s) => s.category === activeTab) ?? [];

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
            style={{
              color: "#6C63FF",
              fontFamily: "'JetBrains Mono', monospace",
            }}
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
            style={{
              background:
                "linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)",
            }}
          />
        </motion.div>

        {/* Tabs — built from database categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background:
                  activeTab === cat
                    ? "linear-gradient(135deg, #6C63FF, #00D4FF)"
                    : "#13131F",
                color: activeTab === cat ? "#fff" : "#A0A0B8",
                border: activeTab === cat ? "none" : "1px solid #1E1E3A",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow:
                  activeTab === cat
                    ? "0 4px 20px rgba(108,99,255,0.35)"
                    : "none",
              }}
            >
              {CATEGORY_LABELS[cat] ?? cat}
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
            {filtered.length === 0 ? (
              <p
                className="col-span-3 text-center"
                style={{ color: "#A0A0B8" }}
              >
                No skills added in this category yet.
              </p>
            ) : (
              filtered.map((skill, i) => (
                <SkillCard key={skill.id} skill={skill} index={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
