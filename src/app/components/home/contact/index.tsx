"use client";

import { motion, Variants } from "framer-motion";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ===========================
   ANIMATION (TS SAFE ✅)
=========================== */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1], // ✅ pengganti easeOut yang valid untuk TS
    },
  }),
};

const Contact = () => {
  const [contactData, setContactData] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        const data = await res.json();
        setContactData(data?.contactLinks);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const reset = () =>
    setFormData({ name: "", number: "", email: "", message: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    fetch("https://formsubmit.co/ajax/bhainirav772@gmail.com", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmitted(data.success);
        reset();
      })
      .catch(console.error);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
            Contact
          </h2>
          <p className="text-lg font-mono text-gray-500">(05)</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* ================= FORM CARD ================= */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-shadow p-10 overflow-hidden"
          >
            {/* Watermark */}
            <div className="absolute -right-6 -bottom-6 opacity-[0.08] pointer-events-none">
              <Image
                src={getImgPath("/images/icon/mail.svg")}
                alt="contact"
                width={200}
                height={200}
              />
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium text-black/80">
                    Name *
                  </label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-black/30 focus:border-black/80 outline-none py-2 bg-transparent"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-black/80">
                    Phone *
                  </label>
                  <input
                    required
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    className="w-full border-b border-black/30 focus:border-black/80 outline-none py-2 bg-transparent"
                    placeholder="Your Phone"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-black/80">
                  Email *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-black/30 focus:border-black/80 outline-none py-2 bg-transparent"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-black/80">
                  Message *
                </label>
                <textarea
                  required
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border-b border-black/30 focus:border-black/80 outline-none py-2 bg-transparent"
                  placeholder="Your Message"
                />
              </div>

              {submitted && (
                <div className="flex items-center gap-2 text-black/80">
                  <Image
                    src={getImgPath("/images/icon/success-icon.svg")}
                    alt="success"
                    width={24}
                    height={24}
                  />
                  <p>Email successfully sent.</p>
                </div>
              )}

              <button
                type="submit"
                className="px-8 py-3 rounded-full border border-black text-black font-medium hover:bg-black hover:text-white transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* ================= CONTACT INFO CARDS ================= */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {contactData?.contactInfo?.map((info: any, i: number) => (
              <div
                key={i}
                className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden"
              >
                <p className="text-sm text-gray-400 mb-1">{info.title}</p>
                <Link
                  href="#!"
                  className="text-lg font-semibold text-black hover:underline"
                >
                  {info.label}
                </Link>
              </div>
            ))}

            {contactData?.socialLinks?.map((link: any, i: number) => (
              <div
                key={i}
                className="relative bg-gradient-to-br from-gray-900 to-black text-white border border-gray-800 rounded-2xl shadow-xl p-6"
              >
                <p className="text-sm text-white/60 mb-1">Social</p>
                <Link href="#!" className="text-lg font-semibold">
                  {link.title}
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
