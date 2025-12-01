import React, { useState, useEffect, useRef } from 'react';
import { THEME } from '../themeConfig';

interface IntroSceneProps {
    onComplete: () => void;
}

const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
    const text = "본 테크 데모는 워크데이 2~3일 정도의 제작기간을 바탕으로 Google Antigravity 를 사용해 Gemini 3.0 pro / Nano Banana Pro를 이용한 AI 작업으로 제작되었습니다.\n\n본 테크 데모의 코드는 전부 AI에 의해 작성되었으며, 이미지 교체를 제외한 모든 작업은 인간 작업자의 도움 없이 진행되었습니다.";

    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            // Adjusted typing speed: 10ms ~ 40ms (Half of previous speed)
            const delay = Math.random() * 30 + 10;
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, text]);

    return (
        <div
            onClick={onComplete}
            className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-8 cursor-pointer select-none overflow-hidden`}
            style={{ fontFamily: "'Nanum Gothic Coding', monospace" }}
        >
            {/* CRT Scanline Effect */}
            <div
                className="absolute inset-0 pointer-events-none z-20 opacity-10"
                style={{
                    background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                    backgroundSize: "100% 2px, 3px 100%"
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,_transparent_50%,_black_100%)] opacity-80"></div>

            {/* Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(0deg, transparent 24%, #00ffcc 25%, #00ffcc 26%, transparent 27%, transparent 74%, #00ffcc 75%, #00ffcc 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #00ffcc 25%, #00ffcc 26%, transparent 27%, transparent 74%, #00ffcc 75%, #00ffcc 76%, transparent 77%, transparent)',
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Main Content Container */}
            <div className="max-w-4xl w-full relative z-30 border-l-2 border-cyan-500/30 pl-6 py-4 bg-cyan-900/5 backdrop-blur-sm">
                {/* Header Info */}
                <div className="flex justify-between items-center mb-8 text-[10px] md:text-xs text-cyan-500/60 tracking-[0.2em] font-bold font-sans">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                        <span>SYSTEM_BOOT_SEQUENCE // VER.3.0</span>
                    </div>
                    <span>ID: ANTIGRAVITY-PROTO</span>
                </div>

                {/* Text Area */}
                <div className="min-h-[200px]">
                    <div className="text-cyan-100/90 text-base md:text-lg leading-loose tracking-wide whitespace-pre-wrap font-light drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                        <span className="text-cyan-500 font-bold mr-3 select-none">{'>'}</span>
                        {displayedText}
                        <span className="inline-block w-2.5 h-5 ml-1 bg-cyan-400 animate-pulse align-middle shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                    </div>
                </div>

                {/* Footer Status */}
                <div className="mt-12 pt-4 border-t border-cyan-500/20 flex items-center justify-between text-xs text-cyan-500/50">
                    <div className="flex gap-4">
                        <span>MEM: 64TB OK</span>
                        <span>NET: CONNECTED</span>
                        <span>AI_CORE: ONLINE</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {currentIndex >= text.length ? (
                            <span className="animate-pulse text-cyan-400 font-bold tracking-widest">[ CLICK_TO_INITIALIZE ]</span>
                        ) : (
                            <span className="animate-pulse">PROCESSING...</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Decorative Corner Brackets */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-lg pointer-events-none"></div>
            <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-lg pointer-events-none"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cyan-500/20 rounded-bl-lg pointer-events-none"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-500/20 rounded-br-lg pointer-events-none"></div>

        </div>
    );
};

export default IntroScene;
