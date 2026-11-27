import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { profileData } from "../../data/profile";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-[rgba(255,75,112,0.18)] bg-[#050507]/90 backdrop-blur-md mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & info */}
          <div className="text-center md:text-left">
            <h3 className="font-black text-lg tracking-wider text-[#F5F1F2]">
              PUNITH<span className="text-[#F20D45]">.</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#A79BA0] mt-1 font-mono">
              AI/ML Developer &middot; Machine Learning &amp; Software Systems
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-full border border-[rgba(255,75,112,0.25)] bg-[rgba(20,12,16,0.8)] text-[#A79BA0] hover:text-[#FF315B] hover:border-[#F20D45] hover:shadow-[0_0_12px_rgba(242,13,69,0.3)] flex items-center justify-center transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-full border border-[rgba(255,75,112,0.25)] bg-[rgba(20,12,16,0.8)] text-[#A79BA0] hover:text-[#FF315B] hover:border-[#F20D45] hover:shadow-[0_0_12px_rgba(242,13,69,0.3)] flex items-center justify-center transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              aria-label="Send direct email"
              className="w-10 h-10 rounded-full border border-[rgba(255,75,112,0.25)] bg-[rgba(20,12,16,0.8)] text-[#A79BA0] hover:text-[#FF315B] hover:border-[#F20D45] hover:shadow-[0_0_12px_rgba(242,13,69,0.3)] flex items-center justify-center transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full border border-[rgba(255,75,112,0.25)] bg-[rgba(20,12,16,0.8)] text-[#A79BA0] hover:text-[#F5F1F2] hover:border-[#F20D45] flex items-center justify-center transition-all cursor-pointer ml-2 hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub-bar */}
        <div className="mt-8 pt-8 border-t border-[rgba(255,75,112,0.15)] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#74676D] gap-3">
          <p>
            &copy; {new Date().getFullYear()} PUNITH KUMAR B S. ALL RIGHTS RESERVED.
          </p>
          {/* <p>
            CRIMSON PARTICLE &bull; DARK GLASS ARCHITECTURE
          </p> */}
        </div>
      </div>
    </footer>
  );
};
