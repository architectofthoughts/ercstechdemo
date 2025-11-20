
import React from 'react';
import { SnapshotEntry } from '../types';
import { CardVisual } from './CardVisual';
import { THEME } from '../data';

interface SnapshotItemProps {
  entry: SnapshotEntry;
}

export const SnapshotItem: React.FC<SnapshotItemProps> = ({ entry }) => {
  return (
    <div className="relative flex flex-row items-start p-1 group">
      {/* Selection Glow Background */}
      <div className="absolute inset-0 bg-stone-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)] skew-x-[-2deg]"></div>
      
      {/* Main Content Container */}
      <div className="relative z-10 flex w-full flex-row items-center p-4 border-b border-stone-700/50 group-hover:border-transparent transition-colors">
        
        {/* Left: Card Visual (Thumbnail) */}
        <div className="flex-shrink-0 w-20 md:w-24 mr-6 relative">
            {/* Thumbnail Frame */}
            <div className="absolute -inset-1 border border-stone-600 group-hover:border-cyan-400/50 transition-colors"></div>
            <CardVisual 
              imageUrl={entry.imageUrl} 
              rarity={entry.rarity} 
              stats={entry.stats} 
              className="shadow-black shadow-lg"
            />
        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col h-full justify-between min-h-[100px]">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-3">
                 {/* Character Name with Zelda-like emphasis */}
                 <h3 className={`${THEME.fonts.heading} ${THEME.textSizes.cardTitle} font-bold text-amber-50 group-hover:text-cyan-50 transition-colors`}>
                    {entry.characterName}
                 </h3>
                 {/* Badges */}
                 <div className="flex gap-2">
                    {entry.badges.map((badge, idx) => (
                    <span 
                        key={idx} 
                        className={`px-2 py-0.5 text-[10px] ${THEME.fonts.body} font-bold tracking-wider uppercase border ${badge.color} backdrop-blur-md`}
                    >
                        {badge.label}
                    </span>
                    ))}
                </div>
            </div>
            
            {/* Date - Monospace/Tech look */}
            <div className="text-right">
                <span className={`${THEME.textSizes.cardMeta} ${THEME.fonts.body} font-medium text-stone-400 group-hover:text-cyan-400 transition-colors tracking-widest`}>
                    {entry.acquiredDate}
                </span>
            </div>
          </div>

          {/* Stats / Sub-info Line */}
          <div className="flex items-center gap-4 mb-3">
             <div className="h-px w-8 bg-stone-600 group-hover:bg-cyan-500/50 transition-colors"></div>
             <span className={`text-xs ${THEME.fonts.body} text-stone-500 uppercase tracking-widest`}>{entry.rarity} CLASS</span>
          </div>

          {/* Bottom Row: Log Description */}
          <div className="mt-auto">
              <p className={`${THEME.textSizes.cardBody} ${THEME.fonts.heading} text-stone-300 leading-relaxed font-light`}>
                  <span className={`inline-block px-1.5 py-0.5 bg-stone-900 text-amber-500 text-xs ${THEME.fonts.mono} mr-2 border border-stone-700 rounded-sm`}>
                      {entry.acquiredTime}
                  </span>
                  {entry.acquisitionMethod}
              </p>
          </div>
        </div>

        {/* Decorative Triangle at the end (Selection Indicator) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-cyan-400 border-b-[6px] border-b-transparent"></div>
        </div>

      </div>
    </div>
  );
};
