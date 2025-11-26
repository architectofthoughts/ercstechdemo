
export enum GameState {
  BATTLE_NORMAL,
  BATTLE_FINALE_READY,
  FINALE_ANIMATION,
  VICTORY,
}

export enum CardType {
  ATTACK,
  SKILL,
  POWER,
  STATUS,
  CURSE,
}

export interface Card {
  id: number;
  name: string;
  cost: number;
  description: string;
  type: CardType;
}

export interface EnemyIntent {
  type: 'attack' | 'defend' | 'debuff' | 'unknown';
  value?: number;
}

export interface EnemyState {
  id: string;
  hp: number;
  maxHp: number;
  intent: EnemyIntent;
  wasHit?: boolean;
}