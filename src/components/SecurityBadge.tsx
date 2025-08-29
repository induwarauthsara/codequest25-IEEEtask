import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Zap } from 'lucide-react';

const SecurityBadge: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed top-4 right-4 z-40 bg-black/80 backdrop-blur-sm border border-red-500/50 rounded-lg p-3 font-mono text-xs"
    >
      <div className="flex items-center space-x-2 mb-2">
        <Shield className="w-4 h-4 text-red-500 animate-pulse" />
        <span className="text-red-400 font-semibold">SECURITY STATUS</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Firewall:</span>
          <span className="text-green-400 flex items-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>ACTIVE</span>
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Monitoring:</span>
          <span className="text-green-400 flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>ONLINE</span>
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Threat Level:</span>
          <span className="text-yellow-400 flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>MEDIUM</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SecurityBadge;