import { useRef } from "react";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

const certificates = [
  { title: "Python for Everybody", issuer: "Coursera / University of Michigan", date: "Mar 2023", icon: "🐍", color: "#6C63FF" },
  { title: "Django Web Framework", issuer: "Meta / Coursera", date: "Jun 2023", icon: "🎯", color: "#00D4FF" },
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "Sep 2023", icon: "☁️", color: "#FFB347" },
  { title: "Docker Essentials", issuer: "IBM / Coursera", date: "Nov 2023", icon: "🐳", color: "#00FF87" },
  { title: "PostgreSQL for Developers", issuer: "LinkedIn Learning", date: "Jan 2024", icon: "🐘", color: "#FF6B6B" },
  { title: "REST API Design", issuer: "Udemy", date: "Feb 2024", icon: "🔌", color: "#C77DFF" },
  { title: "Git & GitHub Mastery", issuer: "Udemy", date: "Apr 2024", icon: "🐙", color: "#00D4FF" },
  { title: "React Fundamentals", issuer: "Scrimba", date: "May 2024", icon: "⚛️", color: "#6C63FF" },
];

// Duplicate for seamless infinite loop
const doubled = [...certificates, ...certificates];

export function Certificates() {
  return (
    <section id="certificates" className="py-24 overflow-hidden" style={{ background: "#0A0A0F" }}>
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="text-xs mb-3 uppercase tracking-widest"
            style={{ color: "#6C63FF", fontFamily: "'JetBrains Mono', monospace" }}
          >
            // credentials
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Certificates &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Courses
            </span>
          </h2>
          <div
            className="mx-auto mt-4 h-px w-48"
            style={{ background: "linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)" }}
          />
        </motion.div>
      </div>

      {/* Infinite scroll strip */}
      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #0A0A0F, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, #0A0A0F, transparent)" }}
        />

        <motion.div
          className="flex gap-5"
          style={{ width: "max-content" }}
          animate={{ x: [0, -(certificates.length * (288 + 20))] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((cert, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 flex-shrink-0 w-72"
              style={{ background: "#13131F", border: "1px solid #1E1E3A" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}33` }}
                >
                  {cert.icon}
                </div>
                <div className="min-w-0">
                  <h4
                    className="mb-1 leading-tight"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      color: "#fff",
                      fontSize: "0.9rem",
                    }}
                  >
                    {cert.title}
                  </h4>
                  <p className="text-xs mb-1" style={{ color: "#A0A0B8" }}>
                    {cert.issuer}
                  </p>
                  <p className="text-xs" style={{ color: cert.color, fontFamily: "'JetBrains Mono', monospace" }}>
                    {cert.date}
                  </p>
                </div>
              </div>
              <button
                className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs transition-all duration-200 hover:opacity-80"
                style={{
                  border: `1px solid ${cert.color}33`,
                  color: cert.color,
                  background: `${cert.color}08`,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <ExternalLink size={12} />
                View Certificate
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
