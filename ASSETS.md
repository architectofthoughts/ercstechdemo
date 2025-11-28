# Game Asset Documentation

This document lists all the assets that can be customized with images in the game.
To add an image, place the file in your project (e.g., `public/assets/...`) and update `src/assetConfig.ts` with the path.

## 1. Characters
**Recommended Size**: 9:16 Aspect Ratio (e.g., 450x800px)
**Usage**: Character Selection Screen (Portrait), Party Selection Slots

| ID | Name | Role |
| :--- | :--- | :--- |
| `char_1` | RIO | Ranger |
| `char_2` | HYUNWOO | Brawler |
| `char_3` | JACKIE | Slasher |
| `char_4` | AYA | Shooter |
| `char_5` | FIORA | Duelist |
| `char_6` | MAGNUS | Hammer |
| `char_7` | ZAHIR | Mage |
| `char_8` | NADINE | Hunter |
| `char_9` | ISOL | Trapper |
| `char_10` | LI DAILIN | Monk |

## 2. Acts
**Recommended Size**: 2:3 Aspect Ratio (e.g., 400x600px) or similar vertical poster format.
**Usage**: Act Selection Screen Cards

| ID | Title | Subtitle |
| :--- | :--- | :--- |
| `1` | ACT I | The Beginning |
| `2` | ACT II | The Journey |
| `3` | ACT III | The Finale |

## 3. Events
**Recommended Size**: 1:3 Aspect Ratio (e.g., 300x900px) - Tall vertical slice
**Usage**: Event Interaction Screen (Left side illustration)

| ID | Title | Description |
| :--- | :--- | :--- |
| `shrine` | 오래된 성소 | Old Shrine |
| `fortune_teller` | 예쁜 점술가 | Fortune Teller |

## 4. Cards
**Recommended Size**: 1:1 Aspect Ratio (Square) or 4:3 (Landscape) for the art box.
**Usage**: Battle Cards, Deck Confirmation

### Ranger (Rio)
| ID | Name | Type |
| :--- | :--- | :--- |
| `101`, `102` | Quick Shot | ATTACK |
| `103` | Dodge | SKILL |
| `104` | Aim | SKILL |
| `105` | Volley | ATTACK |
| `1001` | Kyudo | ATTACK |
| `1002` | Spirit Arrow | ATTACK |

### Brawler (Hyunwoo)
| ID | Name | Type |
| :--- | :--- | :--- |
| `201`, `202` | Punch | ATTACK |
| `203` | Guard | SKILL |
| `204` | Flex | SKILL |
| `205` | Headbutt | ATTACK |

### Slasher (Jackie)
| ID | Name | Type |
| :--- | :--- | :--- |
| `301`, `302` | Slash | ATTACK |
| `303` | Parry | SKILL |
| `304` | Bleed | SKILL |
| `305` | Execute | ATTACK |
| `3001` | Adrenaline | SKILL |
| `3002` | Chainsaw | ATTACK |

### Default / Common
| ID | Name | Type |
| :--- | :--- | :--- |
| `901`, `902` | Strike | ATTACK |
| `903`, `904` | Defend | SKILL |
| `905` | Prepare | SKILL |
| `9001` | Unique Skill 1 | SKILL |
| `9002` | Unique Skill 2 | ATTACK |

## 5. Memorial
**Recommended Size**: 2:3 Aspect Ratio (e.g., 400x600px)
**Usage**: Memorial Snapshot Cards

| ID | Name | Description |
| :--- | :--- | :--- |
| `card_bunny` | Subject: ALPHA | Bunny Girl Illustration |
| `card_schoolgirl` | Subject: OMEGA | Schoolgirl Illustration |

## 6. Gacha
**Recommended Size**: 2:3 Aspect Ratio (e.g., 400x600px)
**Usage**: Gacha Result Cards (Can be different from Memorial)

| ID | Name | Description |
| :--- | :--- | :--- |
| `gacha_alpha` | Subject: ALPHA | Gacha Result Image |
| `gacha_omega` | Subject: OMEGA | Gacha Result Image |

## 7. Guide Character
**Recommended Size**: 1:1 Aspect Ratio (Square) or similar.
**Usage**: In-game guide subtitle portrait.

| ID | Name | Description |
| :--- | :--- | :--- |
| `rumi_portrait` | Rumi | The cute AI robot guide. |

## 8. Reward Cards (Placeholder)
| ID | Name | Mapped Asset |
| :--- | :--- | :--- |
| `801` | Divine Strike | Execute (`305`) |
| `802` | Ancient Shield | Guard (`203`) |
| `803` | Time Warp | Flex (`204`) |

## 9. DNA Card (Placeholder)
| ID | Name | Mapped Asset |
| :--- | :--- | :--- |
| `dna_result` | DNA Result | Unique Skill 1 (`9001`) |
