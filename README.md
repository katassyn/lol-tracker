# Master Track / LoL

Desktopowa aplikacja do ustrukturyzowanej nauki League of Legends w oparciu o własne notatki.
Stack: **Vite + React + Tauri** (Rust). Build = ~10 MB `.exe`, zero zewnętrznych runtime'ów (poza WebView2 który jest pre-installed na Win10+).

---

## Co robi aplikacja

- **Baza wiedzy** — wszystkie zadania do nauki z notatek, podzielone na kategorie (Wave, Micro, Macro, Vision, Teamfight, Mindset, Maksymalizacje). Każde zadanie ma akordeon z pełnym opisem: co to jest, jak wykonać krok po kroku, kiedy stosować, kiedy NIE, jak sprawdzić sukces, typowe błędy.
- **Refleksja po grze** — TOTALNIE ignoruje W/L. Pyta tylko o wykonanie trenowanych zadań. Wymusza świadomy zapis błędu + jednej rzeczy która wyszła.
- **Tracker postępu** — każde zadanie ma osobny licznik gier. Po 3+ grach z ≥66% wykonań zadanie zostaje **WSTĘPNIE OPANOWANE**. Dalej: UTRWALONE (8+ gier, 75%), OPANOWANE (20+ gier, 85%). Jeśli compliance <50% po 5+ grach — flagging **WYMAGA POPRAWY**.
- **Dyscyplina sesji** — 5 min cooldown po grze, lockowanie sesji przy tilt lub "nie pamiętam gry", bez limitu dziennej liczby gier.

Wszystkie dane lokalnie w `localStorage` (przeglądarkowy WebView2). Zero internetu.

---

## 1. Prerequisites

### Windows (główny target)
- **Node.js 18+** — https://nodejs.org/ (LTS)
- **Rust** — https://rustup.rs/ → uruchom `rustup-init.exe`, default install
- **Microsoft C++ Build Tools** — https://visualstudio.microsoft.com/visual-cpp-build-tools/ → przy instalacji zaznacz "Desktop development with C++"
- **WebView2 Runtime** — pre-installed na Win10/11. Jeśli brak: https://developer.microsoft.com/microsoft-edge/webview2/

### Linux
- Node.js 18+
- Rust (rustup)
- Pakiety systemowe:
  ```bash
  sudo apt update
  sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget file libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
  ```

### macOS
- Node.js 18+
- Rust
- Xcode Command Line Tools: `xcode-select --install`

---

## 2. Instalacja i pierwszy build

```bash
# rozpakuj zip, wejdź do folderu
cd lol-tracker

# instalacja zależności node (~30s)
npm install

# tryb dev (hot reload, otwiera okno aplikacji)
npm run tauri:dev

# build produkcyjny → .exe / .msi / .app / .deb
npm run tauri:build
```

**Pierwszy `tauri:build` kompiluje cały toolchain Rust — może trwać 5-15 min.** Kolejne buildy ~1-2 min (incremental).

---

## 3. Lokalizacja gotowego .exe (Windows)

Po `npm run tauri:build` znajdziesz:

- `src-tauri/target/release/master-track.exe` — surowy plik wykonywalny (~8 MB), nie potrzebuje instalacji
- `src-tauri/target/release/bundle/msi/Master Track_2.0.0_x64_en-US.msi` — Windows Installer
- `src-tauri/target/release/bundle/nsis/Master Track_2.0.0_x64-setup.exe` — NSIS installer

Możesz uruchomić bezpośrednio `.exe` z `target/release/` — nie wymaga instalatora. Dane przechowywane w lokalnym WebView2 storage (per-user, zachowane między uruchomieniami).

---

## 4. Struktura projektu

```
lol-tracker/
├── index.html                  # Vite entry
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                # React mount
│   ├── App.jsx                 # ⭐ CAŁA APKA — 2300+ linii logiki + UI
│   └── index.css               # Fonts (JetBrains Mono + Archivo Black z Google Fonts)
└── src-tauri/
    ├── Cargo.toml              # Rust deps
    ├── build.rs
    ├── tauri.conf.json         # Window config, bundle settings
    ├── icons/                  # PNG/ICO/ICNS dla bundle
    └── src/main.rs             # Tauri entry (minimal)
```

