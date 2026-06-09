import { useState } from "react";
import { motion } from "motion/react";
import { useAccolades } from "../../hooks/usePortfolioData";
import { Accolade } from "../../types";

const tierStyles: Record<
  string,
  { color: string; glow: string; badgeBg: string }
> = {
  award: {
    color: "#FFB347",
    glow: "rgba(255,179,71,0.3)",
    badgeBg: "rgba(255,179,71,0.12)",
  },
  competition: {
    color: "#6C63FF",
    glow: "rgba(108,99,255,0.3)",
    badgeBg: "rgba(108,99,255,0.12)",
  },
  achievement: {
    color: "#A0A0B8",
    glow: "rgba(160,160,184,0.2)",
    badgeBg: "rgba(160,160,184,0.08)",
  },
  recognition: {
    color: "#00D4FF",
    glow: "rgba(0,212,255,0.2)",
    badgeBg: "rgba(0,212,255,0.08)",
  },
  other: {
    color: "#CD7F32",
    glow: "rgba(205,127,50,0.2)",
    badgeBg: "rgba(205,127,50,0.08)",
  },
};

function AchievementCard({ ach, index }: { ach: Accolade; index: number }) {
  const [hovered, setHovered] = useState(false);
  const tier = tierStyles[ach.category] ?? tierStyles.other;

  return (
    <motion.div
      className="rounded-2xl p-6 cursor-default transition-all duration-300"
      style={{
        background: hovered
          ? `linear-gradient(135deg, #13131F, ${tier.badgeBg})`
          : "#13131F",
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
          style={{
            background: tier.badgeBg,
            border: `1px solid ${tier.color}33`,
          }}
        >
          {ach.image ? (
            <img
              src={ach.image}
              alt={ach.title}
              className="w-8 h-8 object-contain"
            />
          ) : (
            "🏆"
          )}
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
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              color: "#fff",
              fontSize: "0.95rem",
            }}
          >
            {ach.title}
          </h3>
          {ach.description && (
            <p
              className="text-xs mb-3 leading-relaxed"
              style={{ color: "#A0A0B8" }}
            >
              {ach.description}
            </p>
          )}
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: "#A0A0B8" }}>
              {ach.issuer}
            </span>
            <span
              className="text-xs"
              style={{
                color: tier.color,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {ach.date}
            </span>
          </div>
          {ach.certificate_url && (
            <a
              href={ach.certificate_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs mt-2 inline-block"
              style={{ color: tier.color }}
            >
              View Certificate →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Accolades() {
  const { data: accolades, loading, error } = useAccolades();

  if (loading)
    return (
      <section
        id="accolades"
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

  if (error || !accolades || accolades.length === 0) return null;

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
            style={{
              color: "#6C63FF",
              fontFamily: "'JetBrains Mono', monospace",
            }}
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
            style={{
              background:
                "linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)",
            }}
          />
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {accolades.map((ach, i) => (
            <AchievementCard key={ach.id} ach={ach} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
