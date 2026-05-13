import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Play, Square, Check, X, Clock, AlertTriangle, ChevronDown, ChevronUp,
  Save, History, Settings, AlertCircle, Target, Activity, Flame, Coffee,
  Zap, BarChart3, BookOpen, XCircle, Eye, EyeOff, GraduationCap, Trash2,
  Brain, Award, TrendingUp, Lightbulb, Map, Crosshair, Swords, Wand2
} from "lucide-react";
import {
  createDefaultSessionPlan,
  getGoalTrend,
  getRecentMistakes,
  getWeaknessSuggestions
} from "./learningLogic.js";

// ============================================================
// CONSTANTS
// ============================================================
const STORAGE_KEY = "lol_master_tracker_v1";

// Mastery thresholds for long-term skill tracking
const MASTERY = {
  MIN_GAMES_FOR_INITIAL: 3,        // wstępnie opanowane od kilku prób
  COMPLIANCE_FOR_INITIAL: 66,      // przynajmniej 2/3 zaliczone
  MIN_GAMES_FOR_CONSOLIDATED: 8,
  COMPLIANCE_FOR_CONSOLIDATED: 75,
  MIN_GAMES_FOR_MASTERED: 20,
  COMPLIANCE_FOR_MASTERED: 85,
  WARN_MIN_GAMES: 5,
  WARN_COMPLIANCE: 50
};

// ============================================================
// KNOWLEDGE BASE — wiedza z notatek, każde zadanie ma pełną sekcję
// ============================================================
const CATEGORIES = {
  early: { name: "EARLY GAME", subtitle: "Lvl 1-6, lane phase", icon: Crosshair },
  wave: { name: "WAVE MANAGEMENT", subtitle: "Fundament wszystkiego", icon: Activity },
  micro: { name: "MICRO & MECHANIKI", subtitle: "Combosy, kanclacje, smartcasty", icon: Wand2 },
  macro: { name: "MACRO MID/LATE", subtitle: "Rotacje, objektiwy, mapa", icon: Map },
  vision: { name: "WIZJA", subtitle: "Wardy, info, kontrola", icon: Eye },
  teamfight: { name: "WALKI DRUŻYNOWE", subtitle: "Pozycja, focus, mindset", icon: Swords },
  mindset: { name: "MINDSET & NAWYKI", subtitle: "Mental, dyscyplina", icon: Brain },
  max: { name: "MAKSYMALIZACJE", subtitle: "Mini-nawyki, mikro-przewagi", icon: Lightbulb }
};

