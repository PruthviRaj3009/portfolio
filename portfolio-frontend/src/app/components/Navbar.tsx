import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useProfile } from "../../hooks/usePortfolioData";

const navLinks = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: profile } = useProfile();

  // Get initials from name — "Pruthviraj Pawar" → "PP"
  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "PP"; // fallback while loading

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (section: string) => {
    const id = section.toLowerCase();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(108,99,255,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo — initials from database */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer select-none"
          style={{
            background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {initials}
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className="text-sm transition-colors duration-200 hover:text-white"
              style={{ color: "#A0A0B8", fontFamily: "'Inter', sans-serif" }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Hire me button */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNav("Contact")}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
              color: "#fff",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Hire Me
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{
            background: "rgba(10,10,15,0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className="text-left text-sm py-2 border-b transition-colors duration-200 hover:text-white"
              style={{
                color: "#A0A0B8",
                borderColor: "#1E1E3A",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => handleNav("Contact")}
            className="mt-2 px-5 py-2 rounded-full text-sm font-medium text-center"
            style={{
              background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
              color: "#fff",
            }}
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
}
