import React, { useEffect, useRef, useState } from 'react';

const CyberGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [intensity, setIntensity] = useState(0.3);

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
        // Increase grid intensity near mouse
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        const newIntensity = 0.3 + (1 - distance / maxDistance) * 0.4;
        setIntensity(newIntensity);
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
      <div className={`absolute inset-0`} style={{ opacity: isMobile ? 0.4 : intensity }}>
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
                strokeWidth={isMobile ? "1.2" : "0.8"} 
                opacity={isMobile ? "0.8" : "0.6"}
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
      
      {/* Additional glowing nodes at intersections */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: isMobile ? 20 : 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: intensity * 0.8
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CyberGrid;