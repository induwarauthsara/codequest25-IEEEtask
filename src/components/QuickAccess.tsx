import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Calendar, Trophy, HelpCircle, Shield } from 'lucide-react';
import Link from 'next/link';

const QuickAccess: React.FC = () => {
  const quickLinks = [
    { icon: Shield, label: 'Register Team', href: '/registration', color: 'text-red-500', bg: 'bg-red-500/10' },
    { icon: FileText, label: 'Rules & Guidelines', href: '#rules', color: 'text-green-400', bg: 'bg-green-400/10' },
    { icon: Calendar, label: 'Event Schedule', href: '#timeline', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: Trophy, label: 'Prize Details', href: '#prizes', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { icon: Users, label: 'Team Formation', href: '#team', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { icon: HelpCircle, label: 'FAQ & Support', href: '#faq', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-red-400 font-mono mb-2">QUICK ACCESS TERMINAL</h3>
        <p className="text-gray-400 text-sm font-mono">Navigate the vault systems</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {quickLinks.map((link, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
          >
            {link.href.startsWith('#') ? (
              <button
                onClick={() => scrollToSection(link.href)}
                className={`w-full ${link.bg} border border-gray-600 hover:border-red-500/60 rounded-lg p-3 transition-all duration-300 group hover:scale-105 hover:shadow-lg hover:shadow-red-500/20`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <link.icon className={`w-5 h-5 ${link.color} group-hover:animate-pulse`} />
                  <span className="text-xs text-gray-300 font-mono text-center leading-tight">
                    {link.label}
                  </span>
                </div>
              </button>
            ) : (
              <Link href={link.href}>
                <div className={`w-full ${link.bg} border border-gray-600 hover:border-red-500/60 rounded-lg p-3 transition-all duration-300 group hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 cursor-pointer`}>
                  <div className="flex flex-col items-center space-y-2">
                    <link.icon className={`w-5 h-5 ${link.color} group-hover:animate-pulse`} />
                    <span className="text-xs text-gray-300 font-mono text-center leading-tight">
                      {link.label}
                    </span>
                  </div>
                </div>
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickAccess;