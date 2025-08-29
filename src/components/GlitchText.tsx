import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnHover?: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', glitchOnHover = false }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(text);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';
  
  const triggerGlitch = () => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    let iterations = 0;
    
    const interval = setInterval(() => {
      setGlitchText(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations) return text[index];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('')
      );
      
      iterations += 1/3;
      
      if (iterations >= text.length) {
        clearInterval(interval);
        setGlitchText(text);
        setIsGlitching(false);
      }
    }, 30);
  };

  useEffect(() => {
    if (!glitchOnHover) {
      const timer = setTimeout(triggerGlitch, Math.random() * 5000 + 2000);
      return () => clearTimeout(timer);
    }
  }, [glitchOnHover]);

  return (
    <motion.span
      className={`${className} ${isGlitching ? 'animate-pulse' : ''}`}
      onMouseEnter={glitchOnHover ? triggerGlitch : undefined}
      style={{
        textShadow: isGlitching 
          ? '2px 0 #ff0000, -2px 0 #00ffff, 0 0 10px #ff1a1a'
          : undefined
      }}
    >
      {glitchText}
    </motion.span>
  );
};

export default GlitchText;