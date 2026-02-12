"use client";

import { motion, type Variants } from "framer-motion";
import {
  Smartphone,
  Server,
  Database,
  Layers,
} from "lucide-react";

/* =======================
   DATA
======================= */

const skills = [
  {
    title: "Mobile Engineering",
    icon: Smartphone,
    description:
      "Building production-grade cross-platform applications with strong emphasis on performance and maintainability.",
    stack: ["Flutter", "Native Android", "Dart", "Performance Optimization"],
  },
  {
    title: "Backend Architecture",
    icon: Server,
    description:
      "Designing scalable service architectures and high-reliability APIs for enterprise-grade systems.",
    stack: ["Node.js", "Express", "C#", "REST APIs", "Microservices"],
  },
  {
    title: "Database Engineering",
    icon: Database,
    description:
      "Optimizing relational databases to ensure high performance, integrity, and scalability.",
    stack: ["SQL Server", "PostgreSQL", "Query Optimization", "Data Modeling"],
  },
  {
    title: "System Engineering",
    icon: Layers,
    description:
      "Applying clean architecture principles to build resilient and maintainable production systems.",
    stack: ["Clean Architecture", "Git", "Agile", "Deployment"],
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

function SkillCard({ skill, index }: any) {
  const Icon = skill.icon;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 } as any}
      className="
        group
        bg-white
        border border-gray-200
        rounded-2xl
        p-8
        hover:shadow-xl
        transition-all
      "
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition">
        <Icon size={28} strokeWidth={1.6} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3">
        {skill.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        {skill.description}
      </p>

      {/* Stack */}
      <div className="flex flex-wrap gap-2">
        {skill.stack.map((tech: string) => (
          <span
            key={tech}
            className="
              px-3 py-1
              text-sm
              bg-gray-100
              rounded-full
              font-medium
            "
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* =======================
   SECTION
======================= */

export default function SkillsSection() {
  return (
    <section className="relative bg-white py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-black pb-5 mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Engineering Expertise
          </h2>
          <p className="text-lg font-mono text-gray-500">(03)</p>
        </div>

        {/* SUBTEXT — IMPORTANT */}
        <p className="text-gray-600 max-w-2xl mb-14">
          My expertise centers around building scalable production systems,
          combining mobile engineering, backend architecture, and
          high-performance databases to deliver reliable digital products.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
