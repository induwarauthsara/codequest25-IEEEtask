import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Wifi, Shield, Lock, Zap } from 'lucide-react';

interface TerminalLine {
  id: number;
  text: string;
  type: 'command' | 'output' | 'success' | 'error' | 'warning';
  delay: number;
}

const HackerTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const terminalSequence: Omit<TerminalLine, 'id'>[] = [
    { text: '> Initializing CodeQuest security protocols...', type: 'command', delay: 0 },
    { text: '[OK] Firewall status: ACTIVE', type: 'success', delay: 800 },
    { text: '[OK] Encryption modules: LOADED', type: 'success', delay: 1200 },
    { text: '[WARNING] Unauthorized access detected', type: 'warning', delay: 1800 },
    { text: '> Running vulnerability scan...', type: 'command', delay: 2400 },
    { text: '[INFO] 47 security challenges loaded', type: 'output', delay: 3000 },
    { text: '[INFO] Prize vault secured: LKR 120,000', type: 'output', delay: 3400 },
    { text: '[SUCCESS] System ready for infiltration', type: 'success', delay: 4000 },
    { text: '> Welcome to the vault, hacker...', type: 'command', delay: 4800 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isActive || currentLineIndex >= terminalSequence.length) return;

    const currentLine = terminalSequence[currentLineIndex];
    const timer = setTimeout(() => {
      setLines(prev => [...prev, { ...currentLine, id: currentLineIndex }]);
      setCurrentLineIndex(prev => prev + 1);
    }, currentLine.delay);

    return () => clearTimeout(timer);
  }, [currentLineIndex, isActive]);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command': return 'text-red-400';
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-black/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-6 font-mono text-sm max-w-2xl mx-auto"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-red-500/30">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-red-500" />
          <span className="text-red-400 font-semibold">VAULT_TERMINAL_v2.5</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          <Wifi className="w-4 h-4 text-green-400" />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="space-y-2 min-h-[200px]">
        <AnimatePresence>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`${getLineColor(line.type)} flex items-center space-x-2`}
            >
              {line.type === 'command' && <span className="text-red-500">$</span>}
              {line.type === 'success' && <Shield className="w-3 h-3 text-green-400" />}
              {line.type === 'error' && <Lock className="w-3 h-3 text-red-500" />}
              {line.type === 'warning' && <Zap className="w-3 h-3 text-yellow-400" />}
              <span>{line.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Blinking cursor */}
        {isActive && (
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5 }}
          >
            <span className="text-red-500">$</span>
            <span className="text-red-400">_</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-4 bg-red-500 inline-block"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default HackerTerminal;