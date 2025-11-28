import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '../src/assetConfig';

interface GuideSubtitleProps {
    text: string;
    visible?: boolean;
}

const GuideSubtitle: React.FC<GuideSubtitleProps> = ({ text, visible = true }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const portraitPath = getAssetPath('guide', 'rumi_portrait');

    if (!visible) return null;

    return (
        <div className="fixed right-8 bottom-48 z-50 flex flex-col items-end pointer-events-none font-['Nanum_Gothic_Coding',_monospace]">
            <AnimatePresence mode="wait">
                {!isMinimized ? (
                    <motion.div
                        key="maximized"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="flex items-end gap-[-10px] pointer-events-auto cursor-pointer group"
                        onClick={() => setIsMinimized(true)}
                    >
                        {/* Dialogue Box */}
                        <div className="relative mr-[-15px] z-10 mb-4">
                            {/* SVG Frame Background */}
                            <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(77,232,254,0.3)]" viewBox="0 0 300 100" preserveAspectRatio="none">
                                <path
                                    d="M 10 0 L 290 0 L 300 10 L 300 90 L 290 100 L 10 100 L 0 90 L 0 10 Z"
                                    fill="rgba(10, 14, 23, 0.9)"
                                    stroke="#4de8fe"
                                    strokeWidth="1.5"
                                    vectorEffect="non-scaling-stroke"
                                />
                                {/* Tech Details */}
                                <path d="M 15 5 L 50 5" stroke="#4de8fe" strokeWidth="1" strokeOpacity="0.5" />
                                <path d="M 15 95 L 50 95" stroke="#4de8fe" strokeWidth="1" strokeOpacity="0.5" />
                                <rect x="285" y="45" width="3" height="10" fill="#4de8fe" opacity="0.8" />
                            </svg>

                            {/* Content */}
                            <div className="relative px-8 py-6 min-w-[300px] max-w-md text-magical-text">
                                <p className="text-sm leading-relaxed whitespace-pre-line drop-shadow-md">
                                    {text}
                                </p>
                                {/* Typing Cursor Effect */}
                                <span className="inline-block w-2 h-4 bg-magical-blue ml-1 animate-pulse align-middle"></span>
                            </div>
                        </div>

                        {/* Portrait Monitor */}
                        <div className="relative w-32 h-40 flex-shrink-0 z-20">
                            {/* SVG Monitor Frame */}
                            <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(77,232,254,0.4)]" viewBox="0 0 100 120" preserveAspectRatio="none">
                                {/* Main Frame */}
                                <path
                                    d="M 10 0 L 90 0 L 100 10 L 100 110 L 90 120 L 10 120 L 0 110 L 0 10 Z"
                                    fill="rgba(5, 5, 5, 0.95)"
                                    stroke="#4de8fe"
                                    strokeWidth="2"
                                    vectorEffect="non-scaling-stroke"
                                />
                                {/* Screen Area (for clip path visual reference, actual clip is CSS) */}
                                <path
                                    d="M 8 8 L 92 8 L 92 112 L 8 112 Z"
                                    fill="#0a0e17"
                                    opacity="0.5"
                                />
                                {/* Decorative Tech Lines */}
                                <path d="M 0 30 L 5 30" stroke="#4de8fe" strokeWidth="1" />
                                <path d="M 95 30 L 100 30" stroke="#4de8fe" strokeWidth="1" />
                                <path d="M 0 90 L 5 90" stroke="#4de8fe" strokeWidth="1" />
                                <path d="M 95 90 L 100 90" stroke="#4de8fe" strokeWidth="1" />

                                {/* Status Light */}
                                <circle cx="90" cy="110" r="2" fill="#00ff00" className="animate-pulse" />
                            </svg>

                            {/* Image Container */}
                            <div className="absolute inset-[6px] overflow-hidden bg-zinc-900">
                                {/* Scanline Effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-20"></div>
                                <div className="absolute inset-0 bg-magical-blue/10 mix-blend-overlay z-10 pointer-events-none"></div>

                                {portraitPath ? (
                                    <img src={portraitPath} alt="Rumi" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-magical-uiDark text-magical-blue">
                                        <div className="text-2xl mb-1">🤖</div>
                                        <div className="text-xs font-bold tracking-widest">RUMI</div>
                                        <div className="text-[0.5rem] opacity-50 mt-1">SYSTEM ONLINE</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="minimized"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="pointer-events-auto cursor-pointer"
                        onClick={() => setIsMinimized(false)}
                    >
                        {/* Minimized Signal Icon */}
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            {/* Rotating Ring */}
                            <div className="absolute inset-0 border-2 border-magical-blue/30 rounded-full border-t-magical-blue animate-spin"></div>
                            {/* Inner Core */}
                            <div className="w-8 h-8 bg-magical-uiDark border border-magical-blue rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(77,232,254,0.5)]">
                                <div className="w-2 h-2 bg-magical-blue rounded-full animate-ping"></div>
                            </div>
                            {/* Label */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[0.6rem] text-magical-blue tracking-widest font-bold whitespace-nowrap bg-black/50 px-2 py-0.5 rounded">
                                GUIDE
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GuideSubtitle;
