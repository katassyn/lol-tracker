// ============================================================
// GOALS, CATEGORIES, PHASES — wiedza z notatek (Macro/Mid/Micro)
// Struktura inspirowana planem 12-tygodniowym (technika małych kroczków)
// ============================================================
import {
  Activity, Brain, Crosshair, Eye, Lightbulb, Map, Swords, Wand2
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

// ALWAYS-ON: zasady mierzone w każdej grze (nie wymagają wyboru jako focus)
export const ALWAYS_ON_RULES = [
  { id: "chat_off", label: "Czat OFF (tylko pingi)" },
  { id: "break_after_loss", label: "Min 5 min przerwy po przegranej" },
  { id: "remembered_game", label: "Pamiętam właśnie zagraną grę" },
  { id: "no_blame", label: "Brak narzekania na team" }
];

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
    category: "micro", phase: 2, week: 8, order: 28,
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
  }
};

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

// Helper: get goal week label
export function getWeekLabel(goal) {
  if (goal.phase === "ongoing") return "Ciągle";
  if (goal.week) return `Tydz ${goal.week}`;
  return "—";
}
