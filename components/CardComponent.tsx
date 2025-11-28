import React, { useRef, useState } from 'react';
import { Card, CardType } from '../types';
import { SwordIcon, ShieldIcon } from './icons';
import { getAssetPath } from '../src/assetConfig';

interface CardProps {
  card: Card;
  playerMana: number;
  isAnimating?: boolean;
  style?: React.CSSProperties;
  onLongPressStart?: (card: Card, position: { x: number, y: number }) => void;
  onPress?: (card: Card, event: React.MouseEvent) => void;
}

const CardComponent: React.FC<CardProps> = ({ card, playerMana, isAnimating, style, onLongPressStart, onPress }) => {
  const isAffordable = card.cost <= playerMana;
  // Using 'animate-fly-up' or similar externally, this just handles internal visuals
  const animationClass = isAnimating ? '' : 'hover:-translate-y-4 hover:scale-105 transition-transform duration-300 ease-out';

  // Styling conditionals
  const borderColor = isAffordable
    ? 'border-magical-gold/40 group-hover:border-magical-gold group-hover:shadow-magical-glow'
    : 'border-zinc-700 opacity-60 grayscale';

  const textColor = isAffordable ? 'text-magical-text' : 'text-zinc-500';
  const costColor = isAffordable ? 'text-magical-gold' : 'text-zinc-500';

  const imagePath = getAssetPath('cards', card.id);
  const [imageError, setImageError] = useState(false);

  const longPressTimeout = useRef<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;

    if (onPress) {
      onPress(card, e);
    }

    if (onLongPressStart && isAffordable) {
      longPressTimeout.current = window.setTimeout(() => {
        onLongPressStart(card, { x: e.clientX, y: e.clientY });
        longPressTimeout.current = null;
      }, 180);
    }
  };

  const clearLongPress = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  return (
    <div
      className={`group relative w-48 h-72 pointer-events-auto flex flex-col ${animationClass}`}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={clearLongPress}
      onMouseLeave={clearLongPress}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Card Container Background - Dark Glass */}
      <div className={`absolute inset-0 bg-magical-uiDark/90 backdrop-blur-sm border ${borderColor} rounded-sm transition-all duration-300`}>
        {/* Corner Ornaments */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-current opacity-50"></div>
        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-current opacity-50"></div>
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-current opacity-50"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-current opacity-50"></div>
      </div>

      {/* Inner Content */}
      <div className={`relative z-10 w-full h-full p-3 flex flex-col ${textColor}`}>

        {/* Header */}
        <div className="flex justify-between items-start mb-2 border-b border-white/10 pb-2">
          <div className={`text-xl font-serif font-bold ${costColor} drop-shadow-md`}>
            {card.cost}
            <div className="w-1 h-1 bg-current rotate-45"></div>
            <span className="text-[0.5rem] uppercase tracking-[0.2em]">{card.type === CardType.ATTACK ? 'Assault' : 'Guard'}</span>
            <div className="w-1 h-1 bg-current rotate-45"></div>
          </div>
        </div>

        {/* Art / Icon Area */}
        <div className="w-full h-24 my-1 flex items-center justify-center relative group-hover:bg-white/5 transition-colors rounded-sm overflow-hidden border border-white/10">
          {/* Inner decorative border */}
          <div className="absolute inset-1 border border-white/5 pointer-events-none z-20"></div>

          {/* Corner Accents for Art */}
          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-magical-gold/30 z-20"></div>
          <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r border-magical-gold/30 z-20"></div>
          <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l border-magical-gold/30 z-20"></div>
          <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-magical-gold/30 z-20"></div>

          <div className={`absolute inset-0 border border-white/5 ${isAffordable ? 'group-hover:border-magical-gold/30' : ''} z-20`}></div>

          {imagePath && !imageError ? (
            <img
              src={imagePath}
              alt={card.name}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity relative z-10"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {card.type === CardType.ATTACK ? (
                <SwordIcon className={`w-10 h-10 ${isAffordable ? 'text-magical-pink drop-shadow-[0_0_8px_rgba(255,105,180,0.6)]' : ''}`} />
              ) : (
                <ShieldIcon className={`w-10 h-10 ${isAffordable ? 'text-magical-blue drop-shadow-[0_0_8px_rgba(77,232,254,0.6)]' : ''}`} />
              )}
              {/* Decorative faint circle behind icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-16 h-16 border border-dashed border-white rounded-full animate-[spin_20s_linear_infinite]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Name & Type */}
        <div className="mt-2 text-center">
          <h3 className="font-serif font-bold text-sm tracking-wider text-magical-gold uppercase truncate">{card.name}</h3>
          <div className="flex items-center justify-center gap-1 mt-1 opacity-60">
            <div className="w-1 h-1 bg-current rotate-45"></div>
            <span className="text-[0.5rem] uppercase tracking-[0.2em]">{card.type === CardType.ATTACK ? 'Assault' : 'Guard'}</span>
            <div className="w-1 h-1 bg-current rotate-45"></div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-3 text-xs font-sans leading-relaxed text-center opacity-90 px-1">
          {card.description}
        </div>

        {/* Footer/Rarity Indicator */}
        <div className="mt-auto flex justify-center gap-1 opacity-40">
          <div className="w-1 h-1 rounded-full bg-magical-gold"></div>
          <div className="w-1 h-1 rounded-full bg-magical-gold"></div>
          <div className="w-1 h-1 rounded-full bg-magical-gold"></div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;