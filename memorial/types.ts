export enum Rarity {
  UNIQUE = 'Unique',
  MYSTIC_RARE = 'Mystic Rare',
  LEGENDARY = 'Legendary',
  COMMON = 'Common'
}

export interface CardStats {
  atk: number;
  def: number;
}

export interface SnapshotBadge {
  label: string;
  color: string; // hex or tailwind class mapping
}

export interface SnapshotEntry {
  id: string;
  characterName: string;
  rarity: Rarity;
  stats: CardStats;
  imageUrl: string; // URL or Base64
  acquiredDate: string; // YYYY년 MM월 DD일
  acquiredTime: string; // HH:MM:SS
  acquisitionMethod: string; // e.g., "세션 세번째 Signing으로 획득"
  badges: SnapshotBadge[];
}