import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from '../assets/profile/profile_1.jpeg';
import TiltedCard from './react-bits/TiltedCard';

gsap.registerPlugin(ScrollTrigger);



export default function About() {
  const sectionRef   = useRef(null);
  const headingRef   = useRef(null);
  const introRef     = useRef(null);
  const nameRoleRef  = useRef(null);
  const bioRef       = useRef(null);
  const tagsRef      = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading */
      gsap.from(headingRef.current, {
        opacity: 0, y: 30, duration: 0.7,
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });

      /* Intro card */
      gsap.from(introRef.current, {
        opacity: 0, y: 40, duration: 0.6,
        scrollTrigger: { trigger: introRef.current, start: "top 85%" },
      });

      /* Name and Role */
      gsap.from(nameRoleRef.current, {
        opacity: 0, y: 20, duration: 0.6, delay: 0.2,
        scrollTrigger: { trigger: introRef.current, start: "top 85%" },
      });

      /* Bio */
      gsap.from(bioRef.current, {
        opacity: 0, y: 30, duration: 0.6, delay: 0.4,
        scrollTrigger: { trigger: introRef.current, start: "top 85%" },
      });

      /* Tags */
      gsap.from(tagsRef.current, {
        opacity: 0, y: 20, duration: 0.6, delay: 0.6,
        scrollTrigger: { trigger: introRef.current, start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ padding: '80px 20px' }}>
      {/* Heading */}
      <div ref={headingRef} style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p className="section-label">Who I Am</p>
        <h2 className="section-title">About <span>Me</span></h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div ref={introRef} className="glass-card about-intro-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', padding: '40px', width: '100%' }}>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <TiltedCard
              imageSrc={profileImg}
              altText="K B Subaranjani"
              captionText="Subaranjani"
              containerHeight={window.innerWidth < 480 ? "180px" : "240px"}
              containerWidth={window.innerWidth < 480 ? "180px" : "240px"}
              imageHeight={window.innerWidth < 480 ? "180px" : "240px"}
              imageWidth={window.innerWidth < 480 ? "180px" : "240px"}
              rotateAmplitude={14}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={false}
            />
          </div>
          <div>
            <div ref={nameRoleRef}>
              <p className="about-name" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>K B Subaranjani</p>
              <p className="about-role" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Full Stack Developer</p>
            </div>
            
            <p ref={bioRef} className="about-bio" style={{ textAlign: 'justify', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Hi, I am K B Subaranjani. I love coding and continuously learning new technologies. I have a strong passion for UI/UX design. I enjoy the process of debugging—finding errors, fixing them, and seeing the final output is incredibly satisfying. Overcoming these small challenges is how I develop my skills. I have strong skills in the MERN stack, and my ultimate goal is to become a highly proficient Full Stack Developer.
            </p>
            
            <div ref={tagsRef} className="about-tags" style={{ justifyContent: 'center', marginTop: '20px' }}>
              <span>MERN Stack</span>
              <span>UI/UX</span>
              <span>Problem Solving</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}