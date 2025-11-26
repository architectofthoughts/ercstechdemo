import React, { useState } from 'react';
import { CHARACTER_ROSTER, CharacterEntry } from '../characterData';
import { PlusIcon } from './icons';
import DNAScreen from './DNAScreen';
import StartingDeckScreen from './StartingDeckScreen';
import { Card, CardType } from '../types';

// --- Mock Data for Starting Cards ---
const ROLE_CARDS: Record<string, Card[]> = {
    'Ranger': [
        { id: 101, name: "Quick Shot", cost: 1, description: "Deal 6 damage.", type: CardType.ATTACK },
        { id: 102, name: "Quick Shot", cost: 1, description: "Deal 6 damage.", type: CardType.ATTACK },
        { id: 103, name: "Dodge", cost: 1, description: "Gain 5 Block.", type: CardType.SKILL },
        { id: 104, name: "Aim", cost: 1, description: "Next Attack deals double damage.", type: CardType.SKILL },
        { id: 105, name: "Volley", cost: 2, description: "Deal 4 damage to all enemies.", type: CardType.ATTACK },
    ],
    'Brawler': [
        { id: 201, name: "Punch", cost: 1, description: "Deal 8 damage.", type: CardType.ATTACK },
        { id: 202, name: "Punch", cost: 1, description: "Deal 8 damage.", type: CardType.ATTACK },
        { id: 203, name: "Guard", cost: 1, description: "Gain 7 Block.", type: CardType.SKILL },
        { id: 204, name: "Flex", cost: 0, description: "Gain 2 Strength.", type: CardType.SKILL },
        { id: 205, name: "Headbutt", cost: 2, description: "Deal 12 damage.", type: CardType.ATTACK },
    ],
    'Slasher': [
        { id: 301, name: "Slash", cost: 1, description: "Deal 9 damage.", type: CardType.ATTACK },
        { id: 302, name: "Slash", cost: 1, description: "Deal 9 damage.", type: CardType.ATTACK },
        { id: 303, name: "Parry", cost: 1, description: "Gain 5 Block. Draw 1 card.", type: CardType.SKILL },
        { id: 304, name: "Bleed", cost: 1, description: "Apply 3 Bleeding.", type: CardType.SKILL },
        { id: 305, name: "Execute", cost: 2, description: "Deal 15 damage.", type: CardType.ATTACK },
    ],
    // Default fallback
    'Default': [
        { id: 901, name: "Strike", cost: 1, description: "Deal 6 damage.", type: CardType.ATTACK },
        { id: 902, name: "Strike", cost: 1, description: "Deal 6 damage.", type: CardType.ATTACK },
        { id: 903, name: "Defend", cost: 1, description: "Gain 5 Block.", type: CardType.SKILL },
        { id: 904, name: "Defend", cost: 1, description: "Gain 5 Block.", type: CardType.SKILL },
        { id: 905, name: "Prepare", cost: 0, description: "Draw 1 card.", type: CardType.SKILL },
    ]
};

const CHARACTER_SKILLS: Record<string, Card[]> = {
    // Just mapping a few for demo purposes, others will get generic skills
    'char_1': [ // RIO
        { id: 1001, name: "Kyudo", cost: 2, description: "Deal 10 damage. If enemy has full HP, deal double.", type: CardType.ATTACK },
        { id: 1002, name: "Spirit Arrow", cost: 1, description: "Deal 5 damage. Draw 2 cards.", type: CardType.ATTACK },
    ],
    'char_3': [ // JACKIE
        { id: 3001, name: "Adrenaline", cost: 0, description: "Gain 2 Energy. Lose 2 HP.", type: CardType.SKILL },
        { id: 3002, name: "Chainsaw", cost: 2, description: "Deal 4 damage 4 times.", type: CardType.ATTACK },
    ]
};

const getCardsForRole = (role: string): Card[] => {
    return ROLE_CARDS[role] || ROLE_CARDS['Default'];
};

