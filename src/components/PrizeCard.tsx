import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';

interface PrizeCardProps {
  place: string;
  amount: string;
  icon: 'trophy' | 'award' | 'medal';
  rank: number;
}

const PrizeCard: React.FC<PrizeCardProps> = ({ place, amount, icon, rank }) => {
  const IconComponent = icon === 'trophy' ? Trophy : icon === 'award' ? Award : Medal;
  const glowColor = rank === 1 ? 'shadow-yellow-500/50' : rank === 2 ? 'shadow-gray-300/50' : 'shadow-orange-600/50';
  const borderColor = rank === 1 ? 'border-yellow-500' : rank === 2 ? 'border-gray-300' : 'border-orange-600';

  return (
    <div className={`relative bg-gray-900 p-8 rounded-xl border-2 ${borderColor} transition-all duration-500 transform hover:scale-105 hover:${glowColor} hover:shadow-2xl group cursor-pointer`}>
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
      
      {/* Rank indicator */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
        {rank}
      </div>
      
      <div className="relative z-10 text-center">
        <div className="mb-6 flex justify-center">
          <div className={`p-4 rounded-full bg-gray-800 border-2 ${borderColor} group-hover:animate-pulse`}>
            <IconComponent size={48} className={`${rank === 1 ? 'text-yellow-500' : rank === 2 ? 'text-gray-300' : 'text-orange-600'}`} />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 font-mono">{place}</h3>
        <div className="text-4xl font-bold text-red-500 mb-4 font-mono">{amount}</div>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-xl border-2 border-red-500 animate-pulse"></div>
        </div>
      </div>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
};

export default PrizeCard;