const GOALS = {
  // ===== WAVE MANAGEMENT =====
  slow_push: {
    label: "Slow push",
    category: "wave",
    short: "Wyjście wcześnie, ustawienie HP nobków, 3. wave pod towerem enemy.",
    details: {
      what: "Jak najwolniejsze pushowanie fali — enemy zbiera coraz większe stacki minionów pod swoim towerem. Trzecia fala uderza w jego tower, ty masz okno czasowe na akcję poza linią. Slow push to twoje główne narzędzie do tworzenia tempa na mapie.",
      how: [
        "Dobijasz CS TYLKO ostatnim hitem. Nigdy nie wbijasz autoataka w pełne HP miniona.",
        "W matchupie range vs melee — wyjdź WCZEŚNIE w fale enemy, ustaw slow push PRZED spotkaniem fal pod twoim towerem.",
        "Szczególnie wartościowe vs mobilne carry typu Tristana/Yone — zonujesz, miniony są na różnych HP, max 1-2 CS ze spella enemy.",
        "Przed rozbiciem fal zonuj enemy mida żeby nie mógł nawet expa złapać (poke spelami).",
        "Po 3 stakach masz level difference + ~15 CS przewagi nad enemy."
      ],
      when: "Pod objektiw (smoki, herald), pod dive bota, pod deep ward w enemy jg, pod roam, pod harass nobka enemy pod jego towerem.",
      whenNot: "Jak ciebie duszą (przegrywasz MU mechanicznie) — wtedy MAX CS, min HP, info do teamu że nie schodzisz z linii.",
      success: "Trzecia fala stoi pod towerem enemy. Masz minimum 4 opcje: zejście top, zejście bot, pomoc jg, harass nobka pod towerem. Wybierasz najsilniejszą.",
      mistakes: [
        "Hard push zamiast slow (oddajesz tempo, fala pushuje się sama do enemy).",
        "Schodzenie z linii w trakcie slow pusha (tracisz fale, nie bouncuje do ciebie).",
        "Niewykonanie akcji po stworzeniu okna — czyli slow push bez celu.",
        "Stakowanie 5 fal zamiast 3 (overkill, tracisz tempo, fala i tak nie pushnie się dalej)."
      ],
      notes: "Po slow pushu ZAWSZE następuje bounce wave — wraca do ciebie. Jak zabiłeś w roamie — od razu cofaj, bounce wraca i tak."
    }
  },
  canon_recall: {
    label: "Recall na canon wave",
    category: "wave",
    short: "Hard push fali PRZED canonem → recall. Maksymalne tempo na mapie.",
    details: {
      what: "Hard push fali bezpośrednio przed canon minionem → natychmiastowy recall. Zapewnia maksymalne tempo: enemy nie zatrzyma canon fali sam (canon ma dużo HP i mocno tankuje tower), więc wracasz z itemami i pełną falą bez utraty CS.",
      how: [
        "Identyfikuj canon — co trzecia fala ma 6 nobków + 1 armorowanego (canon, większy, gruby).",
        "Fala BEZPOŚREDNIO PRZED canonem — hard push wszystkim co masz do enemy towera.",
        "Recall NA TEJ FALI (po push, ale przed pojawieniem się canon fali z bazy).",
        "Po powrocie: canon fala albo bouncuje do ciebie, albo stoi pod twoim towerem — bez utraty CS."
      ],
      when: "Każdy standardowy recall w early/mid game gdy masz ~500-800 golda na komponent itemu.",
      whenNot: "Cheat recall przez TP po lvl 1, po killu (zostajesz na cofce enemy), o 3-4 smoku przy soul point (smok wygrywa).",
      success: "Wracasz z itemami a twoja fala pushuje się sama. Brak utraty CS. Enemy traci tempo bo musi się o swoją falę zatroszczyć.",
      mistakes: [
        "Recall NA canon fali — enemy łatwo zatrzymuje canon ręcznie, ty tracisz CS pod tower agro.",
        "Recall na środku zwykłej fali — bounce gdy enemy zechce, tracisz prio.",
        "Zbyt późny recall (200 golda) — kupujesz nic, tracisz tempo niepotrzebnie."
      ]
    }
  },
  freeze: {
    label: "Freeze fali",
    category: "wave",
    short: "Trzymaj 3+ caster minionów więcej niż enemy. Nie schodzisz z linii.",
    details: {
      what: "Zatrzymanie fali blisko TWOJEGO towera. Enemy musi przyjść daleko po CS, wystawia się na ganki jg, ty bezpiecznie farmisz lub wymuszasz jego powrót/utratę zasobów.",
      how: [
        "Trigger: bounce wave wraca do ciebie (po slow pushu enemy LUB po stracie linii).",
        "Trzymaj 3+ caster minionów więcej niż enemy (2 = 50/50 niestabilne, 1 = freeze pęka).",
        "Zabijaj enemy miniony PO twoich umierających — tylko wyrównujesz licznik.",
        "Tankuj jednego enemy miniona swoim ciałem żeby nie odepchnął twoich do tyłu.",
        "CS tylko ostatnim hitem — bez harass z ręki (psujesz balans)."
      ],
      when: "Przegrywasz MU, enemy ma summonery a ty nie, czekasz na powerspike, enemy mid roamuje (zmuszasz go do strony freezed po long return).",
      whenNot: "Smok/herald aktywny (musisz biti i odpushać), twój team intuje (musisz biti dla TP), enemy jg blisko (zaraz zniszczy freeze gankiem), masz powerspike i powinieneś all-in.",
      success: "Enemy musi przejść 2/3 lane po CS, sam się wystawia na gank, twoje HP/mana pełne, dropping CS lub forcing return.",
      mistakes: [
        "Schodzenie na freezie (tracisz exp/gold — cały sens freeza umiera).",
        "Freeze gdy są objektiwy (oddajesz mapę za bezpieczeństwo, bezsens).",
        "Trzymanie tylko 1-2 więcej minionów (freeze pęka pod pierwszym pushem enemy).",
        "Bicie z ręki w czasie freeze (psujesz balans, freeze drift)."
      ]
    }
  },
  hard_push: {
    label: "Hard push",
    category: "wave",
    short: "Szybko czyścisz falę, żeby mieć czas na mapę albo bezpieczny reset.",
    details: {
      what: "Hard push to szybkie przepchnięcie pełnej fali. Daje natychmiastowe prio, pozwala dołączyć do junglera, ukarać roam przeciwnika albo wymusić jego powrót pod tower.",
      how: [
        "Użyj AA i spelli tak, żeby fala jak najszybciej weszła pod tower enemy.",
        "Jeśli enemy znika z mida i nie masz informacji, pushujesz falę i dopiero potem sprawdzasz mapę.",
        "Przed recallem czyścisz falę przed cannonem, żeby wrócić z itemami bez dużej straty CS.",
        "Po killu lub mocnym obiciu enemy zostajesz do przepchnięcia fali, jeśli sytuacja jest bezpieczna."
      ],
      when: "Przed recallem, przed dołączeniem do junglera, gdy enemy roamuje, gdy potrzebujesz natychmiastowego prio pod objective.",
      whenNot: "Nie nadużywaj hard pusha, gdy możesz zbudować slow push. Hard push bez celu tylko oddaje bounce i tempo.",
      success: "Fala weszła pod tower, przeciwnik musi ją odebrać, a ty masz wolne okno na recall, ward, roam lub objective.",
      mistakes: [
        "Hard push bez planu po fali.",
        "Zostawienie fali w połowie linii przed recallem.",
        "Push bez wizji, gdy enemy jungle/support może cię odciąć."
      ]
    }
  },
  pre_first_wave: {
    label: "Wyjście PRZED 1. falą",
    category: "early",
    short: "Pierwsza fala ma słabe agro. Wyjdź z bazy 0:25, stań przed minionami.",
    details: {
      what: "Wychodzisz z bazy PRZED pierwszą falą. Pierwsza fala ma osłabione agro — możesz stać przed nią, zabrać aktywności (invade, line ward, lvl 1 walka, scouting).",
      how: [
        "Wyjście z bazy o 0:25-0:30 (nie po fali, przed).",
        "Pozycja w buszu przed minionami lub na trójkącie.",
        "Możesz wziąć: cheese invade z jg, line ward na rzece, lvl 1 walka, scouting enemy jg startu."
      ],
      when: "Każda gra. Standard.",
      success: "Pierwszy hit na minionie z dokładnym CS, możliwy lvl 2 spike przed enemy.",
      mistakes: ["Wyjście po fali — tracisz 5-10s tempa, oddajesz initiative."]
    }
  },
  cs_timers: {
    label: "CS, levele i timery",
    category: "early",
    short: "Cannon, level 2/3/6, objective timery i CS pod towerem.",
    details: {
      what: "Timery fal, leveli i objectivów pozwalają planować 1-2 minuty wcześniej. CS pod towerem i setup HP minionów to osobna mechanika, która daje darmowe zasoby.",
      how: [
        "Solo lane: level 2 po 7 minionach, level 3 po 14, level 4 około 24 CS.",
        "Bot lane: level 2 po 9 minionach, level 3 około 21 CS.",
        "Level 6 na solo zwykle po 8. fali, jeśli nie straciłeś expa.",
        "Śledź cannon wave pod recall i objective setup.",
        "Pod towerem kontroluj HP minionów wcześniej; jeśli kilka ma low HP naraz, nie zdążysz AA wszystkiego.",
        "Stój bliżej miniona, gdy last hit musi wejść szybciej, bo pocisk leci krócej."
      ],
      when: "Laning, recall timing, plan pod smoka/heralda/grubsy, last hit pod towerem.",
      success: "Wiesz przed falą, czy grasz pod level spike, reset, objective albo bezpieczny freeze.",
      mistakes: [
        "Reagowanie na objective dopiero gdy się pojawi.",
        "Recall bez uwzględnienia cannon wave.",
        "Dopuszczanie do wielu low HP minionów pod towerem."
      ]
    }
  },

  // ===== MICRO =====
  smartcast_dash: {
    label: "Smartcast dash w powrocie",
    category: "micro",
    short: "Każdy dash kiedy CD up, w drodze na linię. Smartcasty bez wskaźnika.",
    details: {
      what: "Spele dające dash/MS używasz ZAWSZE w powrocie na linię, nie tylko w walce. Wracasz na linię 10-15s szybciej każdorazowo, multiplied przez liczbę recalli — gigantyczna oszczędność czasu w grze.",
      how: [
        "Ustawienie: smartcasty bez wskaźnika (twoja standardowa konfiguracja).",
        "Pierwszy dash zaraz po wyjściu z bazy (jeśli masz).",
        "Każdy kolejny dash gdy CD się odnawia podczas powrotu.",
        "Trzymanie spelle tylko 'na walkę' = strata 10s na każdy recall."
      ],
      when: "Powrót na linię, między akcjami w jg, każde przemieszczenie >5s.",
      success: "Wracasz na linię szybciej, masz więcej CS, jesteś częściej dostępny dla teamu.",
      mistakes: ["Trzymanie dasha 'na wszelki wypadek' — kończy się że i tak go nie używasz przed kolejnym recallem."]
    }
  },
  attack_move: {
    label: "Attack-move + kancelacja AA",
    category: "micro",
    short: "A+klik zamiast right-click. Kancelacja animacji ruchem po wystrzale pocisku.",
    details: {
      what: "Attack-move (A+klik) zamiast right-click — auto-targetuje najbliższy cel. Plus kancelacja animacji AA klikiem ruchu zaraz po wystrzale pocisku. DPS rośnie ~15-20% przy proper kicie, kluczowe w teamfightach.",
      how: [
        "Bind 'attack move' na np. A (nie na shift — shift to inny modyfikator).",
        "Wciskasz A → klik na ziemi → champion strzela do najbliższego enemy.",
        "Kanceluj animację AA klikiem ruchu (tuż po wystrzale pocisku, nie wcześniej).",
        "Praktykuj w trybie treningu — feel jest specyficzny."
      ],
      when: "Każda walka, każdy kite, każdy CS w niewygodnej pozycji.",
      success: "Strzelasz więcej AA w tym samym czasie, mniej clickujesz przypadkowo na minion zamiast champa.",
      mistakes: [
        "Right-click w walce → klikasz w minion zamiast champa.",
        "Brak kancelacji → animacja kończy się sama, tracisz tempo."
      ]
    }
  },
  skill_queueing: {
    label: "Kolejkowanie skilli z flashem",
    category: "micro",
    short: "Target spell przed Flashem. Mniej czasu na reakcję enemy.",
    details: {
      what: "Kolejkowanie skilli z Flashem polega na wybraniu targetu/spella zanim jesteś w zasięgu, a potem użyciu Flasha. Po wejściu w range spell odpala natychmiast, więc przeciwnik ma dużo mniej czasu na reakcję.",
      how: [
        "Przy spellach targetowanych kliknij spell w enemy mimo że jest jeszcze poza zasięgiem.",
        "Postać zacznie iść za targetem — wtedy Flashujesz w zasięg.",
        "Spell odpala od razu po wejściu w range, zanim enemy zdąży odflashować/dashować.",
        "Trenuj to w Practice Tool na różnych dystansach, bo timing jest feel-based."
      ],
      when: "Engage, escape, last-hit assassyna na carry, niespodziewany kill setup.",
      success: "Twój flash + spell = brak czasu na reakcję enemy. Zwykle = kill albo brak punishu.",
      mistakes: ["Flash bez spella i potem cast — dajesz 0.3s na reakcję enemy."]
    }
  },
  continuous_clicking: {
    label: "Ciągłe szybkie klikanie",
    category: "micro",
    short: "Klikasz często i blisko postaci. Reakcja na skillshot jest krótsza.",
    details: {
      what: "Szybkie, częste klikanie blisko modelu utrzymuje rękę w tempie gry. Klik daleko od postaci wydłuża ruch potrzebny do uniku; klik blisko skraca reakcję.",
      how: [
        "Klikaj dużo przez całą grę, nie tylko w momencie zagrożenia.",
        "Klikaj bardzo blisko swojej postaci, szczególnie podczas laningu i teamfightów.",
        "Practice Tool: ustaw postać między dwoma wardami i klikaj naprzemiennie tak, żeby model prawie nie ruszał się z miejsca.",
        "Łącz to z patrzeniem na minimapę w momentach animacji last hita."
      ],
      when: "Cała gra: laning, dodge, spacing, kite, teamfighty.",
      success: "Uniki są krótsze, ruch mniej paniczny, a wejście na wyższą prędkość klikania nie wymaga rozgrzewki.",
      mistakes: [
        "Klikanie daleko od postaci.",
        "Przyspieszanie dopiero wtedy, gdy skill już leci.",
        "Taniec bez celu zamiast ruchu w konkretnym momencie zagrożenia."
      ]
    }
  },
  cancel_aa_animation: {
    label: "Kancelacja animacji AA ruchem",
    category: "micro",
    short: "Po wystrzale pocisku — od razu ruch. Animacja po nie ma znaczenia.",
    details: {
      what: "Animacja AA składa się z dwóch części: WIND-UP (przygotowanie + wystrzał pocisku) i WIND-DOWN (animacja po). Wind-down nie wpływa na DPS — pocisk już leci. Możesz ją skancelować ruchem dla wyższego efektywnego DPS.",
      how: [
        "Wciśnij AA (lub atak target).",
        "OBSERWUJ moment wystrzału pocisku (champion robi gest, pocisk wylatuje).",
        "ZARAZ po wystrzale — ruch (klik na ziemi).",
        "Wind-down zostaje skancelowana, możesz od razu rzucić kolejne AA gdy CD się odnowi."
      ],
      when: "Każda walka z ranged ADC, każdy kite, kiting w teamfightach.",
      success: "Stoisz na 'A klik' wyłącznie podczas wind-up, między AA się ruszasz. Trudno cię złapać + wyższy DPS.",
      mistakes: [
        "Ruch przed wystrzałem pocisku — cancelujesz własny autoatak.",
        "Stanie do końca animacji po AA.",
        "Kancelacja bez planu ruchu, przez co wchodzisz w zasięg enemy."
      ]
    }
  },
  animation_lock: {
    label: "Lokowanie w animacji",
    category: "micro",
    short: "AA, skille, tower i miniony blokują ruch. Trafiasz, gdy enemy stoi.",
    details: {
      what: "Po AA lub użyciu spella postać przez krótki moment stoi w miejscu. Ten sam koncept dotyczy towerów, minionów i campów. To okno wykorzystujesz do pewniejszych skillshotów i bezpiecznych trade'ów.",
      how: [
        "Czekaj aż przeciwnik zacznie AA, last hit albo cast spella — wtedy jego ruch jest ograniczony.",
        "Rzucaj skillshot w momencie, gdy enemy jest zablokowany animacją, a nie losowo na max range.",
        "Pod towerem atakuj enemy wtedy, gdy tower właśnie zaczyna animację ataku w miniona.",
        "Gdy gonisz z CC, nie blokuj się niepotrzebnym AA, jeśli przez to stracisz range na kluczowy spell."
      ],
      when: "W trade'ach na linii, przy łapaniu last hitów enemy, pod towerem, przy chase'u z CC.",
      success: "Więcej skillshotów trafia w momentach, kiedy przeciwnik realnie nie może odskoczyć.",
      mistakes: [
        "Rzucanie spelli bez triggera animacji.",
        "AA podczas chase'u, które oddala cię od zasięgu CC.",
        "Ignorowanie animacji towera przy krótkich trade'ach pod nim."
      ]
    }
  },
  spacing_ranges: {
    label: "Spacing i tworzenie przestrzeni",
    category: "micro",
    short: "Wyobrażasz sobie zasięgi jako okręgi i grasz na ich granicy.",
    details: {
      what: "Spacing to balansowanie na granicy zasięgu swojego i przeciwnika. Tworzenie przestrzeni to wejście pozycją tak, żeby przeciwnik musiał się cofnąć, dzięki czemu sojusznik może farmić, bić lub przejść.",
      how: [
        "Wyobrażaj sobie okręgi zasięgu: twoje AA/spelle, enemy engage, enemy poke.",
        "Stój na granicy, gdzie ty możesz grozić akcją, a enemy nie ma łatwego wejścia.",
        "Support z CC może wejść do krzaka i kupić ADC przestrzeń do farmienia.",
        "Tank wejściem w enemy team kupuje przestrzeń dla carry; assassin flanką zmusza enemy do ochrony backline'u.",
        "Teren, tower, miniony i niewidoczni sojusznicy też tworzą przestrzeń."
      ],
      when: "Laning, bot trade'y, ustawianie pod objective, front-to-back, flanki.",
      success: "Przeciwnik oddaje pozycję lub CS bez konieczności natychmiastowej walki.",
      mistakes: [
        "Wejście w zasięg enemy bez powodu.",
        "Oddawanie krzaków i przestrzeni za darmo.",
        "Brak świadomości, kto realnie może ci przerwać zagranie."
      ]
    }
  },
  skillshot_angles: {
    label: "Trafianie skillshotów",
    category: "micro",
    short: "Celuj w nogi, rzucaj z boku i z fog'a, czekaj na trigger.",
    details: {
      what: "Skillshoty trafiają częściej, gdy rzucasz je w moment ograniczonego ruchu enemy, z kąta trudniejszego do odczytania albo spoza wizji. Celowanie w nogi modelu zwykle lepiej odpowiada hitboxowi.",
      how: [
        "Celuj w nogi/postawę modelu, nie w głowę ani górę animacji.",
        "Rzucaj pod kątem z boku — przeciwnik ma mniej oczywistą oś uniku.",
        "Używaj fog of war i pozycji poza ekranem enemy.",
        "Patrz na kierunek twarzy/modelu: często zdradza ruch lub cast.",
        "Baituj skillshoty enemy ruchem do przodu i krótką zmianą kierunku w ostatnim momencie."
      ],
      when: "Laning, setup ganków, poke przed objective, chase/escape.",
      success: "Nie spamujesz skillshotów; czekasz na moment, w którym enemy ma najmniej dobrych uników.",
      mistakes: [
        "Rzucanie zawsze frontalnie z tej samej linii.",
        "Rzucanie bez wizji i bez informacji, gdzie enemy może iść.",
        "Losowy taniec zamiast konkretnego baitowania w momencie zagrożenia."
      ]
    }
  },
  value_spells: {
    label: "Value spelli",
    category: "micro",
    short: "Spell ma realizować cel: trade, wave, oba naraz albo bait enemy.",
    details: {
      what: "Ten sam spell może mieć różną wartość: trafić tylko gracza, gracza i falę, samą falę albo wymusić złą odpowiedź enemy. Celem jest używać spelli zgodnie z planem fali i trade'u.",
      how: [
        "Przed castem zdecyduj: chcę pushować, trafić gracza, utrzymać wave czy baitować spell enemy?",
        "Jeśli możesz, ustaw spell tak, żeby trafił enemy i część wave'a.",
        "Baituj enemy do użycia spella w wave, jeśli dzięki temu fala pójdzie do ciebie.",
        "Nie pal defensywnego spella, jeśli enemy może od razu wymusić ważniejszy trade."
      ],
      when: "Każdy lane trade, wave clear, poke i przygotowanie recalla.",
      success: "Spell daje konkretną wartość mapową lub lane'ową, nie tylko 'bo cooldown był dostępny'.",
      mistakes: [
        "Pushowanie fali przypadkowym poke'iem.",
        "Heal/tarcza użyte za wcześnie, ponad realne value.",
        "Spell użyty bez związku z planem wave'a."
      ]
    }
  },
  fountain_end: {
    label: "Regen na końcu fontanny",
    category: "max",
    short: "Po recallu od razu na koniec fontanny — bliżej wyjścia.",
    details: {
      what: "Po recallu nie stoisz w środku fontanny — przesuwasz się od razu do końca, bliżej wyjścia z bazy. Mała oszczędność ~1-2s na każdy recall × 8-12 recalli w grze = 15-25s.",
      how: [
        "Po pojawieniu się w bazie → klik na koniec fontanny (najbardziej wysunięty punkt w stronę linii).",
        "Sklep otwiera się przez P niezależnie od pozycji.",
        "Wyjście z bazy = już jesteś przygotowany."
      ],
      when: "Każdy recall.",
      success: "Auto-nawyk — nigdy nie czekasz w środku fontanny.",
      mistakes: [
        "Kupowanie itemów stojąc w centrum fontanny.",
        "Kliknięcie dopiero po zamknięciu sklepu.",
        "Zły kierunek wyjścia z bazy po zakupach."
      ]
    }
  },
  recall_under_tower: {
    label: "Recall pod towerem",
    category: "max",
    short: "Gdy nikogo nie ma w pobliżu — recall pod towerem, nie w krzaku.",
    details: {
      what: "Recall pod towerem (na pierwszym lub drugim tier) jest BEZPIECZNIEJSZY niż w krzaku gdy nikogo nie widać. Tower daje tarczę, krzak daje cover ale możesz dostać reveal.",
      how: [
        "Sprawdź minimap (ostatnie 3s — gdzie są wszyscy enemy).",
        "TAB — sprawdź czy enemy mid widoczny na linii.",
        "Recall pod tower (bezpieczeństwo i krótsza ścieżka po powrocie do mid)."
      ],
      when: "Standardowy recall gdy nikogo nie widać w pobliżu.",
      whenNot: "Enemy mid zniknął z mini ostatnio — krzak bezpieczniej (tower nie pomoże przeciwko surprise gank).",
      success: "Recall jest krótszy drogą powrotną i nie giniesz przez losowy facecheck krzaka.",
      mistakes: [
        "Recall w krzaku bez informacji o enemy.",
        "Recall za daleko od linii, gdy tower był bezpieczny.",
        "Recall bez wcześniejszego sprawdzenia minimapy."
      ]
    }
  },
  burn_pre_recall: {
    label: "Spal manę/HP przed recallem",
    category: "max",
    short: "Wave clear do max, harass, dive — zaraz i tak recall.",
    details: {
      what: "Spal manę i HP tuż przed recallem. Jeśli i tak wracasz do bazy — manę odzyskasz, HP też. Każda mana niewykorzystana = strata wartości.",
      how: [
        "Wave clear do max (jeśli mana zostaje).",
        "Harass enemy jeśli wraca (lub czeka pod towerem).",
        "Trade HP — nie ma sensu wracać z pełnym HP gdy i tak recall za 5s."
      ],
      when: "Tuż przed planowanym recallem.",
      success: "Wracasz do bazy po realnym wykorzystaniu many/HP, nie po pustym staniu na zasobach.",
      mistakes: [
        "Recall z pełną maną, gdy fala mogła być dopchnięta.",
        "Wymuszanie trade'u bez sensu, gdy enemy może ci przerwać recall.",
        "Spalenie zasobów, ale zostawienie fali w złym stanie."
      ]
    }
  },
  zero_plus: {
    label: "Koncepcja 0+ / 0-",
    category: "max",
    short: "Darmowe akcje, które zwykle są neutralne, ale czasem wygrywają grę.",
    details: {
      what: "0+ to akcja, która prawie nic nie kosztuje, zwykle nie daje natychmiastowej nagrody, ale czasem przynosi duży zysk. 0- to pozornie mały błąd, który zwykle nie karze, ale raz na jakiś czas przegrywa sytuację.",
      how: [
        "Sprawdź kamerą side lane podczas bezpiecznej animacji.",
        "Pingnij missing lub summoner, jeśli informacja może komuś pomóc.",
        "Wejdź na chwilę w fog, gdy nic nie tracisz, żeby przeciwnik musiał respektować presję.",
        "Nie trzymaj dwóch stacków wardów bez użycia — to darmowa utrata informacji.",
        "Nie facecheckuj 'bo pewnie nikogo nie ma' — to klasyczne 0-."
      ],
      when: "Cała gra; szczególnie między falami, po pushu i przed objective.",
      success: "Budujesz wiele małych darmowych przewag bez ryzykowania tempa, HP ani fali.",
      mistakes: [
        "Ignorowanie małych akcji, bo pojedynczo wyglądają nieważnie.",
        "Robienie 0+ wtedy, gdy jednak kosztuje falę, tempo albo pozycję.",
        "Akceptowanie 0- na autopilocie."
      ]
    }
  },
  track_flashes: {
    label: "Track flashy enemy",
    category: "vision",
    short: "Pingaj na chat cyferki 1-5 (top/jg/mid/adc/sup). Bez flasha = łatwy gank.",
    details: {
      what: "Świadomość flash up/down dla każdego enemy. Champion bez flasha = łatwy gank dla twojego jg. Pingaj na chat cyferki żeby team też wiedział.",
      how: [
        "Po użyciu flasha enemy → ping cyferka na chat (1=top, 2=jg, 3=mid, 4=adc, 5=sup).",
        "Pamiętaj flash CD = 5 min (300s) bez ulta, 4 min (240s) z ultem.",
        "Świadomość flash up/down dla każdego enemy.",
        "Bez flash carry = łatwy gank dla twojego jg = ping smite ikon."
      ],
      when: "Cały czas. Aktualizujesz w głowie.",
      success: "Ping flash enemy = gank jg = kill. Bez ping = jg nie wie, gra obronnie.",
      mistakes: [
        "Zapamiętanie flasha tylko na 20 sekund i potem brak aktualizacji.",
        "Ping bez numeru/roli, przez co informacja jest nieczytelna.",
        "Brak wykorzystania okna bez flasha do ganku, dive'u albo presji."
      ]
    }
  },

  // ===== MACRO =====
  minimap_3s: {
    label: "Minimapa co 3 sekundy",
    category: "macro",
    short: "Po każdym CS — spojrzenie na mini. Nawyk ma być automatem.",
    details: {
      what: "Nawyk patrzenia na minimapę co maksymalnie 3 sekundy. To NIE jest opcja, to fundament zbierania informacji. Bez tego nie ma macro.",
      how: [
        "Trigger 1: każde dobicie CS (look PO ostatnim hicie, w bezruchu animacji).",
        "Trigger 2: każdy cast spela (look PO cd, gdy bezpiecznie).",
        "Trigger 3: każde wyjście z bazy / TP.",
        "Pierwsze 2 tygodnie — świadomie sprawdzaj zegar, później automat.",
        "Locked camera = zjeb. Wycentrowana raczej zawsze gorsza w macro.",
        "F1-F4 dla teammates w akcji, spacja dla siebie.",
        "TAB co 30s — sprawdzasz ITEMY enemy, nie CS/KDA."
      ],
      when: "Zawsze. Cała gra. Bez wyjątków.",
      whenNot: "Nigdy.",
      success: "Wiesz gdzie są wszyscy 5 enemy lub świadomie nie wiesz i przewidujesz przez dedukcję (cofnął 15s temu, regen 5s, ruch 10s — może być w X).",
      mistakes: [
        "Tunnel vision na CS w 1v1.",
        "Patrzenie tylko jak coś się dzieje (za późno).",
        "Locked camera ze wstydu że misclickujesz na rogach.",
        "Ignorowanie ? na minimapie (enemy roamuje, zaraz będzie problem)."
      ],
      notes: "Jeśli mini jest za daleko na monitorze — zmniejsz HUD albo przesuń mini. Setup ma znaczenie."
    }
  },
  info_collection: {
    label: "Zbieranie informacji",
    category: "vision",
    short: "Minimapa, F-keye, TAB, CS junglera i dedukcja z fog'a.",
    details: {
      what: "Dobra decyzja macro zaczyna się od informacji. Zbierasz ją z minimapy, kamery, TAB-a, licznika CS junglera, zniknięć z mapy i drobnych sygnałów typu mana/HP/summonery.",
      how: [
        "Minimapa co kilka sekund, najlepiej po last hicie albo podczas własnej animacji.",
        "F1-F4 na sojuszników, spacja na siebie. Locked camera ogranicza czytanie mapy.",
        "TAB: patrz na level, itemy, kluczowe defensywy i '?' przy przeciwnikach.",
        "Jungle tracking: jeden camp = 4 CS, więc licznik CS mówi, co mogło być zrobione i co zaraz wstaje.",
        "Fog tracking: gdy ktoś znika, dolicz recall, regen i czas dojścia; wyobrażaj sobie rosnący zasięg, gdzie może być."
      ],
      when: "Cała gra, szczególnie przed pushem, roamem, wejściem do rzeki i objective.",
      success: "Podejmujesz decyzję na podstawie prawdopodobnego położenia enemy, a nie dopiero gdy zobaczysz ich na ekranie.",
      mistakes: [
        "Patrzenie na KDA zamiast itemów i leveli.",
        "Brak liczenia CS junglera.",
        "Zakładanie, że zniknięty support na pewno cofa, zamiast rozważyć roam."
      ]
    }
  },
  game_settings: {
    label: "Ustawienia pod naukę",
    category: "micro",
    short: "Smartcasty, F-keye, dźwięki skilli, mały HUD, auto-AA off.",
    details: {
      what: "Ustawienia mają usuwać opóźnienia i poprawiać czytelność gry. Nie są celem same w sobie, ale złe ustawienia blokują mechanikę i świadomość mapy.",
      how: [
        "Smartcasty bez wskaźnika jako standard, bo indicator spowalnia wykonanie.",
        "F1-F4 na sojuszników, spacja do centrowania na sobie.",
        "Champion target only jako toggle, nie trzymany przycisk.",
        "Postacie i efekty skilli czytelne, teren może być niżej, żeby mniej rozpraszał.",
        "Dźwięki skilli zostają; muzyka off, jeśli zabiera uwagę.",
        "HUD możliwie mały, ale nadal wygodny. Auto-ataki off."
      ],
      when: "Konfiguracja przed sesją i korekta, gdy coś realnie utrudnia grę.",
      success: "Nie walczysz z interfejsem; szybciej wykonujesz akcje i szybciej czytasz ekran.",
      mistakes: [
        "Zmienianie ustawień co chwilę zamiast trenowania stabilnych nawyków.",
        "Za duży HUD zasłaniający minimapę i przestrzeń gry.",
        "Muzyka lub chat zabierające uwagę od informacji."
      ]
    }
  },
  rotation_t1: {
    label: "Rotacja po pierwszym T1",
    category: "macro",
    short: "Mid T1 → swap/jg. Bot T1 → mid. Top T1 → top zostaje.",
    details: {
      what: "Pierwszy zniszczony T1 to start mid game. Otwiera mapę. Twoja rotacja po pierwszym T1 decyduje czy ten tower był wart, czy stracony.",
      how: [
        "Po BOT T1 → ADC pushuje głęboko, ty rotujesz na mida (lub na topa jak ADC ma mały range).",
        "Po MID T1 → odpushuj mida, rotacja na strong side ALBO kradzież enemy jg.",
        "Po TOP T1 → top zostaje gdzie jest (mały range, niemobilny zostawiony = łatwy cel).",
        "Jeśli enemy zniszczył T1 → analogicznie matchuj jego rotację.",
        "Wybór strong side (bot vs top) zależy od: czyje carry tam jest, kto pushuje, gdzie smok."
      ],
      when: "Natychmiast po upadku pierwszego T1 w grze.",
      whenNot: "Jeśli nie możesz pushować głębiej po wzięciu T1 = jakbyś jej nie zabrał. Wtedy nie rotuj — odpushuj i wracaj.",
      success: "Po rotacji masz prio na nowej linii, twój team kontroluje pole gdzie idzie kolejny objektiw.",
      mistakes: [
        "Stanie na linii po wzięciu T1 (gain niewykorzystany).",
        "Top rotuje na mid (mały range = traci CS).",
        "Zostawienie ADC samego na bot po wzięciu T1 mid (łatwy cel).",
        "Branie kolejnego towera od razu zamiast objektivu."
      ]
    }
  },
  objective_from_something: {
    label: "Objektiwy Z CZEGOŚ",
    category: "macro",
    short: "Prio + wizja + wave PRZED smokiem. Nigdy 'bo fajnie'.",
    details: {
      what: "Każdy objektiw (smok, herald, baron) bierzesz Z CZEGOŚ — nigdy 'bo fajnie' lub 'bo spawned'. Czynniki: prio, tempo, siła w walce, wygrana walka, rotacja silnego herosa.",
      how: [
        "Schemat early: WAVE → WIZJA → WAVE → SMOK.",
        "Schemat z prio z mida i bota: pushujemy obie linie → schodzimy 4-5 na smoka, enemy oddaje fale albo smoka.",
        "Schemat z tempo: enemy properly z mapy (zabity, recall, dead position) → ty masz okno.",
        "Schemat z winu walki: enemy 2+ down → smok/herald za darmo.",
        "Wizja pod smoka: pinki bliżej Ciebie (rzeka), wardy głębiej w jg enemy.",
        "Im więcej czynników się sumuje, tym łatwiej i bezpieczniej zabrać."
      ],
      when: "Gdy masz CO NAJMNIEJ 2 czynniki sprzyjające. 1 = ryzyko. 0 = throw.",
      whenNot: "Enemy ma prio + tempo + wizję = ODDAJ smoka i graj cross-map (zabierz coś na drugiej stronie mapy).",
      success: "Smok zabrany bez strat, lub enemy oddał za smoka coś równowartościowego (towera, falę, walkę).",
      mistakes: [
        "Smok bez wizji bo 'spawned'.",
        "Wymuszanie smoka gdy enemy ma pełną wave pod twoim T1.",
        "Branie smoka gdy team comp przegrywa walkę (oddajesz darmową walkę).",
        "Drugi herald dla golda — bezsens, jeśli nie ma czego pushować."
      ]
    }
  },
  prio_tempo: {
    label: "Prio i tempo",
    category: "macro",
    short: "Prio = fala przed enemy. Tempo = przewaga czasu.",
    details: {
      what: "Prio to przepchnięcie fali przed przeciwnikiem. Tempo to przewaga czasu: możesz coś zrobić przed nim. Nie da się mieć tempa cały czas, więc ważne jest kiedy je wydajesz, oddajesz albo matchujesz.",
      how: [
        "Podstawowy łańcuch: wave → objective → wave → objective.",
        "Tempo indywidualne: recall przed lane opponentem albo szybszy powrót na mapę.",
        "Tempo drużynowe: twoja drużyna jest już na mapie, a enemy dopiero resetuje.",
        "Gdy enemy ma małą przewagę tempa, graj cross-map po drugiej stronie.",
        "Gdy jesteś mocno do tyłu w tempie, matchuj enemy: obrona, odbicie wizji, reset kontroli."
      ],
      when: "Każda decyzja macro: recall, objective, roam, split, obrona.",
      whenNot: "Nie bierz prio automatycznie, jeśli jesteś weak side, bez wizji, albo freeze daje większy pressure point.",
      success: "Wiesz, czy masz czas działać pierwszy, czy musisz wymienić mapę albo bronić.",
      mistakes: [
        "Pushowanie każdej fali bez celu.",
        "Oddanie fali i objective naraz.",
        "Próba contestu, gdy enemy ma tempo, wizję i pozycję."
      ]
    }
  },
  herald_map: {
    label: "Herald pod otwarcie mapy",
    category: "macro",
    short: "Mobilny mid → bot tower. Niemobilny → mid tower. Nie pod golda.",
    details: {
      what: "Herald gra się POD OTWARCIE MAPY, nie pod golda. Pierwszy herald to często bot move (prio z bota → suport schodzi i wspiera).",
      how: [
        "Mobilny mid (Akali, Talon, Yasuo) → herald na BOT tower (mobilny mid wraca na linię z TP).",
        "Niemobilny mid (Anivia, Veigar) → herald na MID tower (krótkie ścieżki, brak ryzyka).",
        "TOP tower z heralda → NIE (możesz przegrać topa niszcząc swoją własną T1 = swap).",
        "Drugi herald — niska wartość (brak platów). Ale zazwyczaj nie ma już T1 — idzie na T2."
      ],
      when: "Po killu w jg lub jak bot prio jest dobre — rotacja suporta na heralda + push.",
      whenNot: "Nie puszczaj heralda solo dla golda. Bez sensu. Czekaj na okno z teamem.",
      success: "Tower upadł, mapa otwarta na tę stronę, deep wardy na buffach enemy.",
      mistakes: [
        "Herald 'gdziekolwiek' bez planu.",
        "Puszczenie heralda na T2 zamiast T1 (T2 ma mniejszą wartość mapowo).",
        "Niezsynchronizowane z falą — herald nie ma kogo wspierać i zatrzymuje się na T1."
      ]
    }
  },
  roam_after_push: {
    label: "Roam TYLKO po slow pushu",
    category: "macro",
    short: "Bez pusha mida = -200 gold + exp. Roam = push + ward + akcja.",
    details: {
      what: "Roamowanie jest opłacalne TYLKO gdy najpierw spushowałeś mida. Roam bez pusha = -200 gold + exp na linii.",
      how: [
        "Spush mida do strong side (do bota carry, do topa renekton itd.).",
        "Pinki gotowe lub czerwona soczewka — enemy mid nie może cię widzieć schodzącego.",
        "Roam to NIE TYLKO killy — to też deep wardy (deep ward roam dla jg/bota).",
        "Po zabiciu: pomóż spushować linię teamowi (i dopiero potem wracaj na mida).",
        "Idealny gank: udajesz że pushujesz fale → enemy w ciebie wbija → cyk gank jg z bocznej."
      ],
      when: "Po spushu, gdy mid jest pod tower, enemy mid nie ma jak natychmiast cię śledzić.",
      whenNot: "Mid stoi na środku, enemy mid widzi cię na mini, nie ma kogo wesprzeć (np. bot 2x oddalonych od krzaka).",
      success: "Minimum: deep ward + powrót bez utraty CS. Maks: kill + tower + 2 wardy.",
      mistakes: [
        "Roam bez pusha (tracisz fale, enemy wraca pełny na linię gdy ty wracasz pusty).",
        "Roam gdy enemy mid cię widzi (free push dla niego).",
        "Roam tylko pod killa (też wardy są wartością, nie zawsze trzeba killować).",
        "Stanie po nieudanym roamie zamiast pomocy team push."
      ]
    }
  },
  side_resources: {
    label: "Carry mindset — side lane",
    category: "macro",
    short: "Nie stoisz w 5 na midzie. Zbierasz zasoby z side, jesteś win-con.",
    details: {
      what: "Carry mindset: jako mid jesteś najczęściej win-con. Twoja praca to zbierać zasoby (CS, exp, gold) z side lane gdy team gnije lub trzyma mid. Stanie w 5 = team comp ci stoi za plecami, nie zbierasz nic.",
      how: [
        "Po zniszczeniu T1 mid → side lane farm (top albo bot).",
        "Nie stoisz w 5 na midzie i nie flipujesz walki dla zabawy.",
        "Mid → top lub bot na CS gdy team pushuje inną linię.",
        "TP gotowy do zejścia do teamu jeśli zacznie się walka.",
        "Stanie w 5 = team comp ci stoi za plecami. Ty masz zbierać zasoby i być win-con."
      ],
      when: "Mid game od pierwszego T1. Cała mid/late phase gdy nie ma natychmiastowych walk.",
      whenNot: "Twój team właśnie gnije i potrzebuje cię na obronie barona, lub gdy enemy jest mega fed i 1v1 by cię złapali.",
      success: "Po side farm jesteś leveled, masz nowy item, jesteś gotowy zmienić walkę gdy się zacznie.",
      mistakes: [
        "Stanie z teamem 'bo trzeba być razem'.",
        "Side farm bez TP up (enemy zacznie walkę, ty nie zdążysz).",
        "Brak świadomości gdzie jest enemy mid (oni też mogą cię odciąć).",
        "Side farm w przegranej grze gdy team potrzebuje 4-1 obrony."
      ],
      notes: "Twoje własne słowa z notatek: jesteś source of damage. Nie masz prawa flipować walki gdy nie zebrałeś zasobów."
    }
  },
  splitpush_structures: {
    label: "Splitpush 4-1 i 1-3-1",
    category: "macro",
    short: "Naciskasz 2-3 linie naraz. Splitpusher ma ściągnąć minimum dwóch.",
    details: {
      what: "4-1 i 1-3-1 to struktury presji na kilku liniach. Nie oznaczają dosłownie stania czterech osób na jednej fali; chodzi o kontrolę przestrzeni, wizji i synchronizację fal.",
      how: [
        "4-1: jedna osoba na side, reszta kontroluje mid/jungle między liniami.",
        "Splitpusher musi samodzielnie wymuszać zejście co najmniej dwóch enemy albo grozić towerem.",
        "Jeśli enemy wysyła wielu na side, reszta drużyny bierze mid/objective.",
        "Jeśli enemy zostawia jednego na side, support/jungle mogą zejść i zrobić 3v1.",
        "1-3-1 wymaga dwóch silnych side'ów i dużej przewagi; bez tego jest ryzykowne.",
        "Synchronizuj fale, żeby enemy musiał odpowiadać na kilka miejsc naraz."
      ],
      when: "Po T1, przy grze o T2, z dobrą wizją i splitpusherem zdolnym utrzymać presję.",
      whenNot: "Bez wizji w enemy jungle, bez side threatu, gdy team nie może bezpiecznie stać na midzie.",
      success: "Enemy traci tower, objective albo musi oddać zasoby na jednej z linii.",
      mistakes: [
        "Pięć osób na jednej linii bez dużego tempa.",
        "Splitpusher pushuje bez informacji i ginie 1v3.",
        "Brak synchronizacji fal — enemy czyści jedną po drugiej."
      ]
    }
  },
  map_sync: {
    label: "Synchronizacja mapy",
    category: "macro",
    short: "Fale, objective, item spike, jungler i pozycja teamu muszą się zgadzać.",
    details: {
      what: "Synchronizacja mapy to ustawienie fal i ruchu graczy tak, żeby przeciwnik musiał wybierać między stratami. Dobra akcja makro dzieje się w tym samym czasie co presja na fali lub objective.",
      how: [
        "Synchronizuj fale, żeby weszły naraz albo jedna po drugiej.",
        "Pushuj w timing, w którym enemy nie może odpowiedzieć jednocześnie na falę i smoka.",
        "Opóźnij push, jeśli brakuje ci golda do ważnego item spike'a i nadal zdążysz na cel.",
        "Jeśli twój jungler chce grać akcję, fala ma tworzyć punkt presji w innym miejscu.",
        "Rysuj w głowie linię po sojusznikach: nie bądź ani za głęboko, ani bezużytecznie za daleko."
      ],
      when: "Mid/late game, objective setup, splitpush, obrona przed presją.",
      success: "Twoje ruchy są spójne z falami i teamem, więc enemy reaguje na presję zamiast grać proaktywnie.",
      mistakes: [
        "Samotny push bez linii sojuszników.",
        "Przyjście na objective bez przygotowanej fali.",
        "Stanie w miejscu i czekanie na wave, gdy możesz wejść w fog i kupić presję."
      ]
    }
  },

  // ===== VISION =====
  proactive_vision: {
    label: "Proaktywna wizja",
    category: "vision",
    short: "Pinki bliżej (do obrony), wardy głębiej (info). Raptors ward 1:15.",
    details: {
      what: "Wizja nie do bronienia siebie, ale do INFORMACJI o enemy. Pinki bliżej, wardy głębiej. Każdy ward ma cel: pod objektiw, pod carry, pod akcję.",
      how: [
        "Raptors ward o 1:15 ALBO po 2-3 fali — wizja na pathing enemy jg.",
        "Pinki w naszej rzece (control wardy bliżej, do obrony).",
        "Zwykłe wardy w enemy jg (głęboka info).",
        "Lane ward jeśli mid T1 stoi (widzimy zejścia enemy mida).",
        "Im głębsza wizja = szybsza informacja.",
        "Jeśli sprawdzasz wizję enemy — lepiej gdy nic nie ma (wiesz że enemy nie wie) niż gdy zniszczysz (oddajesz info że jesteś)."
      ],
      when: "Cały czas. Każdy ward ma cel: pod objektiw, pod carry, pod akcję.",
      whenNot: "Wardy 'w pizdę' bez planu — strata golda.",
      success: "Wiesz gdzie jest enemy jg w >70% gry, twoje akcje są informowane wizją.",
      mistakes: [
        "Wszystkie wardy bronione (basic), żaden głęboki.",
        "Wardy w 'bezpiecznym miejscu' nie dające info.",
        "Zapominanie o pinkach (sweeper enemy odsłania twoje akcje).",
        "Niszczenie enemy warda zawsze (czasem lepiej wiedzieć że tam jest niż dać info że go zniszczyłeś)."
      ]
    }
  },
  river_bush_control: {
    label: "Kontrola krzaków i rzeki",
    category: "vision",
    short: "Krzaki przy rzece blokują rotacje i dają carry bezpieczny spot.",
    details: {
      what: "Kontrola kluczowych krzaków wokół mida, rzeki i wejść do jungli decyduje, czy enemy może podejść po prio. Czasem samo stanie w obszarze jest tak samo ważne jak ward.",
      how: [
        "Przejmuj obszar między krzakiem mida a rzeką przed smokiem/heraldem.",
        "Jeśli enemy stoi już w obszarze objective, często nie może bezpiecznie podejść na mida po prio.",
        "Krzak przy river/ścianie daje niemobilnemu carry bezpieczny spot do zadawania obrażeń.",
        "Ten sam krzak może być punktem flanki dla championa szukającego wejścia od boku.",
        "Odbijanie wizji zaczynaj od krzaków, które odcinają przejście na side."
      ],
      when: "Przed objective, przy obronie/pushu T2, gdy chcesz zablokować rotacje enemy.",
      success: "Enemy musi iść dookoła, traci tempo i nie może łatwo zabrać mid prio.",
      mistakes: [
        "Ward bez kontroli pozycyjnej.",
        "Oddanie krzaka, który otwiera flankę na twoje carry.",
        "Wchodzenie po wizję bez prio i bez ludzi w pobliżu."
      ]
    }
  },

  // ===== TEAMFIGHT =====
  comp_awareness: {
    label: "Świadomość team comp",
    category: "teamfight",
    short: "Engage > Poke > Disengage > Engage. Wiesz przed walką, nie w walce.",
    details: {
      what: "Każdy team to mix: ENGAGE / POKE / DISENGAGE. Wiesz kto jest kim, wiesz która grupa twojej walki ma przewagę. Mentalna mapka comp PRZED walką, nie w trakcie.",
      how: [
        "ENGAGE > POKE (mobilni wbijają na poke carry).",
        "POKE > DISENGAGE (długi range nie da się tarczy).",
        "DISENGAGE > ENGAGE (Galio/Braum nie dają wejść).",
        "Przed walką: kto MOJE największe zagrożenie? Co zrobię żeby nie zginąć?",
        "Określ win condition team compu (ich i twojego).",
        "Pod dany comp dopasuj swoją grę: poke comp = trzymaj się tyłu, engage comp = inituj z teamem."
      ],
      when: "Przed każdą walką (myśl PRZED, nie w walce — w walce nie zdążysz).",
      success: "Wiesz przed każdą walką: gdzie staję, kto mój focus, kogo się boję, jak go unikam.",
      mistakes: [
        "Brak świadomości team compu (gra na zasadzie 'co się stanie to się stanie').",
        "Granie pod swój pick zamiast pod team.",
        "Ignorowanie disengage enemy (próba engage gdy nie zadziała)."
      ]
    }
  },
  front_to_back_flank: {
    label: "Front-to-back i flanka",
    category: "teamfight",
    short: "Silne carry grają za frontem. Flanka łamie tę strukturę.",
    details: {
      what: "Front-to-back oznacza walkę przez najbliższy cel: tank/front chroni carry, carry bije to, co może. Flanka to wejście z boku lub tyłu, które odcina carry i rozbija strukturę front-to-back.",
      how: [
        "Jeśli masz silniejsze carry, broń ich struktury i odcinaj flanki enemy.",
        "Jeśli enemy ma lepszy front-to-back, szukaj flanki albo wejścia z fog'a.",
        "Przed walką ustal, kto może flankować i z której strony.",
        "Nie stój jako carry w linii, gdzie flankujący ma darmowe wejście.",
        "Flankujący nie musi od razu zabić — samo wymuszenie cofnięcia carry kupuje przestrzeń."
      ],
      when: "Walki 5v5, objective, oblężenia, obrona przed engage.",
      success: "Albo twoje carry biją bezpiecznie zza frontu, albo twoja flanka realnie rozbija enemy backline.",
      mistakes: [
        "Carry wychodzi przed front.",
        "Brak kontroli bocznych wejść przed objective.",
        "Flanka bez synchronizacji z wejściem reszty teamu."
      ]
    }
  },
  fight_roles: {
    label: "Role w teamfightach",
    category: "teamfight",
    short: "Mag bije najbliższy cel, assassin szuka carry, support zabezpiecza team.",
    details: {
      what: "W teamfightach nie da się liczyć wszystkiego w trakcie. Przed walką musisz znać swoją rolę, największe zagrożenie i warunek wygranej obu drużyn.",
      how: [
        "Mag/control mage najczęściej bije front-lane i kontroluje przestrzeń.",
        "Assassin omija front, szuka kąta na fed carry i działa z fog'a/flanki.",
        "Support/enchanter stoi z tyłu, zabezpiecza carry i przerywa wejście enemy.",
        "Przed walką nazwij największe zagrożenie enemy i sposób uniknięcia jego kluczowego spella.",
        "Walka ma mieć jeden wspólny plan: poke, engage, disengage albo front-to-back."
      ],
      when: "Przed każdą większą walką, szczególnie 20+ minuta i objective.",
      success: "Wchodzisz w walkę z gotową odpowiedzią: gdzie stoję, kogo biję, czego unikam.",
      mistakes: [
        "Assassin bije tanka od frontu bez powodu.",
        "Mage wchodzi w backline zamiast kontrolować front.",
        "Support chase'uje kill zamiast osłaniać win condition."
      ]
    }
  },
  not_fight: {
    label: "Wiem kiedy NIE walczyć",
    category: "teamfight",
    short: "Enemy ma item spike, ty nie. Cross-map zamiast 5v5.",
    details: {
      what: "Wiedza KIEDY NIE walczyć. Cross-map > 5v5 w niekorzystnej sytuacji. Tradeoff niekorzystny = nie walcz, zabierz coś gdzie indziej.",
      how: [
        "Enemy mid ma ludena, ty brak 1st itemu → CROSS-MAP play (zabranie czegoś na drugiej stronie mapy).",
        "Enemy 5 stoi pod baronem z full HP → nie inituj. Daj barona za zamianę (T2, smok).",
        "Twój ADC daleko od teamu → nie walcz w 4. Cofnij, regroup.",
        "Twój win-con (Vayne 6 itemów) nie ma jeszcze itemów → kupuj czas, freeze.",
        "Po walce wygranej przez enemy → odpalaj T2 push gdy ich nie ma."
      ],
      when: "Gdy tradeoff jest niekorzystny: nie masz items, nie masz numbers, nie masz pozycji.",
      whenNot: "Gdy musisz reagować na ich akcję natychmiast (baron, drażoba, soul point smok).",
      success: "Nie throwujesz walk z deficytem. Czekasz na lepsze warunki, zabierasz objektiwy gdy enemy walczy.",
      mistakes: [
        "Walka 5v5 bo 'nudzi się'.",
        "Walka pod barona gdy ich ADC jest fed.",
        "Forsowanie walki gdy nie ma tempa.",
        "Brak cross-map play (wszyscy walczą zamiast pushować)."
      ]
    }
  },
  play_behind: {
    label: "Granie z tyłu = schemat",
    category: "teamfight",
    short: "Push T2, sync fal, wizja, czekanie na błąd. Cheese last resort.",
    details: {
      what: "Granie z tyłu = SCHEMAT, nie cheese. Push T2 z synchronizacją fal, deep wardy, czekanie na błąd enemy. Cheese (backdoor, splitpush sam) tylko gdy schemat nie działa.",
      how: [
        "T2 push z synchronizacją fal (twoje 2 fale uderzają T2 jednocześnie).",
        "Deep wardy w enemy jg żebyś wiedział gdzie enemy.",
        "Wizja na backdoor możliwości.",
        "Czekanie aż enemy zrobi błąd: za daleki push, samotny carry, niedbały recall.",
        "Cheese (backdoor, splitpush sam, all-in) TYLKO gdy schemat nie działa po ~10 min."
      ],
      when: "Gdy przegrywasz: nie ma prio na żadnej linii, enemy ma objektiwy, ale gra trwa.",
      whenNot: "Gdy wygrywasz — wtedy gramy schemat dominanta, nie z tyłu.",
      success: "Złapanie błędu enemy → odzyskanie 1 walki/objektivu → comeback rolling.",
      mistakes: [
        "Panika i cheese od 5 min (gra ginie szybciej).",
        "Brak schematu = chaos = throw.",
        "Czekanie pasywne (bez pushowania T2) = enemy zbiera mapę za darmo."
      ]
    }
  },

  // ===== MINDSET =====
  no_tilt: {
    label: "Świadomość tiltu",
    category: "mindset",
    short: "Tiltujesz się = sam sobie szkodzisz. Reset albo koniec.",
    details: {
      what: "Tilt = zmniejszona zdolność oceny sytuacji + zwiększona skłonność do ryzyka. Tilt jest zawsze twoim własnym wyborem — to mentalna decyzja. Sam sobie szkodzisz.",
      how: [
        "Trigger awareness: irytacja na team, ścisk w żołądku po śmierci, chęć 'pokazania' enemy.",
        "Diagnoza w 5s: czy gram lepiej czy gorzej w tej chwili niż 5 min temu?",
        "Reset: oddech (4-7-8), spacja w teamfightach (focus na pozycji), wyłącz emocje.",
        "Jeśli nie da się resetować — koniec sesji. Następna gra będzie gorsza."
      ],
      when: "Po każdej śmierci / przegranej walce / 'głupim' move teamu.",
      success: "Rozpoznajesz tilt w 30s od wystąpienia, podejmujesz decyzję (reset / koniec).",
      mistakes: [
        "Queue od razu po emocjonalnej grze.",
        "Szukanie winy w teamie zamiast decyzji, którą możesz poprawić.",
        "Granie agresywniej tylko po to, żeby 'odrobić' poprzedni błąd."
      ]
    }
  },
  mute_all: {
    label: "Czat OFF + brak narzekania",
    category: "mindset",
    short: "Mute all. Tylko pingi. Brak komentarzy na team.",
    details: {
      what: "Komunikacja w solo q daje 90% emocjonalnych kosztów, 10% wartości. Mute na start gry, tylko pingi. Brak komentarzy na team nawet w głowie — co dasz innym, to dostaniesz.",
      how: [
        "Czat OFF w ustawieniach (lub mute all na lvl 1 hotkey).",
        "Tylko pingi (smite up, missing, danger, on my way).",
        "Mental rule: nie komentujesz teamu nawet w głowie. Skupiasz się na sobie.",
        "Jeśli widzisz 'głupi' move — ZAREJESTRUJ jako fakt, NIE oceniaj."
      ],
      when: "Każda gra. Bez wyjątków.",
      success: "Po grze nie pamiętasz emocji związanych z teamem — pamiętasz tylko swoje akcje.",
      mistakes: [
        "Odpisywanie nawet wtedy, gdy masz rację.",
        "Pingowanie z frustracji zamiast informacyjnie.",
        "Analiza gry przez pryzmat teamu, a nie własnych decyzji."
      ]
    }
  },
  break_after_loss: {
    label: "Przerwa po przegranej",
    category: "mindset",
    short: "Min 5 min od kompa po przegranej. Następna gra zawsze gorzej.",
    details: {
      what: "Po przegranej gra następuje rezydualny tilt + zmęczenie. Statystycznie następna gra jest gorsza. Przerwa minimum 5 min — wstać od kompa, woda, oddech.",
      how: [
        "Po przegranej: NIE next game od razu.",
        "Wstać, oddech, woda, krótki spacer.",
        "Minimum 5 min od kompa.",
        "Po 3 przegranych z rzędu — koniec na dziś."
      ],
      when: "Każda przegrana.",
      success: "Następna gra nie jest gorsza emocjonalnie niż przegrana.",
      mistakes: [
        "Instant queue po porażce.",
        "Scrollowanie statystyk i nakręcanie złości zamiast resetu.",
        "Traktowanie przerwy jako kary, a nie elementu jakości sesji."
      ]
    }
  },
  remembered_game: {
    label: "Pamiętasz właśnie zagraną grę",
    category: "mindset",
    short: "Nie potrafisz odtworzyć przebiegu = jesteś zmęczony. Koniec.",
    details: {
      what: "Test świadomości: po grze potrafisz w 30s opowiedzieć przebieg (lane phase → mid game → ostatnia walka). Nie potrafisz = grałeś na autopilocie = zmęczony = koniec sesji.",
      how: [
        "Tuż po grze: pomyśl 'co się stało w tej grze?'",
        "Sprawdź: czy potrafisz wskazać kluczowy moment (good lub bad)?",
        "Sprawdź: czy pamiętasz przynajmniej 3 konkretne decyzje?",
        "Brak odpowiedzi = koniec sesji."
      ],
      when: "Po każdej grze.",
      success: "Wszystkie gry sesji są dla ciebie 'pamiętalne' i analyzowalne.",
      mistakes: [
        "Zapisywanie refleksji ogólnikiem bez konkretnej sytuacji.",
        "Granie dalej mimo autopilota.",
        "Mylenie wyniku gry z jakością decyzji."
      ]
    }
  }
};

