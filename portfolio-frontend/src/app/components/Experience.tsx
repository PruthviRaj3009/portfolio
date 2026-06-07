import { motion } from "motion/react";

const experiences = [
  {
    company: "TechNova Solutions",
    role: "Full Stack Django Developer",
    dates: "Jan 2024 – Present",
    type: "Full-Time",
    points: [
      "Built and maintained 3 production Django applications serving 10K+ users",
      "Designed RESTful APIs consumed by React and mobile frontends",
      "Reduced API response time by 40% through Redis caching and query optimization",
      "Implemented CI/CD pipelines using GitHub Actions and AWS EC2",
    ],
    tags: ["Django", "DRF", "PostgreSQL", "Redis", "AWS", "React"],
    side: "left",
  },
  {
    company: "CloudBase Startup",
    role: "Python Backend Intern",
    dates: "Jul 2023 – Dec 2023",
    type: "Internship",
    points: [
      "Developed microservices for user authentication and notifications",
      "Integrated third-party payment gateway (Stripe) with Django backend",
      "Wrote unit and integration tests achieving 85% code coverage",
      "Collaborated in agile sprints with cross-functional team of 8",
    ],
    tags: ["Python", "Django", "Stripe API", "Docker", "PostgreSQL"],
    side: "right",
  },
  {
    company: "Freelance Projects",
    role: "Independent Django Developer",
    dates: "Mar 2023 – Jun 2023",
    type: "Freelance",
    points: [
      "Delivered 4 client projects including e-commerce and portfolio sites",
      "Built custom Django admin panels and reporting dashboards",
      "Maintained 100% client satisfaction with on-time delivery",
    ],
    tags: ["Django", "MySQL", "Bootstrap", "Celery"],
    side: "left",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24" style={{ background: "#0A0A0F" }}>
      <div className="max-w-5xl mx-auto px-6">
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
            style={{ background: "linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)" }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, #6C63FF, #00D4FF)" }}
          />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className={`relative grid md:grid-cols-2 gap-8 items-start ${exp.side === "right" ? "" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {/* Glowing dot */}
                <div
                  className="absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                  style={{
                    background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                    boxShadow: "0 0 12px rgba(108,99,255,0.8)",
                  }}
                />

                {exp.side === "left" ? (
                  <>
                    {/* Card on left */}
                    <ExperienceCard exp={exp} align="right" />
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    {/* Card on right */}
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

function ExperienceCard({ exp, align }: { exp: typeof experiences[0]; align: "left" | "right" }) {
  return (
    <div
      className={`rounded-2xl p-6 ${align === "right" ? "md:text-right" : ""}`}
      style={{ background: "#13131F", border: "1px solid #1E1E3A" }}
    >
      <div className={`flex items-center gap-3 mb-3 ${align === "right" ? "md:flex-row-reverse" : ""}`}>
        <span
          className="px-2.5 py-1 rounded-full text-xs"
          style={{
            background: "rgba(108,99,255,0.15)",
            color: "#6C63FF",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {exp.type}
        </span>
        <span className="text-xs" style={{ color: "#A0A0B8", fontFamily: "'Inter', sans-serif" }}>
          {exp.dates}
        </span>
      </div>

      <h3
        className="mb-1"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "1.1rem" }}
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

      <ul className={`space-y-2 mb-4 ${align === "right" ? "md:text-right" : ""}`}>
        {exp.points.map((pt, i) => (
          <li key={i} className="text-sm flex items-start gap-2" style={{ color: "#A0A0B8" }}>
            <span style={{ color: "#6C63FF", flexShrink: 0 }}>▸</span>
            {pt}
          </li>
        ))}
      </ul>

      <div className={`flex flex-wrap gap-2 ${align === "right" ? "md:justify-end" : ""}`}>
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-xs"
            style={{
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00D4FF",
              background: "rgba(0,212,255,0.06)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