**Cały kod logiki gier i UI jest w `src/App.jsx`.** Plik samowystarczalny — żeby zmienić zadania, edytujesz obiekt `GOALS` na górze pliku. Każde zadanie to:

```js
goal_id: {
  label: "Nazwa wyświetlana",
  category: "wave",  // jedna z CATEGORIES
  short: "Krótkie hasło wyświetlane w karcie zwiniętej",
  details: {
    what: "Co to jest i dlaczego ma znaczenie",
    how: ["Krok 1", "Krok 2", "..."],
    when: "Kiedy stosować",
    whenNot: "Kiedy NIE",
    success: "Kryterium sukcesu (do refleksji)",
    mistakes: ["Błąd 1", "Błąd 2"],
    notes: "Opcjonalna notka"
  }
}
```

Po dodaniu zadania — pojawi się automatycznie w **Bazie wiedzy** pod swoją kategorią.

---

## 5. Konfiguracja progu masterowania

W `src/App.jsx`, na górze pliku znajduje się obiekt `MASTERY`:

```js
const MASTERY = {
  MIN_GAMES_FOR_INITIAL: 3,        // WSTĘPNIE OPANOWANE: minimum gier
  COMPLIANCE_FOR_INITIAL: 66,      // WSTĘPNIE OPANOWANE: minimum % wykonań
  MIN_GAMES_FOR_CONSOLIDATED: 8,
  COMPLIANCE_FOR_CONSOLIDATED: 75,
  MIN_GAMES_FOR_MASTERED: 20,
  COMPLIANCE_FOR_MASTERED: 85,
  WARN_MIN_GAMES: 5,
  WARN_COMPLIANCE: 50              // WYMAGA POPRAWY: alert jeśli poniżej
};
```

Zmień jeśli chcesz inne wymagania (np. 4 gry zamiast 3 do "wstępnie opanowane").

---

## 6. Backup danych

W zakładce **OPCJE → EKSPORT / IMPORT**:
- POBIERZ JSON — pobiera `master-track-backup-YYYY-MM-DD.json` z wszystkimi grami i ustawieniami
- IMPORTUJ JSON — wczytuje z pliku (po confirm)

Dodatkowo dane siedzą lokalnie w WebView2 cache:
- Windows: `%LOCALAPPDATA%\Master Track\EBWebView\`

---

## 7. Troubleshooting

**"linker `link.exe` not found"** (Windows) → brakuje MSVC Build Tools. Zobacz Prerequisites.

**"failed to run custom build command for `tauri-build`"** → uruchom `rustup update` i ponownie `npm run tauri:build`.

**"webview2 not found"** (Windows) → zainstaluj WebView2 Runtime ze strony Microsoftu.

**Aplikacja otwiera się ale jest pusta** → otwórz DevTools (F12 lub Ctrl+Shift+I), sprawdź konsolę. Najczęściej problem z Google Fonts CDN (np. brak internetu w dev) — fontu się załaduje system fallback.

**Chcę zmienić nazwę aplikacji / identyfikator** → `src-tauri/tauri.conf.json` → `package.productName` i `tauri.bundle.identifier`.

---

## 8. Tylko web (bez Tauri)

Jeśli chcesz odpalić w przeglądarce bez kompilacji Rust:

```bash
npm install
npm run dev
# otwórz http://localhost:1420
```

Wszystko działa identycznie — `localStorage` przeglądarki przechowuje dane.

---

## Podstawowe komendy

```bash
npm run dev              # tylko frontend (przeglądarka, port 1420)
npm run build            # buduje dist/ (statyczna apka web)
npm run tauri:dev        # desktop dev z hot-reload
npm run tauri:build      # produkcyjny .exe / .msi / .app
```

---

Aplikacja stworzona pod osobiste notatki i metodologię nauki. Wszystkie wartości progowe / zadania / opisy można modyfikować w `src/App.jsx` bez przebudowy.
