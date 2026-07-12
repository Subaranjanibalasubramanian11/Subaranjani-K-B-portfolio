import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

import './ScrambledText.css';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const ScrambledText = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef(null);
  const charsRef = useRef([]);
  const charCache = useRef([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const split = SplitText.create(rootRef.current.querySelector('p'), {
      type: 'words,chars',
      charsClass: 'char',
      wordsClass: 'word'
    });
    charsRef.current = split.chars;

    charsRef.current.forEach(c => {
      gsap.set(c, {
        display: 'inline-block',
        attr: { 'data-content': c.innerHTML }
      });
    });

    const updateCache = () => {
      if (!rootRef.current) return;
      const rootRect = rootRef.current.getBoundingClientRect();
      charCache.current = charsRef.current.map(c => {
        const rect = c.getBoundingClientRect();
        return {
          relX: rect.left - rootRect.left,
          relY: rect.top - rootRect.top,
          width: rect.width,
          height: rect.height
        };
      });
    };

    // Allow layout to settle, then cache positions
    const timeoutId = setTimeout(updateCache, 100);
    window.addEventListener('resize', updateCache);

    const handleMove = (e) => {
      if (!rootRef.current || charCache.current.length === 0) return;
      
      // Calculate cursor position relative to the characters efficiently
      // by doing ONLY ONE getBoundingClientRect instead of one per character.
      const rootRect = rootRef.current.getBoundingClientRect();
      
      charsRef.current.forEach((c, i) => {
        const cache = charCache.current[i];
        if (!cache) return;
        
        const charCenterX = rootRect.left + cache.relX + cache.width / 2;
        const charCenterY = rootRect.top + cache.relY + cache.height / 2;
        
        const dx = e.clientX - charCenterX;
        const dy = e.clientY - charCenterY;
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || '',
              chars: scrambleChars,
              speed
            },
            ease: 'none'
          });
        }
      });
    };

    // eslint-disable-next-line no-unused-vars
    const el = rootRef.current;
    // Using window allows tracking mouse even if it moves quickly outside the element
    window.addEventListener('pointermove', handleMove);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateCache);
      window.removeEventListener('pointermove', handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`scrambled-text-wrapper ${className}`} style={style}>
      <p style={{ margin: 0 }}>{children}</p>
    </div>
  );
};

export default ScrambledText;
