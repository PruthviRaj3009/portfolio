import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Send,
  Code2,
} from "lucide-react";

import { useProfile } from "../../hooks/usePortfolioData";

export function Contact() {
  const { data: profile } = useProfile();
  const [form, setForm] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile?.email) return;

    const mailtoLink =
      `mailto:${profile.email}` +
      `?subject=${encodeURIComponent(form.subject)}` +
      `&body=${encodeURIComponent(`Name: ${form.name}\n \n${form.message}`)}`;

    window.location.href = mailtoLink;
  };
  const contactItems = [
    { icon: <Mail size={16} />, label: "Email", value: profile?.email ?? "" },
    { icon: <Phone size={16} />, label: "Phone", value: profile?.phone ?? "" },
    {
      icon: <MapPin size={16} />,
      label: "Location",
      value: profile?.location ?? "",
    },
  ].filter((item) => item.value);

  const socials = [
    { icon: <Github size={18} />, href: profile?.github_url, label: "GitHub" },
    {
      icon: <Linkedin size={18} />,
      href: profile?.linkedin_url,
      label: "LinkedIn",
    },
    {
      icon: <Code2 size={18} />,
      href: profile?.leetcode_url,
      label: "LeetCode",
    },
    {
      icon: <Twitter size={18} />,
      href: profile?.twitter_url,
      label: "Twitter",
    },
    {
      icon: <MessageCircle size={18} />,
      href: profile?.whatsapp_number
        ? `https://wa.me/${profile.whatsapp_number}`
        : undefined,
      label: "WhatsApp",
    },
  ].filter((s) => s.href);

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
            style={{
              color: "#6C63FF",
              fontFamily: "'JetBrains Mono', monospace",
            }}
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
            style={{
              background:
                "linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)",
            }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="mb-8 leading-relaxed"
              style={{ color: "#A0A0B8", fontSize: "0.95rem" }}
            >
              I'm currently open to new opportunities. Don't hesitate to reach
              out!
            </p>
            <div className="space-y-5 mb-10">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(108,99,255,0.12)",
                      color: "#6C63FF",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "#A0A0B8" }}>
                      {item.label}
                    </p>
                    <p
                      style={{
                        color: "#fff",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem",
                      }}
                    >
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "#13131F",
                    border: "1px solid #1E1E3A",
                    color: "#A0A0B8",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#6C63FF";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#6C63FF55";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#A0A0B8";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#1E1E3A";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

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
                  <label
                    className="block text-xs mb-2"
                    style={{ color: "#A0A0B8" }}
                  >
                    Name
                  </label>
                  <input
                    style={inputStyle}
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor =
                        "#6C63FF55")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor =
                        "#1E1E3A")
                    }
                    required
                  />
                </div>
                <div>
                  {/* <input
                    type="email"
                    style={inputStyle}
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    onFocus={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor =
                        "#6C63FF55")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLInputElement).style.borderColor =
                        "#1E1E3A")
                    }
                    required
                  /> */}
                </div>
              </div>
              <div>
                <label
                  className="block text-xs mb-2"
                  style={{ color: "#A0A0B8" }}
                >
                  Subject
                </label>
                <input
                  style={inputStyle}
                  placeholder="Project inquiry / Collaboration"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "#6C63FF55")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "#1E1E3A")
                  }
                  required
                />
              </div>
              <div>
                <label
                  className="block text-xs mb-2"
                  style={{ color: "#A0A0B8" }}
                >
                  Message
                </label>
                <textarea
                  style={{ ...inputStyle, resize: "none" }}
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  onFocus={(e) =>
                    ((e.target as HTMLTextAreaElement).style.borderColor =
                      "#6C63FF55")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLTextAreaElement).style.borderColor =
                      "#1E1E3A")
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all duration-300 hover:opacity-90 disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                  color: "#fff",
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: "0 4px 24px rgba(108,99,255,0.4)",
                }}
              >
                <Send size={16} />
                Send Email
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
