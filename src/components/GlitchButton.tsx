import React from 'react';

interface GlitchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const GlitchButton: React.FC<GlitchButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary' 
}) => {
  const baseClasses = "relative px-8 py-4 font-bold text-lg transition-all duration-300 transform hover:scale-105";
  const variantClasses = variant === 'primary' 
    ? "bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-black hover:shadow-lg hover:shadow-red-500/50"
    : "bg-red-500 text-black hover:bg-red-400 hover:shadow-lg hover:shadow-red-500/50";

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className} group overflow-hidden`}
      onMouseEnter={(e) => {
        e.currentTarget.style.animation = 'glitch 0.3s ease-in-out infinite';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.animation = '';
      }}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </button>
  );
};

export default GlitchButton;