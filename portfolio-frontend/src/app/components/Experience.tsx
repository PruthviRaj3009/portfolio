import { motion } from "motion/react";
import { useExperience } from "../../hooks/usePortfolioData";
import { Experience as ExperienceType } from "../../types";

export function Experience() {
  const { data: experiences, loading, error } = useExperience();

  if (loading)
    return (
      <section
        id="experience"
        className="py-24"
        style={{ background: "#0A0A0F" }}
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
        id="experience"
        className="py-24"
        style={{ background: "#0A0A0F" }}
      >
        <div className="text-center">
          <p style={{ color: "#FF6B6B" }}>Failed to load experience: {error}</p>
        </div>
      </section>
    );

  return (
    <section
      id="experience"
      className="py-24"
      style={{ background: "#0A0A0F" }}
    >
      <div className="max-w-5xl mx-auto px-6">
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
            // career
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Work{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Experience
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

        <div className="relative">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, #6C63FF, #00D4FF)" }}
          />
          <div className="space-y-16">
            {experiences?.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="relative grid md:grid-cols-2 gap-8 items-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div
                  className="absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                  style={{
                    background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                    boxShadow: "0 0 12px rgba(108,99,255,0.8)",
                  }}
                />
                {i % 2 === 0 ? (
                  <>
                    <ExperienceCard exp={exp} align="right" />
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <ExperienceCard exp={exp} align="left" />
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  align,
}: {
  exp: ExperienceType;
  align: "left" | "right";
}) {
  const dateRange = exp.is_current
    ? `${exp.start_date} – Present`
    : `${exp.start_date} – ${exp.end_date ?? ""}`;

  return (
    <div
      className={`rounded-2xl p-6 ${align === "right" ? "md:text-right" : ""}`}
      style={{ background: "#13131F", border: "1px solid #1E1E3A" }}
    >
      <div
        className={`flex items-center gap-3 mb-3 ${align === "right" ? "md:flex-row-reverse" : ""}`}
      >
        {exp.is_current && (
          <span
            className="px-2.5 py-1 rounded-full text-xs"
            style={{
              background: "rgba(108,99,255,0.15)",
              color: "#6C63FF",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Current
          </span>
        )}
        <span
          className="text-xs"
          style={{ color: "#A0A0B8", fontFamily: "'Inter', sans-serif" }}
        >
          {dateRange}
        </span>
      </div>
      <h3
        className="mb-1"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          color: "#fff",
          fontSize: "1.1rem",
        }}
      >
        {exp.company}
      </h3>
      <p
        className="mb-4 text-sm"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 500,
          background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {exp.role}
      </p>
      <p className="text-sm mb-4" style={{ color: "#A0A0B8" }}>
        {exp.description}
      </p>

      {/* Bullet points from ExperiencePoint model */}
      {exp.points && exp.points.length > 0 && (
        <ul
          className={`space-y-2 mb-4 ${align === "right" ? "md:text-right" : ""}`}
        >
          {exp.points.map((pt) => (
            <li
              key={pt.id}
              className="text-sm flex items-start gap-2"
              style={{ color: "#A0A0B8" }}
            >
              <span style={{ color: "#6C63FF", flexShrink: 0 }}>▸</span>
              {pt.point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
