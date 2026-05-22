// ============================================================
// GOALS, CATEGORIES, PHASES — wiedza z notatek (Macro/Mid/Micro)
// Struktura inspirowana planem 12-tygodniowym (technika małych kroczków)
// ============================================================
import {
  Activity, Brain, Crosshair, Eye, Lightbulb, Map, Swords, Wand2, Settings
} from "lucide-react";

// PHASES: 12-tygodniowy program nauki + uniwersalne
export const PHASES = {
  1: {
    id: 1, name: "FAZA 1: INFO + MECHANIKI",
    subtitle: "Fundamenty świadomości i kliku",
    weeks: "Tydz 1-4",
    description: "Zanim zaczniesz grać macro/wave - musisz mieć podstawy zbierania informacji i sterowania postacią. Bez minimapy/precyzji wszystko inne się sypie."
  },
  2: {
    id: 2, name: "FAZA 2: LANING",
    subtitle: "Wave, trade, CS, recall",
    weeks: "Tydz 5-8",
    description: "Faza linii to gdzie 80% gry się rozstrzyga w niskim/średnim elo. Slow push, freeze, recall na canon, trade patterny."
  },
  3: {
    id: 3, name: "FAZA 3: MACRO",
    subtitle: "Prio, tempo, objektiwy, mapa",
    weeks: "Tydz 9-12+",
    description: "Macro buduje się NA fundamencie linii. Jak masz mecha + lanę - czas otwierać mapę. Prio → tempo → objektiwy → kończenie gry."
  },
  ongoing: {
    id: "ongoing", name: "UNIWERSALNE",
    subtitle: "Trenuj cały czas",
    weeks: "Ciągle",
    description: "Koncepcje które działają we wszystkich fazach: 0+/0-, relatywizm, limity, teamfighty, proporcje nauki."
  }
};

export const CATEGORIES = {
  info: { name: "INFO & ŚWIADOMOŚĆ", subtitle: "Zbieranie informacji, mapa, dedukcja", icon: Eye },
  micro: { name: "MICRO & MECHANIKI", subtitle: "Klikanie, animacje, skillshoty, spacing", icon: Wand2 },
  wave: { name: "WAVE MANAGEMENT", subtitle: "Fundament linii", icon: Activity },
  early: { name: "EARLY GAME", subtitle: "Wyjście, recall, trade, roam", icon: Crosshair },
  macro: { name: "MACRO MID/LATE", subtitle: "Prio, tempo, objektiwy", icon: Map },
  vision: { name: "WIZJA", subtitle: "Wardy, info, kontrola krzaków", icon: Eye },
  teamfight: { name: "WALKI DRUŻYNOWE", subtitle: "Pozycja, focus, mindset", icon: Swords },
  mindset: { name: "MINDSET & NAWYKI", subtitle: "Mental, dyscyplina, nauka", icon: Brain },
  max: { name: "MAKSYMALIZACJE", subtitle: "Mini-nawyki, mikro-przewagi", icon: Lightbulb }
};

// ============================================================
// TABS + SECTIONS — nowy główny podział wiedzy
// MACRO = decyzje mapowe + mindset + mid/late + wave (fundament macro)
// MICRO = wykonanie, faza linii, mechaniki, ustawienia, mini-maksymalizacje
// Każdy goal ma `tab` i `section` (patrz applyTabSection() na końcu pliku).
// ============================================================
export const TABS = {
  macro: {
    id: "macro",
    name: "MACRO",
    subtitle: "Decyzje mapowe · mid/late · mindset",
    description: "Co, gdzie i po co. Świadomość mapy, prio, tempo, objektiwy, wizja jako system info, walki drużynowe, mindset. Tu trenujesz DECYZJE — nie kliki.",
    icon: Map
  },
  micro: {
    id: "micro",
    name: "MICRO",
    subtitle: "Wykonanie · faza linii · ustawienia",
    description: "Jak. Klikanie, skillshoty, pozycje, lane trade'y, recall'e, mini-maksymalizacje, ustawienia. Tu trenujesz WYKONANIE — mała skala.",
    icon: Wand2
  },
  soloq: {
    id: "soloq",
    name: "SOLOQ",
    subtitle: "Mindset · checklisty · system rankingowy",
    description: "Wszystko WOKÓŁ gry. System MMR/LP, przygotowanie przed grą, mindset, reakcje na ludzi, rutyna po grze, dyscyplina, koncentracja, meta-błędy, statystyki. Większość to checklisty i przypomnienia — nie ćwiczy się tego mechanicznie, ale przypomina i stosuje.",
    icon: Brain
  }
};

export const SECTIONS = {
  // ---------- MACRO ----------
  awareness:     { id: "awareness",     tab: "macro", name: "ŚWIADOMOŚĆ MAPY",      subtitle: "Minimapa, fog, TAB, timery, dedukcja", icon: Eye,       order: 1 },
  wave_macro:    { id: "wave_macro",    tab: "macro", name: "WAVE MACRO",           subtitle: "Slow/freeze/hard push, sync, recall jako tempo", icon: Activity, order: 2 },
  prio_tempo:    { id: "prio_tempo",    tab: "macro", name: "PRIO I TEMPO",         subtitle: "Pressure point, fog tracking, cross-map", icon: Map,       order: 3 },
  early_mid:     { id: "early_mid",     tab: "macro", name: "EARLY → MID",          subtitle: "Pierwsza T1, rotacje, off-team, shift", icon: Crosshair, order: 4 },
  mid_late:      { id: "mid_late",      tab: "macro", name: "MID-LATE + OBJEKTIVY", subtitle: "Smoki, Herald, Baron, side, T2/T3, inhiby", icon: Map,       order: 5 },
  vision:        { id: "vision",        tab: "macro", name: "WIZJA JAKO SYSTEM",    subtitle: "Pinki vs wardy, lane ward, paradoks skanu", icon: Eye,       order: 6 },
  teamfight:     { id: "teamfight",     tab: "macro", name: "WALKI",                subtitle: "Engage/poke/disengage, front-to-back, kiedy NIE walczyć", icon: Swords,    order: 7 },
  mindset_meta:  { id: "mindset_meta",  tab: "macro", name: "MINDSET + DECYZJE META", subtitle: "Ocena 100×, tilt, komunikacja, study, reguły", icon: Brain,     order: 8 },

  // ---------- MICRO ----------
  micro_basics:  { id: "micro_basics",  tab: "micro", name: "KLIK + KAMERA",        subtitle: "Continuous clicking, animation lock, AA cancel", icon: Wand2,     order: 1 },
  skills:        { id: "skills",        tab: "micro", name: "SKILLSHOTY + INPUT",   subtitle: "Kąty, input buffering, baitowanie",   icon: Crosshair, order: 2 },
  positioning:   { id: "positioning",   tab: "micro", name: "POZYCJONOWANIE",       subtitle: "Spacing, trójkąt, krzaki, tworzenie space",     icon: Wand2,     order: 3 },
  laning_micro:  { id: "laning_micro",  tab: "micro", name: "FAZA LINII (EARLY)",   subtitle: "Trade patterns, CS pod wieżą, runy, value spelli, mechaniki", icon: Activity,  order: 4 },
  max:           { id: "max",           tab: "micro", name: "MINI-MAKSYMALIZACJE",  subtitle: "Czas, recall, smartcast dash, fountain, 0+/0-", icon: Lightbulb, order: 5 },
  settings:      { id: "settings",      tab: "micro", name: "USTAWIENIA",           subtitle: "Smartcasty, F-keye, HUD, dźwięki (raz i zapomnij)", icon: Settings,  order: 6 },

  // ---------- SOLOQ ----------
  soloq_system:     { id: "soloq_system",     tab: "soloq", name: "SYSTEM SOLOQ",         subtitle: "MMR, LP, dodge, serwer, duo",                       icon: Map,       order: 1 },
  soloq_pre_game:   { id: "soloq_pre_game",   tab: "soloq", name: "PRZED GRĄ",            subtitle: "Stan, otoczenie, cel — checklist przed startem",     icon: Activity,  order: 2 },
  soloq_mindset:    { id: "soloq_mindset",    tab: "soloq", name: "MINDSET I PODEJŚCIE",  subtitle: "8 zasad climb, oczekiwania, follow planu",           icon: Brain,     order: 3 },
  soloq_people:     { id: "soloq_people",     tab: "soloq", name: "LUDZIE I REAKCJE",     subtitle: "Toks, AFK, troll, smurf, własna toksyczność",        icon: Swords,    order: 4 },
  soloq_post_game:  { id: "soloq_post_game",  tab: "soloq", name: "PO GRZE",              subtitle: "Rozliczenie celu, przerwa, kiedy analiza",           icon: Activity,  order: 5 },
  soloq_discipline: { id: "soloq_discipline", tab: "soloq", name: "DYSCYPLINA I FOCUS",   subtitle: "Champion pool, ilość gier, koncentracja, małe kroczki", icon: Crosshair, order: 6 },
  soloq_errors:     { id: "soloq_errors",     tab: "soloq", name: "META-BŁĘDY I STATY",   subtitle: "Pareto 8, statystyki, bonus 5 powodów stuck",         icon: Lightbulb, order: 7 }
};

// ============================================================
// LEARNING PLAN — 3-etapowa ścieżka nauki
// Kolejność świadoma: najpierw teoria + mindset (SoloQ), potem
// wykonanie (Micro), potem decyzje (Macro). Ustawienia są poza planem:
// ustawiasz je raz i wracasz tylko kontrolnie.
// ============================================================
export const PLAN_STAGES = [
  {
    id: "stage_soloq",
    name: "SoloQ — teoria i mindset",
    short: "Etap 1 / 3",
    description: "Zanim wbijesz mechanikę: poukładaj sobie głowę. System rankingowy, mindset climbu, dyscyplina, ludzie, rytuały przed i po grze. Większość to wiedza do przyswojenia (oznacz przeczytane), kilka to nawyki do utrwalenia.",
    tab: "soloq",
    sections: [
      "soloq_system",     // System gry: MMR, LP, serwer, duo, dodge — fundament rozumienia
      "soloq_mindset",    // 8 zasad climb — mentalna baza decyzji
      "soloq_pre_game",   // Checklist przed grą
      "soloq_post_game",  // Rytuał po grze
      "soloq_people",     // Reakcje na innych
      "soloq_discipline", // Dyscyplina sesji
      "soloq_errors"      // Meta-błędy i statystyki
    ]
  },
  {
    id: "stage_micro",
    name: "Micro — wykonanie",
    short: "Etap 2 / 3",
    description: "Mała skala: klikanie, animacje, skillshoty, pozycje, faza linii, mini-maksymalizacje. Tutaj trenujesz wykonanie pojedynczych decyzji.",
    tab: "micro",
    sections: [
      "micro_basics",   // Klik + kamera + animacje
      "skills",         // Skillshoty + input buffering
      "positioning",    // Spacing, trójkąt, krzaki
      "laning_micro",   // Faza linii: trade, CS, runy, value spelli
      "max"             // Mini-maksymalizacje: czas, fountain, recall
    ]
  },
  {
    id: "stage_macro",
    name: "Macro — decyzje",
    short: "Etap 3 / 3",
    description: "Duża skala: świadomość mapy, wave macro, prio, tempo, rotacje, objektivy, wizja jako system, walki, mindset meta. Tutaj trenujesz CO i GDZIE robić.",
    tab: "macro",
    sections: [
      "awareness",      // Świadomość mapy
      "wave_macro",     // Wave management
      "prio_tempo",     // Prio i tempo
      "early_mid",      // Early → mid
      "mid_late",       // Mid-late + objektivy
      "vision",         // Wizja jako system
      "teamfight",      // Walki
      "mindset_meta"    // Mindset meta (ciągłe)
    ]
  }
];

// Helper: linear list of all sections in plan order
export const PLAN_SECTION_FLAT = PLAN_STAGES.flatMap(stage =>
  stage.sections.map(secId => ({ stageId: stage.id, sectionId: secId }))
);

// Helper: find stage + section by their indices
export function getPlanFocus(stageIdx, sectionIdx) {
  const stage = PLAN_STAGES[stageIdx];
  if (!stage) return null;
  const sectionId = stage.sections[sectionIdx];
  if (!sectionId) return null;
  return { stage, sectionId };
}

// Helper: advance plan cursor; returns new {stageIdx, sectionIdx} or null when finished
export function nextPlanFocus(stageIdx, sectionIdx) {
  const stage = PLAN_STAGES[stageIdx];
  if (!stage) return null;
  if (sectionIdx + 1 < stage.sections.length) {
    return { stageIdx, sectionIdx: sectionIdx + 1 };
  }
  if (stageIdx + 1 < PLAN_STAGES.length) {
    return { stageIdx: stageIdx + 1, sectionIdx: 0 };
  }
  return null; // plan complete
}

export function getPlanCursorProgress(cursor = { stageIdx: 0, sectionIdx: 0 }) {
  const stageIdx = Number.isInteger(cursor.stageIdx) ? cursor.stageIdx : 0;
  const sectionIdx = Number.isInteger(cursor.sectionIdx) ? cursor.sectionIdx : 0;
  const focus = getPlanFocus(stageIdx, sectionIdx);
  const total = PLAN_SECTION_FLAT.length;
  if (!focus || total === 0) {
    return {
      current: 0,
      total,
      percent: 0,
      stage: null,
      sectionId: null
    };
  }
  const previousSections = PLAN_STAGES
    .slice(0, stageIdx)
    .reduce((sum, stage) => sum + stage.sections.length, 0);
  const current = Math.min(total, previousSections + sectionIdx + 1);
  return {
    current,
    total,
    percent: Math.round((current / total) * 100),
    stage: focus.stage,
    sectionId: focus.sectionId
  };
}

// LANES: do champion poola
export const LANES = [
  { id: "top", label: "TOP" },
  { id: "jg", label: "JG" },
  { id: "mid", label: "MID" },
  { id: "adc", label: "ADC" },
  { id: "sup", label: "SUPP" }
];

