import { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "B.E. in Computer Science",
    institution: "KLS Gogte Institute of Technology",
    years: "2020 – 2024",
    grade: "CGPA 8.4",
    icon: "🎓",
    color: "#6C63FF",
  },
  {
    degree: "Higher Secondary (12th)",
    institution: "Karnataka Board of Education",
    years: "2018 – 2020",
    grade: "89.5%",
    icon: "📚",
    color: "#00D4FF",
  },
  {
    degree: "Secondary School (10th)",
    institution: "Karnataka SSLC Board",
    years: "2017 – 2018",
    grade: "91.2%",
    icon: "🏫",
    color: "#00FF87",
  },
];

export function Education() {
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
            style={{ color: "#6C63FF", fontFamily: "'JetBrains Mono', monospace" }}
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
            style={{ background: "linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)" }}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <EducationCard key={i} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ edu, index }: { edu: typeof education[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="rounded-2xl p-6 cursor-default transition-all duration-300"
      style={{
        background: "#13131F",
        border: hovered ? `1px solid ${edu.color}55` : "1px solid #1E1E3A",
        boxShadow: hovered ? `0 8px 32px ${edu.color}20` : "none",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-4xl mb-4">{edu.icon}</div>
      <h3
        className="mb-1"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "1.05rem" }}
      >
        {edu.degree}
      </h3>
      <p className="mb-3 text-sm" style={{ color: "#A0A0B8", fontFamily: "'Inter', sans-serif" }}>
        {edu.institution}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: "#A0A0B8", fontFamily: "'Inter', sans-serif" }}>
          {edu.years}
        </span>
        <span
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: `${edu.color}18`,
            color: edu.color,
            border: `1px solid ${edu.color}44`,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {edu.grade}
        </span>
      </div>
    </motion.div>
  );
}
