import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, MessageCircle, Send } from "lucide-react";
import { api } from "../../lib/api";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      // POST /api/contact/ with the form data as JSON.
      await api.post("/contact/", form);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(19,19,31,0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid #1E1E3A",
    borderRadius: "12px",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    width: "100%",
    padding: "12px 16px",
    transition: "border-color 0.2s",
  };

  const socials = [
    { icon: <Github size={18} />, href: "https://github.com", label: "GitHub" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter size={18} />, href: "https://twitter.com", label: "Twitter" },
    { icon: <MessageCircle size={18} />, href: "https://wa.me/", label: "WhatsApp" },
  ];

  return (
    <section id="contact" className="py-24" style={{ background: "#0A0A0F" }}>
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
            // get in touch
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Let's Work{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Together
            </span>
          </h2>
          <div
            className="mx-auto mt-4 h-px w-48"
            style={{ background: "linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)" }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-8 leading-relaxed" style={{ color: "#A0A0B8", fontSize: "0.95rem" }}>
              I'm currently open to new opportunities — whether it's a full-time role, freelance project, or just a
              technical chat. Don't hesitate to reach out!
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: <Mail size={16} />, label: "Email", value: "pruthviraj@example.com" },
                { icon: <Phone size={16} />, label: "Phone", value: "+91 98765 43210" },
                { icon: <MapPin size={16} />, label: "Location", value: "Bengaluru, Karnataka, India" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(108,99,255,0.12)", color: "#6C63FF" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "#A0A0B8" }}>
                      {item.label}
                    </p>
                    <p style={{ color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "#13131F",
                    border: "1px solid #1E1E3A",
                    color: "#A0A0B8",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#6C63FF55";
                    (e.currentTarget as HTMLElement).style.color = "#6C63FF";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1E1E3A";
                    (e.currentTarget as HTMLElement).style.color = "#A0A0B8";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 space-y-5"
              style={{ background: "#13131F", border: "1px solid #1E1E3A" }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-2" style={{ color: "#A0A0B8", fontFamily: "'Inter', sans-serif" }}>
                    Name
                  </label>
                  <input
                    style={inputStyle}
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#6C63FF55")}
                    onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "#1E1E3A")}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: "#A0A0B8", fontFamily: "'Inter', sans-serif" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    style={inputStyle}
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#6C63FF55")}
                    onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "#1E1E3A")}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: "#A0A0B8", fontFamily: "'Inter', sans-serif" }}>
                  Subject
                </label>
                <input
                  style={inputStyle}
                  placeholder="Project inquiry / Collaboration / Other"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#6C63FF55")}
                  onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "#1E1E3A")}
                  required
                />
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: "#A0A0B8", fontFamily: "'Inter', sans-serif" }}>
                  Message
                </label>
                <textarea
                  style={{ ...inputStyle, resize: "none" }}
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "#6C63FF55")}
                  onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "#1E1E3A")}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
                style={{
                  background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                  color: "#fff",
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: "0 4px 24px rgba(108,99,255,0.4)",
                }}
              >
                <Send size={16} />
                {sending ? "Sending..." : sent ? "Message Sent! ✓" : "Send Message"}
              </button>

              {error && (
                <p style={{ color: "#FF6B6B", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                  {error}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
