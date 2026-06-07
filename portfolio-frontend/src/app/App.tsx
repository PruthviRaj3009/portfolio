import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Certificates } from "./components/Certificates";
import { Accolades } from "./components/Accolades";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "#0A0A0F",
        fontFamily: "'Inter', sans-serif",
        scrollBehavior: "smooth",
      }}
    >
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certificates />
      <Accolades />
      <Contact />
      <Footer />
    </div>
  );
}
