import React from 'react';

interface VictoryScreenProps {
  onBackToMenu: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ onBackToMenu }) => {
  return (
    <div 
        onClick={onBackToMenu}
        className="w-full h-full flex flex-col items-center justify-center relative z-50 cursor-pointer overflow-hidden"
    >
      {/* Background Flare */}
      <div className="absolute inset-0 bg-gradient-to-b from-botw-gold/10 to-transparent pointer-events-none"></div>
      
      {/* Main Text with Dual Layer */}
      <h1 className="text-8xl font-serif font-bold text-botw-cream tracking-widest animate-victory-reveal drop-shadow-[0_0_30px_rgba(226,199,116,0.3)]">
        TRIAL COMPLETE
      </h1>
      <h1 className="absolute text-8xl font-serif font-bold text-transparent stroke-botw-gold tracking-widest animate-victory-reveal opacity-30 blur-md" style={{ WebkitTextStroke: '1px #e2c774' }}>
        TRIAL COMPLETE
      </h1>

      {/* Ornamental Divider */}
      <div className="mt-12 flex items-center gap-4 opacity-0 animate-[fade-in_2s_ease-out_forwards_1s]">
          <div className="w-32 h-[1px] bg-gradient-to-l from-botw-gold to-transparent"></div>
          <div className="w-2 h-2 bg-botw-gold rotate-45"></div>
          <div className="w-32 h-[1px] bg-gradient-to-r from-botw-gold to-transparent"></div>
      </div>

      <p className="mt-8 font-serif text-botw-gold/80 tracking-[0.4em] text-sm opacity-0 animate-[fade-in_2s_ease-out_forwards_1.5s] uppercase">
          The path opens before you
      </p>

      <div className="absolute bottom-20 text-xs font-serif text-zinc-500 tracking-widest opacity-0 animate-[fade-in_1s_ease-out_forwards_3s]">
        Tap screen to return
      </div>
      
      {/* Dust Particles */}
      <div className="absolute inset-0 pointer-events-none animate-particles opacity-30">
          {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="absolute bg-botw-gold rounded-full"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 4}px`,
                    height: `${Math.random() * 4}px`,
                    animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
          ))}
      </div>
    </div>
  );
};

export default VictoryScreen;