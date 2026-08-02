"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Terminal, Box, FileText, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

type DockLink = {
  type: "link" | "external";
  href: string;
  label: string;
  icon: LucideIcon | IconType;
  sectionId?: string;
};

const dockLinks: DockLink[] = [
  { type: "link", href: "#home", label: "Home", icon: Home, sectionId: "home" },
  { type: "link", href: "#experience", label: "Experience", icon: Terminal, sectionId: "experience" },
  { type: "link", href: "#skills", label: "Skills", icon: Box, sectionId: "skills" },
  { type: "link", href: "#projects", label: "Projects", icon: FileText, sectionId: "projects" },
  { type: "link", href: "#contact", label: "Contact", icon: ArrowUpRight, sectionId: "contact" },
  { type: "external", href: "https://github.com/gardawilson", label: "GitHub", icon: FaGithub },
];

function DockButton({ item, isActive }: { item: DockLink; isActive: boolean }) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      target={item.type === "external" ? "_blank" : undefined}
      rel={item.type === "external" ? "noopener noreferrer" : undefined}
      aria-label={item.label}
      title={item.label}
      className={`relative flex size-[42px] shrink-0 items-center justify-center rounded-full transition md:size-[50px] ${
        isActive ? "bg-white text-black" : "bg-[#262626] text-white hover:bg-[#333]"
      }`}
    >
      <Icon size={20} />
    </a>
  );
}

const SECTION_IDS = ["home", "about", "experience", "skills", "projects", "contact"];
const PINNED_TOP = 16;

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [topOffset, setTopOffset] = useState(PINNED_TOP);

  useEffect(() => {
    const REFERENCE_OFFSET = 140; // px from top, clears the fixed dock

    const onScroll = () => {
      // Active-section tracking
      let current = SECTION_IDS[0];

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - REFERENCE_OFFSET <= 0) {
          current = id;
        }
      }

      setActiveSection(current);

      // Dock position: sits at the hero anchor (below the name) until
      // scrolling carries it above PINNED_TOP, then it stays pinned there.
      const anchor = document.getElementById("hero-nav-anchor");
      if (!anchor) {
        setTopOffset(PINNED_TOP);
        return;
      }
      setTopOffset(Math.max(PINNED_TOP, anchor.getBoundingClientRect().top));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className="fixed left-1/2 z-[100] -translate-x-1/2"
      style={{ top: topOffset }}
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.9 } as any}
        className="flex items-center gap-[10px] rounded-[24px] border border-white/10 bg-[#171717] px-3 py-2 shadow-[0_14px_45px_rgba(0,0,0,0.45)] md:gap-[11px] md:px-[20px] md:py-[10px]"
      >
        {dockLinks.map((item) => (
          <DockButton
            key={item.label}
            item={item}
            isActive={activeSection === item.sectionId}
          />
        ))}
      </motion.div>
    </header>
  );
}
