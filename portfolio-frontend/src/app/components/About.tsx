import { motion } from "motion/react";
import { Briefcase, Code2, Star, Award } from "lucide-react";

const stats = [
  { label: "Projects Done", value: "10+" },
  { label: "Technologies", value: "15+" },
  { label: "Experience", value: "2+ Yrs" },
  { label: "Certifications", value: "8+" },
];

const floatingBadges = [
  { icon: <Briefcase size={14} />, text: "2+ Years Experience", delay: 0 },
  { icon: <Code2 size={14} />, text: "10+ Projects", delay: 0.3 },
  { icon: <Star size={14} />, text: "Open to Work", delay: 0.6 },
];

export function About() {
  return (
    <section id="about" className="py-24" style={{ background: "#0F0F1A" }}>
      {/* Glow separator */}
      <div
        className="w-full h-px mb-0"
        style={{ background: "linear-gradient(90deg, transparent, #6C63FF44, #00D4FF44, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: photo + badges */}
          <motion.div
            className="flex justify-center relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              {/* Hexagon-shaped profile photo using clip-path */}
              <div
                className="w-56 h-64 md:w-64 md:h-72 relative"
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                  padding: "3px",
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center text-6xl"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background: "#13131F",
                  }}
                >
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                    <span
                      style={{
                        background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontSize: "3rem",
                      }}
                    >
                      PP
                    </span>
                  </span>
                </div>
              </div>

              {/* Animated glow ring */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  background: "linear-gradient(135deg, rgba(108,99,255,0.3), rgba(0,212,255,0.3))",
                  filter: "blur(8px)",
                  zIndex: -1,
                  transform: "scale(1.05)",
                  animation: "pulse-glow 3s ease-in-out infinite",
                }}
              />

              {/* Floating badges */}
              {floatingBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  className="absolute flex items-center gap-2 px-3 py-2 rounded-xl text-xs whitespace-nowrap"
                  style={{
                    background: "rgba(19,19,31,0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(108,99,255,0.3)",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    top: i === 0 ? "-20px" : i === 1 ? "40%" : undefined,
                    bottom: i === 2 ? "-20px" : undefined,
                    right: i === 1 ? "-80px" : undefined,
                    left: i === 0 ? "-60px" : i === 2 ? "-40px" : undefined,
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
                >
                  <span style={{ color: "#6C63FF" }}>{badge.icon}</span>
                  {badge.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-xs mb-3 uppercase tracking-widest"
              style={{ color: "#6C63FF", fontFamily: "'JetBrains Mono', monospace" }}
            >
              // about me
            </p>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Crafting Digital{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Experiences
              </span>
            </h2>

            <p className="mb-4 leading-relaxed" style={{ color: "#A0A0B8", fontSize: "0.95rem" }}>
              I'm a passionate Full Stack Developer with 2+ years of hands-on experience in building web applications
              using Python and Django. I specialize in architecting scalable backend systems, RESTful APIs, and
              responsive frontend interfaces.
            </p>
            <p className="mb-8 leading-relaxed" style={{ color: "#A0A0B8", fontSize: "0.95rem" }}>
              My journey started with a curiosity about how websites work, which led me to dive deep into the Python
              ecosystem. Today, I build production-ready applications that solve real-world problems — from e-commerce
              platforms to data dashboards.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center p-4 rounded-2xl" style={{ background: "#13131F", border: "1px solid #1E1E3A" }}>
                  <div
                    className="mb-1"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs" style={{ color: "#A0A0B8", fontFamily: "'Inter', sans-serif" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
