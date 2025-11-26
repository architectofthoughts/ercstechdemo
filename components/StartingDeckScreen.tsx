import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../themeConfig';
import { Card, CardType } from '../types';

interface StartingDeckScreenProps {
    deck: Card[];
    onStartGame: () => void;
}

const StartingDeckScreen: React.FC<StartingDeckScreenProps> = ({ deck, onStartGame }) => {
    // Group cards by type for better visualization
    const attacks = deck.filter(c => c.type === CardType.ATTACK);
    const skills = deck.filter(c => c.type === CardType.SKILL);
    const powers = deck.filter(c => c.type === CardType.POWER || c.type === CardType.STATUS || c.type === CardType.CURSE);

    const renderCard = (card: Card, index: number) => (
        <motion.div
            key={`${card.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
        relative w-32 h-48 rounded-lg border border-botw-uiBorder bg-botw-uiDark/80 
        flex flex-col p-2 gap-1 group hover:scale-110 hover:z-10 transition-transform duration-200
        ${card.type === CardType.ATTACK ? 'shadow-[0_0_10px_rgba(255,62,62,0.2)]' :
                    card.type === CardType.SKILL ? 'shadow-[0_0_10px_rgba(77,232,254,0.2)]' :
                        'shadow-[0_0_10px_rgba(226,199,116,0.2)]'}
      `}
        >
            {/* Cost */}
            <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-botw-blue text-black font-bold flex items-center justify-center text-xs border border-white">
                {card.cost}
            </div>

            {/* Image Placeholder */}
            <div className={`w-full h-20 rounded mb-1 ${card.type === CardType.ATTACK ? 'bg-red-900/40' :
                    card.type === CardType.SKILL ? 'bg-blue-900/40' :
                        'bg-yellow-900/40'
                } flex items-center justify-center`}>
                <span className="text-[0.6rem] opacity-50 uppercase tracking-widest">{CardType[card.type]}</span>
            </div>

            {/* Name */}
            <div className="text-center">
                <h4 className="text-xs font-bold text-botw-cream leading-tight">{card.name}</h4>
            </div>

            {/* Description */}
            <div className="mt-auto text-[0.6rem] text-zinc-400 leading-tight text-center px-1 pb-1">
                {card.description}
            </div>
        </motion.div>
    );

    return (
        <div className="w-full h-full bg-botw-dark text-botw-cream flex flex-col items-center relative overflow-hidden p-8">
            {/* Header */}
            <div className="w-full max-w-6xl flex justify-between items-end mb-8 border-b border-botw-uiBorder/50 pb-4 z-10">
                <div>
                    <h1 className={`${THEME.fonts.heading} text-4xl text-botw-cream`}>
                        DECK CONFIRMATION
                    </h1>
                    <p className={`${THEME.fonts.body} text-botw-gold/80 text-sm tracking-widest mt-1`}>
                        전투 준비 완료 // 총 {deck.length}장
                    </p>
                </div>
                <button
                    onClick={onStartGame}
                    className="px-8 py-3 bg-botw-blue/20 border border-botw-blue text-botw-blue hover:bg-botw-blue hover:text-black transition-all font-bold tracking-widest uppercase"
                >
                    START GAME
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 w-full max-w-6xl overflow-y-auto z-10 pr-4 scrollbar-hide">

                {/* Attacks */}
                {attacks.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-red-400 text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rotate-45" /> Attack Cards
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {attacks.map((card, i) => renderCard(card, i))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-blue-400 text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rotate-45" /> Skill Cards
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {skills.map((card, i) => renderCard(card, i))}
                        </div>
                    </div>
                )}

                {/* Powers/Others */}
                {powers.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-yellow-400 text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rotate-45" /> Special Cards
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {powers.map((card, i) => renderCard(card, i))}
                        </div>
                    </div>
                )}

            </div>

            {/* Background */}
            <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-botw-blue/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
    );
};

export default StartingDeckScreen;
