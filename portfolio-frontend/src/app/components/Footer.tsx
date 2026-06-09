import { Github, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { useProfile } from "../../hooks/usePortfolioData";

const navLinks = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

export function Footer() {
  const { data: profile } = useProfile();

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "PP";

  const firstName = profile?.name?.split(" ")[0] ?? "Pruthviraj";

  const socials = [
    { icon: <Github size={16} />, href: profile?.github_url, label: "GitHub" },
    {
      icon: <Linkedin size={16} />,
      href: profile?.linkedin_url,
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={16} />,
      href: profile?.twitter_url,
      label: "Twitter",
    },
    {
      icon: <MessageCircle size={16} />,
      href: profile?.whatsapp_number
        ? `https://wa.me/${profile.whatsapp_number}`
        : undefined,
      label: "WhatsApp",
    },
  ].filter((s) => s.href);

  const handleNav = (section: string) => {
    const el = document.getElementById(section.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#0A0A0F", borderTop: "1px solid #1E1E3A" }}>
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #6C63FF44, #00D4FF44, transparent)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {initials}
              </div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {firstName}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#A0A0B8" }}>
              Building the future, one API endpoint at a time.
            </p>
          </div>

          <div>
            <h4
              className="mb-4 text-sm"
              style={{
                color: "#fff",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
              }}
            >
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNav(link)}
                  className="text-left text-sm transition-colors duration-200 hover:text-white"
                  style={{
                    color: "#A0A0B8",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="mb-4 text-sm"
              style={{
                color: "#fff",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
              }}
            >
              Connect
            </h4>
            <div className="flex gap-3 mb-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
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
            <div
              className="flex items-center gap-2 text-xs"
              style={{
                color: "#A0A0B8",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#00FF87",
                  boxShadow: "0 0 6px #00FF87",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              Available for hire
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderTop: "1px solid #1E1E3A",
            color: "#A0A0B8",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span>© 2024 {firstName}. All rights reserved.</span>
          <span>
            Made with Django & <span style={{ color: "#FF6B6B" }}>♥</span> |{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Open to opportunities
            </span>
          </span>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </footer>
  );
}