const ALWAYS_ON_RULES = [
  { id: "chat_off", label: "Czat OFF (tylko pingi)" },
  { id: "break_after_loss", label: "Min 5 min przerwy po przegranej" },
  { id: "remembered_game", label: "Pamiętam właśnie zagraną grę" },
  { id: "no_blame", label: "Brak narzekania na team" }
];

const DEFAULT_STATE = {
  activeGoals: ["slow_push", "canon_recall"],
  games: [],
  sessionPlan: null,
  theme: "dark",
  todayDate: null,
  gamesToday: 0,
  lastGameEndTime: null,
  sessionLocked: false,
  sessionLockReason: null,
  preGameSnapshot: null
};

// ============================================================
// STORAGE (localStorage — działa w Tauri WebView2)
// ============================================================
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (e) {
    console.error("Load failed:", e);
  }
  return DEFAULT_STATE;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Save failed:", e);
  }
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function minutesSince(ts) {
  if (!ts) return Infinity;
  return Math.floor((Date.now() - ts) / 60000);
}


// Compute mastery progression for goal
function getMastery(gamesCount, complianceCount) {
  if (gamesCount === 0) {
    return { label: "NIE ROZPOCZĘTE", color: "#525252", level: 0, progress: 0, nextThreshold: MASTERY.MIN_GAMES_FOR_INITIAL };
  }
  const rate = gamesCount > 0 ? Math.round((complianceCount / gamesCount) * 100) : 0;

  if (gamesCount >= MASTERY.WARN_MIN_GAMES && rate < MASTERY.WARN_COMPLIANCE) {
    return { label: "WYMAGA POPRAWY", color: "#ef4444", level: -1, progress: rate, isWarning: true };
  }

  if (gamesCount >= MASTERY.MIN_GAMES_FOR_MASTERED && rate >= MASTERY.COMPLIANCE_FOR_MASTERED) {
    return { label: "OPANOWANE", color: "#22c55e", level: 3, progress: 100 };
  }
  if (gamesCount >= MASTERY.MIN_GAMES_FOR_CONSOLIDATED && rate >= MASTERY.COMPLIANCE_FOR_CONSOLIDATED) {
    return {
      label: "UTRWALONE",
      color: "#fbbf24",
      level: 2,
      progress: Math.round((gamesCount / MASTERY.MIN_GAMES_FOR_MASTERED) * 100),
      nextThreshold: MASTERY.MIN_GAMES_FOR_MASTERED,
      currentGames: gamesCount
    };
  }
  if (gamesCount >= MASTERY.MIN_GAMES_FOR_INITIAL && rate >= MASTERY.COMPLIANCE_FOR_INITIAL) {
    return {
      label: "WSTĘPNIE OPANOWANE",
      color: "#94a3b8",
      level: 1,
      progress: Math.round((gamesCount / MASTERY.MIN_GAMES_FOR_CONSOLIDATED) * 100),
      nextThreshold: MASTERY.MIN_GAMES_FOR_CONSOLIDATED,
      currentGames: gamesCount
    };
  }
  // In progress, less than 3 games OR low compliance
  return {
    label: "W TRENINGU",
    color: "#f59e0b",
    level: 0,
    progress: Math.round((gamesCount / MASTERY.MIN_GAMES_FOR_INITIAL) * 100),
    nextThreshold: MASTERY.MIN_GAMES_FOR_INITIAL,
    currentGames: gamesCount,
    rate
  };
}

