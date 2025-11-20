import React from 'react';
import { Card } from '../types';
import CardComponent from './CardComponent';

interface PlayerHandProps {
  cards: Card[];
  playerMana: number;
  isAnimating: boolean;
  draggedCardIds: Set<number>;
  demoMode: 'finale' | 'multiPlay' | 'spinning';
  isSpinning: boolean;
  heldCardId: number | null;
  onCardLongPress: (card: Card, position: {x: number, y: number}) => void;
  onCardPress: (card: Card, event: React.MouseEvent) => void;
  onSpinAnimationEnd: () => void;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ 
    cards, 
    playerMana,
    isAnimating, 
    draggedCardIds,
    demoMode,
    isSpinning,
    heldCardId,
    onCardLongPress,
    onCardPress,
    onSpinAnimationEnd
}) => {
    const visibleCards = cards.filter(c => !draggedCardIds.has(c.id));
    const cardCount = visibleCards.length;
    
    // BotW style usually has cleaner horizontal lists, but we keep the fan for "Hand" feel
    const spreadAngle = Math.min(cardCount * 5, 60); 
    const angleStep = cardCount > 1 ? spreadAngle / (cardCount - 1) : 0;
    const startAngle = -spreadAngle / 2;

    const animationClass = isSpinning ? 'animate-hand-spin' : '';

    return (
        <div 
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 pointer-events-none" 
            style={{ perspective: '1000px' }}
        >
            <div 
                className={`relative w-full h-full flex justify-center items-end ${animationClass}`}
                style={{ transformStyle: 'preserve-3d' }}
                onAnimationEnd={isSpinning ? onSpinAnimationEnd : undefined}
            >
                {visibleCards.map((card, index) => {
                    const rotate = startAngle + (index * angleStep);
                    const isHeldForSwipe = demoMode === 'spinning' && heldCardId === card.id;
                    
                    // Subtle curve
                    const absAngle = Math.abs(rotate);
                    const translateY = (absAngle * absAngle * 0.08) - (isHeldForSwipe ? 60 : 0);
                    
                    const style = {
                        transform: `rotate(${rotate}deg) translateY(${translateY}px) translateZ(${Math.abs(index - cardCount/2) * 5}px)`,
                        transformOrigin: 'bottom center',
                        zIndex: index + (isHeldForSwipe ? 100 : 0),
                        position: 'absolute' as const,
                    };

                    return (
                        <div key={card.id} className="pointer-events-auto transition-transform duration-200 ease-out" style={{ position: 'absolute', bottom: '2rem', left: '50%', marginLeft: '-6rem' }}>
                             <CardComponent 
                                card={card} 
                                playerMana={playerMana}
                                isAnimating={isAnimating} 
                                style={style} 
                                onLongPressStart={onCardLongPress}
                                onPress={onCardPress}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlayerHand;