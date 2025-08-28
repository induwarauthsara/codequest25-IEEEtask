import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);

      setTrail(prev => {
        const newTrail = [
          ...prev,
          { ...newPosition, id: trailId++ }
        ].slice(-10);
        return newTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-50 w-1 h-1 bg-red-500 rounded-full transition-opacity duration-200"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            opacity: (index + 1) / trail.length * 0.5,
            transform: `scale(${(index + 1) / trail.length})`,
          }}
        />
      ))}
      <div
        className="fixed pointer-events-none z-50 w-3 h-3 bg-red-500 rounded-full shadow-lg"
        style={{
          left: position.x - 6,
          top: position.y - 6,
          boxShadow: '0 0 20px rgba(255, 26, 26, 0.8)',
        }}
      />
    </>
  );
};

export default CustomCursor;