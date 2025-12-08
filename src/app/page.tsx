import AboutMe from "./components/home/about-me";
import Contact from "./components/home/contact";
import EducationSkills from "./components/home/education-skills";
import ExperienceSec from "./components/home/experience-sec";
import HeroSection from "./components/home/hero-section";
import LatestWork from "./components/home/latest-work";

const page = () => {
  return (
    <main>
      {/* HOME */}
      <section id="home">
        <HeroSection />
      </section>

      {/* ABOUT (opsional, tidak ada di navbar tapi tetap boleh) */}
      <section id="about">
        <AboutMe />
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <ExperienceSec />
      </section>

      {/* SKILLS */}
      <section id="skills">
        <EducationSkills />
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <LatestWork />
      </section>

      {/* CONTACT */}
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
};

export default page;
