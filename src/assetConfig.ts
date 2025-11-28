export type AssetCategory = 'cards' | 'events' | 'acts' | 'characters' | 'guide' | 'memorial' | 'gacha';

// Define a type for the asset map where keys are IDs and values are image paths
type AssetMap = Record<string, string>;

// The main configuration object holding all asset paths
export const ASSET_IMAGES: Record<AssetCategory, AssetMap> = {
    cards: {
        '101': '/assets/cards/101.png',
        '102': '/assets/cards/102.png',
        '103': '/assets/cards/103.png',
        '104': '/assets/cards/104.png',
        '105': '/assets/cards/105.png',
        '1001': '/assets/cards/1001.png',
        '1002': '/assets/cards/1002.png',
        '201': '/assets/cards/201.png',
        '202': '/assets/cards/202.png',
        '203': '/assets/cards/203.png',
        '204': '/assets/cards/204.png',
        '205': '/assets/cards/205.png',
        '301': '/assets/cards/301.png',
        '302': '/assets/cards/302.png',
        '303': '/assets/cards/303.png',
        '304': '/assets/cards/304.png',
        '3001': '/assets/cards/3001.png',
        '3002': '/assets/cards/3002.png',
        '901': '/assets/cards/901.png',
        '902': '/assets/cards/902.png',
        '903': '/assets/cards/903.png',
        '904': '/assets/cards/904.png',
        '905': '/assets/cards/905.png',
        '9001': '/assets/cards/9001.png',
        '9002': '/assets/cards/9002.png',

        // Reward Cards
        '801': '/assets/cards/9003.png', // 
        '802': '/assets/cards/9004.png', // 
        '803': '/assets/cards/9005.png', // 
        // DNA Card
        'dna_result': '/assets/cards/9006.png', // DNA Result -> Unique Skill 1 (Placeholder)
    },
    events: {
        'shrine': '/assets/events/shrine.jpg',
        'fortune_teller': '/assets/events/fortune_teller.png',
    },
    acts: {
        '1': '/assets/common/1.png',
        '2': '/assets/common/2.png',
        '3': '/assets/common/3.png',
    },
    characters: {
        'char_1': '/assets/chars/Rio.jpg',
        'char_2': '/assets/chars/Hyunwoo.jpg',
        'char_3': '/assets/chars/Jackie.jpg',
        'char_1_skin_1': '/assets/memorial/card_schoolgirl.png', // Placeholder for Rio's skin
    },
    guide: {
        'rumi_portrait': '/assets/common/rumi.jpg',
    },
    memorial: {
        'card_bunny': '/assets/memorial/card_bunny.png',
        'card_schoolgirl': '/assets/memorial/card_schoolgirl.png',
    },
    gacha: {
        'gacha_alpha': '/assets/memorial/small_bunny.png',
        'gacha_omega': '/assets/memorial/small_schoolgirl.jpg',
    }
};

/**
 * Helper function to get the image path for a specific asset.
 * Returns undefined if no image is configured for the given category and ID.
 * 
 * @param category The category of the asset (cards, events, acts, characters)
 * @param id The unique ID of the asset
 * @returns The image path string or undefined
 */
export const getAssetPath = (category: AssetCategory, id: string | number): string | undefined => {
    const categoryAssets = ASSET_IMAGES[category];
    if (!categoryAssets) return undefined;

    return categoryAssets[String(id)];
};
