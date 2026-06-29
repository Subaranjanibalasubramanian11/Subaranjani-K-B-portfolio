import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.05,
        ease: "none",
      });

      // Ring follows with smooth lag
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onEnterLink = () => {
      gsap.to(dot,  { scale: 2.5, opacity: 0.6, duration: 0.25 });
      gsap.to(ring, { scale: 1.8, borderColor: "rgba(99,102,241,0.8)", duration: 0.25 });
    };

    const onLeaveLink = () => {
      gsap.to(dot,  { scale: 1, opacity: 1, duration: 0.25 });
      gsap.to(ring, { scale: 1, borderColor: "rgba(99,102,241,0.5)", duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove);

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
