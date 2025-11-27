import { Card, CardType, EnemyState } from './types';

export const initialCards: Card[] = [
  { id: 1, name: 'STRIKE_V1', cost: 1, description: 'Deal 6 damage.', type: CardType.ATTACK },
  { id: 2, name: 'SHIELD_OS', cost: 1, description: 'Gain 5 Block.', type: CardType.SKILL },
  { id: 3, name: 'STRIKE_V1', cost: 1, description: 'Deal 6 damage.', type: CardType.ATTACK },
  { id: 4, name: 'BASH_EXE', cost: 2, description: 'Deal 8 damage. Apply 2 Vulnerable.', type: CardType.ATTACK },
  { id: 5, name: 'SHIELD_OS', cost: 1, description: 'Gain 5 Block.', type: CardType.SKILL },
];

export const favorableCards: Card[] = [
  { id: 6, name: 'H_BLADE++', cost: 2, description: 'Deal 15 damage.', type: CardType.ATTACK },
  { id: 7, name: 'SHRUG_OFF', cost: 1, description: 'Gain 8 Block. Draw 1 card.', type: CardType.SKILL },
  { id: 8, name: 'RAMPAGE', cost: 1, description: 'Deal 8 damage. Scale +5.', type: CardType.ATTACK },
  { id: 9, name: 'FLEX_MOD', cost: 0, description: 'Gain 2 Strength.', type: CardType.SKILL },
  { id: 10, name: 'THUNDER', cost: 1, description: 'Deal 4 damage. Apply Vulnerable ALL.', type: CardType.ATTACK },
];

// Increased to 8 cards for better spinning effect
export const spinningDemoCards: Card[] = [
  { id: 11, name: 'OBLITERATE', cost: 4, description: 'Deal 20 damage.', type: CardType.ATTACK },
  { id: 12, name: 'NULLIFY', cost: 1, description: 'Gain 5 Block.', type: CardType.SKILL },
  { id: 13, name: 'ZAP', cost: 0, description: 'Deal 3 damage.', type: CardType.SKILL },
  { id: 14, name: 'BASH_EXE', cost: 2, description: 'Deal 8 damage.', type: CardType.ATTACK },
  { id: 15, name: 'STRIKE_V1', cost: 1, description: 'Deal 6 damage.', type: CardType.ATTACK },
  { id: 16, name: 'REBOOT', cost: 0, description: 'Shuffle hand.', type: CardType.SKILL },
  { id: 17, name: 'METEOR', cost: 5, description: 'Deal 30 damage.', type: CardType.ATTACK },
  { id: 18, name: 'CORE_DUMP', cost: 1, description: 'Remove all debuffs.', type: CardType.SKILL },
];

export const initialEnemies: EnemyState[] = [
  { id: 'enemy_1', hp: 120, maxHp: 120, intent: { type: 'attack', value: 15 } },
  { id: 'enemy_2', hp: 150, maxHp: 150, intent: { type: 'defend', value: 20 } },
  { id: 'enemy_3', hp: 120, maxHp: 120, intent: { type: 'attack', value: 15 } },
];

export const favorableEnemies: EnemyState[] = [
  { id: 'enemy_1', hp: 15, maxHp: 120, intent: { type: 'debuff' } },
  { id: 'enemy_2', hp: 10, maxHp: 150, intent: { type: 'unknown' } },
];

export const bossEnemy: EnemyState[] = [
  { id: 'boss_omega', hp: 500, maxHp: 500, intent: { type: 'attack', value: 50 } }
];