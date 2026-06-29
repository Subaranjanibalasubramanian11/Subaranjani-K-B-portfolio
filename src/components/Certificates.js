import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Certificates.css";

import hackerrank from "../assets/certificates/hackerrank1.jpeg";
import hplife1    from "../assets/certificates/hplife1.jpeg";
import hplife2    from "../assets/certificates/hplife2.jpeg";
import hplife3    from "../assets/certificates/hplife3.jpeg";
import guvi       from "../assets/certificates/guvi1.jpeg";
import google     from "../assets/certificates/googlestudyjam.jpeg";
import spoken     from "../assets/certificates/spokenrdbms.jpeg";
import datathon   from "../assets/certificates/datathon.jpeg";

gsap.registerPlugin(ScrollTrigger);

const CERTS = [
  { img: hackerrank, title: "HackerRank Certification",  issuer: "HackerRank", badge: "Problem Solving", dot: "#2dd4bf", cat: "tech"  },
  { img: hplife1,    title: "HP LIFE Certification 1",   issuer: "HP LIFE",    badge: "Business Skills", dot: "#3b82f6", cat: "hp"    },
  { img: hplife2,    title: "HP LIFE Certification 2",   issuer: "HP LIFE",    badge: "Business Skills", dot: "#3b82f6", cat: "hp"    },
  { img: hplife3,    title: "HP LIFE Certification 3",   issuer: "HP LIFE",    badge: "Business Skills", dot: "#3b82f6", cat: "hp"    },
  { img: guvi,       title: "GUVI Certification",        issuer: "GUVI",       badge: "Full Stack Dev",  dot: "#a78bfa", cat: "tech"  },
  { img: google,     title: "Google Study Jam",          issuer: "Google",     badge: "Cloud & Dev",     dot: "#f59e0b", cat: "event" },
  { img: spoken,     title: "Spoken Tutorial – RDBMS",  issuer: "IIT Bombay", badge: "Database",        dot: "#f43f5e", cat: "tech"  },
  { img: datathon,   title: "Datathon Participation",    issuer: "Event",      badge: "Data Science",    dot: "#ec4899", cat: "event" },
];

const FILTERS = [
  { label: "All",     key: "all"   },
  { label: "Tech",    key: "tech"  },
  { label: "HP LIFE", key: "hp"    },
  { label: "Events",  key: "event" },
];

export default function Certificates() {
  const [active,  setActive]  = useState("all");
  const [preview, setPreview] = useState(null);
  const sectionRef  = useRef(null);
  const cardsRef    = useRef([]);

  const visible = CERTS.filter(c => active === "all" || c.cat === active);

  /* GSAP stagger on scroll */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cert-heading", {
        opacity: 0, y: 30, duration: 0.6,
        scrollTrigger: { trigger: ".cert-heading", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Re-animate cards whenever filter changes */
  useEffect(() => {
    const els = cardsRef.current.filter(Boolean);
    gsap.fromTo(
      els,
      { opacity: 0, y: 24, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.45, ease: "power3.out" }
    );
  }, [active]);

  /* Lightbox GSAP enter */
  const lightboxRef = useRef(null);
  useEffect(() => {
    if (preview && lightboxRef.current) {
      gsap.fromTo(
        lightboxRef.current.querySelector(".ct-lightbox-inner"),
        { scale: 0.85, opacity: 0 },
        { scale: 1,    opacity: 1, duration: 0.4, ease: "back.out(1.4)" }
      );
    }
  }, [preview]);

  return (
    <section id="certificates" ref={sectionRef}>
      <div className="cert-heading">
        <p className="section-label">Achievements</p>
        <h2 className="section-title">My <span>Certificates</span></h2>
      </div>

      {/* Filter bar */}
      <div className="ct-filter-bar">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`ct-filter${active === f.key ? " active" : ""}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
            {f.key === "all" && <span className="ct-filter-count">{CERTS.length}</span>}
          </button>
        ))}
      </div>

      <p className="ct-count">
        <span>{visible.length}</span> certificate{visible.length !== 1 ? "s" : ""}
      </p>

      {/* Cards */}
      <div className="ct-grid">
        {visible.map((cert, i) => (
          <div
            key={`${active}-${i}`}
            ref={el => (cardsRef.current[i] = el)}
            className="ct-card"
            onClick={() => setPreview(cert)}
          >
            <div className="ct-img-wrap">
              <img src={cert.img} alt={cert.title} />
              <div className="ct-overlay">
                <div className="ct-view-btn">View</div>
              </div>
            </div>
            <div className="ct-body">
              <div className="ct-issuer-row">
                <div className="ct-dot" style={{ background: cert.dot }} />
                <span className="ct-issuer">{cert.issuer}</span>
              </div>
              <div className="ct-name">{cert.title}</div>
              <div className="ct-badge">{cert.badge}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {preview && (
        <div ref={lightboxRef} className="ct-lightbox" onClick={() => setPreview(null)}>
          <div className="ct-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="ct-lb-close" onClick={() => setPreview(null)}>✕</button>
            <img src={preview.img} alt={preview.title} />
            <div className="ct-lb-footer">
              <div className="ct-issuer-row">
                <div className="ct-dot" style={{ background: preview.dot }} />
                <span className="ct-issuer">{preview.issuer}</span>
              </div>
              <div className="ct-lb-title">{preview.title}</div>
              <div className="ct-badge">{preview.badge}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}