
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { GameState, Card, EnemyState, CardType } from './types';
import { initialCards, favorableCards, initialEnemies, favorableEnemies, spinningDemoCards } from './constants';
import BattleScene from './components/BattleScene';
import VictoryScreen from './components/VictoryScreen';
import MapDemo from './components/MapDemo';
import CharacterSelectDemo from './components/CharacterSelectDemo';
import { PlayArrowIcon, PlusIcon, ClockIcon } from './components/icons';
import { APP_TEXTS, THEME, MODE_CONFIG } from './themeConfig';

import RewardScreen from './components/RewardScreen';
import ExtractionScreen from './components/ExtractionScreen';
import ActClearScreen from './components/ActClearScreen';
import MemorialApp from './memorial/App';
import DNAScreen from './components/DNAScreen';
import EventDemo from './components/EventDemo';
import ActSelectScreen from './components/ActSelectScreen';

type DemoMode = 'select' | 'finale' | 'multiPlay' | 'spinning' | 'destinyDraw' | 'map' | 'characterSelect' | 'memorial' | 'reward' | 'extraction' | 'actClear' | 'dna' | 'event' | 'actPlay';

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

// RELAXED THRESHOLDS for easier activation
const SWIPE_VELOCITY_THRESHOLD = -0.5; // px/ms, lower absolute value = easier
const SWIPE_DISTANCE_THRESHOLD = -50; // px, shorter distance = easier

