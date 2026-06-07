import { useState } from "react";
import { motion } from "motion/react";
import { Trophy, Medal, Star } from "lucide-react";

const achievements = [
  {
    category: "Award",
    title: "Best Final Year Project",
    issuer: "KLS Gogte Institute of Technology",
    date: "May 2024",
    icon: "🏆",
    tier: "gold",
    desc: "Awarded for outstanding B.E. final year project on Django-based real-time analytics platform.",
  },
  {
    category: "Competition",
    title: "1st Place — State Hackathon",
    issuer: "Karnataka Tech Fest 2023",
    date: "Oct 2023",
    icon: "🥇",
    tier: "gold",
    desc: "Won first place among 120 teams for building a smart water management system in 24 hours.",
  },
  {
    category: "Achievement",
    title: "Open Source Contributor",
    issuer: "Hacktoberfest 2023",
    date: "Oct 2023",
    icon: "🌟",
    tier: "silver",
    desc: "Merged 6 meaningful pull requests across Django and Python open source projects.",
  },
  {
    category: "Award",
    title: "Academic Excellence Award",
    issuer: "Department of CSE",
    date: "2022 – 2023",
    icon: "🎖️",
    tier: "gold",
    desc: "Recognized for maintaining top CGPA in the department for two consecutive semesters.",
  },
  {
    category: "Competition",
    title: "Top 50 — Code Championship",
    issuer: "GeeksForGeeks India",
    date: "Jan 2024",
    icon: "🥈",
    tier: "silver",
    desc: "Ranked in top 50 among 5,000+ participants in a national Python coding competition.",
  },
  {
    category: "Achievement",
    title: "30 Days of Python Challenge",
    issuer: "Self-initiated / GitHub",
    date: "Aug 2023",
    icon: "🏅",
    tier: "bronze",
    desc: "Completed 30-day Python challenge building one project daily, gaining 200+ GitHub stars.",
  },
];

const tierStyles: Record<string, { color: string; glow: string; badgeBg: string }> = {
  gold: { color: "#FFB347", glow: "rgba(255,179,71,0.3)", badgeBg: "rgba(255,179,71,0.12)" },
  silver: { color: "#A0A0B8", glow: "rgba(160,160,184,0.2)", badgeBg: "rgba(160,160,184,0.08)" },
  bronze: { color: "#CD7F32", glow: "rgba(205,127,50,0.2)", badgeBg: "rgba(205,127,50,0.08)" },
};

function AchievementCard({ ach, index }: { ach: typeof achievements[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const tier = tierStyles[ach.tier];

  return (
    <motion.div
      className="rounded-2xl p-6 cursor-default transition-all duration-300"
      style={{
        background: hovered ? `linear-gradient(135deg, #13131F, ${tier.glow.replace("0.3", "0.05")})` : "#13131F",
        border: hovered ? `1px solid ${tier.color}44` : "1px solid #1E1E3A",
        boxShadow: hovered ? `0 8px 32px ${tier.glow}` : "none",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: tier.badgeBg, border: `1px solid ${tier.color}33` }}
        >
          {ach.icon}
        </div>
        <div>
          <span
            className="inline-block px-2 py-0.5 rounded text-xs mb-2"
            style={{
              background: tier.badgeBg,
              color: tier.color,
              fontFamily: "'JetBrains Mono', monospace",
              border: `1px solid ${tier.color}33`,
            }}
          >
            {ach.category}
          </span>
          <h3
            className="mb-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}
          >
            {ach.title}
          </h3>
          <p className="text-xs mb-3 leading-relaxed" style={{ color: "#A0A0B8" }}>
            {ach.desc}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: "#A0A0B8" }}>
              {ach.issuer}
            </span>
            <span className="text-xs" style={{ color: tier.color, fontFamily: "'JetBrains Mono', monospace" }}>
              {ach.date}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Accolades() {
  return (
    <section id="accolades" className="py-24" style={{ background: "#0F0F1A" }}>
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
            🏆 recognition
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Awards &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Accolades
            </span>
          </h2>
          <div
            className="mx-auto mt-4 h-px w-48"
            style={{ background: "linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)" }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((ach, i) => (
            <AchievementCard key={i} ach={ach} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
