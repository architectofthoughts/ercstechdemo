import React, { useState, useEffect } from 'react';
import { THEME } from '../themeConfig';
import { getAssetPath } from '../src/assetConfig';

interface GachaSceneProps {
    onComplete: () => void;
}

const GachaScene: React.FC<GachaSceneProps> = ({ onComplete }) => {
    const [state, setState] = useState<'READY' | 'DECK_APPEAR' | 'SCATTER' | 'REVEAL'>('READY');
    const [revealedItems, setRevealedItems] = useState<number[]>([]);

    const items = [
        { type: 'CHARACTER', name: 'Subject: ALPHA', rarity: 'SSR', color: 'text-botw-gold', image: getAssetPath('gacha', 'gacha_alpha'), glow: 'shadow-[0_0_30px_rgba(255,215,0,0.8)] border-magical-gold' },
        { type: 'GADGET', name: 'Retro Controller', rarity: 'R', color: 'text-botw-blue', emoji: '🎮', glow: 'border-magical-blue' },
        { type: 'GADGET', name: 'Save Disk', rarity: 'R', color: 'text-botw-blue', emoji: '💾', glow: 'border-magical-blue' },
        { type: 'CHARACTER', name: 'Subject: OMEGA', rarity: 'SR', color: 'text-red-400', image: getAssetPath('gacha', 'gacha_omega'), glow: 'shadow-[0_0_30px_rgba(147,51,234,0.8)] border-purple-500' },
        { type: 'GADGET', name: 'CRT Module', rarity: 'R', color: 'text-botw-blue', emoji: '📺', glow: 'border-magical-blue' },
    ];

    const handleStart = () => {
        setState('DECK_APPEAR');
    };

    const handleDeckClick = () => {
        setState('SCATTER');
        // Auto reveal after scatter animation
        setTimeout(() => {
            setState('REVEAL');
        }, 1500);
    };

    const handleCardClick = (idx: number) => {
        if (!revealedItems.includes(idx)) {
            setRevealedItems(prev => [...prev, idx]);
        }
    };

    // Auto reveal all for demo purposes if needed, or let user click
    // Let's let user click for the "Reveal" phase feel.

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative z-50 bg-black/95 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/assets/common/title.jpg')] bg-cover opacity-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>

            {state === 'READY' && (
                <div className="text-center z-10 animate-fadeIn">
                    <h2 className={`${THEME.fonts.heading} text-5xl text-magical-gold mb-12 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]`}>
                        STARRY SUMMON
                    </h2>
                    <button
                        onClick={handleStart}
                        className="group relative px-16 py-5 bg-magical-gold/10 border border-magical-gold text-magical-gold font-bold tracking-[0.2em] hover:bg-magical-gold hover:text-black transition-all duration-500 overflow-hidden"
                    >
                        <span className="relative z-10">INITIATE SEQUENCE</span>
                        <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12"></div>
                    </button>
                </div>
            )}

            {state === 'DECK_APPEAR' && (
                <div
                    className="cursor-pointer animate-[float_3s_ease-in-out_infinite] z-10 group"
                    onClick={handleDeckClick}
                >
                    <div className="relative w-48 h-72 bg-magical-uiDark border-2 border-magical-gold rounded-xl shadow-[0_0_50px_rgba(255,215,0,0.3)] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_80px_rgba(255,215,0,0.6)]">
                        {/* Deck Pattern */}
                        <div className="absolute inset-4 border border-magical-gold/30 rounded-lg flex items-center justify-center">
                            <div className="w-24 h-24 border-2 border-magical-gold/50 rotate-45 flex items-center justify-center">
                                <div className="w-16 h-16 bg-magical-gold/10 rotate-45"></div>
                            </div>
                        </div>
                        <div className="absolute bottom-8 text-magical-gold/50 text-xs tracking-[0.3em] font-serif">TAP TO OPEN</div>

                        {/* Stack Effect */}
                        <div className="absolute top-1 left-1 w-full h-full bg-magical-uiDark border border-magical-gold/50 rounded-xl -z-10"></div>
                        <div className="absolute top-2 left-2 w-full h-full bg-magical-uiDark border border-magical-gold/30 rounded-xl -z-20"></div>
                    </div>
                </div>
            )}

            {(state === 'SCATTER' || state === 'REVEAL') && (
                <div className="w-full max-w-7xl h-96 relative flex items-center justify-center z-10">
                    {items.map((item, idx) => {
                        // Calculate scatter positions
                        // Center is 0, others spread out
                        const offset = (idx - 2) * 220; // Spread by 220px
                        const rotate = (idx - 2) * 5; // Slight rotation

                        const isRevealed = revealedItems.includes(idx);

                        // Animation delays for scatter
                        const delay = idx * 0.1;

                        return (
                            <div
                                key={idx}
                                onClick={() => state === 'REVEAL' && handleCardClick(idx)}
                                className={`
                                    absolute w-48 h-72 transition-all duration-700 ease-out cursor-pointer perspective-1000
                                    ${state === 'SCATTER' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}
                                `}
                                style={{
                                    transform: state === 'SCATTER'
                                        ? `translate(0px, 0px) rotate(0deg)`
                                        : `translate(${offset}px, 0px) rotate(${rotate}deg)`,
                                    animation: state === 'SCATTER' ? `scatter 0.5s ease-out forwards ${delay}s` : 'none',
                                    zIndex: isRevealed ? 50 : 10 + idx
                                }}
                            >
                                <div className={`
                                    relative w-full h-full transition-all duration-500 transform-style-3d
                                    ${isRevealed ? 'rotate-y-180' : ''}
                                    ${!isRevealed && state === 'REVEAL' ? 'hover:-translate-y-4' : ''}
                                `}
                                    style={{ transformStyle: 'preserve-3d', transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                                >
                                    {/* CARD BACK */}
                                    <div className={`
                                        absolute inset-0 backface-hidden bg-magical-uiDark border-2 rounded-xl flex items-center justify-center
                                        ${item.glow}
                                        shadow-lg
                                    `}>
                                        <div className="w-full h-full bg-[url('/assets/card_back.png')] bg-cover opacity-50 rounded-lg"></div>
                                        {/* Glow Pulse for SSR/SR */}
                                        {(item.rarity === 'SSR' || item.rarity === 'SR') && (
                                            <div className={`absolute inset-0 rounded-xl animate-pulse ${item.rarity === 'SSR' ? 'bg-yellow-500/20' : 'bg-purple-500/20'}`}></div>
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 border border-white/30 rotate-45"></div>
                                        </div>
                                    </div>

                                    {/* CARD FRONT */}
                                    <div className={`
                                        absolute inset-0 backface-hidden bg-magical-uiDark border border-magical-gold rounded-xl overflow-hidden
                                        rotate-y-180 shadow-[0_0_30px_rgba(0,0,0,0.5)]
                                    `}
                                        style={{ transform: 'rotateY(180deg)' }}
                                    >
                                        {/* Header */}
                                        <div className="h-8 bg-black/50 flex items-center justify-between px-3 border-b border-white/10">
                                            <span className={`text-xs font-bold ${item.color}`}>{item.type}</span>
                                            <span className="text-xs text-white/50">{item.rarity}</span>
                                        </div>

                                        {/* Image/Content */}
                                        <div className="h-48 relative flex items-center justify-center bg-gradient-to-b from-black/20 to-black/60">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-6xl filter drop-shadow-lg">{item.emoji}</span>
                                            )}

                                            {/* Rarity Shine Effect */}
                                            {item.rarity === 'SSR' && (
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-200/20 to-transparent animate-shine pointer-events-none"></div>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="absolute bottom-0 w-full p-3 bg-black/80 border-t border-white/10">
                                            <div className={`${THEME.fonts.heading} text-center text-sm text-magical-text truncate`}>{item.name}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Completion Button */}
            {revealedItems.length === items.length && (
                <div className="absolute bottom-12 z-20 animate-fadeIn">
                    <button
                        onClick={onComplete}
                        className="px-8 py-3 border border-magical-gold/30 text-magical-gold hover:bg-magical-gold/10 transition-colors tracking-widest uppercase text-sm"
                    >
                        Confirm Acquisition
                    </button>
                </div>
            )}

            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                @keyframes scatter {
                    0% { opacity: 0; transform: translate(0,0) scale(0.5); }
                    100% { opacity: 1; transform: var(--target-transform); }
                }
                @keyframes shine {
                    0% { transform: translateX(-100%) translateY(-100%); }
                    100% { transform: translateX(100%) translateY(100%); }
                }
                .animate-shine { animation: shine 3s infinite; }
            `}</style>
        </div>
    );
};

export default GachaScene;
