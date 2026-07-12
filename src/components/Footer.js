import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import confetti from 'canvas-confetti';

export default function Footer() {
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(false);

  const handleHeartClick = (e) => {
    setLiked(!liked);
    if (!liked) {
      setBurst(true);
      setTimeout(() => setBurst(false), 400);
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x, y },
        colors: ['#7c3aed', '#c084fc', '#f472b6', '#ffffff'],
        disableForReducedMotion: true,
        zIndex: 9999
      });
    }
  };

  return (
    <footer style={{
      textAlign: 'center',
      padding: '40px 20px',
      color: 'var(--text-secondary, #a1a1aa)',
      fontSize: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: 'auto',
      position: 'relative',
      zIndex: 10
    }}>
      <style>{`
        @keyframes heartBurst {
          0% { transform: scale(1); }
          40% { transform: scale(1.6); filter: drop-shadow(0 0 12px rgba(124,58,237,0.9)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(124,58,237,0.5)); }
        }
        @keyframes wrapperBurst {
          0% { box-shadow: 0 0 0 0 rgba(124,58,237,0.8); opacity: 1; }
          100% { box-shadow: 0 0 0 25px rgba(124,58,237,0); opacity: 0; }
        }
        .footer-heart {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, filter 0.2s ease;
          position: relative;
        }
        .footer-heart::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
        }
        .footer-heart.bursting {
          animation: heartBurst 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .footer-heart.bursting::after {
          animation: wrapperBurst 0.6s ease-out forwards;
        }
        .footer-name {
          cursor: pointer;
          font-weight: 800;
          font-family: var(--font-head);
          color: var(--text-primary);
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }
        .footer-name:hover {
          color: var(--accent-1);
          text-shadow: 0 0 12px rgba(124,58,237,0.4);
        }
      `}</style>
      
      Crafted with 
      <span 
        onClick={handleHeartClick} 
        className={`footer-heart ${burst ? 'bursting' : ''}`}
      >
        {liked ? (
          <FaHeart style={{ color: '#7c3aed', filter: 'drop-shadow(0 0 6px rgba(124,58,237,0.5))', overflow: 'visible' }} />
        ) : (
          <FaRegHeart style={{ color: 'inherit', overflow: 'visible' }} />
        )}
      </span>
      <span 
        className="footer-name"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Subaranjani KB
      </span>
    </footer>
  );
}
