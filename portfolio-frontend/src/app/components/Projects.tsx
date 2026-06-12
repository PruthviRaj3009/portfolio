import { useState } from "react";
import { motion } from "motion/react";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useProjects } from "../../hooks/usePortfolioData";
import { useProfile } from "../../hooks/usePortfolioData";

// colors cycle through for each project card
const COLORS = [
  "#6C63FF",
  "#00D4FF",
  "#00FF87",
  "#FF6B6B",
  "#FFB347",
  "#C77DFF",
];

export function Projects() {
  const { data: projects, loading, error } = useProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { data: profile } = useProfile();
  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () =>
    setCurrentIndex((i) =>
      projects ? Math.min(projects.length - 1, i + 1) : i,
    );

  // ── Loading state ──────────────────────────────────────
  if (loading) {
    return (
      <section
        id="projects"
        className="py-24"
        style={{ background: "#0F0F1A" }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div
            className="inline-block w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "#6C63FF", borderTopColor: "transparent" }}
          />
          <p className="mt-4 text-sm" style={{ color: "#A0A0B8" }}>
            Loading projects...
          </p>
        </div>
      </section>
    );
  }

  // ── Error state ────────────────────────────────────────
  if (error) {
    return (
      <section
        id="projects"
        className="py-24"
        style={{ background: "#0F0F1A" }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p style={{ color: "#FF6B6B" }}>Failed to load projects: {error}</p>
        </div>
      </section>
    );
  }

  // ── Empty state ────────────────────────────────────────
  if (!projects || projects.length === 0) {
    return (
      <section
        id="projects"
        className="py-24"
        style={{ background: "#0F0F1A" }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p style={{ color: "#A0A0B8" }}>No projects added yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24" style={{ background: "#0F0F1A" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
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
            // portfolio
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Featured{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Projects
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

        {/* Slider */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: -currentIndex * (384 + 24) }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {projects.map((project, index) => {
              const color = COLORS[index % COLORS.length];
              const isHovered = hoveredId === project.id;

              return (
                <motion.div
                  key={project.id}
                  className="relative rounded-2xl overflow-hidden cursor-default flex-shrink-0 w-80 md:w-96"
                  style={{
                    background: "#13131F",
                    border: isHovered
                      ? `1px solid ${color}55`
                      : "1px solid #1E1E3A",
                    boxShadow: isHovered ? `0 8px 40px ${color}25` : "none",
                    transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Project image or color band */}
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-40 w-full object-cover"
                    />
                  ) : (
                    <div
                      className="h-40 flex items-center justify-center text-5xl"
                      style={{
                        background: `linear-gradient(135deg, ${color}22, ${color}08)`,
                      }}
                    >
                      🚀
                    </div>
                  )}

                  <div className="p-6">
                    <h3
                      className="mb-2"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        color: "#fff",
                        fontSize: "1.1rem",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="mb-4 text-sm leading-relaxed"
                      style={{ color: "#A0A0B8" }}
                    >
                      {project.short_description}
                    </p>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech_stack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full text-xs"
                          style={{
                            border: `1px solid ${color}44`,
                            color: color,
                            background: `${color}10`,
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:opacity-80"
                          style={{
                            background: "#1E1E3A",
                            color: "#fff",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          <Github size={14} />
                          GitHub
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:opacity-80"
                          style={{
                            background: `linear-gradient(135deg, ${color}, ${color}99)`,
                            color: "#fff",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background:
                currentIndex === 0
                  ? "#1E1E3A"
                  : "linear-gradient(135deg, #6C63FF, #00D4FF)",
              color: "#fff",
              opacity: currentIndex === 0 ? 0.4 : 1,
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {projects.map((project, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: currentIndex === i ? "24px" : "8px",
                  height: "8px",
                  background:
                    currentIndex === i
                      ? "linear-gradient(90deg, #6C63FF, #00D4FF)"
                      : "#1E1E3A",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={currentIndex === projects.length - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background:
                currentIndex === projects.length - 1
                  ? "#1E1E3A"
                  : "linear-gradient(135deg, #6C63FF, #00D4FF)",
              color: "#fff",
              opacity: currentIndex === projects.length - 1 ? 0.4 : 1,
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* View all on GitHub */}
        <div className="text-center mt-8">
          <a
            href={profile?.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              border: "1px solid rgba(108,99,255,0.4)",
              color: "#6C63FF",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <Github size={15} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
