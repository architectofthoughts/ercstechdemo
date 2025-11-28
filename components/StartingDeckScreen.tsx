import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../themeConfig';
import { Card, CardType } from '../types';
import { getAssetPath } from '../src/assetConfig';
import CardComponent from './CardComponent';

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
            className="relative group w-[8rem] h-[12rem]" // Fixed size container for the grid
        >
            <div className="absolute top-0 left-0 transform origin-top-left scale-[0.66] group-hover:scale-[0.75] group-hover:z-50 transition-all duration-200">
                <CardComponent
                    card={card}
                    playerMana={99} // Always affordable in deck view
                />
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
