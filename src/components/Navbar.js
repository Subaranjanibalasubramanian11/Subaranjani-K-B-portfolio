import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FiHome, FiUser, FiBriefcase, FiCode, FiFolder, FiAward, FiMail } from "react-icons/fi";
import Dock from "./react-bits/Dock";
import Shuffle from "./react-bits/Shuffle";

const NAV_ITEMS = [
  { icon: <FiHome size={28} />, label: "Home", href: "#home", mobileIcon: <FiHome size={20} /> },
  { icon: <FiUser size={28} />, label: "About", href: "#about", mobileIcon: <FiUser size={20} /> },
  { icon: <FiBriefcase size={28} />, label: "Experience", href: "#experience", mobileIcon: <FiBriefcase size={20} /> },
  { icon: <FiCode size={28} />, label: "Skills", href: "#skills", mobileIcon: <FiCode size={20} /> },
  { icon: <FiFolder size={28} />, label: "Projects", href: "#projects", mobileIcon: <FiFolder size={20} /> },
  { icon: <FiAward size={28} />, label: "Certificates", href: "#certificates", mobileIcon: <FiAward size={20} /> },
  { icon: <FiMail size={28} />, label: "Contact", href: "#contact", mobileIcon: <FiMail size={20} /> },
];

export default function Navbar() {
  const navRef   = useRef(null);
  const logoRef  = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("#home");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Entrance animation ── */
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(logoRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 }, "-=0.3");
    });
    return () => ctx.revert();
  }, []);

  /* ── Scroll shrink ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section highlight ── */
  useEffect(() => {
    const sections = ["#home", "#about", "#experience", "#skills", "#projects", "#certificates", "#contact"].map(n => document.querySelector(n));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { threshold: 0.4 }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <nav ref={navRef} className={`navbar${scrolled ? " scrolled" : ""}`}>
        <a href="#home" ref={logoRef} className="nav-logo">
          <Shuffle
            text="Subaranjani KB"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
            loop={false}
            loopDelay={0}
            tag="span"
          />
        </a>

        {/* Dock navigation */}
        <div className="nav-dock-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
          <Dock 
            items={NAV_ITEMS.map(item => ({
              icon: windowWidth <= 768 ? item.mobileIcon : item.icon,
              label: item.label,
              href: item.href,
              onClick: () => setActive(item.href),
              className: active === item.href ? "active" : "",
            }))}
            panelHeight={windowWidth <= 768 ? 55 : 65}
            baseItemSize={windowWidth <= 768 ? 40 : 50}
            magnification={windowWidth <= 768 ? 60 : 80}
          />
        </div>
      </nav>
    </>
  );
}