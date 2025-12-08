import Logo from "../logo";
import { FaLinkedin, FaDribbble, FaBehance, FaGithub } from "react-icons/fa";

const socialLinks = [
  { href: "https://linkedin.com/", icon: <FaLinkedin />, label: "LinkedIn" },
  { href: "https://dribbble.com/", icon: <FaDribbble />, label: "Dribbble" },
  { href: "https://behance.net/", icon: <FaBehance />, label: "Behance" },
  { href: "https://github.com/", icon: <FaGithub />, label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-50 border-t border-gray-200">
      
      {/* Decorative Blur */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-black/5 blur-[120px]" />

      <div className="relative container mx-auto px-6 py-14 flex flex-col items-center">

        {/* LOGO */}
        <div className="mb-6 flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-xl rounded-full shadow-xl p-4 hover:scale-105 transition-transform duration-300">
            <Logo />
          </div>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-6 mb-10">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="group relative w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Glow */}
              <span className="absolute inset-0 rounded-full bg-black opacity-0 blur-md group-hover:opacity-10 transition" />
              
              <span className="relative text-xl group-hover:text-black transition">
                {item.icon}
              </span>
            </a>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="w-full max-w-4xl border-t border-gray-200 mb-6" />

        {/* COPYRIGHT */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm sm:text-base text-gray-600 font-medium text-center">
          <span>
            &copy; {new Date().getFullYear()} Garda Wilson — Fullstack & Mobile Developer
          </span>

          <span className="hidden sm:inline">•</span>

          <span>
            Crafted with{" "}
            <span className="inline-block text-black animate-pulse">❤</span>{" "}
            using Next.js & Tailwind CSS
          </span>
        </div>

      </div>
    </footer>
  );
}
