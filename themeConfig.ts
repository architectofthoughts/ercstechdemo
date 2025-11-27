
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
  // --- Combat Demo ---
  {
    id: 'finale',
    title: "마무리 : Finale Strike",
    description: "빈사가 된 적들에게 모든 카드를 던져 호쾌한 마무리",
    category: "Combat Demo"
  },
  {
    id: 'multiPlay',
    title: "멀티캐스트 : 같은 카드 동시 사용",
    description: "동일한 카드를 모아서 한번에 사용",
    category: "Combat Demo"
  },
  {
    id: 'spinning',
    title: "스피닝 : 인벤토리 정렬",
    description: "손패의 카드를 비용 순으로 정렬",
    category: "Combat Demo"
  },
  {
    id: 'destinyDraw',
    title: "데스티니 드로우 : 운명을 건 마지막 도박",
    description: "모든 패를 버리고 1장을 드로우 (전투당 1회)",
    category: "Combat Demo"
  },

  // --- Act Map Demo ---
  {
    id: 'reward',
    title: "승리 보상",
    description: "전투 승리 후 보상 획득 및 카드 선택 연출",
    category: "Act Map Demo"
  },
  {
    id: 'map',
    title: "절차적 맵 생성",
    description: "이벤트, 전투, 휴식, 보스로 이어지는 절차적 맵 구조",
    category: "Act Map Demo"
  },
  {
    id: 'extraction',
    title: "추출 프로토콜",
    description: "액트 클리어 후 포인트로 다음 런의 이점 구매",
    category: "Act Map Demo"
  },
  {
    id: 'dna',
    title: "DNA 합성 시스템",
    description: "DNA 파츠를 조합하여 문장을 만들고 능력 획득",
    category: "Act Map Demo"
  },
  {
    id: 'event',
    title: "무작위 조우",
    description: "선택에 따라 결과가 달라지는 무작위 이벤트 (2단계)",
    category: "Act Map Demo"
  },

  // --- Flow Demo ---
  {
    id: 'playthrough',
    title: "전체 플레이스루 (Full Playthrough)",
    description: "타이틀 -> 메뉴 -> 캐릭터 선택 -> 전투 -> 보스 -> 가챠 -> 엔딩까지 이어지는 전체 데모",
    category: "Flow Demo"
  },
  {
    id: 'characterSelect',
    title: "시작 덱 구성 데모",
    description: "10명의 캐릭터 중 2명을 선택하여 스쿼드 구성",
    category: "Flow Demo"
  },
  {
    id: 'actPlay',
    title: "액트 플레이 데모",
    description: "액트 선택 -> 맵 -> 전투 -> 보상으로 이어지는 전체 흐름",
    category: "Flow Demo"
  },

  // --- ETC ---
  {
    id: 'memorial',
    title: "메모리얼 시스템",
    description: "기억의 조각을 모아 스냅샷을 기록하는 시스템",
    category: "ETC"
  }
] as const;
