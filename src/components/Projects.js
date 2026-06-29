import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub } from "react-icons/fa";

// Resume Images
import r1 from "../assets/certificates/resume1.jpg";
import r2 from "../assets/certificates/resume2.jpg";
import r3 from "../assets/certificates/resume3.jpg";
import r4 from "../assets/certificates/resume4.jpg";
import r5 from "../assets/certificates/resume5.jpg";

// Library Images
import l1 from "../assets/certificates/library1.jpg";
import l2 from "../assets/certificates/library2.jpg";
import l3 from "../assets/certificates/library3.jpg";
import l4 from "../assets/certificates/library4.jpg";
import l5 from "../assets/certificates/library5.jpg";
import l6 from "../assets/certificates/library6.jpg";

// GUVI Images
import g2 from "../assets/certificates/guvi2.jpeg";
import g3 from "../assets/certificates/guvi3.jpeg";
import g4 from "../assets/certificates/guvi4.jpeg";

// Bootcamp Images
import b1 from "../assets/certificates/day1.jpeg";
import b2 from "../assets/certificates/day2.jpeg";
import b3 from "../assets/certificates/login.png";
import b4 from "../assets/certificates/updateuser.png";
import b5 from "../assets/certificates/console.png";
import b6 from "../assets/certificates/day4.png";
import b7 from "../assets/certificates/update.png";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "AI Resume Analyzer",
    tag: "Python · Flask · HTML · CSS",
    desc: "Built a web application to analyze resumes and provide improvement suggestions. Designed an intuitive interface for resume upload and result visualization.",
    features: ["Resume upload system", "AI-based analysis engine", "Improvement suggestions", "Clean UI for result display"],
    images: [r1, r2, r3, r4, r5],
    github: "https://github.com/Subaranjanibalasubramanian11/resume-analyzer",
  },
  {
    title: "E-Library Management System",
    tag: "Python · Flask · HTML · CSS",
    desc: "Developed a digital library platform with book management and user authentication. Integrated a chatbot feature to enhance user experience.",
    features: ["User login & signup", "Upload and view books", "Chatbot support", "Responsive UI design"],
    images: [l1, l2, l3, l4, l5, l6],
    github: "https://github.com/Subaranjanibalasubramanian11/E_library_management",
  },
  {
    title: "AI Interview Simulator",
    tag: "MongoDB · Express.js · React.js · Node.js · OpenAI API",
    desc: "Developed an AI-powered platform for HR and technical interview practice. Implemented JWT-based authentication and voice/text answer input.",
    features: ["AI-powered interview practice", "HR and technical rounds", "Voice/text answer input", "JWT-based authentication"],
    images: [b1, b2, b3, b4, b5, b6, b7],
    github: "https://github.com/Subaranjanibalasubramanian11/ai-interview-simulator",
  },
  {
    title: "Guvi Auth System",
    tag: "HTML · CSS · JS · MongoDB · Redis · MySQL",
    desc: "Developed user registration, login, and profile management system. Implemented secure authentication with MySQL integration and designed responsive UI.",
    features: ["User registration & login", "Database integration (MySQL)", "Secure authentication", "Responsive frontend"],
    images: [g2, g3, g4],
    github: "https://github.com/Subaranjanibalasubramanian11/internship-project",
  },
];

export default function Projects() {
  const [selected,   setSelected]   = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const sectionRef  = useRef(null);
  const cardsRef    = useRef([]);
  const detailRef   = useRef(null);

  /* Slide-in cards on scroll */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-heading", {
        opacity: 0, y: 30, duration: 0.6,
        scrollTrigger: { trigger: ".proj-heading", start: "top 85%" },
      });

      cardsRef.current.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Auto-advance image slider */
  useEffect(() => {
    if (!selected) return;
    const id = setInterval(() => {
      setCurrentImg(p => (p + 1) % selected.images.length);
    }, 2200);
    return () => clearInterval(id);
  }, [selected]);

  /* Animate detail panel in */
  const openProject = (proj) => {
    setSelected(proj);
    setCurrentImg(0);
    setTimeout(() => {
      if (detailRef.current) {
        gsap.fromTo(
          detailRef.current,
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
        );
        detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 10);
  };

  const closeProject = () => {
    if (detailRef.current) {
      gsap.to(detailRef.current, {
        opacity: 0, y: 20, duration: 0.3, ease: "power2.in",
        onComplete: () => setSelected(null),
      });
    } else {
      setSelected(null);
    }
  };

  return (
    <section id="projects" ref={sectionRef}>
      <div className="proj-heading">
        <p className="section-label">What I've Built</p>
        <h2 className="section-title">My <span>Projects</span></h2>
      </div>

      <div className="project-grid">
        {PROJECTS.map((proj, i) => (
          <div
            key={i}
            ref={el => (cardsRef.current[i] = el)}
            className={`project-card${selected?.title === proj.title ? " active" : ""}`}
            onClick={() => openProject(proj)}
          >
            {proj.badge && <span className="proj-badge">{proj.badge}</span>}
            <p className="proj-num">0{i + 1}</p>
            <h3 className="proj-title">{proj.title}</h3>
            <p className="proj-tag">{proj.tag}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <p className="proj-hint" style={{ margin: 0 }}>
                Click to view details <span className="proj-hint-arrow">↗</span>
              </p>
              <a 
                href={proj.github} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary" 
                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={16} style={{ marginRight: '6px' }} /> Repository
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="project-details" ref={detailRef}>
          <div className="proj-detail-header">
            <div>
              <h3 className="proj-detail-title">{selected.title}</h3>
              <span className="proj-detail-tag">{selected.tag}</span>
            </div>
            <button className="proj-close" onClick={closeProject}>✕ Close</button>
          </div>

          <div className="proj-detail-body">
            <div className="proj-detail-left">
              <p className="proj-sub">About</p>
              <p className="proj-desc">{selected.desc}</p>

              <p className="proj-sub">Features</p>
              <div className="proj-features">
                {selected.features.map((f, i) => (
                  <div className="proj-feature-item" key={i}>
                    <span className="feat-dot" /> {f}
                  </div>
                ))}
              </div>

              <a
                href={selected.github}
                target="_blank"
                rel="noreferrer"
                className="proj-github-btn"
              >
                <FaGithub size={16} style={{ marginRight: '6px' }} /> Repository
              </a>
            </div>

            <div className="proj-detail-right">
              <p className="proj-sub">Screenshots</p>
              <div className="slider">
                <div className="slider-dots">
                  {selected.images.map((_, i) => (
                    <span
                      key={i}
                      className={`dot${i === currentImg ? " dot-active" : ""}`}
                      onClick={() => setCurrentImg(i)}
                    />
                  ))}
                </div>
                <img
                  src={selected.images[currentImg]}
                  alt="project screenshot"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}