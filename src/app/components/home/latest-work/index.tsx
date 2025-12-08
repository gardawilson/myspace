"use client";

import { motion, type Variants } from "framer-motion";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ===========================
   ANIMATION
=========================== */
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },

  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: EASE_OUT,
    },
  }),
};

const LatestWork = () => {
  const [workData, setWorkData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/work-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setWorkData(data?.workData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="relative bg-white py-28 overflow-hidden">
      {/* Soft background tone */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex items-center justify-between gap-2 border-b border-black pb-5 mb-20"
        >
          <h2 className="text-3xl font-bold tracking-tight text-black">
            Latest Works
          </h2>
          <p className="text-lg font-mono text-gray-500">(04)</p>
        </motion.div>

        {/* WORK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {workData?.map((value: any, index: number) => {
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <Image
                    src={getImgPath(value?.image)}
                    alt={value?.title}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* DARK HOVER OVERLAY */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Link
                      href={`${value.slug}`}
                      className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:scale-110 transition"
                    >
                      <Image
                        src={getImgPath(
                          "/images/icon/right-arrow-icon.svg"
                        )}
                        alt="open"
                        width={32}
                        height={32}
                      />
                    </Link>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="relative p-6 flex flex-col gap-2">
                  {/* Watermark */}
                  <div className="absolute -right-4 -bottom-4 opacity-[0.05] pointer-events-none">
                    <Image
                      src={getImgPath("/images/icon/work.svg")}
                      alt="watermark"
                      width={140}
                      height={140}
                    />
                  </div>

                  <Link href={`${value.slug}`}>
                    <h3 className="text-xl font-bold text-black hover:underline">
                      {value?.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-500">
                    Client: <span className="text-black">{value?.client}</span>
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm font-mono text-gray-400">
                    View Project →
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestWork;
