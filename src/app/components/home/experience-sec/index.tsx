"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";

/* ===========================
   DATA
=========================== */
const experiences = [
  {
    year: "Jul 2024 — Present",
    title: "Fullstack Mobile Developer",
    company: "PT Ganda Saribu Utama",
    type: "Full-time",
    description:
      "Architected and led the development of a cross-platform enterprise mobile application using Flutter, supported by scalable Node.js microservices. Engineered high-performance SQL Server database structures that improved operational efficiency and ensured strong data integrity. Played a key role in digitizing core business workflows, transforming previously manual processes into reliable production systems.",
  },
  {
    year: "Jun 2023 — Jun 2024",
    title: "IT Staff (Software Engineering Intern)",
    company: "PT Kawasan Industri Medan",
    type: "Internship",
    description:
      "Developed and maintained internal web-based operational systems using React.js, Express.js, and SQL Server, supporting booking and cashier transactions for the KIM Sport Centre. Ensured system stability during high-traffic events while proactively minimizing downtime. Contributed across the full development lifecycle, from feature implementation to deployment and production support.",
  },
];

/* ===========================
   ✅ SAFE ANIMATION (FIXED)
=========================== */
const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    } as any,
  },
};

/* ===========================
   ✅ TYPED CARD PROPS
=========================== */
interface TimelineCardProps {
  exp: {
    year: string;
    title: string;
    company: string;
    type: string;
    description: string;
  };
  index: number;
}

/* ===========================
   TIMELINE CARD
=========================== */
const TimelineCard = ({ exp, index }: TimelineCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-120px", once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={controls}
      whileHover={{ y: -6 }}
      transition={{ 
        type: "spring", 
        stiffness: 140,
        delay: index * 0.15 
      } as any}
      className="relative bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-2xl shadow-sm hover:shadow-xl transition-all"
    >
      {/* Dot */}
      <div className="absolute -left-11 top-10 w-4 h-4 rounded-full bg-black" />

      <span className="text-xs text-gray-400 font-mono">{exp.year}</span>

      <h3 className="text-xl font-bold text-black mt-2">{exp.title}</h3>

      <p className="text-gray-500 text-sm mt-1">
        {exp.company} • {exp.type}
      </p>

      <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
        {exp.description}
      </p>
    </motion.div>
  );
};

/* ===========================
   MAIN SECTION
=========================== */
const ExperienceTimeline = () => {
  return (
    <section className="relative bg-white py-28 overflow-hidden">
      {/* Soft background tone */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        {/* HEADER - ✅ DIPERBAIKI: Hapus motion.div yang error */}
        <div className="flex items-center justify-between gap-2 border-b border-black pb-5 mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-black">
            Experience
          </h2>
          <p className="text-lg font-mono text-gray-500">(02)</p>
        </div>

        {/* TIMELINE */}
        <div className="relative flex flex-col items-center gap-24">
          {/* Vertical Line */}
          <div className="absolute left-12 top-0 w-[2px] h-full bg-gray-200"></div>

          {experiences.map((exp, index) => (
            <TimelineCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;