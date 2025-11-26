import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '../themeConfig';

// --- Types ---
type PartType = 'ADJECTIVE' | 'NOUN';
type Tendency = 'AGGRESSIVE' | 'STEALTHY' | 'HOLY' | 'DEFENSIVE' | 'SPEED' | 'MAGIC';

interface DNAPart {
    id: string;
    text: string;
    type: PartType;
    tendency: Tendency;
    color: string;
}

interface AnalysisResult {
    sentence: string;
    score: number;
    rank: 'S' | 'A' | 'B' | 'C' | 'D';
    reward: string;
    description: string;
}

// --- Data ---
const ADJECTIVES: DNAPart[] = [
    { id: 'adj_swift', text: '재빠른', type: 'ADJECTIVE', tendency: 'SPEED', color: 'bg-blue-600' },
    { id: 'adj_slow', text: '느린', type: 'ADJECTIVE', tendency: 'DEFENSIVE', color: 'bg-blue-600' },
    { id: 'adj_calm', text: '침착한', type: 'ADJECTIVE', tendency: 'HOLY', color: 'bg-blue-600' },
    { id: 'adj_vicious', text: '악독한', type: 'ADJECTIVE', tendency: 'AGGRESSIVE', color: 'bg-blue-600' },
    { id: 'adj_silent', text: '조용한', type: 'ADJECTIVE', tendency: 'STEALTHY', color: 'bg-blue-600' },
    { id: 'adj_burning', text: '불타는', type: 'ADJECTIVE', tendency: 'MAGIC', color: 'bg-blue-600' },
    { id: 'adj_heavy', text: '무거운', type: 'ADJECTIVE', tendency: 'DEFENSIVE', color: 'bg-blue-600' },
    { id: 'adj_dark', text: '어두운', type: 'ADJECTIVE', tendency: 'STEALTHY', color: 'bg-blue-600' },
];

const NOUNS: DNAPart[] = [
    { id: 'noun_assassin', text: '암살자', type: 'NOUN', tendency: 'STEALTHY', color: 'bg-red-700' },
    { id: 'noun_thief', text: '도둑', type: 'NOUN', tendency: 'SPEED', color: 'bg-red-700' },
    { id: 'noun_believer', text: '신자', type: 'NOUN', tendency: 'HOLY', color: 'bg-red-700' },
    { id: 'noun_sergeant', text: '중사', type: 'NOUN', tendency: 'AGGRESSIVE', color: 'bg-red-700' },
    { id: 'noun_warrior', text: '전사', type: 'NOUN', tendency: 'DEFENSIVE', color: 'bg-red-700' },
    { id: 'noun_mage', text: '마법사', type: 'NOUN', tendency: 'MAGIC', color: 'bg-red-700' },
];

// --- Component ---
interface DNAScreenProps {
    onBackToMenu: () => void;
    onComplete?: (dnaCard: { name: string; description: string }) => void;
}

