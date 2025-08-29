import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Trophy, Zap } from 'lucide-react';

const CyberStats: React.FC = () => {
  const stats = [
    { icon: Shield, label: 'Security Challenges', value: '47+', color: 'text-red-500' },
    { icon: Users, label: 'Expected Hackers', value: '200+', color: 'text-green-400' },
    { icon: Trophy, label: 'Prize Pool', value: 'LKR 120K', color: 'text-yellow-400' },
    { icon: Zap, label: 'Competition Hours', value: '24', color: 'text-blue-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-lg p-4 text-center hover:border-red-500/60 transition-all duration-300 group"
        >
          <div className="flex justify-center mb-2">
            <stat.icon className={`w-6 h-6 ${stat.color} group-hover:animate-pulse`} />
          </div>
          <div className={`text-2xl font-bold ${stat.color} font-mono`}>
            {stat.value}
          </div>
          <div className="text-xs text-gray-400 font-mono">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CyberStats;