// ============================================================
// VISUAL TOKENS
// ============================================================
const c = {
  bg: "#0a0a0a",
  card: "#141414",
  cardHi: "#1c1c1c",
  border: "#2a2a2a",
  borderHi: "#3a3a3a",
  text: "#f5f5f5",
  textDim: "#a3a3a3",
  textMute: "#525252",
  accent: "#ef4444",
  success: "#22c55e",
  warning: "#f59e0b",
  amber: "#fbbf24"
};

const LIGHT_THEME = {
  bg: "#f5f1e8",
  card: "#fffaf0",
  cardHi: "#f0e7d8",
  border: "#d7c8b5",
  borderHi: "#bda98f",
  text: "#18140f",
  textDim: "#5f5245",
  textMute: "#8a7a68",
  accent: "#dc2626",
  success: "#15803d",
  warning: "#b45309",
  amber: "#92400e"
};

function applyTheme(theme) {
  Object.assign(c, theme === "light" ? LIGHT_THEME : {
    bg: "#0a0a0a",
    card: "#141414",
    cardHi: "#1c1c1c",
    border: "#2a2a2a",
    borderHi: "#3a3a3a",
    text: "#f5f5f5",
    textDim: "#a3a3a3",
    textMute: "#525252",
    accent: "#ef4444",
    success: "#22c55e",
    warning: "#f59e0b",
    amber: "#fbbf24"
  });
}

