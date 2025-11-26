import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '../themeConfig';
import { PlayArrowIcon } from './icons';

// --- Types ---
interface GameEventChoice {
    id: string;
    text: string;
    description?: string; // e.g. "(Lose 5 HP)"
    condition?: (state: EventGameState) => boolean;
    effect: (state: EventGameState) => Partial<EventGameState>;
    resultText: string;
}

interface GameEvent {
    id: string;
    title: string;
    bodyText: string;
    imageColor: string; // Placeholder for image
    choices: GameEventChoice[];
}

interface EventGameState {
    hp: number;
    maxHp: number;
    gold: number;
    relics: string[];
    deckSize: number;
    curses: number;
}

// --- Data (Korean) ---
const EVENTS: GameEvent[] = [
    {
        id: 'shrine',
        title: '오래된 성소',
        bodyText: '숲의 깊은 곳, 덩굴로 뒤덮인 낡은 성소를 발견했습니다.\n희미하게 빛나는 제단 위에는 알 수 없는 문자가 새겨져 있습니다.\n\n가까이 다가가자 따뜻한 기운이 느껴지지만, 동시에 등골이 서늘해지는 기분도 듭니다.',
        imageColor: 'bg-emerald-900',
        choices: [
            {
                id: 'pray',
                text: '[기도하기]',
                description: '체력을 20 회복합니다.',
                effect: (state) => ({ hp: Math.min(state.maxHp, state.hp + 20) }),
                resultText: '당신은 무릎을 꿇고 기도를 올렸습니다.\n따스한 빛이 당신을 감싸며 상처가 치유됩니다.'
            },
            {
                id: 'desecrate',
                text: '[뒤지기]',
                description: '100 골드를 얻지만, "저주"를 받습니다.',
                effect: (state) => ({ gold: state.gold + 100, curses: state.curses + 1 }),
                resultText: '제단 밑을 뒤져 숨겨진 금화를 찾아냈습니다.\n하지만 주머니에 금화를 넣는 순간, 불길한 기운이 당신의 몸을 휘감습니다.'
            },
            {
                id: 'leave',
                text: '[떠나기]',
                description: '아무 일도 일어나지 않습니다.',
                effect: () => ({}),
                resultText: '당신은 성소를 뒤로하고 갈 길을 재촉합니다.'
            }
        ]
    },
    {
        id: 'fortune_teller',
        title: '예쁜 점술가',
        bodyText: '화려한 천막 안에서 신비로운 분위기의 점술가가 당신을 맞이합니다.\n\n"어머, 당신의 운명이 보여요. 아주 흥미로운걸요?"\n\n그녀는 테이블 위의 수정구슬을 어루만지며 미소 짓습니다.',
        imageColor: 'bg-purple-900',
        choices: [
            {
                id: 'read_fortune',
                text: '[운세 보기]',
                description: '75 골드를 잃고, 유물 "운명의 실타래"를 얻습니다.',
                condition: (state) => state.gold >= 75,
                effect: (state) => ({ gold: state.gold - 75, relics: [...state.relics, "운명의 실타래"] }),
                resultText: '당신은 복채를 내고 점을 봅니다.\n그녀가 건넨 실타래는 당신의 운명을 좋은 쪽으로 이끌어 줄 것입니다.'
            },
            {
                id: 'challenge_fate',
                text: '[운명에 도전하기]',
                description: '체력을 15 잃고, 희귀 카드를 얻습니다.',
                effect: (state) => ({ hp: Math.max(1, state.hp - 15), deckSize: state.deckSize + 1 }),
                resultText: '당신은 정해진 운명을 거부하고 스스로의 길을 개척하기로 합니다.\n그 과정은 고통스럽지만, 당신은 새로운 힘을 얻었습니다.'
            },
            {
                id: 'ignore',
                text: '[지나가기]',
                description: '아무 일도 일어나지 않습니다.',
                effect: () => ({}),
                resultText: '당신은 점술가의 유혹을 뿌리치고 갈 길을 갑니다.\n그녀는 아쉬운 듯 당신의 뒷모습을 바라봅니다.'
            }
        ]
    }
];

// --- Component ---
interface EventDemoProps {
    onBackToMenu: () => void;
}

