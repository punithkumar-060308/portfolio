import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

interface NavItem {
  label: string;
  href: string;
  targetId: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navItems: NavItem[] = [
    { label: "ABOUT", href: "#about", targetId: "about" },
    { label: "PROJECTS", href: "#projects", targetId: "projects" },
    { label: "TIMELINE", href: "#experience", targetId: "experience" },
    { label: "SKILLS", href: "#skills", targetId: "skills" },
    { label: "CONTACT", href: "#contact", targetId: "contact" },
  ];

  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Ensure dark theme
    document.documentElement.removeAttribute("data-theme");
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update dynamic indicator position beneath active / hovered item
  const updateIndicator = useCallback(() => {
    const currentIndex =
      hoveredIndex !== null
        ? hoveredIndex
        : navItems.findIndex((item) => item.targetId === activeSection);

    if (currentIndex !== -1 && itemRefs.current[currentIndex] && navRef.current) {
      const item = itemRefs.current[currentIndex]!;
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      const left = itemRect.left - navRect.left;
      const width = itemRect.width;

      setIndicatorStyle({
        left,
        width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredIndex, activeSection]);

  useEffect(() => {
    updateIndicator();
    const timer = setTimeout(updateIndicator, 150);
    window.addEventListener("resize", updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  // Smooth scroll handler with offset for floating navbar
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: "smooth",
      });
    } else if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <div className="w-full max-w-5xl pointer-events-auto">
        {/* Floating Capsule matching exact glassmorphism design */}
        <div className="relative rounded-[22px] bg-gradient-to-b from-[#1c1217]/95 via-[#0e070b]/98 to-[#060305]/98 border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl px-4 sm:px-7 py-2.5 sm:py-3 flex items-center justify-between">
          
          {/* Brand Logo: Stylized Red P with slash cut + UNITH. */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="group flex items-center font-black text-lg sm:text-xl tracking-wider text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D45] rounded-lg select-none"
          >
            <span className="relative text-[#E5163E] inline-block font-black mr-0.5">
              P
              {/* Subtle slash accent line through first letter */}
              <span className="absolute -bottom-0.5 -left-1 w-3.5 h-[2px] bg-[#E5163E] -rotate-45 opacity-80" />
            </span>
            <span className="font-extrabold tracking-wide text-white">UNITH.</span>
          </a>

          {/* Desktop Navigation Links Container */}
          <nav
            ref={navRef}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative hidden md:flex items-center gap-7 lg:gap-9 py-1"
          >
            {navItems.map((item, index) => {
              const isActive = activeSection === item.targetId;
              const isHovered = hoveredIndex === index;

              return (
                <a
                  key={item.label}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`text-[12px] font-bold uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D45] py-1 select-none ${
                    isActive || isHovered
                      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.45)]"
                      : "text-[#B8ACB2] hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Sleek Animated Crimson Line System directly beneath the navigation items */}
            <div className="absolute -bottom-1 left-0 right-0 h-[2px] pointer-events-none overflow-hidden">
              {/* Subtle continuous baseline rail */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

              {/* Sequential continuous travelling glowing crimson laser trail (left to right) */}
              <div className="absolute top-0 h-[1.5px] w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#FF1744] to-transparent shadow-[0_0_12px_#FF1744,0_0_24px_rgba(255,23,68,0.7)] animate-nav-travel-h" />
            </div>

            {/* Active / Hover Glowing Indicator Bar beneath current item */}
            <div
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
              className="absolute -bottom-1 top-auto h-[2px] bg-gradient-to-r from-[#FF1744] via-[#FF4569] to-[#FF1744] rounded-full shadow-[0_0_10px_#FF1744,0_0_18px_rgba(255,23,68,0.85)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-10"
            />
          </nav>

          {/* Right Red Pill Button */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden sm:inline-flex items-center justify-center bg-[#E5163E] hover:bg-[#FF244D] text-white font-black text-[12px] uppercase tracking-wider px-6 sm:px-7 py-2.5 rounded-full shadow-[0_2px_14px_rgba(229,22,62,0.45)] hover:shadow-[0_4px_22px_rgba(255,36,77,0.65)] transition-all duration-200 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D45]"
            >
              LET'S TALK
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden w-9 h-9 rounded-xl border border-white/10 bg-[rgba(20,12,16,0.8)] text-[#F5F1F2] flex items-center justify-center hover:border-[#F20D45] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D45]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 rounded-2xl border border-white/10 bg-[#0A0508]/98 backdrop-blur-2xl p-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="relative pl-3">
              {/* Vertical subtle baseline rail */}
              <div className="absolute top-2 bottom-2 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.12] to-transparent pointer-events-none" />

              {/* Vertical sequential travelling glowing crimson trail */}
              <div className="absolute left-0 w-[2px] h-14 bg-gradient-to-b from-transparent via-[#FF1744] to-transparent shadow-[0_0_10px_#FF1744] animate-nav-travel-v pointer-events-none" />

              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.targetId;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`relative px-4 py-3 min-h-[44px] flex items-center text-xs font-bold uppercase tracking-[0.14em] rounded-xl transition-all duration-200 ${
                        isActive
                          ? "text-white bg-[rgba(255,23,68,0.15)] border-l-2 border-[#FF1744] shadow-[inset_4px_0_12px_rgba(255,23,68,0.3)] pl-3.5"
                          : "text-[#A79BA0] hover:text-[#F5F1F2] hover:bg-[rgba(255,23,68,0.08)]"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="flex items-center justify-center w-full bg-[#E5163E] text-white font-black text-xs uppercase tracking-wider py-3 min-h-[44px] rounded-full shadow-[0_0_18px_rgba(229,22,62,0.45)]"
                  >
                    LET'S TALK
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