const fMono = "'JetBrains Mono', monospace";
const fDisplay = "'Archivo Black', sans-serif";

// ============================================================
// UI PRIMITIVES
// ============================================================
function Btn({ children, onClick, variant = "default", disabled, style, fullWidth }) {
  const variants = {
    default: { bg: c.cardHi, border: c.border, color: c.text, hover: "#252525" },
    primary: { bg: c.accent, border: c.accent, color: "#fff", hover: "#dc2626" },
    success: { bg: c.success, border: c.success, color: "#000", hover: "#16a34a" },
    danger: { bg: "#1a0808", border: c.accent, color: c.accent, hover: "#2a0a0a" },
    ghost: { bg: "transparent", border: c.border, color: c.textDim, hover: c.cardHi },
    amber: { bg: "#1a1408", border: c.warning, color: c.warning, hover: "#2a200a" }
  };
  const v = variants[variant];
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: disabled ? "#1a1a1a" : (hover ? v.hover : v.bg),
        border: `1px solid ${disabled ? c.border : v.border}`,
        color: disabled ? c.textMute : v.color,
        fontFamily: fMono, fontWeight: 700, fontSize: "13px",
        padding: "12px 20px", cursor: disabled ? "not-allowed" : "pointer",
        textTransform: "uppercase", letterSpacing: "0.05em",
        transition: "all 0.15s", width: fullWidth ? "100%" : "auto",
        ...style
      }}
    >{children}</button>
  );
}

function Pill({ children, color = c.textDim, bg = "transparent" }) {
  return <span style={{
    fontFamily: fMono, fontSize: "10px", fontWeight: 700,
    color, background: bg, border: `1px solid ${color}`,
    padding: "3px 8px", textTransform: "uppercase", letterSpacing: "0.1em",
    display: "inline-block", whiteSpace: "nowrap"
  }}>{children}</span>;
}

function H1({ children, style }) {
  return <h1 style={{
    fontFamily: fDisplay, fontSize: "28px", color: c.text,
    margin: 0, letterSpacing: "-0.01em", lineHeight: 1, ...style
  }}>{children}</h1>;
}

function H2({ children, style }) {
  return <h2 style={{
    fontFamily: fDisplay, fontSize: "16px", color: c.text,
    margin: 0, letterSpacing: "0.02em", lineHeight: 1.1,
    textTransform: "uppercase", ...style
  }}>{children}</h2>;
}

function Label({ children, style }) {
  return <div style={{
    fontFamily: fMono, fontSize: "10px", fontWeight: 700,
    color: c.textMute, letterSpacing: "0.15em",
    textTransform: "uppercase", marginBottom: 6, ...style
  }}>{children}</div>;
}

function Text({ children, style, dim, mute }) {
  return <span style={{
    fontFamily: fMono, fontSize: "13px",
    color: mute ? c.textMute : (dim ? c.textDim : c.text),
    ...style
  }}>{children}</span>;
}

function Box({ children, style, onClick }) {
  return <div onClick={onClick} style={{
    background: c.card, border: `1px solid ${c.border}`, ...style
  }}>{children}</div>;
}

function ProgressBar({ value, color, height = 6 }) {
  return (
    <div style={{ height, background: "#1a1a1a", borderRadius: 0 }}>
      <div style={{
        height: "100%", width: `${Math.min(100, Math.max(0, value))}%`,
        background: color, transition: "width 0.3s"
      }} />
    </div>
  );
}

