import React, { useEffect } from "react";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Layers,
  Cpu,
  UserCheck,
  FileText,
  AlertTriangle,
  Lightbulb,
  Radio,
  Sparkles
} from "lucide-react";
import type { Project } from "../../data/projects";
import { Tag } from "../ui/Tag";
import { Button } from "../ui/Button";
import { GithubIcon } from "../ui/Icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#090507] border border-[rgba(255,23,68,0.3)] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_40px_rgba(255,23,68,0.22)] z-10 overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Top Accent Neon Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF1744] to-transparent shrink-0" />

        {/* Cinematic Banner / Graphical Cover Header */}
        <div className="relative w-full h-40 sm:h-52 md:h-60 bg-gradient-to-b from-[#1c0812] via-[#10050b] to-[#090507] overflow-hidden shrink-0 flex items-center justify-center border-b border-white/10">
          {/* If project has custom cover/banner image, show it */}
          {project.bannerImage || project.coverImage ? (
            <img
              src={project.bannerImage || project.coverImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-35 filter brightness-90"
            />
          ) : null}

          {/* Subtle Background Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,23,68,0.2)_0%,rgba(9,5,7,0.95)_75%)] pointer-events-none" />

          {/* Graphical Project Identity Banner */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#FF1744]/25 to-[#990022]/40 border border-[#FF1744]/50 flex items-center justify-center text-white mb-2 sm:mb-3 shadow-[0_0_20px_rgba(255,23,68,0.4)]">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF315B]" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#FF1744] font-bold uppercase">
                {project.tag || project.category}
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#A79BA0] uppercase">
                {project.category}
              </span>
            </div>
            <h2 id="modal-project-title" className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white drop-shadow-md">
              {project.title}
            </h2>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-[#FF1744]/25 border border-white/20 hover:border-[#FF1744]/60 text-[#A79BA0] hover:text-white transition-all cursor-pointer shadow-lg"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 md:p-8 overflow-y-auto space-y-6">
          {/* Status & Category Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-2.5">
              <Radio className="w-4 h-4 text-[#FF1744] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider text-[#A79BA0] uppercase">STATUS:</span>
              <Tag
                variant={
                  project.status === "Completed"
                    ? "success"
                    : project.status === "In Progress"
                    ? "accent"
                    : "neutral"
                }
                size="sm"
              >
                {project.status}
              </Tag>
            </div>
            {project.metric && (
              <div className="flex items-center gap-1.5 text-xs text-[#A79BA0] font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#FF315B]" />
                <span>{project.metric.label}: <strong className="text-white font-bold">{project.metric.value}</strong></span>
              </div>
            )}
          </div>

          {/* Short Summary & Detailed Overview */}
          {project.description && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF1744] mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> DETAILED PROJECT OVERVIEW
              </h3>
              <p className="text-sm sm:text-base text-[#E6DEE1] leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          {/* Problem Statement and Engineered Solution (Cleanly hides if either is omitted) */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.problem && (
                <div className="p-4 sm:p-5 rounded-xl bg-[#14080e]/90 border border-[#FF1744]/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF5252] mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> PROBLEM STATEMENT
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A79BA0] leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-4 sm:p-5 rounded-xl bg-[#091510]/90 border border-emerald-500/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" /> TECHNICAL SOLUTION
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A79BA0] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Role & Contributions (Omitted cleanly if undefined/empty) */}
          {project.role && (
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF315B] mb-1.5 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#FF1744]" /> MY ROLE &amp; RESPONSIBILITIES
              </h4>
              <p className="text-xs sm:text-sm text-[#F5F1F2] leading-relaxed">
                {project.role}
              </p>
            </div>
          )}

          {/* Key Features & Implementation Details */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF1744] mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> KEY FEATURES &amp; IMPLEMENTATION
              </h4>
              <ul className="space-y-2.5">
                {project.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#F5F1F2]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF1744] mt-2 shrink-0 shadow-[0_0_6px_#FF1744]" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Stack Badges */}
          {project.stack && project.stack.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF1744] mb-2.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> TECHNOLOGIES &amp; TOOLS USED
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Tag key={tech} variant="neutral" size="sm">
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Action Links (Hides buttons if links are not provided) */}
        <div className="p-4 sm:p-6 border-t border-[rgba(255,23,68,0.2)] bg-[#050204] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={onClose} className="w-full sm:w-auto">
            CLOSE PREVIEW
          </Button>

          <div className="flex flex-wrap items-center gap-2">
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                external
                variant="outline"
                size="sm"
                icon={<GithubIcon className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                GITHUB REPO
              </Button>
            )}

            {project.demoUrl && (
              <Button
                href={project.demoUrl}
                external
                variant="primary"
                size="sm"
                icon={<ExternalLink className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                LIVE PREVIEW
              </Button>
            )}

            {project.docsUrl && (
              <Button
                href={project.docsUrl}
                external
                variant="outline"
                size="sm"
                icon={<FileText className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                DOCS
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