const getCardsForCharacter = (charId: string): Card[] => {
    return CHARACTER_SKILLS[charId] || [
        { id: 9001, name: "Unique Skill 1", cost: 1, description: "Unique character ability.", type: CardType.SKILL },
        { id: 9002, name: "Unique Skill 2", cost: 2, description: "Powerful character attack.", type: CardType.ATTACK },
    ];
};


// --- Main Component ---
type Step = 'SELECT' | 'DNA' | 'DECK';

const CharacterSelectDemo: React.FC<{ onBackToMenu: () => void }> = ({ onBackToMenu }) => {
    const [step, setStep] = useState<Step>('SELECT');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [generatedDNACard, setGeneratedDNACard] = useState<Card | null>(null);

    // --- Step 1: Selection Logic ---
    const toggleCharacter = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(sid => sid !== id));
        } else {
            if (selectedIds.length < 2) {
                setSelectedIds(prev => [...prev, id]);
            }
        }
    };

    const getSelectedCharacter = (index: number): CharacterEntry | undefined => {
        const id = selectedIds[index];
        return CHARACTER_ROSTER.find(c => c.id === id);
    };

    const handleConfirmSquad = () => {
        setStep('DNA');
    };

    // --- Step 2: DNA Logic ---
    const handleDNAComplete = (dnaInfo: { name: string; description: string }) => {
        const newCard: Card = {
            id: Date.now(),
            name: dnaInfo.name,
            description: dnaInfo.description,
            cost: 0, // DNA cards might be passive or 0 cost
            type: CardType.POWER // Assuming DNA grants power/passive
        };
        setGeneratedDNACard(newCard);
        setStep('DECK');
    };

    // --- Step 3: Deck Logic ---
    const generateFinalDeck = (): Card[] => {
        let deck: Card[] = [];

        // 1. Character Unique Skills (2 per character)
        selectedIds.forEach(id => {
            deck = [...deck, ...getCardsForCharacter(id)];
        });

        // 2. DNA Card (1 card)
        if (generatedDNACard) {
            deck.push(generatedDNACard);
        }

        // 3. Role Cards (5 per character)
        selectedIds.forEach(id => {
            const char = CHARACTER_ROSTER.find(c => c.id === id);
            if (char) {
                deck = [...deck, ...getCardsForRole(char.role)];
            }
        });

        return deck;
    };

    // --- Render ---
    if (step === 'DNA') {
        return <DNAScreen onBackToMenu={() => setStep('SELECT')} onComplete={handleDNAComplete} />;
    }

    if (step === 'DECK') {
        return <StartingDeckScreen deck={generateFinalDeck()} onStartGame={onBackToMenu} />;
    }

    // Default: SELECT Step
    return (
        <div className="w-full h-full flex flex-col p-6 relative overflow-hidden bg-botw-dark">
            {/* Header */}
            <div className="w-full flex justify-between items-start z-20 relative mb-4 flex-shrink-0">
                <button
                    onClick={onBackToMenu}
                    className="group flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"
                >
                    <div className="w-8 h-8 border border-botw-gold rotate-45 flex items-center justify-center group-hover:bg-botw-gold/20 transition-colors">
                        <div className="w-2 h-2 bg-botw-gold -rotate-45"></div>
                    </div>
                    <span className="font-serif text-botw-gold text-sm tracking-widest uppercase">Return</span>
                </button>

                <div className="flex flex-col items-end">
                    <h2 className="text-2xl font-serif font-bold text-botw-gold">SQUAD ASSEMBLY</h2>
                    <div className="text-xs font-serif text-botw-cream opacity-60 tracking-widest">Select 2 Members</div>
                </div>
            </div>

            <div className="flex-1 flex gap-8 overflow-hidden">
                {/* Left Side: Roster Grid */}
                <div className="w-2/3 h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto scrollbar-hide flex items-center justify-center">
                        <div className="grid grid-cols-5 gap-4 w-full max-w-4xl">
                            {CHARACTER_ROSTER.map(char => {
                                const isSelected = selectedIds.includes(char.id);
                                const isDisabled = !isSelected && selectedIds.length >= 2;

                                return (
                                    <div
                                        key={char.id}
                                        onClick={() => !isDisabled && toggleCharacter(char.id)}
                                        className={`
                                            group relative aspect-[9/16] cursor-pointer transition-all duration-300
                                            ${isSelected ? 'transform scale-95 z-10 ring-2 ring-botw-blue' : 'hover:scale-105'}
                                            ${isDisabled ? 'opacity-30 grayscale' : ''}
                                        `}
                                    >
                                        {/* Card Frame */}
                                        <div className={`absolute inset-0 border transition-colors duration-300 z-20 pointer-events-none ${isSelected ? 'border-transparent' : 'border-zinc-700 group-hover:border-botw-gold/50'}`}></div>

                                        {/* Image */}
                                        <div className="absolute inset-0 bg-zinc-900 overflow-hidden">
                                            <img
                                                src={char.imageUrl}
                                                alt={char.name}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                                        </div>

                                        {/* Mini Info */}
                                        <div className="absolute bottom-2 left-0 w-full text-center z-30">
                                            <div className="text-[0.5rem] text-botw-blue tracking-widest uppercase bg-black/50 py-1 mb-1">{char.role}</div>
                                            <div className={`font-serif font-bold text-xs ${isSelected ? 'text-botw-blue' : 'text-zinc-300'}`}>{char.name}</div>
                                        </div>

                                        {/* Selected Overlay */}
                                        {isSelected && (
                                            <div className="absolute inset-0 bg-botw-blue/10 flex items-center justify-center">
                                                <PlusIcon className="w-8 h-8 text-botw-blue drop-shadow-lg" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Side: Selected Info Panel */}
                <div className="w-1/3 h-full border-l border-white/10 bg-black/20 backdrop-blur-sm p-6 flex flex-col gap-6 relative">
                    <div className="text-sm font-serif text-botw-gold uppercase tracking-widest border-b border-white/10 pb-2 mb-2">
                        Selected Agents ({selectedIds.length}/2)
                    </div>

                    {/* Slot 1 */}
                    <SelectedSlot character={getSelectedCharacter(0)} label="Leader" />

                    {/* Slot 2 */}
                    <SelectedSlot character={getSelectedCharacter(1)} label="Support" />

                    {/* Confirm Button */}
                    <div className="mt-auto">
                        <button
                            onClick={handleConfirmSquad}
                            className={`w-full py-4 font-serif font-bold tracking-[0.2em] uppercase border transition-all duration-300
                                ${selectedIds.length === 2
                                    ? 'bg-botw-blue text-black border-botw-blue hover:bg-botw-cream hover:border-botw-cream'
                                    : 'bg-transparent text-zinc-600 border-zinc-800 cursor-not-allowed'
                                }
                            `}
                            disabled={selectedIds.length !== 2}
                        >
                            Next: DNA Synthesis
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-component for the right sidebar slots
const SelectedSlot: React.FC<{ character?: CharacterEntry, label: string }> = ({ character, label }) => {
    return (
        <div className="flex-1 relative min-h-0 flex flex-col">
            <div className="text-xs text-zinc-500 mb-1 font-serif uppercase">{label}</div>

            <div className={`flex-1 border relative transition-all duration-500 overflow-hidden ${character ? 'border-botw-gold/30 bg-zinc-900' : 'border-dashed border-zinc-800 bg-transparent flex items-center justify-center'}`}>
                {character ? (
                    <>
                        <img src={character.imageUrl} alt={character.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-1 h-1 bg-botw-blue rotate-45"></div>
                                <span className="text-xs text-botw-blue tracking-widest uppercase bg-botw-blue/10 px-2 py-0.5 rounded">{character.role}</span>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-botw-cream">{character.name}</h3>
                        </div>
                        {/* Decorative tech lines */}
                        <div className="absolute top-2 right-2 w-16 h-[1px] bg-botw-gold/30"></div>
                        <div className="absolute top-2 right-2 w-[1px] h-8 bg-botw-gold/30"></div>
                    </>
                ) : (
                    <div className="text-zinc-700 font-serif text-sm tracking-widest uppercase">Empty Slot</div>
                )}
            </div>
        </div>
    )
}

export default CharacterSelectDemo;