const EventDemo: React.FC<EventDemoProps> = ({ onBackToMenu }) => {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [gameState, setGameState] = useState<EventGameState>({
        hp: 50,
        maxHp: 80,
        gold: 100,
        relics: [],
        deckSize: 10,
        curses: 0
    });
    const [showResult, setShowResult] = useState(false);
    const [resultText, setResultText] = useState("");
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentEvent = EVENTS[currentEventIndex];

    const handleChoice = (choice: GameEventChoice) => {
        const changes = choice.effect(gameState);
        setGameState(prev => ({ ...prev, ...changes }));
        setResultText(choice.resultText);
        setShowResult(true);
    };

    const handleNext = () => {
        if (currentEventIndex < EVENTS.length - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentEventIndex(prev => prev + 1);
                setShowResult(false);
                setIsTransitioning(false);
            }, 500);
        } else {
            // End of demo
            onBackToMenu();
        }
    };

    return (
        <div className="w-full h-full bg-botw-dark text-botw-cream flex items-center justify-center relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
            <div className={`absolute inset-0 transition-colors duration-1000 opacity-30 ${currentEvent.imageColor}`} />

            {/* Top Bar Stats */}
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-black/40 backdrop-blur-sm border-b border-botw-uiBorder/30 z-20">
                <div className="flex gap-6 text-sm tracking-widest font-mono">
                    <div className="flex items-center gap-2">
                        <span className="text-red-500">♥</span> {gameState.hp}/{gameState.maxHp}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-400">G</span> {gameState.gold}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-blue-400">Cards</span> {gameState.deckSize}
                    </div>
                    {gameState.relics.length > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-purple-400">Relics</span> {gameState.relics.join(", ")}
                        </div>
                    )}
                    {gameState.curses > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-purple-600">Curses</span> {gameState.curses}
                        </div>
                    )}
                </div>
                <button onClick={onBackToMenu} className="text-xs text-zinc-500 hover:text-white transition-colors">
                    EXIT DEMO
                </button>
            </div>

            {/* Main Event Card */}
            <AnimatePresence mode="wait">
                {!isTransitioning && (
                    <motion.div
                        key={currentEvent.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-5xl h-[600px] flex bg-botw-uiDark border border-botw-uiBorder shadow-2xl rounded-lg overflow-hidden relative z-10"
                    >
                        {/* Left Image Area */}
                        <div className={`w-1/3 h-full ${currentEvent.imageColor} relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-9xl opacity-20 font-serif text-white">?</span>
                            </div>
                            {/* Decorative lines */}
                            <div className="absolute top-8 left-8 right-8 h-px bg-white/20" />
                            <div className="absolute bottom-8 left-8 right-8 h-px bg-white/20" />
                        </div>

                        {/* Right Content Area */}
                        <div className="w-2/3 h-full p-12 flex flex-col relative">
                            {/* Header */}
                            <div className="mb-8">
                                <h2 className={`${THEME.fonts.heading} text-4xl text-botw-cream mb-4 border-b border-botw-uiBorder/50 pb-4`}>
                                    {currentEvent.title}
                                </h2>
                            </div>

                            {/* Body Text or Result Text */}
                            <div className="flex-1 overflow-y-auto pr-4 mb-8">
                                <AnimatePresence mode="wait">
                                    {showResult ? (
                                        <motion.div
                                            key="result"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-lg leading-relaxed text-zinc-300 whitespace-pre-line"
                                        >
                                            {resultText}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="body"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-lg leading-relaxed text-zinc-300 whitespace-pre-line"
                                        >
                                            {currentEvent.bodyText}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Choices */}
                            <div className="flex flex-col gap-3">
                                {!showResult ? (
                                    currentEvent.choices.map((choice, idx) => {
                                        const isDisabled = choice.condition ? !choice.condition(gameState) : false;
                                        return (
                                            <button
                                                key={choice.id}
                                                onClick={() => !isDisabled && handleChoice(choice)}
                                                disabled={isDisabled}
                                                className={`
                          w-full p-4 text-left border transition-all duration-200 flex justify-between items-center group
                          ${isDisabled
                                                        ? 'bg-zinc-900/50 border-zinc-800 text-zinc-600 cursor-not-allowed'
                                                        : 'bg-black/40 border-botw-uiBorder hover:bg-botw-blue/10 hover:border-botw-blue hover:pl-6'
                                                    }
                        `}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${isDisabled ? 'border-zinc-700' : 'border-botw-uiBorder group-hover:border-botw-blue'}`}>
                                                        {idx + 1}
                                                    </span>
                                                    <span className={`font-bold ${isDisabled ? '' : 'group-hover:text-botw-blue'}`}>
                                                        {choice.text}
                                                    </span>
                                                    <span className="text-zinc-500 text-sm">
                                                        {choice.description}
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        className="w-full p-4 bg-botw-blue/20 border border-botw-blue text-botw-blue hover:bg-botw-blue/30 transition-all font-bold tracking-widest uppercase flex justify-center items-center gap-2"
                                    >
                                        {currentEventIndex < EVENTS.length - 1 ? '다음으로' : '떠나기'} <PlayArrowIcon className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventDemo;
