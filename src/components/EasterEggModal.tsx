import React, { useEffect } from 'react';
import { X, Terminal, Shield, Flag } from 'lucide-react';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 border-2 border-red-500 rounded-xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <Terminal className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-500 font-mono">SYSTEM ACCESS GRANTED</h2>
        </div>
        
        <div className="space-y-4 text-gray-300 font-mono text-sm">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-red-500" />
            <span>Security Level: MAXIMUM</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Flag className="w-4 h-4 text-red-500" />
            <span>Objective: Capture The Flag</span>
          </div>
          
          <div className="bg-gray-800 p-4 rounded border border-red-500/30 mt-4">
            <p className="text-red-400 mb-2">MISSION BRIEFING:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Deploy cybersecurity skills</li>
              <li>Exploit vulnerabilities ethically</li>
              <li>Master cryptographic challenges</li>
              <li>Collaborate with elite hackers</li>
              <li>Secure the ultimate prize</li>
            </ul>
          </div>
          
          <div className="text-center mt-6">
            <span className="text-red-500 animate-pulse">WELCOME TO THE VAULT, AGENT</span>
          </div>
          
          <div className="text-center mt-4 pt-4 border-t border-red-500/30">
            <p className="text-gray-500 text-xs">Press ESC or click outside to close</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEggModal;