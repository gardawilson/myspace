"use client";

import ShuffleText from "./ShuffleText";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { getImgPath } from "@/utils/image";
import { useEffect, useState } from "react";

/* ===========================
   ANIMATION VARIANTS (TS SAFE)
   - gunakan Variants
   - cast transition di variants ke `any`
=========================== */

// small standard easings (cubic-bezier arrays)
const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_IN_OUT = [0.645, 0.045, 0.355, 1];

const glitchKeyframes: Variants = {
  hidden: { opacity: 0, skewX: "0deg" },

  visible: {
    opacity: [0, 1, 0.6, 1],
    skewX: ["0deg", "10deg", "-10deg", "0deg"],

    transition: {
      duration: 0.6,
      ease: EASE_IN_OUT,
    } as any,
  },
};


const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE_OUT } as any,
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE_OUT } as any,
  },
};

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [hoverImage, setHoverImage] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!showBubble) return;

    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showBubble]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-white text-black min-h-screen flex items-center">
  
       {/* Background Diagonal */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0, x: 150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: EASE_OUT } as any}
      >
        <div className="absolute top-0 right-0 w-[43%] h-full bg-black transform -skew-x-12 origin-top-left translate-x-[15%]" />
        <div className="absolute top-0 right-0 w-[15%] h-full bg-black" />
      </motion.div>

      {/* Floating Blur Blobs */}
      {mounted &&
        [...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-black/5 blur-3xl"
            style={{
              left: `${Math.random() * 50}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{
              duration: Math.random() * 4 + 6,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* ❄ SNOWFALL EFFECT ❄ */}
{[...Array(40)].map((_, i) => (
  <motion.div
    key={i}
    className="absolute w-2 h-2 bg-white rounded-full opacity-70"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${-20 - Math.random() * 40}px`,
      filter: "blur(1px)"
    }}
    animate={{
      y: ["0vh", "110vh"],
      x: [0, Math.random() * 30 - 15],
      opacity: [1, 0.3, 1],
    }}
    transition={{
      duration: Math.random() * 6 + 6,
      repeat: Infinity,
      ease: "linear",
      delay: Math.random() * 5,
    }}
  />
))}


      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-0 items-center min-h-screen">

          {/* ================= LEFT TEXT ================= */}
          <motion.div
            className="max-w-xl space-y-6 lg:pr-12 py-20"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.18 } as any}
          >
            {/* INTRO */}
            <motion.p variants={fadeLeft} className="text-lg font-medium text-gray-600">
              Hi, I am
            </motion.p>

            {/* NAME GLITCH */}
            <motion.h1
              variants={glitchKeyframes}
              className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-black"
            >
              <ShuffleText text="Garda Wilson" />
            </motion.h1>

            {/* ROLE */}
            <motion.h2
              variants={fadeLeft}
              className="text-xl md:text-2xl font-medium text-gray-600"
            >
              Fullstack & Mobile Developer
            </motion.h2>

            {/* SOCIAL ICONS with glitch */}
            <motion.div className="flex gap-4">
              {[
                {
                  href: "mailto:gardawilson@gmail.com",
                  svg: (
                    <>
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </>
                  ),
                },
                {
                  href: "https://github.com/gardawilson",
                  svg: (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.11.78-.25.78-.56
                      0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71
                      1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7
                      0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.48.11-3.09 0 0 .97-.31 3.17 1.18A10.9 10.9 0 0112 6.36c.98.01
                      1.97.13 2.89.39 2.19-1.49 3.16-1.18 3.16-1.18.63 1.61.23 2.8.11 3.09.74.81 1.19 1.84 1.19 3.1
                      0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.09.78 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.2.68.79.56A10.51 10.51 
                      A0 0023.5 12C23.5 5.65 18.35.5 12 .5z"
                    />
                  ),
                },
                {
                  href: "https://linkedin.com/in/gardawilson",
                  svg: (
                    <path
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559
                      v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 
                      0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59z"
                    />
                  ),
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  variants={glitchKeyframes}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-black hover:text-white transition-all flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {item.svg}
                  </svg>
                </motion.a>
              ))}
            </motion.div>

          </motion.div>

          {/* ================= RIGHT IMAGE + FLOATING ICONS ================= */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="relative h-screen lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2"
          >

            {/* IMAGE WRAPPER */}
            <motion.div
              onHoverStart={() => setHoverImage(true)}
              onHoverEnd={() => setHoverImage(false)}
              onClick={() => setShowBubble((prev) => !prev)}
              whileHover={{ scale: 1.05, rotate: 1, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 } as any}
              className="relative w-full h-full cursor-pointer"
            >
              <Image
                src={getImgPath("/images/home/banner/my-photo.png")}
                alt="Garwil"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top lg:object-[center_top] scale-x-[-1]"
                priority
              />

              {/* BUBBLE CHAT */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={showBubble ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.25, ease: EASE_OUT } as any}
                className="absolute top-30 right-6 z-[9999] bg-white text-black px-5 py-3 rounded-2xl shadow-2xl text-sm md:text-base max-w-xs border border-gray-200"
              >
                Ada yang bisa saya bantu? 👋

                {/* Ekor Bubble */}
                <div className="absolute -bottom-2 right-55 w-4 h-4 bg-white rotate-45 border-l border-b border-gray-200" />
              </motion.div>

              {/* FLOATING TECH ICONS */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: hoverImage ? 1 : 0,
                  y: hoverImage ? 0 : 40,
                }}
                transition={{ duration: 0.4, ease: EASE_OUT } as any}
                className="absolute bottom-10 w-full flex justify-center gap-6"
              >
                {[
                  "/images/icon/flutter.svg",
                  "/images/icon/nextjs.svg",
                  "/images/icon/nodejs.svg",
                  "/images/icon/postgresql.svg",
                ].map((src, i) => (
                  <motion.div
                    key={i}
                    className="w-14 h-14 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg flex items-center justify-center"
                    animate={{
                      y: hoverImage ? [0, -6, 0] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: hoverImage ? Infinity : 0,
                      repeatType: "loop",
                      ease: EASE_IN_OUT,
                      delay: i * 0.2,
                    } as any}
                  >
                    <Image src={src} alt="Tech Icon" width={30} height={30} />
                  </motion.div>
                ))}
              </motion.div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
