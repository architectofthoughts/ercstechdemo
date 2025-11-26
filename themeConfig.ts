
// Application Text Configuration
export const APP_TEXTS = {
  header: {
    systemLabel: "CARD ACTION TECHDEMO",
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
    heading: "font-hahmlet", // The decorative serif font (Hahmlet)
    body: "font-sans",           // Standard sans-serif (Lato)
    mono: "font-mono"            // Monospace for tech details
  },
  textSizes: {
    headerTitle: "text-5xl md:text-6xl",
    headerSubtitle: "text-sm tracking-[0.3em]",
    cardTitle: "text-xl font-bold",
    cardMeta: "text-xs tracking-widest opacity-60",
    cardBody: "text-sm opacity-80"
  },
  colors: {
    primary: "text-botw-cream",
    accent: "text-botw-blue",
    gold: "text-botw-gold",
    muted: "text-zinc-500"
  }
};

export const MODE_CONFIG = [
  {
    id: 'finale',
    title: "Secret Art: Finale Strike",
    description: "빈사가 된 적들에게 모든 카드를 던져 호쾌한 마무리"
  },
  {
    id: 'multiPlay',
    title: "Synchronized Assault",
    description: "동일한 카드를 모아서 한번에 사용"
  },
  {
    id: 'spinning',
    title: "Inventory Sorting",
    description: "손패의 카드를 비용 순으로 정렬"
  },
  {
    id: 'destinyDraw',
    title: "Destiny Draw",
    description: "모든 패를 버리고 운명의 드로우 (전투당 1회)"
  },
  {
    id: 'reward',
    title: "Victory Rewards",
    description: "전투 승리 후 보상 획득 및 카드 선택 연출"
  },
  {
    id: 'map',
    title: "Procedural Map Tree",
    description: "이벤트, 전투, 휴식, 보스로 이어지는 절차적 맵 구조"
  },
  {
    id: 'characterSelect',
    title: "Character Select",
    description: "10명의 캐릭터 중 2명을 선택하여 스쿼드 구성"
  },
  {
    id: 'memorial',
    title: "Memorial System",
    description: "기억의 조각을 모아 스냅샷을 기록하는 시스템"
  },
  {
    id: 'extraction',
    title: "Extraction Protocol",
    description: "액트 클리어 후 포인트로 다음 런의 이점 구매"
  }
] as const;
