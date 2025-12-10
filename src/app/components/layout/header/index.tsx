"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

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

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700
          ${
            scrolled
              ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 py-2 shadow-lg"
              : "bg-black/40 backdrop-blur-md py-4 border-b border-white/5"
          }
        `}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between relative">
          {/* Animated glow following mouse */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.05), transparent 40%)`,
            }}
          />

          {/* LOGO */}
          <motion.a
            href="/"
            className="relative z-20 flex items-center gap-3 select-none group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/images/logo/logo_title.png"
              alt="logo"
              width={140}
              height={40}
              className="object-contain"
            />
          </motion.a>

          {/* DESKTOP NAV */}
          <motion.div
            className="hidden md:flex items-center gap-1 bg-white/5 px-3 py-2 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Shimmer background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {navLinks.map((link, idx) => {
              const isActive =
                activeSection === link.name ||
                (link.href !== "#" &&
                  activeSection === link.href.replace("#", ""));

              return (
                <motion.a
                  href={link.href}
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                      ${
                        isActive
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                      }
                    `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute inset-0 rounded-xl bg-white/10 border border-white/15"
                      transition={{
                        type: "spring",
                        duration: 0.6,
                        bounce: 0.2,
                      }}
                    />
                  )}

                  <span className="relative z-10">{link.name}</span>
                </motion.a>
              );
            })}
          </motion.div>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden relative w-12 h-12 flex flex-col justify-center items-center gap-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="w-6 h-0.5 bg-white rounded-full z-10" />
            <span className="w-6 h-0.5 bg-white rounded-full z-10" />
            <span className="w-6 h-0.5 bg-white rounded-full z-10" />
          </motion.button>
        </nav>

        {/* SCROLL PROGRESS */}
        <motion.div
          style={{ width: progressWidth }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-white/20 via-white/60 to-white/20"
        />
      </motion.header>

      {/* MOBILE MENU PANEL */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-[90]"
            />

            {/* SIDE PANEL */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white backdrop-blur-xl border-l border-gray-200 shadow-2xl z-[100] p-8 overflow-hidden"
            >
              {/* CLOSE BUTTON */}
              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 w-12 h-12 bg-black/5 border border-gray-300 rounded-2xl text-xl flex items-center justify-center"
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
                      staggerChildren: 0.08,
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
                className="space-y-6 mt-20"
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    variants={{
                      show: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: 60 },
                    }}
                  >
                    <motion.a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-4 text-3xl font-bold text-black/90 hover:text-black group"
                    >
                      {/* Elegant Bullet Indicator */}
                      <span className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-700 to-black group-hover:scale-125 transition-transform"></span>

                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
