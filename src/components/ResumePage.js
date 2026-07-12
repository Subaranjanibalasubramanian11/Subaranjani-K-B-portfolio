import { FaExpand, FaExternalLinkAlt, FaDownload, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ResumePage({ onClose }) {
  const [containerWidth, setContainerWidth] = useState(850);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (containerRef.current) {
      const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', width: '100%', padding: '40px 6%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', flexWrap: 'wrap', gap: '16px' }}>
        <button 
          onClick={onClose} 
          className="btn-outline" 
          style={{ padding: '10px 16px', fontSize: '14px', border: 'none', background: 'transparent', boxShadow: 'none', whiteSpace: 'nowrap' }}
        >
          <FaArrowLeft /> Back to Portfolio
        </button>
        <a 
          href="/resume.pdf" 
          download 
          className="btn-primary" 
          style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '100px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'none', whiteSpace: 'nowrap' }}
        >
          Download Resume
        </a>
      </div>
      
      {/* Title Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '56px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0', lineHeight: 1 }}>
            Resume
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', margin: 0 }}>
            View or download my resume
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => {
              if (containerRef.current && containerRef.current.requestFullscreen) {
                containerRef.current.requestFullscreen();
              }
            }} 
            className="btn-outline" 
            style={{ padding: '12px 20px', background: 'rgba(124,58,237,0.15) !important', border: 'none !important', borderRadius: '8px' }}
          >
            <FaExpand /> Fullscreen
          </button>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noreferrer" 
            className="btn-outline" 
            style={{ padding: '12px 20px', background: 'rgba(124,58,237,0.15) !important', border: 'none !important', borderRadius: '8px' }}
          >
            <FaExternalLinkAlt /> Open in New Tab
          </a>
          <a 
            href="/resume.pdf" 
            download 
            className="btn-primary" 
            style={{ padding: '12px 24px', background: '#f1f5f9', color: '#0f172a', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
          >
            <FaDownload /> Download PDF
          </a>
        </div>
      </div>

      {/* PDF Container */}
      <div 
        ref={containerRef}
        style={{
          width: '100%', maxWidth: '850px', margin: '0 auto 60px auto',
          background: 'transparent', borderRadius: '8px', overflow: 'auto',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Document 
          file="/resume.pdf" 
          loading={<div style={{ padding: '40px', color: '#fff' }}>Loading PDF...</div>}
        >
          <Page 
            pageNumber={1} 
            width={containerWidth} 
            renderTextLayer={false} 
            renderAnnotationLayer={false} 
            className="custom-pdf-page"
          />
        </Document>
      </div>
    </div>
  );
}
