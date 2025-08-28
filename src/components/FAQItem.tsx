import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-2 rounded-lg overflow-hidden transition-all duration-500 ${
      isOpen ? 'border-red-500 shadow-lg shadow-red-500/25' : 'border-red-500/30'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 bg-gray-900 hover:bg-gray-800 transition-all duration-300 flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-semibold text-white font-mono pr-4">{question}</h3>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
          {isOpen ? <ChevronDown className="text-red-500" size={24} /> : <ChevronRight className="text-red-500" size={24} />}
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-500 ${
        isOpen ? 'max-h-96 border-t border-red-500/30' : 'max-h-0'
      }`}>
        <div className="p-6 bg-gray-800 text-gray-300 leading-relaxed">
          {answer}
          
          {/* Glowing bottom border when open */}
          {isOpen && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;