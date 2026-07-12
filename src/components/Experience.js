import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { ParticleCard, GlobalSpotlight } from './react-bits/MagicBento';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    title: "MERN Stack Intern",
    sub: "Sparkout Tech Solutions, Coimbatore",
    year: "Dec 2024 - Present",
    desc: "Working on MERN stack projects, building responsive frontends in React and securing backends with Node.js/Express and databases.",
    icon: <FaBriefcase color="#a855f7" size={20} />
  },
  {
    title: "Student Volunteer",
    sub: "Maatram Foundation",
    year: "Volunteer",
    desc: "Conducted 25+ physical verifications visiting homes of underprivileged students who completed 12th grade to verify backgrounds for educational aid.",
    icon: <IoIosPeople color="#a855f7" size={24} />
  },
  {
    title: "B.Sc. Information Technology",
    sub: "Sri Krishna Arts and Science College",
    year: "2024 - 2027",
    desc: "Pursuing major in Information Technology, focusing on web programming, database management systems, and core computer science fundamentals.",
    icon: <FaGraduationCap color="#a855f7" size={22} />
  }
];

export default function Experience() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bentoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-heading", {
        opacity: 0, y: 30, duration: 0.6,
        scrollTrigger: { trigger: ".exp-heading", start: "top 85%" }
      });

      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0, x: i % 2 === 0 ? -40 : 40, duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: "top 85%"
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} style={{ padding: '80px 20px' }}>
      <div className="exp-heading" style={{ textAlign: 'center', marginBottom: '50px' }}>
        <p className="section-label">My Journey</p>
        <h2 className="section-title">Work & <span>Education</span></h2>
      </div>

      <GlobalSpotlight gridRef={bentoRef} glowColor="168, 85, 247" />
      
      <div ref={bentoRef} className="bento-section" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* Central timeline line */}
        <div className="exp-timeline-line" style={{
          position: 'absolute',
          left: '31px',
          top: '10px',
          bottom: '10px',
          width: '2px',
          background: 'linear-gradient(180deg, var(--accent-1), var(--accent-2))'
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              ref={el => (cardsRef.current[i] = el)}
              style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', position: 'relative' }}
            >
              {/* Timeline circle icon */}
              <div className="exp-timeline-icon" style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '2px solid var(--accent-1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                zIndex: 1,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                {exp.icon}
              </div>

              {/* Card content */}
              <ParticleCard
                className="glass-card magic-bento-card magic-bento-card--border-glow"
                particleCount={12}
                glowColor="168, 85, 247"
                enableTilt={true}
                clickEffect={true}
                enableMagnetism={false}
                style={{ flexGrow: 1, padding: '24px', position: 'relative', overflow: 'hidden' }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent-2)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{exp.year}</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '6px', marginBottom: '4px', color: 'var(--text-primary)' }}>{exp.title}</h3>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--accent-1)', marginBottom: '12px' }}>{exp.sub}</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', position: 'relative', zIndex: 2 }}>{exp.desc}</p>
              </ParticleCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
