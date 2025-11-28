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
  const isBoss = enemy.id.startsWith('boss');

  return (
    <div className={`relative flex flex-col items-center transition-transform duration-500 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
      {/* Intent Icon */}
      <div className={`mb-2 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <IntentIcon intent={enemy.intent} />
      </div>

      {/* Enemy Visual */}
      <div className={`relative flex items-center justify-center transition-all duration-300 ${isBoss ? 'w-64 h-64' : 'w-32 h-32'}`}>
        {/* Shadow */}
        <div className="absolute bottom-0 w-full h-4 bg-black/40 blur-md rounded-[50%] transform scale-x-150 translate-y-2"></div>

        {isBoss ? (
          // BOSS VISUAL - Complex, Multi-layered
          <div className="relative w-full h-full animate-[float_4s_ease-in-out_infinite]">
            {/* Aura */}
            <div className="absolute inset-0 bg-red-900/20 blur-xl rounded-full animate-pulse"></div>

            {/* Main Body - Spiky Construct */}
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(220,20,60,0.6)]">
              {/* Rotating Back Ring */}
              <g className="origin-center animate-[spin_10s_linear_infinite]">
                <path d="M100 20 L120 50 L180 50 L150 80 L160 140 L100 110 L40 140 L50 80 L20 50 L80 50 Z" fill="none" stroke="#4a0404" strokeWidth="2" />
              </g>

              {/* Inner Core */}
              <path d="M100 40 L140 80 L100 160 L60 80 Z" fill="#2a0a0a" stroke="#800000" strokeWidth="3" />
              <circle cx="100" cy="80" r="15" fill="#ff0000" className="animate-pulse" />

              {/* Floating "Crown" Parts */}
              <path d="M70 60 L60 20 L90 40" fill="#1a0505" stroke="#ff4444" strokeWidth="2" className="animate-[bounce_2s_infinite]" />
              <path d="M130 60 L140 20 L110 40" fill="#1a0505" stroke="#ff4444" strokeWidth="2" className="animate-[bounce_2s_infinite_0.5s]" />
            </svg>
          </div>
        ) : (
          // NORMAL ENEMY VISUAL
          <div className="relative w-24 h-24 animate-[float_3s_ease-in-out_infinite]">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
              <path d="M50 20 L80 50 L50 90 L20 50 Z" fill="#1a1a1a" stroke="#555" strokeWidth="2" />
              <circle cx="50" cy="50" r="10" fill="#a00" className="animate-pulse" />
            </svg>
          </div>
        )}

        {/* Hit Effect Overlay */}
        <div className="absolute inset-0 bg-white mix-blend-overlay opacity-0 animate-ping pointer-events-none"></div>
      </div>

      {/* Health Bar */}
      <div className={`mt-4 relative ${isBoss ? 'w-64' : 'w-32'}`}>
        {isBoss && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-500 font-black tracking-[0.3em] text-xs uppercase drop-shadow-md whitespace-nowrap">
            ⚠ Threat Level: Omega ⚠
          </div>
        )}

        <div className={`h-3 bg-black/60 rounded-full overflow-hidden border ${isBoss ? 'border-red-900 shadow-[0_0_10px_rgba(255,0,0,0.3)]' : 'border-zinc-700'}`}>
          <div
            className={`h-full transition-all duration-300 ${isBoss ? 'bg-gradient-to-r from-red-900 via-red-600 to-red-900' : 'bg-red-700'}`}
            style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
          ></div>
        </div>

        {/* HP Text */}
        <div className={`text-center font-serif font-bold mt-1 ${isBoss ? 'text-red-400 text-lg' : 'text-zinc-400 text-xs'}`}>
          {enemy.hp} <span className="text-zinc-600 text-[0.6em]">/ {enemy.maxHp}</span>
        </div>
      </div>
    </div>
  );
};

export default Enemy;