import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Calendar, Trophy, Users, HelpCircle, Github, Linkedin, Mail, ExternalLink, MapPin } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { teamImages } from '../lib/images';

// Components
import MatrixRain from '../components/MatrixRain';
import ParticleField from '../components/ParticleField';
import CyberGrid from '../components/CyberGrid';
import Navbar from '../components/Navbar';
import TypingText from '../components/TypingText';
import GlitchText from '../components/GlitchText';
import GlitchButton from '../components/GlitchButton';
import TimelineItem from '../components/TimelineItem';
import PrizeCard from '../components/PrizeCard';
import TeamCard from '../components/TeamCard';
import FAQItem from '../components/FAQItem';
import LoadingScreen from '../components/LoadingScreen';
import EasterEggModal from '../components/EasterEggModal';
import HackerTerminal from '../components/HackerTerminal';
import CyberStats from '../components/CyberStats';
import QuickAccess from '../components/QuickAccess';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [keySequence, setKeySequence] = useState('');
  
  // Intersection observers for animations
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [introRef, introInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [prizesRef, prizesInView] = useInView({ threshold: 0.3, triggerOnce: true });

  // Handle easter egg keyboard sequence
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = keySequence + e.key.toLowerCase();
      setKeySequence(newSequence);
      
      if (newSequence.includes('help')) {
        setShowEasterEgg(true);
        setKeySequence('');
      } else if (newSequence.length > 10) {
        setKeySequence(newSequence.slice(-10));
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [keySequence]);

  const timelineData = [
    {
      title: "Registration Opens",
      date: "March 1, 2025",
      description: "Secure your spot in the most challenging cybersecurity competition. Early registration includes exclusive workshop access."
    },
    {
      title: "Pre-Event Workshop",
      date: "March 15, 2025",
      description: "Master the fundamentals with expert-led sessions on penetration testing, cryptography, and digital forensics."
    },
    {
      title: "Qualification Round",
      date: "March 20, 2025",
      description: "Prove your skills in the preliminary challenges. Top teams advance to the main competition arena."
    },
    {
      title: "Main Competition",
      date: "March 25, 2025",
      description: "24 hours of intense cyber warfare. Exploit vulnerabilities, decode secrets, and capture flags to claim victory."
    }
  ];

  const teamMembers = [
    {
      name: "Likitha Chathubhashini",
      role: "Event Co Chair",
      image: teamImages.likitha,
      github: "https://github.com",
      linkedin: "https://www.linkedin.com/in/likitha-chathubhashini-b852b0289/",
      email: "likithachathu@gmail.com",
      phone: "076 698 8362"
    },
    {
      name: "Noji Yudara",
      role: "Event Co Chair", 
      image: teamImages.noji,
      github: "https://github.com",
      linkedin: "https://www.linkedin.com/in/nojiyudara/",
      email: "noji.yu123@gmail.com",
      phone: "070 351 7563"
    },
    {
      name: "Chamudi Upeka",
      role: "Event Co Chair",
      image: teamImages.chamudi,
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "chamudiupeka21@gmail.com",
      phone: "076 710 5536"
    },
    {
      name: "Dineth Palliyaguru",
      role: "Program Team Lead",
      image: teamImages.dineth,
      github: "https://github.com",
        linkedin: "https://www.linkedin.com/in/dineth-palliyaguru/",
      email: "dineththeekshana@gmail.com",
      phone: "077 410 4170"
    },
    {
      name: "Induwara Uthsara",
      role: "Web Dev",
      image: teamImages.induwara,
      github: "https://github.com/induwarauthsara",
      linkedin: "https://www.linkedin.com/in/induwarauthsara/",
      email: "induwarauthsara@gmail.com",
      phone: "078 660 7354"
    }
  ];

  const faqData = [
    {
      question: "What experience level is required?",
      answer: "CodeQuest welcomes all skill levels! We provide pre-event workshops for beginners, while advanced challenges await experienced hackers. The competition features multiple difficulty tiers to ensure everyone can participate meaningfully."
    },
    {
      question: "What should I bring to the event?",
      answer: "Bring your laptop, charger, and hacking mindset! We'll provide high-speed internet, power outlets, snacks, and all necessary infrastructure. A virtual machine with common security tools is recommended."
    },
    {
      question: "How are teams formed?",
      answer: "Teams can have 2-4 members. You can register as a complete team or as individuals looking to form teams. We'll facilitate team formation during the registration period for solo participants."
    },
    {
      question: "What types of challenges are included?",
      answer: "Expect diverse challenges including web exploitation, cryptography, reverse engineering, forensics, steganography, and network security. Each category tests different aspects of cybersecurity knowledge."
    },
    {
      question: "Are there prizes for runners-up?",
      answer: "Absolutely! Beyond the main prizes, we offer recognition for best newcomer team, most creative solution, and category-specific achievements. Everyone gets certificates and swag."
    }
  ];

  if (isLoading) {
    return (
      <>
        <Head>
          <title>CodeQuest - Vault Edition | IEEE UCSC CTF Hackathon</title>
          <meta name="description" content="The ultimate cybersecurity challenge awaits. Join IEEE UCSC's premier CTF hackathon." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>CodeQuest - Vault Edition | IEEE UCSC CTF Hackathon</title>
        <meta name="description" content="The ultimate cybersecurity challenge awaits. Join IEEE UCSC's premier CTF hackathon." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Navbar />
        <MatrixRain />
        <ParticleField />
        <CyberGrid />
        
        {/* Hero Section */}
        <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="text-center z-10 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-6xl md:text-8xl font-bold mb-4 cyber-font neon-glow"
              >
                <GlitchText text="CODEQUEST" glitchOnHover />
              </motion.h1>
              <div className="text-2xl md:text-3xl text-red-500 font-mono mb-8">
                <TypingText text="VAULT EDITION" speed={100} />
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl md:text-2xl mb-8 text-gray-300 font-mono"
            >
              A Cybersecurity Capture the Flag Hackathon<br/>
              <span className="text-red-500">by IEEE Student Branch UCSC</span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.5 }}
              className="mb-12"
            >
              <Link href="/registration">
                <GlitchButton className="pulse-animation">
                  REGISTER NOW
                </GlitchButton>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 2 }}
              className="flex justify-center space-x-8 text-gray-400 font-mono"
            >
              <div className="flex items-center space-x-2">
                <Calendar size={20} />
                <span>March 25, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={20} />
                <span>UCSC</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section ref={introRef} className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="text-3xl md:text-4xl font-bold mb-8 font-mono text-red-500">
                {introInView && <TypingText text="> DECRYPT. EXPLOIT. MASTER." speed={80} />}
              </div>
            </motion.div>
            
            {/* Hacker Terminal */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-12"
            >
              <HackerTerminal />
            </motion.div>
            
            {/* Cyber Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-12"
            >
              <CyberStats />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="bg-gray-900/50 backdrop-blur-sm border-2 border-red-500/30 rounded-xl p-8 shadow-2xl shadow-red-500/10 mb-12"
            >
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Welcome to the most immersive cybersecurity challenge in Sri Lanka. CodeQuest – Vault Edition 
                pushes the boundaries of ethical hacking, bringing together the brightest minds to compete in 
                a high-stakes digital battleground.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Whether you're a seasoned security professional or an aspiring ethical hacker, this competition 
                will test your skills across multiple domains including web exploitation, cryptography, reverse 
                engineering, and digital forensics.
              </p>
            </motion.div>
            
            {/* Quick Access Terminal */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <QuickAccess />
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} id="timeline" className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-font text-red-500 neon-glow-readable inline-block">
                <GlitchText text="MISSION TIMELINE" />
              </h2>
              <p className="text-gray-400 font-mono">SYNCHRONIZE YOUR SCHEDULE</p>
            </motion.div>
            
            <div className="relative">
              {/* Main Timeline Line - runs through all items */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/20 via-red-500/60 to-red-500/20 hidden md:block timeline-pulse">
                {/* Animated flow effect */}
                <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-red-400 to-transparent timeline-flow opacity-40"></div>
                {/* Additional flowing dots */}
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full timeline-flow"></div>
                <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full timeline-flow" style={{ animationDelay: '1.5s' }}></div>
              </div>
              
              <div className="space-y-8 relative">
                {timelineData.map((item, index) => (
                  <TimelineItem
                    key={index}
                    title={item.title}
                    date={item.date}
                    description={item.description}
                    isLast={index === timelineData.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section ref={prizesRef} id="prizes" className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={prizesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-font text-red-500 neon-glow-readable inline-block">
                <GlitchText text="VAULT REWARDS" />
              </h2>
              <p className="text-gray-400 font-mono">CLAIM YOUR BOUNTY</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={prizesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="grid md:grid-cols-3 gap-8"
            >
              <PrizeCard place="FIRST PLACE" amount="LKR 60,000" icon="trophy" rank={1} />
              <PrizeCard place="SECOND PLACE" amount="LKR 40,000" icon="award" rank={2} />
              <PrizeCard place="THIRD PLACE" amount="LKR 20,000" icon="medal" rank={3} />
            </motion.div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section id="partners" className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-font text-red-500 neon-glow-readable inline-block">
                <GlitchText text="ALLIANCE PARTNERS" />
              </h2>
              <p className="text-gray-400 font-mono">POWERED BY INDUSTRY LEADERS</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((sponsor) => (
                <div key={sponsor} className="bg-gray-900 border-2 border-red-500/30 rounded-xl p-8 text-center hover:border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 glitch">
                  <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Shield className="w-12 h-12 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">SPONSOR {sponsor}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-font text-red-500 neon-glow-readable inline-block">
                <GlitchText text="COMMAND CENTER" />
              </h2>
              <p className="text-gray-400 font-mono">MEET THE ARCHITECTS</p>
            </div>
            
            {/* Team Cards Container - Responsive and Centered */}
            <div className="flex flex-wrap justify-center items-start gap-6 lg:gap-8 max-w-7xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex justify-center mb-4">
                  <TeamCard
                    name={member.name}
                    role={member.role}
                    image={member.image}
                    github={member.github}
                    linkedin={member.linkedin}
                    email={member.email}
                    phone={member.phone}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-font text-red-500 neon-glow-readable inline-block">
                <GlitchText text="INTEL BRIEFING" />
              </h2>
              <p className="text-gray-400 font-mono">CLASSIFIED INFORMATION</p>
            </div>
            
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 px-4 border-t border-red-500/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-red-500 mb-4 cyber-font">CODEQUEST</h3>
                <p className="text-gray-400 font-mono text-sm">
                  The ultimate cybersecurity battleground where legends are forged and skills are tested.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-4 font-mono">QUICK ACCESS</h4>
                <ul className="space-y-2 text-gray-400 font-mono text-sm">
                  <li><a href="#" className="hover:text-red-500 transition-colors">Registration</a></li>
                  <li><a href="#" className="hover:text-red-500 transition-colors">Rules & Guidelines</a></li>
                  <li><a href="#" className="hover:text-red-500 transition-colors">Workshop Materials</a></li>
                  <li><a href="#" className="hover:text-red-500 transition-colors">Contact Support</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white mb-4 font-mono">CONNECT</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                    <Github size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-red-500/30 pt-8 text-center">
              <p className="text-gray-400 font-mono text-sm">
                © 2025 IEEE Student Branch UCSC | All Rights Reserved
              </p>
              <p className="text-gray-400 font-mono text-xs mt-1">
                Developed by <a href="https://induwara.dev" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 transition-colors">Induwara Uthsara</a> 
              </p>
              <p className="text-red-500 font-mono text-xs mt-2">
                &gt; SYSTEM STATUS: OPERATIONAL | SECURITY LEVEL: MAXIMUM
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm font-mono">
                💡 <span className="text-red-400">Hint:</span> Try typing "help" on your keyboard...
              </p>
            </div>
          </div>
        </footer>

        {/* Easter Egg Modal */}
        <EasterEggModal isOpen={showEasterEgg} onClose={() => setShowEasterEgg(false)} />
      </div>
    </>
  );
}
