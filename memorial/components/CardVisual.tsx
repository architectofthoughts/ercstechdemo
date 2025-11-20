import React from 'react';
import { Rarity, CardStats } from '../types';
import { ASSETS } from '../data';

interface CardVisualProps {
  imageUrl: string;
  rarity: Rarity;
  stats: CardStats;
  className?: string;
}

export const CardVisual: React.FC<CardVisualProps> = ({ imageUrl, rarity, stats, className = "" }) => {
  // Rarity styling map - Darker, more muted metallic tones
  const rarityStyles = {
    [Rarity.UNIQUE]: {
      border: "border-purple-800",
      gem: "bg-purple-500 shadow-purple-500/50"
    },
    [Rarity.MYSTIC_RARE]: {
      border: "border-amber-600",
      gem: "bg-amber-400 shadow-amber-400/50"
    },
    [Rarity.LEGENDARY]: {
      border: "border-red-800",
      gem: "bg-red-500 shadow-red-500/50"
    },
    [Rarity.COMMON]: {
      border: "border-stone-500",
      gem: "bg-stone-400"
    }
  };

  const style = rarityStyles[rarity] || rarityStyles[Rarity.COMMON];

  return (
    <div className={`relative aspect-[2/3] overflow-hidden border-[2px] ${style.border} bg-stone-900 ${className} group`}>
      {/* Background Image */}
      <img 
        src={imageUrl} 
        alt="Character" 
        onError={(e) => {
            // Fallback if local image isn't found
            (e.target as HTMLImageElement).src = ASSETS.placeholderCard;
        }}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 group-hover:opacity-100 transition-opacity"
      />

      {/* Inner Shadow / Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-10 pointer-events-none"></div>

      {/* Stats Overlay (Minimalist) */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-20 px-1 py-0.5 border-t border-white/10 flex justify-between">
          <div className="flex gap-1">
            <span className="text-[8px] text-stone-400">ATK</span>
            <span className="text-[9px] font-bold text-white">{stats.atk}</span>
          </div>
          <div className="flex gap-1">
            <span className="text-[8px] text-stone-400">DEF</span>
            <span className="text-[9px] font-bold text-white">{stats.def}</span>
          </div>
      </div>

      {/* Rarity Corner Gem */}
      <div className={`absolute top-1 right-1 w-2 h-2 rotate-45 ${style.gem} z-30 shadow-lg`}></div>
    </div>
  );
};