import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Cpu, CheckCircle2, Layers, AlertTriangle, Lightbulb } from "lucide-react";
import { projectsData } from "../data/projects";
import { CursorSparks } from "../components/ui/CursorSparks";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/Button";
import { Tag } from "../components/ui/Tag";
import { Card } from "../components/ui/Card";
import { GithubIcon } from "../components/ui/Icons";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!project) {
    return (
      <div className="relative min-h-screen flex flex-col text-[#F5F1F2]">
        <Navbar activeSection="projects" />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-32 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl font-black uppercase mb-4">PROJECT NOT FOUND</h1>
          <p className="text-[#A79BA0] max-w-md mb-8">
            The project you're looking for doesn't exist or may have been updated.
          </p>
          <Button href="/" variant="primary">
            &larr; RETURN TO PORTFOLIO
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col text-[#F5F1F2] antialiased">
      <CursorSparks />
      <Navbar activeSection="projects" />

      <main className="flex-1 pt-36 pb-20 relative z-10">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation & Status */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A79BA0] hover:text-[#FF315B] transition-colors p-1"
            >
              <ArrowLeft className="w-4 h-4" /> BACK TO PROJECTS
            </Link>
            <div className="flex items-center gap-2">
              <Tag variant={project.status === "Completed" ? "success" : "accent"}>
                {project.status}
              </Tag>
              <Tag variant="neutral">{project.category}</Tag>
            </div>
          </div>

          {/* Heading */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F5F1F2] leading-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#A79BA0] leading-relaxed">
              {project.summary}
            </p>

            {/* Quick action buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  external
                  variant="outline"
                  size="md"
                  icon={<GithubIcon className="w-4 h-4" />}
                >
                  SOURCE CODE
                </Button>
              )}
              {project.demoUrl && (
                <Button
                  href={project.demoUrl}
                  external
                  variant="primary"
                  size="md"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  LIVE DEPLOYMENT
                </Button>
              )}
            </div>
          </header>

          {/* Main Content Sections */}
          <div className="space-y-10">
            {/* 1. Deep Overview */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider flex items-center gap-2 text-[#F5F1F2]">
                <Cpu className="w-5 h-5 text-[#F20D45]" /> ARCHITECTURE &amp; SYSTEM OVERVIEW
              </h2>
              <div className="glass-panel p-6">
                <p className="text-sm sm:text-base text-[#A79BA0] leading-relaxed">
                  {project.description}
                </p>
              </div>
            </section>

            {/* 2. Problem Statement vs Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-[#F20D45]">
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF315B] mb-2">
                  PROBLEM STATEMENT
                </h3>
                <p className="text-xs sm:text-sm text-[#A79BA0] leading-relaxed">
                  {project.problem}
                </p>
              </Card>

              <Card className="border-l-4 border-l-emerald-500">
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  ENGINEERED SOLUTION
                </h3>
                <p className="text-xs sm:text-sm text-[#A79BA0] leading-relaxed">
                  {project.solution}
                </p>
              </Card>
            </div>

            {/* 3. Key Technical Contributions */}
            <section className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider flex items-center gap-2 text-[#F5F1F2]">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> KEY FEATURES &amp; CONTRIBUTIONS
              </h2>
              <Card>
                <ul className="space-y-3">
                  {(project.keyFeatures || project.highlights || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#F5F1F2]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F20D45] mt-2 shrink-0 shadow-[0_0_6px_#F20D45]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>

            {/* 4. Tech Stack */}
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider flex items-center gap-2 text-[#F5F1F2]">
                <Layers className="w-5 h-5 text-[#F20D45]" /> TECHNOLOGY STACK
              </h2>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.stack.map((tech) => (
                  <Tag key={tech} variant="neutral" size="md">
                    {tech}
                  </Tag>
                ))}
              </div>
            </section>

            {/* 5. Results & Known Limitations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#A79BA0] mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> RESULTS &amp; LIMITATIONS
                </div>
                <p className="text-xs text-[#A79BA0] leading-relaxed">
                  Designed for verified research conditions. False positives can occur in rare multi-star binary systems; future iterations incorporate higher-order harmonic filtering.
                </p>
              </Card>

              <Card>
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#A79BA0] mb-2">
                  <Lightbulb className="w-4 h-4 text-[#F20D45]" /> LEARNINGS &amp; NEXT STEPS
                </div>
                <p className="text-xs text-[#A79BA0] leading-relaxed">
                  Hands-on experience with asynchronous metric ingestion, phase-folded astrophysical time-series data, and resilient Dockerized microservice architecture.
                </p>
              </Card>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
