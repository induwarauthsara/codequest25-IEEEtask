import React, { useEffect, useState } from 'react';
import { X, Terminal, Shield, Flag, Cookie, Search } from 'lucide-react';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOnRegistrationPage?: boolean;
}

const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose, isOnRegistrationPage = false }) => {
  const [showCookieHint, setShowCookieHint] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      // Set cookies when modal opens (ensures they're always available)
      document.cookie = 'hidden_treasure=CODEQUEST{c00k13_m0nst3r_f0und_th3_tr34sur3}; path=/; max-age=3600';
      document.cookie = 'session_id=abc123def456; path=/';
      document.cookie = 'user_theme=dark; path=/';
      document.cookie = 'csrf_token=xyz789uvw012; path=/';
      document.cookie = 'tracking_id=guest_' + Math.random().toString(36).substr(2, 9) + '; path=/';
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
      <div className="bg-gray-900 border-2 border-red-500 rounded-xl p-8 max-w-md w-full relative animate-pulse-once">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <div className="flex justify-center space-x-2 mb-4">
            <Terminal className="w-12 h-12 text-red-500" />
            <Cookie className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-500 font-mono">COOKIE VAULT ACCESSED</h2>
          <p className="text-red-300 text-sm mt-2">Secret Storage System Initialized</p>
        </div>
        
        <div className="space-y-4 text-gray-300 font-mono text-sm">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-red-500" />
            <span>Storage Protocol: HTTP COOKIES</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Flag className="w-4 h-4 text-red-500" />
            <span>Treasure Status: HIDDEN</span>
          </div>
          
          <div className="bg-gray-800 p-4 rounded border border-red-500/30 mt-4">
            <p className="text-red-400 mb-2">🍪 COOKIE STORAGE ACTIVATED:</p>
            
            {!isOnRegistrationPage ? (
              // Easy hint for home page
              <div className="text-xs space-y-2">
                <p className="text-green-400">✅ Easy Level Hint:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Press F12 to open Developer Tools</li>
                  <li>Go to "Application" tab (Chrome) or "Storage" tab (Firefox)</li>
                  <li>Look in the "Cookies" section</li>
                  <li>Find the cookie named "hidden_treasure"</li>
                </ul>
                <p className="text-yellow-400 mt-2">The treasure you seek is sweet! 🍯</p>
              </div>
            ) : (
              // Harder hint for registration page
              <div className="text-xs space-y-2">
                <p className="text-orange-400">🔥 Advanced Level Hint:</p>
                <button 
                  onClick={() => setShowCookieHint(!showCookieHint)}
                  className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors mb-2"
                >
                  <Search className="w-3 h-3" />
                  <span>{showCookieHint ? 'Hide Advanced Hint' : 'Show Advanced Hint'}</span>
                </button>
                {showCookieHint && (
                  <div className="bg-black/50 p-3 rounded border border-yellow-500/30">
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Inspect browser storage mechanisms</li>
                      <li>Look for temporary client-side data</li>
                      <li>Search for something "treasure"-related</li>
                      <li>Check HTTP cookie storage specifically</li>
                      <li>The flag format: CODEQUEST{'{ ... }'}</li>
                    </ul>
                    <p className="text-yellow-400 mt-2">💡 Cookies store sweet secrets!</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="text-center mt-6">
            <span className="text-red-500 animate-pulse">
              {isOnRegistrationPage ? 'ENHANCED SECURITY MODE' : 'BASIC RECONNAISSANCE MODE'}
            </span>
          </div>
          
          <div className="text-center mt-4 pt-4 border-t border-red-500/30">
            <p className="text-gray-500 text-xs">
              Press ESC or click outside to close
              <br />
              <span className="text-yellow-400">🍪 Remember: The sweetest data is stored locally!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEggModal;