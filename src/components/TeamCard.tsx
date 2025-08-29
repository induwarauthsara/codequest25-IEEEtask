import React, { useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, role, image, github, linkedin, email, phone }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="flip-card w-80 h-96">
      <div className="flip-card-inner relative w-full h-full">
        {/* Front Side */}
        <div className="flip-card-front absolute inset-0 bg-gray-900 border-2 border-red-500/50 rounded-xl p-6 flex flex-col items-center justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 mb-4 relative bg-gray-800 flex items-center justify-center">
            {!imageError ? (
              <Image 
                src={image} 
                alt={name} 
                fill
                className="object-cover"
                sizes="128px"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-red-500 text-2xl font-bold">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 font-mono">{name}</h3>
          <p className="text-red-500 text-lg font-semibold">{role}</p>
          
          {/* Cyber frame effect */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-red-500"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-red-500"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-red-500"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-red-500"></div>
        </div>
        
        {/* Back Side */}
        <div className="flip-card-back absolute inset-0 bg-gray-800 border-2 border-red-500 rounded-xl p-6 flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold text-red-500 mb-6 font-mono">{name}</h3>
          
          <div className="space-y-4">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-white hover:text-red-500 transition-colors">
                <Github size={24} />
                <span className="font-mono">GitHub</span>
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-white hover:text-red-500 transition-colors">
                <Linkedin size={24} />
                <span className="font-mono">LinkedIn</span>
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="flex items-center space-x-3 text-white hover:text-red-500 transition-colors">
                <Mail size={24} />
                <span className="font-mono">Email</span>
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center space-x-3 text-white hover:text-red-500 transition-colors">
                <Phone size={24} />
                <span className="font-mono">{phone}</span>
              </a>
            )}
          </div>
          
          <div className="mt-6 text-center">
            <div className="w-16 h-0.5 bg-red-500 mx-auto mb-4"></div>
            <p className="text-gray-400 font-mono text-sm">CONTACT ESTABLISHED</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;