// ============================================================
// GOALS - pełne definicje z fazą i tygodniem
// ============================================================
export const GOALS = {
  // ============================================================
  // FAZA 1: INFORMATION GATHERING + MECHANIKI (Tydz 1-4)
  // ============================================================

  // ---- Tydzień 1: Info gathering ----
  minimap_3s: {
    label: "Minimapa co 3 sekundy",
    category: "info", phase: 1, week: 1, order: 1,
    short: "Po każdym CS — spojrzenie na mini. Nawyk ma być automatem.",
    details: {
      what: "Nawyk patrzenia na minimapę co maksymalnie 3 sekundy. To NIE jest opcja, to fundament zbierania informacji. Bez tego nie ma macro.",
      how: [
        "Trigger 1: każde dobicie CS (look PO ostatnim hicie, w bezruchu animacji).",
        "Trigger 2: każdy cast spela (look PO cd, gdy bezpiecznie).",
        "Trigger 3: każde wyjście z bazy / TP.",
        "Pierwsze 2 tygodnie — świadomie sprawdzaj zegar, później automat.",
        "Locked camera = zjeb. Wycentrowana raczej zawsze gorsza w macro."
      ],
      when: "Zawsze. Cała gra. Bez wyjątków.",
      whenNot: "Nigdy.",
      success: "Wiesz gdzie są wszyscy 5 enemy LUB świadomie nie wiesz i przewidujesz przez dedukcję (cofnął 15s temu, regen 5s, ruch 10s — może być w X).",
      mistakes: [
        "Tunnel vision na CS w 1v1.",
        "Patrzenie tylko jak coś się dzieje (za późno).",
        "Locked camera ze wstydu że misclickujesz na rogach.",
        "Ignorowanie ? na minimapie (enemy roamuje, zaraz będzie problem)."
      ],
      notes: "Jeśli mini jest za daleko na monitorze — zmniejsz HUD albo przesuń mini. Setup ma znaczenie."
    }
  },
  tab_check: {
    label: "TAB — level + itemy enemy",
    category: "info", phase: 1, week: 1, order: 2,
    short: "TAB co 30s. LEVEL + ITEMY, NIE CS/KDA. '?' = roam alert.",
    details: {
      what: "Sprawdzanie siły przeciwników przez TAB. Patrzymy na LEVEL i ITEMY (kluczowe defensywy: Zhonia, Maw, Edge of Night), NIE CS/KDA — to mit. Plus '?' przy enemy = łatwiej zobaczyć kto może roamować.",
      how: [
        "TAB co ~30s lub po każdym recallu enemy.",
        "Sprawdzasz: ITEMY (Zhonia/Maw/Rabadon/Hex Drinker), LEVEL, summonery.",
        "'?' przy enemy = pomyśl czy nie roamuje.",
        "Śledź CS junglera: 1 camp = 4 CS. Wiesz co mu wstaje i gdzie może być.",
        "Sprawdzaj debuffy (heal na ADC), klony Ekko (ma/nie ma ulta)."
      ],
      when: "Co 30s i przy każdej istotnej decyzji (przed walką, przed objective).",
      success: "Wiesz kto kupił Zhonię → ostrożność z ult comboem. Wiesz że enemy mid 1 lvl za tobą → presja.",
      mistakes: [
        "Patrzenie na KDA (nieinformatywne).",
        "Patrzenie raz na grę.",
        "Brak liczenia CS junglera (tracisz key info)."
      ]
    }
  },
  fog_tracking: {
    label: "Fog of war — dedukcja pozycji",
    category: "info", phase: 1, week: 1, order: 3,
    short: "Cofa = ~10s wolne + regen. Wyobraź zasięg rosnący co sekundę.",
    details: {
      what: "Kiedy enemy znika z mapy — śledzisz przez dedukcję. Wyobrażasz sobie 'zasięg' zwiększający się co sekundę. Daje ci pojęcie gdzie MOŻE BYĆ z prawdopodobieństwem.",
      how: [
        "Enemy cofnął do bazy → dodaj sekundy regen many/HP (~5s) + czas dojścia.",
        "Enemy znika na rzece → 2 opcje: cofa / idzie gdzieś. Wyobrażasz oba zasięgi.",
        "Śledź jg przez CS — 1 camp = 4 CS. Wiesz gdzie był (invade?) i co wstaje.",
        "Dedukcja: 'A pusty, ja w B, więc enemy w C'.",
        "Im więcej graczy widzisz = im mniej możliwości dla niewidzianych."
      ],
      when: "Cały czas. Każda decyzja wymaga 'gdzie są wszyscy enemy'.",
      success: "Twoje przewidywanie zgadza się 70%+ — enemy pojawiają się tam gdzie zakładałeś.",
      mistakes: [
        "Założenie 'on cofnął więc nie ma go już 5 minut'.",
        "Brak liczenia regen czasu.",
        "Ignorowanie informacji 'support nie widoczny przez 30s'."
      ]
    }
  },
  mute_all: {
    label: "Komunikacja: Pingi TAK, Czat NIE",
    category: "mindset", phase: 1, week: 1, order: 4,
    short: "All chat OFF. Tylko pingi (cyferki, summy, danger).",
    details: {
      what: "Komunikacja w solo q daje 90% emocjonalnych kosztów, 10% wartości. Pingi przekazują info bez emocji. Czat = 99% nic nie wnosi i rozprasza.",
      how: [
        "All chat OFF na 100% w ustawieniach.",
        "Team chat — mute od razu jeśli ktoś szczeka.",
        "Tylko pingi: missing, danger, on my way, smite up.",
        "Cyferki na czat dla flashy enemy: 1=top, 2=jg, 3=mid, 4=adc, 5=sup.",
        "Mental rule: nie komentujesz teamu nawet w głowie."
      ],
      when: "Każda gra. Bez wyjątków.",
      success: "Po grze nie pamiętasz emocji związanych z teamem — pamiętasz tylko swoje akcje.",
      mistakes: [
        "Odpisywanie nawet wtedy gdy masz rację.",
        "Pingowanie z frustracji zamiast informacyjnie.",
        "Czytanie all chata 'bo może coś ciekawego'."
      ]
    }
  },

  // ---- Tydzień 2: Mechaniki - klikanie i kamera ----
  continuous_clicking: {
    label: "Precyzja klikania — szybko, blisko, dużo",
    category: "micro", phase: 1, week: 2, order: 5,
    short: "Klikasz BARDZO szybko, BARDZO często, BARDZO blisko siebie — CAŁY CZAS.",
    details: {
      what: "Szybkie, częste klikanie blisko modelu utrzymuje rękę w tempie gry. Klik daleko od postaci wydłuża ruch potrzebny do uniku. Wejście na prędkość trwa — nie zdążysz przyspieszyć w momencie zagrożenia.",
      how: [
        "Klikaj DUŻO przez całą grę, nie tylko w momencie zagrożenia.",
        "Klikaj BARDZO BLISKO swojej postaci.",
        "Practice Tool: bohater między dwoma wardami (mała odl), klik naprzemiennie TAK ABY POSTAĆ SIĘ NIE RUSZYŁA.",
        "5-10 min dziennie cwiczenia + trenuj combo na swoim champie.",
        "Auto-atakuj attack-move (A+klik), nie right-click."
      ],
      when: "Cała gra: laning, dodge, spacing, kite, teamfighty.",
      success: "Uniki są krótkie, ruch nie panicznie reaktywny, klikanie szybkie bez rozgrzewki.",
      mistakes: [
        "Klikanie daleko od postaci.",
        "Przyspieszanie dopiero gdy skill już leci.",
        "Taniec bez celu zamiast ruchu w konkretnym momencie zagrożenia."
      ]
    }
  },
  camera_work: {
    label: "Praca kamery — F1-F4, unlocked, checki",
    category: "info", phase: 1, week: 2, order: 6,
    short: "Locked camera = zjeb. F1-F4 sojusznicy, spacja na siebie.",
    details: {
      what: "Kamera powinna obejmować jak najwięcej ważnych obiektów. Locked camera ogranicza czytanie mapy. F-keye to darmowe info o sojusznikach w 0+ momentach.",
      how: [
        "Locked camera OFF, smartcasty bez wskaźnika, attack move bind.",
        "F1=ty, F2-F5 sojusznicy. Spacja jako centrowanie szybkie.",
        "Podczas lokowania (np. dobicie CS) — chwila na F-key check sojusznika/fragmentu mapy.",
        "Wyzbyć się dyskomfortu że postać jest na rogach ekranu — przyjdzie z precyzją klikania.",
        "Im lepsza wiedza o grze = im szybciej czytasz z ekranu (wiesz gdzie patrzeć)."
      ],
      when: "Cała gra. Każde okno animacji = check.",
      success: "Czytasz mapę w 0.2s, F-key check daje info bez kosztu.",
      mistakes: [
        "Locked camera 'bo komfortowo'.",
        "Czekanie aż coś się dzieje by sprawdzić.",
        "Camera lock w teamfightach = śmierć."
      ]
    }
  },

  // ---- Tydzień 2-3: Lokowanie i input ----
  animation_lock: {
    label: "Lokowanie w animacji",
    category: "micro", phase: 1, week: 2, order: 7,
    short: "AA, skille, tower, miniony — blokują ruch. Trafiasz gdy enemy stoi.",
    details: {
      what: "Po AA lub użyciu spella postać przez krótki moment stoi w miejscu. To samo: towery, miniony, campy. Wykorzystujesz okno bezruchu enemy do pewnych skillshotów i trade'ów.",
      how: [
        "Czekaj aż przeciwnik zacznie AA, last hit albo cast — wtedy ruch ograniczony.",
        "Rzucaj skillshot w momencie bezruchu, nie losowo na max range.",
        "Pod towerem: atakuj enemy gdy tower zaczyna animację ataku w miniona — bezkarnie wyjdziesz.",
        "UWAGA na własne lokowanie: chase z CC na CD + AA = enemy nabiera dystans = tracisz range na CC."
      ],
      when: "Trade'y, last hit enemy, pod towerem, chase z CC, śmierć z tower aggro.",
      success: "Skillshoty częściej trafiają w momentach gdy enemy realnie nie może odskoczyć.",
      mistakes: [
        "Rzucanie spelli bez triggera animacji.",
        "AA podczas chase'u oddalające cię od CC range.",
        "Ignorowanie animacji towera przy krótkich trade'ach pod nim."
      ]
    }
  },

  // ---- Tydzień 3: Skillshoty i input buffering ----
  skillshot_angles: {
    label: "Skillshoty — KĄTY postaci (1/3 vs 2/3)",
    category: "micro", phase: 1, week: 3, order: 8,
    short: "Prosto = 2/3 unik. Z boku = 1/3 unik. Nie myśl JAK rzucić — myśl jak USTAWIĆ SIĘ.",
    details: {
      what: "Skillshoty trafiają częściej gdy ustawisz POSTAĆ pod właściwy kąt. Prosto w enemy = 2 z 3 stron uniku. Pod kątem z boku = tylko 1 strona uniku. Liga ma 3 wymiary (x, y, h) — celuj w nogi.",
      how: [
        "Obserwuj 'twarz' postaci — odwraca się w stronę ruchu/skilla.",
        "Liga 3D: niżej niż enemy = rzucaj lekko niżej. Wyżej = wyżej. Celuj w nogi.",
        "Okrągłe (E Lux): enemy w środku skilla.",
        "Liniowe (Q Blitz): NIE na max range! Z boku = trudniej uniknąć.",
        "KONCEPT: Nie 'jak rzucić', tylko 'jak ustawić postać pod kąt'.",
        "Z fog of war prawie zawsze trafia (nikt się nie spodziewa)."
      ],
      when: "Laning, setup ganków, poke przed objective, chase/escape.",
      success: "Nie spamujesz skillshotów. Czekasz na moment gdzie enemy ma najmniej dobrych uników.",
      mistakes: [
        "Rzucanie zawsze frontalnie z tej samej linii.",
        "Skillshot bez wizji i bez info o ruchu enemy.",
        "Losowy taniec zamiast konkretnego baita w momencie zagrożenia."
      ]
    }
  },
  skill_queueing: {
    label: "Input buffering — kolejkowanie z Flashem",
    category: "micro", phase: 1, week: 3, order: 9,
    short: "Klik spell na enemy POZA range → Flash → spell INSTANT.",
    details: {
      what: "Wiele speli direct (W TF, W Renektona) można kolejkować z Flashem. Klikasz spell zanim jesteś w zasięgu, potem Flash — spell odpala momentalnie po wejściu w range. Enemy nie ma czasu reagować.",
      how: [
        "Klik spell na enemy mimo że POZA zasięgiem.",
        "Postać zaczyna iść za targetem → Flash w zasięg.",
        "Spell odpala natychmiast gdy wejdziesz w range.",
        "Defensywne: ktoś goni, masz stun — klik W przed wejściem w jego range = leci od razu.",
        "Można też kolejkować AA 'tańcząc' w zasięgu i czekając aż enemy wejdzie."
      ],
      when: "Engage, escape, last-hit assassyna na carry, niespodziewany kill setup.",
      success: "Twój flash + spell = brak czasu na reakcję enemy = zwykle kill.",
      mistakes: ["Flash → klik spell potem = 0.3s na reakcję enemy = miss."]
    }
  },
  bait_skillshots: {
    label: "Baitowanie skillshotów enemy",
    category: "micro", phase: 1, week: 3, order: 10,
    short: "Prosta linia w enemy → skręt w ostatniej chwili → WCHODŹ.",
    details: {
      what: "Wymuszanie złego użycia speli enemy poprzez fałszywe ruchy. Idziesz w prostej linii (zachęcasz do casta), skręcasz w ostatnim momencie = enemy spalił spell na nic = ty wbiijasz.",
      how: [
        "Idziesz w enemy prosta linia → w ostatnim momencie skręcasz → bait spella.",
        "Po bicie spella → WCHODZISZ, trade wygrany.",
        "Drobne ruchy prawo-lewo TYLKO gdy enemy MUSI zagrać spella (np. wychodzisz z range'a).",
        "NIE tańcz 5s wcześniej jak low elo — taniec ma sens tylko w momencie konkretnego zagrożenia."
      ],
      when: "Laning trade, gank dodge, teamfight kite.",
      success: "Enemy pali spell na nic → ty wbiijasz w okienku CD i zadajesz dmg.",
      mistakes: [
        "Taniec losowy bez konkretnego momentu zagrożenia.",
        "Brak follow-upu po udanym baicie.",
        "Bait gdy enemy widzi cię na max range — nie zagra spella tak czy siak."
      ]
    }
  },

  // ---- Tydzień 4: Spacing i pozycjonowanie ----
  spacing_ranges: {
    label: "Spacing — zasięgi w głowie",
    category: "micro", phase: 1, week: 4, order: 11,
    short: "Wyobrażaj okręgi range AA/skili. Trzymaj się LEKKO poza zasięgiem enemy.",
    details: {
      what: "Spacing to balansowanie na granicy zasięgu swojego i przeciwnika. Wyobrażasz okręgi range i grasz na ich granicy. Stoisz tak, by ty mógł zagrać, a enemy nie miał łatwego wejścia.",
      how: [
        "Wyobrażaj okręgi range: twoje AA/spelle, enemy engage, enemy poke.",
        "Stój na granicy, gdzie TY możesz grozić akcją, ENEMY nie ma łatwego wejścia.",
        "Syndra vs Viktor: E daje przewagę. Ale gdy ona użyje E, Viktor ma większy range = wykorzystaj.",
        "ADC: range AA to ŻYCIE. Znaj co do piksela.",
        "Wykorzystuj lokowanie w animacji — enemy ma efektywnie mniejszy zasięg gdy się loku."
      ],
      when: "Laning, bot trade'y, ustawianie pod objective, kite w walce.",
      success: "Wciskasz swoje skille bez biorenia dmg enemy.",
      mistakes: [
        "Wejście w zasięg enemy bez powodu.",
        "Brak świadomości WŁASNEGO range AA (ADC = śmierć).",
        "Spacing bez kontekstu CD enemy (on właśnie ma spell up)."
      ]
    }
  },
  space_creation: {
    label: "Tworzenie przestrzeni dla teamu",
    category: "micro", phase: 1, week: 4, order: 12,
    short: "Supp z CC w krzaku = ADC ma space. Tank wbity = carry zadaje dmg.",
    details: {
      what: "Wejście pozycją tak, żeby przeciwnik musiał się cofnąć — sojusznik dostaje wolną przestrzeń. Towery, teren, miniony też tworzą space. Assassin flanką zmusza enemy do ochrony backline = front osamotniony.",
      how: [
        "Support z CC w krzaku botowym = wymusza cofnięcie enemy = ADC ma space na CS.",
        "Tank wbijający w enemy team = kupuje przestrzeń carry na dmg.",
        "Assassin flanką = enemy musi bronić carry = ich front osamotniony.",
        "Towery, teren, miniony (early game!) = naturalna przestrzeń, wykorzystuj.",
        "Niewidoczni sojusznicy też tworzą space — enemy musi respect."
      ],
      when: "Laning, bot trade'y, walki 5v5, oblężenia.",
      success: "Twój carry farmi/bije bez biorenia dmg dzięki twojej presji.",
      mistakes: [
        "Wejście w krzak BEZ CC = darmowy zabity.",
        "Tank wbity ale carry nie idzie za nim = wasted.",
        "Brak komunikacji z teamem (flanka bez sync = giniesz sam)."
      ]
    }
  },
  positioning_triangle: {
    label: "Pozycjonowanie — trójkąt bota, szachownica",
    category: "micro", phase: 1, week: 4, order: 13,
    short: "BOT TRÓJKĄT: ADC+supp obok, enemy ADC lekko przed = zawsze złapią.",
    details: {
      what: "Wyobraź sobie linie gdzie enemy wejdzie w twój range. Trójkąt bota: gdy ADC i supp obok siebie, a enemy ADC lekko przed — zawsze go złapią. Szachownica: droga eliminacji gdzie nie chcesz stać.",
      how: [
        "Top: jeśli na tym samym poziomie i jeden bliżej krzaków, drugi bliżej rzeki = rzeka dogoni. Stoisz dalej od linii.",
        "Bot TRÓJKĄT: ADC+supp obok, enemy ADC lekko przed = matematycznie złapią.",
        "SZACHOWNICA: wyobraź szachownicę na linii, eliminacją zaznacz GDZIE stać.",
        "NIE stój: blisko enemy jg, w minionach enemy, w swoich minionach (value spelli enemy)."
      ],
      when: "Każdy laning, każda pozycja przed walką.",
      success: "Enemy nie ma łatwego wejścia na ciebie, ty masz wejścia na enemy.",
      mistakes: [
        "Stanie na środku linii bez analizy 'kto kogo złapie'.",
        "Bot pozycja przed supp.",
        "ADC w minionach enemy → value spelli."
      ]
    }
  },
  bush_play: {
    label: "Krzaki — face check, kiting, blue ward",
    category: "micro", phase: 1, week: 4, order: 14,
    short: "Face check = gorsza pozycja. Blue ward MEGA ważny na ADC.",
    details: {
      what: "Kto czeka w krzaku zawsze ma przewagę (widzi pierwszy, ma swobodę wyjścia). Niebieskie wardy MEGA ważne na ADC (face check = padasz). Kiting do krzaka = znikasz = łatwiej unikać.",
      how: [
        "Face check = my widzimy pierwszy = mamy okno.",
        "Blue wardy NA ADC i nie-mobilnych — face check = śmierć.",
        "Kite do krzaka = znikasz = enemy traci dystans, ty masz okno.",
        "Top mele w krzaku vs range = bicie i uciekanie = przewaga.",
        "Predict enemy w danym miejscu (na ślepo unik skilla)."
      ],
      when: "Laning, ganki, kite enemy, side lane.",
      success: "Nie facecheckujesz, ale wymuszasz face check enemy. Kite działa.",
      mistakes: [
        "Face check 'bo pewnie nikogo nie ma' = klasyczne 0-.",
        "Brak blue warda na nie-mobilnym carry.",
        "Stanie POZA krzakiem gdy mogłeś być w nim."
      ]
    }
  },

  // ============================================================
  // FAZA 2: LANING PHASE (Tydz 5-8)
  // ============================================================

  // ---- Tydzień 5: Wave management core ----
  slow_push: {
    label: "Slow push — 3-wave crash",
    category: "wave", phase: 2, week: 5, order: 15,
    short: "Wyjście wcześnie, ustawienie HP nobków, 3. wave pod towerem enemy.",
    details: {
      what: "Jak najwolniejsze pushowanie fali — enemy zbiera coraz większe stacki minionów pod swoim towerem. Trzecia fala uderza w jego tower, ty masz okno czasowe na akcję poza linią. Slow push to twoje główne narzędzie do tworzenia tempa na mapie.",
      how: [
        "Dobijasz CS TYLKO ostatnim hitem. Nigdy nie wbijasz autoataka w pełne HP miniona.",
        "W matchupie range vs melee — wyjdź WCZEŚNIE w fale enemy, ustaw slow push PRZED spotkaniem fal pod twoim towerem.",
        "Szczególnie wartościowe vs mobilne carry typu Tristana/Yone — zonujesz, miniony są na różnych HP, max 1-2 CS ze spella enemy.",
        "Przed rozbiciem fal zonuj enemy mida żeby nie mógł nawet expa złapać.",
        "Po 3 stakach masz level difference + ~15 CS przewagi."
      ],
      when: "Pod objektiw, pod dive bota, pod deep ward w enemy jg, pod roam, pod harass nobka pod jego towerem.",
      whenNot: "Jak ciebie duszą (przegrywasz MU mechanicznie) — wtedy MAX CS, min HP, info do teamu że nie schodzisz z linii.",
      success: "Trzecia fala stoi pod towerem enemy. Minimum 4 opcje: zejście top, bot, pomoc jg, harass nobka. Wybierasz najsilniejszą.",
      mistakes: [
        "Hard push zamiast slow (oddajesz tempo).",
        "Schodzenie z linii w trakcie slow pusha (tracisz fale).",
        "Niewykonanie akcji po stworzeniu okna — slow push bez celu.",
        "Stakowanie 5 fal zamiast 3 (overkill)."
      ],
      notes: "Po slow pushu ZAWSZE następuje bounce wave — wraca do ciebie. Po zabiciu w roamie — od razu cofaj."
    }
  },
  freeze: {
    label: "Freeze fali — +3 castery",
    category: "wave", phase: 2, week: 5, order: 16,
    short: "Trzymaj 3+ caster minionów więcej niż enemy. Nie schodzisz z linii.",
    details: {
      what: "Zatrzymanie fali blisko TWOJEGO towera. Enemy musi przyjść daleko po CS, wystawia się na ganki jg, ty bezpiecznie farmisz lub wymuszasz jego powrót/utratę zasobów.",
      how: [
        "Trigger: bounce wave wraca do ciebie (po slow pushu enemy LUB po stracie linii).",
        "Trzymaj 3+ caster minionów więcej niż enemy (2 = 50/50 niestabilne, 1 = freeze pęka).",
        "Zabijaj enemy miniony PO twoich umierających — tylko wyrównujesz licznik.",
        "Tankuj jednego enemy miniona swoim ciałem żeby nie odepchnął twoich.",
        "CS tylko ostatnim hitem — bez harass z ręki (psujesz balans)."
      ],
      when: "Przegrywasz MU, enemy ma summonery a ty nie, czekasz na powerspike, enemy mid roamuje.",
      whenNot: "Smok/herald aktywny, twój team intuje, enemy jg blisko (zaraz zniszczy freeze).",
      success: "Enemy musi przejść 2/3 lane po CS, sam się wystawia na gank, HP/mana pełne.",
      mistakes: [
        "Schodzenie na freezie (tracisz exp/gold = cały sens freeza umiera).",
        "Freeze gdy są objektiwy (oddajesz mapę za bezpieczeństwo).",
        "Trzymanie tylko 1-2 więcej minionów (freeze pęka).",
        "Bicie z ręki podczas freeze (psujesz balans)."
      ]
    }
  },
  hard_push: {
    label: "Hard push — przed canon/roam/objective",
    category: "wave", phase: 2, week: 5, order: 17,
    short: "Szybko czyścisz falę pod ważny cel. NIE nadużywaj — slow push lepszy.",
    details: {
      what: "Szybkie przepchnięcie pełnej fali. Daje natychmiastowe prio, pozwala dołączyć do junglera, ukarać roam enemy albo wymusić jego cofnięcie. Slow push prawie zawsze lepszy.",
      how: [
        "AA + spelle żeby fala jak najszybciej weszła pod tower enemy.",
        "Enemy znika z mida bez info → hard push fali, potem sprawdzasz mapę.",
        "Przed recallem czyścisz przed cannonem — wracasz z itemami bez straty CS.",
        "Po killu/mocnym obiciu — zostajesz przepchnąć falę, jeśli bezpiecznie."
      ],
      when: "Przed recallem, przed dołączeniem do jg, gdy enemy roamuje, natychmiastowe prio pod objective.",
      whenNot: "Gdy możesz zbudować slow push. Hard push bez celu = bounce + utrata tempa.",
      success: "Fala weszła pod tower, masz wolne okno na recall/ward/roam/objective.",
      mistakes: [
        "Hard push bez planu po fali.",
        "Zostawienie fali w połowie linii przed recallem.",
        "Push bez wizji gdy enemy jg/sup może odciąć."
      ]
    }
  },

  // ---- Tydzień 6: Recall + wardowanie + trade ----
  canon_recall: {
    label: "Recall TYLKO na canon falę",
    category: "wave", phase: 2, week: 6, order: 18,
    short: "Hard push fali PRZED canonem → recall. Maksymalne tempo.",
    details: {
      what: "Hard push fali bezpośrednio przed canon minionem → natychmiastowy recall. Maks tempo: enemy nie zatrzyma canon fali sam (canon tankuje tower), więc wracasz z itemami i pełną falą bez utraty CS.",
      how: [
        "Identyfikuj canon — co trzecia fala ma 6 nobków + 1 armorowanego.",
        "Fala BEZPOŚREDNIO PRZED canonem — hard push wszystkim co masz do enemy towera.",
        "Recall NA TEJ FALI (po push, ale przed pojawieniem się canona z bazy).",
        "Po powrocie: canon fala bouncuje do ciebie albo stoi pod twoim towerem.",
        "Cofamy ZAWSZE przed smokiem 3-4 (soul point) — wyjątek od reguły."
      ],
      when: "Każdy standardowy recall w early/mid gdy masz ~500-800 golda.",
      whenNot: "Cheat recall przez TP, po killu (zostajesz na cofce enemy), pod smoka 3-4.",
      success: "Wracasz z itemami a twoja fala pushuje się sama. Brak utraty CS.",
      mistakes: [
        "Recall NA canon fali — enemy łatwo zatrzymuje canon ręcznie.",
        "Recall na środku zwykłej fali — bounce gdy enemy chce.",
        "Zbyt późny recall (200 golda) — kupujesz nic."
      ]
    }
  },
  proactive_vision: {
    label: "Wardowanie — basic, deep, raptory, pinki",
    category: "vision", phase: 2, week: 6, order: 19,
    short: "Raptory 1:15 lub po 2-3 fali. Pinki BLIŻEJ, wardy DALEJ.",
    details: {
      what: "Wizja nie do bronienia siebie, ale do INFO o enemy. Każdy ward ma cel: pod objektiw, carry, akcję. Pinki bliżej (kontrola), wardy głębiej (info). Głębiej = szybsza info.",
      how: [
        "Basic ward po 2-3 fali (kraniec krzaka, daje wizję bez krzaka).",
        "Raptory ward o 1:15 LUB po 2-3 fali — pathing enemy jg.",
        "Pinki w naszej rzece (control wardy bliżej, do obrony).",
        "Zwykłe wardy w enemy jg (głęboka info).",
        "Lane ward jeśli mid T1 stoi (widzimy zejścia enemy mida).",
        "Sprawdzasz wizję enemy — lepiej gdy nic nie ma (wiesz że enemy nie wie) niż gdy zniszczysz (oddajesz info)."
      ],
      when: "Cały czas. Pod objektiw, pod carry, pod akcję, pod ganka.",
      whenNot: "Wardy 'w pizdę' bez planu — strata golda.",
      success: "Wiesz gdzie jest enemy jg w >70% gry. Akcje informowane wizją.",
      mistakes: [
        "Wszystkie wardy bronione (basic), żaden głęboki.",
        "Wardy w 'bezpiecznym miejscu' nie dające info.",
        "Niszczenie enemy warda zawsze (czasem lepiej wiedzieć że tam jest).",
        "Zapominanie o pinkach (sweeper enemy odsłania akcje)."
      ]
    }
  },
  trade_patterns: {
    label: "Trade patterny — matchup wymiany",
    category: "early", phase: 2, week: 6, order: 20,
    short: "Każdy matchup ma swój schemat. Im więcej znasz = ORASZ.",
    details: {
      what: "Każdy matchup ma optymalny pattern wymiany skilli. Np. Fiora vs Aatrox: Aatrox trzyma E na W Fiory (zawsze unik), Fiora trzyma Q żeby trafić w Aatroxa i nie zjeść pełnego Q. Ahri vs Tristana: Ahri poke, Tristana szuka all-ina.",
      how: [
        "Przed grą pomyśl: jakie skile enemy są największym zagrożeniem? Co trzymać?",
        "Trzymaj key spelle defensywne (E Aatrox, E Fiora) na key ofensywne enemy.",
        "Określ czy wygrywasz długie trade'y (autosy, małe CD) czy gramy pod burst.",
        "Mając tarczę/heal automatycznie zmniejszasz value spella enemy.",
        "Ucz się 3 trade patternów na każdy matchup czemu trafiłeś / nie."
      ],
      when: "Laning, każdy trade w matchupie.",
      success: "Wymieniasz HP korzystnie. Wiesz kiedy all-in, kiedy poke, kiedy pas.",
      mistakes: [
        "Trade bez planu spelli enemy.",
        "Spale defensywny gdy enemy nie miał ofensywnego.",
        "All-in w matchupie który wygrywa burstem mając long trade champa."
      ]
    }
  },

  // ---- Tydzień 7: CS, value, czas ----
  cs_under_tower: {
    label: "CS — setup HP, agro towera",
    category: "early", phase: 2, week: 7, order: 21,
    short: "Blisko miniona = instant pocisk. Setupuj HP szybszymi AA przed towerem.",
    details: {
      what: "Pod towerem kontrolujesz HP minionów wcześniej. Stoisz BLISKO miniona = pocisk leci krótko = instant trafienie. Tower bije określony dmg w miniona — naucz się jego pattern.",
      how: [
        "Stój blisko miniona — pocisk leci szybciej = łatwiejszy last hit.",
        "Setupuj HP szybszymi AA zanim dojdą do towera.",
        "Nie dopuszczaj do wielu low-HP minionów naraz — nie zdążysz wszystkich.",
        "Naucz się dmg towera (caster: 2 hity, melee: 3-4 z AA).",
        "Sprawiaj że enemy zadaje ci AA = miniony żyją dłużej = więcej czasu na CS.",
        "Niestandardowe HP miniona pod towerem: AA pomiędzy atakami towera."
      ],
      when: "Każdy raz gdy fala wchodzi pod tower.",
      success: "Bierzesz 90%+ CS pod towerem.",
      mistakes: [
        "Tower bije miniona na full HP = mało CS.",
        "Zbyt wczesne AA = caster minion umiera od towera.",
        "Spalanie spella na falę pod towerem (push przez przypadek)."
      ]
    }
  },
  value_spells: {
    label: "Value spelli — gracz vs gracz+wave",
    category: "micro", phase: 2, week: 7, order: 22,
    short: "Spell w gracza+fale > spell w gracza. Baituj złe użycia enemy.",
    details: {
      what: "Ten sam spell ma różną wartość: trafić gracza, gracza i falę, samą falę albo wymusić złą odpowiedź enemy. Używaj spelli zgodnie z planem fali i trade'u.",
      how: [
        "Przed castem: chcę pushować, trafić gracza, utrzymać wave, czy bait?",
        "Jeśli możesz — ustaw spell żeby trafił enemy I część wave'a.",
        "Baituj enemy do użycia spella w wave (jeśli wave pójdzie do ciebie).",
        "Nie pal defensywnego jeśli enemy może wymusić ważniejszy trade.",
        "Przykład E Viktora: 1) tylko gracza, 2) gracz+część wave, 3) gracz+cała fala.",
        "ADC: Ezreal Q w enemy pod kątem żeby trafić też fale. Miss enemy = value z fali."
      ],
      when: "Każdy lane trade, wave clear, poke, recall setup.",
      success: "Spell daje konkretną wartość mapową lub lane'ową.",
      mistakes: [
        "Pushowanie fali przypadkowym poke'iem.",
        "Heal/tarcza za wcześnie ponad realne value.",
        "Spell użyty bez związku z planem wave'a."
      ]
    }
  },
  time_max: {
    label: "Maks czasu — fontanna, dashe, plate",
    category: "max", phase: 2, week: 7, order: 23,
    short: "Koniec fontanny, dashe w drodze, plate z HP, kituj w stronę celu.",
    details: {
      what: "Każda sekunda oszczędzona = więcej akcji w tej samej grze. Drobne nawyki dają ~1-2s każdy, ale × 100 razy w grze = znaczny zysk czasu.",
      how: [
        "Po recallu — od razu na koniec fontanny (bliżej wyjścia).",
        "Dashe/MS spelle używaj W POWROCIE na linię, nie tylko w walce.",
        "Plate: zostawiaj trochę HP — miniony go dobiją (twój zysk gold).",
        "Robiąc las — kituj moby w stronę celu (gdzie idziesz potem).",
        "Recall pod towerem gdy bezpiecznie (bliższa ścieżka).",
        "Mając zagranie po pushu (zejście top z mida) — dobijaj ostatniego CS już bliżej 'wyjścia'."
      ],
      when: "Cały czas. Każdy recall, każdy ruch.",
      success: "Wracasz na linię 10-15s szybciej każdorazowo × 8-12 recalli = 1-2 min zysku.",
      mistakes: [
        "Stanie w środku fontanny.",
        "Trzymanie dasha 'na walkę' (i tak nie użyjesz przed recallem).",
        "Plate na 0 HP solo (oddajesz CS minionom)."
      ]
    }
  },
  game_mechanics: {
    label: "Mechaniki gry — bounty, plate, catch-up XP",
    category: "early", phase: 2, week: 7, order: 24,
    short: "0/5 = darmowy trade za tower. PLATE: resy od liczby graczy. Catch-up XP.",
    details: {
      what: "Mechaniki które gra ci daje: bounty, plate gold sharing, catch up XP, lvl up po spellu, runy. Świadomość daje darmowy gold/xp/value.",
      how: [
        "BOUNTY: 0/5 nie dajesz golda → śmierć za tower opłacalna. Enemy 0/5 = nie warto go zabijać.",
        "PLATE: gdy zbijesz, resy zależą od liczby graczy. Często supp powinien odejść = większy zysk dla ciebie.",
        "CATCH-UP XP: niższy lvl od średniego = exp boost. Nie panikuj jak jesteś 1 level z tyłu.",
        "LEVEL UP PO spellu: jak masz spell w trakcie casta i pojawia się level → upgrade'ujesz → wyższy dmg za mniej many.",
        "Pierwsza fala ma SŁABE agro — wyjdź przed nią, możesz stać przed minionami.",
        "BOUNTY na sobie? Enemy cię focusuje. Bounty na enemy? Celuj w niego."
      ],
      when: "Cała gra, świadomość ekonomii.",
      success: "Wyciskasz darmowy gold/xp z mechanik systemowych.",
      mistakes: [
        "Strach przed śmiercią mając 0/5 (gameplay dexluxe).",
        "Supp przy plate (zmniejsza twój gold).",
        "Panika przy 1 lvl niżej (catch up daje boost)."
      ]
    }
  },

  // ---- Tydzień 8: Runy, zasoby, chain CC ----
  runes_items: {
    label: "Runy i itemy na linii",
    category: "early", phase: 2, week: 8, order: 25,
    short: "Doran Shield + Second Wind = przyjmij AA. Phase Rush = nie pal pod ganka.",
    details: {
      what: "Każda runa/item zmienia jak grać matchup. Doran Shield + Second Wind: celowo przyjmij AA (i tak się wyleczy) → wave przyjdzie szybciej do ciebie. Phase Rush: nie pal pod trade jeśli boisz się ganka.",
      how: [
        "Przed grą sprawdź runy enemy — jak ma Doran Shield + Second Wind = długie trade'y na niego.",
        "Krótkie trade'y na champa z healem (Doran Shield).",
        "Mając Phase Rush — trzymaj na ganka.",
        "Uważaj na Zhonię / Hex Drinkera w combo (enemy mid).",
        "Doran Shield: jeśli ty masz = celowo przyjmij AA, wave szybciej do ciebie."
      ],
      when: "Każdy matchup, pre-game preparation.",
      success: "Wiesz JAKIE trade'y wygrywasz a jakie nie w tym matchupie.",
      mistakes: [
        "Długie trade'y vs Doran Shield + heal.",
        "Phase Rush spalony na nic.",
        "Brak respektu Zhonii w ult combo."
      ]
    }
  },
  resources_max: {
    label: "Maksymalizacja zasobów — mana, HP, wardy",
    category: "max", phase: 2, week: 8, order: 26,
    short: "Cofasz? Spal manę/HP. Dive? Przytrzymaj tower hit. 2 staki wardów = strata.",
    details: {
      what: "Każda mana/HP/ward niewykorzystany = strata wartości. Cofasz za 5s i tak ze zregenują = wave clear do max. Dive: tower hit możesz przyjąć jeśli HP pozwala. Trzymanie 2 staków wardów = strata info.",
      how: [
        "Wiesz że cofasz → wave clear do max (mana niewykorzystana = strata).",
        "Cofasz → trade HP, nie ma sensu wracać z full HP.",
        "Dive: nawet bez skili możesz przytrzymać tower hit jeśli HP zezwala.",
        "Mega do tyłu = nie kupuj pinka (i tak nie utrzymasz).",
        "Zaraz finalna walka = kup coś nawet sub-optimal niż trzymać gold.",
        "ZAWSZE używaj potek w walce (mają CD).",
        "Wave dobijasz pod towerem 'od tyłu' = łapiesz info."
      ],
      when: "Cały czas. Świadomość że zasoby się odnawiają.",
      success: "Wracasz do bazy po realnym wykorzystaniu wszystkiego.",
      mistakes: [
        "Recall z pełną maną przy push fali.",
        "Potki nigdy nieużyte (kup je dla zabawy?).",
        "2 staki wardów = brak wizji = brak info.",
        "Trzymanie 800 golda na 'lepszy item' gdy potrzebujesz teraz."
      ]
    }
  },
  chain_cc: {
    label: "Chain CC — wydłużanie bezruchu",
    category: "teamfight", phase: 2, week: 8, order: 27,
    short: "Hard CC NIE stackuje się! CC kiedy enemy MA spele.",
    details: {
      what: "Chain CC to następujące po sobie skille CC wydłużające czas w którym gracz nic nie może. WIĘKSZOŚĆ hard CC NIE STACKUJE — nadpisuje. CC kiedy enemy ma spele (mage bez skili = bezbronny = CC mniej warty).",
      how: [
        "Pierwsze CC → poczekaj aż się skończy → DRUGIE CC (chain).",
        "Nie nakładaj 2 hard CC równocześnie — drugi nadpisuje pierwszy.",
        "Soft CC (slow) stackuje się z hard CC — można rzucać równocześnie.",
        "Optymalne: CC gdy enemy mage MA spele do użycia.",
        "Bez skili — mage bezbronny = CC mniej warty (zabijasz go tak czy siak)."
      ],
      when: "Walki 2v2+, ganki, all-iny, teamfighty.",
      success: "Enemy nic nie zagrał przez 3+ sekundy → łatwy kill.",
      mistakes: [
        "Dwa hard CC równocześnie (overlap).",
        "CC na ADC bez skili (waste).",
        "Brak follow-upu po CC."
      ]
    }
  },
  game_settings: {
    label: "Ustawienia gry (jednorazowe)",
    category: "micro", phase: "ongoing", week: null, order: 28,
    short: "Smartcasty, F-keye, dźwięki skilli, mały HUD, AA off.",
    details: {
      what: "Ustawienia mają usuwać opóźnienia i poprawiać czytelność. Nie cel sam w sobie ale złe ustawienia blokują mechanikę i świadomość mapy.",
      how: [
        "Smartcasty BEZ wskaźnika jako standard.",
        "F1-F4 sojusznicy, spacja na siebie.",
        "Champion target only jako TOGGLE (on/off), nie trzymany przycisk.",
        "Grafika postaci + skili MAX (czytelność), teren MIN (mniej rozpraszania).",
        "Dźwięki skili ON, muzyka OFF.",
        "HUD możliwie mały ale wygodny. Auto-ataki OFF.",
        "Attack-move bind na A (nie shift)."
      ],
      when: "Konfiguracja przed sesją. Korekta gdy coś realnie utrudnia grę.",
      success: "Nie walczysz z interfejsem. Szybciej wykonujesz akcje.",
      mistakes: [
        "Zmienianie ustawień co chwilę.",
        "Za duży HUD zasłaniający minimapę.",
        "Muzyka/chat zabierające uwagę."
      ]
    }
  },

  // ============================================================
  // FAZA 3: MACRO (Tydz 9-12+)
  // ============================================================

  // ---- Tydzień 9: Prio + tempo ----
  prio_basic: {
    label: "Prio — push wave przed enemy",
    category: "macro", phase: 3, week: 9, order: 29,
    short: "Prio = push wave przed enemy = punkt presji. Schemat: wave→obj→wave→obj.",
    details: {
      what: "Prio = przepchnięcie fali przed przeciwnikiem. Enemy traci gold/exp przy podejściu po CS = punkt presji. Automatyczne doliczenie do rozrachunku walki. Podstawowy łańcuch: wave → objective → wave → objective.",
      how: [
        "Pushuj falę pierwszy = enemy traci CS pod towerem.",
        "Schemat: wave → objective → wave → objective.",
        "Push mid+bot → schodzimy na smoka. Enemy oddaje smoka albo fale.",
        "Prio z 2 linii > prio z 1 (np. top + mid > tylko mid).",
        "Pierwszy herald = często bot move: prio z bota → suport schodzi i wspiera."
      ],
      when: "Każda decyzja przed objective, recall, roam.",
      success: "Wiesz na której linii masz prio TERAZ i wykorzystujesz to do zagrania.",
      mistakes: [
        "Pushowanie każdej fali bez celu.",
        "Oddanie fali i objective naraz.",
        "Brak świadomości prio = przegrywasz objektiwy bez wiedzy że mogłeś wziąć."
      ]
    }
  },
  tempo_basic: {
    label: "Tempo — przewaga czasu",
    category: "macro", phase: 3, week: 9, order: 30,
    short: "Tempo = przewaga CZASU. Recall przed enemy = twoje tempo.",
    details: {
      what: "Tempo to przewaga czasu: możesz zrobić coś PRZED enemy. Indywidualne (recall przed lane opponentem) i drużynowe (cały team na mapie, enemy resetuje). NIE DA SIĘ mieć tempo cały czas.",
      how: [
        "Recall przed enemy = ty pierwszy na mapie = tempo.",
        "Tempo drużynowe: cały team gotowy, enemy resetuje = okno.",
        "Śledź enemy w fog (gdzie jest, regen, dojście) = wyobrażalny obraz tempa.",
        "Szybkie wykorzystanie czasu — tempo się traci jeśli nie zrobisz nic.",
        "Tempo na chwilę do przodu = często wystarczy by zdążyć na cel."
      ],
      when: "Każda decyzja: jak szybko można coś zrobić przed enemy?",
      success: "Pierwszy na każdej akcji. Enemy reaguje na ciebie, nie odwrotnie.",
      mistakes: [
        "Marnowanie tempa (mam tempo ale stoję).",
        "Brak śledzenia enemy w fog.",
        "Założenie że tempo trwa zawsze."
      ]
    }
  },
  enemy_tempo_response: {
    label: "Odpowiedź na tempo enemy",
    category: "macro", phase: 3, week: 9, order: 31,
    short: "Na równo lub mały minus = CROSS-MAP. Mocno do tyłu = MATCHUJ.",
    details: {
      what: "Co robić gdy enemy ma tempo: jeśli mała różnica = graj cross-map (druga strona mapy). Mocno do tyłu = matchuj enemy (obrona, odbicie kontroli).",
      how: [
        "Tempo na równo / mały minus = CROSS-MAP PLAY (zabranie czegoś na drugiej stronie mapy).",
        "Enemy bierze drake → ty bierz heralda/tower top.",
        "Mocno do tyłu w tempie → matchuj enemy: obrona + ponowne przejęcie kontroli.",
        "Powoli wchodzisz, control wardy, obijasz enemy, czekasz na błąd.",
        "Cheese tylko jeśli oba schematy zawiodą."
      ],
      when: "Gdy enemy ma więcej tempa niż ty. Każda walka 'kto pierwszy'.",
      success: "Nie throwujesz odpowiedzi na zła pozycję. Zabierasz coś gdzie indziej.",
      mistakes: [
        "Wymuszanie walki przeciwko silnemu tempu enemy (throw).",
        "Brak cross-map play gdy mogłeś zabrać tower.",
        "Panika i cheese od 5 min."
      ]
    }
  },
  give_up_prio_tempo: {
    label: "Kiedy oddać prio / tempo",
    category: "macro", phase: 3, week: 9, order: 32,
    short: "Weak side = oddaj. Item spike za 30s = zostaniesz. Bliżej obj = i tak zdążysz.",
    details: {
      what: "Nie zawsze chcesz prio. Czasem freeze daje więcej (presure point), czasem zostanie dłużej daje spike, czasem jesteś bliżej obj i tak zdążysz.",
      how: [
        "Weak side (brak teamu, wizji) = oddaj prio.",
        "Freeze bez objektivów = presja ale przykuwa do linii, brak prio ale enemy traci CS.",
        "Nie pushuj fali od razu — wymusz na enemy decyzję (smok za 10s).",
        "Zostanie dłużej da item spike (Rabadon, IE) = warto oddać tempo.",
        "Bliżej objective niż enemy = nawet z tempem do tyłu zdążysz.",
        "Po baronie/eldera/soul = wymuszony długi push, tempo jest twoje tak czy siak."
      ],
      when: "Gdy alternatywa daje więcej niż utrzymanie prio.",
      success: "Świadomy wybór oddania prio za większy zysk gdzie indziej.",
      mistakes: [
        "Walka o prio za wszelką cenę.",
        "Push przez przypadek gdy mogłeś freeze pod ganka.",
        "Brak respektu dla weak side."
      ]
    }
  },

  // ---- Tydzień 10: Rotacje + objektiwy + smoki + herald ----
  rotation_t1: {
    label: "Rotacja po pierwszym T1",
    category: "macro", phase: 3, week: 10, order: 33,
    short: "Mid T1 → swap/jg. Bot T1 → mid. Top T1 → top zostaje.",
    details: {
      what: "Pierwszy zniszczony T1 = start mid game. Otwiera mapę. Rotacja po T1 decyduje czy tower był wart, czy stracony. Mapa to cebula: T1 → T2 → T3.",
      how: [
        "Po BOT T1 → ADC pushuje głęboko, ty rotujesz na mida (lub topa jak ADC ma mały range).",
        "Po MID T1 → odpushuj mida, rotacja na strong side ALBO kradzież enemy jg.",
        "Po TOP T1 → top zostaje (mały range, niemobilny zostawiony = łatwy cel).",
        "Enemy zniszczył T1 → analogicznie matchuj jego rotację.",
        "Wybór strong side (bot vs top) zależy od: czyje carry tam jest, kto pushuje, gdzie smok."
      ],
      when: "Natychmiast po upadku pierwszego T1 w grze.",
      whenNot: "Jeśli nie możesz pushować głębiej po wzięciu T1 = jakbyś jej nie zabrał. Wtedy odpushuj i wracaj.",
      success: "Po rotacji masz prio na nowej linii, team kontroluje pole gdzie idzie kolejny obj.",
      mistakes: [
        "Stanie na linii po wzięciu T1.",
        "Top rotuje na mid (mały range = traci CS).",
        "Zostawienie ADC samego na bot po wzięciu T1 mid (łatwy cel)."
      ]
    }
  },
  objective_from_something: {
    label: "Objektiwy Z CZEGOŚ — 5 czynników",
    category: "macro", phase: 3, week: 10, order: 34,
    short: "Prio + Tempo + Siła + Wygrana + Rotacje. Nigdy 'bo fajnie'.",
    details: {
      what: "Każdy objektiw bierzesz Z CZEGOŚ — nigdy 'bo fajnie' lub 'bo spawned'. 5 czynników: prio, tempo, siła w walce (fed), wygrana walka, rotacja silnego herosa.",
      how: [
        "Schemat early: WAVE → WIZJA → WAVE → OBJ.",
        "Z prio mid+bot: pushuj obie linie → schodzimy 4-5 → enemy oddaje fale albo obj.",
        "Z tempo: enemy poza mapy (zabity, recall) → twoje okno.",
        "Z wygranej walki: enemy 2+ down → obj za darmo.",
        "Z rotacją: nafedowany champ rotuje → enemy musi odpuścić.",
        "Wizja pod obj: pinki bliżej, wardy głębiej."
      ],
      when: "Gdy masz minimum 2 czynniki. 1 = ryzyko. 0 = throw.",
      whenNot: "Enemy ma prio + tempo + wizję = oddaj i graj cross-map.",
      success: "Obj zabrany bez strat, lub enemy oddał za obj coś równowartościowego.",
      mistakes: [
        "Obj bez wizji bo 'spawned'.",
        "Wymuszanie gdy enemy ma pełną wave pod twoim T1.",
        "Branie gdy team comp przegrywa walkę.",
        "Drugi herald dla golda (bez sensu jeśli nie ma czego pushować)."
      ]
    }
  },
  dragon_protocol: {
    label: "Smoki — wizja, prio, schemat",
    category: "macro", phase: 3, week: 10, order: 35,
    short: "Bliżej bazy pinki, dalej wardy. Push mid+bot → smok.",
    details: {
      what: "Smoka bierzesz Z CZEGOŚ. Wizja bliżej nas (pinki), głębiej zwykłe wardy. Mając prio mid+bot — schodzimy → enemy oddaje smoka albo fale.",
      how: [
        "Wizja: pinki bliżej naszej bazy (na rzece), czyścimy enemy wardy. Głębiej zwykłe wardy.",
        "Push mid i bot → schodzimy → enemy musi wybrać: oddać smoka albo fale (dzięki prio).",
        "Z dużym tempem = nie trzeba wizji.",
        "Z prio z topa i bota / mida = jak top schodzi 2 enemy muszą bronić.",
        "Silniejsi w walce = nie oddaj prio, weź smoka.",
        "Schemat: rotacje → branie prio → wizja → prio → smok."
      ],
      when: "Każdy smok. Szczególnie 3-4 (soul point).",
      whenNot: "Enemy ma 5 pod smokiem z pełnym HP + my przegrywamy walkę → oddaj za inny cel.",
      success: "Smok wzięty bez utraty walki/fal.",
      mistakes: [
        "Smok bez wizji.",
        "Smok gdy enemy ma cały team blisko.",
        "Smok ignorując że w grę wchodzi soul point."
      ]
    }
  },
  herald_map: {
    label: "Herald — POD OTWARCIE MAPY (nie golda!)",
    category: "macro", phase: 3, week: 10, order: 36,
    short: "Mobilny mid → BOT tower. Niemobilny → MID. Top NIE.",
    details: {
      what: "Herald gra się POD OTWARCIE MAPY, nie pod golda. Pierwszy herald to często bot move (prio z bota → suport schodzi).",
      how: [
        "Mobilny mid (Akali, Talon, Yasuo) → herald na BOT tower (mid wraca z TP).",
        "Niemobilny mid (Anivia, Veigar) → herald na MID tower (krótkie ścieżki).",
        "TOP tower z heralda → NIE (możesz przegrać topa niszcząc swoją T1 = swap).",
        "Drugi herald — niska wartość (brak platów). Idzie na T2.",
        "Pierwszy herald = często z bot mova (prio + suport schodzi)."
      ],
      when: "Po killu w jg lub gdy bot prio jest dobre.",
      whenNot: "Nie puszczaj heralda solo dla golda. Czekaj na okno z teamem.",
      success: "Tower upadł, mapa otwarta na tę stronę, deep wardy na buffach enemy.",
      mistakes: [
        "Herald 'gdziekolwiek' bez planu.",
        "Puszczenie na T2 zamiast T1.",
        "Niezsynchronizowane z falą — herald nie ma kogo wspierać."
      ]
    }
  },

  // ---- Tydzień 11: Baron + tereny + 4-1 + T3 ----
  baron_play: {
    label: "Baron",
    category: "macro", phase: 3, week: 11, order: 37,
    short: "Baron NIE zmienia macro — push tak samo, łatwiej. Nie odpalaj solo.",
    details: {
      what: "Baron daje empower fali (push deep) ale NIE zmienia twojego macro. Pushujesz tak samo, tylko łatwiej. Cel: zakończenie gry albo wpakowanie golda w carry.",
      how: [
        "Wardy jak pod smoki: pinki bliżej, wardy głębiej.",
        "Bierzemy prio z mida/bota, presure point, przykuwamy enemy do linii.",
        "Baron buff: 1 linia z buffem = enemy nie obroni gdy push.",
        "Empower się skończy = i tak push do T2/T3 zostawia coś.",
        "Wykorzystaj na: kończenie gry albo gold w carry (przegrana walka u nas)."
      ],
      when: "Gdy masz info że enemy nie kontestuje, lub po wygranej walce.",
      whenNot: "Bez info gdzie enemy mid/jg, full HP enemy 5 = throw.",
      success: "Baron + push = T2/T3/inhibitor. Albo gold w carry → następna walka.",
      mistakes: [
        "Forsowanie barona bez wizji.",
        "Baron i tylko stanie pod T1 (waste buffa).",
        "Solo barona w przegranej grze (throw przez smite-cont)."
      ]
    }
  },
  river_bush_control: {
    label: "Kontrola krzaków i rzeki",
    category: "vision", phase: 3, week: 11, order: 38,
    short: "Krzaki przy rzece blokują rotacje, dają carry bezpieczny spot.",
    details: {
      what: "Kontrola kluczowych krzaków decyduje, czy enemy może podejść po prio. Krzak mid-rzeka, krzak red buff. Czasem samo stanie w obszarze = ward.",
      how: [
        "Przejmuj obszar między krzakiem mida a rzeką przed smokiem/heraldem.",
        "Stojąc w obszarze obj — enemy nie podejdzie po mid prio = traci tempo.",
        "Krzak red buff — kluczowy do przejścia na side. Stąd zaczyna się odbijanie wizji.",
        "Krzak boczny przy ścianie — niemobilny carry ma bezpieczny spot.",
        "Ten sam krzak = punkt flanki dla mobilnych (Zed, Kennen, Ahri)."
      ],
      when: "Przed objective, przy obronie/pushu T2, blokowanie rotacji enemy.",
      success: "Enemy idzie dookoła = traci tempo = nie zabierze mid prio.",
      mistakes: [
        "Ward bez kontroli pozycyjnej.",
        "Oddanie krzaka który otwiera flankę.",
        "Wchodzenie po wizję bez prio i bez ludzi."
      ]
    }
  },
  splitpush_structures: {
    label: "4-1 setup i T2 push",
    category: "macro", phase: 3, week: 11, order: 39,
    short: "Toplaner sajt, JG+supp między, carry mid. Enemy 5 mid = supp+JG do topa = 3v1.",
    details: {
      what: "4-1 to struktura presji na 2 liniach. NIE oznacza dosłownie 4 osób na fali — to kontrola przestrzeni, wizji, synchronizacja. 1-3-1 wymaga większej przewagi.",
      how: [
        "Wizja w enemy JG (pinki + czerwona soczewka).",
        "Toplaner na sajt, JG+supp między mid a sajtem, carry mid.",
        "Enemy 5 mid → supp+JG schodzą do topa → tower 3v1 albo kill.",
        "Enemy 3 top + 2 mid → supp+JG do mida → tower za darmo.",
        "Synchronizacja fal: albo 2 fale naraz, albo stack jedna i zejście 5.",
        "1-3-1: tylko z dużą przewagą (carry na obu sajtach)."
      ],
      when: "Po T1, przy grze o T2.",
      whenNot: "Bez wizji w enemy jg, bez side threatu.",
      success: "Enemy traci tower/obj na jednej z linii.",
      mistakes: [
        "5 osób na jednej linii bez tempa.",
        "Splitpusher ginie 1v3.",
        "Brak synchronizacji fal."
      ]
    }
  },
  closing_game: {
    label: "T3, inhibitory, nexus",
    category: "macro", phase: 3, week: 11, order: 40,
    short: "2-3 inhib'y nie jeden. 2 linie + baron = 2 inhib. Najlepszy: naprzeciw obj.",
    details: {
      what: "Standardowy schemat zakończenia. Nie bierzemy 1 inhiba (enemy się obroni), bierzemy 2-3. Najbardziej wartościowy inhib: naprzeciw NASTĘPNEGO objectiva (nie mid).",
      how: [
        "2-3 inhib'y razem, nie jeden po jednym.",
        "2 linie + baron = nie trzeba 3 inhib.",
        "Po wygranej walce = jedną linią koniec gry.",
        "Enemy nie chce wyjść z bazy / ma dobry push = czekaj na dusze/barona i z tym kończ.",
        "Najlepszy inhib: NAPRZECIW kolejnego objectiva (nie mid — z mida wszędzie blisko).",
        "Inhib → super miniony → push → nexus turrets → nexus."
      ],
      when: "Gdy masz przewagę. Po wygranej walce/baronie/elderze.",
      whenNot: "Bez info gdzie enemy = możesz throwować nexusem.",
      success: "Inhib jedyny = enemy nie obroni 1 linii super minionów. 2-3 = wygrana.",
      mistakes: [
        "1 inhib mid i czekanie (enemy obroni).",
        "Mid inhib bo 'centralny' (najmniej wartościowy strategicznie).",
        "Push w 1 do nexusa po inhibie = giniesz."
      ]
    }
  },

  // ---- Tydzień 12: Side lane + carry + cheese ----
  side_resources: {
    label: "Carry mindset — zbieraj sajt lane",
    category: "macro", phase: 3, week: 12, order: 41,
    short: "'Pieniądze leżą na ulicy'. Nie stoisz w 5 na midzie. Zbieraj.",
    details: {
      what: "Mid jako win-con MUSI zbierać sajt lane gdy team gnije lub trzyma mid. Stanie w 5 = team za plecami, nie zbierasz nic. Strach że team padnie = ty też padasz.",
      how: [
        "Po zniszczeniu T1 mid → side lane farm (top albo bot).",
        "Nie stoisz w 5 na midzie i nie flipujesz walki.",
        "TP gotowy do zejścia do teamu jeśli zacznie się walka.",
        "Stanie w 5 = team comp za plecami, ty masz być win-conem.",
        "Carry mindset: nawet jak team padnie — ty robisz różnicę swoim levelami/itemami."
      ],
      when: "Mid game od pierwszego T1.",
      whenNot: "Team gnije i potrzebuje cię na obronie barona.",
      success: "Po side farm: leveled, nowy item, gotowy zmienić walkę.",
      mistakes: [
        "Stanie z teamem 'bo trzeba być razem'.",
        "Side farm bez TP up.",
        "Side farm w przegranej grze gdy potrzebny 4-1."
      ],
      notes: "Twoje słowa: jesteś source of damage. Nie masz prawa flipować walki gdy nie zebrałeś zasobów."
    }
  },
  side_lane_uses: {
    label: "Side lane — 3 sposoby gry",
    category: "macro", phase: 3, week: 12, order: 42,
    short: "1) Mapa do side'a, 2) Side do mapy, 3) Splitpush (2 źródła presji).",
    details: {
      what: "Trzy sposoby grania side lane: (1) mapa gra do side'a, (2) side gra do mapy, (3) klasycznie split push - dwa źródła presji jednocześnie.",
      how: [
        "1) MAPA DO SIDE'A: gracz na sajdzie wytwarza presje (wave, nie 1v1 zabicie). Drużyna bierze prio mid + kontrola jg by splitpusher mógł pushować.",
        "2) SIDE DO MAPY: wytworzenie prio na side → zejście do teamu na mid.",
        "3) SPLITPUSH (2 źródła): nasza drużyna robi barona. Zmuszamy enemy do wybierania: side czy baron. Musi dziać się NARAZ.",
        "Splitpusher musi sam zmusić CO NAJMNIEJ 2 enemy do zejścia.",
        "Synchronizacja: fale weszą naraz lub jedna po drugiej."
      ],
      when: "Po T1, mid-late game.",
      success: "Enemy traci towera/obj na jednej linii.",
      mistakes: [
        "Splitpush bez wizji w enemy jg.",
        "Splitpusher zbyt daleko od reszty (1v3 śmierć).",
        "Brak sync z drugim źródłem presji."
      ]
    }
  },
  counter_splitpush: {
    label: "Odcinanie + kontra split push",
    category: "macro", phase: 3, week: 12, order: 43,
    short: "'Nie ma fali nie ma problemu'. Usuń falę splitpusherowi.",
    details: {
      what: "Jak grać przeciwko side lane presji enemy. Klucz: usuń falę graczowi splitpushującemu = enemy musi czekać na następną. Odbieranie wizji zmusza go do cofnięcia.",
      how: [
        "Zabranie mid prio → zejście w fog na side lane.",
        "Zawsze chcesz USUNĄĆ falę splitpusherowi.",
        "'Nie ma fali nie ma problemu'.",
        "Matchup nam przegrywa 1v1? Zamień się liniami (chyba że wygrywa wszystkim).",
        "Granie dookoła wizji (odbieranie jej) zmusza do cofnięcia.",
        "Strong side na DRUGIEJ stronie mapy — splitpusher się nie rozdwoi.",
        "Odcięcie enemy na side: po zabraniu mida schodzimy = enemy bez powrotu do drużyny."
      ],
      when: "Enemy ma split pushera. Mid game.",
      success: "Splitpusher nie pushuje (brak fali) albo traci wave.",
      mistakes: [
        "Walka 4v4 zamiast usuń falę.",
        "Pozwalanie splitpusherowi na wizję.",
        "Brak swap kiedy mamy lepszego solo."
      ]
    }
  },
  map_sync: {
    label: "Synchronizacja mapy i fal",
    category: "macro", phase: 3, week: 12, order: 44,
    short: "Fale + objektive + item spike + jungler + pozycja teamu = razem.",
    details: {
      what: "Synchronizacja = ustawienie fal i ruchu graczy tak, by enemy musiał wybierać między stratami. Dobra akcja makro dzieje się w tym samym czasie co presja na fali/obj.",
      how: [
        "Synchronizuj fale: wchodzą naraz lub jedna po drugiej.",
        "Pushuj w timing gdzie enemy nie odpowie naraz na falę i smoka.",
        "Opóźnij push jeśli brakuje golda do spike'a i nadal zdążysz.",
        "Jungler chce akcję → fala tworzy punkt presji w innym miejscu.",
        "Linia po sojusznikach: nie bądź zbyt głęboko, nie zbyt daleko (off-team)."
      ],
      when: "Mid/late, objective setup, splitpush, obrona.",
      success: "Ruchy spójne z falami i teamem. Enemy reaguje na presję.",
      mistakes: [
        "Samotny push bez linii sojuszników.",
        "Przyjście na objective bez przygotowanej fali.",
        "Stanie w miejscu zamiast wejść w fog."
      ]
    }
  },

  // ---- Tydzień 12+: Wizja macro + gra od tyłu + cheese + macro solo ----
  vision_macro: {
    label: "Wizja macro — pod cele, nie obronę",
    category: "vision", phase: 3, week: 12, order: 45,
    short: "Wizja = info → decyzje → wygrana. Pod obj/carry. Głębiej = szybciej.",
    details: {
      what: "Wizja nie do bronienia, ale do INFO. 2 rodzaje: (1) wiemy i mamy wizję, (2) wiemy + enemy WIE że my wiemy. Drugie często gorsze (enemy może na to grać).",
      how: [
        "Pinki bliżej (kontrola), wardy dalej (info).",
        "Sprawdzasz enemy wizję — lepiej gdy nic nie ma (wiemy że enemy nie wie) niż niszczysz (oddajesz info).",
        "Każdy ward POD COŚ: pod obj, pod carry, pod akcję.",
        "Lane ward jeśli T1 mid nie stoi.",
        "Im wizja głębiej = szybsza info."
      ],
      when: "Cała gra. Każdy ward = cel.",
      success: "Akcje informowane wizją. Enemy często nie wie że ty wiesz.",
      mistakes: [
        "Wardy bronione, żaden info.",
        "Wardy bez celu = strata golda.",
        "Niszczenie enemy warda zawsze."
      ]
    }
  },
  play_behind: {
    label: "Gra od tyłu — SCHEMAT, nie cheese",
    category: "teamfight", phase: 3, week: 12, order: 46,
    short: "Mindset reaktywny. Sync fal, deep wardy, czekanie na błąd enemy.",
    details: {
      what: "Granie z tyłu = SCHEMAT, nie cheese. Push T2 z synchronizacją fal, deep wardy, czekanie na błąd enemy. Cheese (backdoor, splitpush sam) tylko gdy schemat nie działa.",
      how: [
        "T2 push z synchronizacją fal.",
        "Deep wardy w enemy jg.",
        "Wizja na backdoor możliwości.",
        "Czekanie aż enemy zrobi błąd: za daleki push, samotny carry, niedbały recall.",
        "Mindset REAKTYWNY: enemy nie zagra dobrze (nawet Faker się myli).",
        "Powoli wchodzimy, control wardy, obijasz enemy, czekasz na okazję."
      ],
      when: "Przegrywasz, nie ma prio, enemy ma obj, gra trwa.",
      whenNot: "Gdy wygrywasz — gramy schemat dominanta.",
      success: "Złapanie błędu enemy → odzyskanie walki/obj → comeback.",
      mistakes: [
        "Panika + cheese od 5 min.",
        "Brak schematu = chaos = throw.",
        "Czekanie pasywne (bez pushowania T2)."
      ]
    }
  },
  cheese_plays: {
    label: "Cheese — TYLKO gdy przegrywamy",
    category: "macro", phase: 3, week: 12, order: 47,
    short: "Cheese tylko jak macro nie działa. Fog play, dedukcja, niepoprawne zagrania.",
    details: {
      what: "Cheese = granie niepoprawnie, niespodziewane. Tylko wtedy kiedy przegrywamy. Jeśli wygrywamy = schemat macro da zwycięstwo. Cheese to ostateczność.",
      how: [
        "Granie fogiem aby wytwarzać presję = enemy nie widzi, musi przewidywać.",
        "Dedukcja: A pusty, ja w B = enemy w C. Pomyśl co byłoby najgorsze, nie co najlepsze.",
        "Backdoor: szybki teleport do bazy, jedna linia inhib.",
        "All-in 1v3 z spella co rzadko trafia (Veigar E).",
        "Niepoprawne pozycje (assassin w teamfighcie z poke comp)."
      ],
      when: "Tylko gdy przegrywamy i schemat zawiódł. Last resort.",
      whenNot: "Gdy wygrywasz — schemat ci da grę.",
      success: "Cheese udał się = comeback. Albo straciłeś TROCHĘ, ale nie przegrałeś od razu.",
      mistakes: [
        "Cheese gdy wygrywałeś (wprowadza chaos = przegrana).",
        "Cheese od 5 min.",
        "Niepoprawne zagrania bez planu."
      ]
    }
  },
  macro_alone: {
    label: "Macro ze słabym teamem",
    category: "mindset", phase: 3, week: 12, order: 48,
    short: "60-70% poprawności macro SAM. Skup na sobie. Pingi tak, czat nie.",
    details: {
      what: "Bez teamu nie osiągniesz 100% macro, ale SAM możesz osiągnąć 60-70%. Skup się na sobie. Nie próbuj tworzyć własnych alternatyw = chaos. Skup się na schematach.",
      how: [
        "60-70% poprawności = SAM. Nie myśl o czymś na co nie masz wpływu.",
        "Jeśli u ciebie noob team = w enemy też noob team.",
        "Pingi TAK, czat NIE. Pingowanie kierunku gry, nie narzekanie.",
        "Nie próbuj alternatyw, schemat jest schematem.",
        "Żeby łamać zasady = najpierw zrozum je.",
        "Nie nakierujesz teamu na zagranie czatem (wyłącz czat lol)."
      ],
      when: "Każda gra solo q. Nawyk.",
      success: "Gra ze swoim macro = wygrana mimo team. Nie tracisz energii na team.",
      mistakes: [
        "Próba kierowania teamu czatem.",
        "Stworzenie 'alternatyw' do schematu.",
        "Tilt na team = sam sobie szkodzisz."
      ]
    }
  },

  // ============================================================
  // UNIWERSALNE (trenuj ciągle)
  // ============================================================
  zero_plus: {
    label: "Koncepcja 0+ / 0-",
    category: "max", phase: "ongoing", week: null, order: 49,
    short: "Darmowe akcje. Zwykle 0, raz na 50x wygrywają grę.",
    details: {
      what: "0+ = akcja prawie nic nie kosztująca, zwykle bez nagrody, ale czasem przynosi duży zysk. 0- = pozornie mały błąd, zwykle nie karze, ale raz na jakiś czas przegrywa sytuację.",
      how: [
        "Sprawdź kamerą side lane podczas bezpiecznej animacji.",
        "Pingnij missing/summoner jeśli info może komuś pomóc.",
        "Wejdź na chwilę w fog gdy nic nie tracisz = enemy musi respect.",
        "Nie trzymaj 2 staków wardów bez użycia.",
        "NIE facecheckuj 'bo pewnie nikogo nie ma' — klasyczne 0-."
      ],
      when: "Cała gra. Szczególnie między falami, po pushu, przed obj.",
      success: "Małe darmowe przewagi bez ryzykowania tempa/HP/fali.",
      mistakes: [
        "Ignorowanie małych akcji 'bo nieważne'.",
        "0+ wtedy gdy kosztuje falę/tempo.",
        "Akceptowanie 0- na autopilocie."
      ]
    }
  },
  relativism: {
    label: "Relatywizm — X != X",
    category: "mindset", phase: "ongoing", week: null, order: 50,
    short: "1 za 1 NIGDY równe. Kontekst WSZYSTKO zmienia.",
    details: {
      what: "Relatywizm: aby coś ocenić, trzeba umieścić to w kontekście. W lolu X NIE RÓWNA SIĘ X. Wymiana 1 za 1 killa nigdy nie jest równa — zależy od itemów, mapy, situacji, bounty.",
      how: [
        "Każda 'równa' wymiana NIE jest równa. Patrz na kontekst.",
        "1 za 1 kill: kto był bliżej obj? Czyje carry padło? Bounty?",
        "Cross jg: dwóch jg, jeden zabrał górną mapę, drugi dolną (same gold/buffy) ALE jeden bliżej win-con carry = przewaga.",
        "Itemy: 3.5k golda na ADC vs 3.5k golda na tank = ABSOLUTNIE NIE RÓWNE.",
        "Sytuacja: 50/50 walka w 5v5 vs 50/50 walka 'oni mają TP up' = nie równe."
      ],
      when: "Każda decyzja. Każda ocena 'czy to było warte'.",
      success: "Świadome ocenianie sytuacji = lepsze decyzje.",
      mistakes: [
        "Liczenie killi/towerów jak liczb (1=1).",
        "Brak kontekstu w decyzjach.",
        "Tilt na 'team zmarnował kill 0-1' (a może to było dobre)."
      ]
    }
  },
  timers: {
    label: "Timery — fale, levele, objektiwy",
    category: "info", phase: "ongoing", week: null, order: 51,
    short: "Cannon co 3. 2lv=7CS solo, 3lv=14. Smok/Herald w głowie.",
    details: {
      what: "Fale są w określonych timerach. Levele, objektiwy, recall windows — wszystko można przewidzieć. Myśl 2 minuty przed objective: gramy? oddajemy? co w zamian?",
      how: [
        "SOLO LINIA: 2lv = 7 CS, 3lv = 14 CS, 4lv = 24 CS. 6lv = po fali 8.",
        "BOT: 2lv = 9 CS (1 fala + 3 mele), 3lv = 21 CS.",
        "Cannon co 3 fala (zwykle ~30s po fali).",
        "JG: 1 camp = 4 CS. Tracking CS daje gdzie był.",
        "Smok co 5 min od poprzedniego (lub spawn 5:00).",
        "Herald 14:00 → 19:30 (lub do 19:55 jeśli nie wzięty).",
        "Baron 20:00.",
        "Myśl 2 min PRZED: gramy obj? oddajemy? co w zamian?"
      ],
      when: "Cała gra. Świadomość timera.",
      success: "Wiesz przed falą czy grasz pod level spike, reset, obj, freeze.",
      mistakes: [
        "Reagowanie na obj dopiero gdy się pojawi.",
        "Recall bez uwzględnienia cannon wave.",
        "Brak licznika CS jg."
      ]
    }
  },
  test_limits: {
    label: "Znajomość limitów — testuj!",
    category: "mindset", phase: "ongoing", week: null, order: 52,
    short: "Nie wchodzac TEŻ tracisz! Podobne lvl/itemy = TESTUJ.",
    details: {
      what: "Mamy 2 opcje gdy nie znamy limitów: wejść lub nie. Wejść = ryzyko że przegramy. Nie wejść = nie poznamy limitów, fakt zmniejszysz ryzyko, ale również nic nie zyskasz. Więc lepiej próbować niż nic nie robić.",
      how: [
        "Mamy podobne levele, itemy, brak negatywnych interakcji skili (W Yasuo na Veigara), runy bez diffa, summonery nie znaczą — WARTO testować.",
        "Po testach (3 gry tego samego matchupu) = czujesz limity.",
        "By to poprawić: 2-3 championy i 1 linia i ich się trzymaj.",
        "Każda gra jest inna — limity trzeba CZUĆ.",
        "Nie wszystkie testy się udadzą — to OK, gainasz info."
      ],
      when: "Każda gra w nowym matchupie, każda 'niepewna' walka 1v1.",
      success: "Po 5-10 gier z championem czujesz limity bez myślenia.",
      mistakes: [
        "Stanie pasywnie 'nie wiem czy wygram'.",
        "Cofanie ZAWSZE bez testowania.",
        "Granie 10 różnych championów (brak limitów)."
      ]
    }
  },
  fight_roles: {
    label: "Teamfighty — Engage>Poke>Disengage, front-to-back",
    category: "teamfight", phase: "ongoing", week: null, order: 53,
    short: "PRZED walką: kto zagrożenie? Win con? Trójkąt comp.",
    details: {
      what: "W walkach nie da się liczyć wszystkiego w trakcie. PRZED walką musisz znać swoją rolę, największe zagrożenie, win condition obu drużyn. Engage > Poke > Disengage > Engage.",
      how: [
        "ENGAGE > POKE (mobilni wbijają na poke carry).",
        "POKE > DISENGAGE (długi range nie da się tarczy).",
        "DISENGAGE > ENGAGE (Galio/Braum nie dają wejść).",
        "Mag/control mage: bije FRONT-LANE (najbliższy target).",
        "Assassin: omija front, szuka kąta na fed carry, z fog/flanki.",
        "Support: stoi z tyłu, zabezpiecza carry.",
        "Front-to-back: silne carry zza frontu. Flanka: łamie front-to-back."
      ],
      when: "PRZED każdą walką (w walce nie zdążysz).",
      success: "Wchodzisz z gotową odpowiedzią: gdzie stoję, kogo biję, czego unikam.",
      mistakes: [
        "Brak świadomości compu.",
        "Granie pod swój pick zamiast pod team.",
        "Assassin bije tanka od frontu bez powodu."
      ]
    }
  },
  study_proportions: {
    label: "Proporcje nauki — gier vs oglądania",
    category: "mindset", phase: "ongoing", week: null, order: 54,
    short: "Gold 10:1, Emerald 7:1, Master 5:1. Własne gry NAJLEPSZE.",
    details: {
      what: "Im niższe elo, tym mniej oglądania (i tak nie ogarniasz). Im wyższe = więcej oglądania. Własne gry i materiały edukacyjne > pro/competitive. Krytyczne podejście kluczowe.",
      how: [
        "GOLD/PLAT: 10 gier : 1 materiał (1 gra dobrego gracza/edu).",
        "EMERALD/DIAMOND: 7:1.",
        "MASTER+: 5:1.",
        "Co oglądać: WŁASNE GRY > MATERIAŁY EDU > PRO/HIGH ELO > LOW ELO/COMP.",
        "Krytyczne podejście: nie gloryfikuj pro gracza. CZEMU to robi? Czy jest słabe?",
        "Najwięcej uczysz się gdy konfrontujesz swoje zdanie z innym (odmiennym)."
      ],
      when: "Każda sesja. Stosunek gier do oglądania.",
      success: "Po grze umiesz wskazać 3 konkretne błędy/dobre decyzje. Po oglądaniu — wiesz CZEMU coś było słabe.",
      mistakes: [
        "Oglądanie zamiast grania (low elo).",
        "Gloryfikacja pro graczy ('Faker robi tak więc dobrze').",
        "Brak refleksji własnych gier."
      ]
    }
  },

  // ============================================================
  // ZACHOWANE (extra — niektóre split-y / specjalistyczne)
  // ============================================================
  pre_first_wave: {
    label: "Wyjście PRZED 1. falą",
    category: "early", phase: 2, week: 5, order: 100,
    short: "Pierwsza fala ma słabe agro. Wyjdź z bazy 0:25-0:30.",
    details: {
      what: "Wychodzisz z bazy PRZED pierwszą falą. Pierwsza fala ma osłabione agro — możesz stać przed nią, zabrać aktywności (invade, line ward, lvl 1 walka, scouting).",
      how: [
        "Wyjście z bazy o 0:25-0:30 (nie po fali, przed).",
        "Pozycja w buszu przed minionami lub na trójkącie.",
        "Możesz wziąć: cheese invade z jg, line ward na rzece, lvl 1 walka, scouting enemy jg startu."
      ],
      when: "Każda gra. Standard.",
      success: "Pierwszy hit na minionie z dokładnym CS, możliwy lvl 2 spike przed enemy.",
      mistakes: ["Wyjście po fali — tracisz 5-10s tempa."]
    }
  },
  smartcast_dash: {
    label: "Smartcast dash w powrocie",
    category: "max", phase: 2, week: 7, order: 101,
    short: "Każdy dash kiedy CD up, w drodze na linię.",
    details: {
      what: "Spele dające dash/MS używasz ZAWSZE w powrocie na linię, nie tylko w walce. Wracasz 10-15s szybciej × liczba recalli = duża oszczędność.",
      how: [
        "Smartcasty bez wskaźnika.",
        "Pierwszy dash zaraz po wyjściu z bazy.",
        "Każdy kolejny dash gdy CD się odnawia podczas powrotu.",
        "Trzymanie spelle 'na walkę' = strata 10s na recall."
      ],
      when: "Powrót na linię, między akcjami w jg, każde przemieszczenie >5s.",
      success: "Wracasz szybciej, masz więcej CS, częściej dostępny dla teamu.",
      mistakes: ["Trzymanie dasha 'na wszelki wypadek' = nieużyty."]
    }
  },
  attack_move: {
    label: "Attack-move + AA cancel",
    category: "micro", phase: 1, week: 2, order: 102,
    short: "A+klik. Kancelacja animacji ruchem po wystrzale pocisku.",
    details: {
      what: "Attack-move (A+klik) zamiast right-click — auto-targetuje najbliższy cel. Plus kancelacja animacji AA klikiem ruchu zaraz po wystrzale pocisku. DPS rośnie ~15-20% przy kicie.",
      how: [
        "Bind 'attack move' na A.",
        "A → klik na ziemi → champion strzela do najbliższego enemy.",
        "Kanceluj animację AA klikiem ruchu (tuż po wystrzale).",
        "Praktykuj w Practice Tool."
      ],
      when: "Każda walka, każdy kite, CS w niewygodnej pozycji.",
      success: "Więcej AA w tym samym czasie, mniej misclick na minion.",
      mistakes: [
        "Right-click w walce → klikasz w minion zamiast champa.",
        "Brak kancelacji → tracisz tempo."
      ]
    }
  },
  fountain_end: {
    label: "Regen na końcu fontanny",
    category: "max", phase: 2, week: 7, order: 103,
    short: "Po recallu od razu na koniec fontanny — bliżej wyjścia.",
    details: {
      what: "Po recallu nie stoisz w środku fontanny — przesuwasz się od razu do końca. Mała oszczędność 1-2s × 8-12 recalli = 15-25s.",
      how: [
        "Po pojawieniu w bazie → klik na koniec fontanny (najbliżej wyjścia).",
        "Sklep otwiera się przez P niezależnie od pozycji.",
        "Wyjście z bazy = już jesteś przygotowany."
      ],
      when: "Każdy recall.",
      success: "Auto-nawyk — nigdy nie czekasz w środku.",
      mistakes: ["Kupowanie itemów w centrum fontanny."]
    }
  },
  recall_under_tower: {
    label: "Recall pod towerem",
    category: "max", phase: 2, week: 6, order: 104,
    short: "Gdy nikogo nie ma w pobliżu — recall pod towerem.",
    details: {
      what: "Recall pod towerem jest bezpieczniejszy niż w krzaku gdy nikogo nie widać. Tower daje tarczę.",
      how: [
        "Sprawdź minimap (ostatnie 3s — gdzie wszyscy enemy).",
        "TAB — sprawdź czy enemy mid widoczny.",
        "Recall pod tower (bezpieczeństwo + krótsza ścieżka)."
      ],
      when: "Standardowy recall gdy nikogo nie widać.",
      whenNot: "Enemy mid zniknął niedawno — krzak bezpieczniej.",
      success: "Krótsza droga powrotną, brak śmierci przez facecheck.",
      mistakes: ["Recall w krzaku bez info."]
    }
  },
  burn_pre_recall: {
    label: "Spal manę/HP przed recallem",
    category: "max", phase: 2, week: 7, order: 105,
    short: "Wave clear do max, harass, trade — zaraz recall.",
    details: {
      what: "Spal manę i HP tuż przed recallem. Manę odzyskasz, HP też. Każda mana niewykorzystana = strata wartości.",
      how: [
        "Wave clear do max.",
        "Harass enemy jeśli wraca.",
        "Trade HP — bez sensu wracać z full HP gdy recall za 5s."
      ],
      when: "Tuż przed planowanym recallem.",
      success: "Wracasz po wykorzystaniu zasobów.",
      mistakes: ["Recall z pełną maną gdy fala mogła być dopchnięta."]
    }
  },
  track_flashes: {
    label: "Track flashy enemy",
    category: "vision", phase: 2, week: 8, order: 106,
    short: "Cyferki na chat 1-5. Bez flasha = łatwy gank.",
    details: {
      what: "Świadomość flash up/down dla każdego enemy. Champion bez flasha = łatwy gank.",
      how: [
        "Po użyciu flasha enemy → ping cyferka 1=top, 2=jg, 3=mid, 4=adc, 5=sup.",
        "Pamiętaj flash CD = 5 min (300s) bez ulta, 4 min (240s) z ultem.",
        "Bez flash carry = łatwy gank dla twojego jg = ping smite."
      ],
      when: "Cały czas. Aktualizujesz w głowie.",
      success: "Ping flash enemy → gank jg → kill.",
      mistakes: [
        "Zapamiętanie flasha tylko na 20s.",
        "Ping bez numeru/roli.",
        "Brak wykorzystania okna bez flasha."
      ]
    }
  },
  roam_after_push: {
    label: "Roam TYLKO po slow pushu",
    category: "macro", phase: 3, week: 11, order: 107,
    short: "Bez pusha mida = -200 gold + exp. Roam = push + ward + akcja.",
    details: {
      what: "Roamowanie jest opłacalne TYLKO gdy najpierw spushowałeś mida. Roam bez pusha = -200 gold + exp na linii.",
      how: [
        "Spush mida do strong side (do bota carry, do topa renekton).",
        "Pinki gotowe lub czerwona soczewka — enemy mid nie może cię widzieć.",
        "Roam to NIE TYLKO killy — też deep wardy.",
        "Po zabiciu: pomóż spushować linię teamowi.",
        "Idealny gank: udajesz że pushujesz → enemy wbija → cyk gank jg."
      ],
      when: "Po spushu, gdy mid jest pod tower.",
      whenNot: "Mid na środku, enemy mid widzi cię na mini.",
      success: "Min: deep ward + powrót bez utraty CS. Max: kill + tower + 2 wardy.",
      mistakes: [
        "Roam bez pusha.",
        "Roam gdy enemy mid cię widzi.",
        "Roam tylko pod killa (też wardy są wartością)."
      ]
    }
  },
  comp_awareness: {
    label: "Świadomość team comp",
    category: "teamfight", phase: "ongoing", week: null, order: 108,
    short: "PRZED walką: kto zagrożenie? Win con? 3 grupy postaci.",
    details: {
      what: "Każdy team to mix: ENGAGE / POKE / DISENGAGE. Wiesz kto jest kim, wiesz która grupa ma przewagę. Mentalna mapka PRZED walką.",
      how: [
        "ENGAGE > POKE, POKE > DISENGAGE, DISENGAGE > ENGAGE.",
        "Przed walką: kto MOJE największe zagrożenie? Co zrobię żeby nie zginąć?",
        "Określ win condition team compu (ich i twojego).",
        "Pod dany comp dopasuj swoją grę: poke = trzymaj się tyłu, engage = inituj z teamem."
      ],
      when: "Przed każdą walką.",
      success: "Wiesz przed: gdzie staję, kto focus, kogo się boję, jak unikam.",
      mistakes: [
        "Brak świadomości compu.",
        "Granie pod swój pick zamiast pod team.",
        "Ignorowanie disengage enemy."
      ]
    }
  },
  front_to_back_flank: {
    label: "Front-to-back vs flanka",
    category: "teamfight", phase: "ongoing", week: null, order: 109,
    short: "Silne carry za frontem. Flanka łamie strukturę.",
    details: {
      what: "Front-to-back: walka przez najbliższy cel. Carry bije, tank chroni. Flanka: wejście z boku/tyłu, odcina carry, rozbija strukturę.",
      how: [
        "Silniejsze carry = broń struktury, odcinaj flanki enemy.",
        "Enemy ma lepszy front-to-back = szukaj flanki / wejścia z fog.",
        "Przed walką: kto może flankować i z której strony.",
        "NIE stój jako carry tam gdzie flankujący ma darmowe wejście.",
        "Flanka nie musi zabić — samo wymuszenie cofnięcia carry kupuje przestrzeń."
      ],
      when: "Walki 5v5, objective, oblężenia.",
      success: "Carry bije zza frontu, lub flanka rozbija enemy backline.",
      mistakes: [
        "Carry wychodzi przed front.",
        "Brak kontroli bocznych wejść.",
        "Flanka bez sync z teamem."
      ]
    }
  },
  not_fight: {
    label: "Wiem kiedy NIE walczyć",
    category: "teamfight", phase: "ongoing", week: null, order: 110,
    short: "Enemy ma item spike → cross-map zamiast 5v5.",
    details: {
      what: "Wiedza KIEDY NIE walczyć. Cross-map > 5v5 w niekorzystnej sytuacji. Tradeoff niekorzystny = nie walcz, zabierz coś gdzie indziej.",
      how: [
        "Enemy ma ludena, ty brak 1st itemu → CROSS-MAP (druga strona mapy).",
        "Enemy 5 pod baronem z full HP → nie inituj, daj barona za T2/smok.",
        "Twój ADC daleko → nie walcz w 4. Cofnij, regroup.",
        "Twój win-con bez itemów → kupuj czas, freeze.",
        "Po wygranej walce enemy → T2 push gdy ich nie ma."
      ],
      when: "Gdy tradeoff niekorzystny.",
      whenNot: "Musisz reagować natychmiast (baron, soul drak, elder).",
      success: "Nie throwujesz walk z deficytem. Zabierasz obj gdy enemy walczy.",
      mistakes: [
        "Walka 5v5 'bo nudzi się'.",
        "Walka pod barona gdy ich ADC fed.",
        "Brak cross-map (wszyscy walczą zamiast pushować)."
      ]
    }
  },
  cs_timers: {
    label: "CS i levele — solo/bot",
    category: "early", phase: 2, week: 8, order: 111,
    short: "Solo: 2lv=7CS, 3lv=14, 4lv=24. Bot: 2lv=9, 3lv=21.",
    details: {
      what: "Wiedza kiedy enemy/ty dostaje level spike. Cannon = ostatnia szansa na trade przed recallem. Plan 2 min przed obj.",
      how: [
        "SOLO LANE: level 2 po 7 CS, 3 po 14, 4 po ~24, 6 po 8. fali.",
        "BOT: level 2 po 9 CS (fala + 3 mele), 3 po 21.",
        "Pod towerem kontroluj HP minionów wcześniej.",
        "Naucz się dmg towera i agro na najbliższe miniony."
      ],
      when: "Laning, recall timing, plan pod smoka/heralda/grubsy.",
      success: "Wiesz przed falą czy grasz pod spike, reset, obj, freeze.",
      mistakes: [
        "Reagowanie na obj dopiero gdy się pojawi.",
        "Recall bez uwzględnienia cannon wave.",
        "Dopuszczanie wielu low HP minionów pod towerem."
      ]
    }
  },
  info_collection: {
    label: "Zbieranie informacji — overview",
    category: "info", phase: 1, week: 1, order: 112,
    short: "Minimapa, F-keye, TAB, CS jg, dedukcja z fog'a.",
    details: {
      what: "Dobra decyzja macro zaczyna się od informacji. Zbierasz z minimapy, kamery, TAB, licznika CS jg, zniknięć z mapy i drobnych sygnałów (mana/HP/summonery).",
      how: [
        "Minimapa po last hicie albo podczas własnej animacji.",
        "F1-F4 na sojuszników, spacja na siebie.",
        "TAB: level, itemy, kluczowe defensywy, '?'.",
        "Jungle tracking: 1 camp = 4 CS.",
        "Fog tracking: cofnął → recall + regen + dojście = wyobrażalny zasięg."
      ],
      when: "Cała gra, szczególnie przed pushem, roamem, obj.",
      success: "Decyzje na podstawie prawdopodobnego położenia enemy, nie reakcji.",
      mistakes: [
        "Patrzenie na KDA zamiast itemów.",
        "Brak liczenia CS jg.",
        "Zakładanie że enemy support cofa (a roamuje)."
      ]
    }
  },
  no_tilt: {
    label: "Świadomość tiltu",
    category: "mindset", phase: 1, week: 1, order: 113,
    short: "Tilt = sam sobie szkodzisz. Reset albo koniec.",
    details: {
      what: "Tilt = zmniejszona ocena sytuacji + zwiększone ryzyko. To MENTALNA DECYZJA. Sam sobie szkodzisz.",
      how: [
        "Trigger awareness: irytacja, ścisk w żołądku, chęć 'pokazania' enemy.",
        "Diagnoza w 5s: czy gram lepiej czy gorzej niż 5 min temu?",
        "Reset: oddech 4-7-8, spacja w teamfightach, wyłącz emocje.",
        "Nie da się resetować = koniec sesji."
      ],
      when: "Po każdej śmierci / przegranej / 'głupim' move teamu.",
      success: "Rozpoznajesz tilt w 30s, decyzja (reset/koniec).",
      mistakes: [
        "Queue od razu po emocjonalnej grze.",
        "Szukanie winy w teamie.",
        "Granie agresywniej żeby 'odrobić'."
      ]
    }
  },
  break_after_loss: {
    label: "Przerwa po przegranej",
    category: "mindset", phase: 1, week: 1, order: 114,
    short: "Min 5 min od kompa po przegranej. Następna gra zawsze gorzej.",
    details: {
      what: "Po przegranej rezydualny tilt + zmęczenie. Statystycznie następna gorzej. Przerwa min 5 min — wstać, woda, oddech.",
      how: [
        "Po przegranej: NIE next game od razu.",
        "Wstać, oddech, woda, krótki spacer.",
        "Minimum 5 min od kompa.",
        "Po 3 przegranych z rzędu — koniec na dziś."
      ],
      when: "Każda przegrana.",
      success: "Następna gra nie jest gorsza emocjonalnie.",
      mistakes: [
        "Instant queue po porażce.",
        "Scrollowanie statystyk i nakręcanie złości.",
        "Traktowanie przerwy jak kary."
      ]
    }
  },
  // LEGACY (back-compat z wcześniejszą wersją) — zostawione żeby nie tracić zapisanej historii
  cancel_aa_animation: {
    label: "Kancelacja animacji AA (legacy)",
    category: "micro", phase: 1, week: 2, order: 116,
    short: "Po wystrzale pocisku — od razu ruch. (Legacy — zobacz attack_move).",
    details: {
      what: "Animacja AA składa się z wind-up i wind-down. Wind-down nie wpływa na DPS — pocisk już leci. Kanceluj ruchem.",
      how: [
        "Obserwuj moment wystrzału pocisku.",
        "ZARAZ po wystrzale — ruch (klik na ziemi).",
        "Wind-down zostaje skancelowana, możesz od razu rzucić kolejne AA."
      ],
      when: "Każda walka z ranged ADC, każdy kite.",
      success: "Wyższy efektywny DPS + trudniej cię złapać."
    }
  },
  prio_tempo: {
    label: "Prio i tempo (legacy)",
    category: "macro", phase: 3, week: 9, order: 117,
    short: "Legacy combo. Zobacz osobne prio_basic i tempo_basic.",
    details: {
      what: "Legacy zadanie obejmujące prio i tempo razem. Nowe wersje rozdzielone (prio_basic, tempo_basic, enemy_tempo_response, give_up_prio_tempo).",
      how: [
        "Prio = fala przed enemy.",
        "Tempo = przewaga czasu.",
        "Łańcuch: wave → objective → wave → objective."
      ],
      when: "Każda decyzja macro.",
      success: "Wiesz czy masz prio/tempo i jak je wykorzystać."
    }
  },
  remembered_game: {
    label: "Pamiętasz właśnie zagraną grę",
    category: "mindset", phase: 1, week: 1, order: 115,
    short: "Nie potrafisz odtworzyć = jesteś zmęczony. Koniec.",
    details: {
      what: "Test świadomości: po grze potrafisz w 30s opowiedzieć przebieg (lane → mid → walka). Nie potrafisz = autopilot = zmęczony = koniec sesji.",
      how: [
        "Tuż po grze: 'co się stało w tej grze?'.",
        "Sprawdź: czy potrafisz wskazać kluczowy moment (good lub bad)?",
        "Sprawdź: czy pamiętasz 3+ konkretne decyzje?",
        "Brak odpowiedzi = koniec sesji."
      ],
      when: "Po każdej grze.",
      success: "Wszystkie gry są 'pamiętalne' i analyzowalne.",
      mistakes: [
        "Refleksja ogólnikiem.",
        "Granie mimo autopilota.",
        "Mylenie wyniku z jakością decyzji."
      ]
    }
  },

  // ============================================================
  // NOWE GOALE z transkrypcji kursu (MACRO restruktura)
  // ============================================================

  // ---------- MINDSET + DECYZJE META ----------
  chat_off: {
    label: "Czat OFF, tylko pingi",
    category: "mindset", phase: "ongoing", week: null, order: 200,
    short: "All chat OFF. Tylko pingi. Czat = 90% emocjonalnych kosztów.",
    details: {
      what: "Czat w soloQ daje 90% emocjonalnych kosztów i 10% wartości. Pingi przekazują informację bez emocji. To umiejętność do trenowania, nie tylko 'zasada do odhaczenia'.",
      how: [
        "All chat OFF w ustawieniach (raz i zapomnij).",
        "Team chat — mute od razu jeśli ktoś szczeka.",
        "Tylko pingi: missing, danger, on my way, smite up, defend.",
        "Cyferki dla flashy: 1=top, 2=jg, 3=mid, 4=adc, 5=sup.",
        "Mental rule: nie komentujesz teamu nawet w głowie."
      ],
      when: "Każda gra. Bez wyjątków.",
      success: "Po grze nie pamiętasz emocji związanych z teamem — tylko swoje akcje.",
      mistakes: [
        "Odpisywanie nawet gdy masz rację.",
        "Pingowanie z frustracji zamiast informacyjnie.",
        "Czytanie all chata 'bo może coś ciekawego'."
      ]
    }
  },
  no_blame: {
    label: "Brak narzekania na team",
    category: "mindset", phase: "ongoing", week: null, order: 201,
    short: "Nie narzekasz — ani w czacie, ani w głowie. To self-sabotage.",
    details: {
      what: "Narzekanie na team — w czacie LUB w głowie — nie poprawia gry. Zwiększa tilt, obniża świadomość mapy, zmniejsza twoją własną grywalność.",
      how: [
        "Po feedzie sojusznika natychmiast: 'OK, jak ja w tym minusie wygram?'.",
        "Nie pisz '?', 'sojg', 'noobs'. Cisza > każda taka wiadomość.",
        "W głowie: zamiast 'team noob' → 'co teraz robię ja?'.",
        "Musisz coś przekazać → smart ping bind.",
        "Sesja niemożliwa do uratowania mentalnie → koniec na dziś."
      ],
      when: "Każda gra. Trigger: każda 'głupia' akcja sojusznika.",
      success: "Po grze nie potrafisz przypomnieć sobie błędów teamu — tylko swoje.",
      mistakes: [
        "Wpisywanie w czat 'tldr team'.",
        "Wewnętrzny monolog 'on znowu...'.",
        "Pingowanie sojusznika żeby pokazać że źle gra."
      ]
    }
  },
  decision_eval_100x: {
    label: "Ocena decyzji 100× — błąd wynikowy",
    category: "mindset", phase: "ongoing", week: null, order: 202,
    short: "Oceniaj decyzję po INFO w momencie. Dobra może nie wyjść, zła może wyjść.",
    details: {
      what: "Decyzję macro ocenia się statystycznie: gdybyś podjął ją 100× w tych warunkach, czy częściej dawałaby przewagę? Nie po jednorazowym wyniku. Błąd wynikowy = ocena tylko po 'wyszło / nie wyszło'.",
      how: [
        "Po grze NIE pytasz 'czy wyszło?'. Pytasz: 'czy miałem info które wystarczało?'.",
        "Nie widziałeś enemy jg i odpuściłeś trade — to dobra decyzja nawet jak replay pokaże że jg był top.",
        "Decyzja vs wykonanie: zła decyzja może wyjść (enemy popełnił błąd), dobra może nie wyjść (ty miss skilla).",
        "VOD review checklist: (1) jakie info miałem? (2) co MOGŁEM wywnioskować? (3) statystycznie dobra?",
        "Nie usprawiedliwiaj złego procesu dobrym wynikiem."
      ],
      when: "Każda refleksja po grze. Każdy VOD review.",
      success: "Twoja ocena gry nie zmienia się przez wynik — patrzysz tylko na proces.",
      mistakes: [
        "'Wyszło więc dobrze grałem' = błąd wynikowy.",
        "'Nie wyszło więc źle' bez analizy info.",
        "Karanie siebie za pecha (smiteloss przy 100% dmg)."
      ]
    }
  },
  rules_before_exceptions: {
    label: "Reguły zanim wyjątki",
    category: "mindset", phase: "ongoing", week: null, order: 203,
    short: "Najpierw naucz się reguły, POTEM łam ją świadomie. 'To zależy' ≠ chaos.",
    details: {
      what: "Macro w LoLu prawie zawsze ma wyjątki, ale wyjątek ma sens TYLKO jeśli rozumiesz regułę. Łamanie schematu bez znania go = losowość. Najpierw 60-70% poprawności wg schematu, potem dopiero kreatywność.",
      how: [
        "Przed łamaniem reguły: nazwij regułę i powód jej istnienia.",
        "Nazwij konkretny WARUNEK który uzasadnia odstępstwo.",
        "Nie potrafisz nazwać warunku → wracaj do reguły.",
        "Soloq nie usprawiedliwia losowych decyzji.",
        "60-70% poprawności macro samemu = znacznie lepiej niż 'kreatywność' od 5 min."
      ],
      when: "Kiedykolwiek robisz coś niestandardowego (cheese, samotny invade, dziwna rotacja).",
      success: "Potrafisz przed każdą 'kreatywną' akcją nazwać regułę i warunek odstępstwa.",
      mistakes: [
        "'To zależy' jako wymówka do chaosu.",
        "Cheese od 5 min bo 'kreatywność'.",
        "Łamanie schematu który dawał ci przewagę."
      ]
    }
  },

  // ---------- ŚWIADOMOŚĆ MAPY ----------
  deduction_path: {
    label: "Droga eliminacji — czego NIE chcę",
    category: "info", phase: "ongoing", week: null, order: 204,
    short: "Brak wizji = INFORMACJA. Zacznij od planów które na pewno są złe.",
    details: {
      what: "Nie musisz mieć pełnej informacji. Wystarczy zawęzić: wyeliminować miejsca gdzie enemy nie ma, lub plany które na pewno są złe. 'Czego na pewno nie chcę zrobić?' to często łatwiejsze pytanie niż 'co najlepsze?'.",
      how: [
        "Skan smoka pusty → enemy nie zaczął smoka, prawdopodobnie blisko mida.",
        "Tower vision + miniony + 1 ward w jednej części jungli zawęża pozycję jg.",
        "Brak enemy w A + ja w B + mogli być tylko A/B/C → wysoka szansa C.",
        "Decyzja co robić: wykreśl plany ewidentnie złe (Baron bez czyszczenia, siege bez Barona vs wave clear). Z reszty wybieraj.",
        "Soloq: zmniejsza liczbę decyzji w głowie."
      ],
      when: "Każda decyzja gdzie nie masz pełnej info. Mid/late game.",
      success: "Często grasz dobrze BEZ pełnej wizji — bo wiesz gdzie enemy nie ma.",
      mistakes: [
        "Czekanie na pełną info kiedy dedukcja by wystarczyła.",
        "Facecheck zamiast skanu (skan bez warda = info!).",
        "'Nic nie wiem' kiedy wiesz 80% gdzie nie ma."
      ]
    }
  },

  // ---------- WAVE MACRO ----------
  wave_sync_obj: {
    label: "Sync wave z obj spawn",
    category: "wave", phase: 3, week: 10, order: 205,
    short: "Nie hard push za wcześnie. Crashuj wave bliżej spawn objective.",
    details: {
      what: "Push za wcześnie daje enemy czas wyczyścić i być na obj. Crash wave bliżej spawn timera = enemy musi wybierać między wave a objective.",
      how: [
        "Smok respawnuje za 60s → NIE pushuj od razu. Slow podprowadzaj.",
        "Crashuj wave 5-15s przed spawn obj.",
        "Enemy musi wybrać: czyścić wave (traci obj) albo iść na obj (traci wave + platy).",
        "Tak samo z Baronem/Heraldem.",
        "Wyjątek: ogromne tempo — timing wave'a mniej ważny."
      ],
      when: "Każdy objective. Smok, Baron, Herald.",
      whenNot: "Brak prio (enemy wyrówna wave szybciej niż ty obj).",
      success: "Pressure point dokładnie wtedy gdy drugi cel staje się ważny.",
      mistakes: [
        "Hard push 90s przed smokiem — enemy odpcha i przyjdzie czysto.",
        "Brak wave'a przy obj — żaden pressure point.",
        "Push w środek mapy gdy potrzebny crash przy wieży enemy."
      ]
    }
  },
  early_recall_tempo: {
    label: "Wcześniejszy recall = tempo",
    category: "wave", phase: 3, week: 9, order: 206,
    short: "Nie stój przy oczywistym celu który padnie bez ciebie. Recalluj.",
    details: {
      what: "Słabsi gracze stoją za długo przy obj/wieży która i tak padnie. Tracą tempo. Wcześniejszy recall = szybciej na mapie = pierwszy na kolejnym ruchu.",
      how: [
        "Wieża padnie bez ciebie? Recall zamiast 2 dodatkowych AA.",
        "Twój wave i tak się wyczyści (kolega clear'uje)? Recall.",
        "Po wygranej walce: nie zostawaj po wszystkie wardy enemy jg. Wystarczy kluczowe → recall.",
        "Cel: być na mapie zanim enemy wyjdzie z bazy po jego recallu.",
        "Recall 1-2s wcześniej × 8-12 razy w grze = znaczne tempo."
      ],
      when: "Każdy moment 'jeszcze 2 AA' / 'jeszcze 1 ward'.",
      success: "Wracasz na mapę przed enemy. Pierwszy ruch na nowym wave/obj.",
      mistakes: [
        "Bicie wieży po wygranej walce w 10. Brak recallu = enemy wyjdzie pierwszy.",
        "Wardowanie 4 miejsc kiedy 1 wystarcza.",
        "Czekanie żeby zobaczyć padnięcie wieży 'bo zasłużyłem'."
      ]
    }
  },

  // ---------- PRIO I TEMPO ----------
  tempo_to_place: {
    label: "Tempo na KONKRETNE miejsce",
    category: "macro", phase: 3, week: 9, order: 207,
    short: "Tempo to nie 'kto z bazy pierwszy'. To 'kto pierwszy GDZIE się dzieje'.",
    details: {
      what: "Tempo nie zawsze oznacza 'kto wyszedł z bazy pierwszy'. Liczy się też kto pierwszy będzie w danym miejscu. Drużyna może wyjść 5s później, ale mieć bliżej do obj = tam pierwsza.",
      how: [
        "Przy decyzji: 'kto pierwszy będzie na MIEJSCU X' (smok/baron/wave/obj).",
        "Twoja baza bliżej smoka? Możesz mieć tempo nawet z 5s opóźnionym recallem.",
        "Enemy wyszedł 8s przed tobą ale ty masz TP top → na bocie ty pierwszy.",
        "Cross-map: zbieraj miejsca gdzie TY masz tempo, oddawaj te gdzie enemy.",
        "Wave: jeśli oba teamy zdążą na ten sam mid wave, kilka sekund nie ma znaczenia."
      ],
      when: "Każda decyzja typu 'kto pierwszy?'. Cross-map vs match.",
      success: "Wybierasz cele tam gdzie ty pierwszy, niezależnie od kto wyszedł z bazy.",
      mistakes: [
        "Założenie 'enemy wyszedł pierwszy więc wszędzie jest pierwszy'.",
        "Match zamiast cross-map bo nie pomyślałeś o dystansie.",
        "Pomijanie TP/dasha jako modyfikatora tempa."
      ]
    }
  },
  fog_tempo_tracking: {
    label: "Śledzenie w fogu = mierzenie tempa",
    category: "info", phase: 3, week: 9, order: 208,
    short: "8s recall + regen + dojście. Wyobraź zasięg rosnący co sekundę.",
    details: {
      what: "Żeby wykorzystać tempo, musisz wiedzieć ILE sekund okna masz. Bez śledzenia enemy w fogu nie wiesz czy masz 3s, 8s, czy 15s — a od tego zależy co możesz zrobić.",
      how: [
        "Enemy zginął → death timer + dojście z bazy = pełne tempo dla ciebie.",
        "Enemy zaczął recall (zniknął bezpiecznie): 8s recall + ~5s regen + dojście.",
        "Wyobraź mentalnie zasięg rosnący co sekundę od miejsca gdzie zniknął.",
        "Im więcej widzisz graczy = mniej możliwości dla niewidzialnych.",
        "Twoja akcja MUSI zmieścić się w oknie. 3s = ping ward. 15s = invade jg."
      ],
      when: "Każdy ruch wykorzystujący tempo. Roam, invade, deep ward.",
      success: "Twoje przewidywania zgadzają się 70%+. Enemy pojawia się gdzie zakładałeś.",
      mistakes: [
        "Założenie 'enemy cofnął więc nie ma go 30s'.",
        "Brak liczenia regen czasu po recallu.",
        "Próba zrobienia 10s akcji w 3s oknie."
      ]
    }
  },

  // ---------- EARLY → MID ----------
  map_open_layers: {
    label: "Mapa = cebula. T1 → T2 → T3",
    category: "macro", phase: 3, week: 10, order: 209,
    short: "Po T1 nie tunelujemy T2. Zdejmujemy warstwami. Kolejna T1 > T2.",
    details: {
      what: "Mapa otwiera się warstwami. Pierwsza T1 → druga T1 (otwiera mapę MOCNO) → dopiero potem T2. Tunelowanie T2 po jednej T1 marnuje tempo. T2 wartościowa tylko gdy darmowa.",
      how: [
        "Po T1 zapytaj: 'która następna T1 jest realna?'.",
        "Mid T1 stoi? Mid T1 najcenniejsza (najmocniej otwiera mapę).",
        "Nie pushuj T2 dopóki nie ma 2 padniętych T1 z tej strony, chyba że darmowa.",
        "Darmowa T2 = wygrana walka + ludzie martwi + wave gotowy + Baron.",
        "Każde T2 po prio T1 = pełna nagroda. Każde T2 bez T1 = często strata czasu."
      ],
      when: "Po zniszczeniu pierwszej T1. Decyzja 'co dalej?'.",
      success: "Bierzesz drugie T1 → mapa szeroko otwarta → smoki/baron/sajt naturalne.",
      mistakes: [
        "T2 mid bo 'spróbujmy zobaczyć'.",
        "Brak pomysłu na drugą T1 po pierwszej.",
        "Tunelowanie 1 strony mapy zamiast czyszczenia warstwy."
      ]
    }
  },
  t1_priority_choice: {
    label: "Która T1? Mid > Bot > Top",
    category: "macro", phase: 3, week: 10, order: 210,
    short: "Mid T1 najcenniejsza. Top T1 najtrudniejsza. Bot T1 uwalnia ADC.",
    details: {
      what: "Hierarchia wartości pierwszych T1. Mid T1 otwiera mapę najmocniej. Bot T1 uwalnia ADC do rotacji. Top T1 najtrudniejsza i może popsuć top lanera. Top T1 wybierasz GŁÓWNIE gdy enemy mid ma masywny wave clear.",
      how: [
        "Mid T1: priorytet 1. Najmocniej otwiera mapę.",
        "Bot T1: priorytet 2. ADC uwalnia się — rotuje na mida pomóc.",
        "Top T1 zamiast mid: gdy enemy mid ma Azir/Xerath/Ziggs/Veigar (duży wave clear/range).",
        "Top T1 ryzyk: może popsuć dive/freeze/zone twojego topa.",
        "Drugi Herald na top NIE jest dobrym wyborem bez planu."
      ],
      when: "Wybór drugiego objective po pierwszej T1. Cel Heralda.",
      success: "Każda T1 wzięta otwiera mapę pod kolejny play.",
      mistakes: [
        "Top T1 'bo łatwy' kiedy popsuje przewagę topa.",
        "Mid T1 vs Azir bez setupa — niewykonalne, traci tempo.",
        "Drugi Herald w T1 top bez planu = waste."
      ]
    }
  },
  first_t1_response: {
    label: "Po pierwszej T1 — kto gdzie?",
    category: "macro", phase: 3, week: 10, order: 211,
    short: "Bot T1: ADC+supp na mida. Mid T1: mid pushuje + side wybór. Top T1: top zostaje.",
    details: {
      what: "Standard rotacji po padzie pierwszej T1. Bot → ADC+supp na mida. Mid → odpushuj i wybierz side pod kolejną T1. Top → top zostaje (mały range, niemobilny = łatwy cel solo).",
      how: [
        "BOT T1: ADC+supp rotują na mid (lub top jeśli ADC ma duży range typu Caitlyn). Mobilny mid/top obsługuje bot.",
        "MID T1: nie graj automatycznie T2. Pushuj głębiej + wybierz side pod kolejną T1.",
        "TOP T1: top zostaje. Krzaki + freeze setup.",
        "Squishy postać NIE ma zostać sama na rozciągniętym side — wymaga coveru.",
        "Drugi gracz na bot po rotacji ADC: mobilny midlaner/assassin."
      ],
      when: "Pierwsze 30s po padzie pierwszej T1.",
      success: "Mapa gra spójnie pod jeden objective. Nikt squishy nie ginie samotnie.",
      mistakes: [
        "ADC zostaje na bot T1 po jej padzie.",
        "Top T1 padło → top rotuje na mid (traci CS).",
        "Brak obsługi bot wave po rotacji ADC."
      ]
    }
  },
  off_team_line: {
    label: "Off-team = poza linią mapy",
    category: "macro", phase: 3, week: 11, order: 212,
    short: "Wyobraź linię po sojusznikach. Sam wszedłeś za nią = off-team.",
    details: {
      what: "Off-team to bycie niespójnym z resztą mapy. Wyobraź mentalną linię po sojusznikach. Jeśli jesteś znacznie głębiej lub dalej = często off-team. Split push to NIE off-team (ma cel + timing).",
      how: [
        "Przed ruchem: 'gdzie jest reszta drużyny?'.",
        "Reszta reaktywna pod T1, a ty głęboko w enemy jg → off-team.",
        "Reszta pushuje głęboko, a ty robisz camp z tyłu → też off-team.",
        "Wyjątek (split push): tempo + info + cover + plan ucieczki.",
        "Wizja, recall, camp też powinny pasować do 'linii' teamu."
      ],
      when: "Każdy samotny ruch w mid/late game.",
      success: "Twoje ruchy wspierają plan teamu. Nie giniesz w enemy jg jako jeden.",
      mistakes: [
        "Invade jg gdy reszta jest przy bazie.",
        "Wardowanie strony pod którą team NIE gra.",
        "Push mid gdy team gnije w obronie."
      ]
    }
  },
  shift_play: {
    label: "Shift play / trzecia linia w 4-1",
    category: "macro", phase: 3, week: 11, order: 213,
    short: "Trzecią linię IGNORUJ (jak enemy nie ma tempa) lub PRZYGOTUJ shiftem.",
    details: {
      what: "W 4-1 trzecia linia ma 2 opcje: (1) ignorować jeśli enemy nie ma tam tempa, (2) przygotować shiftem (crash wave głęboko zanim zaczniesz 4-1). Trzeciej linii NIE WOLNO ignorować gdy enemy już tam pushuje.",
      how: [
        "Crash wave na trzeciej linii (głęboko) → recall lub przesuń się → wracaj do 4-1.",
        "Wave naprzeciw enemy = enemy czeka 30-40s na kolejny → ma okno.",
        "Enemy już bije T2 trzeciej linii — najpierw odpowiedz, potem 4-1.",
        "Trade 2-za-1 (my inhib, oni T2) często akceptowalny.",
        "Shift to NIE musi być clean — można recallować i wrócić na inną linię."
      ],
      when: "Setup do 4-1 / siege T2.",
      success: "4-1 działa bo enemy nie ma kontry na trzeciej linii.",
      mistakes: [
        "4-1 zaczęte bez przygotowania trzeciej linii.",
        "Ignorowanie trzeciej linii GDY enemy już ma tempo.",
        "Próba grania 1-3-1 bez warunków (Baron, mocne sajdy)."
      ]
    }
  },

  // ---------- MID-LATE + OBJEKTIVY ----------
  winning_state_no_obj: {
    label: "Push + wizja + campy = OBJECTIVE",
    category: "macro", phase: 3, week: 12, order: 214,
    short: "Nie trzeba 'nic brać'. Utrzymywanie zamknięcia mapy = wygrywający stan.",
    details: {
      what: "Nie każdy objective to wieża/smok/Baron. Utrzymywanie enemy w zamknięciu (push + wizja + odbieranie campów) jest samo w sobie objective. Zmusza enemy do facecheck'a własnej jungli, traci campy, gold, XP. Po 2-3 minutach takiego stanu jesteś znacznie silniejszy bez podejmowania ryzykownego dive'a.",
      how: [
        "Push wszystkich linii głęboko + deep wardy w enemy jg + zabieranie campów.",
        "Enemy w bazie/własnej połowie = traci campy + reaktywny.",
        "NIE wymuszaj ryzykownej T2 / smoka. Trzymaj stan.",
        "Czekaj na Barona / soul / błąd enemy.",
        "Po wygranej walce miałbyś już T2/inhib. Po przegranej enemy musi odpushować — wartość przegranej walki mniejsza."
      ],
      when: "Mid game gdy nie ma bezpiecznego dużego obj. Przed Baronem.",
      success: "Enemy traci campy/wave przez kilka minut. Twoja drużyna level/itemowo idzie w górę.",
      mistakes: [
        "Wymuszanie 5v5 pod smoka bo 'coś trzeba robić'.",
        "Ignorowanie campów enemy bo 'nie jestem junglerem'.",
        "Stanie z teamem na midzie zamiast utrzymywać presję."
      ]
    }
  },
  five_factors_checklist: {
    label: "5 czynników — checklist obj",
    category: "macro", phase: 3, week: 10, order: 215,
    short: "Prio + Tempo + Siła + Wygrana walka + Rotacja. Min 2 = ok. 0 = throw.",
    details: {
      what: "Pre-objective checklist. Z czego bierzemy: (1) prio, (2) tempo, (3) siła w walce 5v5, (4) wygrana walka tuż przed obj, (5) rotacja silnego herosa. Min 2 czynniki = bezpieczny. 1 = ryzyko. 0 = throw.",
      how: [
        "Przed każdym obj: policz czynniki na palcach.",
        "Prio: mid+bot pushuje? Mid+top?",
        "Tempo: enemy w bazie / poza mapy / death timer?",
        "Siła: team comp wygrywa 5v5?",
        "Wygrana walka: 2+ enemy down? Niemal darmowy obj.",
        "Rotacja: nafedowany top schodzi pod smoka?"
      ],
      when: "Każdy smok / Herald / Baron / siege T2.",
      whenNot: "Brak min 2 czynników → cross-map zamiast contestowania.",
      success: "Obj zabrany bez strat lub enemy oddał za coś równowartościowego.",
      mistakes: [
        "Obj 'bo spawned' bez czynników.",
        "Drugi Herald dla golda bez planu = 0 czynników.",
        "Smok force gdy enemy ma full team blisko."
      ]
    }
  },
  double_prio_objs: {
    label: "Double prio pod obj",
    category: "macro", phase: 3, week: 10, order: 216,
    short: "Mid+bot prio → smok. Mid+top prio → Baron/Herald. Wave→wizja→wave→obj.",
    details: {
      what: "Najczystszy obj robi się z DWÓMA pressure points jednocześnie. Mid+bot = smok. Mid+top = Baron/Herald. Pojedyncze prio bez drugiego czynnika = niepełna kontrola.",
      how: [
        "Smok: push mid + push bot → enemy mid/bot przywiązani → ty schodzisz na rzekę.",
        "Baron: push mid + push top → enemy mid/top przywiązani.",
        "Z jednym prio dodaj drugi czynnik: tempo / wygrana walka / wizja / mocny matchup.",
        "Schemat 'wave → wizja → wave → obj': gdy tempo małe, pushuj 2× z wizją w środku.",
        "Top prio może 'doprowadzić' do smoka jeśli top schodzi w rotacji."
      ],
      when: "Przygotowanie smoka, Heralda, Barona.",
      success: "Enemy nie może oddać obj bez utraty wave'ów. Obj prawie darmowy.",
      mistakes: [
        "1 prio + brak drugiego czynnika = forced obj.",
        "Push tylko sam (bez sojusznika na drugiej linii).",
        "Pomijanie 'wave→wizja→wave→obj' przy małym tempie."
      ]
    }
  },
  second_herald_choice: {
    label: "Drugi Herald — gdzie?",
    category: "macro", phase: 3, week: 10, order: 217,
    short: "Mobilny mid → BOT tower. Niemobilny → MID. Top NIE.",
    details: {
      what: "Pierwszy Herald = bot move pod platy. Drugi Herald: cel = OTWORZYĆ MAPĘ. Mobilny mid (Akali/Talon/Yasuo) → herald na BOT tower (mid wraca TP). Niemobilny mid → MID tower. TOP tower z heralda = ryzyko.",
      how: [
        "Pierwszy Herald: bot move. Bot pushuje wave → supp+ADC schodzą.",
        "Drugi Herald: cel mapowy.",
        "Mobilny mid = mid wraca przez TP, herald leci na bot = uwolnienie ADC.",
        "Niemobilny mid = nie zostawiaj go bez T1 — herald na MID T1.",
        "Top T1 heraldem = NIE chyba że top ma plan po (rotacja / mocny teamfight).",
        "Drugi Herald w T2 = mała wartość (gold ≠ otwarcie)."
      ],
      when: "Po wzięciu heralda. Wybór wieży do uderzenia.",
      success: "Herald otwiera kolejną T1 zgodnie z planem rotacji.",
      mistakes: [
        "Herald w T2 zamiast T1.",
        "Herald top kiedy popsuje przewagę topa.",
        "Drugi Herald pod platy zamiast pod otwarcie."
      ]
    }
  },
  non_obj_objectives: {
    label: "Nietypowe objective'y",
    category: "macro", phase: 3, week: 12, order: 218,
    short: "Item spike carry / shutdown / walka jako objective (smok = przynęta).",
    details: {
      what: "Objective to nie tylko wieża/smok/Baron. To CEL, pod który świadomie gramy. Czasem celem jest item spike carry. Czasem shutdown na feedowanym enemy. Czasem sama walka (a smok = przynęta).",
      how: [
        "Item spike: carry potrzebuje 500g do IE → grasz pod jego farmę.",
        "Shutdown: enemy 5/0 → drużyna potrzebuje go zatrzymać; obj = jego śmierć.",
        "Walka: silniejsi 5v5 → setup smoka jest TYLKO żeby enemy weszło na rzekę.",
        "Złapanie feedowanego enemy w jg / na recallu.",
        "Cel mały: utrzymanie wizji w enemy jg przez 3 min."
      ],
      when: "Gdy klasyczne obj nie pasują do stanu gry.",
      success: "Wiesz co RZECZYWIŚCIE chcesz osiągnąć, nie automatycznie 'smok'.",
      mistakes: [
        "Smok bo 'spawned' kiedy obj był item spike carry.",
        "Brak rozpoznania feedowanego enemy → on snowballuje.",
        "Setup smoka żeby wziąć smoka, kiedy chciałeś walki."
      ]
    }
  },
  low_elo_mid_grouping: {
    label: "Low elo: nie stać 5 mid",
    category: "macro", phase: 3, week: 12, order: 219,
    short: "'Pieniądze leżą na ulicy'. 5 mid = ARAM. Zbieraj side wave + campy.",
    details: {
      what: "Najczęstszy macro-problem w low elo: 5 osób stoi mid, a side wave + enemy campy giną za darmo. Konsekwentne zbieranie tych zasobów = silny carry mindset.",
      how: [
        "Top/mid/ADC: szukaj zasobów które inni ignorują (side wave po 15 min, campy, wave po złym recallu enemy).",
        "Nie stoisz w 5 na midzie.",
        "Pingi nieskuteczne → po prostu rób swoje.",
        "Mini-rule: 4 sojuszników mid + bot wave stoi → idę po wave.",
        "Jungler/supp: NIE bierz farmy carry, ale dawaj cover."
      ],
      when: "Mid game gdy team grupuje się losowo.",
      success: "Twoje CS/min ↑, level/itemy ↑. Wygrywasz walki silniejszy.",
      mistakes: [
        "Stanie z teamem 'bo trzeba być razem'.",
        "Pingowanie 'splituj' zamiast zbierać samemu.",
        "Recall pomimo dostępnego bot wave."
      ]
    }
  },
  carry_fear_paradox: {
    label: "Strach przed słabą drużyną",
    category: "mindset", phase: 3, week: 12, order: 220,
    short: "Stojąc z słabą drużyną SAM dokładasz losowości. Statystyka, nie anegdota.",
    details: {
      what: "Paradoks: 'mój team jest słaby więc muszę z nimi siedzieć żeby nie zginęli'. Problem: jak z tego powodu sam podejmujesz złą decyzję macro, grasz tak samo źle. Ocena decyzji STATYSTYCZNIE — czy w 100 powtórzeniach częściej daje plus?",
      how: [
        "Po odejściu po side scenariusze: (1) team wygrywa walkę — świetnie, mamy walkę + zasoby, (2) team wymienia równo — ty na plus przez farmę, (3) team lekko traci — wyrównujesz farmą, (4) team ginie za 0 — najgorsze ALE rzadko.",
        "Nie oceniaj 'team zginął więc decyzja była zła' — oceniaj po INFO w momencie.",
        "Strach uzasadniony: bardzo późna gra + długie death timery / przeciwnik blisko nexusa / przygotowany Baron/elder.",
        "Strach przesadzony: wave dopchnięte do enemy, mid wave czysty, krótkie death timery."
      ],
      when: "Każda decyzja 'iść po side czy zostać z teamem'.",
      success: "Nie przegrywasz gier dlatego że BAŁEŚ się odejść po zasoby.",
      mistakes: [
        "'Side był zły' bo team raz padł — błąd wynikowy.",
        "Stanie 5 mid bo strach.",
        "Brak farmienia w grze 'bo team noob'."
      ]
    }
  },
  support_jg_share_carry: {
    label: "Supp/JG udostępnia farmę carry",
    category: "macro", phase: 3, week: 12, order: 221,
    short: "Supp/JG NIE bierze farmy carry. Daje cover żeby carry zebrał.",
    details: {
      what: "Rola supporta i junglera przy zasobach: NIE bierzesz farmy carry. UDOSTĘPNIASZ. Stoisz w pobliżu z wizją, pingiesz danger, robisz pressure point żeby carry mógł bezpiecznie zebrać side wave/camp.",
      how: [
        "ADC na bot side po T1? Supp/JG: wardy w enemy jg, stoisz w przejściu, danger ping.",
        "Carry mid wave głęboko? Supp/JG cover w rzece od strony enemy jg.",
        "Plate split: supp odchodzi od plate gdy ADC bije = większy zysk dla ADC.",
        "Camp przy carry: jeśli carry blisko spike → JG odda camp carry.",
        "NIE: jg/supp bierze raptors/krug carry 'bo blisko'."
      ],
      when: "Mid game od pierwszego T1.",
      success: "Twój carry ma najwyższe CS/lvl w teamie. Bez strachu zbiera zasoby.",
      mistakes: [
        "JG bierze raptors carry który stoi obok.",
        "Supp odpushowuje carry side wave (zamiast cover).",
        "Brak wardów przy carry farmie."
      ]
    }
  },
  kuraki_bush: {
    label: "Krzak przy kurakach",
    category: "macro", phase: 3, week: 11, order: 222,
    short: "Rotacja mid↔side w 4-1. Broniący odzyskuje stąd jungle.",
    details: {
      what: "Mały krzak przy kurakach (raptorach) między midem a side. W siege T2 mid+top (od blue) lub mid+bot (od red) jego kontrola otwiera szybkie przejście. Broniący przegrywający może z tego krzaka odzyskiwać kontrolę nad jungle.",
      how: [
        "Atakujący 4-1: pinki/wardy w krzaku przy kurakach → szybki shift mid↔side.",
        "Bez tego krzaka enemy musi iść dłuższą drogą lub face-check.",
        "Broniący: kontrola tego krzaka = atakujący nie ma prostego shifta + musi face-check.",
        "Wieża obrońców = strefa bezpieczeństwa. AoE/skillshoty łatwiej trafiają w wąskim przejściu.",
        "Ten krzak jest częścią 'strefy między liniami' przy siege T2."
      ],
      when: "Siege T2 mid+top lub mid+bot. Obrona pod własną T2.",
      success: "Atakujący: szybki shift. Broniący: odzyskuje jg krok po kroku.",
      mistakes: [
        "Ignorowanie tego krzaka w 4-1.",
        "Wybicie tylko rzeki bez krzaka.",
        "Pinki w jednym miejscu zamiast pokrycia całego korytarza."
      ]
    }
  },
  inhibitor_double_edge: {
    label: "Inhib = broń obusieczna",
    category: "macro", phase: 3, week: 11, order: 223,
    short: "Inhib + brak konwersji = enemy farmi pełne wave + super miniony. WEŹ → ZRÓB COŚ.",
    details: {
      what: "Inhib daje super miniony, ale jeśli przez długi czas nic z nim nie robisz: super miniony zabijają enemy wave (ty tracisz CS), enemy farmi pełne wave + bonus minion = nadrabia zasoby. Inhib dobry GDY prowadzi do kolejnego kroku.",
      how: [
        "Po wzięciu inhiba MUSISZ: drugi inhib / Baron / kolejna T3 / kończyć grę.",
        "Sam inhib + stanie pod swoim T1 = trade na minus.",
        "Pierwszy inhib = otwarcie do barona.",
        "Z baronem łatwiej dwoma liniami niż samym inhibem.",
        "Nie bierz inhiba 'na zapas' jeśli nie konwertujesz."
      ],
      when: "Late game. Po wzięciu T3.",
      whenNot: "Brak Barona / planów po inhibie / przegrywająca walka.",
      success: "Inhib → drugi obj w 1-2 min, bez oddawania pełnego wave enemy.",
      mistakes: [
        "Inhib + recall + nic.",
        "Wzięcie 3 inhibów bez kończenia.",
        "Ignorowanie że super miniony farmują enemy carry."
      ]
    }
  },
  best_inhibitor: {
    label: "Bot inhib pod Barona, top pod smoka",
    category: "macro", phase: 3, week: 11, order: 224,
    short: "Bot inhib → Baron. Top inhib → smok. Mid inhib słaby strategicznie.",
    details: {
      what: "Statystycznie bot inhib najmocniejszy bo pomaga zrobić Barona (enemy ktoś musi pushować bot po drugiej stronie mapy). Top inhib pomaga smoka. Mid inhib daje prio ale słabiej odciąga enemy od obj na rzece.",
      how: [
        "Gramy pod Barona? Bierz bot inhib najpierw.",
        "Gramy pod soul / dragon stacks? Bierz top inhib.",
        "Mid inhib: dobry do mid prio i wymuszania obrony, ale enemy i tak przechodzi przez mid.",
        "Najlepszy inhib NAPRZECIW następnego objective.",
        "Strategicznie dopasuj — nie bierz dowolnego."
      ],
      when: "Wybór pierwszego inhiba do wzięcia.",
      success: "Inhib forsuje enemy do obrony PRZECIWNIE do obj który zaraz robisz.",
      mistakes: [
        "Mid inhib bo 'centralny'.",
        "Bot inhib przy braku planu na Barona.",
        "Top inhib gdy soul jeszcze daleko."
      ]
    }
  },
  strong_weak_dynamic: {
    label: "Strong/weak side = PŁYNNY stan",
    category: "macro", phase: 3, week: 12, order: 225,
    short: "To NIE draft. Trade strong vs strong. Gracz weak SCHODZI na mid.",
    details: {
      what: "Strong side to NIE stała cecha draftu. To gdzie drużyna AKTUALNIE inwestuje wizję/graczy/cover/junglera. Płynny stan. Można trade'ować strong vs strong. Gracz na weak side ZWYKLE SCHODZI na mid pomóc kontestować mid wave.",
      how: [
        "Strong side teraz = gdzie jest jg + supp + wizja + presja.",
        "Trade strong/strong: enemy gra top side, my gramy bot — wymiana tower za tower.",
        "Weak side player: NIE udawać że masz cover. Nie ginąć. SCHODZIĆ na mid.",
        "Mid wave przy trade strong/strong = decydujący (kto bierze może zrobić 2-za-1).",
        "Strong side może się zmieniać co minutę."
      ],
      when: "Każda decyzja 'po której stronie gram'.",
      success: "Aktywnie rozpoznajesz aktualną stronę strong. Weak side gracz nie marnuje czasu.",
      mistakes: [
        "Założenie 'jestem strong side bo draftowo' — to było 20 min temu.",
        "Stanie na weak side bezczynnie zamiast schodzić na mid.",
        "Matchowanie strong side enemy 1v1 zamiast trade."
      ]
    }
  },
  area_recovery_procedure: {
    label: "Procedura odzyskiwania obszaru",
    category: "macro", phase: 3, week: 12, order: 226,
    short: "Wejść RAZEM → control ward → czerwony trinket → mały krok → wygonić → kolejny krok.",
    details: {
      what: "Gdy mocno przegrywamy, nie odzyskamy mapy na raz. Stopniowy schemat: wejść razem, control ward, czerwony trinket, wyczyścić enemy wardy, przesunąć się o MAŁY krok, wygonić enemy, użyć okna na wave/recall/pick.",
      how: [
        "Krok 1: zbierz drużynę (min 3 osoby). NIE wchodź solo.",
        "Krok 2: control ward w bezpiecznym miejscu strefy.",
        "Krok 3: czerwony trinket → szukasz enemy wardów.",
        "Krok 4: znalezione → niszczysz; nie znalezione → INFO że enemy nie widzi.",
        "Krok 5: mały krok dalej (nie 50% mapy).",
        "Krok 6: obiłeś enemy → recall enemy → masz okno → kolejny mały krok.",
        "BŁĄD: po odzyskaniu obszaru wchodzić od razu po reda/camp.",
        "Cel: snowball małego punktu zaczepienia w większą kontrolę."
      ],
      when: "Gdy mocno przegrywasz, zapchnięci do baz.",
      success: "Z tyłu wracasz do gry przez serię małych kroków.",
      mistakes: [
        "Wchodzenie solo.",
        "Skok 50% mapy na raz.",
        "Brak control warda → enemy łatwo wyrzuca."
      ]
    }
  },

  // ---------- WIZJA JAKO SYSTEM ----------
  vision_two_types_paradox: {
    label: "Dwa rodzaje wizji + paradoks skanu",
    category: "vision", phase: 3, week: 12, order: 227,
    short: "Skan BEZ warda → enemy nie wie że nie widzisz. Często lepsze niż znalezienie.",
    details: {
      what: "Dwa rodzaje wizji: (1) my widzimy + enemy NIE WIE = max wartość, (2) my widzimy + enemy WIE = obniżona wartość. PARADOKS SKANU: skanowanie i NIE znalezienie warda jest często LEPSZE niż znalezienie — enemy nie dostaje informacji o twojej pozycji.",
      how: [
        "Skan przed obj: nic nie ma → enemy nie wie gdzie jesteś = pełna presja z foga.",
        "Skan znajduje warda: enemy przez chwilę WIDZIAŁ gdzie jesteś — straciłeś okno.",
        "Gold za warda ~30g = marginalny. Informacja >> gold.",
        "Wartość wardów spada gdy enemy wie że tam są.",
        "Skanowanie przed plays/objective: kluczowe NAWET bez znalezienia."
      ],
      when: "Przed objective. Przed picksetupem. Przed deep wardem.",
      success: "Robisz objective bez face checku, enemy face check'uje twoją niewiadomą.",
      mistakes: [
        "Smutek że skan 'nic nie znalazł'.",
        "Niszczenie enemy warda gdy lepiej zostawić.",
        "Brak skanu przed obj — gra na ślepo."
      ]
    }
  },
  lane_ward_mid: {
    label: "Lane ward na midzie",
    category: "vision", phase: 3, week: 12, order: 228,
    short: "Mid T1 padło + wave even + enemy szybko czyści → lane ward MEGA cenny.",
    details: {
      what: "Lane ward na midzie cenny w warunkach: mid T1 padło, wave even, enemy mid szybko czyści i znika, gramy reaktywnie. Pokazuje czy enemy schodzi top/bot/recall/camp.",
      how: [
        "Trigger: mid T1 padło i wave na środku → postaw lane ward.",
        "Pokazuje: zejście top/bot, recall, camp, kierunek ruchu.",
        "Na side lane lane wardy sytuacyjne.",
        "Kombinuj z minionami: pushujesz mid głęboko? Miniony dają wizję — lane ward dubluje.",
        "Lane ward głębiej > bliżej — pokazuje więcej rotacji."
      ],
      when: "Mid T1 padło. Wave even. Enemy mid trudny do śledzenia.",
      success: "Wiesz w którą stronę enemy mid schodzi 2-3s wcześniej.",
      mistakes: [
        "Lane ward gdy mid pushujesz głęboko = waste.",
        "Brak lane warda mid przy padłej T1.",
        "Ward za blisko (środek) zamiast głębiej."
      ]
    }
  },
  deeper_vision_principle: {
    label: "Głębsza wizja = szybsza info",
    category: "vision", phase: 3, week: 12, order: 229,
    short: "Przedłużaj linię wizji minion+ward. Ward przy minionach = waste.",
    details: {
      what: "Wizja głębiej daje informację SZYBCIEJ. Miniony już dają wizję na linii — ward postawiony tuż obok nie daje nic nowego. Przedłużaj linię informacji w głąb enemy jg.",
      how: [
        "Pushujesz mid głęboko? Miniony widzą mid. Ward głębiej (raptors enemy, krug enemy).",
        "Ward na rzece przy minionach przy T1 = waste. Ward w enemy jg = przedłużenie.",
        "Im głębiej ward, tym szybsza informacja.",
        "Wyjątek: control ward w strefie którą bronisz (bliżej dla obrony).",
        "Zwykłe wardy GŁĘBIEJ. Pinki BLIŻEJ."
      ],
      when: "Każde stawianie warda.",
      success: "Każdy ward daje info której nie miałeś z minionów/wieży.",
      mistakes: [
        "Ward przy minionach na linii.",
        "Pinki głęboko (łatwo zniszczyć).",
        "Brak myślenia 'co już widzę z minionów'."
      ]
    }
  },

  // ============================================================
  // NOWE GOALE z transkrypcji kursu MICRO (restruktura MICRO)
  // ============================================================

  // ---------- MICRO_BASICS (klik + kamera + animacje) ----------
  chase_no_aa: {
    label: "Nie psuj chase'u własnym AA",
    category: "micro", phase: "ongoing", week: null, order: 230,
    short: "Gonię na max range → AA blokuje, enemy ucieka. Czekaj na CC, dopiero potem AA.",
    details: {
      what: "Autoatak na max range podczas pościgu = lockujesz się w animacji, enemy robi kolejny krok, tracisz dystans. Czasem lepiej dalej biec i poczekać na ważny cooldown niż wbić AA dla 50 dmg.",
      how: [
        "TF goniący z W na 3s do gotowości karty: nie AA, biegnij za nim.",
        "Mając cd na CC spellu: nie lockuj się w AA. Podbiegnij, użyj CC, dopiero potem dmg.",
        "Pytanie przed AA: 'czy ten AA mnie nie wypchnie z range na ważniejszy spell za 2s?'",
        "Wyjątek: AA jest finishing blow LUB resetuje cd (Ezreal P, Vayne Q, Yasuo)."
      ],
      when: "Każdy chase na max range gdy masz CC/dash na cooldownie.",
      whenNot: "AA = killing blow, AA resetuje cd, jesteś już w range na decydujący spell.",
      success: "Łapiesz chase'e które wcześniej uciekały. Twoje CC trafia bo nie wypchnąłeś się z range.",
      mistakes: [
        "AA na max range podczas pościgu 'bo dmg'.",
        "Brak świadomości lockowania animacji przy własnej postaci.",
        "Bicie 'jeszcze 1 AA' i utrata Q/W na range."
      ]
    }
  },
  tower_animation_window: {
    label: "Tower bije miniona = okno na AA",
    category: "micro", phase: "ongoing", week: null, order: 231,
    short: "Wieża lockuje się w animacji strzału. Wejdź w range, daj AA, wyjdź — bez tower hita.",
    details: {
      what: "Wieża też lockuje się w animacji ataku. Gdy zaczyna strzelać w miniona, musi dokończyć ten strzał zanim zaatakuje cię. Krótkie okno na bezkarne AA + wyjście z range.",
      how: [
        "Patrz na animację wieży. Pocisk dopiero wylatuje w miniona → wejdź.",
        "AA na enemy → natychmiast krok do tyłu poza range.",
        "Działa też dla minionów i campów — każdy obiekt z animacją ma to okno.",
        "Im więcej attack speeda masz, tym krótsze twoje lockowanie po AA → tym szerszy reset."
      ],
      when: "Dive setup. Bicie enemy w jego range wieży.",
      whenNot: "Wieża właśnie skończyła strzał (zaraz strzeli ponownie). Multiple ranged minionów (chaos targetingu).",
      success: "Bije enemy bezkarnie pod jego wieżą.",
      mistakes: [
        "Wejście gdy wieża właśnie kończy poprzedni strzał.",
        "Stanie w range wieży bo 'dam jeszcze 1 AA'.",
        "Brak patrzenia na animację wieży."
      ]
    }
  },
  practice_tool_routine: {
    label: "Practice Tool — rozgrzewka kliku",
    category: "micro", phase: "ongoing", week: null, order: 232,
    short: "Postaw 2 wardy. Klik na zmianę. Postać MA stać między nimi.",
    details: {
      what: "Ćwiczenie precyzji+APM. Practice Tool, 2 wardy w niewielkiej odległości, postać między nimi. Klikasz naprzemiennie raz w lewy ward, raz w prawy. Cel: postać MA stać między — nie poruszyć się znacząco. Szybko, równo, blisko siebie.",
      how: [
        "Practice Tool → postaw 2 wardy ~3 dystansów postaci od siebie.",
        "Stań dokładnie między nimi. Klik lewy, klik prawy, klik lewy...",
        "Tempo: szybko, ale postać MA pozostać między wardami.",
        "Wariant pionowy + poziomy.",
        "Rozgrzewka 1-2 min przed sesją grania.",
        "Sprawdzaj sam siebie: jak klikam w to samo dwa razy — przesuwa się za mocno = klikam za daleko."
      ],
      when: "Przed sesją gier. Trening dedykowany.",
      success: "Postać nie odbiega więcej niż 1 jej szerokość. Czujesz rytm kliku.",
      mistakes: [
        "Kliki za dalekie od postaci.",
        "Nieregularne tempo.",
        "Wpadanie w jeden ward (postać przebiega na drugą stronę)."
      ]
    }
  },
  if_then_pre_plan: {
    label: "Plan if-then przed walką",
    category: "micro", phase: "ongoing", week: null, order: 233,
    short: "PRZED walką: 'jeśli enemy R — flashuję'. Reakcja gotowa, nie analizujesz w chaosie.",
    details: {
      what: "Refleks to nie tylko szybka ręka. Większość 'szybkich reakcji' to przygotowane wcześniej scenariusze. Idąc na side / przed teamfightem zaplanuj kilka if-then: 'jeśli X, robię Y'. W momencie X reakcja jest natychmiastowa.",
      how: [
        "Przed objective: 'jeśli ich engage pierwszy → ja peeluję; jeśli ich poke → wymuszam wejście'.",
        "Przed gankiem JG: 'jeśli supp ulci → flashuję; jeśli ulci enemy ADC → cleanse'.",
        "Idąc na side: 'jeśli przeciwnik dashuje na mnie → mój E w bok, R na koniec'.",
        "Mid wave: 'jeśli enemy mid roamuje → push i echo na top'.",
        "Trzymaj 2-3 if-then w głowie, nie 20."
      ],
      when: "Każdy czas między akcjami. Wychodzenie z bazy. Walking do side. Spawn pod obj.",
      success: "Reagujesz wyraźnie szybciej. Twoje 'instynkty' to faktycznie wcześniej zaplanowane decyzje.",
      mistakes: [
        "Brak planu — czysty improv w chaosie.",
        "Zbyt skomplikowane scenariusze (10 if-thenów = paraliż).",
        "Plan zrobiony ale nieprzestrzegany pod stresem."
      ]
    }
  },
  apm_before_fight: {
    label: "Wysokie APM PRZED walką",
    category: "micro", phase: "ongoing", week: null, order: 234,
    short: "Nie wbijesz max tempa 'z marszu'. Klikaj dużo nawet przy spokojnym farmie.",
    details: {
      what: "Rozpęd nie z marszu. Jeśli normalnie grasz wolno, a walka startuje nagle, zajmuje ci kilka sekund żeby rozpędzić rękę i uwagę. W tym czasie tracisz przewagę. Wysokie tempo musi być nawykiem ciągłym, nie tylko 'w walce'.",
      how: [
        "Wychodząc z bazy: szybkie, krótkie kliki — nie jeden klik 'idę na top'.",
        "Farmienie: APM nie spada do 30 między AA. Klikasz pozycjonowanie, kamerę, TAB.",
        "Spacja, F1-F4, TAB między akcjami.",
        "Cel: średni APM 80-120+ przez cały mecz, nie 30 w farmie i 200 w walce.",
        "To NIE znaczy klikać w pustkę. Każdy klik celowy (movement, kamera, TAB, info)."
      ],
      when: "Cała gra. Szczególnie spokojne momenty.",
      success: "Walka startuje, ty już jesteś w wysokim tempie — żadnej rozgrzewki.",
      mistakes: [
        "Wolny farm, próba wskoczenia w 200 APM w walce → chaos.",
        "Klikanie ważnych cooldownów w pustkę 'dla APM' (anty-pattern).",
        "Wysokie APM bez kontroli — postać biega gdzie nie chciałeś."
      ]
    }
  },

  // ---------- SKILLS (skillshoty + input) ----------
  defensive_input_buffer: {
    label: "Defensywne input buffering",
    category: "micro", phase: "ongoing", week: null, order: 235,
    short: "Enemy zaraz wjedzie w mój range → trzymam komendę CC. Wejdzie = odpali NATYCHMIAST.",
    details: {
      what: "Input buffering nie tylko ofensywnie. Defensywnie: spodziewasz się że LeBlanc użyje W na ciebie? Ty klikasz na nią swój targetowany CC ZANIM wejdzie w range. Postać 'wie' co ma zrobić, gdy tylko cel będzie w zasięgu — spell odpala bez delay'u.",
      how: [
        "TF z kartą stuna, ktoś goni z dashem: klikasz w niego W zanim wejdzie. Karta poleci natychmiast po wejściu w range.",
        "UWAGA: uciekasz więc klikasz ZA SIEBIE. Ruch myszki: ucieczka → klik za siebie → ucieczka.",
        "Działa dla każdego targetowanego spella (W TF, R Lux, E Lulu, Q Ashe).",
        "Również dla AA jako baseline: 'taniec' w range AA + trzymanie attack-move.",
        "Nie działa dla skillshotów (Q Blitz nie da się targetnąć)."
      ],
      when: "Ucieczka z targetowanym CC. Engage enemy na ciebie.",
      whenNot: "Bez targetowanego spella. Skillshoty wymagają innego buffera (predict).",
      success: "Enemy zaraz wjeżdża → twój CC odpala w 0.1s po wejściu, on nie zdąży zareagować.",
      mistakes: [
        "Klik za siebie w panice → wbiegasz w enemy.",
        "Trzymanie buffera za długo (enemy wycofał, ty nadal klikasz).",
        "Buffer skillshota (technicznie niemożliwe)."
      ]
    }
  },
  champion_face_direction: {
    label: "Twarz championa zdradza ruch",
    category: "micro", phase: "ongoing", week: null, order: 236,
    short: "Postać odwraca się PRZED animacją skilla. Patrz na twarz, nie na pocisk.",
    details: {
      what: "Championi zawsze obracają się twarzą w stronę gdzie idą / rzucają spell. Twarz zdradza wcześniej niż animacja pocisku. Trening: patrz na twarz przeciwnika, nie czekaj na lot skilla.",
      how: [
        "Enemy klika za siebie na ucieczkę → odwraca się tyłem do ciebie → szansa na slow.",
        "Enemy obrót w twoją stronę + zatrzymanie = zaraz spell. Bądź gotowy unik.",
        "Trening na customie: graj sam vs bot, patrz tylko na twarz, nie na pocisk.",
        "Działa też dla twoich własnych skilli — jeśli widzisz że enemy odwraca twarz w bok od pocisku, zdąży uniknąć."
      ],
      when: "Każdy moment 1v1 / małej skali walki.",
      success: "Unikaš skilli o 0.2s wcześniej niż wcześniej.",
      mistakes: [
        "Patrzenie tylko na pocisk po wylocie.",
        "Brak treningu — same wiedza nie wystarcza, oko musi się nauczyć.",
        "Skupianie się na modelu (płaszcz, ręka) zamiast na twarzy."
      ]
    }
  },
  height_terrain_aim: {
    label: "Wysokość terenu — celuj w stopy",
    category: "micro", phase: "ongoing", week: null, order: 237,
    short: "Jesteś niżej → celuj w stopy enemy. Wyżej → w górę. Hitbox = podstawa, nie model.",
    details: {
      what: "LoL ma 3 wymiary (x, y, h). Rzeka niżej, jungla wyżej, baza najwyżej. Skillshoty rzucane z różnicy wysokości wyglądają jakby trafiały model, ale trafiają teren. Hitbox jest powiązany z miejscem gdzie champion 'stoi', nie z każdym detalem modelu.",
      how: [
        "Jesteś niżej (rzeka) niż enemy (jungla) → celuj lekko niżej, w stopy.",
        "Jesteś wyżej → celuj lekko wyżej (w okolice głowy/górnej części).",
        "Tej samej wysokości → centralnie względem podstawy.",
        "Nie sugeruj się wystającym ramieniem, płaszczem (Yasuo), wielkim modelem (Cho'Gath bez stacków).",
        "Skillshoty okrągłe (E Lux) — środek koła w miejscu gdzie champion 'stoi'.",
        "Liniowe (Q Blitz) — celuj w środek hitboxu (podstawa)."
      ],
      when: "Każdy skillshot przez różnicę wysokości terenu.",
      success: "Twoje skilshoty 'wreszcie zaczęły trafiać' w sytuacjach gdzie wcześniej mijały.",
      mistakes: [
        "Celowanie w model (najwyższy punkt championa).",
        "Niezauważenie różnicy wysokości (rzeka vs jungla).",
        "Sugerowanie się skinem (Pulsefire Ezreal vs default)."
      ]
    }
  },
  weaker_cc_first: {
    label: "Słabsze CC przed mocniejszym",
    category: "micro", phase: "ongoing", week: null, order: 238,
    short: "Slow → stun. Lux E → Q. Elise AA z red → cocoon. Predykcje SĄ NA KOŃCU.",
    details: {
      what: "Trudne skillshoty trafiają o wiele łatwiej po przygotowaniu słabszym CC. Slow → cel ma mniej movementu → łatwiej trafić stun. Predykcje gdzie enemy pójdzie są ostatnim wyborem (najsłabsza metoda).",
      how: [
        "Lux: E (AoE slow + slight knock) → Q (stun line).",
        "Elise: red buff aa (slow) → cocoon stun.",
        "Maokai: poczekaj aż sojusznik root'uje, dopiero ty W.",
        "Sojusznik z targetowanym CC (Annie tibbers, Morgana W slow): ty rzucasz swój skillshot PO ich CC.",
        "Hierarchia metod: obserwacja twarzy > lockowanie animacji > kąt + teren > skrócenie dystansu > słabsze CC > PREDYKCJA (ostatnia opcja)."
      ],
      when: "Każdy combo z trudnym skillshotem do trafienia.",
      success: "Twoje 'trudne' skille trafiają częściej. Mniej polegasz na predykcji.",
      mistakes: [
        "Rzucanie Q Lux na predykcję (max range, no setup).",
        "Komboowanie 2 hard CC na raz (nakładają się).",
        "Brak czekania na sojuszniczy CC przed swoim skillshotem."
      ]
    }
  },
  terrain_skillshot: {
    label: "Ściany i chokepointy do skilli",
    category: "micro", phase: "ongoing", week: null, order: 239,
    short: "Chase'uj zanim rzucisz. Wymuś enemy w korytarz / pod ścianę.",
    details: {
      what: "Dobry skillshot często zaczyna się od ustawienia enemy w gorszej pozycji, nie od samego celowania. Ściany, wąskie korytarze, wieże, jungle entries — wszystko to ogranicza enemy movement. Czasem lepiej nie rzucić i pochase'ować niż rzucić w otwartej przestrzeni.",
      how: [
        "Enemy ucieka w otwarte pole → AA + chase, czekaj aż wbije się w narożnik.",
        "Walka mid: spychanie enemy ku wieży/jungle entry = on dodge'uje ograniczone strony.",
        "Krzaki jako alternatywa: enemy w krzaku → ty wchodzisz z kątem od zewnątrz = on nie widzi pocisku.",
        "Kąt rzutu: 90° z boku zamiast prosto = enemy 2 z 3 stron unik, nie 3 z 3.",
        "Jungle: ściany, korytarze przy Baronie/smoku — łatwiejsze trafienia."
      ],
      when: "Trudne skillshoty (Q Blitz, Q Morgana). Combo wymagające trafienia.",
      success: "Twoje hooki/binds trafiają o wiele częściej dzięki setupowi pozycji.",
      mistakes: [
        "Q Blitz na max range w otwartym polu.",
        "Brak myślenia o terenie — rzucanie 'bo widzę enemy'.",
        "Korytarz w drugą stronę (ty pod ścianą, nie enemy)."
      ]
    }
  },
  tenacity_aware: {
    label: "Tenacity skraca CC",
    category: "micro", phase: "ongoing", week: null, order: 240,
    short: "Mercury/Cleanse zmienia plan chain CC. Enemy z tenacity = inne timingi.",
    details: {
      what: "Tenacity (Mercury Treads, Steraks, Sterak's CDR, Cleanse) skraca część CC. Twoje chain CC musi to uwzględnić — krótsze CC = mniej okna między nimi. Cleanse usuwa większość CC od razu.",
      how: [
        "Przed wszelkim chain CC: sprawdź buty enemy (Mercury = -30% tenacity).",
        "Cleanse na ADC: nie używaj Exhaust pod cleanse — zmarnuje się.",
        "Sterak Gage proc: krótkie tenacity buff + shield → twój follow-up CC może nie wejść.",
        "Tenacity skraca: stuns, slows, taunts, fears, silences. NIE skraca: airborne (knockup), suppression.",
        "Konkretne kontrowanie: airborne (Alistar W, Janna R) i suppression (Malzahar R, Warwick R) ignorują tenacity."
      ],
      when: "Każdy chain CC enemy z tenacity items / cleanse.",
      success: "Twoje combos trafiają nawet vs Mercury / cleanse setup.",
      mistakes: [
        "Chain CC vs Mercury — drugi CC nie chwyta bo pierwszy się skrócił.",
        "Wypalanie Exhaust pod cleanse ADC.",
        "Brak sprawdzenia butów enemy."
      ]
    }
  },

  // ---------- POSITIONING ----------
  not_on_enemy_line: {
    label: "Nie stój na linii wejścia enemy",
    category: "micro", phase: "ongoing", week: null, order: 241,
    short: "Stoisz na linii prostej do bazy → enemy podchodzi bez dasha. Przesuń się w bok.",
    details: {
      what: "Słabszy gracz na linii często stoi w prostej linii do swojej bazy. Enemy wchodzi po skosie, skraca dystans, ty uciekasz w linii prostej = on dogoni. Rozwiązanie: stań bardziej cofnięty i PRZESUNIĘTY w bok.",
      how: [
        "Top przegrywający: nie stój pośrodku linii. Stań bliżej rzeki / bliżej krzaków po jednej stronie.",
        "Twoja ucieczka po skosie tworzy enemy dłuższy dystans niż linia prosta.",
        "Bot trójkąt: ADC pośrodku jest do złapania — przesunięty bardziej do supporta jest bezpieczny.",
        "Mid: nie stój prosto na linii enemy mida. Trochę w bok = on traci tempo.",
        "Świadom dasha enemy: liczy się jego MAX zasięg (Akali dash + flash)."
      ],
      when: "Przegrywająca linia. Strach przed gankiem.",
      success: "Enemy musi użyć dasha/summonera żeby na ciebie wejść.",
      mistakes: [
        "Stanie po prostu z tyłu (linia prosta = łatwe wejście).",
        "Bliżej środka mapy 'żeby widzieć więcej'.",
        "Brak liczenia dystansu po skosie."
      ]
    }
  },
  zone_thinking: {
    label: "Myślenie strefami — szachownica",
    category: "micro", phase: "ongoing", week: null, order: 242,
    short: "Wyobraź pola wokół wave'a. Wyeliminuj złe. Z reszty wybieraj świadomie.",
    details: {
      what: "Optymalna pozycja na linii to nie jeden punkt. To kilka możliwych obszarów. Wyobraź sobie szachownicę wokół wave'a, wyeliminuj pola złe. Z pozostałych wybierz świadomie zależnie od celu (agresja, defensywa, push, trade).",
      how: [
        "Złe pola: za daleko od wave (nie wpłyniesz na miniony), zbyt blisko enemy wieży, za linią enemy minionów, w środku ich wave'a, strona enemy jg.",
        "Pole gdzie enemy może trafić ciebie i wave 1 AoE = często złe.",
        "Po eliminacji: zostaje 2-4 sensowne strefy.",
        "Wybierz strefę zgodnie z planem: agresja → bliżej enemy; defensywa → bliżej siebie; pod gank ze strony jg → strefa przeciwna.",
        "Trening: zatrzymaj się na 1s przed każdym ruchem 'gdzie chcę stać i dlaczego?'."
      ],
      when: "Każda pozycja na linii. Każdy reset pozycji po trade.",
      success: "Twoja pozycja zawsze ma uzasadnienie. Mniej 'klikam losowo'.",
      mistakes: [
        "Stanie 'gdzieś przy wave' bez planu.",
        "Optymalna pozycja jeden punkt — sztywne myślenie.",
        "Wybór strefy bez świadomości celu."
      ]
    }
  },
  melee_spacing: {
    label: "Melee też mają spacing",
    category: "micro", phase: "ongoing", week: null, order: 243,
    short: "Renekton vs Darius. Garen vs Sett. Różne mele ranges = przewaga AA.",
    details: {
      what: "Spacing to nie tylko ranged vs ranged. Melee championi mają różne AA i spell ranges. Sett ma dłuższy AA niż Garen. Renekton ma dłuższe Q niż Darius. Nadrabianie krótszego range'u: cooldowny, animation lock enemy, movement speed, timing wejścia.",
      how: [
        "Mele matchup: znaj range AA obu postaci (Sett 165, Garen 175, Darius 175, Mordekaiser 175...).",
        "Krótszy range: czekaj na animation lock enemy (AA na minion) → wejdź pod jego AA.",
        "Dłuższy range: trzymaj pozycję outside ich AA, oddawaj AA gdy oni last hituja.",
        "Spell ranges też istotne: Q Renektona 225 vs Q Dariusa 130. Renekton może AA + Q bez Darius response.",
        "Movement speed (Garen passive) zmienia spacing — ranged advantage znika gdy enemy biegnie szybciej."
      ],
      when: "Każdy mele matchup. Każda walka jg vs jg w fogu.",
      success: "Trade'ujesz tylko gdy ty masz przewagę range/cooldown — nigdy w niekorzystny moment.",
      mistakes: [
        "Założenie 'oba mele = ten sam range'.",
        "Wbijanie AA na max range bez kontroli animacji enemy.",
        "Pomijanie MS jako modyfikatora (Garen passive, Boots of Swiftness)."
      ]
    }
  },
  ms_attack_speed_spacing: {
    label: "MS i AS jako modyfikatory spacingu",
    category: "micro", phase: "ongoing", week: null, order: 244,
    short: "Większy AS = krótszy lock. Większy MS = łatwiej wejść/wyjść. Range to nie wszystko.",
    details: {
      what: "Spacing zależy nie tylko od czystego range. Movement speed ułatwia wejście/wyjście. Attack speed skraca lockowanie po AA — krótsze okno na unik enemy. Te statystyki mogą całkowicie zniwelować przewagę range.",
      how: [
        "Większy MS niż enemy (Boots 4, Swiftness, Phase Rush): wchodzisz w range, AA, wychodzisz — on nie dogoni.",
        "Większy AS: AA + szybko klik movement = mini-skok (kiting Vayne / Caitlyn).",
        "Mniejszy AS twojej postaci = dłuższe lockowanie = enemy ma więcej okna na wejście pod twoje AA.",
        "Sprawdzaj itemy enemy: pierwsze Berserker Greaves (+25% AS) zmienia kiting dynamics na bocie.",
        "Steraks Gage proc, Yasuo R, runy (Lethal Tempo) — wszystko zmienia spacing dynamicznie."
      ],
      when: "Każdy moment spacingu — laning, jungle skirmish, teamfight.",
      success: "Wykorzystujesz przewagę MS/AS świadomie. Nie tylko 'mam range'.",
      mistakes: [
        "Zakładanie że range = jedyna metryka spacingu.",
        "Brak update'a kalkulacji po enemy upgrade (Berserker → IE → krytyczny AS).",
        "Spacing bez świadomości lockowania własnej animacji."
      ]
    }
  },

  // ---------- LANING_MICRO (early) ----------
  aa_distance_timing: {
    label: "Dystans od miniona = inny timing AA",
    category: "early", phase: 2, week: 5, order: 245,
    short: "Pocisk leci — bliżej = klikasz później. Max range = AA wcześniej.",
    details: {
      what: "Ranged AA ma travel time pocisku. Stoisz blisko miniona — pocisk leci 0.1s. Stoisz na max range — leci 0.4s. Ten sam champion ma RÓŻNY timing last hitu zależnie od dystansu.",
      how: [
        "Bliżej miniona: klikasz później (gdy minion ma niższy HP).",
        "Max range: klikasz wcześniej (anticipating travel time).",
        "Caitlyn na 650 range vs Ezreal AA: Caitlyn klika na minion 100 HP, Ezreal na 50.",
        "Trening: zwróć uwagę przy każdym last hicie 'klikam za wcześnie czy za późno?'.",
        "Stań bliżej minionów jeśli możesz — łatwiej last hitować + wygrywające scenariusze agresji."
      ],
      when: "Każdy last hit na ranged championie.",
      success: "Zera missed CS przez 'travel time' — pocisk dolatuje gdy minion umiera.",
      mistakes: [
        "Stały timing AA niezależnie od dystansu.",
        "Klikanie na max range jak na close range = miss.",
        "Stanie na max range bez powodu (mniejszy CS)."
      ]
    }
  },
  minion_aggro_swap: {
    label: "Manipulacja aggro minionów",
    category: "early", phase: 2, week: 5, order: 246,
    short: "Przyjmij 1 AA enemy → twoje miniony przerzucają cel na niego. Opóźnia śmierć twoich.",
    details: {
      what: "Twoje miniony biją enemy miniony 1v1. Gdy enemy gracz cię uderzy AA → twoje miniony PRZERZUCAJĄ cel z miniona na enemy. To opóźnia śmierć twoich minionów = masz więcej okna na last hit + można freezować.",
      how: [
        "Stań blisko enemy. On AA-uje cię. Twoje 3 caster miniony agro na niego = przestają bić jego miniony.",
        "Trick przy freeze: zaakceptuj 1 AA enemy żeby twoja fala zwolniła. Wave się zatrzymuje, freeze osiągnięty.",
        "UWAGA: kosztuje HP. Wykonuj gdy masz HP do oddania.",
        "Działa też defensywnie: enemy AA-uje cię pod twoją wieżą → twoje miniony aggro na niego → opóźnia jego siege.",
        "Cancel: ucieczka z range twoich minionów → cel wraca na miniona."
      ],
      when: "Setup freeze. Bicie się z ranged enemy. Pod swoją wieżą gdy enemy puchuje.",
      whenNot: "Low HP, jungler enemy nieaktywny (nie wiesz gdzie), wave dopchnięty do enemy.",
      success: "Kontrolujesz tempo wave'a bez używania spelli.",
      mistakes: [
        "Przyjmowanie AA enemy bez planu (po prostu trade na minus).",
        "Aggro swap pod własną wieżą gdy enemy nie pushuje (waste HP).",
        "Brak świadomości że jungler enemy widzi twój HP."
      ]
    }
  },
  setup_minion_hp: {
    label: "Setup HP minionów po kolei",
    category: "early", phase: 2, week: 5, order: 247,
    short: "Wave 3v3. Wszystkie biją równo → wszystkie na low w tym samym czasie. Setup HP rozdzielnie.",
    details: {
      what: "Domyślnie miniony biją 1v1 i tracą HP w tym samym tempie. Wszystkie kończą na low w podobnym czasie → nie zdążysz dobić 3 AA. Setup: dołóż 1 AA w konkretnego miniona ŻEBY HP rozjechało się — wtedy padają po kolei.",
      how: [
        "Patrz na 3 caster miniony — wszystkie na 80 HP? Daj AA w jeden (sprowadź do 40 HP).",
        "Cel: HP rozjechane (40, 60, 80) → padają po kolei → dobijasz każdego AA.",
        "Trening na Practice Tool: stań przy fali, próbuj nie używać spelli, tylko AA.",
        "Pułapka: za duże AA w jednego (sprowadź na ~ 10 HP) → wave się zatrzyma, last hit bez wpływu.",
        "Push wave: pomijasz setup, AA dużą część fali bez różnicowania."
      ],
      when: "Freeze setup. Sustain matchup. Każda lane gdzie liczy się każdy CS.",
      whenNot: "Hard push (przyspieszanie wave'a). Pod własną wieżą (wieża decyduje agro).",
      success: "Trzykrotnie last hit 3 castery pod rząd bez spella.",
      mistakes: [
        "Brak setupu — wszystkie miniony na 1 HP w jednej chwili.",
        "Za mocny setup (miniony zatrzymują wave'a).",
        "Setup pod wieżą (wieża zniweczy plan)."
      ]
    }
  },
  tower_aggro_target: {
    label: "Tower wybiera cel po podstawie",
    category: "early", phase: 2, week: 7, order: 248,
    short: "Wieża target'uje od dolnej części modelu (tarcza). Najbliższy ten punkt = atak.",
    details: {
      what: "Aggro wieży nie liczy się od środka championa ani od stóp dokładnie. Liczy się od dolnej części modelu, mniej więcej od tarczy/podstawy wieży. Znajomość tego pomaga przewidzieć który minion dostanie kolejny strzał.",
      how: [
        "Wieża strzela w miniona najbliższego jej PODSTAWY (nie najbliższego ogólnie).",
        "Trzy ranged miniony rozproszone → najbliższy podstawy → tam pójdzie strzał.",
        "Twoje pozycjonowanie pod wieżą: stanie po jednej stronie miniona zmienia czy on dostanie tower hit czy ty.",
        "Pod własną wieżą: wepchnij miniony enemy najbliżej tarczy = giną szybciej.",
        "Trenowanie: spójrz na minion line, znajdź minion najbliższy podstawie — to ten dostanie hit."
      ],
      when: "Każdy CS pod wieżą. Defensywa pod swoją T1.",
      success: "Przewidujesz każdy tower hit. Last hity pod wieżą bez missów.",
      mistakes: [
        "Założenie 'najbliższy ogólnie' = błędne.",
        "Brak świadomości pozycji miniona vs podstawa.",
        "Stanie tak że tower agro skacze na ciebie."
      ]
    }
  },
  check_items_on_exit: {
    label: "Sprawdź itemy enemy gdy wychodzi z fog",
    category: "early", phase: 2, week: 8, order: 249,
    short: "Enemy znika → wraca. ZAWSZE patrz TAB: kupił spike, control ward, pinka?",
    details: {
      what: "Enemy wychodzi z fog of war po recallu / długim ruchu = mógł kupić item, mógł postawić pinka, mógł postawić warda. Sprawdzanie itemów ZAWSZE gdy wychodzi z fog = informacja przed walką.",
      how: [
        "Trigger: enemy wraca na linię po recallu. TAB → patrz na itemy.",
        "Nowy spike (np. IE, Eclipse): change in damage profile, change in all-in calc.",
        "Nowy item ratujący (Zhonya / Banshee / GA): assassin może przegrać wejście.",
        "Trinket count zmniejszony: postawił warda gdzieś — gdzie?",
        "Control ward count zmniejszony: postawił pinka — w pobliżu wave/krzaku/jg.",
        "Nawet bez nowego itemu — informacja zerowa jest też informacją (nie kupił = mało golda)."
      ],
      when: "Każdy enemy wracający z fog. Każdy reset.",
      success: "Wiesz dokładnie co enemy ma. Twoje all-in / trade'y bazują na realnym statzie.",
      mistakes: [
        "Sprawdzanie TAB tylko 'czasem'.",
        "Pomijanie kontroli trinket/pinkcount.",
        "Reakcja na enemy bez świadomości jego itemów."
      ]
    }
  },
  doran_second_wind_play: {
    label: "Doran Shield + Second Wind",
    category: "early", phase: 2, week: 8, order: 250,
    short: "Pot odpalaj NAJPÓŹNIEJ. Świadomie przyjmij dmg który się odleczy.",
    details: {
      what: "Doran Shield i Second Wind leczą zależnie od missing HP. Twoje pot warto odpalać jak najpóźniej. Świadomie możesz przyjąć mały dmg (np. AA) który i tak się odleczy, żeby trade'ować lub manipulować wave aggro.",
      how: [
        "Pot pij gdy HP < 50% (nie przy 90%). Im niższe HP, tym większy efekt.",
        "Trade trick: przyjmij 1 AA → twoje miniony agro na enemy → ty wracasz HP z Second Wind.",
        "Vs enemy z Doran Shield + SW: krótkie pojedyncze trade'y są SŁABE (ciągle odświeżasz mu heal). Idź na DŁUGIE wymiany (jeden burst).",
        "Wave manipulation: przyjmij dmg żeby miniony szły do ciebie.",
        "Nie marnuj pota przy first wave (90% HP)."
      ],
      when: "Top lane z Doran Shield. Lane vs Doran Shield enemy.",
      success: "Outsustainujesz przeciwnika w długich wymianach.",
      mistakes: [
        "Pot na 90% HP (waste).",
        "Krótkie trade'y vs SW enemy (odświeżasz mu heal).",
        "Strach przed małym dmg który i tak odleczy."
      ]
    }
  },
  bone_plating_break: {
    label: "Bone Plating: zbij przed all-inem",
    category: "early", phase: 2, week: 8, order: 251,
    short: "Enemy ma BP? Daj 3 słabe AA → all-in. Twoje BP gotowe? Inicjuj.",
    details: {
      what: "Bone Plating absorbuje pierwsze 3 hity od championa (skill lub AA). Przed all-inem warto zbić 3 'tanie' hity → potem cały combo dmg wchodzi pełną siłą. Działa też w drugą stronę — gdy ty masz BP gotowe, inicjuj wymianę.",
      how: [
        "Vs enemy z BP: 3 AA w kanonów odległości = absorbed, ale BP idzie na cd 45s.",
        "Lub: 3 słabe skille (Q Renektona, AA, AA) → następny burst combo bez absorpcji.",
        "Twoje BP gotowe (sprawdź ikonę): inicjuj wymianę — pierwsze 3 hity enemy absorbed.",
        "Twoje BP na cd: unikaj trade'u przez 45s, freeze defensywnie.",
        "Cooldown BP długi → wymiana z odzyskanym BP rzadko się zdarza w short trade."
      ],
      when: "Top lane / mid vs Bone Plating runa. Each trade decision.",
      success: "Twoje all-iny trafiają w pełnym dmg. Enemy all-iny absorbed przez twoje BP.",
      mistakes: [
        "All-in vs aktywne BP — twój burst absorbed.",
        "Brak świadomości cooldownu BP (sprawdzaj ikonę).",
        "Trade vs własne BP na cd."
      ]
    }
  },
  phase_rush_save: {
    label: "Phase Rush trzymaj pod ucieczkę",
    category: "early", phase: 2, week: 8, order: 252,
    short: "Boisz się ganku? Nie pal Phase Rush na trade. Trzymaj jako MS dla ucieczki.",
    details: {
      what: "Phase Rush daje MS po 3 hitach. Standardowe użycie: pod trade. ALE jeśli boisz się ganka albo masz brak summonerów, lepiej zrobić słabszy trade i NIE odpalić PR — trzymaj go jako narzędzie ucieczki.",
      how: [
        "Trigger: jg enemy może gankować w ciągu 30s. NIE odpalaj PR pod trade.",
        "Krótki trade (1-2 AA, 1 spell) zamiast pełnego combo które odpaliłoby PR.",
        "Jak gank przyjdzie → wbij 3 hity szybko (np. AA na ich tank + spell) → PR proc → MS do ucieczki.",
        "PR po użyciu ma długi CD (15-30s) — nie traci się go lekko.",
        "Świadomość timera: kupiłeś PR 10 min, gank niemożliwy → użyj normalnie."
      ],
      when: "PR build (Hexlex Talisman keystone). Strach przed gankiem.",
      success: "Uciekasz z ganku który normalnie kończyłby się śmiercią.",
      mistakes: [
        "Default trade odpalający PR mimo ryzyka ganka.",
        "Trzymanie PR za długo (niewykorzystany potencjał).",
        "Brak sprawdzania pozycji enemy jg."
      ]
    }
  },

  // ---------- MAX (mini-maksymalizacje) ----------
  proximity_next_action: {
    label: "Proximity — bliżej następnej akcji",
    category: "max", phase: "ongoing", week: null, order: 253,
    short: "'Po skończeniu chcę być bliżej następnego celu.' Wybór ostatniego CS/clear ku ruchowi.",
    details: {
      what: "Czas to zasób. Po skończeniu jednej akcji powinieneś być MOŻLIWIE BLISKO następnej rzeczy którą planujesz zrobić. Bicie ostatniego miniona, ostatni camp clear, recall — pozycjonuj się ku następnemu celowi.",
      how: [
        "Mid pushujesz, planujesz roam na top → ostatnie miniony bij od strony topa (bliżej wyjścia).",
        "JG kończy red buff, planuje gank top → kite'uj reda w stronę topa (Cię tam bliżej).",
        "Recall na fontannie: stań na krawędzi (bliżej wyjścia) zamiast środka.",
        "Po wygranej walce idziesz na obj → ostatnie AA nie wszystkie wardy enemy jg, tylko po drodze.",
        "Plate split: jeśli plate i tak padnie od minionów → odejdź wcześniej (zysk tempa)."
      ],
      when: "Każda kończąca się akcja. Każdy recall. Każde clear.",
      success: "Suma sekund oszczędzonych w ciągu gry = 1 dodatkowy roam / objective.",
      mistakes: [
        "Stanie pośrodku fontanny.",
        "Bicie ostatniego miniona od strony przeciwnej do planu.",
        "Kite camp w stronę przeciwną do ruchu."
      ]
    }
  },
  camp_dot_leave: {
    label: "Camp na ostatni tick DoT-a",
    category: "max", phase: 2, week: 7, order: 254,
    short: "JG: zostaw camp na DoT, odejdź wcześniej. Kite'uj w kierunku ruchu.",
    details: {
      what: "Niektóre campy można zostawić na ostatni tick (DoT, ignite, smite efekty) i odejść zanim camp umrze. To daje sekundy do następnej akcji. Również: kite'uj campa w stronę gdzie idziesz (camp ginie po drodze).",
      how: [
        "Czerwony buff: zostaw na ~50 HP (DoT od smite albo ignite kończy).",
        "Krug: po smicie zostaw mały DoT, odejdź — krug doczyści sam.",
        "Kite camp: gdy idziesz na top z red buff, kite'uj reda w stronę topa = camp bliżej topa gdy umiera.",
        "Smite zostawiaj na campa który zaoszczędza CI najwięcej HP / czasu.",
        "Nie próbuj na campie który respawnuje szybko (sojusznik za chwilę go zrobi)."
      ],
      when: "JG path z campem do następnej akcji. Roam z buffem.",
      success: "Twoje pathy są o 5-15s krótsze niż enemy JG → więcej ganków/objektywów.",
      mistakes: [
        "Stanie przy DoTującym campie do końca.",
        "Smite na pełny camp gdy lepszy zostać na trudniejszego.",
        "Kite camp w przeciwnym kierunku do następnej akcji."
      ]
    }
  },
  cd_around_play: {
    label: "Graj dookoła cooldownów enemy",
    category: "max", phase: "ongoing", week: null, order: 255,
    short: "Spell użyty = okno. Przesuń spacing, zacznij trade, agresuj przed return cd.",
    details: {
      what: "Spell enemy to 'naładowana broń'. Gdy użyje → musi przeładować. W tym czasie jego efektywny zasięg/zagrożenie spada. To okno na trade / agresję / push / objective.",
      how: [
        "Yasuo użył Q3 (knock) → 5-10s okna na trade bez bania się knockup.",
        "Annie użyła R (Tibbers) → 90-120s okna na walki z normalną mocą Annie.",
        "Lee Sin użył ulta na cię → 90s bez R, możesz wracać na obj bez bania się 1-shotu.",
        "Wiedza: znaj cooldowny kluczowych spelli. Lvl 11 R Annie ~80s; lvl 11 Q Riven ~7s; lvl 11 R Karthus ~110s.",
        "Sprawdzaj kontekst: ability haste (Ionian boots, Cosmic Insight) skraca."
      ],
      when: "Każdy moment po użyciu kluczowego spella enemy.",
      success: "Liczysz okna i wchodzisz dokładnie gdy enemy bez broni.",
      mistakes: [
        "Brak świadomości że Annie ulci → walka jak gdyby miała.",
        "Założenie 'wszystkie spelle wracają w 10s'.",
        "Pomijanie ability haste enemy."
      ]
    }
  },
  cannon_wave_value: {
    label: "Cannon wave wart więcej",
    category: "max", phase: 2, week: 6, order: 256,
    short: "Gank na cannona — zonowanie enemy ma wartość nawet bez killa. Sam cannon = dużo golda.",
    details: {
      what: "Cannon minion daje ~60 gold (vs 20 melee). Cannon wave = 100+ gold dla strony która zbiera. Cannon też ma więcej HP więc pomaga przy dive (tower aggro). Gank zonujący enemy OD cannona ma wartość nawet bez killa.",
      how: [
        "Cannon timer (sezon 15): wave 4, 7, 10, 13...",
        "JG gank pod cannon wave: jeśli enemy ucieka, traci cannon = ~60g + XP.",
        "Cannon dla dive setup: jest tankiem aggro wieży, possibly survival kluczowy.",
        "Twój recall: nie recalluj gdy cannon wchodzi (oddasz 60g). Lepiej zostać.",
        "Push pod tower z cannonem: cannon zbije plate sam bez twojego dmg."
      ],
      when: "Każda 3-cia (sezon 14) / 3-cia od 4-tej (sezon 15) wave.",
      success: "Twoje recall'e i ganki sync'owane z cannon wave.",
      mistakes: [
        "Recall na cannon wave (oddaj 60g).",
        "Push bez cannona pod wieżą (ty bijesz, miniony ginie szybko).",
        "Brak liczenia wave'ów."
      ]
    }
  },
  tower_tank_max_hp: {
    label: "Dive: weź jeszcze 1 hit",
    category: "max", phase: "ongoing", week: null, order: 257,
    short: "Support na dive, HP starczy na jeszcze 1 tower hit → sojusznik ma czas. Bierz hit.",
    details: {
      what: "Dive jako frontline (support, tank, top). Twoje HP to ZASÓB. Jeśli możesz przyjąć jeszcze jeden tower hit i przeżyć, każdy dodatkowy hit = sojusznik ma więcej czasu na dokończenie kill / wycofanie / damage.",
      how: [
        "Sprawdzaj HP vs tower dmg (zwiększa się z liczbą hitów do ciebie).",
        "Margin: powyżej 1 tower hit = bezpiecznie przyjmij dalsze.",
        "Drop aggro: idź za wieżę na chwilę → tower zmienia cel na miniona → wróć.",
        "Świadomość że tower escalates: 1-2-3 hit dmg coraz większy. Trzeci hit może zabić jeśli pierwszy był niski.",
        "Po użyciu wszystkich spelli — twój hit jest najtańszą wymianą."
      ],
      when: "Dive z support/tank. Dive jako secondary engage.",
      whenNot: "Twoje HP < 1 tower hit. Carry pozycja (giniesz = mniej dmg).",
      success: "Dive'y kończą się killem dzięki extra sekundom z twojej tarczy.",
      mistakes: [
        "Wyjście z dive na 50% HP gdy mogłeś dać tower hit.",
        "Stanie pod wieżą z full HP bez aggro drop.",
        "Carry tankujący tower (waste — nikt nie da dmg)."
      ]
    }
  },
  gold_spend_pre_fight: {
    label: "Niewydany gold = nie masz",
    category: "max", phase: 3, week: 10, order: 258,
    short: "Walka za 30s. Trzymasz 1200g do Bloodthirster. Kup komponent (BF Sword 1300g lub Pickaxe 875g).",
    details: {
      what: "Gold w trakcie walki = nieobecny. Jeśli za chwilę kluczowa walka i trzymasz gold pod 'idealny item', kup komponent dający siłę teraz. Lepszy mniejszy spike teraz niż brak spike'a + przegrana walka.",
      how: [
        "Trigger: objective za 30-60s. Walka prawdopodobna. Sprawdź gold.",
        "Trzymasz 1200g na BT (3400g)? Kup BF Sword (1300g) lub mniejsze.",
        "Trzymasz 800g na Phantom? Kup Cloak of Agility (650g) lub Brawler Glove.",
        "Control ward (75g) ma ZAWSZE wartość przed walką (pinki na rzece, w fogu).",
        "Refillable potion (150g) — gdy walka przedłuża się, dodatkowe HP.",
        "Wyjątek: GP10 build z premeditated buy timing."
      ],
      when: "Przed każdą ważną walką / objective.",
      success: "Wchodzisz w walkę z każdym goldem zamienionym na statsy.",
      mistakes: [
        "Walka z 2000g w portfelu (brak żadnego spike'a).",
        "Brak control wardów przed obj 'bo zaoszczędzam'.",
        "Kupowanie zbyt drogiego komponentu (1 BF Sword zamiast 2 mniejszych)."
      ]
    }
  },
  potion_early_in_fight: {
    label: "Potion WCZEŚNIE w walce",
    category: "max", phase: 2, week: 6, order: 259,
    short: "Walka start → potion od razu. +HP daje 1 AA / 1 spell / czas na heal sojusznika.",
    details: {
      what: "Potion w teamfighcie/walce — klikaj WCZEŚNIE. Nawet jeśli umrzesz, te dodatkowe HP/HP regen = 1 dodatkowy AA, 1 spell, lub czas na heal od sojusznika. Hold potion 'na potem' = często nie kliknięty wcale.",
      how: [
        "Walka start, jakikolwiek dmg na ciebie → potion natychmiast.",
        "Nawet pełny HP — gdy zaraz dostaniesz dmg, potion zacznie regen wcześniej.",
        "Refillable potion: 4 stack? Klikaj 1 nawet przy małym dmg — uzupełnisz po walce.",
        "Hold tylko gdy 100% pewny że walki za chwilę nie ma."
      ],
      when: "Każda walka / objective skirmish / dive.",
      success: "Wszystkie potki używane. Twoje HP w walkach wyższe niż enemy.",
      mistakes: [
        "Trzymanie pota 'na potem' i umieranie z 4 stackami.",
        "Klikanie pota dopiero przy 30% HP (za późno).",
        "Brak pota w buildzie do lvl 8."
      ]
    }
  },
  trinket_2_stacks: {
    label: "Nie siedź na 2 stackach trinketa",
    category: "max", phase: "ongoing", week: null, order: 260,
    short: "2 stacki yellow trinket = trzeci się nie ładuje. Stawiaj wcześniej.",
    details: {
      what: "Yellow trinket (warding totem) maks 2 stacki. Trzeci nie ładuje się dopóki nie użyjesz jednego. Siedzenie długo na 2 stackach = w trakcie gry stawiasz MNIEJ wardów = mniej info = niższe winrate.",
      how: [
        "Sprawdzaj stacki przy recall / wychodzeniu z bazy / przed roamem.",
        "Masz 2 stacki? Postaw jeden ZARAZ przy najbliższej okazji.",
        "Pierwsza akcja po wyjściu z bazy: krzak przy rzece / wejście jg = ward.",
        "Nie czekaj 'na idealny moment'. Mały suboptymalny ward > brak stawiania.",
        "Wyjątek: planowany teamfight za 30s, chcesz stack na obronę."
      ],
      when: "Każdy moment z 2 stackami trinketa.",
      success: "Średnio 6-10 wardów w grze (vs 3-4 przy lazy stylu).",
      mistakes: [
        "Mid game z 2 stackami przez 3 minuty.",
        "Ward gdy 'pod ręką' bez planu (lazy ward).",
        "Brak świadomości stacka (UI ignorowane)."
      ]
    }
  },
  body_vision: {
    label: "Twoja postać daje wizję",
    category: "max", phase: "ongoing", week: null, order: 261,
    short: "Stoisz pod wieżą → przesuń się o pixel by zobaczyć więcej (krzak, róg, rzeka).",
    details: {
      what: "Twój champion ma 'sight range' (~1200). Twoje ciało daje wizję wokół. Przesunięcie się o pixel zmienia co widzisz. Bezpieczny farm pod wieżą — stań trochę bliżej krzaka / rzeki = informacja o rotacji enemy bez warda.",
      how: [
        "Pod wieżą farm: stań po stronie krzaka rzeki → widzisz rzekę przy mijaniu jg.",
        "Bliżej krzaka przed dive = sprawdzasz krzak bez używania trinketa.",
        "Walking po jg: zatrzymaj się przed rogiem przejścia → ciało widzi co za rogiem zanim wejdziesz.",
        "Carry pod wieżą po walce: małe przesunięcie → widzisz czy enemy zaraz rotują.",
        "Idea: każdy moment 'gdzie stać' to też 'co widzę'."
      ],
      when: "Każde stanie. Każde 1-2s spokoju.",
      success: "Łapiesz roamy enemy 2s wcześniej bez kosztu warda.",
      mistakes: [
        "Stanie centralnie pod wieżą (najmniej info).",
        "Bicie miniona z złej strony (brak sight).",
        "Brak myślenia o ciele jako wizji."
      ]
    }
  },
  vision_pixel_quality: {
    label: "Lazy ward to anty-wartość",
    category: "vision", phase: "ongoing", week: null, order: 262,
    short: "Krawędź krzaka. Pixel matters. Głębiej > bliżej. Mapa nie symetryczna.",
    details: {
      what: "Ward postawiony szybko 'gdziekolwiek w krzaku' często pokazuje 30% obszaru tego co mógłby. Pixel matters. Krawędź krzaka widzi WEJŚCIE i PRZEJŚCIE obok. Środek krzaka widzi tylko sam krzak. Mapa nie jest symetryczna — top blue side ≠ top red side, testuj na customie.",
      how: [
        "Przed wardem: 2s na ustawienie pikselu, nie 'klik gdziekolwiek'.",
        "Krzak: krawędź zewnętrzna pokazuje wejście + przejście. Środek = tylko krzak.",
        "Mapy asymetria: ward który działa po blue side może mieć martwą strefę po red side.",
        "Ward głębiej > bliżej JEŚLI nadal pokazuje to co bliższy.",
        "Wardy przez ścianę: pozwalają nie face check'ować, ale dają mało wizji poza krzakiem.",
        "Trening custom: postaw ward, biegaj wokół z drugim accountem (lub w jednym sprawdzaj wizję)."
      ],
      when: "Każde stawianie warda. Każdy moment 'szybkiego' wardowania.",
      success: "Każdy twój ward widzi enemy przed wejściem, nie po.",
      mistakes: [
        "Ward w środku krzaka.",
        "Ward w pierwszym miejscu które kliknąłeś.",
        "Brak custom test'u różnych spotów."
      ]
    }
  },

  // ---------- SETTINGS (jednorazowe) ----------
  setup_hierarchy: {
    label: "Hardware setup — FPS+ping > Hz > mysz",
    category: "max", phase: 1, week: 1, order: 263,
    short: "Stabilne FPS+ping > monitor 144Hz+ > myszka > klawiatura. Ustaw raz.",
    details: {
      what: "Hardware ma hierarchię ważności pod LoL. Stabilne FPS i niski ping > monitor wysokoodświeżalny > myszka > klawiatura > słuchawki. Najgorsze marnowanie pieniędzy: drogie peryferia gdy FPS skacze albo ping > 50ms.",
      how: [
        "1. FPS stabilne. Lock pod monitor Hz (np. 144 lub 240). Zmniejsz grafikę jeśli skacze.",
        "2. Ping < 50ms idealnie. Sprawdź WiFi vs Ethernet (kabel = lepszy ping).",
        "3. Monitor: 144Hz minimum dla LoL. 240Hz dla high elo.",
        "4. Myszka: dobrze leży, lekka, dobre odwzorowanie. NIE musi być najdroższa. Polecane: G Pro X Superlight, Razer Viper.",
        "5. Klawiatura: mechaniczna lepsza, ale niski priorytet.",
        "6. Sprawdź monitor pozycja: minimapa powinna być widoczna lekkim ruchem oczu, nie głowy."
      ],
      when: "Raz na rok / przy zmianie setupu / gdy frustracja z gry.",
      success: "Stabilne 144+ FPS, ping pod 50ms, monitor 144Hz+. Setup pozwala czytać minimapę bez obracania głowy.",
      mistakes: [
        "200€ myszka + 60Hz monitor.",
        "Granie na WiFi gdy ethernet możliwy.",
        "Ignorowanie skoków FPS bo 'średnio mam dużo'."
      ]
    }
  },
  extra_game_settings: {
    label: "Ustawienia gry — pełna lista",
    category: "micro", phase: "ongoing", week: null, order: 264,
    short: "Smartcast+shift normal, Target Champions Only toggle, Smooth/Locked OFF, mouse speed sync.",
    details: {
      what: "Lista ustawień KTÓRE MUSISZ MIEĆ. Raz ustawisz i zapomnisz. Brak tych ustawień = stała kara w każdej grze.",
      how: [
        "Smartcast: domyślnie ON dla wszystkich skilli. Pod Shift = normal cast (zobacz zasięg). Trinket pod normal cast (precyzja wardu).",
        "Target Champions Only: na wygodnym klawiszu (np. ~ albo `). USTAWIONE NA TOGGLE, nie hold.",
        "Attack Move: pod A. Attack Move on Cursor: ON (cel bliżej kursora, nie postaci).",
        "Auto-attack: OFF. Każdy AA wynika z twojej komendy.",
        "F-keys: F1-F4 = sojusznicy 1-4. Self pod SPACJĄ (nie F5).",
        "Camera: Smooth OFF. Camera on Revive OFF. Locked Camera OFF (NIGDY).",
        "Mouse speed: Windows speed = in-game speed (spójne).",
        "Grafika: postacie+spelle MAX, environment LOW, screen shake OFF, FPS lock na Hz monitora.",
        "Dźwięk: spelle/SFX ON, muzyka OFF.",
        "HUD: czytelny, ale minimalny. Czat OFF lub mute all (poza pingami).",
        "Show Mana Costs ON. Cooldowny w minutach:sekundach (precyzja)."
      ],
      when: "Raz. Po większym patch'u sprawdź czy nic się nie cofnęło.",
      success: "Wszystko z listy ustawione. Reagujesz szybciej, mniej misklików.",
      mistakes: [
        "Domyślne ustawienia.",
        "Locked camera (największy grzech).",
        "Auto-attack ON.",
        "F1 na self (waste klawisza)."
      ]
    }
  },

  // ============================================================
  // SOLOQ — kurs Bezum SoloQ, mindset + checklisty + system
  // ============================================================

  // ---------- SOLOQ_SYSTEM ----------
  mmr_understanding: {
    label: "MMR ukryte — fundament matchmaku",
    category: "mindset", phase: "ongoing", week: null, order: 300, info_only: true,
    short: "System dobiera lobby po MMR, nie po widocznej randze. LP/dywizja to tylko ekran.",
    details: {
      what: "MMR (matchmaking rating) to ukryta wartość, według której system dobiera kogo z kim grasz. Widoczna ranga/LP to tylko warstwa prezentacji. Dwie osoby z różnych dywizji mogą być w jednym lobby jeśli mają podobne MMR.",
      how: [
        "Nie traktuj zewnętrznych 'sprawdzaczy MMR' jak prawdy objawionej — dokładny MMR jest ukryty, narzędzia tylko szacują.",
        "Skup się na faktach: LP gains/losses to sygnał gdzie jest MMR vs dywizja.",
        "Nie kombinuj 'jak zresetować MMR' — to się robi przez grę dużej liczby gier."
      ],
      when: "Każde myślenie o awansie. Każde 'czemu mi system tyle daje?'.",
      success: "Nie obwiniasz systemu — rozumiesz że gra dużą próbką gier.",
      mistakes: [
        "Pomylenie LP z MMR.",
        "Decyzje treningowe pod nieaktualne narzędzia MMR.",
        "'Reset MMR' jako wymówka."
      ]
    }
  },
  lp_gains_explained: {
    label: "LP gains zdradzają MMR vs dywizja",
    category: "mindset", phase: "ongoing", week: null, order: 301, info_only: true,
    short: "Niskie LP gains = MMR niżej niż dywizja. Wysokie = wyżej. System wyrównuje przez gry.",
    details: {
      what: "Jeśli za wygraną dostajesz dużo LP — twoje MMR jest WYŻEJ niż widoczna dywizja, system cię popycha do góry. Jeśli mało LP / dużo traci się — MMR jest niżej. Nierówne gainsy NIE są karą, tylko mechanizmem wyrównującym.",
      how: [
        "Sprawdzasz LP gains? Ok. Ale rozumiesz: to sygnał, nie kara.",
        "Niskie gains przy 50% WR → dywizja będzie spadać aż wyrówna MMR. Graj dalej.",
        "Dobre gains przy 50% WR → wciąż awansujesz, system uważa cię za lepszego niż dywizja.",
        "Decyzja: nie panikuj nad jedną grą. Patrz na trend 50-100 gier."
      ],
      when: "Każde 'czemu tak mało za winy?'.",
      success: "Rozumiesz że dynamic LP to feedback systemu, nie niesprawiedliwość.",
      mistakes: [
        "Reset konta bo 'mam zepsute LP'.",
        "Streak'i bazowane na lp gains.",
        "Założenie 'mało LP = brak progresu' bez patrzenia na trend."
      ]
    }
  },
  statistics_4v5: {
    label: "4 vs 5 niewiadomych — statystyka po twojej stronie",
    category: "mindset", phase: "ongoing", week: null, order: 302, info_only: true,
    short: "Ty stała. 4 random u ciebie, 5 random u enemy. Trolle/AFK statystycznie częściej u nich.",
    details: {
      what: "W każdej grze jesteś jedyną stałą po swojej stronie. Po twojej stronie są 4 losowi sojusznicy, po stronie enemy 5 losowych graczy. Statystycznie troll/AFK/słaby gracz częściej trafia do enemy. Pod warunkiem że SAM nie generujesz tych problemów.",
      how: [
        "Po grze z AFK po twojej stronie: zła pojedyncza gra, ale prawdopodobieństwo dalej działa na twoją korzyść.",
        "Smurf też częściej trafia do enemy (ale boli mocniej emocjonalnie).",
        "Prawo wielkich liczb: 10 gier może być losowych, 100 zaczyna oddawać statystykę, 500 jest stabilne.",
        "WARUNEK: ty sam nie jesteś AFK/trollem/tox."
      ],
      when: "Mental po grze z AFK / trollem.",
      success: "Pojedyncza zła gra nie definiuje sesji. Patrzysz na 50+ gier.",
      mistakes: [
        "'Same AFK mi się trafiają' po 10 grach.",
        "Sam tilciasz/wychodzisz → losujesz po niekorzystnej stronie.",
        "Wszystko jest losowość."
      ]
    }
  },
  server_choice: {
    label: "EUW vs EUNE — wybór świadomy",
    category: "mindset", phase: "ongoing", week: null, order: 303, info_only: true,
    short: "EUW lepsze dla high elo / esportu. EUNE wystarcza dla niższych/średnich. Decyzja raz.",
    details: {
      what: "Jeśli celujesz w high elo lub esport — EUW lepszy bo skupia mocnych graczy (pro/akademia/ERL). Jeśli cel to gold/plat/emerald — EUNE w pełni wystarcza. Różnica zaczyna się już w Diamond, nie dopiero w Challenger.",
      how: [
        "Cel = esport / wysokie sceny? Idź na EUW od razu.",
        "Już masz Master/GM EUNE i chcesz dalej? Lepiej przenieść się NA EUW zamiast wbijać Challenger EUNE.",
        "Bronze-Plat: serwer wybierz dla komfortu i pingu. Różnica niemała w tym przedziale.",
        "Ping ma znaczenie. Granie 80ms vs 30ms = realna różnica reakcji."
      ],
      when: "Decyzja raz na początku climbu. Po Master rozważ jeszcze raz.",
      success: "Wybór serwera spójny z celem na 12+ miesięcy.",
      mistakes: [
        "'Najpierw Challenger EUNE potem EUW' (tracisz czas).",
        "Granie EUNE 'bo wygodnie' przy aspiracjach pro.",
        "Granie EUW z 100+ ping (kara mechaniczna)."
      ]
    }
  },
  duo_value: {
    label: "Duo TYLKO z planem",
    category: "mindset", phase: "ongoing", week: null, order: 304, info_only: true,
    short: "Duo bot+sup / mid+jg z planem = mocne. 'Bo online' = strata. System balansuje przeciw duo.",
    details: {
      what: "Duo zmniejsza random po twojej stronie (3 niewiadome vs 4 solo). ALE system to wie i kompensuje — daje silniejszych enemy LUB słabszych team mate'ów. Duo bez planu często neutralne lub negatywne. Z planem (bot+sup, mid+jg) — bardzo mocne.",
      how: [
        "Duo decyzja: 'mamy plan co robić razem?'. Bot+sup naturalne. Mid+jg synergia gank/setup.",
        "Top+sup nadal może działać ale wymaga komunikacji o roamach.",
        "Duo z wyższym MMR partnerem: ty trafiasz wyżej, ale partner niżej (jego strata).",
        "Solo gra prościej dla MMR — mniej zmiennych dla systemu."
      ],
      when: "Każda decyzja 'idziemy duo?'.",
      success: "Duo gracie z planem; solo gracie świadomie dla MMR stability.",
      mistakes: [
        "Duo 'bo X online' bez roli synergii.",
        "Duo z dużą różnicą MMR → niespójne lobby.",
        "Duo + brak komunikacji → strata przewagi."
      ]
    }
  },
  dodge_decision: {
    label: "Dodge — LP traci się, MMR nie",
    category: "mindset", phase: "ongoing", week: null, order: 305, info_only: true,
    short: "Dodge = -LP + czas. MMR NIE spada. Narzędzie ochrony jakości gier.",
    details: {
      what: "Dodge w champ select zabiera widoczne LP i nakłada timeout, ale NIE zabiera ukrytego MMR. Pojedynczy dodge to mały koszt który chroni przed grą o niskiej szansie wygrania. Powtarzający się dodge — większa kara.",
      how: [
        "Dodge gdy: tox lobby od początku (wyzywanie, troll picky, ewidentny brak chęci grania).",
        "Dodge gdy: draft z bardzo małą granicą błędu (your team must play perfectly to win). Im wyżej, tym ważniejszy.",
        "NIE dodge: pojedynczy slabszy pick. Loss aversion mówi ci 'dodge' za często.",
        "Limit: 1-2 dodge dziennie max. Powyżej koszt timeout > zysk.",
        "Sprawdź: czy gra jest naprawdę przegrana, czy ty po prostu nie chcesz grać?"
      ],
      when: "Każdy champ select z czerwonymi flagami.",
      success: "Twoje dodge'e są rzadkie ale uzasadnione. WR rośnie bo nie grasz przegranych lobby.",
      mistakes: [
        "Dodge co drugi lobby = ciągłe ujemne LP.",
        "Dodge przez 1 słaby pick gdy reszta OK.",
        "Brak dodge'a tox lobby 'bo szkoda LP'."
      ]
    }
  },

  // ---------- SOLOQ_PRE_GAME ----------
  pre_game_physical: {
    label: "Stan psychofizyczny przed grą",
    category: "mindset", phase: "ongoing", week: null, order: 306,
    short: "Sen / jedzenie / zdrowie / brak natrętnych myśli. Bez bazy = nie graj rank.",
    details: {
      what: "Decyzje w grze wymagają zasobów intelektualnych. Brak snu, głód, ból, tilt → mózg zużywa zasoby na podstawy, brakuje na grę. Stan psychofizyczny daje największy boost do koncentracji.",
      how: [
        "Wyspany (7-9h zależnie od osoby).",
        "Najedzony ale nie przejedzony (pełny żołądek = senność).",
        "Brak bólu głowy, mocnego dyskomfortu.",
        "Spokojny — żadne 'muszę zaraz oddzwonić' / 'co z tym e-mailem'.",
        "Jeśli te 4 nie są OK → graj ARAM lub nie graj wcale."
      ],
      when: "Każda decyzja 'klikam ranked czy nie'.",
      success: "Wchodzisz w grę z pełnymi zasobami, nie zużywając ich na ból brzucha.",
      mistakes: [
        "Grasz głodny / niewyspany 'bo chcę nadrobić LP'.",
        "Granie po ciężkim treningu (zmęczony fizycznie).",
        "Granie z myślami o czymś innym."
      ]
    }
  },
  pre_game_environment: {
    label: "Otoczenie — usuwanie rozpraszaczy",
    category: "mindset", phase: "ongoing", week: null, order: 307,
    short: "Telefon na cichym. Discord/SM zamknięte. Wygodny fotel. Nikt nie przeszkadza.",
    details: {
      what: "Otoczenie wpływa na koncentrację. Każdy bodziec walczy o twoją uwagę. Mniej rozpraszaczy = więcej zasobów na grę.",
      how: [
        "Telefon: tryb cichy / DND / w innym pokoju.",
        "Komunikatory: Discord ping OFF dla niegrowych, social media zamknięte.",
        "Brak ważnego telefonu który zaraz może zadzwonić.",
        "Fotel/monitor/biurko ustawione komfortowo (poprawa setupu robi się PRZED, nie w trakcie).",
        "Temperatura w pokoju OK (zimno/gorąco rozprasza).",
        "Dom: rodzina/współlokatorzy wiedzą że teraz grasz."
      ],
      when: "Przed każdą sesją (nie każdą grą — sesja).",
      success: "Przez całą sesję nikt nie przerywa, nic nie pinguje.",
      mistakes: [
        "Discord ping co 5 min.",
        "Granie z telefonem w ręce (drugi ekran).",
        "Granie w hałasie / niewygodzie."
      ]
    }
  },
  pre_game_goal: {
    label: "Cel treningowy NA grę",
    category: "mindset", phase: "ongoing", week: null, order: 308,
    short: "Konkretny, zależny od ciebie. NIE 'wygrać'. NP. 'śledzić enemy JG przez laning'.",
    details: {
      what: "Cel treningowy zamienia ranked w sesję treningową. Nadal chcesz wygrać, ale wygrana nie jest jedyną miarą wartości gry. Cel jest punktem powrotu z autopilota i punktem oceny po grze niezależnym od wyniku.",
      how: [
        "Wynika z TWOICH błędów (review, coaching, edu materiały).",
        "Zależny od ciebie. NIE 'team gra dobrze' — TO 'śledzę enemy JG przy każdym campie'.",
        "Konkretny. NIE 'gram lepiej' — TO 'recall na cannon wave 100%'.",
        "Powtarzalny w grze. Pojawia się przynajmniej 10-20 razy.",
        "1-2 cele max. Nie próbuj 5 naraz.",
        "Cel powinien być wpisany gdzieś (apka focus goals)."
      ],
      when: "Przed każdą grą. Przed każdą sesją.",
      success: "Po grze potrafisz powiedzieć 'wykonałem cel w X% sytuacji'.",
      mistakes: [
        "Cel 'wygrać' (nie zależy od ciebie).",
        "Cel 'gram lepiej' (nieoperacyjny).",
        "5 celów = paraliż."
      ]
    }
  },
  pre_game_mood_check: {
    label: "Mood check — jak się czujesz?",
    category: "mindset", phase: "ongoing", week: null, order: 309,
    short: "Tilt? Zmęczenie? Frustracja? Lepiej teraz przyznać niż kontynuować grę.",
    details: {
      what: "Świadome rozpoznanie własnego stanu przed wciśnięciem 'Find Match'. Często gracze grają mimo tiltu/zmęczenia bo 'mam jeszcze 15 min'. Świadomy mood check ratuje LP.",
      how: [
        "Po poprzedniej grze: jak się czuję? Spokojny? Sfrustrowany? Energetyczny?",
        "Tilt → przerwa min 30 min (lub do końca sesji).",
        "Zmęczenie → ostatnia gra albo koniec.",
        "Frustracja → sprawdź źródło. Gra? Życie? Jeśli życie → graj jutro.",
        "Pozytywny / energetyczny → graj dalej."
      ],
      when: "Co grę. Przed każdym 'Find Match'.",
      success: "Łapiesz tilt zanim cię zniszczy. Sesje krótsze ale stabilniejsze.",
      mistakes: [
        "Pomijanie mood check 'jeszcze jedna'.",
        "Granie w tilcie 'odbiję LP'.",
        "Brak świadomości tiltu (nie nazwałeś go)."
      ]
    }
  },

  // ---------- SOLOQ_MINDSET (8 zasad climb) ----------
  mindset_winrate_byproduct: {
    label: "1/ Wygrywanie to PRODUKT UBOCZNY",
    category: "mindset", phase: "ongoing", week: null, order: 310,
    short: "Skup się na lepszej grze, nie na wyniku. Wynik PRZYJDZIE jako konsekwencja.",
    details: {
      what: "Pierwsza z 8 zasad mindsetu climb. Wynik (LP, dywizja, winrate) jest EFEKTEM lepszej gry, nie celem do wymuszenia. Skupianie się bezpośrednio na wyniku zwiększa tilt i pogarsza decyzje.",
      how: [
        "Po grze pytanie #1: 'czy grałem lepiej?'. NIE 'czy wygrałem?'.",
        "LP-watching co grę → wyłączyć (op.gg po sesji).",
        "Sojusznicy źli → 'jak ja sam mogę grać lepiej?'.",
        "Cel sesji: zrealizować focus goal X% razy. NIE 'dziś +50 LP'.",
        "Frustracja po przegranej z dobrym wykonaniem? → to PROGRES."
      ],
      when: "Cała sesja. Każda gra. Każdy moment po grze.",
      success: "Czujesz dobrze nawet po L gdy wiesz że grałeś dobrze.",
      mistakes: [
        "Wynik = nastrój.",
        "Refresh op.gg co grę.",
        "Tilt na L z dobrym wykonaniem."
      ]
    }
  },
  mindset_assume_enemy_good: {
    label: "2/ Zakładaj że enemy jest DOBRY",
    category: "mindset", phase: "ongoing", week: null, order: 311,
    short: "Bezpieczniejsze założenie. Grasz dobrze przez automat → przygotowanie na wyżej.",
    details: {
      what: "Druga zasada. Decyzje podejmuj tak jakby enemy umiał karać. Lekceważenie złego enemy → uczy się złych nawyków. Granie pod kompetentnego enemy → nawyki dobre na każdy poziom.",
      how: [
        "Trade'y: 'czy enemy zauważy ten błąd i ukarze?'.",
        "Pozycja: 'jeśli enemy JG kompetentny, czy stać tutaj?'.",
        "Trzymaj summonery jakby enemy umiał karać brak.",
        "Trening pod wyższe elo — nawyki są warte więcej niż LP z one gry.",
        "WYJĄTEK: gdy widzisz konkretny błąd, karz natychmiast (zasada 3 mówi o tym)."
      ],
      when: "Każda decyzja w grze.",
      success: "Twoje błędy są karane rzadziej bo gra pod kompetentnego enemy.",
      mistakes: [
        "'Enemy nie kliknie skana więc deep ward bezpieczny'.",
        "'Niska elo gracz nie spróbuje gank pod tower'.",
        "Założenie 'on jest na pewno zły'."
      ]
    }
  },
  mindset_enemy_can_mistake: {
    label: "3/ Enemy MOŻE bardzo zepsuć",
    category: "mindset", phase: "ongoing", week: null, order: 312,
    short: "Nie zakładaj błędu z góry, ALE gdy się wydarzy — karz natychmiast.",
    details: {
      what: "Uzupełnienie zasady 2. Decyzje robisz pod kompetentnego enemy, ALE mentalnie pamiętasz: każdy gracz to człowiek, każdy popełnia błędy. Gdy błąd faktycznie się wydarzy — wyciśnij z niego maksimum.",
      how: [
        "Trzymasz pozycję dobrą; enemy wbija się głupio → ukarz.",
        "Enemy zużył flash niepotrzebnie → all-in nim wróci.",
        "Enemy carry stoi pierwszy w teamfighcie → flanka.",
        "NIE liczysz na błąd przed nim. Reagujesz GDY się stanie.",
        "Patient & opportunistic."
      ],
      when: "Każdy zauważony błąd enemy.",
      success: "Wyciskasz value z każdego błędu enemy bez liczenia na nie.",
      mistakes: [
        "Wbijanie się 'może popełni błąd' bez setupu.",
        "Brak karania zauważonego błędu.",
        "Plan polega na błędach enemy."
      ]
    }
  },
  mindset_future_not_past: {
    label: "4/ W grze przyszłość, po grze przeszłość",
    category: "mindset", phase: "ongoing", week: null, order: 313,
    short: "Dopóki gra trwa: 'co teraz daje największą szansę?'. Analiza dopiero po grze.",
    details: {
      what: "Czwarta zasada. W trakcie gry — patrz tylko w przód. 'Sojusznik intnął' = stan obecny, nie powód do analizy w trakcie. Po grze konstruktywne wnioski: nie 'tu był błąd', ale 'co zrobię inaczej następnym razem'.",
      how: [
        "Sojusznik zginął głupio? Pytanie 'co teraz robię?'. NIE 'czemu on...'.",
        "Smok stracony? 'Jak teraz odzyskać tempo?'. NIE 'kto winny'.",
        "Po grze: analiza KONSTRUKTYWNA. 'Następnym razem zrobię X'.",
        "NIE: 'zepsułem ten objective' (tylko diagnoza).",
        "Konstruktywny wniosek: warunki + akcja + alternatywa."
      ],
      when: "Każdy moment w grze gdy coś idzie źle. Każda analiza po.",
      success: "W grze nie tracisz energii na przeszłość. Po grze masz konkretne wnioski.",
      mistakes: [
        "'Czemu on...' w trakcie gry.",
        "Analiza emocjonalna w 5 min po L.",
        "Wnioski bez 'co zrobię inaczej'."
      ]
    }
  },
  mindset_proactive: {
    label: "5/ Proaktywnie > pasywnie",
    category: "mindset", phase: "ongoing", week: null, order: 314,
    short: "Spróbuj akcję, naucz się limitów. Bez prób nie poznasz granic.",
    details: {
      what: "Piąta zasada. Pasywna gra krótkoterminowo bezpieczna, długoterminowo blokuje rozwój. Bez prób akcji nie poznasz limitów postaci, matchupów, sytuacji. Wyjście ze strefy komfortu jest niezbędne.",
      how: [
        "Widzisz potencjalnie dobre zagranie ale niepewny → SPRÓBUJ.",
        "Nieoczywisty trade matchupowy → testuj na customie + w grze.",
        "Limit championa enemy nieznany → próbuj, zbieraj dane.",
        "NIE bezmyślne fighting. To 'spróbuj gdy niepewny' nie 'fightuj wszystko'.",
        "Początek = błędy. Ale rozwój wymaga błędów."
      ],
      when: "Niepewne sytuacje. Lane testing. Skirmish testing.",
      success: "Po sesji wiesz nowy limit / nową interakcję matchupu.",
      mistakes: [
        "Stała pasywność 'żeby nie umrzeć'.",
        "Bezmyślne fighty (przeciwna skrajność).",
        "Brak testowania nowych rzeczy."
      ]
    }
  },
  mindset_game_of_errors: {
    label: "6/ LoL = gra błędów",
    category: "mindset", phase: "ongoing", week: null, order: 315,
    short: "Nie wygrywa ten kto gra idealnie. Wygrywa ten kto popełnia mniej błędów.",
    details: {
      what: "Szósta zasada. LoL nie jest grą perfekcji — jest grą minimalizowania błędów. Enemy z przewagą prawdopodobnie zepsuje coś po drodze. Twoim zadaniem: nie zniszczyć się mentalnie pierwszym, czekać na ich błąd.",
      how: [
        "Enemy 5/0 zdobył przewagę → prawdopodobnie nie domknie idealnie. Czekaj na okno.",
        "Enemy bierze smoka → mogą popełnić błąd przy Baronie. Setup.",
        "Twoja drużyna gorsze early → twoje cele: nie przegrać gry sam, czekać na ich błąd.",
        "Patience. Większość gier przegrywa się WŁASNYMI błędami, nie enemy genialnością.",
        "Survival mode po L early > forsing comeback z big risk."
      ],
      when: "Każda gra. Szczególnie gdy z tyłu.",
      success: "Wygrywasz gry które wcześniej byś poddał — bo enemy zepsuł, ty czekałeś.",
      mistakes: [
        "Forsing comeback 1v3 (twój błąd, nie enemy).",
        "Mentalnie poddana gra przed minutą 20.",
        "Założenie 'enemy zagra idealnie'."
      ]
    }
  },
  mindset_no_follow_bad: {
    label: "7/ Nie follow słaby plan",
    category: "mindset", phase: "ongoing", week: null, order: 316,
    short: "Team forsuje zły obj? Nie wchodzisz tylko bo oni. Punkty za gameplay.",
    details: {
      what: "Siódma zasada. Widzisz że zagranie jest słabe, ale i tak follow'ujesz? Wtedy niczym nie różnisz się od graczy którzy tego nie widzieli. Punkty (LP, dywizja) dostajesz za gameplay, nie za świadomość błędu.",
      how: [
        "Team forsuje Baron bez wizji + bez tempa → ty nie idziesz, pushujesz side.",
        "Team grupuje się 5 mid bez prio → ty zbierasz side wave.",
        "WYJĄTEK: brak followu KOŃCZY grę natychmiast (4v5 walka under nexus). Wtedy wchodź.",
        "Wiedza musi przełożyć się na decyzję. Sama świadomość bez akcji = waste.",
        "Pingaj cel ALE jak follow nie ma sensu — zostań przy swoim."
      ],
      when: "Każdy team play z czerwoną flagą.",
      success: "Nie giniesz w throwie team'u który widziałeś z odległości.",
      mistakes: [
        "Follow 'bo team chce'.",
        "Brak swojej linii myślenia.",
        "Wbicie w throw mimo wiedzy że to throw."
      ]
    }
  },
  mindset_no_generalizations: {
    label: "8/ Bez generalizacji 'soloQ to X'",
    category: "mindset", phase: "ongoing", week: null, order: 317,
    short: "'Na soloQ zawsze graj pod siebie' = brak analizy. Każda sytuacja konkretna.",
    details: {
      what: "Ósma zasada. LoL jest sytuacyjny. Hasła typu 'na soloQ zawsze X', 'low elo trzeba inaczej' omijają KONKRETNE warunki gry. Analiza = rozbijanie sytuacji na czynniki, nie sklejanie w hasło.",
      how: [
        "Pytanie 'jak grać X?' → odpowiedź zaczyna od warunków: champion / matchup / cooldowny / wave / jg / itemy.",
        "'Soloq mantra' jako poradnik → pułapka.",
        "Każda akcja = pytaj 'dlaczego TUTAJ?'.",
        "Krytyczne myślenie: dlaczego to działa? jakie założenia stoją za tym?",
        "Wniosek z review zawsze: warunki + akcja + alternatywa."
      ],
      when: "Każda decyzja w grze. Każde 'naucz mnie jak grać X'.",
      success: "Twoje decyzje mają uzasadnienie konkretne, nie hasłowe.",
      mistakes: [
        "'Na soloQ zawsze A'.",
        "'Low elo nie karze' jako wymówka.",
        "Brak warunków w wniosku."
      ]
    }
  },
  mindset_no_low_high_split: {
    label: "Low elo = high elo = ta sama gra",
    category: "mindset", phase: "ongoing", week: null, order: 318,
    short: "Poprawne zagranie jest poprawne w każdym elo. 'W low elo trzeba inaczej' = mit.",
    details: {
      what: "Mit że low elo i high elo to różne gry. Jeśli stan gry identyczny, optymalne zagranie jest identyczne. Różni się TYLKO to jak często enemy karze błędy. Granie 'pod low elo' = uczenie się złych nawyków blokujących wyższe elo.",
      how: [
        "Wave management na bronze = wave management na master. To samo.",
        "Tempo, fog tracking, cooldowny — uniwersalne.",
        "Różnica: low elo enemy NIE KARZE błędu. To nie znaczy że błąd nie jest błędem.",
        "Nie ucz się 'trików pod low elo'. Ucz się podstaw.",
        "Świetny high elo gracz radzi sobie w low elo. Świetny 'low elo specjalista' nie awansuje."
      ],
      when: "Każda nauka. Każda analiza. Każde 'jak grać X w mojej dywizji'.",
      success: "Twoje nawyki są dobre na każdy poziom. Awansujesz bo poprawnie grasz.",
      mistakes: [
        "Specjalne strategie pod low elo.",
        "Założenie 'high elo to inna gra'.",
        "Brak treningu podstaw."
      ]
    }
  },

  // ---------- SOLOQ_PEOPLE ----------
  ppl_mute_first: {
    label: "Mute all od początku gry",
    category: "mindset", phase: "ongoing", week: null, order: 319,
    short: "Bilans czatu ujemny. Mutuj OD STARTU. Lepiej stracić 1 dobrą info niż 10 toxic.",
    details: {
      what: "Czat statystycznie ma ujemny bilans (rozproszenie + tilt > marginalne info). Mute all od początku gry usuwa źródło problemu. Pingi zostają — dają info.",
      how: [
        "Wciśnij mute all od razu w loadingu.",
        "Jeśli ktoś czerwony już w lobby → dodge (lekcja dodge).",
        "Pingi nadal działają (cooldowny, danger, on my way).",
        "Pisanie samemu też ogranicz — bilans nadal ujemny.",
        "Czat OFF jako goal (już istniejący 'chat_off')."
      ],
      when: "Każda gra.",
      success: "Nie odczuwasz toksyczności. Skupiasz się na grze.",
      mistakes: [
        "Mute dopiero gdy ktoś już cię ztiltował.",
        "Czytanie 'może coś ciekawego'.",
        "Odpisywanie 'tylko fakty'."
      ]
    }
  },
  ppl_no_response_tox: {
    label: "Tox sojusznik = ZERO reakcji",
    category: "mindset", phase: "ongoing", week: null, order: 320,
    short: "Tox robi mało szkód O ILE nie pozwolisz mu wejść do głowy. Mute → graj.",
    details: {
      what: "Toksyczny gracz robi MNIEJ szkód niż AFK / troll / smurf, pod warunkiem że nie pozwolisz mu zająć twoją uwagę. Sam tekst na czacie nie przegrywa gry. Problem zaczyna się gdy go czytasz, analizujesz, odpisujesz.",
      how: [
        "Mute (jeśli nie mute all od początku).",
        "Nie odpisuj nawet 'masz rację'.",
        "Nie próbuj 'uspokoić' — nie znasz tej osoby.",
        "Logika nie działa na osoby w emocjach.",
        "Traktuj jak wadliwy element gry — bot który raz na ile zagra dziwnie."
      ],
      when: "Każdy tox sojusznik.",
      success: "Po grze nie pamiętasz emocji z toksyczności.",
      mistakes: [
        "'Wyjaśnienie' co źle zrobił.",
        "Próba uspokojenia.",
        "Pisanie w odpowiedzi (cel toxa)."
      ]
    }
  },
  ppl_afk_keep_playing: {
    label: "AFK MOŻE wrócić",
    category: "mindset", phase: "ongoing", week: null, order: 321,
    short: "Nie zakładaj że gra przegrana. AFK często wraca. Mechaniki comebacku istnieją.",
    details: {
      what: "AFK nie zawsze świadome porzucenie. Internet, prąd, telefon, emocjonalne wyjście — gracz może wrócić. Nawet bez powrotu LoL ma mechaniki comebacku (bounty, catch-up XP, utility championi działają bez golda).",
      how: [
        "Pierwsza reakcja na AFK: graj swoje, czekaj.",
        "Nie pisz do AFK ('wracaj' rzadko pomaga, częściej zniechęca).",
        "Mechaniki comebacku: bounty, catch-up XP, postacie tankowate / utility nadal mają wartość.",
        "Twoja gra = wzór dla pozostałych 3.",
        "Nawet 4v5 do wygrania = część gier. Nie wszystkie ale część."
      ],
      when: "Każda gra z AFK.",
      success: "Wygrywasz część gier z AFK przez stoicki gameplay.",
      mistakes: [
        "Mentalne poddanie przed minutą 10.",
        "Pisanie do AFK.",
        "Forsing throw 'i tak przegrana'."
      ]
    }
  },
  ppl_smurf_no_panic: {
    label: "Smurf nie ma 100% WR",
    category: "mindset", phase: "ongoing", week: null, order: 322,
    short: "Smurf ~60-65% WR zazwyczaj. Gra do wygrania. Lekcja warta > 1 LP.",
    details: {
      what: "Smurf wpływa na grę bardziej niż AFK, ale jego winrate nie jest 100%. Najczęstsze smurfy: Diamond/Emerald gracze na nizszym MMR z ~60% WR. Nie panika — gra do wygrania w 35-40% przypadków.",
      how: [
        "Mentalnie: smurf to człowiek z lepszą grą, nie cheat.",
        "Smurf też jest ograniczony championem / cooldownami / pozycją mapy.",
        "Twoja gra: nie panika, gra własna, szukaj okna.",
        "Po przegranej ze smurfem: review co robił inaczej. Lekcja > strata LP.",
        "Najwyższe smurfy (Master+) szybko uciekają z niskiego MMR — mało prawdopodobne że spotkasz."
      ],
      when: "Gra ze smurfem po jednej stronie.",
      success: "Nawet po L wynosisz lekcję jak budował przewagę.",
      mistakes: [
        "Mentalna kapitulacja na widok 'smurf detected'.",
        "Granie 'jakby przegrana z góry'.",
        "Brak nauki z gry ze smurfem."
      ]
    }
  },
  ppl_own_tox_cost: {
    label: "Twoja toksyczność = self-sabotage",
    category: "mindset", phase: "ongoing", week: null, order: 323,
    short: "Tox u ciebie szkodzi DRUŻYNIE (4 niewiadome). Pozytywność / cisza = pragmatyzm.",
    details: {
      what: "Statystyka 4v5 działa w obie strony. Jeśli ty regularnie generujesz tox / kłótnie / chaos — szkodzisz swojej stronie częściej niż enemy. Cisza i pozytywność nie z dobroci — z pragmatyzmu.",
      how: [
        "Nie odpowiadaj na czat (nawet 'tylko fakty').",
        "Nie ping z frustracji (informacyjnie tak, emocjonalnie nie).",
        "Trigger: po L sojusznika instynkt 'wytknąć' → wyhamuj.",
        "Pozytywne sygnały OK (ping 'great play' po dobrym callcie sojusznika).",
        "Cisza jest neutralna — wystarczy."
      ],
      when: "Każda gra. Każdy moment 'chcę napisać X'.",
      success: "Twoja drużyna częściej dobrze funkcjonuje bo nie psujesz morale.",
      mistakes: [
        "Wewnętrzny monolog 'on znów' (zatruwa).",
        "'Tylko jeden komentarz' (otwiera ciąg).",
        "Pingowanie żeby pokazać niezadowolenie."
      ]
    }
  },
  ppl_no_save_losing_lane: {
    label: "Nie ratuj przegrywającej linii",
    category: "mindset", phase: "ongoing", week: null, order: 324,
    short: "Gank 0/5 vs 5/0 = bardzo mała szansa. Inwestuj w mocne strony drużyny.",
    details: {
      what: "Próba 'uratowania' bardzo przegrywającej linii ma niski ROI. Fed enemy może wygrać 1v2. Shutdown czasem nie zmienia win conditionu. Lepiej: graj do mocnych stron swojej drużyny, trzymaj fed enemy z dala od kluczowych akcji.",
      how: [
        "ADC 0/5 bot vs ADC 5/0: nie idziesz gankować. Pushujesz top side albo invade jg.",
        "Top 0/3 stoi pod wieżą: zostawiasz, nie traci dużo CS.",
        "Twój fed mid: inwestuj wokół jego mocy (setup ganks, vision dla jego splitpushu).",
        "Enemy fed top: gracie z dala (smok bot, baron przygotowany gdy on top).",
        "WYJĄTEK: shutdown na fed enemy gdy okazja DARMOWA."
      ],
      when: "Każda decyzja 'gankować czy nie' przy przegrywającej linii.",
      success: "Twoje inwestycje generują wartość. Nie marnujesz na przegrywanych laneach.",
      mistakes: [
        "Gank 0/5 z dobrej woli.",
        "Próba 'fair' inwestycji w każdy lane.",
        "Brak myślenia 'kto wygrywa, w kogo inwestujemy'."
      ]
    }
  },

  // ---------- SOLOQ_POST_GAME ----------
  post_review_goal: {
    label: "Rozliczenie celu treningowego",
    category: "mindset", phase: "ongoing", week: null, order: 325,
    short: "Po grze pierwsze pytanie: czy wykonałem cel? Niezależnie od wyniku.",
    details: {
      what: "Po każdej grze pierwszy krok: sprawdź czy zrealizowałeś cel treningowy. Cel zależy od ciebie nie od wyniku gry. Buduje nawyki, utrwala uwagę.",
      how: [
        "1. Wpisz w apce: zrealizowałem (T/N).",
        "2. Jeśli częściowo: w jakim X% sytuacji.",
        "3. Co przeszkodziło? (świadoma analiza, nie wymówki).",
        "4. Po sesji: 3-5 gier z celem zrealizowanym → ten cel staje się nawykiem.",
        "5. NIE oceniaj się po wyniku gry. Wygrałeś ale nie zrealizowałeś celu? Strata. Przegrałeś ale zrealizowałeś? Postęp."
      ],
      when: "Po każdej grze. Pierwszy krok rutyny.",
      success: "Trenujesz świadomie. Wiesz po sesji co poszło dobrze.",
      mistakes: [
        "Pominięcie rozliczenia 'bo tilt'.",
        "Wynik gry = ocena treningu.",
        "Cel zbyt vague żeby rozliczyć."
      ]
    }
  },
  post_break_3_5: {
    label: "Przerwa 3-5 min między grami",
    category: "mindset", phase: "ongoing", week: null, order: 326,
    short: "Wstań od komputera. Fizyczny reset. Mniejsza szansa tilltu w next.",
    details: {
      what: "Krótka przerwa po grze: emocjonalny reset, mniejsza szansa trafienia tych samych graczy, moment na rozliczenie celu. Koszt mały, zysk realny.",
      how: [
        "Wstań od komputera — fizycznie.",
        "Przejdź się po pokoju, wypij wodę.",
        "Nie sięgaj po telefon (dodaje rozproszenia).",
        "3-5 min wystarczy. 10+ rozprasza sesję.",
        "Wyższy MMR: ważniejsze (te same lobby częściej)."
      ],
      when: "Po każdej grze.",
      success: "Wchodzisz w next grę z czystą głową.",
      mistakes: [
        "Auto-queue od razu.",
        "Telefon zamiast przerwy.",
        "Przerwa 20 min (sesja się rozsypuje)."
      ]
    }
  },
  post_analyze_cold: {
    label: "Analiza tylko z zimną głową",
    category: "mindset", phase: "ongoing", week: null, order: 327,
    short: "Emocje zniekształcają. Tilt + analiza = błędne wnioski. Wróć później.",
    details: {
      what: "Analiza tuż po grze ma plus: pamiętasz proces decyzyjny. Ma minus: emocje. Tilt po L lub euforia po stompie zniekształcają obraz. Zasada: analizuj OD RAZU tylko z chłodną głową.",
      how: [
        "Tilt / euforia → wróć do gry za 1-24h.",
        "Spokojnie po grze → możesz od razu.",
        "Replay z dystansu pokazuje co się stało, nie co czułeś.",
        "Notuj pytania do późniejszej analizy (jeśli nie możesz od razu).",
        "Nie ZMUSZAJ się do analizy każdej gry."
      ],
      when: "Decyzja po każdej grze 'analizować teraz czy nie'.",
      success: "Twoje wnioski z analizy są obiektywne nie emocjonalne.",
      mistakes: [
        "Analiza w tilcie → 'team noob, ja perfekcyjny'.",
        "Analiza w euforii → 'jestem geniuszem' bez krytyki.",
        "Brak analizy w ogóle."
      ]
    }
  },
  post_no_auto_queue: {
    label: "Nie spamuj kolejki",
    category: "mindset", phase: "ongoing", week: null, order: 328,
    short: "Wyższy MMR: ci sami gracze. Emocje z poprzedniej gry → kolejna.",
    details: {
      what: "Auto-queue od razu po grze ma minusy: wyższy MMR oznacza częste trafienie tych samych graczy (z ich emocjami z poprzedniej gry). Brak resetu mentalnego. Brak rozliczenia celu.",
      how: [
        "Po wciśnięciu 'Continue' → przerwa.",
        "NIE klikaj 'Find Match' od razu.",
        "Rozliczenie celu + przerwa 3-5 min.",
        "DODATKOWO: jeśli last gra miała ostrego tox → dłuższa przerwa (uniknięcie tej osoby).",
        "Limit gier na sesję — nie 'jeszcze jedna' bez końca."
      ],
      when: "Każda gra.",
      success: "Sesje krótsze ale jakościowsze.",
      mistakes: [
        "Spam 'Find Match' tilt → eskalacja.",
        "Brak limitu sesji.",
        "Ten sam tox gracz drugi raz w 30 min."
      ]
    }
  },
  post_universal_lessons: {
    label: "Wnioski uniwersalne, nie sytuacyjne",
    category: "mindset", phase: "ongoing", week: null, order: 329,
    short: "Nie 'tu zepsułem'. TYLKO 'źle operowałem cooldownem' / 'nie trackowałem JG'.",
    details: {
      what: "Wniosek z review ma mieć wartość dla PRZYSZŁYCH gier. 'Zepsułem tę walkę' = waste, walka się nie powtórzy. 'Wszedłem w walkę bez wizji JG' = uniwersalne, przyda się 100 razy.",
      how: [
        "Każdy błąd: spróbuj sprowadzić do PODSTAWY GRY (wave / tempo / fog / cooldowny / spacing / pozycja).",
        "'Zła walka' → 'wszedłem na max range z F flash CD'.",
        "'Zła rotacja' → 'nie sprawdziłem TAB itemów enemy przed ruchem'.",
        "Im bardziej uniwersalny wniosek tym więcej wart.",
        "Build sobie listę podstaw — twoich ulubionych zasad."
      ],
      when: "Każde review. Każde 'co poszło źle'.",
      success: "Wnioski stosowalne w wielu sytuacjach. Realny postęp.",
      mistakes: [
        "Wnioski na poziomie 'tę walkę', 'tę rotację'.",
        "Brak podstaw gry w słowniku.",
        "Identyfikacja błędu bez kategorii."
      ]
    }
  },

  // ---------- SOLOQ_DISCIPLINE ----------
  disc_one_role: {
    label: "Jedna główna rola",
    category: "mindset", phase: "ongoing", week: null, order: 330,
    short: "Stop skakać między rolami. Każda zmiana zużywa zasoby na nową mechanikę.",
    details: {
      what: "Wybór głównej roli i trzymanie się jej. Ciągłe zmiany = nauka nowych matchupów, mechaniki, rotacji = mniej zasobów na fundamenty gry. Wyjątek: secondary do unikania top fill.",
      how: [
        "Wybór roli: co lubisz + gdzie masz najwięcej godzin?",
        "Trzymaj się przez przynajmniej 100 gier zanim ocenisz.",
        "Secondary: prosty pick, low effort (np. autofill safe pool).",
        "NIE zmieniaj 'bo mi nie idzie' po 20 grach.",
        "Esport aspiracje: rola powinna pasować do meta competitive."
      ],
      when: "Każde 'czuję że może powinienem na inną rolę'.",
      success: "Po 6 miesiącach jesteś specjalistą w roli, nie generalistą.",
      mistakes: [
        "Skakanie role co tydzień.",
        "Fill 'bo szybciej queue'.",
        "Każdy nowy patch = nowa rola."
      ]
    }
  },
  disc_small_pool: {
    label: "Mały champion pool (1-3)",
    category: "mindset", phase: "ongoing", week: null, order: 331,
    short: "Bronze-Plat: 1-2 picks. Wyżej: 3-4 max. Mniej zmiennych = więcej focusu.",
    details: {
      what: "Mały pool championów = automat na obsługę postaci, więcej zasobów na grę. Niskie elo: matchup mało ważny, można 1 pick. Wyżej: 3-4 dla counter pickowania, ale nie więcej.",
      how: [
        "Bronze-Gold: 1-2 picks na rolę.",
        "Plat-Emerald: 2-3 picks.",
        "Diamond+: 3-4 picks dla flexibility.",
        "Wybór: prostsze postacie szybciej uczą gry (mniej skill ceiling pochłaniającego zasoby).",
        "Każdy nowy pick = ~50 gier zanim ma sens trzymać."
      ],
      when: "Decyzja co grać. Decyzja czy uczyć się nowego.",
      success: "Każda gra fokusem na grę, nie na obsługę postaci.",
      mistakes: [
        "10 championów po 5 gier każdy.",
        "Nauka nowego picka co tydzień.",
        "OTP gracz nagle wprowadza 3 picks 'dla flexibility' w Bronze."
      ]
    }
  },
  disc_games_count: {
    label: "DUŻO gier — prawo wielkich liczb",
    category: "mindset", phase: "ongoing", week: null, order: 332,
    short: "Statystyka działa na dużej próbce. 10 gier = losowość. 100 = sygnał. 500 = stabilność.",
    details: {
      what: "System MMR/LP wymaga dużej liczby gier żeby się wyrównać. Trolle/AFK rozkładają się statystycznie. Twoje błędy uśredniają się. Mała próbka = wszystko może się wydarzyć.",
      how: [
        "Cel sezonu: minimum 200-300 gier na rank.",
        "Nie wyciągaj wniosków z 10-20 gier (zbyt mała próbka).",
        "Sesja 3-5 gier > 10+ (jakość spada).",
        "Regularność > maraton. Codziennie 3 gry lepiej niż 20 raz w tygodniu.",
        "Track WR co 50 gier, nie co grę."
      ],
      when: "Strategia sezonu. Po każdej tilt-sesji.",
      success: "Twój sezon ma 250+ gier — system zdążył wyrównać.",
      mistakes: [
        "50 gier i 'utknąłem'.",
        "Wnioski z 10 gier.",
        "Brak regularności."
      ]
    }
  },
  disc_games_vs_watching: {
    label: "Graj więcej niż oglądasz",
    category: "mindset", phase: "ongoing", week: null, order: 333,
    short: "Bronze-Gold: 10:1 gier do edu. Diamond+: 5:1. Nigdy < 3:1.",
    details: {
      what: "Konsumpcja wiedzy bez praktyki = brak progresu. Proporcja zależna od poziomu: niżej więcej grania, wyżej można dokładniej analizować.",
      how: [
        "Bronze-Gold: 10 gier : 1 edu (~30 min edu na sesję).",
        "Plat-Emerald: 8:1.",
        "Diamond+: 5:1 (więcej detali warto analizować).",
        "Master+: 3:1 minimum (wciąż praktyka dominuje).",
        "Edu = aktywne oglądanie / VOD review / kurs. Stream w tle = nie liczy się."
      ],
      when: "Plan tygodniowy. Decyzja 'oglądać czy grać'.",
      success: "Praktyka dominuje. Wiedza wdrażana w grze.",
      mistakes: [
        "Codziennie 4h stream + 1 gra (1:4 ratio).",
        "Brak wdrażania w grze.",
        "Tilt → oglądanie zamiast pauzy."
      ]
    }
  },
  disc_no_off_modes: {
    label: "ARAM/URF nie są neutralne",
    category: "mindset", phase: "ongoing", week: null, order: 334,
    short: "Kosztują czas + utrwalają inne nawyki. Świadom kosztu jeśli celujesz w rank.",
    details: {
      what: "Tryby poboczne nie są neutralne treningowo. ARAM uczy 5v5 walk ale nie wave / macro. URF łamie cooldowny. Granie 30% ARAM 70% rank = wolniejszy progres rank.",
      how: [
        "Cel = rank? Większość czasu = rank.",
        "ARAM/URF: dla zabawy, świadomie ile czasu inwestujesz.",
        "Granie ze znajomymi w ARAM OK — to socialowy aspekt, nie trening.",
        "NIE myśl 'ARAM uczy walk' — uczy szczególnego typu walk różnego od rank.",
        "Bilans: 1 godz ARAM = 1 godz mniej rank trening."
      ],
      when: "Decyzja co grać dzisiaj.",
      success: "Twój czas alokowany świadomie pod cel.",
      mistakes: [
        "30%+ czasu na ARAM/URF + frustracja brakiem progresu.",
        "Założenie 'gram więc trenuję' niezależnie od trybu.",
        "Co weekend URF zamiast rank."
      ]
    }
  },
  disc_small_steps: {
    label: "Metoda małych kroczków",
    category: "mindset", phase: "ongoing", week: null, order: 335,
    short: "1-3 elementy. 30-50 gier. Dopiero potem dokładaj. Nie wszystko naraz.",
    details: {
      what: "Po obejrzeniu kursu / coachingu instynkt: 'teraz wszystko inaczej'. To pułapka — mózg przeciążony, nic się nie utrwala. Metoda małych kroczków: 1-3 rzeczy → 30-50 gier → automatyzacja → następne.",
      how: [
        "Wybór: 1-3 elementy z review.",
        "Trening: 30-50 gier z fokusem na nie.",
        "Sygnały utrwalenia: automatycznie pamiętasz, mniej zasobów na to.",
        "Dopiero wtedy: nowy element.",
        "NIE dokładaj kolejnego elementu po 5 grach 'bo łatwe'."
      ],
      when: "Każde 'co teraz trenuję'.",
      success: "Po 6 miesiącach masz 10-15 utrwalonych nawyków, nie 50 powierzchownie nauczonych.",
      mistakes: [
        "10 elementów naraz po kursie.",
        "Brak czasu na utrwalenie.",
        "Skakanie między tematami."
      ]
    }
  },
  focus_resource_mgmt: {
    label: "Automatyzuj triggery, nie odpowiedzi",
    category: "mindset", phase: "ongoing", week: null, order: 336,
    short: "Trigger ('po recallu pytam wave plan') — automat. Odpowiedź — świadoma, sytuacyjna.",
    details: {
      what: "Zarządzanie zasobami intelektualnymi: nawykowe powinno być PYTANIE (trigger), nie odpowiedź. Mózg się przypomina sam 'pomyśl o wave plan' — ale konkretny plan zależy od sytuacji.",
      how: [
        "Wychodzisz z bazy: trigger 'co teraz robię?'. Odpowiedź = sytuacyjna.",
        "Wracasz na linię po recall: trigger 'wave plan?'.",
        "JG: każdy camp → trigger 'spójrz na linię X' (rotuje).",
        "Po śmierci: trigger 'co źle?' bez emocji.",
        "Nie automatyzuj 'zawsze pushuję' — to nie sytuacyjne."
      ],
      when: "Trening nawyków. Decyzja co ma być automatem.",
      success: "Twoje przypomnienia działają same. Decyzje świadome.",
      mistakes: [
        "Automat na 'zawsze X' (anty-pattern).",
        "Brak automatów triggerowych.",
        "Decyzje świadome o wszystkim → przeciążenie."
      ]
    }
  },
  focus_inner_dialog: {
    label: "Dialog wewnętrzny w grze",
    category: "mindset", phase: "ongoing", week: null, order: 337,
    short: "'Co teraz robię?' 'Plan na minutę?' Pytania = aktywna koncentracja.",
    details: {
      what: "Praktyczna metoda utrzymania koncentracji: prowadź w głowie rozmowę. Zadawanie pytań kieruje uwagę na grę i zmusza mózg do szukania odpowiedzi.",
      how: [
        "'Co teraz powinienem zrobić?'",
        "'Co jest najlepsze dla gry?'",
        "'Jak mogę wygrać tę grę?'",
        "'Dlaczego idę w to miejsce?'",
        "'Plan na najbliższą minutę?'",
        "Powtarzaj co kilka chwil. Każda odpowiedź = aktywna decyzja."
      ],
      when: "Każdy spokojny moment gry. Trigger autopilot.",
      success: "Nie odpływasz w autopilot. Każda akcja świadoma.",
      mistakes: [
        "Granie cicho w głowie (autopilot).",
        "Dialog gdy walka (zbyt późno).",
        "Pytania bez odpowiedzi (tylko trigger)."
      ]
    }
  },
  focus_environment: {
    label: "Otoczenie pod skupienie",
    category: "mindset", phase: "ongoing", week: null, order: 338,
    short: "Notyfikacje OFF. Discord nieigrowy zamknięty. Social media zamknięte.",
    details: {
      what: "Łatwiej poprawić warunki zewnętrzne niż siłą woli oczekiwać koncentracji w chaosie. Każdy bodziec walczy o uwagę.",
      how: [
        "Telefon DND lub cichy w innym pokoju.",
        "Discord: tylko gameplay servers, reszta mute.",
        "Browser: zamknij social media taby.",
        "Tylko niezbędne aplikacje w tle.",
        "Drugi monitor: maks Spotify / Discord, NIE YouTube w tle."
      ],
      when: "Przed sesją. Stała konfiguracja.",
      success: "0 notyfikacji podczas sesji. Pełna uwaga.",
      mistakes: [
        "Telefon obok 'tylko sprawdzę szybko'.",
        "YouTube w tle = drugi ekran rozproszony.",
        "Reddit/Twitter tabs."
      ]
    }
  },

  // ---------- SOLOQ_ERRORS (Pareto 8 + statystyki + bonus 5) ----------
  err_8_areas: {
    label: "Pareto 8 obszarów — wybierz NAJSŁABSZY",
    category: "mindset", phase: "ongoing", week: null, order: 339, info_only: true,
    short: "Wave / tempo / fog / cooldowny / info / lekkie oddanie / off-team / mechaniki. Zacznij od dna.",
    details: {
      what: "8 obszarów które najczęściej blokują graczy poniżej Master. Praca nad najsłabszym daje największy zwrot. Nie wszystkie naraz — wybierz NAJSŁABSZY.",
      how: [
        "1. Wave management (slow/freeze/hard push, sync z obj).",
        "2. Tempo (kto pierwszy gdzie, recall jako tempo, cross-map).",
        "3. Fog of war i wizja (tracking, pinki, lazy ward, paradoks skanu).",
        "4. Cooldowny i power spike'i (track enemy, twoje, item spike windows).",
        "5. Zbieranie informacji (TAB, kamera, minimapa, dedukcja).",
        "6. Lekkie oddanie (oddaj 4 CS zamiast umrzeć, recall na czas, opuść wave).",
        "7. Off-team (spójność z drużyną, brak samotnych invadów).",
        "8. Mechaniki (CS, skillshoty, animacje, kiting).",
        "Self-assessment: oceń się 1-10 w każdym. Najniższy = focus.",
        "30-50 gier z fokusem na ten obszar."
      ],
      when: "Co miesiąc / sezon: review i wybór głównego obszaru.",
      success: "Dwa cykle = znacząco lepsze 2 obszary. Reszta podciągnięta.",
      mistakes: [
        "Praca nad wszystkimi 8 naraz.",
        "Wybór 'mechaniki' bo brzmi konkretnie, podczas gdy macro jest słabsze.",
        "Brak self-assessment."
      ]
    }
  },
  err_no_surrender: {
    label: "Niepoddawanie ma +EV",
    category: "mindset", phase: "ongoing", week: null, order: 340, info_only: true,
    short: "Odwrócenie 2/100 'przegranych' gier = +2 WR = dywizja w sezonie. 0+ sytuacja.",
    details: {
      what: "Surrender = przegrana pewna. Nie-surrender = część gier wygrasz. Wystarczy odwrócić mały procent żeby się opłacało matematycznie.",
      how: [
        "100 gier do poddania → odwrócisz 2 → +2 winrate.",
        "+2 WR = realna dywizja w sezonie.",
        "Argument 'czas' słaby: jeśli gra trwa 15+ min po odmowie surrendera, znaczy że da się przeciągnąć.",
        "LoL ma mechaniki comebacku (bounty, catch-up).",
        "Mentalna kapitulacja > sama gra. Nawet beznadziejne gry mogą się odwrócić.",
        "WYJĄTEK: 4 sojuszników już poddali, ty nie zatrzymasz."
      ],
      when: "Każdy moment 'oddajmy'.",
      success: "Twoje sezony mają wyraźnie wyższy WR przez te 2-5%.",
      mistakes: [
        "FF15 nawet przy 5-3 score.",
        "'Czas' jako wymówka.",
        "Mentalna kapitulacja → autopilot → faktyczny throw."
      ]
    }
  },
  stat_winrate_misleading: {
    label: "Wysoki WR ≠ mocna postać",
    category: "mindset", phase: "ongoing", week: null, order: 341, info_only: true,
    short: "One-tricki, low pickrate, łatwy pick, brak kontry. WR jest interpretowany.",
    details: {
      what: "Winrate championa nie mówi że jest 'mocny' — mówi że W TEJ PRÓBCE WYGRYWA. Powody mogą być różne: gra nim głównie OTP, mało pickow więc tylko specjaliści, łatwy w obsłudze, soloQ nie karze słabości.",
      how: [
        "Przed wyborem 'silnego picka' sprawdź: pickrate, banrate, masterminds (kto gra).",
        "Wysokie WR + low pickrate = nisza, mogą być one-tricki.",
        "Wysokie WR + high pickrate = realnie mocna postać.",
        "WR po patch'u — sprawdź 2-3 tygodnie po, nie w pierwszym tygodniu (small sample).",
        "Twój WR z postacią > generalny WR. Ty grasz lepiej z tym co lubisz."
      ],
      when: "Każdy wybór 'na patch'.",
      success: "Twoje wybory bazowane na zrozumieniu nie na liczbach.",
      mistakes: [
        "Pick 'bo 55% WR' bez kontekstu.",
        "Lemingi za każdą 'mocną' postacią.",
        "Ignorowanie własnego WR."
      ]
    }
  },
  stat_kda_misleading: {
    label: "KDA nie mówi czy decyzje były dobre",
    category: "mindset", phase: "ongoing", week: null, order: 342, info_only: true,
    short: "Bezpieczne KDA może być biernością. Czasem warto umrzeć za makro.",
    details: {
      what: "KDA mierzy śmierci, kille, assysty. Nie mierzy: czy decyzja była dobra, czy ryzyko było uzasadnione, czy bierność była rozsądna. Wysokie KDA może być biernością. Ryzykowne KDA może być właściwe.",
      how: [
        "Wysokie KDA + L gra = bierność. 'Nie umierałem' nie wystarcza.",
        "Niskie KDA + W gra = często wartościowe ryzyka.",
        "Śmierć za smoka / barona / kluczowy splitpush = OK.",
        "Patrz na 'wpływ' nie 'KDA'. Czy ta śmierć kosztowała grę, czy stworzyła okno?",
        "Tracker: 'umarłem' → 'co dałem za to?'."
      ],
      when: "Każde post-game review.",
      success: "Oceniasz siebie po wpływie, nie po liczbach.",
      mistakes: [
        "'Mam 8/2/10 więc dobrze grałem' (po L).",
        "Strach przed śmiercią → bierność.",
        "Hate na sojuszników z 0/5 bez patrzenia na kontekst."
      ]
    }
  },
  stat_damage_misleading: {
    label: "Damage często pusty",
    category: "mindset", phase: "ongoing", week: null, order: 343, info_only: true,
    short: "Poke nabija dmg. Wbiegający losowo też. Damage ≠ wartość.",
    details: {
      what: "Total damage to liczba. Damage może być pusty (poke przez wave, wbiegający bez sensu) lub wartościowy (skupione na decydujących walkach).",
      how: [
        "Postać poke'ująca: damage MUSI być wysoki. Wysoki to brak progresu.",
        "Postać engage: damage często niski, ale impact wysoki (CC, frontline).",
        "Patrz na damage w KONTEKŚCIE: kogo trafił, kiedy, czy zmienił walkę?",
        "Damage do tanka bezsensowny — sprawdzaj damage do carry.",
        "'Damage dealt' vs 'effective damage' — narzędzia jak op.gg czasem rozróżniają."
      ],
      when: "Review po grze. Ocena innego gracza.",
      success: "Czytasz damage z kontekstem postaci i sytuacji.",
      mistakes: [
        "'Najwięcej damage' = 'najlepiej grał'.",
        "Hate na tanka bo low damage.",
        "Poke i nie awansuje → brak związku."
      ]
    }
  },
  stuck_no_discipline: {
    label: "Dodatkowo: Brak dyscypliny",
    category: "mindset", phase: "ongoing", week: null, order: 344, info_only: true,
    short: "Skacze role/champ, ARAM zamiast rank, granie w złym stanie, 'jeszcze jedna'.",
    details: {
      what: "Pierwszy z 5 powodów dlaczego gracze nie wbijają rangi. Wyrażony przez objawy: brak regularności, ciągła zmiana planów, kompromisy w celu rozrywki.",
      how: [
        "Sygnały: zmiana roli częściej niż raz na 3 miesiące.",
        "Granie ARAM > 20% czasu przy aspiracjach rank.",
        "'Jeszcze jedna gra' o 2:00 mimo zmęczenia.",
        "Brak realizacji celu treningowego.",
        "Coś z tej listy ci się zgadza? → tu jest problem."
      ],
      when: "Self-assessment co miesiąc.",
      success: "Twoje sesje są planowane, regularne, z celem.",
      mistakes: [
        "Negowanie 'ja mam dyscyplinę' bez sprawdzenia objawów.",
        "Identyfikacja problemu bez zmiany.",
        "Brak systemu (np. limit gier dziennie)."
      ]
    }
  },
  stuck_no_comfort_exit: {
    label: "Dodatkowo: Strach przed dyskomfortem",
    category: "mindset", phase: "ongoing", week: null, order: 345, info_only: true,
    short: "Rozwój wymaga gorszych gier. Krok wstecz dla 2 kroków naprzód.",
    details: {
      what: "Drugi powód braku awansu. Wiesz że X jest problem, znasz rozwiązanie, ale dyskomfort zmiany cię blokuje. Klasyk: locked camera. Wiadomo że szkodzi, ale przejście do unlocked = dyskomfort. Gracz zostaje przy lockedzie.",
      how: [
        "Locked camera → unlocked: kilkanaście gier dyskomfortu, długoterminowo OGROMNY zysk.",
        "Nowy champion: 30-50 gier słabszych, potem znacznie lepiej.",
        "Nowy pattern wave: początek pomyłek, potem stable.",
        "Po coachingu zwykle krótki spadek bo skupienie na nowym kosztem starego — to NORMALNE.",
        "Pytanie: 'czy ten dyskomfort to inwestycja?'"
      ],
      when: "Każda 'znana zmiana którą zwlekam'.",
      success: "Przechodzisz przez dyskomfort. Dolina rozwoju → progres.",
      mistakes: [
        "Wiem o problemie, nie chcę go ruszać.",
        "Próba 1 sesji → 'nie działa'.",
        "Brak zmian od miesięcy."
      ]
    }
  },
  stuck_blame_others: {
    label: "Dodatkowo: Skupianie się na innych",
    category: "mindset", phase: "ongoing", week: null, order: 346, info_only: true,
    short: "Ty stała w każdej grze. Sojusznicy zmienni. Pracuj nad sobą.",
    details: {
      what: "Trzeci powód. Skupianie się na sojusznikach jest psychicznie wygodne (winę przenosisz), ale długoterminowo nie rozwija. Sojusznicy z poprzedniej gry NIE BĘDĄ w następnej. Twoje błędy zostaną.",
      how: [
        "Po grze: 'co JA mogę zrobić inaczej?'. NIE 'co on źle zrobił'.",
        "Frustracja na sojuszniku → przekieruj: 'jak ja bym tę sytuację rozegrał inaczej?'.",
        "VOD review: minimum 80% własnych klipów, max 20% sojuszników.",
        "Jeśli WR 45% przez 200 gier → to ty. Sojusznicy się zmieniają, ty zostajesz.",
        "Pracuj nad sobą. To jedyna stała."
      ],
      when: "Każde 'gdyby team grał lepiej'.",
      success: "Twoje review koncentruje się na tobie. Realny postęp.",
      mistakes: [
        "Lista 'co team źle zrobił' po L.",
        "'Mam 45% WR ale to przez team'.",
        "VOD review tylko na sojusznikach."
      ]
    }
  },
  stuck_simple_solutions: {
    label: "Dodatkowo: Szukanie prostych odpowiedzi",
    category: "mindset", phase: "ongoing", week: null, order: 347, info_only: true,
    short: "Jeden champion / build / zasada cię nie wyniesie. LoL = 'to zależy' + rozbicie.",
    details: {
      what: "Czwarty powód. LoL jest złożony, prawdziwa odpowiedź zaczyna od 'to zależy' i wymaga rozbicia na czynniki. Proste hasła ('zawsze pushuj prio', 'one trick wyniesie') dają złudzenie rozwiązania.",
      how: [
        "Pytanie 'jak grać X?' → wymaga warunków: matchup / spike / wave / jg.",
        "'Jeden trick' cię nie wyniesie — może chwilowo +1 dywizja, nie więcej.",
        "Treningi 'magiczne metody' (10 gier na master) → marketing.",
        "Analiza = rozbijanie sytuacji. Proste hasło = sklejanie.",
        "Akceptuj złożoność. Nie szukaj jednej formuły."
      ],
      when: "Każdy 'guru' obiecujący szybką drogę.",
      success: "Twoje podejście do nauki uznaje złożoność LoL.",
      mistakes: [
        "Zakup 'system na master w 30 dni'.",
        "OTP jako jedyna strategia długoterminowa.",
        "'Jedna prosta porada' jako oczekiwanie."
      ]
    }
  },
  stuck_no_critical: {
    label: "Dodatkowo: Brak krytycznego myślenia",
    category: "mindset", phase: "ongoing", week: null, order: 348, info_only: true,
    short: "Pytaj wszystko. Także siebie. Kontrargumenty > potwierdzenia.",
    details: {
      what: "Piąty powód braku awansu. Krytyczne myślenie = zadawanie pytań temu co słyszysz I temu co sam uważasz. Bez tego utrwalasz złe schematy.",
      how: [
        "Pytania kontrolne: 'jaki jest kontrargument?', 'dlaczego mogę się mylić?'.",
        "'Czy ta rada działa zawsze, czy tylko w konkretnych warunkach?'",
        "'Czy to wniosek z analizy czy hasło?'",
        "Coach mówi X → 'dlaczego X?'. Nie blind follow.",
        "Sam się przyłapujesz na 'wiem że tak jest' → sprawdź dlaczego.",
        "Najwięcej uczą argumenty PRZECIW temu co już wiesz."
      ],
      when: "Każda nauka. Każde 'jasne to wiem'.",
      success: "Twoja wiedza jest świadoma, nie wzięta na wiarę.",
      mistakes: [
        "Blind follow 'guru'.",
        "Brak pytań do własnych przekonań.",
        "'Mam rację bo tak jest'."
      ]
    }
  }
};

