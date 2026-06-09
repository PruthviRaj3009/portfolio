import { useState } from "react";
import { motion } from "motion/react";
import { useEducation } from "../../hooks/usePortfolioData";
import { Education as EducationType } from "../../types";

const COLORS = ["#6C63FF", "#00D4FF", "#00FF87", "#FFB347", "#FF6B6B"];

export function Education() {
  const { data: education, loading, error } = useEducation();

  if (loading)
    return (
      <section
        id="education"
        className="py-24"
        style={{ background: "#0F0F1A" }}
      >
        <div className="text-center">
          <div
            className="inline-block w-10 h-10 rounded-full border-2 animate-spin"
            style={{ borderColor: "#6C63FF", borderTopColor: "transparent" }}
          />
        </div>
      </section>
    );

  if (error)
    return (
      <section
        id="education"
        className="py-24"
        style={{ background: "#0F0F1A" }}
      >
        <div className="text-center">
          <p style={{ color: "#FF6B6B" }}>Failed to load education: {error}</p>
        </div>
      </section>
    );

  return (
    <section id="education" className="py-24" style={{ background: "#0F0F1A" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="text-xs mb-3 uppercase tracking-widest"
            style={{
              color: "#6C63FF",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            // background
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Education{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Journey
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
        <div className="grid md:grid-cols-3 gap-6">
          {education?.map((edu, i) => (
            <EducationCard
              key={edu.id}
              edu={edu}
              index={i}
              color={COLORS[i % COLORS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  edu,
  index,
  color,
}: {
  edu: EducationType;
  index: number;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="rounded-2xl p-6 cursor-default transition-all duration-300"
      style={{
        background: "#13131F",
        border: hovered ? `1px solid ${color}55` : "1px solid #1E1E3A",
        boxShadow: hovered ? `0 8px 32px ${color}20` : "none",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-4xl mb-4">🎓</div>
      <h3
        className="mb-1"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          color: "#fff",
          fontSize: "1.05rem",
        }}
      >
        {edu.degree}
      </h3>
      <p className="mb-3 text-sm" style={{ color: "#A0A0B8" }}>
        {edu.institution}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: "#A0A0B8" }}>
          {edu.start_year} – {edu.end_year}
        </span>
        {edu.grade && (
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${color}18`,
              color,
              border: `1px solid ${color}44`,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {edu.grade}
          </span>
        )}
      </div>
    </motion.div>
  );
}
