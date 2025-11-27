import React, { useState } from 'react';
import { THEME } from '../themeConfig';
import cardBunny from '../memorial/card_bunny.png';
import cardSchoolgirl from '../memorial/card_schoolgirl.png';

interface GachaSceneProps {
    onComplete: () => void;
}

const GachaScene: React.FC<GachaSceneProps> = ({ onComplete }) => {
    const [state, setState] = useState<'READY' | 'ANIMATING' | 'REVEAL'>('READY');
    const [revealedItems, setRevealedItems] = useState<number[]>([]);

    const items = [
        { type: 'CHARACTER', name: 'Subject: ALPHA', rarity: 'SSR', color: 'text-botw-gold', image: cardBunny },
        { type: 'GADGET', name: 'Retro Controller', rarity: 'R', color: 'text-botw-blue' },
        { type: 'GADGET', name: 'Save Disk', rarity: 'R', color: 'text-botw-blue' },
        { type: 'CHARACTER', name: 'Subject: OMEGA', rarity: 'SR', color: 'text-red-400', image: cardSchoolgirl },
        { type: 'GADGET', name: 'CRT Module', rarity: 'R', color: 'text-botw-blue' },
    ];

    const handlePull = () => {
        setState('ANIMATING');
        setTimeout(() => {
            setState('REVEAL');
            // Reveal items one by one
            items.forEach((_, idx) => {
                setTimeout(() => {
                    setRevealedItems(prev => [...prev, idx]);
                }, idx * 500 + 500);
            });
        }, 2000);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative z-50 bg-black/90">
            {state === 'READY' && (
                <div className="text-center">
                    <h2 className={`${THEME.fonts.heading} text-4xl text-white mb-8 tracking-widest`}>
                        DATA EXTRACTION
                    </h2>
                    <button
                        onClick={handlePull}
                        className="px-12 py-4 bg-botw-gold text-black font-bold tracking-[0.2em] hover:bg-white transition-colors clip-path-polygon"
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                    >
                        INITIATE SEQUENCE
                    </button>
                </div>
            )}

            {state === 'ANIMATING' && (
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 border-4 border-botw-blue rounded-full animate-spin border-t-transparent"></div>
                    <p className="mt-8 text-botw-blue tracking-widest animate-pulse">DECRYPTING DATA STREAMS...</p>
                </div>
            )}

            {state === 'REVEAL' && (
                <div className="w-full max-w-6xl px-8">
                    <div className="flex justify-center gap-4 flex-wrap">
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className={`
                  w-48 h-64 bg-botw-uiDark border border-botw-uiBorder flex flex-col items-center justify-center p-4
                  transition-all duration-500 transform
                  ${revealedItems.includes(idx) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'}
                `}
                            >
                                <div className={`text-xs tracking-widest mb-2 ${item.color}`}>{item.type}</div>
                                <div className={`w-20 h-20 mb-4 rounded-full border-2 flex items-center justify-center overflow-hidden ${item.type === 'CHARACTER' ? 'border-botw-gold bg-botw-gold/10' : 'border-botw-blue bg-botw-blue/10'}`}>
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl">📦</span>
                                    )}
                                </div>
                                <div className={`${THEME.fonts.heading} text-center text-sm mb-1`}>{item.name}</div>
                                <div className="text-xs text-white/50">{item.rarity}</div>
                            </div>
                        ))}
                    </div>

                    {revealedItems.length === items.length && (
                        <div className="mt-12 text-center animate-fadeIn">
                            <button
                                onClick={onComplete}
                                className="px-8 py-3 border border-botw-cream/30 text-botw-cream hover:bg-botw-cream/10 transition-colors tracking-widest"
                            >
                                CONFIRM ACQUISITION
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GachaScene;