// ============================================================
// GOAL CARD — accordion z pełnym opisem
// ============================================================
function GoalCard({ goalId, goal, expanded, onToggleExpand, isActive, onToggleActive, stats, hideToggle }) {
  const d = goal.details;
  const mastery = useMemo(
    () => getMastery(stats?.gamesWithGoal || 0, stats?.compliance || 0),
    [stats]
  );

  return (
    <div style={{
      background: isActive ? "#0c1810" : c.card,
      border: `1px solid ${isActive ? c.success : c.border}`,
      transition: "all 0.15s"
    }}>
      {/* HEADER (clickable) */}
      <div onClick={onToggleExpand} style={{
        padding: "14px 16px", cursor: "pointer",
        display: "flex", gap: 12, alignItems: "flex-start"
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <H2 style={{ fontSize: "14px" }}>{goal.label}</H2>
            {isActive && <Pill color={c.success} bg="#0c1810">AKTYWNY</Pill>}
            {mastery.level > 0 && <Pill color={mastery.color}>{mastery.label}</Pill>}
            {mastery.isWarning && <Pill color={c.accent} bg="#1a0808">{mastery.label}</Pill>}
          </div>
          <Text dim style={{ fontSize: "12px", lineHeight: 1.4, display: "block" }}>{goal.short}</Text>

          {/* MASTERY PROGRESS BAR */}
          {stats && stats.gamesWithGoal > 0 && mastery.level < 3 && mastery.nextThreshold && (
            <div style={{ marginTop: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <Text mute style={{ fontSize: "10px" }}>
                  {mastery.currentGames}/{mastery.nextThreshold} gier do następnego poziomu
                </Text>
                {stats.gamesWithGoal >= 1 && (
                  <Text mute style={{ fontSize: "10px" }}>
                    compliance {stats.complianceRate}%
                  </Text>
                )}
              </div>
              <ProgressBar value={mastery.progress} color={mastery.color} height={4} />
            </div>
          )}

          {stats && stats.gamesWithGoal > 0 && mastery.level === 3 && (
            <div style={{ marginTop: 6, display: "flex", gap: 12 }}>
              <Text mute style={{ fontSize: "11px" }}>{stats.gamesWithGoal} gier · {stats.complianceRate}% compliance</Text>
            </div>
          )}
        </div>
        <div style={{ flexShrink: 0 }}>
          {expanded ? <ChevronUp size={18} color={c.textDim} /> : <ChevronDown size={18} color={c.textDim} />}
        </div>
      </div>

      {/* EXPANDED DETAILS */}
      {expanded && (
        <div style={{
          padding: "16px",
          borderTop: `1px solid ${c.border}`,
          display: "flex", flexDirection: "column", gap: 16
        }}>
          {d.what && (
            <div>
              <Label>CO TO JEST</Label>
              <Text dim style={{ fontSize: "12px", lineHeight: 1.5, display: "block" }}>{d.what}</Text>
            </div>
          )}
          {d.how && d.how.length > 0 && (
            <div>
              <Label>JAK WYKONAĆ (KROK PO KROKU)</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {d.how.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{
                      color: c.accent, fontFamily: fMono, fontSize: "11px", fontWeight: 800,
                      minWidth: 22, paddingTop: 1
                    }}>{String(i + 1).padStart(2, "0")}</span>
                    <Text dim style={{ fontSize: "12px", lineHeight: 1.5 }}>{step}</Text>
                  </div>
                ))}
              </div>
            </div>
          )}
          {d.when && (
            <div>
              <Label style={{ color: c.success }}>KIEDY STOSOWAĆ</Label>
              <Text dim style={{ fontSize: "12px", lineHeight: 1.5, display: "block" }}>{d.when}</Text>
            </div>
          )}
          {d.whenNot && (
            <div>
              <Label style={{ color: c.accent }}>KIEDY NIE</Label>
              <Text dim style={{ fontSize: "12px", lineHeight: 1.5, display: "block" }}>{d.whenNot}</Text>
            </div>
          )}
          {d.success && (
            <div>
              <Label style={{ color: c.amber }}>JAK SPRAWDZIĆ SUKCES (kryterium na refleksję)</Label>
              <Text dim style={{ fontSize: "12px", lineHeight: 1.5, display: "block" }}>{d.success}</Text>
            </div>
          )}
          {d.mistakes && d.mistakes.length > 0 && (
            <div>
              <Label style={{ color: c.accent }}>TYPOWE BŁĘDY</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {d.mistakes.map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <XCircle size={14} color={c.accent} style={{ marginTop: 2, flexShrink: 0 }} />
                    <Text dim style={{ fontSize: "12px", lineHeight: 1.5 }}>{m}</Text>
                  </div>
                ))}
              </div>
            </div>
          )}
          {d.notes && (
            <div style={{
              background: "#1a1408", border: `1px solid ${c.warning}`,
              padding: "10px 12px", display: "flex", gap: 10, alignItems: "flex-start"
            }}>
              <AlertCircle size={14} color={c.warning} style={{ marginTop: 2, flexShrink: 0 }} />
              <Text style={{ fontSize: "11px", lineHeight: 1.5, color: c.warning }}>{d.notes}</Text>
            </div>
          )}

          {/* STATS RECAP */}
          {stats && stats.gamesWithGoal > 0 && (
            <div style={{
              background: "#0e0e0e", padding: "12px 14px",
              border: `1px solid ${c.border}`,
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12
            }}>
              <div>
                <Label style={{ marginBottom: 2 }}>GRY TRENINGOWE</Label>
                <div style={{ fontFamily: fDisplay, fontSize: "20px", color: c.text }}>{stats.gamesWithGoal}</div>
              </div>
              <div>
                <Label style={{ marginBottom: 2 }}>ZALICZONE</Label>
                <div style={{ fontFamily: fDisplay, fontSize: "20px", color: c.success }}>{stats.compliance}</div>
              </div>
              <div>
                <Label style={{ marginBottom: 2 }}>SKUTECZNOŚĆ</Label>
                <div style={{ fontFamily: fDisplay, fontSize: "20px", color: mastery.color }}>{stats.complianceRate}%</div>
              </div>
            </div>
          )}

          {!hideToggle && (
            <Btn
              variant={isActive ? "danger" : "success"}
              onClick={(e) => { e.stopPropagation(); onToggleActive(); }}
              fullWidth
            >
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {isActive ? <><EyeOff size={14} /> WYŁĄCZ TRENING TEGO ZADANIA</>
                          : <><Eye size={14} /> WŁĄCZ TRENING TEGO ZADANIA</>}
              </span>
            </Btn>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// CHECKROW — z opcjonalnym detail expand
// ============================================================
function CheckRow({ checked, onToggle, label, desc, goalId, showDetail, onToggleDetail }) {
  return (
    <div style={{
      background: checked ? "#0c1810" : c.card,
      border: `1px solid ${checked ? c.success : c.border}`,
      transition: "all 0.15s"
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px" }}>
        <div onClick={onToggle} style={{
          width: 22, height: 22, flexShrink: 0,
          border: `2px solid ${checked ? c.success : c.textMute}`,
          background: checked ? c.success : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginTop: 1, cursor: "pointer"
        }}>
          {checked && <Check size={14} color="#000" strokeWidth={4} />}
        </div>
        <div style={{ flex: 1, cursor: "pointer" }} onClick={onToggle}>
          <div style={{
            fontFamily: fMono, fontSize: "13px", fontWeight: 700,
            color: c.text, textTransform: "uppercase", letterSpacing: "0.02em"
          }}>{label}</div>
          {desc && <div style={{
            fontFamily: fMono, fontSize: "11px", color: c.textDim,
            marginTop: 4, lineHeight: 1.4
          }}>{desc}</div>}
        </div>
        {goalId && onToggleDetail && (
          <button onClick={(e) => { e.stopPropagation(); onToggleDetail(); }} style={{
            background: "transparent", border: `1px solid ${c.border}`,
            color: c.textDim, padding: 6, cursor: "pointer", flexShrink: 0
          }}>
            {showDetail ? <ChevronUp size={14} /> : <BookOpen size={14} />}
          </button>
        )}
      </div>
      {showDetail && goalId && GOALS[goalId] && (
        <div style={{
          borderTop: `1px solid ${c.border}`,
          padding: "12px 14px", background: "#0a0a0a",
          display: "flex", flexDirection: "column", gap: 10
        }}>
          {GOALS[goalId].details.success && (
            <div>
              <Label style={{ color: c.amber, marginBottom: 4 }}>JAK SPRAWDZIĆ SUKCES</Label>
              <Text dim style={{ fontSize: "11px", lineHeight: 1.5, display: "block" }}>{GOALS[goalId].details.success}</Text>
            </div>
          )}
          {GOALS[goalId].details.mistakes && (
            <div>
              <Label style={{ color: c.accent, marginBottom: 4 }}>NIE ZALICZAJ JEŚLI...</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {GOALS[goalId].details.mistakes.slice(0, 3).map((m, i) => (
                  <Text key={i} dim style={{ fontSize: "11px", lineHeight: 1.4, display: "block" }}>· {m}</Text>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MoodPicker({ value, onChange }) {
  const options = [
    { v: "fresh", l: "ŚWIEŻY", i: Zap, c: c.success },
    { v: "ok", l: "OK", i: Activity, c: c.amber },
    { v: "tired", l: "ZMĘCZONY", i: Coffee, c: c.warning },
    { v: "tilt", l: "TILT", i: Flame, c: c.accent }
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
      {options.map(o => {
        const Icon = o.i;
        const active = value === o.v;
        return (
          <div key={o.v} onClick={() => onChange(o.v)} style={{
            padding: "14px 8px",
            background: active ? "#1a0a0a" : c.card,
            border: `2px solid ${active ? o.c : c.border}`,
            cursor: "pointer", display: "flex",
            flexDirection: "column", alignItems: "center", gap: 6,
            transition: "all 0.15s"
          }}>
            <Icon size={20} color={active ? o.c : c.textDim} strokeWidth={2.5} />
            <span style={{
              fontFamily: fMono, fontSize: "10px", fontWeight: 800,
              color: active ? o.c : c.textDim, letterSpacing: "0.1em"
            }}>{o.l}</span>
          </div>
        );
      })}
    </div>
  );
}

function goalToneColor(tone) {
  if (tone === "good") return c.success;
  if (tone === "bad") return c.accent;
  if (tone === "warning") return c.warning;
  return c.textMute;
}

function ReviewQueue({ mistakes, compact = false }) {
  if (mistakes.length === 0) return null;

  return (
    <Box style={{ padding: compact ? "12px 14px" : "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <History size={14} color={c.amber} />
        <H2 style={{ fontSize: compact ? "13px" : "15px" }}>REVIEW QUEUE</H2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {mistakes.map((item, index) => (
          <div key={item.id || index} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: c.accent, fontFamily: fMono, fontSize: "11px", fontWeight: 800, minWidth: 18 }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <Text dim style={{ fontSize: compact ? "11px" : "12px", lineHeight: 1.45 }}>{item.mistake}</Text>
          </div>
        ))}
      </div>
    </Box>
  );
}

function WeaknessSuggestions({ suggestions, onUseSuggestion }) {
  if (suggestions.length === 0) return null;

  return (
    <Box style={{ padding: "14px 16px", background: "#1a1408", borderColor: c.warning }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Lightbulb size={15} color={c.warning} />
        <H2 style={{ fontSize: "15px", color: c.warning }}>SUGESTIE NA NASTĘPNE GRY</H2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {suggestions.map(item => (
          <div key={item.id} style={{
            display: "flex", justifyContent: "space-between", gap: 12,
            alignItems: "center", borderTop: `1px solid ${c.border}`, paddingTop: 10
          }}>
            <div>
              <Text style={{ fontSize: "12px", fontWeight: 800, display: "block" }}>{item.label}</Text>
              <Text mute style={{ fontSize: "11px", display: "block", marginTop: 3 }}>{item.reason}</Text>
            </div>
            <Btn variant="amber" onClick={() => onUseSuggestion(item.id)} style={{ padding: "7px 10px", fontSize: "10px" }}>
              UŻYJ
            </Btn>
          </div>
        ))}
      </div>
    </Box>
  );
}

function SessionPlanPanel({ state, setState, recentMistakes, suggestions, compact = false }) {
  const plan = state.sessionPlan || createDefaultSessionPlan(state.activeGoals, recentMistakes);
  const activeGoalObjects = state.activeGoals.map(id => ({ id, ...GOALS[id] })).filter(g => g.label);

  const updatePlan = (patch) => {
    setState(s => ({
      ...s,
      sessionPlan: {
        ...createDefaultSessionPlan(s.activeGoals, getRecentMistakes(s.games)),
        ...(s.sessionPlan || {}),
        ...patch,
        updatedAt: Date.now()
      }
    }));
  };

  const clearPlan = () => {
    setState(s => ({ ...s, sessionPlan: null }));
  };

  return (
    <Box style={{ padding: compact ? "12px 14px" : "16px", background: "#0e0e0e" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div>
          <Label style={{ color: c.success }}>PLAN SESJI</Label>
          <H2 style={{ fontSize: compact ? "14px" : "16px" }}>Jedna intencja na najbliższą grę</H2>
        </div>
        {state.sessionPlan && (
          <Btn variant="ghost" onClick={clearPlan} style={{ padding: "7px 10px", fontSize: "10px" }}>
            RESET
          </Btn>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "1fr 1fr", gap: 10 }}>
        <div>
          <Label>Primary focus</Label>
          <select
            value={plan.primaryGoalId}
            onChange={e => updatePlan({ primaryGoalId: e.target.value })}
            style={{
              width: "100%", background: c.card, border: `1px solid ${c.border}`,
              color: c.text, padding: "10px 12px", fontFamily: fMono, fontSize: "12px", outline: "none"
            }}
          >
            <option value="">Wybierz zadanie</option>
            {activeGoalObjects.map(goal => <option key={goal.id} value={goal.id}>{goal.label}</option>)}
          </select>
        </div>
        <div>
          <Label>Secondary focus</Label>
          <select
            value={plan.secondaryGoalId}
            onChange={e => updatePlan({ secondaryGoalId: e.target.value })}
            style={{
              width: "100%", background: c.card, border: `1px solid ${c.border}`,
              color: c.text, padding: "10px 12px", fontFamily: fMono, fontSize: "12px", outline: "none"
            }}
          >
            <option value="">Opcjonalnie</option>
            {activeGoalObjects
              .filter(goal => goal.id !== plan.primaryGoalId)
              .map(goal => <option key={goal.id} value={goal.id}>{goal.label}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        <Label>Nie powtórz błędu</Label>
        <input
          value={plan.avoidMistake}
          onChange={e => updatePlan({ avoidMistake: e.target.value })}
          placeholder={recentMistakes[0]?.mistake || "np. nie roamować bez pusha"}
          style={{
            width: "100%", background: c.card, border: `1px solid ${c.border}`,
            color: c.text, padding: "10px 12px", fontFamily: fMono, fontSize: "12px", outline: "none"
          }}
        />
      </div>

      {suggestions.length > 0 && !compact && (
        <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {suggestions.map(item => (
            <Btn
              key={item.id}
              variant="ghost"
              onClick={() => updatePlan({ primaryGoalId: item.id })}
              style={{ padding: "6px 9px", fontSize: "10px" }}
            >
              {item.label}
            </Btn>
          ))}
        </div>
      )}
    </Box>
  );
}

// ============================================================
// PRE-GAME VIEW
// ============================================================
function PreGameView({ state, setState, onClose }) {
  const [mood, setMood] = useState("fresh");
  const [expandedDetails, setExpandedDetails] = useState({});
  const recentMistakes = useMemo(() => getRecentMistakes(state.games), [state.games]);
  const suggestions = useMemo(() => getWeaknessSuggestions(state.games, GOALS), [state.games]);
  const plan = state.sessionPlan || createDefaultSessionPlan(state.activeGoals, recentMistakes);
  const initialFocusGoals = [plan.primaryGoalId, plan.secondaryGoalId]
    .filter((id, index, arr) => id && state.activeGoals.includes(id) && arr.indexOf(id) === index)
    .slice(0, 2);
  const [focusGoals, setFocusGoals] = useState(initialFocusGoals);

  const activeGoals = state.activeGoals
    .map(id => ({ id, ...GOALS[id] }))
    .filter(g => g.label);

  const allReady = focusGoals.length >= 1;

  const startGame = () => {
    const snapshot = {
      startedAt: Date.now(),
      mood,
      focusGoals,
      sessionPlan: plan
    };
    setState(s => ({ ...s, preGameSnapshot: snapshot }));
    onClose();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <Label>1 / Mood check</Label>
        <MoodPicker value={mood} onChange={setMood} />
        {mood === "tilt" && (
          <div style={{
            marginTop: 10, padding: "10px 14px",
            background: "#1a0808", border: `1px solid ${c.accent}`,
            display: "flex", alignItems: "center", gap: 10
          }}>
            <AlertTriangle size={16} color={c.accent} />
            <Text style={{ color: c.accent, fontWeight: 700 }}>NIE GRAJ. Przerwa min. 1h.</Text>
          </div>
        )}
        {mood === "tired" && (
          <div style={{
            marginTop: 10, padding: "10px 14px",
            background: "#1a1408", border: `1px solid ${c.warning}`,
            display: "flex", alignItems: "center", gap: 10
          }}>
            <AlertTriangle size={16} color={c.warning} />
            <Text style={{ color: c.warning, fontWeight: 700 }}>Rozważ przerwę.</Text>
          </div>
        )}
      </div>

      <SessionPlanPanel
        state={state}
        setState={setState}
        recentMistakes={recentMistakes}
        suggestions={suggestions}
        compact
      />

      <ReviewQueue mistakes={recentMistakes} compact />

      <div>
        <Label>2 / Co trenujesz w tej grze (max 2 zadania)</Label>
        {activeGoals.length === 0 ? (
          <div style={{ padding: 16, background: c.card, border: `1px solid ${c.border}`, textAlign: "center" }}>
            <Text mute style={{ display: "block", marginBottom: 12 }}>
              Brak aktywnych zadań. Włącz zadania w zakładce BAZA WIEDZY.
            </Text>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {activeGoals.map(g => (
              <CheckRow
                key={g.id}
                checked={focusGoals.includes(g.id)}
                onToggle={() => setFocusGoals(prev =>
                  prev.includes(g.id) ? prev.filter(x => x !== g.id)
                    : (prev.length >= 2 ? prev : [...prev, g.id])
                )}
                label={g.label}
                desc={g.short}
                goalId={g.id}
                showDetail={expandedDetails[g.id]}
                onToggleDetail={() => setExpandedDetails(s => ({ ...s, [g.id]: !s[g.id] }))}
              />
            ))}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Btn variant="ghost" onClick={onClose}>ANULUJ</Btn>
        <Btn variant="primary" onClick={startGame} disabled={!allReady || mood === "tilt"} fullWidth>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Play size={14} /> ZACZYNAM GRĘ
          </span>
        </Btn>
      </div>
    </div>
  );
}

// ============================================================
// POST-GAME REFLECTION — NIE PYTAMY O W/L (kluczowe wymaganie)
// ============================================================
function PostGameView({ state, setState, onClose }) {
  const snap = state.preGameSnapshot;
  const [goalCompliance, setGoalCompliance] = useState({});
  const [alwaysOnCompliance, setAlwaysOnCompliance] = useState({});
  const [mistake, setMistake] = useState("");
  const [winThing, setWinThing] = useState("");
  const [remembered, setRemembered] = useState(null);
  const [postMood, setPostMood] = useState("ok");
  const [expandedDetails, setExpandedDetails] = useState({});

  const focusGoals = snap.focusGoals.map(id => ({ id, ...GOALS[id] })).filter(g => g.label);
  const canSave = remembered !== null && mistake.trim() && winThing.trim();

  const save = () => {
    const game = {
      id: Date.now(),
      timestamp: Date.now(),
      date: todayKey(),
      preMood: snap.mood,
      postMood,
      focusGoals: snap.focusGoals,
      goalCompliance,
      alwaysOnCompliance,
      remembered,
      mistake: mistake.trim(),
      winThing: winThing.trim(),
      durationMin: Math.round((Date.now() - snap.startedAt) / 60000)
    };

    setState(s => {
      const today = todayKey();
      const isSameDay = s.todayDate === today;
      const newGamesToday = isSameDay ? s.gamesToday + 1 : 1;

      let sessionLocked = false, sessionLockReason = null;
      if (!remembered) {
        sessionLocked = true;
        sessionLockReason = "NIE PAMIĘTASZ ZAGRANEJ GRY. Zmęczony — koniec na dziś.";
      } else if (postMood === "tilt") {
        sessionLocked = true;
        sessionLockReason = "TILT. Sam sobie szkodzisz. Przerwa min 1h.";
      }

      return {
        ...s,
        games: [game, ...s.games],
        todayDate: today, gamesToday: newGamesToday,
        lastGameEndTime: Date.now(),
        sessionLocked, sessionLockReason, preGameSnapshot: null
      };
    });
    onClose();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* MOTTO — przypomnienie że ignorujemy wynik */}
      <div style={{
        background: "#0c1810", border: `1px solid ${c.success}`,
        padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start"
      }}>
        <Brain size={18} color={c.success} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <Text style={{ color: c.success, fontWeight: 700, fontSize: "12px", display: "block", marginBottom: 4 }}>
            REFLEKSJA POZA WYNIKIEM
          </Text>
          <Text dim style={{ fontSize: "11px", lineHeight: 1.5, display: "block" }}>
            Nie pytamy o WIN/LOSS. To nie ma znaczenia dla nauki. Liczy się WYŁĄCZNIE jak wykonałeś trenowane zadania.
            Wygrałeś z gównianym wykonaniem? Strata. Przegrałeś z dobrym wykonaniem? Postęp.
          </Text>
        </div>
      </div>

      {/* META INFO */}
      <div style={{
        background: "#0e0e0e", border: `1px solid ${c.border}`,
        padding: "12px 14px", display: "flex", gap: 16,
        alignItems: "center", flexWrap: "wrap"
      }}>
        <div>
          <Label style={{ marginBottom: 2 }}>Czas gry</Label>
          <Text>{Math.round((Date.now() - snap.startedAt) / 60000)} min</Text>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 4, flexWrap: "wrap" }}>
          {focusGoals.map(g => <Pill key={g.id} color={c.amber}>{g.label}</Pill>)}
        </div>
      </div>

      {/* GŁÓWNA SEKCJA: COMPLIANCE PER GOAL */}
      <div>
        <Label style={{ color: c.success, fontSize: "11px" }}>1 / WYKONANIE TRENOWANYCH ZADAŃ</Label>
        <Text dim style={{ fontSize: "11px", display: "block", marginBottom: 10 }}>
          Czy wykonałeś trenowane zadania świadomie w kluczowych momentach? Klikaj <BookOpen size={11} style={{ display: "inline", verticalAlign: "text-bottom" }} /> aby zobaczyć kryterium.
        </Text>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {focusGoals.map(g => (
            <CheckRow
              key={g.id}
              checked={!!goalCompliance[g.id]}
              onToggle={() => setGoalCompliance(s => ({ ...s, [g.id]: !s[g.id] }))}
              label={g.label}
              desc={g.short}
              goalId={g.id}
              showDetail={expandedDetails[g.id]}
              onToggleDetail={() => setExpandedDetails(s => ({ ...s, [g.id]: !s[g.id] }))}
            />
          ))}
        </div>
      </div>

      <div>
        <Label>2 / Always-on zasady — dyscyplina sesji</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ALWAYS_ON_RULES.map(r => (
            <CheckRow
              key={r.id} checked={!!alwaysOnCompliance[r.id]}
              onToggle={() => setAlwaysOnCompliance(s => ({ ...s, [r.id]: !s[r.id] }))}
              label={r.label}
            />
          ))}
        </div>
      </div>

      <div>
        <Label>3 / Czy pamiętasz tę grę?</Label>
        <Text dim style={{ fontSize: "11px", display: "block", marginBottom: 10 }}>
          Potrafisz odtworzyć przebieg (lane → mid game → walka)? Nie potrafisz = zmęczony = koniec sesji.
        </Text>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <Btn variant={remembered === true ? "success" : "default"} onClick={() => setRemembered(true)} fullWidth>
            TAK, PAMIĘTAM
          </Btn>
          <Btn variant={remembered === false ? "danger" : "default"} onClick={() => setRemembered(false)} fullWidth>
            NIE / SŁABO
          </Btn>
        </div>
      </div>

      <div>
        <Label>4 / Jeden konkretny błąd (nie związany z W/L)</Label>
        <textarea
          value={mistake} onChange={e => setMistake(e.target.value)}
          placeholder="np. Cofnąłem nie na canon w 12 min, oddałem 4 CS"
          rows={2}
          style={{
            width: "100%", background: c.card, border: `1px solid ${c.border}`,
            color: c.text, padding: "12px 14px", fontFamily: fMono,
            fontSize: "13px", outline: "none", boxSizing: "border-box",
            resize: "vertical"
          }}
        />
      </div>

      <div>
        <Label>5 / Jedna rzecz która wyszła</Label>
        <textarea
          value={winThing} onChange={e => setWinThing(e.target.value)}
          placeholder="np. Trzy razy out-roamowałem enemy mida"
          rows={2}
          style={{
            width: "100%", background: c.card, border: `1px solid ${c.border}`,
            color: c.text, padding: "12px 14px", fontFamily: fMono,
            fontSize: "13px", outline: "none", boxSizing: "border-box",
            resize: "vertical"
          }}
        />
      </div>

      <div>
        <Label>6 / Mood po grze</Label>
        <MoodPicker value={postMood} onChange={setPostMood} />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Btn variant="ghost" onClick={onClose}>ANULUJ</Btn>
        <Btn variant="primary" onClick={save} disabled={!canSave} fullWidth>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Save size={14} /> ZAPISZ REFLEKSJĘ
          </span>
        </Btn>
      </div>
    </div>
  );
}

// ============================================================
// KNOWLEDGE BASE VIEW — wszystkie zadania, akordeon, filtr
// ============================================================
function KnowledgeView({ state, setState }) {
  const [expanded, setExpanded] = useState({});
  const [filter, setFilter] = useState("all");

  const goalStats = useMemo(() => {
    const stats = {};
    Object.keys(GOALS).forEach(id => {
      const gamesWithGoal = state.games.filter(g => g.focusGoals.includes(id));
      const compliance = gamesWithGoal.filter(g => g.goalCompliance[id]);
      stats[id] = {
        gamesWithGoal: gamesWithGoal.length,
        compliance: compliance.length,
        complianceRate: gamesWithGoal.length > 0
          ? Math.round((compliance.length / gamesWithGoal.length) * 100) : 0
      };
    });
    return stats;
  }, [state.games]);

  const toggleActive = (id) => {
    setState(s => ({
      ...s,
      activeGoals: s.activeGoals.includes(id)
        ? s.activeGoals.filter(x => x !== id)
        : [...s.activeGoals, id]
    }));
  };

  const goalsByCategory = useMemo(() => {
    const grouped = {};
    Object.keys(CATEGORIES).forEach(cat => grouped[cat] = []);
    Object.entries(GOALS).forEach(([id, g]) => {
      if (filter === "active" && !state.activeGoals.includes(id)) return;
      if (filter !== "all" && filter !== "active" && filter !== g.category) return;
      if (!grouped[g.category]) grouped[g.category] = [];
      grouped[g.category].push({ id, ...g });
    });
    return grouped;
  }, [filter, state.activeGoals]);

  const filters = [
    { id: "all", label: "WSZYSTKIE" },
    { id: "active", label: `AKTYWNE (${state.activeGoals.length})` },
    ...Object.entries(CATEGORIES).map(([id, cat]) => ({ id, label: cat.name }))
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <Text dim style={{ fontSize: "12px", display: "block", marginBottom: 12 }}>
          Każde zadanie = osobny tracker. Klikaj kartę by zobaczyć dokładną instrukcję. WŁĄCZ zadanie żeby pojawiło się w pre-game.
          Po 3+ grach z 66%+ skutecznością otrzymuje status <strong style={{ color: "#94a3b8" }}>WSTĘPNIE OPANOWANE</strong>.
        </Text>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: "6px 12px",
              background: filter === f.id ? c.accent : c.card,
              border: `1px solid ${filter === f.id ? c.accent : c.border}`,
              color: filter === f.id ? "#fff" : c.textDim,
              fontFamily: fMono, fontSize: "11px", fontWeight: 700,
              cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em"
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      {Object.entries(goalsByCategory).map(([catId, goals]) => {
        if (goals.length === 0) return null;
        const cat = CATEGORIES[catId];
        const Icon = cat.icon;
        return (
          <div key={catId}>
            <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <Icon size={18} color={c.amber} />
              <div>
                <H2>{cat.name}</H2>
                <Text mute style={{ fontSize: "11px", display: "block", marginTop: 2 }}>{cat.subtitle}</Text>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {goals.map(g => (
                <GoalCard
                  key={g.id} goalId={g.id} goal={g}
                  expanded={!!expanded[g.id]}
                  onToggleExpand={() => setExpanded(s => ({ ...s, [g.id]: !s[g.id] }))}
                  isActive={state.activeGoals.includes(g.id)}
                  onToggleActive={() => toggleActive(g.id)}
                  stats={goalStats[g.id]}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// HISTORY — bez wyniku gry, tylko refleksja
// ============================================================
function HistoryView({ state }) {
  if (state.games.length === 0) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <History size={32} color={c.textMute} style={{ marginBottom: 16 }} />
        <Text mute style={{ display: "block" }}>Brak zarejestrowanych gier.</Text>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {state.games.map(g => {
        const totalGoals = g.focusGoals.length;
        const metGoals = Object.values(g.goalCompliance).filter(Boolean).length;
        const goalRate = totalGoals > 0 ? Math.round((metGoals / totalGoals) * 100) : 0;
        const indicatorColor = goalRate >= 75 ? c.success : goalRate >= 50 ? c.warning : c.accent;

        return (
          <Box key={g.id} style={{ padding: "14px 16px" }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-start", marginBottom: 10, gap: 12
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Indykator = jakość refleksji, NIE wynik */}
                <div style={{
                  width: 40, height: 40,
                  background: "#0e0e0e",
                  border: `2px solid ${indicatorColor}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: fDisplay, fontSize: "16px",
                  color: indicatorColor
                }}>{metGoals}<span style={{ fontSize: "10px", color: c.textMute }}>/{totalGoals}</span></div>
                <div>
                  <H2 style={{ fontSize: "14px" }}>
                    Refleksja po grze
                  </H2>
                  <Text mute style={{ fontSize: "11px" }}>
                    {new Date(g.timestamp).toLocaleString("pl-PL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })} · {g.durationMin}min
                  </Text>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                <Pill color={indicatorColor}>WYKONANIE {goalRate}%</Pill>
                {!g.remembered && <Pill color={c.accent} bg="#1a0808">NIE PAMIĘTAŁ</Pill>}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
              {g.focusGoals.map(gid => {
                const goal = GOALS[gid];
                const ok = g.goalCompliance[gid];
                return goal ? (
                  <Pill key={gid} color={ok ? c.success : c.accent} bg={ok ? "#0c1810" : "#1a0808"}>
                    {ok ? "✓" : "✗"} {goal.label}
                  </Pill>
                ) : null;
              })}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "12px" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: c.accent, fontFamily: fMono, fontWeight: 700, fontSize: "11px", minWidth: 60 }}>BŁĄD</span>
                <Text dim style={{ fontSize: "12px" }}>{g.mistake}</Text>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: c.success, fontFamily: fMono, fontWeight: 700, fontSize: "11px", minWidth: 60 }}>WYSZŁO</span>
                <Text dim style={{ fontSize: "12px" }}>{g.winThing}</Text>
              </div>
            </div>
          </Box>
        );
      })}
    </div>
  );
}

// ============================================================
// STATS — fokus na compliance per cel, brak W/L
// ============================================================
function StatsView({ state }) {
  const games = state.games;

  const stats = useMemo(() => {
    if (games.length === 0) return null;

    const perGoal = {};
    Object.keys(GOALS).forEach(id => {
      const gamesWithGoal = games.filter(g => g.focusGoals.includes(id));
      const compliance = gamesWithGoal.filter(g => g.goalCompliance[id]);
      perGoal[id] = {
        gamesWithGoal: gamesWithGoal.length,
        compliance: compliance.length,
        complianceRate: gamesWithGoal.length > 0
          ? Math.round((compliance.length / gamesWithGoal.length) * 100) : 0,
        mastery: getMastery(gamesWithGoal.length, compliance.length),
        trend: getGoalTrend(games, id)
      };
    });

    const alwaysOnStats = {};
    ALWAYS_ON_RULES.forEach(r => {
      let total = 0, met = 0;
      games.forEach(g => {
        total++;
        if (g.alwaysOnCompliance?.[r.id]) met++;
      });
      alwaysOnStats[r.id] = {
        total, met,
        rate: total > 0 ? Math.round((met / total) * 100) : 0
      };
    });

    return { total: games.length, perGoal, alwaysOnStats };
  }, [games]);

  if (!stats) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <BarChart3 size={32} color={c.textMute} style={{ marginBottom: 16 }} />
        <Text mute style={{ display: "block" }}>Brak danych. Rozegraj kilka gier z refleksją.</Text>
      </div>
    );
  }

  // Group goals by mastery for summary
  const masteryGroups = { mastered: [], consolidated: [], initial: [], training: [], warning: [] };
  Object.entries(stats.perGoal).forEach(([id, s]) => {
    if (s.gamesWithGoal === 0) return;
    if (s.mastery.isWarning) masteryGroups.warning.push({ id, ...s });
    else if (s.mastery.level === 3) masteryGroups.mastered.push({ id, ...s });
    else if (s.mastery.level === 2) masteryGroups.consolidated.push({ id, ...s });
    else if (s.mastery.level === 1) masteryGroups.initial.push({ id, ...s });
    else masteryGroups.training.push({ id, ...s });
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Top stats — bez WR */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        <Box style={{ padding: "14px" }}>
          <Label>WSZYSTKIE GRY</Label>
          <div style={{ fontFamily: fDisplay, fontSize: "24px", color: c.text }}>{stats.total}</div>
          <Text mute style={{ fontSize: "11px" }}>z refleksją</Text>
        </Box>
        <Box style={{ padding: "14px" }}>
          <Label>OPANOWANE</Label>
          <div style={{ fontFamily: fDisplay, fontSize: "24px", color: c.success }}>
            {masteryGroups.mastered.length + masteryGroups.consolidated.length}
          </div>
          <Text mute style={{ fontSize: "11px" }}>zadań</Text>
        </Box>
        <Box style={{ padding: "14px" }}>
          <Label>W TRENINGU</Label>
          <div style={{ fontFamily: fDisplay, fontSize: "24px", color: c.amber }}>
            {masteryGroups.training.length + masteryGroups.initial.length}
          </div>
          <Text mute style={{ fontSize: "11px" }}>zadań aktywnych</Text>
        </Box>
      </div>
      {/* MASTERY SUMMARY */}
      <div>
        <H2 style={{ marginBottom: 12 }}>POSTĘP NAUKI ZADAŃ</H2>
        <Text dim style={{ fontSize: "12px", display: "block", marginBottom: 12 }}>
          Każde zadanie ma własny licznik gier. Trend pokazuje ostatnie 5 prób danego skilla. Po <strong>3+ grach z minimum 66% wykonań</strong> zadanie zostaje "WSTĘPNIE OPANOWANE".
        </Text>

        {masteryGroups.warning.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Label style={{ color: c.accent }}>⚠ WYMAGA POPRAWY ({masteryGroups.warning.length})</Label>
            <Box style={{ padding: "14px 16px" }}>
              {masteryGroups.warning.map((g, i, arr) => (
                <GoalProgressRow key={g.id} goal={GOALS[g.id]} stat={g} isLast={i === arr.length - 1} />
              ))}
            </Box>
          </div>
        )}

        {masteryGroups.mastered.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Label style={{ color: c.success }}>★ OPANOWANE ({masteryGroups.mastered.length})</Label>
            <Box style={{ padding: "14px 16px" }}>
              {masteryGroups.mastered.map((g, i, arr) => (
                <GoalProgressRow key={g.id} goal={GOALS[g.id]} stat={g} isLast={i === arr.length - 1} />
              ))}
            </Box>
          </div>
        )}

        {masteryGroups.consolidated.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Label style={{ color: c.amber }}>UTRWALONE ({masteryGroups.consolidated.length})</Label>
            <Box style={{ padding: "14px 16px" }}>
              {masteryGroups.consolidated.map((g, i, arr) => (
                <GoalProgressRow key={g.id} goal={GOALS[g.id]} stat={g} isLast={i === arr.length - 1} />
              ))}
            </Box>
          </div>
        )}

        {masteryGroups.initial.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Label style={{ color: "#94a3b8" }}>WSTĘPNIE OPANOWANE ({masteryGroups.initial.length})</Label>
            <Box style={{ padding: "14px 16px" }}>
              {masteryGroups.initial.map((g, i, arr) => (
                <GoalProgressRow key={g.id} goal={GOALS[g.id]} stat={g} isLast={i === arr.length - 1} />
              ))}
            </Box>
          </div>
        )}

        {masteryGroups.training.length > 0 && (
          <div>
            <Label>W TRENINGU ({masteryGroups.training.length})</Label>
            <Box style={{ padding: "14px 16px" }}>
              {masteryGroups.training.map((g, i, arr) => (
                <GoalProgressRow key={g.id} goal={GOALS[g.id]} stat={g} isLast={i === arr.length - 1} />
              ))}
            </Box>
          </div>
        )}
      </div>

      {/* Always-on */}
      <div>
        <H2 style={{ marginBottom: 12 }}>DYSCYPLINA SESJI</H2>
        <Box style={{ padding: "16px" }}>
          {ALWAYS_ON_RULES.map(r => {
            const data = stats.alwaysOnStats[r.id];
            const color = data.rate >= 90 ? c.success : data.rate >= 70 ? c.warning : c.accent;
            return (
              <div key={r.id} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <Text style={{ fontSize: "12px", fontWeight: 700 }}>{r.label}</Text>
                  <Text style={{ fontSize: "12px", color, fontWeight: 700 }}>{data.rate}%</Text>
                </div>
                <ProgressBar value={data.rate} color={color} height={5} />
              </div>
            );
          })}
        </Box>
      </div>

      {/* Recent mistakes */}
      <div>
        <H2 style={{ marginBottom: 12 }}>OSTATNIE BŁĘDY</H2>
        <Box style={{ padding: "16px" }}>
          {games.slice(0, 10).map((g, i, arr) => (
            <div key={g.id} style={{
              display: "flex", gap: 10, padding: "8px 0",
              borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : "none"
            }}>
              <span style={{ color: c.accent, fontFamily: fMono, fontSize: "11px", fontWeight: 700, minWidth: 24 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <Text dim style={{ fontSize: "12px" }}>{g.mistake}</Text>
            </div>
          ))}
        </Box>
        <Text mute style={{ fontSize: "11px", display: "block", marginTop: 10 }}>
          Przeczytaj przed każdą sesją. Powtarzające się błędy = włącz odpowiednie zadanie.
        </Text>
      </div>
    </div>
  );
}

function GoalProgressRow({ goal, stat, isLast }) {
  const trendColor = goalToneColor(stat.trend?.tone);
  return (
    <div style={{
      paddingTop: 10, paddingBottom: 10,
      borderBottom: isLast ? "none" : `1px solid ${c.border}`
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 4 }}>
        <Text style={{ fontSize: "13px", fontWeight: 700 }}>{goal.label}</Text>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {stat.trend && stat.trend.rate !== null && (
            <Pill color={trendColor}>
              {stat.trend.label} {stat.trend.passed}/{stat.trend.attempts}
            </Pill>
          )}
          <Text mute style={{ fontSize: "10px" }}>{stat.gamesWithGoal} gier · {stat.compliance} zaliczone</Text>
          <Text style={{ fontSize: "12px", color: stat.mastery.color, fontWeight: 700 }}>{stat.complianceRate}%</Text>
        </div>
      </div>
      <ProgressBar value={stat.complianceRate} color={stat.mastery.color} height={4} />
    </div>
  );
}

// ============================================================
// SETTINGS
// ============================================================
function SettingsView({ state, setState }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <H2 style={{ marginBottom: 12 }}>WYGLĄD</H2>
        <Box style={{ padding: "16px" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { id: "dark", label: "DARK" },
              { id: "light", label: "LIGHT" }
            ].map(option => (
              <Btn
                key={option.id}
                variant={(state.theme || "dark") === option.id ? "primary" : "default"}
                onClick={() => setState(s => ({ ...s, theme: option.id }))}
              >
                {option.label}
              </Btn>
            ))}
          </div>
        </Box>
      </div>

      <div>
        <H2 style={{ marginBottom: 12 }}>EKSPORT / IMPORT</H2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Btn variant="default" onClick={() => {
            const data = JSON.stringify(state, null, 2);
            const blob = new Blob([data], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `master-track-backup-${todayKey()}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}>POBIERZ JSON</Btn>
          <Btn variant="default" onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "application/json";
            input.onchange = (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                try {
                  const parsed = JSON.parse(ev.target.result);
                  if (confirm("Nadpisać aktualne dane danymi z pliku?")) {
                    setState({ ...DEFAULT_STATE, ...parsed });
                  }
                } catch (err) {
                  alert("Błąd pliku JSON.");
                }
              };
              reader.readAsText(file);
            };
            input.click();
          }}>IMPORTUJ JSON</Btn>
        </div>
      </div>

      <div>
        <H2 style={{ marginBottom: 12, color: c.accent }}>RESET</H2>
        <Btn variant="danger" onClick={() => {
          const confirmed = prompt("To skasuje wszystkie gry, ustawienia i plan sesji. Wpisz WYCZYŚĆ żeby potwierdzić.");
          if (confirmed === "WYCZYŚĆ") {
            setState({ ...DEFAULT_STATE, todayDate: todayKey() });
          } else if (confirmed !== null) {
            alert("Reset anulowany — wpisany tekst nie zgadza się z WYCZYŚĆ.");
          }
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Trash2 size={14} /> WYCZYŚĆ WSZYSTKO
          </span>
        </Btn>
      </div>

      <div>
        <H2 style={{ marginBottom: 12 }}>O APLIKACJI</H2>
        <Box style={{ padding: "14px 16px" }}>
          <Text dim style={{ fontSize: "12px", lineHeight: 1.6, display: "block" }}>
            Aplikacja stworzona na podstawie własnych notatek (Macro, Mid, Micro) i metodologii nauki.
            Kluczowa zasada: <strong style={{ color: c.success }}>refleksja niezależna od wyniku gry</strong>.
            Zadania warto trenować seriami, aż wykonanie stanie się świadome i powtarzalne.
          </Text>
        </Box>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function DashboardView({ state, setState, openPreGame, openPostGame, setView }) {
  const [, force] = useState(0);
  const [expandedDash, setExpandedDash] = useState({});

  useEffect(() => {
    const t = setInterval(() => force(v => v + 1), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const today = todayKey();
    if (state.todayDate !== today) {
      setState(s => ({ ...s, todayDate: today, gamesToday: 0, sessionLocked: false, sessionLockReason: null }));
    }
  }, [state.todayDate]);

  const inGame = !!state.preGameSnapshot;
  const minsSinceLast = minutesSince(state.lastGameEndTime);
  const cooldown = 5;
  const cooldownActive = state.lastGameEndTime && minsSinceLast < cooldown;
  const cooldownRemaining = Math.max(0, cooldown - minsSinceLast);

  const activeGoalObjects = state.activeGoals.map(id => ({ id, ...GOALS[id] })).filter(g => g.label);
  const recentMistakes = useMemo(() => getRecentMistakes(state.games), [state.games]);
  const weaknessSuggestions = useMemo(() => getWeaknessSuggestions(state.games, GOALS), [state.games]);

  const goalStats = useMemo(() => {
    const stats = {};
    Object.keys(GOALS).forEach(id => {
      const gamesWithGoal = state.games.filter(g => g.focusGoals.includes(id));
      const compliance = gamesWithGoal.filter(g => g.goalCompliance[id]);
      stats[id] = {
        gamesWithGoal: gamesWithGoal.length,
        compliance: compliance.length,
        complianceRate: gamesWithGoal.length > 0 ? Math.round((compliance.length / gamesWithGoal.length) * 100) : 0
      };
    });
    return stats;
  }, [state.games]);

  const recentGames = state.games.slice(0, 3);
  const useSuggestion = (goalId) => {
    setState(s => ({
      ...s,
      activeGoals: s.activeGoals.includes(goalId) ? s.activeGoals : [...s.activeGoals, goalId],
      sessionPlan: {
        ...createDefaultSessionPlan(s.activeGoals.includes(goalId) ? s.activeGoals : [...s.activeGoals, goalId], getRecentMistakes(s.games)),
        ...(s.sessionPlan || {}),
        primaryGoalId: goalId,
        updatedAt: Date.now()
      }
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {state.sessionLocked && (
        <div style={{
          background: "#1a0808", border: `2px solid ${c.accent}`,
          padding: "20px", display: "flex", gap: 14, alignItems: "flex-start"
        }}>
          <AlertTriangle size={24} color={c.accent} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ flex: 1 }}>
            <H2 style={{ color: c.accent, marginBottom: 6 }}>SESJA ZABLOKOWANA</H2>
            <Text style={{ display: "block", marginBottom: 12 }}>{state.sessionLockReason}</Text>
            <Btn variant="ghost" onClick={() => setState(s => ({ ...s, sessionLocked: false, sessionLockReason: null }))}>
              ROZUMIEM — ODBLOKUJ ŚWIADOMIE
            </Btn>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        <Box style={{ padding: "14px" }}>
          <Label>DZIŚ</Label>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontFamily: fDisplay, fontSize: "32px", color: c.text }}>{state.gamesToday}</span>
          </div>
          <Text mute style={{ fontSize: "11px" }}>gier z refleksją</Text>
        </Box>
        <Box style={{ padding: "14px" }}>
          <Label>OSTATNIA</Label>
          <div style={{ fontFamily: fDisplay, fontSize: "32px", color: c.text }}>
            {state.lastGameEndTime ? `${minsSinceLast}m` : "—"}
          </div>
          <Text mute style={{ fontSize: "11px" }}>
            {state.lastGameEndTime ? "temu" : "brak"}
          </Text>
        </Box>
        <Box style={{ padding: "14px" }}>
          <Label>AKTYWNYCH</Label>
          <div style={{ fontFamily: fDisplay, fontSize: "32px", color: c.amber }}>{state.activeGoals.length}</div>
          <Text mute style={{ fontSize: "11px" }}>zadań trenujesz</Text>
        </Box>
      </div>

      <SessionPlanPanel
        state={state}
        setState={setState}
        recentMistakes={recentMistakes}
        suggestions={weaknessSuggestions}
      />

      <WeaknessSuggestions suggestions={weaknessSuggestions} onUseSuggestion={useSuggestion} />

      <ReviewQueue mistakes={recentMistakes} />

      <div>
        {!inGame && (
          <>
            {cooldownActive && (
              <div style={{
                background: "#1a1408", border: `1px solid ${c.warning}`,
                padding: "14px", display: "flex", alignItems: "center", gap: 12, marginBottom: 12
              }}>
                <Clock size={18} color={c.warning} />
                <Text style={{ color: c.warning, fontWeight: 700 }}>
                  COOLDOWN PO OSTATNIEJ GRZE: {cooldownRemaining} min. Wstań od kompa.
                </Text>
              </div>
            )}
            {state.activeGoals.length === 0 && (
              <div style={{
                background: "#1a1408", border: `1px solid ${c.warning}`,
                padding: "14px", display: "flex", alignItems: "center", gap: 12, marginBottom: 12
              }}>
                <AlertCircle size={18} color={c.warning} />
                <Text style={{ color: c.warning, fontWeight: 700 }}>
                  Brak aktywnych zadań. Otwórz BAZA WIEDZY i włącz co najmniej 1.
                </Text>
              </div>
            )}
            <Btn
              variant="primary"
              onClick={openPreGame}
              disabled={state.sessionLocked || cooldownActive || state.activeGoals.length === 0}
              fullWidth style={{ padding: "20px", fontSize: "16px" }}
            >
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <Play size={18} /> ZACZNIJ GRĘ
              </span>
            </Btn>
          </>
        )}
        {inGame && (
          <>
            <Box style={{ padding: "16px 18px", marginBottom: 12, background: "#0c1810", borderColor: c.success }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <Label style={{ color: c.success }}>W TRAKCIE GRY</Label>
                  <H2 style={{ fontSize: "14px" }}>Aktywna sesja treningowa</H2>
                </div>
                <Text dim style={{ fontSize: "12px" }}>
                  Start: {new Date(state.preGameSnapshot.startedAt).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
                </Text>
              </div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid #1a3a1a` }}>
                <Label style={{ marginBottom: 8 }}>SKUPIASZ SIĘ NA:</Label>
                {state.preGameSnapshot.focusGoals.map(gid => {
                  const goal = GOALS[gid];
                  return goal ? (
                    <div key={gid} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <Target size={12} color={c.success} />
                      <Text style={{ fontSize: "12px", fontWeight: 700 }}>{goal.label}</Text>
                    </div>
                  ) : null;
                })}
              </div>
            </Box>
            <Btn variant="primary" onClick={openPostGame} fullWidth style={{ padding: "20px", fontSize: "16px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <Square size={18} /> ZAKOŃCZ GRĘ — REFLEKSJA
              </span>
            </Btn>
            <Btn variant="ghost" onClick={() => setState(s => ({ ...s, preGameSnapshot: null }))} fullWidth style={{ marginTop: 8, fontSize: "11px", padding: "8px" }}>
              Anuluj grę (bez zapisu)
            </Btn>
          </>
        )}
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <H2>TRENUJESZ ({activeGoalObjects.length})</H2>
          <Btn variant="ghost" onClick={() => setView("knowledge")} style={{ padding: "6px 12px", fontSize: "11px" }}>
            ZARZĄDZAJ →
          </Btn>
        </div>
        {activeGoalObjects.length === 0 ? (
          <Box style={{ padding: 16, textAlign: "center" }}>
            <Text mute>Brak aktywnych zadań. Włącz w zakładce BAZA WIEDZY.</Text>
          </Box>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {activeGoalObjects.map(g => (
              <GoalCard
                key={g.id} goalId={g.id} goal={g}
                expanded={!!expandedDash[g.id]}
                onToggleExpand={() => setExpandedDash(s => ({ ...s, [g.id]: !s[g.id] }))}
                isActive={true}
                onToggleActive={() => setState(s => ({
                  ...s,
                  activeGoals: s.activeGoals.filter(x => x !== g.id)
                }))}
                stats={goalStats[g.id]}
              />
            ))}
          </div>
        )}
      </div>

      {recentGames.length > 0 && (
        <div>
          <H2 style={{ marginBottom: 12 }}>OSTATNIE GRY (REFLEKSJA)</H2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {recentGames.map(g => {
              const totalGoals = g.focusGoals.length;
              const metGoals = Object.values(g.goalCompliance).filter(Boolean).length;
              const rate = totalGoals > 0 ? Math.round((metGoals / totalGoals) * 100) : 0;
              const ind = rate >= 75 ? c.success : rate >= 50 ? c.warning : c.accent;
              return (
                <Box key={g.id} style={{ padding: "10px 12px", display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{
                    width: 32, height: 32,
                    background: "#0e0e0e",
                    border: `1px solid ${ind}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: fDisplay, fontSize: "11px",
                    color: ind, flexShrink: 0
                  }}>{metGoals}/{totalGoals}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text style={{ fontSize: "12px", fontWeight: 700 }}>Wykonanie {rate}%</Text>
                    <Text mute style={{ fontSize: "10px", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {g.mistake}
                    </Text>
                  </div>
                  <Text mute style={{ fontSize: "10px", flexShrink: 0 }}>
                    {new Date(g.timestamp).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
                  </Text>
                </Box>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <H2 style={{ marginBottom: 12 }}>ZŁOTE ZASADY</H2>
        <Box style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Refleksja niezależna od W/L — liczy się tylko wykonanie zadań",
              "Tiltujesz się = sam sobie szkodzisz",
              "Skup się na sobie. Brak narzekania na team.",
              "Po przegranej — minimum 5 min od kompa",
              "Nie pamiętasz właśnie zagranej gry → koniec sesji",
              "Trenuj jeden główny temat sesji, aż wykonanie stanie się powtarzalne"
            ].map((rule, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: c.accent, fontFamily: fMono, fontSize: "11px", fontWeight: 800, minWidth: 16 }}>0{i + 1}</span>
                <Text style={{ fontSize: "12px" }}>{rule}</Text>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [state, setStateRaw] = useState(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("dashboard");
  const [modal, setModal] = useState(null);

  applyTheme(state.theme || "dark");

  useEffect(() => {
    let s = loadState();
    const today = todayKey();
    if (s.todayDate !== today) {
      s = { ...s, todayDate: today, gamesToday: 0, sessionLocked: false, sessionLockReason: null };
    }
    setStateRaw(s);
    setLoaded(true);
  }, []);

  const setState = useCallback((updater) => {
    setStateRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveState(next);
      return next;
    });
  }, []);

  if (!loaded) {
    return (
      <div style={{
        minHeight: "100vh", background: c.bg, display: "flex",
        alignItems: "center", justifyContent: "center",
        fontFamily: fMono, color: c.textMute
      }}>ładuję...</div>
    );
  }

  const tabs = [
    { id: "dashboard", label: "PANEL", icon: Target },
    { id: "knowledge", label: "BAZA WIEDZY", icon: GraduationCap },
    { id: "history", label: "HISTORIA", icon: History },
    { id: "stats", label: "POSTĘP", icon: BarChart3 },
    { id: "settings", label: "OPCJE", icon: Settings }
  ];

  return (
    <div style={{ minHeight: "100vh", background: c.bg, color: c.text, fontFamily: fMono, paddingBottom: 40 }}>
      <div style={{
        borderBottom: `1px solid ${c.border}`, padding: "20px 24px",
        position: "sticky", top: 0, background: c.bg, zIndex: 10
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto", display: "flex",
          justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12
        }}>
          <div>
            <H1 style={{ fontSize: "24px" }}>MASTER<span style={{ color: c.accent }}>.</span>TRACK</H1>
            <Text mute style={{ fontSize: "11px", display: "block", marginTop: 4, letterSpacing: "0.1em" }}>
              IMPROVE W LOLU / MASTER TRACK
            </Text>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Pill color={c.amber}>{state.activeGoals.length} ACTIVE</Pill>
            <Pill color={c.textDim}>
              {new Date().toLocaleDateString("pl-PL", { weekday: "short", day: "2-digit", month: "short" })}
            </Pill>
          </div>
        </div>
      </div>

      <div style={{
        borderBottom: `1px solid ${c.border}`, padding: "0 24px",
        position: "sticky", top: 85, background: c.bg, zIndex: 9,
        overflowX: "auto"
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto", display: "flex", gap: 0
        }}>
          {tabs.map(t => {
            const Icon = t.icon;
            const active = view === t.id;
            return (
              <div key={t.id} onClick={() => setView(t.id)} style={{
                padding: "14px 18px",
                borderBottom: `2px solid ${active ? c.accent : "transparent"}`,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                transition: "all 0.15s", whiteSpace: "nowrap"
              }}>
                <Icon size={14} color={active ? c.accent : c.textDim} />
                <span style={{
                  fontFamily: fMono, fontSize: "12px", fontWeight: 700,
                  color: active ? c.text : c.textDim, letterSpacing: "0.05em"
                }}>{t.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px" }}>
        {view === "dashboard" && (
          <DashboardView
            state={state} setState={setState}
            openPreGame={() => setModal("pregame")}
            openPostGame={() => setModal("postgame")}
            setView={setView}
          />
        )}
        {view === "knowledge" && <KnowledgeView state={state} setState={setState} />}
        {view === "history" && <HistoryView state={state} />}
        {view === "stats" && <StatsView state={state} />}
        {view === "settings" && <SettingsView state={state} setState={setState} />}
      </div>

      {modal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.85)", zIndex: 100,
          overflowY: "auto", padding: "40px 16px"
        }} onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div style={{
            maxWidth: 700, margin: "0 auto", background: c.bg,
            border: `1px solid ${c.borderHi}`, padding: "28px"
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 28, paddingBottom: 16, borderBottom: `1px solid ${c.border}`
            }}>
              <H1 style={{ fontSize: "22px" }}>{modal === "pregame" ? "PRE-GAME" : "REFLEKSJA PO GRZE"}</H1>
              <button onClick={() => setModal(null)} style={{
                background: "transparent", border: `1px solid ${c.border}`,
                color: c.textDim, padding: 8, cursor: "pointer"
              }}><X size={16} /></button>
            </div>
            {modal === "pregame" && (
              <PreGameView state={state} setState={setState} onClose={() => setModal(null)} />
            )}
            {modal === "postgame" && state.preGameSnapshot && (
              <PostGameView state={state} setState={setState} onClose={() => setModal(null)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
