import React from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl font-bold text-red-500 mb-8 font-mono">
          CODEQUEST - VAULT EDITION
        </div>
        
        <div className="w-96 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-500 to-red-300 animate-pulse origin-left transform scale-x-0 animate-scan-bar"></div>
        </div>
        
        <div className="mt-4 text-red-500 font-mono">
          <span className="animate-pulse">INITIALIZING SECURITY PROTOCOLS...</span>
        </div>
        
        <div className="mt-8 text-sm text-gray-500 font-mono">
          IEEE STUDENT BRANCH UCSC
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;