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
    <section id="projects" className="relative bg-white py-28">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="mb-16 flex items-center justify-between border-b border-black pb-5">
          <h2 className="text-3xl font-bold tracking-tight">
            Impressive Works
          </h2>
          <p className="font-mono text-lg text-gray-500">(04)</p>
        </div>

        {/* SUBTEXT */}
        <p className="mb-14 max-w-2xl text-gray-600">
          A selection of production systems and applications I have engineered,
          focusing on scalability, reliability, and real-world business impact.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 } as any}
            >
              <Link href={project.slug} className="group flex flex-col gap-7">
                {/* IMAGE */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[32px] bg-gray-100">
                  <Image
                    src={getImgPath(project.image)}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* TITLE */}
                <div className="flex items-center gap-3">
                  <span className="flex size-[52px] shrink-0 rotate-45 items-center justify-center rounded-full border border-black/20 transition-transform group-hover:rotate-0">
                    <span className="text-xl -rotate-45 transition-transform group-hover:rotate-0">
                      &#8594;
                    </span>
                  </span>
                  <p className="text-2xl font-medium md:text-3xl">
                    {project.title}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

