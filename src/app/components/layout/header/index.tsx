"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

/* ===========================
   GLITCH LOGO – ULTRA SMOOTH
   =========================== */
function GarwilLogo() {
  return (
    <motion.div
      className="relative font-extrabold text-3xl tracking-tight select-none"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Neon Glow */}
      <motion.div
        className="absolute inset-0 blur-xl bg-blue-500/20 rounded-full"
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Glitch Text */}
      <motion.span
        className="relative text-transparent bg-gradient-to-r from-white to-blue-200 bg-clip-text"
        animate={{
          x: [0, 0.7, -0.7, 0],
          skewX: [0, -2, 2, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        Garwil
      </motion.span>

      {/* Blue pulse dot */}
      <motion.span
        className="absolute -right-2 top-0 w-2 h-2 bg-blue-400 rounded-full"
        animate={{ scale: [1, 1.8, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.div>
  );
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  // smooth scroll indicator
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // detect scroll shrink
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || "Home");
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () =>
      sections.forEach((section) => observer.unobserve(section));
  }, []);

  /* ============================================
      RETURN – HEADER STATIC + MOBILE MENU
     ============================================ */
  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] 
        ${
          scrolled
            ? "backdrop-blur-xl bg-black/70 py-3 shadow-[0_4px_40px_rgba(0,0,0,0.3)]"
            : "backdrop-blur-md bg-black/30 py-5"
        }`}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between relative">
          {/* LOGO */}
          <Link href="/" className="relative z-20">
            <GarwilLogo />
          </Link>

          {/* DESKTOP NAV */}
          <motion.div
            className="hidden md:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {navLinks.map((link) => {
              const isActive =
                activeSection === link.name ||
                (link.href !== "/" &&
                  activeSection === link.href.replace("#", ""));

              return (
                <motion.a
                  href={link.href}
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 
                    ${
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white/90"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/20"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </motion.a>
              );
            })}
          </motion.div>

          {/* MOBILE BURGER */}
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.1 }}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[6px] bg-white/5 border border-white/10 rounded-lg backdrop-blur-md"
          >
            <span className="w-6 h-[2px] bg-white rounded-full" />
            <span className="w-6 h-[2px] bg-white rounded-full" />
            <span className="w-6 h-[2px] bg-white rounded-full" />
          </motion.button>
        </nav>

        {/* Scroll Progress */}
        <motion.div
          style={{ width: progressWidth }}
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        />
      </motion.header>

      {/* ============================================
           MOBILE MENU – SMOOTH, LUXURY, CINEMATIC
         ============================================ */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90]"
            />

            {/* SLIDE PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 24,
                stiffness: 220,
              }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-gradient-to-br from-zinc-900 to-black border-l border-white/10 shadow-2xl z-[100] p-10"
            >
              {/* COLOR ORBS */}
              <div className="absolute top-24 right-16 w-40 h-40 bg-blue-500/30 rounded-full blur-[100px]" />
              <div className="absolute bottom-24 left-10 w-40 h-40 bg-purple-500/30 rounded-full blur-[100px]" />

              {/* CLOSE BUTTON */}
              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ rotate: 90, scale: 1.1 }}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white"
              >
                ✕
              </motion.button>

              {/* MENU LINKS */}
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  show: {
                    transition: {
                      staggerChildren: 0.09,
                      delayChildren: 0.15,
                    },
                  },
                  hidden: {
                    transition: {
                      staggerChildren: 0.05,
                      staggerDirection: -1,
                    },
                  },
                }}
                className="space-y-8 mt-20"
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    variants={{
                      show: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: 50 },
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-4xl font-bold text-white/80 hover:text-white flex items-center gap-4"
                    >
                      <motion.span
                        className="w-10 h-[3px] bg-white/20 group-hover:bg-white"
                        whileHover={{ scaleX: 1.7 }}
                      />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* SOCIALS */}
              <div className="absolute bottom-12 left-10 right-10">
                <p className="text-white/50 text-sm mb-3">Connect with me</p>
                <div className="flex gap-3">
                  {[
                    { icon: "⚡", name: "GitHub" },
                    { icon: "💼", name: "LinkedIn" },
                    { icon: "🐦", name: "Twitter" },
                  ].map((s) => (
                    <motion.a
                      key={s.name}
                      href="#"
                      whileHover={{ scale: 1.15, y: -3 }}
                      className="w-12 h-12 bg-white/5 border border-white/10 text-white rounded-xl flex items-center justify-center text-xl"
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
