import React, { useState } from 'react';

interface ExtractionScreenProps {
    onBackToMenu: () => void;
}

interface ExtractionOption {
    id: string;
    title: string;
    description: string;
    cost: number;
    icon: string;
    category: 'material' | 'legacy' | 'bonus' | 'save';
    maxCount?: number;
}

const ExtractionScreen: React.FC<ExtractionScreenProps> = ({ onBackToMenu }) => {
    const [totalPoints, setTotalPoints] = useState(1500);
    const [spentPoints, setSpentPoints] = useState(0);
    const [selections, setSelections] = useState<Record<string, number>>({});

    const remainingPoints = totalPoints - spentPoints;

    const options: ExtractionOption[] = [
        {
            id: 'material_pack',
            title: '원시 에테르',
            description: '추출 점수를 가챠 재료인 원시 에테르로 변환합니다. 다음 런의 이점은 포기합니다.',
            cost: 100,
            icon: '💎',
            category: 'material',
            maxCount: 10
        },
        {
            id: 'legacy_card',
            title: '기억 보존',
            description: '현재 덱에서 카드 한 장을 선택하여 다음 런으로 계승합니다.',
            cost: 500,
            icon: '♠️',
            category: 'legacy',
            maxCount: 1
        },
        {
            id: 'bonus_draw',
            title: '신경 가속',
            description: '다음 런의 모든 전투에서 첫 턴에 카드를 1장 더 뽑습니다.',
            cost: 300,
            icon: '⚡',
            category: 'bonus',
            maxCount: 1
        },
        {
            id: 'bonus_rare',
            title: '고대 유물함',
            description: '다음 런을 무작위 희귀 카드 1장을 가지고 시작합니다.',
            cost: 400,
            icon: '📦',
            category: 'bonus',
            maxCount: 1
        },
        {
            id: 'save_points',
            title: '메모리 뱅크',
            description: '남은 추출 점수를 다음 런으로 이월하여 저장합니다. (자동 적용)',
            cost: 0,
            icon: '💾',
            category: 'save',
            maxCount: 1
        }
    ];

    const handleSelect = (option: ExtractionOption) => {
        if (option.category === 'save') return; // Passive

        const currentCount = selections[option.id] || 0;

        // Check limits
        if (option.maxCount && currentCount >= option.maxCount) return;
        if (remainingPoints < option.cost) return;

        setSelections(prev => ({
            ...prev,
            [option.id]: currentCount + 1
        }));
        setSpentPoints(prev => prev + option.cost);
    };

    const handleDeselect = (option: ExtractionOption, e: React.MouseEvent) => {
        e.stopPropagation();
        const currentCount = selections[option.id] || 0;
        if (currentCount > 0) {
            setSelections(prev => ({
                ...prev,
                [option.id]: currentCount - 1
            }));
            setSpentPoints(prev => prev - option.cost);
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in text-botw-cream font-sans">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-botw-blue/10 to-transparent pointer-events-none"></div>

            <div className="w-full max-w-6xl h-[90vh] flex flex-col relative z-10">

                {/* Header */}
                <div className="flex justify-between items-end border-b border-botw-gold/30 pb-6 mb-8 px-8">
                    <div>
                        <div className="text-botw-gold/60 text-sm tracking-[0.3em] uppercase mb-2 font-serif">시스템 메시지: 액트 3 클리어</div>
                        <h1 className="text-5xl font-serif text-botw-cream tracking-widest drop-shadow-lg">
                            추출 <span className="text-botw-blue">프로토콜</span>
                        </h1>
                    </div>
                    <div className="text-right">
                        <div className="text-xs uppercase tracking-widest text-zinc-500 mb-1">가용 용량</div>
                        <div className="text-4xl font-serif text-botw-gold drop-shadow-[0_0_10px_rgba(226,199,116,0.5)]">
                            {remainingPoints} <span className="text-lg">EP</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 overflow-y-auto pb-8 scrollbar-hide">

                    {/* Material Section */}
                    <div className="col-span-1 lg:col-span-3 mb-4">
                        <h2 className="text-botw-blue/80 font-serif tracking-widest border-l-2 border-botw-blue pl-3 mb-4 uppercase text-sm">
                            자원 변환
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {options.filter(o => o.category === 'material').map(option => (
                                <OptionCard
                                    key={option.id}
                                    option={option}
                                    count={selections[option.id] || 0}
                                    canAfford={remainingPoints >= option.cost}
                                    onSelect={() => handleSelect(option)}
                                    onDeselect={(e) => handleDeselect(option, e)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Strategic Advantages */}
                    <div className="col-span-1 lg:col-span-3">
                        <h2 className="text-botw-gold/80 font-serif tracking-widest border-l-2 border-botw-gold pl-3 mb-4 uppercase text-sm">
                            전략적 이점
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {options.filter(o => o.category !== 'material' && o.category !== 'save').map(option => (
                                <OptionCard
                                    key={option.id}
                                    option={option}
                                    count={selections[option.id] || 0}
                                    canAfford={remainingPoints >= option.cost}
                                    onSelect={() => handleSelect(option)}
                                    onDeselect={(e) => handleDeselect(option, e)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Save Points */}
                    <div className="col-span-1 lg:col-span-3 mt-8 p-6 border border-dashed border-zinc-700 rounded bg-zinc-900/30 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="text-3xl">💾</div>
                            <div>
                                <h3 className="font-serif text-botw-cream text-lg tracking-wide">메모리 뱅크</h3>
                                <p className="text-zinc-400 text-sm">사용하지 않은 추출 점수는 자동으로 다음 런을 위해 보관됩니다.</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-serif text-botw-blue">{remainingPoints} EP</div>
                            <div className="text-xs text-botw-blue/50 uppercase tracking-widest">저장 예정</div>
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="mt-auto pt-6 px-8 border-t border-botw-uiBorder flex justify-between items-center bg-black/80 backdrop-blur-xl pb-8">
                    <button
                        onClick={onBackToMenu}
                        className="text-zinc-500 hover:text-white transition-colors text-sm uppercase tracking-widest"
                    >
                        취소
                    </button>

                    <button
                        onClick={onBackToMenu}
                        className="group relative px-12 py-4 bg-botw-blue/10 border border-botw-blue/30 hover:bg-botw-blue/20 hover:border-botw-blue transition-all duration-300"
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-full h-full bg-botw-blue/5 blur-md"></div>
                        </div>
                        <span className="relative font-serif text-botw-blue tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                            추출 시작
                        </span>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-botw-blue opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-botw-blue opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

interface OptionCardProps {
    option: ExtractionOption;
    count: number;
    canAfford: boolean;
    onSelect: () => void;
    onDeselect: (e: React.MouseEvent) => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, count, canAfford, onSelect, onDeselect }) => {
    const isMaxed = option.maxCount ? count >= option.maxCount : false;
    const isDisabled = !canAfford && !isMaxed && count === 0;

    return (
        <div
            onClick={!isMaxed && canAfford ? onSelect : undefined}
            className={`
                relative group p-5 border transition-all duration-300 cursor-pointer select-none
                ${count > 0
                    ? 'bg-botw-blue/10 border-botw-blue shadow-[0_0_15px_rgba(77,232,254,0.1)]'
                    : 'bg-botw-uiDark/40 border-botw-uiBorder hover:border-botw-gold/50 hover:bg-botw-uiDark/60'}
                ${isDisabled ? 'opacity-50 grayscale cursor-not-allowed' : ''}
            `}
        >
            {/* Selection Indicator */}
            {count > 0 && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-botw-blue text-black font-bold flex items-center justify-center rounded-full shadow-lg z-20 animate-bounce-short">
                    {count}
                </div>
            )}

            <div className="flex justify-between items-start mb-3">
                <div className="text-3xl opacity-80 group-hover:scale-110 transition-transform duration-300">{option.icon}</div>
                <div className={`font-serif font-bold ${count > 0 ? 'text-botw-blue' : 'text-botw-gold'}`}>
                    {option.cost} <span className="text-xs opacity-70">EP</span>
                </div>
            </div>

            <h3 className={`font-serif text-lg mb-2 tracking-wide ${count > 0 ? 'text-white' : 'text-zinc-200'}`}>
                {option.title}
            </h3>

            <p className="text-xs text-zinc-400 leading-relaxed mb-4 min-h-[3rem]">
                {option.description}
            </p>

            {/* Controls for multiple selection */}
            {count > 0 && (
                <div className="flex justify-end">
                    <button
                        onClick={onDeselect}
                        className="px-3 py-1 text-xs border border-white/20 hover:bg-white/10 text-zinc-300 rounded transition-colors z-10"
                    >
                        제거
                    </button>
                </div>
            )}

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>
    );
};

export default ExtractionScreen;
