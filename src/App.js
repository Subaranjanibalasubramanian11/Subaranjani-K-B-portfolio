import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import { Plasma } from "./components/react-bits/Plasma";
import BlurText from "./components/react-bits/BlurText";
import SplashCursor from "./components/react-bits/SplashCursor";
import ResumePage from "./components/ResumePage";
import Footer from "./components/Footer";

function App() {
  const [showResume, setShowResume] = useState(false);
  const [introState, setIntroState] = useState('playing');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only show SplashCursor on devices with fine pointer (mouse/trackpad)
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <>
      {introState !== 'finished' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          backgroundColor: 'var(--bg-default, #0b0b0b)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: introState === 'fading' ? 0 : 1,
          transform: introState === 'fading' ? 'scale(1.15)' : 'scale(1)',
          transition: 'opacity 2s cubic-bezier(0.4, 0, 0.2, 1), transform 2s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: introState === 'fading' ? 'none' : 'auto'
        }}>
          <BlurText 
            text="Subaranjani KB"
            delay={50}
            animateBy="letters"
            direction="top"
            onAnimationComplete={() => {
              // Start fading out the whole overlay when the text finishes appearing
              setTimeout(() => {
                setIntroState('fading');
                // Remove from DOM after fade transition completes
                setTimeout(() => setIntroState('finished'), 1800);
              }, 1200); // give it a moment to be read clearly
            }}
            className="intro-text"
            style={{ 
              fontFamily: "'Caveat', cursive", 
              fontSize: 'clamp(32px, 9vw, 150px)', 
              fontWeight: 700,
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              flexWrap: 'nowrap',
              background: 'linear-gradient(135deg, #c084fc 0%, #a78bfa 50%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 25px rgba(168,85,247,0.5))',
              textAlign: 'center'
            }}
          />
        </div>
      )}

      {/* Plasma — full-page fixed background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', transform: 'translateZ(0)' }}>
        <Plasma 
          color="#a78bfa"
          speed={0.8}
          direction="forward"
          scale={1.5}
          opacity={0.35}
          mouseInteractive={false}
        />
      </div>

      {isDesktop && (
        <SplashCursor
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING={true}
          RAINBOW_MODE={false}
          COLOR="#7720ca"
        />
      )}

      {showResume ? (
        <ResumePage onClose={() => setShowResume(false)} />
      ) : (
        <>
          <Navbar onResumeClick={() => setShowResume(true)} />
          <main>
            <Home showResume={showResume} setShowResume={setShowResume} />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Certificates />
            <Contact />
          </main>
        </>
      )}

      <Footer />
    </>
  );
}

export default App;