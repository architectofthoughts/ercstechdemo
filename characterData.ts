
export interface CharacterEntry {
  id: string;
  name: string;
  role: string;
  imageUrl: string; // 9:16 Portrait URL
}

// Replace the URLs below with your actual asset paths.
// Currently using placeholders with different colors to distinguish them.
export const CHARACTER_ROSTER: CharacterEntry[] = [
  {
    id: 'char_1',
    name: 'RIO',
    role: 'Ranger',
    imageUrl: 'https://placehold.co/450x800/1a1a1a/e2c774?text=RIO' 
  },
  {
    id: 'char_2',
    name: 'HYUNWOO',
    role: 'Brawler',
    imageUrl: 'https://placehold.co/450x800/1a1a1a/e2c774?text=HYUNWOO'
  },
  {
    id: 'char_3',
    name: 'JACKIE',
    role: 'Slasher',
    imageUrl: 'https://placehold.co/450x800/1a1a1a/e2c774?text=JACKIE'
  },
  {
    id: 'char_4',
    name: 'AYA',
    role: 'Shooter',
    imageUrl: 'https://placehold.co/450x800/1a1a1a/e2c774?text=AYA'
  },
  {
    id: 'char_5',
    name: 'FIORA',
    role: 'Duelist',
    imageUrl: 'https://placehold.co/450x800/1a1a1a/e2c774?text=FIORA'
  },
  {
    id: 'char_6',
    name: 'MAGNUS',
    role: 'Hammer',
    imageUrl: 'https://placehold.co/450x800/1a1a1a/e2c774?text=MAGNUS'
  },
  {
    id: 'char_7',
    name: 'ZAHIR',
    role: 'Mage',
    imageUrl: 'https://placehold.co/450x800/1a1a1a/e2c774?text=ZAHIR'
  },
  {
    id: 'char_8',
    name: 'NADINE',
    role: 'Hunter',
    imageUrl: 'https://placehold.co/450x800/1a1a1a/e2c774?text=NADINE'
  },
  {
    id: 'char_9',
    name: 'ISOL',
    role: 'Trapper',
    imageUrl: 'https://placehold.co/450x800/1a1a1a/e2c774?text=ISOL'
  },
  {
    id: 'char_10',
    name: 'LI DAILIN',
    role: 'Monk',
    imageUrl: 'https://placehold.co/450x800/1a1a1a/e2c774?text=LI+DAILIN'
  }
];
