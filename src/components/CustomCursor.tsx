import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([{ x: 0, y: 0, id: 0 }].slice(1)); // Initialize with correct type but empty

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);

      setTrail(prevTrail => {
        const newPoint = { x: newPosition.x, y: newPosition.y, id: trailId++ };
        return [...prevTrail, newPoint].slice(-10);
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
          key={`trail-${point.id}-${index}`}
          className="fixed pointer-events-none z-[9999] w-1 h-1 bg-red-500 rounded-full transition-opacity duration-200"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            opacity: (index + 1) / trail.length * 0.5,
            transform: `scale(${(index + 1) / trail.length})`,
          }}
        />
      ))}
      <div
        className="fixed pointer-events-none z-[9999] w-3 h-3 bg-red-500 rounded-full shadow-lg"
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