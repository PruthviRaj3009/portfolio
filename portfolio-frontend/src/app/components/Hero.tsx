import { useEffect, useRef, useState, useMemo } from "react";
import { ChevronDown, Download, Eye } from "lucide-react";
import { motion } from "motion/react";
import {
  useProfile,
  useHeroTypingText,
  useSlogan,
  useMessageDisplay,
} from "../../hooks/usePortfolioData";

function useTypingEffect(strings: string[]) {
  const [text, setText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // stable strings reference to avoid resetting animation
  const stableStrings = useMemo(() => strings, [strings.join(",")]);

  useEffect(() => {
    if (!stableStrings.length) return;
    const current = stableStrings[stringIndex % stableStrings.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (charIndex < current.length) {
            setText(current.slice(0, charIndex + 1));
            setCharIndex((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), 1200);
          }
        } else {
          if (charIndex > 0) {
            setText(current.slice(0, charIndex - 1));
            setCharIndex((c) => c - 1);
          } else {
            setDeleting(false);
            setStringIndex((i) => (i + 1) % stableStrings.length);
          }
        }
      },
      deleting ? 50 : 80,
    );
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, stringIndex, stableStrings]);

  return text;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
    }[] = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,99,255,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function OrbSphere() {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full border opacity-30"
        style={{ borderColor: "#6C63FF" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute w-3 h-3 rounded-full -top-1.5 left-1/2 -translate-x-1/2"
          style={{ background: "#6C63FF", boxShadow: "0 0 10px #6C63FF" }}
        />
      </motion.div>
      <motion.div
        className="absolute rounded-full border opacity-20"
        style={{ inset: "20px", borderColor: "#00D4FF" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -translate-x-1/2"
          style={{ background: "#00D4FF", boxShadow: "0 0 8px #00D4FF" }}
        />
      </motion.div>
      <motion.div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          inset: "50px",
          background: "radial-gradient(circle at 35% 35%, #6C63FF, #0A0A0F)",
          boxShadow:
            "0 0 60px rgba(108,99,255,0.5), 0 0 120px rgba(108,99,255,0.2)",
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontSize: "2rem",
            fontWeight: 700,
            fontFamily: "'Times New Roman', serif",
            textAlign: "center",
            textShadow: "0 0 15px rgba(255,255,255,0.4)",
            userSelect: "none",
          }}
        >
          <p>
            {useSlogan().data?.text || (
              <>
                e<sup>iπ</sup> + 1 = 0
              </>
            )}
          </p>
        </div>
      </motion.div>
      <motion.div
        className="absolute w-4 h-4 rounded-full"
        style={{
          background: "#00D4FF",
          boxShadow: "0 0 12px #00D4FF",
          top: "15%",
          right: "10%",
        }}
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: "#6C63FF",
          boxShadow: "0 0 8px #6C63FF",
          bottom: "20%",
          left: "5%",
        }}
        animate={{ y: [8, -8, 8] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}

export function Hero() {
  const { data: profile } = useProfile();
  const { data: heroTexts } = useHeroTypingText();
  const resumeLink = profile?.resume_url;
  const messageDisplay = useMessageDisplay().data;
  // stable fallback while loading from API
  const typingStrings =
    heroTexts && heroTexts.length > 0
      ? heroTexts.map((item: any) => item.text)
      : ["Software Developer"];

  const typed = useTypingEffect(typingStrings);

  const firstName = profile?.name?.split(" ")[0] ?? "Pruthviraj";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      <ParticleCanvas />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          right: "10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Available badge */}
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs mb-6 border"
              style={{
                color: "#00D4FF",
                borderColor: "rgba(0,212,255,0.3)",
                background: "rgba(0,212,255,0.08)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {messageDisplay?.available ?? "Available for hire"}
            </div>

            {/* Name */}
            <h1
              className="mb-4 leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Hi, I'm{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {firstName}
              </span>
            </h1>

            {/* Title from database */}
            <div
              className="mb-4 text-sm"
              style={{
                color: "#A0A0B8",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {profile?.title ?? "Full Stack Developer"}
            </div>

            {/* Typing animation from database */}
            <div
              className="mb-8 flex items-center gap-2"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                color: "#A0A0B8",
              }}
            >
              <span>{typed}</span>
              <span
                className="inline-block w-0.5 h-6 ml-0.5"
                style={{
                  background: "#6C63FF",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </div>

            {/* Bio from database */}
            <p
              className="mb-10 max-w-lg leading-relaxed"
              style={{ color: "#A0A0B8", fontSize: "1rem" }}
            >
              {profile?.bio ??
                "I build scalable, high-performance web applications with Python & Django."}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                  color: "#fff",
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: "0 4px 24px rgba(108,99,255,0.4)",
                }}
              >
                <Eye size={16} /> View My Work
              </button>

              {resumeLink ? (
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    border: "1px solid rgba(108,99,255,0.6)",
                    color: "#fff",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  <Download size={16} /> Download Resume
                </a>
              ) : (
                <button
                  disabled
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full font-medium"
                  style={{
                    border: "1px solid rgba(108,99,255,0.2)",
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    cursor: "not-allowed",
                  }}
                >
                  <Download size={16} /> Resume Coming Soon
                </button>
              )}
            </div>
          </motion.div>

          {/* Right — 3D orb */}
          <motion.div
            className="flex justify-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OrbSphere />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="text-xs"
            style={{ color: "#A0A0B8", fontFamily: "'Inter', sans-serif" }}
          >
            Scroll down
          </span>
          <ChevronDown size={20} style={{ color: "#6C63FF" }} />
        </motion.div>
      </div>
      <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </section>
  );
}
