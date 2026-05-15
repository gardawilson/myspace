"use client";

import { motion, type Variants } from "framer-motion";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT } as any,
  },
};

export default function SelectedProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch(getDataPath("/data/work-data.json"))
      .then((res) => res.json())
      .then((data) => setProjects(data?.workData || []))
      .catch(console.error);
  }, []);

  return (
    <section id="projects" className="relative bg-white py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-black pb-5 mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Selected Projects
          </h2>
          <p className="text-lg font-mono text-gray-500">(04)</p>
        </div>

        {/* SUBTEXT */}
        <p className="text-gray-600 max-w-2xl mb-14">
          A selection of production systems and applications I have engineered,
          focusing on scalability, reliability, and real-world business impact.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 } as any}
              className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              {/* IMAGE */}
<div className="relative w-full bg-gray-100">
  <Image
    src={getImgPath(project.image)}
    alt={project.title}
    width={1200}
    height={800}
    className="w-full h-auto object-contain"
  />
</div>



              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>

                {/* STACK */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack?.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* ROLE */}
                <p className="text-sm text-gray-500 mb-6">
                  Role: <span className="text-black font-medium">{project.role}</span>
                </p>

                <Link
                  href={project.slug}
                  className="font-semibold hover:underline"
                >
                  View Project 
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

