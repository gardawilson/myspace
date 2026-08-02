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
    fetch("https://formsubmit.co/ajax/gardawilson@gmail.com", {
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

  const email = contactData?.contactInfo?.find((i: any) => i.type === "email");
  const phone = contactData?.contactInfo?.find((i: any) => i.type === "phone");

  return (
    <section className="relative bg-black py-24 md:py-28">
      <div className="container relative z-10 mx-auto px-4">
        {/* ================= CTA BAND ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16 flex flex-col gap-8 border-b border-white/15 pb-16"
        >
          <p className="font-mono text-sm text-white/50">
            That&apos;s all for now.
          </p>

          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <h2 className="text-4xl font-medium leading-tight text-white md:text-6xl">
              Got a project in mind?
              <br />
              Let&apos;s talk
            </h2>

            <a
              href="#contact-form"
              className="flex size-[140px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-center text-lg font-medium text-white transition hover:bg-blue-500"
            >
              Get in touch
            </a>
          </div>

          <div className="flex flex-wrap gap-x-14 gap-y-4 pt-4">
            {email && (
              <div>
                <p className="mb-1 text-sm text-white/40">Email:</p>
                <a href={email.link} className="text-xl text-white hover:underline">
                  {email.label}
                </a>
              </div>
            )}
            {phone && (
              <div>
                <p className="mb-1 text-sm text-white/40">Phone</p>
                <a href={phone.link} className="text-xl text-white hover:underline">
                  {phone.label}
                </a>
              </div>
            )}
          </div>
        </motion.div>

        <div
          id="contact-form"
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2"
        >
          {/* ================= FORM CARD ================= */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm transition-shadow hover:shadow-xl"
          >
            {/* Watermark */}
            <div className="pointer-events-none absolute -bottom-6 -right-6 opacity-[0.08] invert">
              <Image
                src={getImgPath("/images/icon/mail.svg")}
                alt="contact"
                width={200}
                height={200}
              />
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium text-white/80">
                    Name *
                  </label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-white/30 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-white/80"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-white/80">
                    Phone *
                  </label>
                  <input
                    required
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    className="w-full border-b border-white/30 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-white/80"
                    placeholder="Your Phone"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium text-white/80">
                  Email *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-white/30 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-white/80"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-white/80">
                  Message *
                </label>
                <textarea
                  required
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border-b border-white/30 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-white/80"
                  placeholder="Your Message"
                />
              </div>

              {submitted && (
                <div className="flex items-center gap-2 text-white/80">
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
                className="rounded-full border border-white px-8 py-3 font-medium text-white transition hover:bg-white hover:text-black"
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
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {contactData?.contactInfo?.map((info: any, i: number) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <p className="mb-1 text-sm text-white/40">{info.title}</p>
                <a
                  href={info.link}
                  className="text-lg font-semibold text-white hover:underline"
                >
                  {info.label}
                </a>
              </div>
            ))}

            {contactData?.socialLinks?.map((link: any, i: number) => (
              <div
                key={i}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-xl"
              >
                <p className="mb-1 text-sm text-white/40">Social</p>
                <Link href={link.href || "#"} className="text-lg font-semibold text-white">
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
