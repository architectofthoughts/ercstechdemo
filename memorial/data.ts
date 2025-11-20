
import { Rarity, SnapshotEntry } from './types';

// Application Text Configuration
export const APP_TEXTS = {
  header: {
    systemLabel: "Memorial Snapshot",
    title: "Eternal Return : Clipshift",
    subtitle: "- System -"
  },
  footer: {
    text: "NIMBLENEURON. 1.0.0"
  }
};

// Centralized Theme Configuration
// Change fonts and sizes here to affect the whole app
export const THEME = {
  fonts: {
    heading: "font-['Hahmlet']", // The decorative serif font
    body: "font-sans",           // Standard sans-serif (Noto Sans KR)
    mono: "font-mono"            // Monospace for tech details
  },
  textSizes: {
    headerTitle: "text-3xl md:text-4xl",
    headerSubtitle: "text-sm",
    cardTitle: "text-lg",
    cardMeta: "text-xs md:text-sm",
    cardBody: "text-sm md:text-base"
  }
};

// Asset Configuration
export const ASSETS = {
  placeholderCard: 'https://placehold.co/400x600/1c1917/FFF?text=No+Image'
};

// Initial Snapshot Data
export const INITIAL_SNAPSHOTS: SnapshotEntry[] = [
  {
    id: '1',
    characterName: '사랑의 추적자 리오',
    rarity: Rarity.MYSTIC_RARE,
    stats: { atk: 300, def: 80 },
    // Updated path: ensure 'photo' folder is in the same directory as index.html
    imageUrl: 'https://i.imgur.com/Cy1eYSv.png', 
    acquiredDate: '2025년 11월 18일',
    acquiredTime: '13:50:32',
    acquisitionMethod: '세션 세번째 Shuffle로 획득',
    badges: [
      { label: '첫 만남', color: 'bg-cyan-950 text-cyan-300 border-cyan-700' }
    ]
  },
  {
    id: '2',
    characterName: '리오',
    rarity: Rarity.UNIQUE,
    stats: { atk: 210, def: 120 },
    // Updated path
    imageUrl: 'https://i.imgur.com/IfrNu6e.png', 
    acquiredDate: '2025년 12월 18일',
    acquiredTime: '22:10:52',
    acquisitionMethod: '세션 첫번째 Shuffle로 획득',
    badges: []
  }
];
