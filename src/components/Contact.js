import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHeart, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef  = useRef(null);
  const formRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-heading", {
        opacity: 0, y: 30, duration: 0.6,
        scrollTrigger: { trigger: ".contact-heading", start: "top 85%" },
      });

      gsap.from(".contact-intro", {
        opacity: 0, y: 20, duration: 0.5, delay: 0.15,
        scrollTrigger: { trigger: ".contact-intro", start: "top 88%" },
      });

      gsap.from(formRef.current, {
        opacity: 0, y: 30, duration: 0.6, delay: 0.3,
        scrollTrigger: { trigger: formRef.current, start: "top 85%" },
      });

      gsap.from(".contact-box", {
        opacity: 0, y: 20, duration: 0.5, delay: 0.4,
        scrollTrigger: { trigger: ".contact-box", start: "top 90%" },
      });

      gsap.from(".contact-footer", {
        opacity: 0, y: 16, duration: 0.5,
        scrollTrigger: { trigger: ".contact-footer", start: "top 95%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="contact-section" style={{ padding: '80px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="contact-heading" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p className="section-label">Let's Connect</p>
        <h2 className="section-title">Get in <span>Touch</span></h2>
      </div>

      <p className="contact-intro" style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '600px', color: 'var(--text-secondary)' }}>
        I'm always open to discussing web development work or partnership opportunities. Fill out the form below and I'll get back to you!
      </p>

      <div ref={formRef} className="glass-card contact-form-card" style={{ width: '100%', maxWidth: '500px', padding: '30px', borderRadius: 'var(--radius-lg)' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>Send a Message</h3>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={(e) => e.preventDefault()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Name</label>
            <input type="text" placeholder="Your Name" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
            <input type="email" placeholder="Your Email" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Enquiry Type</label>
            <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-primary)', outline: 'none' }}>
              <option>General Enquiries</option>
              <option>Project Collaboration</option>
              <option>Job Opportunity</option>
            </select>
          </div>
          <button className="btn-primary" style={{ marginTop: '10px', width: '100%', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Send Message
          </button>
        </form>
        
        <div style={{ marginTop: '25px', textAlign: 'center', paddingTop: '15px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Or get in touch directly via email:</p>
          <a href="mailto:subaranjani1111@gmail.com" style={{ color: 'var(--accent-1)', fontWeight: 'bold', textDecoration: 'none' }}>
            subaranjani1111@gmail.com
          </a>
        </div>
      </div>

      {/* Social links box */}
      <div className="contact-box" style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', width: '100%', maxWidth: '500px' }}>
        <a href="https://github.com/Subaranjanibalasubramanian11" target="_blank" rel="noreferrer" className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
          <FaGithub /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/subaranjani-balasubramanian-7a6b9930a" target="_blank" rel="noreferrer" className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
          <FaLinkedin /> LinkedIn
        </a>
        <a href="https://leetcode.com/u/Subaranjani_K_B/" target="_blank" rel="noreferrer" className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
          <SiLeetcode /> LeetCode
        </a>
      </div>

      <div className="contact-footer" style={{ marginTop: '60px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Made with <FaHeart color="#ef4444" style={{ display: 'inline-block', transform: 'translateY(2px)' }} /> by <span>Subaranjani K B</span> · 2026
      </div>
    </section>
  );
}