const App: React.FC = () => {
  const [demoMode, setDemoMode] = useState<DemoMode>('select');
  const [gameState, setGameState] = useState<GameState>(GameState.BATTLE_NORMAL);
  const [enemies, setEnemies] = useState<EnemyState[]>(initialEnemies);
  const [playerMana, setPlayerMana] = useState(3);
  const [playerMaxMana, setPlayerMaxMana] = useState(3);
  const [cardsInHand, setCardsInHand] = useState<Card[]>(initialCards);

  const [dragState, setDragState] = useState<DragState>({ isActive: false, cards: [], position: { x: 0, y: 0 } });
  const [finaleDragState, setFinaleDragState] = useState<FinaleDragState>({ isActive: false, position: { x: 0, y: 0 } });
  const [finaleExplosionOrigin, setFinaleExplosionOrigin] = useState<{ x: number, y: number } | null>(null);

  const [deckDragState, setDeckDragState] = useState<DeckDragState>({ isActive: false, position: { x: 0, y: 0 } });
  const [isDestinyDrawUsed, setIsDestinyDrawUsed] = useState(false);
  const [isDestinyDiscarding, setIsDestinyDiscarding] = useState(false);

  const [isHandSpinning, setIsHandSpinning] = useState(false);
  const [heldCardId, setHeldCardId] = useState<number | null>(null);
  const swipeState = useRef({ isHolding: false, startX: 0, startTime: 0 });
  const finaleTriggerTimeout = useRef<number | null>(null);
  const deckTriggerTimeout = useRef<number | null>(null);

  // Act Play Demo State
  const [actPlayStep, setActPlayStep] = useState<'SELECT_ACT' | 'MAP' | 'BATTLE' | 'REWARD'>('SELECT_ACT');

  // Visual feedback for combat actions
  const [combatLog, setCombatLog] = useState<string | null>(null);

  const totalEnemyHP = enemies.reduce((sum, enemy) => sum + enemy.hp, 0);
  const isFinaleReady = demoMode === 'finale' && totalEnemyHP > 0 && totalEnemyHP <= 50 && playerMana >= 3 && cardsInHand.length > 0;

  useEffect(() => {
    if (isFinaleReady && gameState === GameState.BATTLE_NORMAL) {
      setGameState(GameState.BATTLE_FINALE_READY);
    } else if (!isFinaleReady && gameState === GameState.BATTLE_FINALE_READY) {
      setGameState(GameState.BATTLE_NORMAL);
    }
  }, [isFinaleReady, gameState]);

  // Check for victory condition
  useEffect(() => {
    if ((gameState === GameState.BATTLE_NORMAL || gameState === GameState.BATTLE_FINALE_READY) && enemies.length > 0) {
      const allEnemiesDead = enemies.every(e => e.hp <= 0);
      if (allEnemiesDead) {
        // Add a small delay for the death animation before showing victory screen
        const timer = setTimeout(() => {
          setGameState(GameState.VICTORY);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [enemies, gameState]);

  const selectDemoMode = (mode: DemoMode) => {
    setDemoMode(mode);
    resetGame(mode);
  };

  const resetGame = useCallback((mode: DemoMode = 'select') => {
    setEnemies(initialEnemies);
    setPlayerMana(3);
    setPlayerMaxMana(3);
    setCardsInHand(mode === 'spinning' ? spinningDemoCards : initialCards);
    setGameState(GameState.BATTLE_NORMAL);
    setDragState({ isActive: false, cards: [], position: { x: 0, y: 0 } });
    setFinaleDragState({ isActive: false, position: { x: 0, y: 0 } });
    setDeckDragState({ isActive: false, position: { x: 0, y: 0 } });
    setFinaleExplosionOrigin(null);
    setIsDestinyDrawUsed(false);
    setIsDestinyDiscarding(false);
    setIsHandSpinning(false);
    setHeldCardId(null);
    setCombatLog(null);
    if (mode === 'select') {
      setDemoMode('select');
    }
    setActPlayStep('SELECT_ACT'); // Reset Act Play step
  }, []);

  const setupFavorableConditions = () => {
    if (demoMode === 'reward' || demoMode === 'actPlay') {
      setEnemies([{
        id: 'dying_guardian',
        hp: 1,
        maxHp: 100,
        intent: { type: 'attack', value: 5 }
      }]);
      setPlayerMana(3);
      setCardsInHand([
        { id: 1, name: "Finishing Blow", cost: 1, description: "Deal 5 damage.", type: CardType.ATTACK },
        { id: 2, name: "Defend", cost: 1, description: "Gain 5 Block.", type: CardType.SKILL },
        { id: 3, name: "Strike", cost: 1, description: "Deal 6 damage.", type: CardType.ATTACK }
      ]);
      return;
    }

    if (demoMode === 'finale') {
      setEnemies(favorableEnemies);
      setPlayerMana(5);
      setPlayerMaxMana(5);
      setCardsInHand(favorableCards);
    } else if (demoMode === 'multiPlay') {
      setEnemies(initialEnemies.map(e => ({ ...e, hp: e.maxHp })));
      setCardsInHand(initialCards);
      setPlayerMana(4);
      setPlayerMaxMana(4);
    } else if (demoMode === 'spinning') {
      setCardsInHand(spinningDemoCards);
      setPlayerMana(3);
      setPlayerMaxMana(3);
    } else if (demoMode === 'destinyDraw') {
      setCardsInHand(initialCards);
      setPlayerMana(3);
      setPlayerMaxMana(3);
    }
  };

  const executeFinaleMove = (x: number, y: number) => {
    setFinaleExplosionOrigin({ x, y });
    setGameState(GameState.FINALE_ANIMATION);
    setEnemies(currentEnemies => currentEnemies.map(e => ({ ...e, hp: 0 })));
    setFinaleDragState({ isActive: false, position: { x: 0, y: 0 } });
    setTimeout(() => {
      setGameState(GameState.VICTORY);
    }, 2500);
  };

  const executeDestinyDraw = () => {
    setIsDestinyDrawUsed(true);
    setIsDestinyDiscarding(true);
    setCombatLog("Destiny Draw!");

    setTimeout(() => {
      setCardsInHand([]);
      setIsDestinyDiscarding(false);

      setTimeout(() => {
        const destinyCard: Card = {
          id: Date.now(),
          name: "DESTINY_DRAW",
          cost: 0,
          description: "Deal 50 damage. Draw 2 cards.",
          type: CardType.ATTACK
        };
        setCardsInHand([destinyCard]);
      }, 200);
    }, 800);
  };

  const handleFinaleTriggerStart = (e: React.MouseEvent) => {
    if (!isFinaleReady || gameState !== GameState.BATTLE_FINALE_READY) return;

    const { clientX, clientY } = e;

    finaleTriggerTimeout.current = window.setTimeout(() => {
      setFinaleDragState({
        isActive: true,
        position: { x: clientX, y: clientY }
      });
      finaleTriggerTimeout.current = null;
    }, 300);
  };

  const handleDeckTriggerStart = (e: React.MouseEvent) => {
    if (demoMode !== 'destinyDraw' || isDestinyDrawUsed || cardsInHand.length < 3) return;

    const { clientX, clientY } = e;

    deckTriggerTimeout.current = window.setTimeout(() => {
      setDeckDragState({
        isActive: true,
        position: { x: clientX, y: clientY }
      });
      deckTriggerTimeout.current = null;
    }, 300);
  };

  const handleCardLongPress = (startCard: Card, position: { x: number; y: number }) => {
    if (dragState.isActive || finaleDragState.isActive) return;

    let toSelect: Card[] = [];

    if (demoMode === 'multiPlay') {
      const candidates = cardsInHand.filter(c => c.type === startCard.type).sort(a => a.id === startCard.id ? -1 : 1);
      let cost = 0;
      for (const card of candidates) {
        if (cost + card.cost <= playerMana) {
          cost += card.cost;
          toSelect.push(card);
        }
      }
    } else {
      if (startCard.cost <= playerMana) {
        toSelect = [startCard];
      }
    }

    if (toSelect.length > 0) {
      setDragState({ isActive: true, cards: toSelect, position });
    }
  };

  const handleDropOnEnemies = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (!dragState.isActive || dragState.cards.length === 0) return;

    const cost = dragState.cards.reduce((sum, c) => sum + c.cost, 0);

    let totalDamage = 0;
    let totalBlock = 0;

    dragState.cards.forEach(c => {
      if (c.type === CardType.ATTACK) {
        const match = c.description.match(/Deal (\d+)/);
        if (match) totalDamage += parseInt(match[1]);
      } else if (c.type === CardType.SKILL) {
        const match = c.description.match(/Gain (\d+)/);
        if (match) totalBlock += parseInt(match[1]);
      }
    });

    setPlayerMana(m => m - cost);
    setCardsInHand(hand => hand.filter(c => !dragState.cards.some(dc => dc.id === c.id)));

    setEnemies(currentEnemies => {
      const newEnemies = [...currentEnemies];
      const targetIndex = newEnemies.findIndex(e => e.hp > 0);

      if (targetIndex !== -1 && totalDamage > 0) {
        newEnemies[targetIndex] = {
          ...newEnemies[targetIndex],
          hp: Math.max(0, newEnemies[targetIndex].hp - totalDamage),
          wasHit: true
        };
      } else {
        newEnemies.forEach(e => e.wasHit = true);
      }
      return newEnemies;
    });

    if (dragState.cards.length > 1) {
      const typeName = dragState.cards[0].type === CardType.ATTACK ? 'Assault' : 'Defense';
      const damageText = totalDamage > 0 ? ` // DMG: ${totalDamage}` : '';
      const blockText = totalBlock > 0 ? ` // BLK: ${totalBlock}` : '';
      setCombatLog(`${typeName} Chain [x${dragState.cards.length}]${damageText}${blockText}`);
    } else {
      if (totalDamage > 0) setCombatLog(`-${totalDamage} Vitality`);
      else if (totalBlock > 0) setCombatLog(`+${totalBlock} Guard`);
    }

    setTimeout(() => {
      setEnemies(currentEnemies => currentEnemies.map(e => ({ ...e, wasHit: false })));
    }, 300);

    setTimeout(() => {
      setCombatLog(null);
    }, 2500);

    setDragState({ isActive: false, cards: [], position: { x: 0, y: 0 } });
  };

  const handleCardPress = (card: Card, e: React.MouseEvent) => {
    if (demoMode === 'spinning' && !isHandSpinning && !finaleDragState.isActive) {
      swipeState.current = {
        isHolding: true,
        startX: e.clientX,
        startTime: Date.now(),
      };
      setHeldCardId(card.id);
    }
  };

  const handleSpinAnimationEnd = () => {
    setCardsInHand(currentHand => [...currentHand].sort((a, b) => a.cost - b.cost));
    setIsHandSpinning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragState.isActive) {
      setDragState(prev => ({ ...prev, position: { x: e.clientX, y: e.clientY } }));
    }

    if (finaleDragState.isActive) {
      setFinaleDragState(prev => ({ ...prev, position: { x: e.clientX, y: e.clientY } }));
    }

    if (deckDragState.isActive) {
      setDeckDragState(prev => ({ ...prev, position: { x: e.clientX, y: e.clientY } }));
    }

    if (demoMode === 'spinning' && swipeState.current.isHolding) {
      const dx = e.clientX - swipeState.current.startX;
      const dt = Date.now() - swipeState.current.startTime;
      const velocity = dx / (dt || 1);

      if (dt > 30) {
        if ((velocity < SWIPE_VELOCITY_THRESHOLD) || (dx < SWIPE_DISTANCE_THRESHOLD)) {
          setIsHandSpinning(true);
          swipeState.current = { isHolding: false, startX: 0, startTime: 0 };
          setHeldCardId(null);
        }
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (finaleTriggerTimeout.current) {
      clearTimeout(finaleTriggerTimeout.current);
      finaleTriggerTimeout.current = null;
    }

    if (deckTriggerTimeout.current) {
      clearTimeout(deckTriggerTimeout.current);
      deckTriggerTimeout.current = null;
    }

    if (dragState.isActive) {
      setDragState({ isActive: false, cards: [], position: { x: 0, y: 0 } });
    }

    if (finaleDragState.isActive) {
      const screenHeight = window.innerHeight;
      if (e.clientY < screenHeight * 0.7) {
        executeFinaleMove(e.clientX, e.clientY);
      } else {
        setFinaleDragState({ isActive: false, position: { x: 0, y: 0 } });
      }
    }

    if (deckDragState.isActive) {
      const screenHeight = window.innerHeight;
      if (e.clientY > screenHeight * 0.6) {
        executeDestinyDraw();
      }
      setDeckDragState({ isActive: false, position: { x: 0, y: 0 } });
    }

    if (swipeState.current.isHolding) {
      swipeState.current.isHolding = false;
      setHeldCardId(null);
    }
  };

  const draggedCardIds = useMemo(() => new Set(dragState.cards.map(c => c.id)), [dragState.cards]);

  const renderContent = () => {
    if (demoMode === 'select') {
      return (
        <div className="w-full h-full flex flex-col items-center pt-24 px-8 relative z-10 max-w-4xl mx-auto overflow-y-auto scrollbar-hide">
          {/* Header */}
          <div className="text-center mb-16 relative w-full flex-shrink-0">
            {/* Decorative Stars/Lines */}
            <div className="flex justify-center items-center gap-2 mb-3 text-botw-gold opacity-80">
              <div className="w-2 h-px bg-current"></div>
              <div className="text-xs">✧</div>
              <div className="w-2 h-px bg-current"></div>
            </div>

            <div className={`${THEME.fonts.body} ${THEME.colors.accent} text-xs tracking-[0.3em] uppercase mb-2`}>
              {APP_TEXTS.header.systemLabel}
            </div>
            <h1 className={`${THEME.fonts.heading} ${THEME.textSizes.headerTitle} ${THEME.colors.primary} drop-shadow-lg`}>
              {APP_TEXTS.header.title}
            </h1>
            <div className={`${THEME.fonts.body} ${THEME.textSizes.headerSubtitle} ${THEME.colors.muted} mt-3`}>
              {APP_TEXTS.header.subtitle}
            </div>
          </div>

          <div className="w-full flex flex-col gap-8 pb-20">
            {['Combat Demo', 'Act Map Demo', 'Flow Demo', 'ETC'].map((category) => (
              <div key={category} className="w-full">
                <div className="flex items-center gap-4 mb-4 opacity-80">
                  <div className="h-px flex-1 bg-botw-uiBorder"></div>
                  <h3 className={`${THEME.fonts.heading} text-botw-gold text-sm tracking-[0.2em] uppercase`}>{category}</h3>
                  <div className="h-px flex-1 bg-botw-uiBorder"></div>
                </div>

                <div className="flex flex-col gap-3">
                  {MODE_CONFIG.filter((m) => m.category === category).map((mode) => (
                    <div
                      key={mode.id}
                      onClick={() => selectDemoMode(mode.id as any)}
                      className={`group relative w-full py-6 px-8 bg-botw-uiDark/40 border border-botw-uiBorder hover:border-botw-blue hover:bg-botw-uiDark/70 flex items-center cursor-pointer transition-all duration-300 flex-shrink-0`}
                    >
                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center relative z-10">
                        <h2 className={`${THEME.fonts.heading} ${THEME.textSizes.cardTitle} ${THEME.colors.primary} group-hover:text-botw-blue transition-colors mb-1`}>
                          {mode.title}
                        </h2>
                        <p className={`${THEME.fonts.body} text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors`}>
                          {mode.description}
                        </p>
                      </div>

                      {/* Right Side Arrow */}
                      <div className="pl-6 text-botw-blue opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                        <PlayArrowIcon className="w-6 h-6" />
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-botw-blue/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto mb-8 flex-shrink-0">
            <div className={`${THEME.fonts.body} ${THEME.colors.muted} text-[0.65rem] tracking-[0.2em] flex items-center gap-2 opacity-50`}>
              <div className="w-2 h-2 border border-current rounded-full animate-[spin_10s_linear_infinite]"></div>
              {APP_TEXTS.footer.text}
            </div>
          </div>
        </div>
      );
    }

    if (demoMode === 'map') {
      return <MapDemo onBackToMenu={() => resetGame('select')} onExtraction={() => setDemoMode('actClear')} />;
    }

    if (demoMode === 'actClear') {
      return (
        <ActClearScreen
          onNextAct={() => setDemoMode('map')}
          onExtract={() => setDemoMode('extraction')}
        />
      );
    }

    if (demoMode === 'characterSelect') {
      return <CharacterSelectDemo onBackToMenu={() => resetGame('select')} />;
    }

    if (demoMode === 'memorial') {
      return (
        <div className="relative w-full h-full">
          <MemorialApp />
          <button
            onClick={() => resetGame('select')}
            className="fixed top-4 left-4 z-50 px-4 py-2 bg-black/50 text-white border border-white/20 rounded hover:bg-black/70 transition-colors"
          >
            ← Back to Menu
          </button>
        </div>
      );
    }

    if (demoMode === 'actPlay') {
      if (actPlayStep === 'SELECT_ACT') {
        return (
          <ActSelectScreen
            onSelectAct={(actId) => {
              if (actId === 1) setActPlayStep('MAP');
            }}
            onBackToMenu={() => resetGame('select')}
          />
        );
      }
      if (actPlayStep === 'MAP') {
        return (
          <MapDemo
            onBackToMenu={() => resetGame('select')}
            onNodeSelect={(type) => {
              if (type === 'battle') {
                setActPlayStep('BATTLE');
                setGameState(GameState.BATTLE_NORMAL);
                setEnemies(initialEnemies); // Reset enemies for battle
                setCardsInHand(initialCards);
              }
            }}
          />
        );
      }
      if (actPlayStep === 'BATTLE') {
        if (gameState === GameState.VICTORY) {
          // Auto transition to reward after victory in Act Play
          // But BattleScene handles victory screen internally? 
          // Wait, renderContent checks gameState === VICTORY below.
          // We need to intercept that or let it fall through.
          // If gameState is VICTORY, the below block handles it.
          // But we want to show RewardScreen specifically for Act Play.
        }
      }
      if (actPlayStep === 'REWARD') {
        return <RewardScreen onBackToMenu={() => resetGame('select')} />;
      }
    }

    if (gameState === GameState.VICTORY) {
      if (demoMode === 'reward' || (demoMode === 'actPlay' && actPlayStep === 'BATTLE')) {
        return <RewardScreen onBackToMenu={() => resetGame('select')} />;
      }
      return <VictoryScreen onBackToMenu={() => resetGame('select')} />;
    }

    if (demoMode === 'extraction') {
      return <ExtractionScreen onBackToMenu={() => resetGame('select')} />;
    }

    if (demoMode === 'dna') {
      return <DNAScreen onBackToMenu={() => resetGame('select')} />;
    }

    if (demoMode === 'event') {
      return <EventDemo onBackToMenu={() => resetGame('select')} />;
    }

    return (
      <BattleScene
        demoMode={demoMode as 'finale' | 'multiPlay' | 'spinning' | 'destinyDraw'}
        gameState={gameState}
        enemies={enemies}
        playerMana={playerMana}
        playerMaxMana={playerMaxMana}
        cardsInHand={cardsInHand}
        dragState={dragState}
        finaleDragState={finaleDragState}
        deckDragState={deckDragState}
        isDestinyDrawUsed={isDestinyDrawUsed}
        isDestinyDiscarding={isDestinyDiscarding}
        finaleExplosionOrigin={finaleExplosionOrigin}
        draggedCardIds={draggedCardIds}
        isHandSpinning={isHandSpinning}
        heldCardId={heldCardId}
        combatLog={combatLog}
        onFinaleTriggerStart={handleFinaleTriggerStart}
        onDeckTriggerStart={handleDeckTriggerStart}
        onSetupFavorable={setupFavorableConditions}
        onCardLongPress={handleCardLongPress}
        onDropOnEnemies={handleDropOnEnemies}
        onCardPress={handleCardPress}
        onSpinAnimationEnd={handleSpinAnimationEnd}
        onBackToMenu={() => resetGame('select')}
      />
    );
  };

  return (
    <main
      className="w-screen h-screen overflow-hidden text-botw-cream select-none relative bg-botw-dark"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="bg-noise"></div>
      <div className="vignette"></div>
      {/* Floating particles background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-botw-blue/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-botw-gold/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {renderContent()}
    </main>
  );
};

export default App;