const GOAL_SECTIONS = {
  awareness: [
    "minimap_3s",
    "tab_check",
    "fog_tracking",
    "camera_work",
    "timers",
    "info_collection",
    "deduction_path",
    "fog_tempo_tracking"
  ],
  wave_macro: [
    "slow_push",
    "freeze",
    "hard_push",
    "canon_recall",
    "map_sync",
    "wave_sync_obj",
    "early_recall_tempo"
  ],
  prio_tempo: [
    "prio_basic",
    "tempo_basic",
    "enemy_tempo_response",
    "give_up_prio_tempo",
    "tempo_to_place",
    "prio_tempo"
  ],
  early_mid: [
    "rotation_t1",
    "roam_after_push",
    "map_open_layers",
    "t1_priority_choice",
    "first_t1_response",
    "off_team_line",
    "shift_play"
  ],
  mid_late: [
    "objective_from_something",
    "dragon_protocol",
    "herald_map",
    "baron_play",
    "splitpush_structures",
    "closing_game",
    "side_resources",
    "side_lane_uses",
    "counter_splitpush",
    "play_behind",
    "cheese_plays",
    "winning_state_no_obj",
    "five_factors_checklist",
    "double_prio_objs",
    "second_herald_choice",
    "non_obj_objectives",
    "low_elo_mid_grouping",
    "support_jg_share_carry",
    "kuraki_bush",
    "inhibitor_double_edge",
    "best_inhibitor",
    "strong_weak_dynamic",
    "area_recovery_procedure"
  ],
  vision: [
    "proactive_vision",
    "track_flashes",
    "river_bush_control",
    "vision_macro",
    "vision_two_types_paradox",
    "lane_ward_mid",
    "deeper_vision_principle",
    "vision_pixel_quality"
  ],
  teamfight: [
    "chain_cc",
    "fight_roles",
    "comp_awareness",
    "front_to_back_flank",
    "not_fight",
    "space_creation"
  ],
  mindset_meta: [
    "mute_all",
    "no_tilt",
    "break_after_loss",
    "remembered_game",
    "macro_alone",
    "relativism",
    "test_limits",
    "study_proportions",
    "chat_off",
    "no_blame",
    "decision_eval_100x",
    "rules_before_exceptions",
    "carry_fear_paradox"
  ],
  micro_basics: [
    "continuous_clicking",
    "animation_lock",
    "attack_move",
    "cancel_aa_animation",
    "chase_no_aa",
    "tower_animation_window",
    "practice_tool_routine",
    "if_then_pre_plan",
    "apm_before_fight"
  ],
  skills: [
    "skillshot_angles",
    "skill_queueing",
    "bait_skillshots",
    "defensive_input_buffer",
    "champion_face_direction",
    "height_terrain_aim",
    "weaker_cc_first",
    "terrain_skillshot",
    "tenacity_aware"
  ],
  positioning: [
    "spacing_ranges",
    "positioning_triangle",
    "bush_play",
    "not_on_enemy_line",
    "zone_thinking",
    "melee_spacing",
    "ms_attack_speed_spacing"
  ],
  laning_micro: [
    "pre_first_wave",
    "trade_patterns",
    "cs_under_tower",
    "value_spells",
    "game_mechanics",
    "runes_items",
    "cs_timers",
    "aa_distance_timing",
    "minion_aggro_swap",
    "setup_minion_hp",
    "tower_aggro_target",
    "check_items_on_exit",
    "doran_second_wind_play",
    "bone_plating_break",
    "phase_rush_save"
  ],
  max: [
    "time_max",
    "resources_max",
    "zero_plus",
    "smartcast_dash",
    "fountain_end",
    "recall_under_tower",
    "burn_pre_recall",
    "proximity_next_action",
    "camp_dot_leave",
    "cd_around_play",
    "cannon_wave_value",
    "tower_tank_max_hp",
    "gold_spend_pre_fight",
    "potion_early_in_fight",
    "trinket_2_stacks",
    "body_vision",
    "setup_hierarchy"
  ],
  settings: [
    "game_settings",
    "extra_game_settings"
  ],

  // ---------- SOLOQ ----------
  soloq_system: [
    "mmr_understanding",
    "lp_gains_explained",
    "statistics_4v5",
    "server_choice",
    "duo_value",
    "dodge_decision"
  ],
  soloq_pre_game: [
    "pre_game_physical",
    "pre_game_environment",
    "pre_game_goal",
    "pre_game_mood_check"
  ],
  soloq_mindset: [
    "mindset_winrate_byproduct",
    "mindset_assume_enemy_good",
    "mindset_enemy_can_mistake",
    "mindset_future_not_past",
    "mindset_proactive",
    "mindset_game_of_errors",
    "mindset_no_follow_bad",
    "mindset_no_generalizations",
    "mindset_no_low_high_split"
  ],
  soloq_people: [
    "ppl_mute_first",
    "ppl_no_response_tox",
    "ppl_afk_keep_playing",
    "ppl_smurf_no_panic",
    "ppl_own_tox_cost",
    "ppl_no_save_losing_lane"
  ],
  soloq_post_game: [
    "post_review_goal",
    "post_break_3_5",
    "post_analyze_cold",
    "post_no_auto_queue",
    "post_universal_lessons"
  ],
  soloq_discipline: [
    "disc_one_role",
    "disc_small_pool",
    "disc_games_count",
    "disc_games_vs_watching",
    "disc_no_off_modes",
    "disc_small_steps",
    "focus_resource_mgmt",
    "focus_inner_dialog",
    "focus_environment"
  ],
  soloq_errors: [
    "err_8_areas",
    "err_no_surrender",
    "stat_winrate_misleading",
    "stat_kda_misleading",
    "stat_damage_misleading",
    "stuck_no_discipline",
    "stuck_no_comfort_exit",
    "stuck_blame_others",
    "stuck_simple_solutions",
    "stuck_no_critical"
  ]
};

