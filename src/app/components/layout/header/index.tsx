"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { getImgPath } from "@/utils/image";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function DecryptText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const runDecrypt = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let frame = 0;
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < frame) return text[index];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      frame += 0.5;
      if (frame >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(text);
      }
    }, 24);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span onMouseEnter={runDecrypt} onFocus={runDecrypt}>
      {displayText}
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled((prev) => {
        if (!prev && window.scrollY > 80) return true;
        if (prev && window.scrollY < 52) return false;
        return prev;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const visibilityMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });

        let nextActive = "home";
        let maxRatio = 0;

        visibilityMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            nextActive = id;
          }
        });

        if (maxRatio > 0) {
          setActiveSection(nextActive);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-18% 0px -45% 0px",
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <header className="fixed left-1/2 top-0 z-[100] -translate-x-1/2">
        <div className="pt-4">
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.9 } as any}
            className={`relative overflow-hidden border border-white/10 bg-[#101114] shadow-[0_14px_45px_rgba(0,0,0,0.45)] ${
              scrolled ? "rounded-full px-3 py-2.5" : "rounded-[28px] px-4 py-3"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.03),transparent_40%)]" />

            <AnimatePresence mode="popLayout" initial={false}>
              {scrolled ? (
                <motion.div
                  key="compact-header"
                  layout
                  initial={{ opacity: 0, y: -6, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4, scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 170, damping: 20 } as any}
                  className="relative flex items-center gap-3"
                >
                  <a href="#home" className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
                    <Image
                      src={getImgPath("/images/home/banner/my-photo.png")}
                      alt="Garda Wilson"
                      fill
                      sizes="40px"
                      className="object-cover object-top"
                    />
                  </a>

                  <a href="#contact" className="flex items-center gap-2.5 pr-2 text-base font-medium text-white">
                    <span>Available for work</span>
                    <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400">
                      <span className="absolute inset-0 rounded-full bg-emerald-400/50 blur-[2px]" />
                    </span>
                  </a>

                  <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-xs font-medium text-white md:hidden"
                    aria-label="Toggle menu"
                  >
                    {open ? "X" : "Menu"}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="full-header"
                  layout
                  initial={{ opacity: 0, y: 6, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4, scale: 0.995 }}
                  transition={{ type: "spring", stiffness: 170, damping: 20 } as any}
                  className="relative flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-5">
                    <a href="#home" className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
                      <Image
                        src={getImgPath("/images/home/banner/my-photo.png")}
                        alt="Garda Wilson"
                        fill
                        sizes="40px"
                        className="object-cover object-top"
                      />
                    </a>

                    <nav className="hidden items-center gap-8 md:flex">
                      {navLinks.map((link) => {
                        const sectionId = link.href.replace("#", "");
                        const isActive = activeSection === sectionId;

                        return (
                          <a
                            key={link.name}
                            href={link.href}
                            className={`relative rounded-full text-base font-medium transition ${
                              link.name === "Contact"
                                ? `px-8 py-2.5 ${
                                    isActive
                                      ? "bg-white text-black ring-2 ring-white/50"
                                      : "bg-white text-black hover:bg-white/90"
                                  }`
                                : `px-3 py-2 ${
                                    isActive ? "text-white" : "text-white/95 hover:text-white"
                                  }`
                            }`}
                          >
                            {isActive && link.name !== "Contact" && (
                              <motion.span
                                layoutId="activeSectionNav"
                                className="absolute inset-0 rounded-full bg-white/12"
                                transition={{ type: "spring", stiffness: 340, damping: 30 } as any}
                              />
                            )}
                            <span className="relative z-10">
                              <DecryptText text={link.name} />
                            </span>
                          </a>
                        );
                      })}
                    </nav>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setOpen((prev) => !prev)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-medium text-white md:hidden"
                      aria-label="Toggle menu"
                    >
                      {open ? "X" : "Menu"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[84px] z-[95] px-6 md:hidden"
          >
            <div className="rounded-2xl border border-white/10 bg-[#101114] p-4 shadow-xl">
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-base font-medium transition ${
                      activeSection === link.href.replace("#", "")
                        ? "bg-white/15 text-white"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
