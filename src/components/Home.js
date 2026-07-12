import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import ShinyText from "./react-bits/ShinyText";
import TextPressure from "./react-bits/TextPressure";
import ScrambledText from "./react-bits/ScrambledText";
import { HiSparkles } from "react-icons/hi";

/* Clean typewriter — types the text one char at a time, then waits */
function TypewriterText({ text, speed = 55 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '1.1em',
        background: 'var(--accent-3)',
        marginLeft: '3px',
        verticalAlign: 'middle',
        animation: 'blink 0.9s step-end infinite',
      }} />
    </span>
  );
}

export default function Home({ showResume, setShowResume }) {
  /* ── Typewriter ── */
  const roles = [
    "Aspiring Full Stack Developer",
    "MERN Stack Developer",
    "UI/UX Enthusiast",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % roles.length);
    }, 6000); // Change text every 6 seconds
    return () => clearInterval(interval);
  }, [roles.length]);

  /* ── Refs for animation ── */
  const badgeRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef     = useRef(null);
  const btnsRef     = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(badgeRef.current,    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.3")
      .fromTo(nameRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "+=0.1")
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.2")
      .fromTo(descRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .fromTo(btnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.2");
    return () => tl.kill();
  }, []);

  const resumeRef = useRef(null);
  useEffect(() => {
    if (showResume && resumeRef.current) {
      gsap.fromTo(resumeRef.current, { opacity: 0, y: 30, height: 0 }, { opacity: 1, y: 0, height: '75vh', minHeight: '500px', duration: 0.6, ease: "power3.out" });
      setTimeout(() => {
         window.scrollBy({ top: 300, behavior: 'smooth' });
      }, 100);
    }
  }, [showResume]);

  return (
    <>
      <section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 24px 60px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Badge */}
          <div ref={badgeRef} style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--accent-1, #b5b5b5)' }}>
            <HiSparkles size={20} />
            <ShinyText 
              text="Open to opportunities" 
              speed={2} 
              delay={0} 
              color="var(--text-secondary, #b5b5b5)" 
              shineColor="var(--accent-1, #ffffff)" 
              spread={120} 
              direction="left" 
            />
          </div>

          {/* Name */}
          <div 
            ref={nameRef} 
            style={{ width: '100%', height: 'clamp(60px, 15vw, 120px)', marginBottom: '24px', position: 'relative' }}
          >
            <TextPressure
              text="Subaranjani KB"
              fontFamily="Caveat"
              fontUrl="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap"
              textTransform="none"
              flex={true}
              alpha={false}
              stroke={false}
              width={false}
              weight={true}
              italic={false}
              textColor="var(--accent-1, #3cf3f3ff)"
              strokeColor="#ff0000"
              minFontSize={48}
            />
          </div>

          {/* Typewriter Roles */}
          <div ref={subtitleRef} style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(16px, 3.5vw, 22px)',
            fontWeight: 700,
            color: 'var(--accent-3)',
            minHeight: '34px',
            margin: '0 0 20px',
          }}>
            <TypewriterText key={index} text={roles[index]} />
          </div>

          {/* Description */}
          <div ref={descRef} style={{
            fontSize: 'clamp(14px, 2.5vw, 16px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.85,
            maxWidth: '600px',
            textAlign: 'justify',
            margin: '0 auto 36px',
            position: 'relative'
          }}>
            <ScrambledText
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            >
              I don't just build websites — I create experiences people love to use. Aspiring to become a skilled Full Stack Developer, I am passionate about building intuitive and user-friendly web applications. With hands-on experience at Sparkout Tech Solutions, I enjoy transforming ideas into impactful digital products. Driven by a love for coding and UI/UX design, I continuously learn, innovate, and strive to create solutions that leave a lasting impression.
            </ScrambledText>
          </div>

          <div ref={btnsRef} style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className="btn-primary"
              onClick={() => {
                 window.scrollTo(0, 0);
                 setShowResume(true);
              }}
              style={{ fontSize: 'clamp(14px, 2vw, 15px)', padding: '14px 36px' }}
            >
              View Resume
            </button>
          </div>

        </div>
      </section>
    </>
  );
}