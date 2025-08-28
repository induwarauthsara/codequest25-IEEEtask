import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  className?: string;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff1a1a';
      ctx.font = `${fontSize}px Source Code Pro`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 opacity-20 ${className}`}
    />
  );
};

export default MatrixRain;