import React from 'react';

const CyberGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 26, 26, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 26, 26, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-shift 20s linear infinite'
        }}
      />
      <style jsx>{`
        @keyframes grid-shift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default CyberGrid;
