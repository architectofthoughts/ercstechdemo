import React from 'react';

interface ActClearScreenProps {
    onNextAct: () => void;
    onExtract: () => void;
}

const ActClearScreen: React.FC<ActClearScreenProps> = ({ onNextAct, onExtract }) => {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in text-botw-cream font-sans">
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>

            <div className="text-botw-gold/60 text-sm tracking-[0.3em] uppercase mb-4 font-serif">Mission Status</div>
            <h1 className="text-6xl font-serif text-botw-gold mb-16 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(226,199,116,0.5)]">
                ACT CLEARED
            </h1>

            <div className="flex flex-col md:flex-row gap-12">
                {/* Proceed Button */}
                <button
                    onClick={onNextAct}
                    className="group relative w-80 h-96 border border-zinc-600 bg-zinc-900/50 hover:bg-zinc-800/80 hover:border-botw-cream transition-all duration-300 flex flex-col items-center justify-center gap-6 p-8"
                >
                    <div className="text-6xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 grayscale group-hover:grayscale-0">⚔️</div>
                    <h2 className="text-2xl font-serif tracking-widest text-zinc-300 group-hover:text-botw-cream transition-colors">
                        다음 액트 진행
                    </h2>
                    <p className="text-sm text-zinc-500 text-center leading-relaxed group-hover:text-zinc-400 font-sans">
                        다음 섹터로 이동합니다.<br />
                        현재 덱과 유물을 유지합니다.<br />
                        <span className="text-botw-red/70">위험도가 증가합니다.</span>
                    </p>

                    {/* Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-500 group-hover:border-white transition-colors"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-500 group-hover:border-white transition-colors"></div>
                </button>

                {/* Extract Button */}
                <button
                    onClick={onExtract}
                    className="group relative w-80 h-96 border border-botw-blue/30 bg-botw-blue/5 hover:bg-botw-blue/10 hover:border-botw-blue transition-all duration-300 flex flex-col items-center justify-center gap-6 p-8"
                >
                    <div className="text-6xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 text-botw-blue drop-shadow-[0_0_10px_rgba(77,232,254,0.5)]">🌌</div>
                    <h2 className="text-2xl font-serif tracking-widest text-botw-blue group-hover:text-white transition-colors">
                        추출 (Extraction)
                    </h2>
                    <p className="text-sm text-botw-blue/60 text-center leading-relaxed group-hover:text-botw-blue/80 font-sans">
                        현재 진행 상황을 저장하고<br />
                        추출 점수를 자원으로 변환합니다.<br />
                        <span className="text-botw-blue">다음 런에서 이점을 얻습니다.</span>
                    </p>

                    {/* Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-botw-blue/50 group-hover:border-botw-blue transition-colors"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-botw-blue/50 group-hover:border-botw-blue transition-colors"></div>

                    {/* Glow */}
                    <div className="absolute inset-0 bg-botw-blue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
            </div>
        </div>
    );
};

export default ActClearScreen;
