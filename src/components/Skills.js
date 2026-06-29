import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHtml5, FaCss3Alt, FaNodeJs, FaReact, FaPython, FaGithub } from "react-icons/fa";
import { SiJavascript, SiFlask, SiMysql, SiExpress, SiMongodb } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "Node.js",    icon: <FaNodeJs color="#68a063" /> },
  { name: "Express.js", icon: <SiExpress color="#000000" /> },
  { name: "MongoDB",    icon: <SiMongodb color="#47A248" /> },
  { name: "HTML",       icon: <FaHtml5 color="#E34F26" /> },
  { name: "CSS",        icon: <FaCss3Alt color="#1572B6" /> },
  { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
  { name: "React",      icon: <FaReact color="#61DAFB" /> },
  { name: "Python",     icon: <FaPython color="#3776AB" /> },
  { name: "Flask",      icon: <SiFlask color="#000000" /> },
  { name: "MySQL",      icon: <SiMysql color="#4479A1" /> },
  { name: "GitHub",     icon: <FaGithub color="#181717" /> },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);

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
      gsap.from(marqueeRef.current, {
        opacity: 0, duration: 1, delay: 0.3,
        scrollTrigger: { trigger: marqueeRef.current, start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '80px 0', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="section-label section-label-skills">What I Know</p>
        <h2 className="section-title section-title-skills">Tech <span>Stack</span></h2>
      </div>

      <div 
        ref={marqueeRef}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '100%',
          position: 'relative'
        }}
      >
        <div className="marquee-content" style={{ display: 'flex', animation: 'scrollMarquee 20s linear infinite' }}>
          {/* Repeat multiple times for smooth infinite scroll */}
          {[...Array(3)].map((_, index) => (
            <div key={index} style={{ display: 'flex', gap: '40px', paddingRight: '40px' }}>
              {SKILLS.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                  <span>{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .marquee-content:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}