import React from 'react';
import { EnemyState, EnemyIntent } from '../types';
import { SwordIcon, ShieldIcon, DebuffIcon } from './icons';

interface EnemyProps {
  enemy: EnemyState;
  isAnimating?: boolean;
}

const IntentIcon: React.FC<{ intent: EnemyIntent }> = ({ intent }) => {
    const iconMap = {
        attack: <SwordIcon className="w-5 h-5 text-botw-red" />,
        defend: <ShieldIcon className="w-5 h-5 text-botw-blue" />,
        debuff: <DebuffIcon className="w-5 h-5 text-purple-400" />,
        unknown: <span className="text-lg font-serif text-botw-gold">?</span>
    };

    return (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2">
             {/* Intent Bubble */}
             <div className="bg-botw-slate border border-botw-gold/50 px-3 py-1 flex items-center gap-2 shadow-lg relative">
                {/* Triangle pointer */}
                <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-botw-slate border-b border-r border-botw-gold/50 rotate-45"></div>
                
                {iconMap[intent.type]}
                {intent.value && <span className="text-base font-serif font-bold text-botw-cream">{intent.value}</span>}
             </div>
        </div>
    );
}

const Enemy: React.FC<EnemyProps> = ({ enemy, isAnimating }) => {
  const { hp, maxHp, intent, wasHit } = enemy;
  const hpPercentage = (hp / maxHp) * 100;
  
  let animationClass = 'animate-float';
  if (isAnimating) {
    animationClass = 'animate-enemy-dissolve';
  } else if (wasHit) {
    animationClass = 'animate-enemy-hit';
  }

  return (
    <div className={`relative flex flex-col items-center group ${animationClass}`}>
      <IntentIcon intent={intent} />
      
      {/* Enemy Visual: Ancient Construct Eye */}
      <div className="w-48 h-48 mb-4 relative flex items-center justify-center">
         {/* Outer Runes */}
         <div className="absolute inset-0 border border-botw-gold/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
         <div className="absolute inset-2 border border-dashed border-botw-blue/20 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
         
         {/* Main Body */}
         <div className={`w-24 h-24 bg-botw-slate border-2 ${wasHit ? 'border-botw-red shadow-malice' : 'border-botw-gold shadow-gold-glow'} rotate-45 transition-all duration-200 flex items-center justify-center overflow-hidden`}>
             {/* Inner Eye / Core */}
             <div className={`w-12 h-12 rounded-full ${wasHit ? 'bg-botw-red animate-pulse' : 'bg-botw-blue'} shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center`}>
                <div className="w-4 h-4 bg-white rounded-full opacity-80"></div>
             </div>
             {/* Scanline over eye */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-[pulse_2s_infinite]"></div>
         </div>
         
         {/* Floating ornaments */}
         <div className="absolute -left-4 top-1/2 w-2 h-12 bg-botw-gold/20"></div>
         <div className="absolute -right-4 top-1/2 w-2 h-12 bg-botw-gold/20"></div>
      </div>

      {/* Elegant HP Bar */}
      <div className="w-40 space-y-1">
        <div className="flex justify-between text-[0.6rem] font-serif text-botw-gold tracking-widest uppercase opacity-80">
            <span>Vitality</span>
            <span>{hp} / {maxHp}</span>
        </div>
        <div className="relative w-full h-1 bg-zinc-800 flex items-center">
            <div className="absolute -left-1 w-1 h-1 bg-botw-gold rotate-45"></div>
            <div className="absolute -right-1 w-1 h-1 bg-botw-gold rotate-45"></div>
            <div
                className="h-full bg-gradient-to-r from-botw-red to-red-500 transition-all duration-300 relative"
                style={{ width: `${hpPercentage}%` }}
            >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 shadow-[0_0_5px_white] opacity-80"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Enemy;