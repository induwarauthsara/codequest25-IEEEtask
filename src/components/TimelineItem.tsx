import React, { useState, useEffect, useRef } from 'react';

interface TimelineItemProps {
  title: string;
  date: string;
  description: string;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, date, description, isLast = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), Math.random() * 500);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={itemRef} className="relative flex items-center mb-8">
      {/* Enhanced Timeline line - more visible and longer */}
      {!isLast && (
        <div className="absolute left-6 top-12 w-1 h-24 bg-gradient-to-b from-red-500 via-red-400 to-red-500/50 opacity-70 shadow-lg shadow-red-500/30 timeline-pulse">
          {/* Animated pulse effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-red-300 to-transparent timeline-flow opacity-60"></div>
          {/* Connecting dots along the line */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
          <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
      )}
      
      {/* Enhanced Timeline node */}
      <div className={`relative z-10 w-12 h-12 rounded-full border-2 border-red-500 bg-black flex items-center justify-center transition-all duration-1000 ${
        isVisible ? 'shadow-lg shadow-red-500/50 scale-110 border-red-400' : 'scale-100'
      }`}>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        {/* Outer glow ring */}
        <div className={`absolute inset-0 rounded-full border border-red-500/30 animate-pulse transition-all duration-1000 ${
          isVisible ? 'scale-150 opacity-50' : 'scale-100 opacity-0'
        }`}></div>
      </div>
      
      {/* Content */}
      <div className={`ml-8 flex-1 p-4 bg-gray-900 border border-red-500/30 rounded-lg transition-all duration-1000 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-red-500">{title}</h3>
          <span className="text-sm text-gray-400 font-mono">{date}</span>
        </div>
        <p className="text-gray-300 leading-relaxed">{description}</p>
        
        {/* Scanning effect */}
        {isVisible && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;