const DNAScreen: React.FC<DNAScreenProps> = ({ onBackToMenu, onComplete }) => {
    // Changed to 2 slots for adjectives
    const [slots, setSlots] = useState<(DNAPart | null)[]>([null, null]);
    const [nounSlot, setNounSlot] = useState<DNAPart | null>(null);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Helper to equip a part
    const equipPart = (part: DNAPart) => {
        setResult(null); // Reset result on change
        if (part.type === 'NOUN') {
            setNounSlot(part);
        } else {
            // Find first empty slot or replace the last one if full
            const emptyIndex = slots.findIndex(s => s === null);
            if (emptyIndex !== -1) {
                const newSlots = [...slots];
                newSlots[emptyIndex] = part;
                setSlots(newSlots);
            } else {
                // Shift left and add new
                // For 2 slots: [0, 1] -> [1, new]
                setSlots([slots[1], part]);
            }
        }
    };

    // Helper to unequip
    const unequipSlot = (index: number) => {
        setResult(null);
        const newSlots = [...slots];
        newSlots[index] = null;

        // Shift nulls to the end
        const filtered = newSlots.filter(Boolean);
        while (filtered.length < 2) filtered.push(null);
        setSlots(filtered as (DNAPart | null)[]);
    };

    const unequipNoun = () => {
        setResult(null);
        setNounSlot(null);
    };

    // Analysis Logic
    const analyzeDNA = () => {
        if (!nounSlot) return;

        setIsAnalyzing(true);

        // Simulate processing time
        setTimeout(() => {
            const activeAdjectives = slots.filter((s): s is DNAPart => s !== null);

            // Construct Sentence
            const adjText = activeAdjectives.map(a => a.text).join(' ');
            const fullSentence = `${adjText} ${nounSlot.text}`.trim();

            // Calculate Score
            let baseScore = 50;
            let matches = 0;

            // Tendency Matching
            activeAdjectives.forEach(adj => {
                if (adj.tendency === nounSlot.tendency) {
                    matches++;
                    baseScore += 25; // Increased base score per match since fewer slots
                } else {
                    baseScore += 10;
                }
            });

            // Special Combinations
            let rewardName = "기본 DNA 카드";
            let rewardDesc = "소량의 능력치 상승을 부여합니다.";

            // Check for specific combos
            const tendencies = [...activeAdjectives.map(a => a.tendency), nounSlot.tendency];
            const allStealthy = tendencies.every(t => t === 'STEALTHY');
            const allSpeed = tendencies.every(t => t === 'SPEED');
            const allHoly = tendencies.every(t => t === 'HOLY');

            // Adjusted condition: activeAdjectives.length === 2
            if (allStealthy && activeAdjectives.length === 2) {
                baseScore += 100;
                rewardName = "유령 프로토콜";
                rewardDesc = "스킬 해제: 보이지 않는 일격 (은신 상태에서 300% 피해)";
            } else if (allSpeed && activeAdjectives.length === 2) {
                baseScore += 80;
                rewardName = "속도 초과";
                rewardDesc = "패시브 해제: 이동 속도 +50%";
            } else if (allHoly && activeAdjectives.length === 2) {
                baseScore += 90;
                rewardName = "신성한 보호";
                rewardDesc = "카드 해제: 성역 (1턴 동안 모든 피해 방어)";
            } else if (matches >= 1 && activeAdjectives.length === 2) {
                baseScore += 30;
                rewardName = "시너지 증폭기";
                rewardDesc = "DNA 성향과 일치하는 모든 능력치 +10%";
            }

            // Determine Rank
            let rank: AnalysisResult['rank'] = 'D';
            if (baseScore >= 180) rank = 'S'; // Adjusted thresholds for fewer slots
            else if (baseScore >= 140) rank = 'A';
            else if (baseScore >= 100) rank = 'B';
            else if (baseScore >= 70) rank = 'C';

            setResult({
                sentence: fullSentence,
                score: baseScore,
                rank,
                reward: rewardName,
                description: rewardDesc
            });
            setIsAnalyzing(false);
        }, 800);
    };

    return (
        <div className="w-full h-full bg-botw-dark text-botw-cream flex flex-col items-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-botw-blue/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="w-full max-w-6xl px-8 pt-8 flex justify-between items-start z-10">
                <div>
                    <h1 className={`${THEME.fonts.heading} text-4xl text-botw-blue drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]`}>
                        DNA 합성
                    </h1>
                    <p className={`${THEME.fonts.body} text-botw-gold/80 text-sm tracking-widest mt-1`}>
                        유전자 서열 재조합 시스템
                    </p>
                </div>
                <button
                    onClick={onBackToMenu}
                    className="px-6 py-2 border border-botw-uiBorder hover:bg-botw-uiBorder/20 transition-colors text-sm tracking-widest"
                >
                    시스템 종료
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full max-w-6xl px-8 py-8 flex flex-col gap-8 z-10">

                {/* Top Section: Result / Preview */}
                <div className="flex-1 min-h-[200px] flex items-center justify-center relative bg-black/40 border border-botw-uiBorder/50 rounded-lg backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center w-full"
                            >
                                <div className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-botw-blue via-white to-botw-blue">
                                    "{result.sentence}"
                                </div>

                                <div className="flex justify-center items-center gap-12 mt-8">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs tracking-widest text-zinc-500 uppercase">적합성 점수</span>
                                        <span className="text-4xl font-mono text-botw-gold">{result.score}</span>
                                    </div>

                                    <div className="w-px h-12 bg-zinc-700" />

                                    <div className="flex flex-col items-center">
                                        <span className="text-xs tracking-widest text-zinc-500 uppercase">등급</span>
                                        <span className={`text-5xl font-bold ${result.rank === 'S' ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]' :
                                            result.rank === 'A' ? 'text-purple-400' :
                                                result.rank === 'B' ? 'text-blue-400' :
                                                    'text-zinc-400'
                                            }`}>{result.rank}</span>
                                    </div>

                                    <div className="w-px h-12 bg-zinc-700" />

                                    <div className="flex flex-col items-start max-w-md text-left">
                                        <span className="text-xs tracking-widest text-botw-blue uppercase mb-1">획득 특성</span>
                                        <span className="text-xl font-bold text-white mb-1">{result.reward}</span>
                                        <span className="text-sm text-zinc-400">{result.description}</span>
                                    </div>
                                </div>

                                {onComplete && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        onClick={() => onComplete({ name: result.reward, description: result.description })}
                                        className="mt-8 px-12 py-3 bg-botw-blue text-black font-bold tracking-widest hover:bg-white transition-colors shadow-[0_0_20px_rgba(77,232,254,0.4)]"
                                    >
                                        DNA 확정 및 덱 생성
                                    </motion.button>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center text-zinc-600"
                            >
                                <p className="text-xl tracking-widest uppercase mb-2">서열 불완전</p>
                                <p className="text-sm">DNA 파츠를 장착하여 적합성을 분석하십시오</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Middle Section: Slots */}
                <div className="flex justify-center items-center gap-4 py-8">
                    {/* Adjective Slots */}
                    <div className="flex gap-4">
                        {slots.map((part, idx) => (
                            <div
                                key={`slot-${idx}`}
                                onClick={() => unequipSlot(idx)}
                                className={`
                  w-32 h-16 rounded border-2 flex items-center justify-center cursor-pointer transition-all relative group
                  ${part
                                        ? `${part.color} border-transparent shadow-[0_0_15px_rgba(0,0,0,0.3)]`
                                        : 'bg-black/20 border-botw-blue/30 hover:border-botw-blue/60 border-dashed'
                                    }
                `}
                            >
                                {part ? (
                                    <span className="text-lg font-bold text-white drop-shadow-md">{part.text}</span>
                                ) : (
                                    <span className="text-xs text-botw-blue/30 uppercase tracking-widest">서술어 {idx + 1}</span>
                                )}
                                {part && (
                                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">×</div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Connector */}
                    <div className="w-12 h-1 bg-zinc-700 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-700 rotate-45 transform translate-x-1" />
                    </div>

                    {/* Noun Slot */}
                    <div
                        onClick={unequipNoun}
                        className={`
              w-40 h-20 rounded border-2 flex items-center justify-center cursor-pointer transition-all relative group
              ${nounSlot
                                ? `${nounSlot.color} border-transparent shadow-[0_0_20px_rgba(0,0,0,0.4)] scale-105`
                                : 'bg-black/20 border-red-500/30 hover:border-red-500/60 border-dashed'
                            }
            `}
                    >
                        {nounSlot ? (
                            <span className="text-2xl font-bold text-white drop-shadow-md">{nounSlot.text}</span>
                        ) : (
                            <span className="text-sm text-red-500/30 uppercase tracking-widest">명사 (주체)</span>
                        )}
                        {nounSlot && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">×</div>
                        )}
                    </div>

                    {/* Analyze Button */}
                    <button
                        onClick={analyzeDNA}
                        disabled={!nounSlot || isAnalyzing}
                        className={`
              ml-8 px-8 py-4 rounded font-bold tracking-widest uppercase transition-all
              ${!nounSlot
                                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                : 'bg-botw-gold text-black hover:bg-yellow-400 hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                            }
            `}
                    >
                        {isAnalyzing ? '분석 중...' : 'DNA 분석'}
                    </button>
                </div>

                {/* Bottom Section: Inventory */}
                <div className="flex-1 bg-black/60 border-t border-botw-uiBorder/30 p-6 overflow-y-auto">
                    <div className="flex gap-12 mb-6">
                        <div className="flex-1">
                            <h3 className="text-botw-blue text-sm tracking-widest uppercase mb-4 border-b border-botw-blue/20 pb-2">보유 서술어</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {ADJECTIVES.map(part => (
                                    <button
                                        key={part.id}
                                        onClick={() => equipPart(part)}
                                        className={`
                      px-4 py-2 rounded text-sm font-medium transition-all hover:scale-105
                      ${part.color} text-white shadow-lg opacity-90 hover:opacity-100
                    `}
                                    >
                                        {part.text}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-px bg-zinc-800" />

                        <div className="flex-1">
                            <h3 className="text-red-400 text-sm tracking-widest uppercase mb-4 border-b border-red-500/20 pb-2">보유 명사</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {NOUNS.map(part => (
                                    <button
                                        key={part.id}
                                        onClick={() => equipPart(part)}
                                        className={`
                      px-4 py-3 rounded text-base font-bold transition-all hover:scale-105
                      ${part.color} text-white shadow-lg opacity-90 hover:opacity-100
                    `}
                                    >
                                        {part.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DNAScreen;