Object.entries(GOAL_SECTIONS).forEach(([sectionId, goalIds]) => {
  const section = SECTIONS[sectionId];
  goalIds.forEach(goalId => {
    if (!GOALS[goalId] || !section) return;
    GOALS[goalId].section = sectionId;
    GOALS[goalId].tab = section.tab;
  });
});

// Helper: list goal IDs grouped by phase
export function getGoalsByPhase() {
  const grouped = { 1: [], 2: [], 3: [], ongoing: [] };
  Object.entries(GOALS).forEach(([id, goal]) => {
    const phase = goal.phase || "ongoing";
    if (!grouped[phase]) grouped[phase] = [];
    grouped[phase].push({ id, ...goal });
  });
  Object.keys(grouped).forEach(k => {
    grouped[k].sort((a, b) => (a.order || 999) - (b.order || 999));
  });
  return grouped;
}

// Helper: get all goals as array (sorted by order)
export function getAllGoals() {
  return Object.entries(GOALS)
    .map(([id, g]) => ({ id, ...g }))
    .sort((a, b) => (a.order || 999) - (b.order || 999));
}

export function getGoalsByTab(tabId) {
  return getAllGoals()
    .filter(goal => goal.tab === tabId)
    .sort((a, b) => {
      const sectionOrder = (SECTIONS[a.section]?.order || 999) - (SECTIONS[b.section]?.order || 999);
      if (sectionOrder !== 0) return sectionOrder;
      return (a.order || 999) - (b.order || 999);
    });
}

export function getGoalsBySection(tabId = null) {
  return Object.entries(SECTIONS)
    .filter(([, section]) => !tabId || section.tab === tabId)
    .sort((a, b) => (a[1].order || 999) - (b[1].order || 999))
    .map(([sectionId, section]) => ({
      id: sectionId,
      ...section,
      goals: getAllGoals().filter(goal => goal.section === sectionId)
    }))
    .filter(section => section.goals.length > 0);
}

// Helper: get goal week label
export function getWeekLabel(goal) {
  if (goal.phase === "ongoing") return "Ciągle";
  if (goal.week) return `Tydz ${goal.week}`;
  return "—";
}
