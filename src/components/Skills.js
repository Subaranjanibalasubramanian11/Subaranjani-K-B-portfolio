import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHtml5, FaCss3Alt, FaNodeJs, FaReact, FaPython, FaGithub, FaDocker, FaBolt, FaSyncAlt } from "react-icons/fa";
import { SiJavascript, SiFlask, SiMysql, SiExpress, SiMongodb, SiTypescript, SiTailwindcss, SiPostman, SiTensorflow, SiPytorch } from "react-icons/si";
import LogoLoop from "./react-bits/LogoLoop";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "Node.js",    icon: <FaNodeJs color="#68a063" /> },
  { name: "Express.js", icon: <SiExpress color="#ffffff" /> },
  { name: "MongoDB",    icon: <SiMongodb color="#47A248" /> },
  { name: "HTML",       icon: <FaHtml5 color="#E34F26" /> },
  { name: "CSS",        icon: <FaCss3Alt color="#1572B6" /> },
  { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
  { name: "React",      icon: <FaReact color="#61DAFB" /> },
  { name: "Python",     icon: <FaPython color="#3776AB" /> },
  { name: "Flask",      icon: <SiFlask color="#ffffff" /> },
  { name: "MySQL",      icon: <SiMysql color="#4479A1" /> },
  { name: "GitHub",     icon: <FaGithub color="#ffffff" /> },
  { name: "Docker",     icon: <FaDocker color="#2496ED" /> },
  { name: "Machine Learning", icon: <SiTensorflow color="#FF6F00" /> },
  { name: "LSTM",       icon: <SiPytorch color="#EE4C2C" /> },
  { name: "Performance", icon: <FaBolt color="#FFD700" /> },
  { name: "CI/CD",      icon: <FaSyncAlt color="#32CD32" /> },
  { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" /> },
  { name: "Postman",    icon: <SiPostman color="#FF6C37" /> },

];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-label-skills", {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: ".section-label-skills", start: "top 85%" },
      });
      gsap.from(".section-title-skills", {
        opacity: 0, y: 20, duration: 0.6, delay: 0.1,
        scrollTrigger: { trigger: ".section-label-skills", start: "top 85%" },
      });
      gsap.from(".skills-loop-container", {
        opacity: 0, duration: 1, delay: 0.3,
        scrollTrigger: { trigger: ".skills-loop-container", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const row1 = SKILLS.slice(0, Math.ceil(SKILLS.length / 2));
  const row2 = SKILLS.slice(Math.ceil(SKILLS.length / 2));

  const techLogos1 = row1.map(skill => ({
    node: (
      <div className="skill-icon-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', transition: 'transform 0.3s' }}>
        {skill.icon}
      </div>
    ),
    title: skill.name,
  }));

  const techLogos2 = row2.map(skill => ({
    node: (
      <div className="skill-icon-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', transition: 'transform 0.3s' }}>
        {skill.icon}
      </div>
    ),
    title: skill.name,
  }));

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '80px 0', maxWidth: '100%', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px', maxWidth: '1200px', margin: '0 auto 40px' }}>
        <p className="section-label section-label-skills">What I Know</p>
        <h2 className="section-title section-title-skills">Tech <span>Stack</span></h2>
      </div>

      <div 
        className="skills-loop-container"
        style={{
          width: '100vw',
          position: 'relative',
          padding: '10px 0',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        <LogoLoop
          logos={techLogos1}
          speed={110}
          direction="left"
          logoHeight={70}
          gap={80}
          pauseOnHover={false}
          scaleOnHover={true}
          fadeOut={false}
          ariaLabel="Tech Stack Row 1"
        />
        <LogoLoop
          logos={techLogos2}
          speed={110}
          direction="right"
          logoHeight={70}
          gap={80}
          pauseOnHover={false}
          scaleOnHover={true}
          fadeOut={false}
          ariaLabel="Tech Stack Row 2"
        />
      </div>
    </section>
  );
}