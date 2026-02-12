"use client";

import { motion, type Variants } from "framer-motion";

const stats = [
  { count: "2+", label: "Years of Experience" },
  { count: "5+", label: "Projects Delivered" },
  { count: "3+", label: "Production Systems Built" },
];


// ✅ FIXED: Ubah ease string jadi array atau gunakan 'as any'
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1], // ✅ Cubic-bezier array (easeOut)
    } as any,
  },
};

export default function AboutMe() {
  return (
    <section className="relative bg-white py-28 overflow-hidden">

      {/* Soft background tone */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto">

        {/* HEADER - ✅ Hapus motion.div yang bermasalah */}
        <div className="flex items-center justify-between gap-2 border-b border-black pb-5 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-black">
            About Me
          </h2>
          <p className="text-lg font-mono text-gray-500">(01)</p>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-4xl space-y-16">

          {/* MAIN NARRATIVE */}
<motion.p
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="text-gray-700 leading-relaxed text-base md:text-lg"
>
  I am a Full-Stack Mobile Developer focused on building scalable,
  production-grade applications that power real business operations.
  With professional experience across both enterprise systems and
  high-usage internal platforms, I specialize in delivering reliable
  end-to-end solutions — from backend architecture to mobile deployment.

  <br /><br />

  I have architected and developed microservice-driven backends using
  Node.js and C#, engineered high-performance database structures in
  Microsoft SQL Server, and led mobile application development with
  Flutter for multi-platform environments. My work has contributed to
  the successful digitalization of operational workflows, improving
  efficiency, system reliability, and data integrity.

  <br /><br />

  I operate with a strong engineering mindset centered on clean
  architecture, performance optimization, and long-term maintainability.
  Rather than simply shipping features, I focus on building systems that
  scale, remain resilient under load, and create measurable value for
  organizations.

  <br /><br />

  Currently, I am expanding my expertise in distributed systems and
  modern backend architecture while continuing to craft seamless mobile
  experiences.
</motion.p>


          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 140,
                  delay: i * 0.12 // ✅ Pindahkan delay ke sini
                } as any}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-black">
                  {item.count}
                </h3>
                <p className="text-gray-500 text-sm md:text-base mt-1">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}