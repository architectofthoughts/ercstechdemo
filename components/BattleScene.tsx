import React from 'react';
import { GameState, Card, EnemyState } from '../types';
import Enemy from './Enemy';
import PlayerHand from './PlayerHand';
import CardComponent from './CardComponent';
import { ManaIcon, SheikahEyeIcon } from './icons';

interface DragState {
    isActive: boolean;
    cards: Card[];
    position: { x: number; y: number };
}

interface FinaleDragState {
    isActive: boolean;
    position: { x: number; y: number };
}

interface DeckDragState {
    isActive: boolean;
    position: { x: number; y: number };
}

interface BattleSceneProps {
    demoMode: 'finale' | 'multiPlay' | 'spinning' | 'destinyDraw';
    gameState: GameState;
    enemies: EnemyState[];
    playerMana: number;
    playerMaxMana: number;
    cardsInHand: Card[];
    dragState: DragState;
    finaleDragState: FinaleDragState;
    deckDragState: DeckDragState;
    isDestinyDrawUsed: boolean;
    isDestinyDiscarding: boolean;
    finaleExplosionOrigin: { x: number, y: number } | null;
    draggedCardIds: Set<number>;
    isHandSpinning: boolean;
    heldCardId: number | null;
    combatLog: string | null;
    onFinaleTriggerStart: (e: React.MouseEvent) => void;
    onDeckTriggerStart: (e: React.MouseEvent) => void;
    onSetupFavorable: () => void;
    onCardLongPress: (card: Card, position: { x: number; y: number }) => void;
    onDropOnEnemies: (e: React.MouseEvent) => void;
    onCardPress: (card: Card, event: React.MouseEvent) => void;
    onSpinAnimationEnd: () => void;
    onBackToMenu: () => void;
}

