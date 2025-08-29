import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Calendar, Trophy, Users, Shield, HelpCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero', icon: Home },
    { name: 'Timeline', href: '#timeline', icon: Calendar },
    { name: 'Vault', href: '#prizes', icon: Trophy },
    { name: 'Partners', href: '#partners', icon: Users },
    { name: 'Command', href: '#team', icon: Shield },
    { name: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-md border-b border-red-500/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <img 
                  src="/assets/logo.png" 
                  alt="CodeQuest Logo" 
                  className="h-8 w-8 md:h-10 md:w-10 transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl md:text-2xl font-bold cyber-font neon-glow">
                CODE<span className="text-red-500">QUEST</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="group px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-red-500/10 transition-all duration-300 font-mono text-sm flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4 group-hover:text-red-500 transition-colors duration-300" />
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </button>
                );
              })}
              
              {/* Registration Button - Highlighted */}
              <Link href="/registration">
                <button className="ml-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 cyber-font">
                  <span className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>REGISTER</span>
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-300"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ${
        isOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-black/95 backdrop-blur-md border-t border-red-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="group w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-red-500/10 transition-all duration-300 font-mono text-sm flex items-center space-x-3"
                >
                  <Icon className="w-5 h-5 group-hover:text-red-500 transition-colors duration-300" />
                  <span>{item.name}</span>
                </button>
              );
            })}
            
            {/* Mobile Registration Button */}
            <div className="pt-4 pb-2">
              <Link href="/registration">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 cyber-font flex items-center justify-center space-x-2"
                >
                  <Shield className="w-5 h-5" />
                  <span>REGISTER NOW</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
