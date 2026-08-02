"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { getImgPath } from "@/utils/image";
import RotatingText from "./RotatingText";

const HERO_TEXTS = ["Garda Wilson", "Fullstack Developer", "Mobile Developer"];

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT } as any,
  },
};

export default function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[640px] flex-col bg-[#C6C6C6] text-black">
      {/* Top bar — flush to the viewport edges */}
      <div className="relative z-10 flex items-start justify-between gap-6 px-6 pt-6 pb-3 md:px-10 md:pt-8 lg:px-14">
        <p className="text-sm font-medium md:text-base">@ Code by Garda</p>
        <p className="max-w-xs text-right text-sm font-light text-black/60 md:text-base">
          Passionate Fullstack &amp; Mobile Developer, dedicated to crafting
          reliable and thoughtful digital experiences through modern
          technologies.
        </p>
      </div>

      {/* ================= PHOTO ================= */}
      <div className="relative mx-auto min-h-0 w-full max-w-3xl flex-1 overflow-hidden">
        <Image
          src={getImgPath("/images/home/banner/my-photo.png")}
          alt="Garda Wilson"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          style={{ objectPosition: "50% 10%" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#C6C6C6] to-transparent" />
      </div>

      {/* Giant overflowing name / role, rotating */}
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative shrink-0 overflow-hidden px-2 text-center font-medium leading-none tracking-tight text-black"
        style={{ fontSize: "clamp(2rem, 8vw, 7rem)" }}
      >
        <RotatingText
          texts={HERO_TEXTS}
          mainClassName="justify-center"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.02}
          splitBy="words"
          splitLevelClassName="overflow-hidden"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2600}
        />
      </motion.h1>

      {/* Anchor for the floating nav dock: it rests here until scrolling
          carries it above the pinned offset, then it stays fixed at top. */}
      <div id="hero-nav-anchor" className="h-0 shrink-0" />
      <div className="h-20 shrink-0 md:h-24" />
    </section>
  );
}