const BattleScene: React.FC<BattleSceneProps> = ({
    demoMode,
    gameState,
    enemies,
    playerMana,
    playerMaxMana,
    cardsInHand,
    dragState,
    finaleDragState,
    deckDragState,
    isDestinyDrawUsed,
    isDestinyDiscarding,
    finaleExplosionOrigin,
    draggedCardIds,
    isHandSpinning,
    heldCardId,
    combatLog,
    onFinaleTriggerStart,
    onDeckTriggerStart,
    onSetupFavorable,
    onCardLongPress,
    onDropOnEnemies,
    onCardPress,
    onSpinAnimationEnd,
    onBackToMenu
}) => {
    const isFinaleReady = gameState === GameState.BATTLE_FINALE_READY;
    const isAnimatingFinale = gameState === GameState.FINALE_ANIMATION;

    const totalDragCost = dragState.cards.reduce((sum, c) => sum + c.cost, 0);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-between p-6 z-10">
            {/* Top HUD - Sheikah Slate Style */}
            <div className="w-full flex justify-between items-start pointer-events-none">
                <button
                    onClick={onBackToMenu}
                    className="pointer-events-auto group flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"
                >
                    <div className="w-8 h-8 border border-botw-gold rotate-45 flex items-center justify-center group-hover:bg-botw-gold/20 transition-colors">
                        <div className="w-2 h-2 bg-botw-gold -rotate-45"></div>
                    </div>
                    <span className="font-serif text-botw-gold text-sm tracking-widest uppercase">Leave Trial</span>
                </button>

                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-[1px] w-12 bg-botw-gold/50"></div>
                        <div className="text-xs font-serif text-botw-gold tracking-[0.2em] uppercase">Simulation</div>
                        <div className="h-[1px] w-12 bg-botw-gold/50"></div>
                    </div>
                    <div className="text-botw-blue font-bold font-serif text-xl uppercase drop-shadow-md">{demoMode.replace(/([A-Z])/g, ' $1')}</div>
                </div>
            </div>

            {/* Normal Drag Drop Zone - Mystic Overlay */}
            {dragState.isActive && (
                <div
                    className="absolute top-20 left-0 right-0 h-[60%] z-20 flex items-center justify-center"
                    onMouseUp={(e) => onDropOnEnemies(e)}
                >
                    <div className="bg-botw-blue/5 border-2 border-botw-blue/30 backdrop-blur-sm px-12 py-6 rounded-full animate-pulse flex flex-col items-center gap-2">
                        <div className="text-botw-blue font-serif font-bold text-xl tracking-widest">RELEASE TO CAST</div>
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-botw-blue to-transparent"></div>
                    </div>
                </div>
            )}

            {/* Finale Drag Drop Zones */}
            {finaleDragState.isActive && (
                <>
                    {/* Execute Zone (Top) */}
                    <div className="absolute top-0 left-0 w-full h-[70%] z-10 flex items-center justify-center bg-gradient-to-b from-botw-gold/10 to-transparent">
                        <div className="text-center transform -translate-y-10">
                            <div className="text-6xl font-serif font-black text-botw-gold/80 tracking-[0.2em] drop-shadow-[0_0_20px_rgba(226,199,116,0.5)] animate-pulse">UNLEASH</div>
                            <div className="flex items-center justify-center gap-4 mt-4 opacity-60">
                                <div className="w-12 h-[1px] bg-botw-gold"></div>
                                <div className="text-sm font-serif text-botw-cream uppercase tracking-widest">Secret Art</div>
                                <div className="w-12 h-[1px] bg-botw-gold"></div>
                            </div>
                        </div>
                    </div>

                    {/* Cancel Zone (Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full h-[30%] z-10 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                        <div className="text-zinc-500 font-serif tracking-widest text-sm uppercase border-t border-zinc-700 pt-4 px-12">Return to Stance</div>
                    </div>
                </>
            )}

            {/* Combat Log Overlay (Multi-Cast Feedback) */}
            {combatLog && (
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-40 pointer-events-none w-full flex justify-center">
                    <div className="flex flex-col items-center animate-[float_0.5s_ease-out]">
                        <div className="text-botw-gold font-serif italic text-4xl drop-shadow-md">{combatLog}</div>
                        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-botw-gold to-transparent mt-2"></div>
                    </div>
                </div>
            )}

            {/* Enemy Area & Finale Trigger Zone */}
            <div
                className="w-full flex justify-center items-end gap-12 mt-20 relative"
                onMouseDown={onFinaleTriggerStart}
            >
                {/* Visual Indicator for Finale Ready */}
                {isFinaleReady && !finaleDragState.isActive && !isAnimatingFinale && (
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 text-center pointer-events-none z-30 animate-mystic-pulse">
                        <SheikahEyeIcon className="w-12 h-12 text-botw-gold mx-auto mb-2" />
                        <div className="text-botw-gold font-serif font-bold tracking-widest text-lg drop-shadow-md">SECRET ART READY</div>
                        <div className="text-botw-cream/70 text-xs font-serif mt-1">Hold to Activate</div>
                    </div>
                )}

                {enemies.map(enemy => (
                    <Enemy key={enemy.id} enemy={enemy} isAnimating={isAnimatingFinale} />
                ))}
            </div>

            {/* Normal Dragged Card Stack */}
            {dragState.isActive && dragState.cards.length > 0 && (
                <div
                    className="absolute top-0 left-0 pointer-events-none z-50 transition-transform ease-out duration-75"
                    style={{ transform: `translate(${dragState.position.x - 96}px, ${dragState.position.y - 128}px)` }}
                >
                    {dragState.cards.map((card, index) => (
                        <div
                            key={card.id}
                            style={{
                                position: 'absolute',
                                transform: `translate(${index * 30}px, ${index * 10}px) rotate(${index * 5}deg)`,
                                zIndex: 10 + index
                            }}
                        >
                            <CardComponent
                                card={card}
                                playerMana={playerMana}
                                style={{ pointerEvents: 'none' }}
                            />
                        </div>
                    ))}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center text-botw-gold drop-shadow-md whitespace-nowrap">
                        <div className="font-serif text-xl">{dragState.cards.length}x Chain</div>
                        <div className="text-sm opacity-80">Cost: {totalDragCost}</div>
                    </div>
                </div>
            )}

            {/* Finale Dragged Hand (Floating Magnet Effect) */}
            {finaleDragState.isActive && (
                <div
                    className="absolute top-0 left-0 pointer-events-none z-[60] transition-transform duration-75 ease-out"
                    style={{ transform: `translate(${finaleDragState.position.x}px, ${finaleDragState.position.y}px)` }}
                >
                    <div className="relative">
                        {cardsInHand.map((card, index) => {
                            const total = cardsInHand.length;
                            const angle = (index - (total - 1) / 2) * 15;
                            const xOffset = (index - (total - 1) / 2) * 20;
                            const yOffset = Math.abs(index - (total - 1) / 2) * 10;

                            return (
                                <div
                                    key={card.id}
                                    className="absolute"
                                    style={{
                                        transform: `translate(-50%, -50%) translate(${xOffset}px, ${yOffset}px) rotate(${angle}deg)`,
                                        zIndex: index,
                                        width: '12rem',
                                    }}
                                >
                                    <div className="animate-fly-up" style={{ animationDelay: `${index * 0.05}s` }}>
                                        <CardComponent
                                            card={card}
                                            playerMana={99}
                                            style={{
                                                transform: 'scale(0.6)',
                                                boxShadow: '0 0 30px rgba(226,199,116,0.6)' // Gold glow
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                        {/* Cursor Core Effect */}
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-botw-gold/30 rounded-full animate-ping opacity-30 pointer-events-none"></div>
                        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-botw-gold rotate-45 animate-[spin_3s_linear_infinite] pointer-events-none shadow-[0_0_30px_#e2c774]"></div>
                    </div>
                </div>
            )}

            {/* Destiny Draw Dragged Card */}
            {deckDragState.isActive && (
                <div
                    className="absolute top-0 left-0 pointer-events-none z-[60]"
                    style={{ transform: `translate(${deckDragState.position.x}px, ${deckDragState.position.y}px)` }}
                >
                    <div className="relative -translate-x-1/2 -translate-y-1/2 w-32 h-48 bg-botw-slate border-2 border-botw-gold rounded-lg shadow-[0_0_30px_rgba(226,199,116,0.5)] flex items-center justify-center animate-pulse">
                        <div className="text-botw-gold font-serif text-4xl">?</div>
                        <div className="absolute inset-0 bg-botw-gold/10 animate-pulse"></div>
                    </div>
                </div>
            )}

            {/* Finale Explosion Effect (Scatter) */}
            {isAnimatingFinale && finaleExplosionOrigin && (
                <div
                    className="absolute top-0 left-0 pointer-events-none z-[60]"
                    style={{ transform: `translate(${finaleExplosionOrigin.x}px, ${finaleExplosionOrigin.y}px)` }}
                >
                    {cardsInHand.map((card, index) => {
                        const r = (index * 137.508);
                        const angle = r * (Math.PI / 180);
                        const dist = 800 + (index * 100);
                        const tx = Math.cos(angle) * dist + 'px';
                        const ty = Math.sin(angle) * dist + 'px';
                        const tr = (index * 180 + 360) + 'deg';

                        return (
                            <div
                                key={card.id}
                                className="absolute animate-scatter"
                                style={{
                                    '--tx': tx,
                                    '--ty': ty,
                                    '--tr': tr,
                                } as React.CSSProperties}
                            >
                                <div className="w-48 h-72 absolute -left-24 -top-36">
                                    <CardComponent
                                        card={card}
                                        playerMana={99}
                                        style={{
                                            boxShadow: '0 0 40px rgba(255,255,255,0.9)'
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                    {/* Flash */}
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-white/20 rounded-full animate-[ping_0.8s_cubic-bezier(0,0,0.2,1)_forwards] mix-blend-overlay"></div>
                </div>
            )}

            {/* Player Interface Layer */}
            <div className="w-full relative flex-grow flex flex-col justify-end">

                {/* Interactive Elements */}
                <div className="absolute bottom-8 left-10 z-20">
                    <div className="flex items-center gap-6">
                        {/* Mana Orb */}
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            {/* Outer Rings */}
                            <div className="absolute inset-0 border-2 border-botw-blue/30 rounded-full animate-[spin_12s_linear_infinite]"></div>
                            <div className="absolute inset-2 border border-dashed border-botw-gold/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                            {/* Inner Glow */}
                            <div className="absolute inset-4 bg-botw-blue/10 rounded-full backdrop-blur-sm"></div>

                            <div className="flex flex-col items-center z-10">
                                <span className="text-3xl font-serif font-bold text-botw-blue drop-shadow-md">{playerMana}</span>
                                <div className="w-8 h-[1px] bg-botw-blue/50 my-1"></div>
                                <span className="text-[0.6rem] text-botw-blue/80 uppercase tracking-widest font-serif">{playerMana}/{playerMaxMana}</span>
                            </div>
                        </div>

                        {/* Deck UI for Destiny Draw */}
                        {demoMode === 'destinyDraw' && (
                            <div
                                className={`relative w-20 h-28 bg-botw-slate border-2 border-botw-gold/50 rounded-lg shadow-lg transition-transform ${isDestinyDrawUsed ? 'opacity-50 grayscale' : 'hover:scale-105 cursor-pointer'}`}
                                onMouseDown={onDeckTriggerStart}
                            >
                                {/* Deck Pattern */}
                                <div className="absolute inset-2 border border-botw-gold/20 rounded flex items-center justify-center">
                                    <div className="w-8 h-8 border border-botw-gold/30 rotate-45"></div>
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-botw-gold text-botw-slate font-bold flex items-center justify-center rounded-full text-xs">
                                    {isDestinyDrawUsed ? 0 : 20}
                                </div>
                                {!isDestinyDrawUsed && <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[0.6rem] text-botw-gold uppercase tracking-widest whitespace-nowrap">Hold & Drag</div>}
                            </div>
                        )}

                        <button
                            onClick={onSetupFavorable}
                            className="h-8 px-3 border border-dashed border-zinc-600 text-zinc-500 text-[0.6rem] font-serif hover:border-botw-gold hover:text-botw-gold transition-colors uppercase tracking-widest"
                            disabled={isFinaleReady || isAnimatingFinale || dragState.isActive || isHandSpinning}
                        >
                            debug: force_state
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-10 right-10 z-20">
                    <button className="group relative px-12 py-4 bg-botw-slate/80 border border-botw-gold/30 hover:bg-botw-gold/10 hover:border-botw-gold transition-all overflow-hidden">
                        {/* Ornamental corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-botw-gold"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-botw-gold"></div>

                        <span className="font-serif font-bold text-botw-cream group-hover:text-botw-gold tracking-[0.2em] uppercase relative z-10">
                            End Turn
                        </span>
                        <div className="absolute inset-0 bg-botw-gold/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                    </button>
                </div>

                {/* Player Hand */}
                <div className={`transition-opacity duration-300 ${(finaleDragState.isActive || isAnimatingFinale) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <PlayerHand
                        cards={cardsInHand}
                        playerMana={playerMana}
                        isAnimating={false}
                        draggedCardIds={draggedCardIds}
                        onCardLongPress={onCardLongPress}
                        demoMode={demoMode}
                        isSpinning={isHandSpinning}
                        heldCardId={heldCardId}
                        onCardPress={onCardPress}
                        onSpinAnimationEnd={onSpinAnimationEnd}
                        isDestinyDiscarding={isDestinyDiscarding}
                    />
                </div>
            </div>
        </div>
    );
};

export default BattleScene;