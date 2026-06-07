import { useState } from "react";
import { motion } from "motion/react";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-featured Django e-commerce with Razorpay integration, cart management, order tracking, and admin dashboard. Handles 500+ daily transactions.",
    tags: ["Django", "PostgreSQL", "Celery", "Redis", "React"],
    color: "#6C63FF",
    emoji: "🛒",
    github: "#",
    live: "#",
  },
  {
    title: "REST API for SaaS App",
    description: "Scalable Django REST Framework API powering a multi-tenant SaaS product. JWT auth, rate limiting, webhook support, and real-time notifications.",
    tags: ["DRF", "JWT", "Docker", "AWS", "WebSocket"],
    color: "#00D4FF",
    emoji: "🔌",
    github: "#",
    live: "#",
  },
  {
    title: "Blog & CMS System",
    description: "Feature-rich content management system with markdown editor, SEO optimization, comment system, and newsletter integration via Mailchimp.",
    tags: ["Django", "HTMX", "Alpine.js", "PostgreSQL"],
    color: "#00FF87",
    emoji: "📝",
    github: "#",
    live: "#",
  },
  {
    title: "Real-Time Chat App",
    description: "WebSocket-powered chat application using Django Channels. Supports rooms, direct messages, file sharing, and read receipts.",
    tags: ["Django Channels", "Redis", "React", "WebSocket"],
    color: "#FF6B6B",
    emoji: "💬",
    github: "#",
    live: "#",
  },
  {
    title: "Data Analytics Dashboard",
    description: "Interactive analytics dashboard with Plotly charts, CSV import/export, automated email reports, and scheduled Celery tasks for data aggregation.",
    tags: ["Django", "Plotly", "Celery", "Pandas", "PostgreSQL"],
    color: "#FFB347",
    emoji: "📊",
    github: "#",
    live: "#",
  },
  {
    title: "Job Portal Application",
    description: "Multi-role job portal for employers and job seekers with search/filter, application tracking, resume upload, and email notifications.",
    tags: ["Django", "Elasticsearch", "Cloudinary", "Bootstrap"],
    color: "#C77DFF",
    emoji: "💼",
    github: "#",
    live: "#",
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-default flex-shrink-0 w-80 md:w-96"
      style={{
        background: "#13131F",
        border: hovered ? `1px solid ${project.color}55` : "1px solid #1E1E3A",
        boxShadow: hovered ? `0 8px 40px ${project.color}25` : "none",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top color band */}
      <div
        className="h-40 flex items-center justify-center text-6xl"
        style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)` }}
      >
        {project.emoji}
      </div>

      <div className="p-6">
        <h3
          className="mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "1.1rem" }}
        >
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed" style={{ color: "#A0A0B8" }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs"
              style={{
                border: `1px solid ${project.color}44`,
                color: project.color,
                background: `${project.color}10`,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <a
            href={project.github}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:opacity-80"
            style={{ background: "#1E1E3A", color: "#fff", fontFamily: "'Inter', sans-serif" }}
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href={project.live}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:opacity-80"
            style={{
              background: `linear-gradient(135deg, ${project.color}, ${project.color}99)`,
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = typeof window !== "undefined" && window.innerWidth >= 768 ? 2 : 1;

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(projects.length - 1, i + 1));

  return (
    <section id="projects" className="py-24" style={{ background: "#0F0F1A" }}>
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
            style={{ background: "linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)" }}
          />
        </motion.div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: -currentIndex * (384 + 24) }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: currentIndex === 0 ? "#1E1E3A" : "linear-gradient(135deg, #6C63FF, #00D4FF)",
              color: "#fff",
              opacity: currentIndex === 0 ? 0.4 : 1,
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: currentIndex === i ? "24px" : "8px",
                  height: "8px",
                  background: currentIndex === i ? "linear-gradient(90deg, #6C63FF, #00D4FF)" : "#1E1E3A",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={currentIndex === projects.length - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: currentIndex === projects.length - 1 ? "#1E1E3A" : "linear-gradient(135deg, #6C63FF, #00D4FF)",
              color: "#fff",
              opacity: currentIndex === projects.length - 1 ? 0.4 : 1,
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://github.com"
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
