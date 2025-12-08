"use client";

import { motion } from "framer-motion";

const stats = [
  { count: "03", label: "Years of Experience" },
  { count: "40+", label: "Projects Completed" },
  { count: "25+", label: "Happy Clients" },
];

// Reusable animation
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.12,
    },
  }),
};

export default function AboutMe() {
  return (
    <section className="relative bg-white py-28 overflow-hidden">

      {/* Soft background tone */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto">

        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex items-center justify-between gap-2 border-b border-black pb-5 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-black">
            About Me
          </h2>
          <p className="text-lg font-mono text-gray-500">(01)</p>
        </motion.div>

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
            I am a Fullstack Developer with a Bachelor's degree in Computer Science,
            specializing in both mobile and web application development. With more than
            three years of professional experience, I have been actively involved in
            delivering reliable, scalable, and high-performance digital products.
            <br /><br />
            I approach every project with a strong focus on clean architecture,
            maintainable code, and long-term system sustainability. I believe that great
            software is not just about functionality, but also about how well it solves
            real-world problems efficiently and elegantly.
            <br /><br />
            Throughout my career, I have worked across multiple stages of development —
            from designing application flow, implementing backend services, integrating
            APIs, to deploying production-ready applications. This allows me to see
            products not just as features, but as complete systems built for real users.
          </motion.p>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 140 }}
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
