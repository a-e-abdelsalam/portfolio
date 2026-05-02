import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Video, 
  Mail, 
  X, 
  Minus, 
  Monitor, 
  Play, 
  ExternalLink,
  Instagram,
  Linkedin,
  Maximize2,
  Terminal,
  Circle,
  FileText,
  Rocket,
  Shield,
  Globe,
  Compass
} from 'lucide-react';

import portfolioData from './data/portfolio.json';

const getIcon = (name: string, size: number = 16) => {
  switch (name) {
    case 'User': return <User size={size} />;
    case 'Video': return <Video size={size} />;
    case 'Mail': return <Mail size={size} />;
    case 'Terminal': return <Terminal size={size} />;
    case 'Shield': return <Shield size={size} />;
    case 'Linkedin': return <Linkedin size={size} />;
    case 'Instagram': return <Instagram size={size} />;
    case 'Play': return <Play size={size} />;
    default: return null;
  }
};

interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  color?: string;
  key?: React.Key;
}

const PixelWindow = ({ title, isOpen, onClose, children, icon }: WindowProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="fixed md:absolute inset-4 md:inset-auto md:top-10 md:left-10 md:right-10 md:bottom-10 z-40 flex items-center justify-center pointer-events-none"
        >
          <div className="pixel-window-v2 w-full h-full max-w-4xl flex flex-col z-50 pointer-events-auto overflow-hidden">
            {/* Screenshot Header Style */}
            <div className="pixel-header-v2">
              <div className="flex items-center gap-3">
                <div className="relative w-4 h-4 flex items-center justify-center scale-125">
                   <div className="absolute w-full h-px bg-white/60" />
                   <div className="absolute h-full w-px bg-white/60" />
                   <div className="w-1.5 h-1.5 border border-white/80" />
                </div>
                <div className="flex items-center gap-2">
                   {icon}
                   <span className="text-[10px] font-mono text-white/90 uppercase tracking-tighter truncate">{title}</span>
                </div>
              </div>
              <div className="flex gap-1 items-center mr-1">
                <div className="w-5 h-5 flex items-center justify-center hover:bg-white/10 text-white cursor-pointer">
                  <div className="w-2.5 h-0.5 bg-white/80" />
                </div>
                <div className="w-5 h-5 flex items-center justify-center hover:bg-white/10 text-white cursor-pointer">
                  <div className="w-2 h-2 border-2 border-white/80" />
                </div>
                <div 
                  onClick={onClose}
                  className="w-5 h-5 flex items-center justify-center bg-transparent hover:bg-hero-red/40 text-white transition-colors cursor-pointer"
                >
                  <X size={14} className="stroke-[3]" />
                </div>
              </div>
            </div>
            
            <div className="p-4 md:p-6 overflow-y-auto flex-1 bg-black/60 backdrop-blur-sm relative">
                {/* Thin inner border */}
                <div className="h-full border-2 border-white/10 p-4 md:p-8 relative">
                   {/* Grid pattern from screenshot */}
                   <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                   <div className="relative z-10">
                    {children}
                   </div>
                </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface PlanetProps {
  id: number;
  title: string;
  img: string;
  isSelected: boolean;
  onSelect: (id: number) => void;
  behance?: string;
  key?: React.Key;
}

const BackgroundPlanet = ({ id, title, img, isSelected, onSelect, behance }: PlanetProps) => {
  // Use pseudo-random offsets based on ID to avoid hydration issues
  const driftX = (id * 40) % 100 - 50;
  const driftY = (id * 30) % 100 - 50;
  const startX = (id * 17) % 70 + 15;
  const startY = (id * 13) % 70 + 15;
  const duration = 20 + (id % 15);

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        x: isSelected ? 0 : [0, driftX, -driftX, 0],
        y: isSelected ? 0 : [0, driftY, -driftY, 0],
        scale: isSelected ? 2.5 : 1,
        left: isSelected ? '50%' : `${startX}%`,
        top: isSelected ? '50%' : `${startY}%`,
        translateX: isSelected ? '-50%' : '0%',
        translateY: isSelected ? '-50%' : '0%',
        zIndex: isSelected ? 100 : 1,
      }}
      transition={{
        x: { repeat: isSelected ? 0 : Infinity, duration, ease: "easeInOut" },
        y: { repeat: isSelected ? 0 : Infinity, duration: duration * 1.2, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 200, damping: 20 },
        layout: { duration: 0.5 }
      }}
      className={`absolute flex flex-col items-center gap-1 group ${isSelected ? 'pointer-events-auto' : 'cursor-pointer'}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
    >
      <div className="relative">
        <div className={`rounded-full overflow-hidden shadow-2xl transition-all duration-500 border-4 border-white/20 ${isSelected ? 'w-64 h-64 border-hero-red' : 'w-20 h-20 md:w-28 md:h-28 grayscale group-hover:grayscale-0'}`}>
          <img 
            src={img} 
            alt={title} 
            className="w-full h-full object-cover image-render-pixel"
            referrerPolicy="no-referrer"
          />
          {/* Surface texture overlay */}
          <div className="absolute inset-0 bg-hero-red/10 pointer-events-none mix-blend-overlay" />
        </div>
        
        {/* Jagged Fragments around selected planet */}
        {isSelected && (
          <>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute -top-10 -left-10 w-20 h-20 rocky-border rotate-45" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="absolute -bottom-6 -right-12 w-24 h-16 rocky-border -rotate-12" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }} />
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-1/2 -right-14 w-12 h-20 rocky-border rotate-90" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)' }} />
          </>
        )}

        {/* Action button when selected */}
        {isSelected && (
           <motion.a
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             href={behance}
             target="_blank"
             rel="noreferrer"
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-hero-red text-white rocky-border z-50 group/btn"
             onClick={(e) => e.stopPropagation()}
           >
             <Play fill="white" size={24} className="group-hover/btn:scale-110 transition-transform" />
           </motion.a>
        )}

        {/* Close button */}
        {isSelected && (
          <button 
            onClick={(e) => {
               e.stopPropagation();
               onSelect(-1);
            }}
            className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-black border-4 border-hero-red flex items-center justify-center text-white z-50 hover:bg-hero-red transition-colors shadow-lg"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {!isSelected && (
        <div className="px-2 py-0.5 bg-hero-red text-white font-bold text-[8px] md:text-[10px] uppercase tracking-widest border border-black shadow-[3px_3px_0_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity">
           {title}
        </div>
      )}
      
      {isSelected && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 text-center max-w-xs"
        >
          <div className="text-sm font-bold text-hero-blue tracking-[0.4em] uppercase mb-2">{title}</div>
          <div className="text-[10px] text-gray-400 font-mono tracking-tighter bg-black/80 p-3 border-b-4 border-hero-red uppercase">
             DATA_SECTOR_{id} // VIDEO_READY
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function App() {
  const [activeWindows, setActiveWindows] = useState({
    bio: true,
    portfolio: false,
    terminal: false,
    contact: false,
  });

  const [selectedPlanetId, setSelectedPlanetId] = useState<number | null>(null);

  const toggleWindow = (key: keyof typeof activeWindows) => {
    setActiveWindows(prev => ({ 
      bio: false, portfolio: false, terminal: false, contact: false,
      [key]: !prev[key] 
    }));
    setSelectedPlanetId(null);
  };

  return (
    <div className="flex h-screen bg-hero-black text-white relative overflow-hidden select-none galaxy-bg">
      <div className="starfield" />
      <div className="nebula" />
      
      {/* Pixel Stars from f1g5Ap look */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={`star-${i}`}
            className="star-pixel animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>
      <div className="scanline" />

      {/* Floating Background Assets */}
      <div className="absolute inset-0 pointer-events-none z-10">
         <Rocket className="rocket-accent top-20 right-40 text-hero-red -rotate-45" size={40} />
         <Rocket className="rocket-accent bottom-40 right-20 text-hero-blue rotate-12 opacity-50" size={32} />
         
         {/* Decorative Star Particles / Gems */}
         <div className="absolute top-[15%] left-[25%] w-3 h-3 bg-red-400 rotate-45 animate-pulse shadow-[0_0_10px_#f87171]" />
         <div className="absolute top-[45%] right-[15%] w-4 h-4 bg-blue-400 rotate-12 animate-bounce shadow-[0_0_10px_#60a5fa]" />
         <div className="absolute bottom-[25%] left-[45%] w-5 h-5 bg-green-400 skew-x-12 animate-pulse shadow-[0_0_10px_#4ade80]" />
         <div className="absolute bottom-[45%] right-[35%] w-3 h-3 bg-yellow-400 -rotate-45 shadow-[0_0_10px_#facc15]" />
         <div className="absolute top-[20%] right-[40%] w-2 h-2 bg-purple-400 rounded-full animate-ping" />
         <div className="absolute bottom-[15%] left-[30%] w-3 h-3 bg-cyan-400 rotate-45 animate-pulse" />

         {/* Decorative Broken Rocks/Asteroids */}
         <div className="absolute top-[10%] left-[-2%] w-32 h-64 rocky-border opacity-30 rotate-12" style={{ clipPath: 'polygon(0% 20%, 50% 0%, 100% 20%, 100% 80%, 50% 100%, 0% 80%)' }} />
         <div className="absolute bottom-[10%] right-[30%] w-48 h-32 rocky-border opacity-20 -rotate-12" style={{ clipPath: 'polygon(10% 0%, 100% 10%, 90% 90%, 0% 100%)' }} />
         <div className="absolute bottom-[-10%] left-[5%] w-64 h-48 rocky-border opacity-40 -rotate-6" style={{ clipPath: 'polygon(30% 0%, 100% 20%, 70% 100%, 0% 70%)' }} />
         <div className="absolute top-[60%] right-[-5%] w-40 h-64 rocky-border opacity-30 -rotate-45" style={{ clipPath: 'polygon(20% 0, 100% 20%, 80% 100%, 0 80%)' }} />
         
         <div className="absolute top-1/4 left-[15%] w-8 h-8 rocky-border bg-hero-purple rotate-12 opacity-40 translate-z-0 cosmic-drift" style={{ animationDelay: '2s' }} />
         <div className="absolute bottom-1/3 left-1/4 w-4 h-4 rocky-border bg-hero-dark -rotate-45 opacity-60 translate-z-0 cosmic-drift" style={{ animationDelay: '5s' }} />
         <div className="absolute top-2/3 right-1/4 w-12 h-10 rocky-border bg-black rotate-6 opacity-30 translate-z-0 cosmic-drift" style={{ animationDelay: '10s' }} />
      </div>

      {/* Planet Background Slider Area */}
      <div 
        className={`absolute inset-0 z-0 transition-all duration-1000 ${selectedPlanetId !== null ? 'bg-black/60 backdrop-blur-sm' : ''}`}
        onClick={() => setSelectedPlanetId(null)}
      >
          {portfolioData.planets.map((p) => (
             <BackgroundPlanet 
               key={`planet-${p.id}`} 
               id={p.id}
               title={p.title} 
               img={p.img} 
               behance={p.behance}
               isSelected={selectedPlanetId === p.id}
               onSelect={(id) => setSelectedPlanetId(id === -1 ? null : id)} 
             />
          ))}
      </div>

      {/* Sidebar - Integrated with the new aesthetic */}
      <aside className="w-80 shrink-0 h-full p-4 z-20">
        <div className="h-full pixel-window-v2 flex flex-col p-6 overflow-hidden">
          <div className="pixel-header-v2 -mx-6 -mt-6 mb-8">
             <div className="px-4 flex items-center gap-2">
                <Shield size={14} />
                <span className="text-[10px] font-mono">SYSTEM_UNIT_01</span>
             </div>
          </div>

          <div className="mb-10 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-4 border-white/10 p-1 bg-[#d946ef]/10 shadow-[0_0_30px_rgba(217,70,239,0.2)] overflow-hidden">
              <img 
                src={portfolioData.profile.avatar} 
                alt={portfolioData.profile.name} 
                className="w-full h-full object-cover grayscale contrast-125 image-render-pixel hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="text-lg font-bold text-white uppercase mt-4 tracking-[0.3em]">{portfolioData.profile.name}</h1>
            <p className="text-[8px] text-[#d946ef] font-bold uppercase mt-1 tracking-[0.5em]">{portfolioData.profile.role}</p>
          </div>

          <nav className="flex-1 space-y-4">
            <div className="text-[8px] text-white/30 mb-4 uppercase tracking-[0.4em] font-bold">Protocols:</div>
            
            {portfolioData.navigation.map((item) => (
              <button 
                key={`nav-${item.id}`}
                onClick={() => toggleWindow(item.id as keyof typeof activeWindows)}
                className={`w-full pixel-btn-v3 flex items-center justify-center gap-4 ${activeWindows[item.id as keyof typeof activeWindows] ? 'active' : ''}`}
              >
                <div className="shrink-0">{getIcon(item.icon)}</div>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Execution Area */}
      <main className="flex-1 relative z-10 w-full overflow-hidden flex items-center justify-center">
         <AnimatePresence>
            {/* BIO WINDOW */}
      <PixelWindow 
              key="window-bio"
              title="MISSION_CONTROL::PILOT_LOG.DAT" 
              isOpen={activeWindows.bio} 
              onClose={() => toggleWindow('bio')}
              icon={<User size={14} />}
            >
              <div className="flex flex-col items-center">
                 {/* Profile Section like screenshot */}
                 <div className="relative mb-8">
                    <div className="w-40 h-40 rounded-full border-4 border-white/20 p-2 bg-[#2e1065]/60 overflow-hidden shadow-[0_0_40px_rgba(217,70,239,0.3)]">
                       <div className="w-full h-full rounded-full border-2 border-white/40 overflow-hidden relative">
                          <div className="absolute inset-0 opacity-20 z-0" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                          <img 
                            src={portfolioData.profile.pilot_avatar} 
                            alt="Pilot" 
                            className="w-full h-full object-cover image-render-pixel relative z-10"
                            referrerPolicy="no-referrer"
                          />
                       </div>
                    </div>
                 </div>

                 <div className="w-full space-y-8">
                    <h3 className="text-sm font-bold text-white tracking-[0.3em] pl-3 mb-8 text-center uppercase">
                      My Contacts:
                    </h3>
                    
                    <div className="grid gap-6 max-w-md mx-auto">
                      {portfolioData.profile.contacts.map((contact, i) => (
                        <div 
                          key={i}
                          className="flex items-center gap-6 group cursor-pointer"
                        >
                          <div className="w-14 h-14 rounded-full bg-[#d946ef]/20 border-2 border-[#d946ef]/60 flex items-center justify-center text-[#d946ef] group-hover:bg-[#d946ef] group-hover:text-white transition-all duration-300">
                             {getIcon(contact.type, 22)}
                          </div>
                          <span className="text-sm md:text-base font-bold text-white/80 group-hover:text-white transition-colors tracking-tight">{contact.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center pt-8">
                       <button 
                         onClick={() => toggleWindow('bio')}
                         className="px-10 py-3 bg-[#d946ef] text-white font-bold text-sm border-2 border-white/40 hover:brightness-125 transition-all shadow-lg"
                       >
                         GOT IT!
                       </button>
                    </div>
                 </div>
              </div>
            </PixelWindow>

            {/* PORTFOLIO WINDOW */}
            <PixelWindow 
              key="window-portfolio"
              title="VOYAGER_ARCHIVE::PROJECTS.PKG" 
              isOpen={activeWindows.portfolio} 
              onClose={() => toggleWindow('portfolio')}
              icon={<Video size={14} />}
            >
              <div className="space-y-12">
                <div className="flex items-center gap-4 border-l-4 border-hero-red pl-4">
                  <h3 className="text-xl font-bold italic tracking-tighter text-white uppercase">RELIQUARY_OF_WORK</h3>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                   {portfolioData.portfolio_projects.map((project, idx) => (
                     <ProjectCard key={idx} title={project.title} desc={project.desc} category={project.category} />
                   ))}
                </div>
                <div className="flex flex-col items-center gap-6 border-t-4 border-white/10 pt-12 pb-6">
                  <a href={portfolioData.profile.behance_url} target="_blank" className="pixel-button bg-hero-blue text-white flex items-center gap-6 text-sm px-10 py-5">
                    LINK_TO_BEHANCE <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </PixelWindow>
            
            {/* Additional windows would follow similar rocky/cosmic theme updates */}
         </AnimatePresence>
      </main>

      {/* Frame Rocket Decor */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
         <div className="w-10 h-10 rocky-border flex items-center justify-center bg-hero-red text-white">
            <Rocket size={16} />
         </div>
         <div className="w-10 h-10 rocky-border flex items-center justify-center bg-hero-blue text-white">
            <Globe size={16} />
         </div>
      </div>
    </div>
  );
}

const ProjectCard = ({ title, desc, category }: { title: string, desc: string, category: string, key?: React.Key }) => (
  <div className="rocky-window group relative overflow-hidden">
    <div className="aspect-video relative overflow-hidden border-b-4 border-hero-red">
      <img 
        src={`https://picsum.photos/seed/${title}/600/400`} 
        alt={title} 
        className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 image-render-pixel scale-110 group-hover:scale-100"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-hero-purple/20 opacity-40 group-hover:opacity-0 transition-opacity" />
    </div>
    <div className="p-3 bg-black/60 group-hover:bg-hero-blue/10 transition-colors">
      <div className="text-[7px] text-hero-blue mb-1 font-bold tracking-[0.2em]">{category}</div>
      <h3 className="text-white text-[10px] md:text-sm font-bold uppercase tracking-tighter">{title}</h3>
      <p className="text-[8px] text-gray-500 mt-1 leading-tight h-8 overflow-hidden font-mono">{desc}</p>
    </div>
  </div>
);
