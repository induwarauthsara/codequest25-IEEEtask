import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

interface LoadingScreenProps {
    onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect if user is on mobile device
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor;
            const isMobileDevice = /android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos|windows phone/i.test(userAgent);
            const isSmallScreen = window.innerWidth <= 768;
            setIsMobile(isMobileDevice || isSmallScreen);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        const timer = setTimeout(onComplete, isMobile ? 4000 : 3000); // Longer delay for mobile to read message
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkMobile);
        };
    }, [onComplete, isMobile]);

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center px-4">
            <div className="text-center max-w-lg mx-auto" style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div className="text-2xl md:text-4xl font-bold text-red-500 mb-8 font-mono">
                    CODEQUEST - VAULT EDITION
                </div>
                
                <div className="w-64 md:w-96 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-red-300 animate-pulse origin-left transform scale-x-0 animate-scan-bar"></div>
                </div>
                
                <div className="mt-4 text-red-500 font-mono text-sm md:text-base">
                    <span className="animate-pulse">INITIALIZING SECURITY PROTOCOLS...</span>
                </div>
                
                {isMobile && (
                    <div className="mt-6 p-4 border border-yellow-500 rounded-lg bg-black/50 backdrop-blur-sm">
                        <div className="flex items-center justify-center mb-2">
                            <Smartphone className="w-5 h-5 text-yellow-500 mr-2" />
                            <Monitor className="w-5 h-5 text-green-500 ml-1" />
                        </div>
                        <div className="text-yellow-400 font-mono text-xs md:text-sm text-center">
                            <div className="mb-1">📱 MOBILE DEVICE DETECTED</div>
                            <div className="text-green-400">💻 For optimal experience, use desktop/computer</div>
                            <div className="text-gray-400 mt-1">Better performance • Full features • Enhanced security tools</div>
                        </div>
                    </div>
                )}
                
                <div className="mt-6 text-xs md:text-sm text-gray-500 font-mono">
                    IEEE STUDENT BRANCH UCSC
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;