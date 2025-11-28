import React, { useState } from 'react';
import { Card, CardType } from '../types';
import CardComponent from './CardComponent';

interface RewardScreenProps {
    onBackToMenu: () => void;
}

const RewardScreen: React.FC<RewardScreenProps> = ({ onBackToMenu }) => {
    const [view, setView] = useState<'list' | 'cardSelect'>('list');
    const [goldCollected, setGoldCollected] = useState(false);
    const [cardCollected, setCardCollected] = useState(false);

    // Mock Reward Cards
    const rewardCards: Card[] = [
        { id: 801, name: "Divine Strike", cost: 2, description: "Deal 30 damage. Heal 10 HP.", type: CardType.ATTACK },
        { id: 802, name: "Ancient Shield", cost: 1, description: "Gain 20 Block. Draw 1 card.", type: CardType.SKILL },
        { id: 803, name: "Time Warp", cost: 3, description: "Take an extra turn.", type: CardType.POWER },
    ];

    const handleGoldClick = () => {
        if (!goldCollected) {
            setGoldCollected(true);
        }
    };

    const handleCardRewardClick = () => {
        if (!cardCollected) {
            setView('cardSelect');
        }
    };

    const handleCardSelect = (card: Card) => {
        setCardCollected(true);
        setView('list');
    };

    if (view === 'cardSelect') {
        return (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
                <h2 className="text-4xl font-serif text-botw-gold mb-12 tracking-widest drop-shadow-md">CHOOSE A CARD</h2>
                <div className="flex gap-8">
                    {rewardCards.map((card, index) => (
                        <div
                            key={card.id}
                            className="transform hover:scale-110 transition-transform duration-300 cursor-pointer animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => handleCardSelect(card)}
                        >
                            <CardComponent card={card} playerMana={99} style={{ pointerEvents: 'none' }} />
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => setView('list')}
                    className="mt-12 text-zinc-500 hover:text-botw-cream font-serif tracking-widest uppercase text-sm"
                >
                    Skip Reward
                </button>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-2xl p-1 bg-gradient-to-b from-botw-gold/50 to-transparent rounded-lg">
                <div className="bg-botw-slate border border-botw-gold/30 p-12 rounded-lg flex flex-col items-center relative overflow-hidden">

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-botw-gold/20 rounded-tl-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-botw-gold/20 rounded-br-3xl"></div>

                    <h1 className="text-6xl font-serif text-botw-gold mb-2 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(226,199,116,0.5)]">VICTORY</h1>
                    <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-botw-gold to-transparent mb-12"></div>

                    <div className="w-full space-y-4">
                        {/* Gold Reward */}
                        <div
                            onClick={handleGoldClick}
                            className={`group w-full p-6 border border-botw-gold/20 bg-black/40 hover:bg-botw-gold/10 transition-all cursor-pointer flex items-center justify-between rounded ${goldCollected ? 'opacity-50 grayscale' : ''}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-botw-gold/50 flex items-center justify-center bg-botw-gold/10 group-hover:bg-botw-gold/20 transition-colors">
                                    <span className="text-2xl">💰</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-botw-cream font-serif text-xl tracking-wide">50 Gold</span>
                                    <span className="text-zinc-500 text-xs uppercase tracking-widest">Currency</span>
                                </div>
                            </div>
                            {goldCollected && <span className="text-botw-gold font-serif tracking-widest text-sm">COLLECTED</span>}
                        </div>

                        {/* Card Reward */}
                        <div
                            onClick={handleCardRewardClick}
                            className={`group w-full p-6 border border-botw-gold/20 bg-black/40 hover:bg-botw-gold/10 transition-all cursor-pointer flex items-center justify-between rounded ${cardCollected ? 'opacity-50 grayscale' : ''}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-botw-gold/50 flex items-center justify-center bg-botw-gold/10 group-hover:bg-botw-gold/20 transition-colors">
                                    <span className="text-2xl">♠️</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-botw-cream font-serif text-xl tracking-wide">Add a Card</span>
                                    <span className="text-zinc-500 text-xs uppercase tracking-widest">Deck Building</span>
                                </div>
                            </div>
                            {cardCollected && <span className="text-botw-gold font-serif tracking-widest text-sm">COLLECTED</span>}
                        </div>
                    </div>

                    <button
                        onClick={onBackToMenu}
                        className="mt-12 px-12 py-3 bg-botw-gold/10 border border-botw-gold/30 hover:bg-botw-gold/20 hover:border-botw-gold text-botw-gold font-serif tracking-[0.2em] uppercase transition-all rounded-sm"
                    >
                        Return to Map
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RewardScreen;
