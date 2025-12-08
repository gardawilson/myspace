"use client";

import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ContactBar = () => {
  const [contactBarData, setContactBarData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContactBarData(data?.contactBar);
      } catch (error) {
        console.error("Error fetching contact bar:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="relative py-14 bg-black border-t border-white/10 overflow-hidden">
      {/* background neon subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.12),transparent_70%)] blur-3xl"></div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">

        {/* ======================
            LEFT SIDE (Contact Items)
           ====================== */}
        <div className="flex flex-col sm:flex-row items-center gap-8 w-full lg:w-auto">
          {contactBarData?.contactItems?.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, x: 3 }}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 
                         border border-white/10 backdrop-blur-xl transition cursor-pointer relative overflow-hidden"
            >
              {/* glitch highlight */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 10 }}
                className="p-2 rounded-lg bg-white/10"
              >
                <Image
                  src={getImgPath(item?.icon)}
                  alt={item?.type}
                  width={26}
                  height={26}
                />
              </motion.div>

              {/* label */}
              <div className="text-white/90 text-sm lg:text-base font-medium">
                {item?.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ======================
            RIGHT SIDE (Social Icons)
           ====================== */}
        <div className="flex items-center gap-4">
          {contactBarData?.socialItems?.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <Link
                href={item?.href || "#"}
                className="relative p-3 rounded-xl bg-white/5 border border-white/10
                           hover:bg-white/10 backdrop-blur-xl group transition block"
              >
                {/* glowing ring on hover */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r 
                        from-blue-500/0 via-blue-500/20 to-purple-500/0 opacity-0
                        group-hover:opacity-100 blur-md transition"></span>

                {/* icon */}
                <motion.div
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="relative z-10"
                >
                  <Image
                    src={getImgPath(item?.icon)}
                    alt={item?.platform}
                    width={28}
                    height={28}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>

      {/* bottom glow gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default ContactBar;
