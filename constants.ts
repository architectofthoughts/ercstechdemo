import { Card, CardType, EnemyState } from './types';

export const initialCards: Card[] = [
  { id: 901, name: 'Strike', cost: 1, description: 'Deal 6 damage.', type: CardType.ATTACK },
  { id: 903, name: 'Defend', cost: 1, description: 'Gain 5 Block.', type: CardType.SKILL },
  { id: 901, name: 'Strike', cost: 1, description: 'Deal 6 damage.', type: CardType.ATTACK },
  { id: 903, name: 'Defend', cost: 1, description: 'Gain 5 Block.', type: CardType.SKILL },
  { id: 901, name: 'Strike', cost: 1, description: 'Deal 6 damage.', type: CardType.ATTACK },
];

export const favorableCards: Card[] = [
  { id: 901, name: 'Strike', cost: 1, description: 'Deal 6 damage.', type: CardType.ATTACK },
  { id: 903, name: 'Defend', cost: 1, description: 'Gain 5 Block.', type: CardType.SKILL },
  { id: 901, name: 'Strike', cost: 1, description: 'Deal 6 damage.', type: CardType.ATTACK },
  { id: 903, name: 'Defend', cost: 1, description: 'Gain 5 Block.', type: CardType.SKILL },
  { id: 901, name: 'Strike', cost: 1, description: 'Deal 6 damage.', type: CardType.ATTACK },
];

// Increased to 8 cards for better spinning effect
export const spinningDemoCards: Card[] = [
  { id: 901, name: 'Strike', cost: 1, description: 'Deal 6 damage.', type: CardType.ATTACK },
  { id: 903, name: 'Defend', cost: 1, description: 'Gain 5 Block.', type: CardType.SKILL },
  { id: 9001, name: 'Unique Skill 1', cost: 1, description: 'Unique character ability.', type: CardType.SKILL },
  { id: 9002, name: 'Unique Skill 2', cost: 2, description: 'Unique character attack.', type: CardType.ATTACK },
  { id: 205, name: 'Headbutt', cost: 5, description: 'Deal 12 damage. (High Cost Demo)', type: CardType.ATTACK }, // Cost increased for demo
  { id: 105, name: 'Volley', cost: 4, description: 'Deal 4 damage to all enemies. (High Cost Demo)', type: CardType.ATTACK }, // Cost increased for demo
  { id: 204, name: 'Flex', cost: 0, description: 'Gain 2 Strength.', type: CardType.SKILL },
  { id: 204, name: 'Flex', cost: 0, description: 'Gain 2 Strength.', type: CardType.SKILL },
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