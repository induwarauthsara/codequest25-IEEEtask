import React, { useEffect, useRef, useState } from 'react';

const CyberGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={gridRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cyberGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ff1a1a" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyberGrid)" filter="url(#glow)"/>
        </svg>
      </div>
    </div>
  );
};

export default CyberGrid;