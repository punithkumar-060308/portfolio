import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ParticleCanvas } from "./components/ui/ParticleCanvas";
import { CursorSparkTrail } from "./components/ui/CursorSparkTrail";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { StatsStrip } from "./components/sections/StatsStrip";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { TechStackGrid } from "./components/sections/TechStackGrid";
import { Skills } from "./components/sections/Skills";
import { Contact } from "./components/sections/Contact";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "projects", "experience", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col text-[#F5F1F2] antialiased overflow-x-hidden">
      {/* Global subtle background red ambient lights */}
      <div className="fixed top-1/4 left-1/4 w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(242,13,69,0.08)_0%,rgba(5,5,7,0)_70%)] pointer-events-none -z-10" />
      <div className="fixed bottom-1/3 right-1/4 w-[700px] h-[550px] bg-[radial-gradient(circle,rgba(242,13,69,0.06)_0%,rgba(5,5,7,0)_70%)] pointer-events-none -z-10" />

      {/* Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        <div id="hero">
          <Hero />
        </div>
        <StatsStrip />
        <About />
        <Projects />
        <Experience />
        <TechStackGrid />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ParticleCanvas />
      <CursorSparkTrail />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
