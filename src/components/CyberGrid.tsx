import React, { useEffect, useRef, useState } from 'react';

const CyberGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos|windows phone/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    // Handle touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (isMobile && e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div 
      ref={gridRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        transform: isMobile 
          ? `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)` 
          : `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className={`absolute inset-0 ${isMobile ? 'opacity-20' : 'opacity-10'}`}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern 
              id="cyberGrid" 
              x="0" 
              y="0" 
              width={isMobile ? "40" : "50"} 
              height={isMobile ? "40" : "50"} 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d={isMobile ? "M 40 0 L 0 0 0 40" : "M 50 0 L 0 0 0 50"} 
                fill="none" 
                stroke="#ff1a1a" 
                strokeWidth={isMobile ? "0.8" : "0.5"} 
                opacity={isMobile ? "0.5" : "0.3"}
              />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation={isMobile ? "2" : "3"} result="coloredBlur"/>
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