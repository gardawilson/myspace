"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { getImgPath } from "@/utils/image";

/* =======================
   TYPES
======================= */
interface SkillGroup {
  category: string;
  icon: string;
  items: string[];
}

interface FlipCardProps {
  group: SkillGroup;
  index: number;
}

/* =======================
   DATA
======================= */
const skills: SkillGroup[] = [
  {
    category: "Mobile Development",
    icon: "/images/icon/flutter.svg",
    items: ["Flutter", "Dart"],
  },
  {
    category: "Web Development",
    icon: "/images/icon/nextjs.svg",
    items: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    category: "Backend Development",
    icon: "/images/icon/nodejs.svg",
    items: ["Node.js", "Express.js", "REST API"],
  },
  {
    category: "Database",
    icon: "/images/icon/postgresql.svg",
    items: ["MySQL", "PostgreSQL", "SQL Server"],
  },
];

/* =======================
   ANIMATION - ✅ FIXED
======================= */
const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
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
   FLIP CARD
======================= */
function FlipCard({ group, index }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.12 // ✅ Pindahkan delay ke sini
      } as any}
      className="relative h-72 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.645, 0.045, 0.355, 1],
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="absolute -right-4 -bottom-4 opacity-[0.15] pointer-events-none">
            <Image
              src={getImgPath(group.icon)}
              alt={group.category}
              width={180}
              height={180}
            />
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 mb-6 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 shadow-sm flex items-center justify-center">
              <Image
                src={getImgPath(group.icon)}
                alt={group.category}
                width={32}
                height={32}
              />
            </div>

            <h3 className="text-2xl font-bold text-black text-center mb-4">
              {group.category}
            </h3>

            <p className="text-sm text-gray-400 font-mono">Click to view</p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl shadow-xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="absolute -right-4 -bottom-4 opacity-[0.08] pointer-events-none">
            <Image
              src={getImgPath(group.icon)}
              alt={group.category}
              width={180}
              height={180}
            />
          </div>

          <div className="relative z-10 h-full flex flex-col items-start justify-center p-8">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">
                {group.category}
              </h3>
              <div className="w-12 h-0.5 bg-white/30" />
            </div>

            <ul className="space-y-4 w-full">
              {group.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isFlipped
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="text-gray-200 text-base flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  {item}
                </motion.li>
              ))}
            </ul>

            <p className="text-xs text-gray-500 font-mono mt-auto">
              Click to flip back
            </p>
          </div>
        </div>
      </motion.div>
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
        {/* HEADER - ✅ Hapus motion.div */}
        <div className="flex items-center justify-between gap-2 border-b border-black pb-5 mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-black">
            Skills
          </h2>
          <p className="text-lg font-mono text-gray-500">(03)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {skills.map((group, index) => (
            <FlipCard key={index} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}