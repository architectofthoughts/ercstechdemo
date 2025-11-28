import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../themeConfig';
import { getAssetPath } from '../src/assetConfig';

interface ActSelectScreenProps {
    onSelectAct: (actNumber: number) => void;
    onBackToMenu: () => void;
}

const ActSelectScreen: React.FC<ActSelectScreenProps> = ({ onSelectAct, onBackToMenu }) => {
    const acts = [
        { id: 1, title: "ACT I", subtitle: "The Beginning", locked: false, imageColor: "bg-emerald-900" },
        { id: 2, title: "ACT II", subtitle: "The Journey", locked: true, imageColor: "bg-blue-900" },
        { id: 3, title: "ACT III", subtitle: "The Finale", locked: true, imageColor: "bg-red-900" },
    ];

    return (
        <div className="w-full h-full bg-botw-dark text-botw-cream flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />

            {/* Header */}
            <div className="absolute top-8 left-0 w-full px-8 flex justify-between items-start z-20">
                <button
                    onClick={onBackToMenu}
                    className="group flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"
                >
                    <div className="w-8 h-8 border border-botw-gold rotate-45 flex items-center justify-center group-hover:bg-botw-gold/20 transition-colors">
                        <div className="w-2 h-2 bg-botw-gold -rotate-45"></div>
                    </div>
                    <span className="font-serif text-botw-gold text-sm tracking-widest uppercase">Return</span>
                </button>

                <div className="text-right">
                    <h1 className={`${THEME.fonts.heading} text-4xl text-botw-gold`}>ACT SELECTION</h1>
                    <p className="text-xs tracking-widest opacity-60 mt-1">CHOOSE YOUR PATH</p>
                </div>
            </div>

            {/* Act Cards */}
            <div className="flex gap-8 z-10">
                {acts.map((act, index) => {
                    const imagePath = getAssetPath('acts', act.id);
                    return (
                        <motion.div
                            key={act.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            onClick={() => !act.locked && onSelectAct(act.id)}
                            className={`
              relative w-64 h-96 border transition-all duration-300 group
              ${act.locked
                                    ? 'border-zinc-800 bg-zinc-900/50 cursor-not-allowed grayscale opacity-50'
                                    : 'border-botw-uiBorder bg-botw-uiDark cursor-pointer hover:border-botw-gold hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(226,199,116,0.2)]'
                                }
            `}
                        >
                            {/* Image Placeholder */}
                            <div className={`absolute inset-0 ${act.imageColor} opacity-20 transition-opacity group-hover:opacity-40`} />
                            {imagePath && (
                                <img
                                    src={imagePath}
                                    alt={act.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity mix-blend-overlay"
                                />
                            )}

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center">
                                <div className="text-6xl font-serif font-bold mb-4 opacity-20">{act.id}</div>
                                <h2 className={`${THEME.fonts.heading} text-3xl mb-2 ${act.locked ? 'text-zinc-600' : 'text-botw-cream'}`}>
                                    {act.title}
                                </h2>
                                <p className="text-xs tracking-widest uppercase opacity-60">
                                    {act.subtitle}
                                </p>

                                {act.locked && (
                                    <div className="mt-8 px-4 py-1 border border-zinc-700 text-zinc-500 text-[0.6rem] tracking-widest uppercase">
                                        LOCKED
                                    </div>
                                )}
                            </div>

                            {/* Decorative Corners */}
                            {!act.locked && (
                                <>
                                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-botw-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-botw-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-botw-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-botw-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                </>
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
};

export default ActSelectScreen;
