"use client";

import { motion, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { Database } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFlutter,
  SiAndroid,
  SiNodedotjs,
  SiExpress,
  SiDotnet,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
} from "react-icons/si";

/* =======================
   DATA
======================= */

type SkillCategory = {
  title: string;
  description: string;
  icons: (IconType | LucideIcon)[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    description:
      "Building fast, accessible interfaces with modern frameworks and a strong eye for detail.",
    icons: [SiNextdotjs, SiReact, SiTypescript, SiTailwindcss],
  },
  {
    title: "Mobile Engineering",
    description:
      "Building production-grade cross-platform applications with strong emphasis on performance and maintainability.",
    icons: [SiFlutter, SiAndroid],
  },
  {
    title: "Backend Architecture",
    description:
      "Designing scalable service architectures and high-reliability APIs for enterprise-grade systems.",
    icons: [SiNodedotjs, SiExpress, SiDotnet],
  },
  {
    title: "Database Engineering",
    description:
      "Optimizing relational databases to ensure high performance, integrity, and scalability.",
    icons: [Database, SiMysql, SiMongodb, SiPostgresql],
  },
  {
    title: "System Engineering",
    description:
      "Applying clean architecture principles to build resilient and maintainable production systems.",
    icons: [SiGit, SiGithub],
  },
];

/* =======================
   ANIMATION
======================= */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    } as any,
  },
};

/* =======================
   CARD
======================= */

function SkillCard({ skill, index }: { skill: SkillCategory; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 } as any}
      className="flex flex-col gap-8 rounded-[32px] bg-[#1e1e1e] p-8 md:p-10"
    >
      {/* Icon row */}
      <div className="flex flex-wrap gap-3">
        {skill.icons.map((Icon, i) => (
          <div
            key={i}
            className="flex size-[64px] shrink-0 items-center justify-center rounded-full bg-[#141414]"
          >
            <Icon size={28} className="text-white/90" />
          </div>
        ))}
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-medium text-white">{skill.title}</h3>
        <p className="font-light leading-relaxed text-white/60">
          {skill.description}
        </p>
      </div>
    </motion.div>
  );
}

/* =======================
   SECTION
======================= */

export default function SkillsSection() {
  return (
    <section className="relative bg-black py-28">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="mb-16 flex items-center justify-between border-b border-white/20 pb-5">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Skills that fuel my passion
          </h2>
          <p className="font-mono text-lg text-white/40">(03)</p>
        </div>

        {/* SUBTEXT */}
        <p className="mb-14 max-w-2xl text-white/60">
          My expertise centers around building scalable production systems,
          combining mobile engineering, backend architecture, and
          high-performance databases to deliver reliable digital products.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
