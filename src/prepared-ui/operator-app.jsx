import React from "react";

// OPERATOR — root wrapper that picks the active screen.
(function(){
  const { useEffect, useState } = React;
  const { OP_TOKENS, getOpTokens, OP_FONT_BODY, OP_FONT_DISP,
          OpSidebar, OpTopbar, OpDashboard,
          OpKnowledge, OpPreGame, OpPostGame, OpProgress,
          OpHistory, OpFirstRunWizard } = window;

  function OperatorApp({ themeMode = "dark", accent = "cyan", density = "comfortable" }) {
    const [screen, setScreen] = useState("dash");
    const [refreshTick, setRefreshTick] = useState(0); // forces re-read of SAMPLE after writes

    // Live read for dynamic titles
    const SAMPLE = window.SAMPLE;
    const preferences = SAMPLE?.preferences || { themeMode, language: "en" };
    const t = {
      ...getOpTokens({ mode: preferences.themeMode || themeMode, accent }),
      themeMode: preferences.themeMode || themeMode,
      language: preferences.language || "en",
      ui(pl, en) {
        return (preferences.language || "en") === "en" ? (en || pl) : pl;
      }
    };
    const gamesCount = SAMPLE?.HISTORY?.length || 0;
    const todayISO = SAMPLE?.TODAY || "";
    const sessionActive = !!SAMPLE?.preGameSnapshot;
    const firstRunDone = !!SAMPLE?.firstRunDone;

    // Refresh after any mutation
    const refresh = () => setRefreshTick(n => n + 1);

    useEffect(() => {
      document.documentElement.dataset.opTheme = t.themeMode;
      document.documentElement.lang = t.language === "en" ? "en" : "pl";
    }, [t.themeMode, t.language]);

    // FIRST RUN: render wizard overlay, nothing else.
    if (!firstRunDone) {
      return (
        <div data-op-density={density} style={{
          width: "100%", height: "100%",
          background: t.bg, color: t.text,
          fontFamily: OP_FONT_BODY,
          position: "relative", overflow: "hidden"
        }}>
          <OpFirstRunWizard t={t} onDone={refresh}/>
        </div>
      );
    }

    // Format today's date in PL
    const todayLabel = (() => {
      if (!todayISO) return "";
      try {
        const d = new Date(todayISO);
        return d.toLocaleDateString(t.language === "en" ? "en-US" : "pl-PL", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });
      } catch { return todayISO; }
    })();

    const titles = {
      dash: [t.ui("Dashboard", "Dashboard"), sessionActive ? t.ui(`${todayLabel} · sesja aktywna`, `${todayLabel} · active session`) : todayLabel],
      know: [t.ui("Baza wiedzy", "Knowledge base"), t.ui("Wszystkie zadania z notatek · 3 taby", "All note-based tasks · 3 tabs")],
      pre:  [t.ui("Plan sesji", "Session plan"), t.ui("Przed grą", "Before game")],
      post: [t.ui("Refleksja", "Reflection"), sessionActive ? t.ui("Po grze", "After game") : t.ui("Brak aktywnej sesji", "No active session")],
      prog: [t.ui("Tracker postępu", "Progress tracker"), t.ui("Plan 12 tygodni", "12-week plan")],
      hist: [t.ui("Historia", "History"), t.ui(`${gamesCount} ${gamesCount === 1 ? "gra" : "gier"} · bez W/L`, `${gamesCount} ${gamesCount === 1 ? "game" : "games"} · no W/L`)],
      opt:  [t.ui("Opcje", "Options"), t.ui("Champion pool · progi · dane", "Champion pool · thresholds · data")],
    };

    const [title, breadcrumb] = titles[screen] || titles.dash;

    let body;
    switch(screen){
      case "dash": body = <OpDashboard t={t} setScreen={setScreen} key={"d"+refreshTick}/>; break;
      case "know": body = <OpKnowledge t={t} key={"k"+refreshTick}/>; break;
      case "pre":  body = <OpPreGame t={t} setScreen={setScreen} refresh={refresh} key={"pre"+refreshTick}/>; break;
      case "post": body = <OpPostGame t={t} setScreen={setScreen} refresh={refresh} key={"post"+refreshTick}/>; break;
      case "prog": body = <OpProgress t={t} key={"p"+refreshTick}/>; break;
      case "hist": body = <OpHistory t={t} key={"h"+refreshTick}/>; break;
      case "opt":  body = <OptionsScreen t={t} refresh={refresh} key={"o"+refreshTick}/>; break;
      default:     body = <OpDashboard t={t}/>;
    }

    return (
      <div data-op-density={density} style={{
        width: "100%", height: "100%",
        background: t.bg, color: t.text,
        fontFamily: OP_FONT_BODY,
        display: "flex", flexDirection: "row",
        position: "relative", overflow: "hidden"
      }}>
        <OpSidebar screen={screen} setScreen={setScreen} t={t}/>
        <div style={{flex: 1, display:"flex", flexDirection:"column", minWidth: 0}}>
          <OpTopbar title={title} breadcrumb={breadcrumb} t={t}
                    onStart={()=> setScreen(sessionActive ? "post" : "pre")}
                    startLabel={sessionActive ? t.ui("Po grze", "After game") : t.ui("Zacznij grę", "Start game")}/>
          <div style={{flex: 1, minHeight: 0, position: "relative"}}>
            <div data-screen-label={`Operator · ${title}`} style={{
              position:"absolute", inset:0, overflow:"hidden",
              display:"flex", flexDirection:"column"
            }}>
              {body}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Learning mode card — used inside OptionsScreen
  function PreferencesCard({t, cardStyle, labelStyle, refresh, setSavedMessage}) {
    const SAMPLE = window.SAMPLE;
    const [prefs, setPrefs] = useState(SAMPLE.preferences || { themeMode: "dark", language: "en" });

    const savePreference = (patch) => {
      const next = { ...prefs, ...patch };
      setPrefs(next);
      SAMPLE.setPreferences(next);
      setSavedMessage(t.ui("Preferencje zapisane", "Preferences saved"));
      setTimeout(() => setSavedMessage(""), 2000);
      refresh?.();
    };

    const segmentButton = (active) => ({
      padding: "11px 8px",
      background: active ? t.accent : "transparent",
      color: active ? t.bg : t.dim,
      border: "none",
      fontFamily: OP_FONT_BODY,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing:"0.14em",
      textTransform:"uppercase",
      cursor:"pointer"
    });

    return (
      <section style={cardStyle}>
        <div>
          <h2 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: t.text,
            fontWeight: 600, margin: 0, letterSpacing:"-0.01em"}}>
            {t.ui("Wygląd i język", "Appearance and language")}
          </h2>
          <div style={{fontFamily: OP_FONT_BODY, fontSize: 11, color: t.dim, marginTop: 3}}>
            {t.ui("Motyw i język interfejsu są zapisywane lokalnie.", "Theme and interface language are stored locally.")}
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12}}>
          <div>
            <div style={{...labelStyle, marginBottom: 6}}>{t.ui("Motyw", "Theme")}</div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 0, border: `1px solid ${t.line}`}}>
              <button
                onClick={() => savePreference({ themeMode: "dark" })}
                style={segmentButton(prefs.themeMode === "dark")}
              >
                {t.ui("Ciemny", "Dark")}
              </button>
              <button
                onClick={() => savePreference({ themeMode: "light" })}
                style={segmentButton(prefs.themeMode === "light")}
              >
                {t.ui("Jasny", "Light")}
              </button>
            </div>
          </div>

          <div>
            <div style={{...labelStyle, marginBottom: 6}}>{t.ui("Język", "Language")}</div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 0, border: `1px solid ${t.line}`}}>
              <button
                onClick={() => savePreference({ language: "pl" })}
                style={segmentButton(prefs.language === "pl")}
              >
                Polski
              </button>
              <button
                onClick={() => savePreference({ language: "en" })}
                style={segmentButton(prefs.language === "en")}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {prefs.language === "en" && (
          <div style={{
            background: t.bg2,
            border: `1px solid ${t.line}`,
            padding: "10px 12px",
            fontFamily: OP_FONT_BODY,
            fontSize: 11,
            color: t.dim,
            lineHeight: 1.5
          }}>
            English mode changes the app interface. Knowledge-base lesson text remains in the original Polish notes for now.
          </div>
        )}
      </section>
    );
  }

  // Learning mode card — used inside OptionsScreen
  function LearningModeCard({t, cardStyle, labelStyle, refresh, setSavedMessage}){
    const SAMPLE = window.SAMPLE;
    const [mode, setLocalMode] = useState(SAMPLE.mode || "custom");
    const focus = SAMPLE.getCurrentPlanFocus?.();
    const cursor = SAMPLE.planCursor || { stageIdx: 0, sectionIdx: 0 };
    const stages = SAMPLE.PLAN_STAGES || [];
    const totalSections = stages.reduce((a, s) => a + s.sections.length, 0);
    const sectionsBefore = stages
      .slice(0, cursor.stageIdx)
      .reduce((a, s) => a + s.sections.length, 0);
    const currentLinearIdx = sectionsBefore + cursor.sectionIdx;

    const handleSetMode = (newMode) => {
      if (newMode === mode) return;
      if (newMode === "plan" && mode === "custom") {
        const ok = confirm(t.ui(
          "Włączyć tryb planowy?\n\n" +
            "Twoje już opanowane / przeczytane zadania zostaną zachowane, " +
            "ale plan zacznie od pierwszej sekcji i nadpisze aktywne zadania.",
          "Enable plan mode?\n\n" +
            "Your already mastered / read tasks will stay saved, " +
            "but the plan will restart from the first section and overwrite active tasks."
        )
        );
        if (!ok) return;
      }
      SAMPLE.setMode(newMode, { resetPlan: newMode === "plan" && mode === "custom" });
      setLocalMode(newMode);
      setSavedMessage(t.ui(`Tryb: ${newMode === "plan" ? "Plan automatyczny" : "Własny"}`, `Mode: ${newMode === "plan" ? "Automatic plan" : "Custom"}`));
      setTimeout(() => setSavedMessage(""), 2000);
      refresh?.();
    };

    const handleResetPlan = () => {
      const ok = confirm(t.ui(
        "Zresetować postęp planu do początku? Historia gier i oznaczenia przeczytane zostają.",
        "Reset plan progress to the beginning? Game history and read markers stay saved."
      ));
      if (!ok) return;
      SAMPLE.resetPlanProgress();
      setSavedMessage(t.ui("Plan zresetowany do etapu 1, sekcja 1", "Plan reset to stage 1, section 1"));
      setTimeout(() => setSavedMessage(""), 2000);
      refresh?.();
    };

    const handleAdvance = () => {
      const ok = SAMPLE.advancePlanSection();
      if (ok) {
        setSavedMessage(t.ui("Przesunięto do następnej sekcji planu", "Moved to next plan section"));
      } else {
        setSavedMessage(t.ui("To była ostatnia sekcja planu — gratulacje", "That was the final plan section"));
      }
      setTimeout(() => setSavedMessage(""), 2500);
      refresh?.();
    };

    return (
      <section style={cardStyle}>
        <div>
          <h2 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: t.text,
            fontWeight: 600, margin: 0, letterSpacing:"-0.01em"}}>{t.ui("Tryb nauki", "Learning mode")}</h2>
          <div style={{fontFamily: OP_FONT_BODY, fontSize: 11, color: t.dim, marginTop: 3}}>
            {t.ui(
              "Plan automatyczny prowadzi Cię od SoloQ teorii → Micro → Macro. Ustawienia są checklistą jednorazową poza fazami planu.",
              "Automatic plan guides you from SoloQ theory → Micro → Macro. Settings are a one-time checklist outside the plan phases."
            )}
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 0,
          border: `1px solid ${t.line}`}}>
          {[
            { k: "plan",   l: t.ui("Plan automatyczny", "Automatic plan") },
            { k: "custom", l: t.ui("Tryb własny", "Custom mode") }
          ].map(m => {
            const a = mode === m.k;
            return (
              <button key={m.k} onClick={() => handleSetMode(m.k)} style={{
                padding: "11px 6px",
                background: a ? t.accent : "transparent",
                color: a ? t.bg : t.dim,
                border: "none",
                fontFamily: OP_FONT_BODY, fontSize: 11, fontWeight: 700,
                letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer"
              }}>{m.l}</button>
            );
          })}
        </div>

        {/* Plan progress (only when plan mode) */}
        {mode === "plan" && focus && (
          <div style={{
            background: t.bg2, border: `1px solid ${t.line}`,
            borderLeft: `3px solid ${t.accent}`,
            padding: "12px 14px"
          }}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", gap: 14, marginBottom: 8}}>
              <div>
                <div style={{...labelStyle, marginBottom: 3, color: t.accent}}>
                  {focus.stage.short} · {focus.stage.name}
                </div>
                <div style={{
                  fontFamily: OP_FONT_DISP, fontSize: 15, color: t.text, fontWeight: 600,
                  letterSpacing:"-0.01em"
                }}>
                  {t.ui("Sekcja", "Section")}: {(window.SAMPLE.SECTIONS.find(s => s.id === focus.sectionId) || {}).name}
                </div>
              </div>
              <div style={{
                fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.mute,
                letterSpacing:"0.12em", textTransform:"uppercase"
              }}>
                {currentLinearIdx + 1} / {totalSections}
              </div>
            </div>
            <div style={{
              height: 4, background: t.line, marginBottom: 12
            }}>
              <div style={{
                width: `${((currentLinearIdx + 1) / totalSections) * 100}%`,
                height: "100%", background: t.accent
              }}/>
            </div>
            <div style={{
              fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.dim, lineHeight: 1.5,
              marginBottom: 12
            }}>
              {focus.stage.description}
            </div>
            <div style={{display:"flex", gap: 8, flexWrap:"wrap"}}>
              <button onClick={handleAdvance} style={{
                background: t.accent, color: t.bg, border: "none",
                padding: "9px 14px",
                fontFamily: OP_FONT_BODY, fontSize: 10.5, fontWeight: 700,
                letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer"
              }}>{t.ui("Następna sekcja planu", "Next plan section")}</button>
              <button onClick={handleResetPlan} style={{
                background: "transparent", color: t.dim,
                border: `1px solid ${t.line}`,
                padding: "9px 14px",
                fontFamily: OP_FONT_BODY, fontSize: 10.5, fontWeight: 700,
                letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer"
              }}>{t.ui("Zresetuj plan", "Reset plan")}</button>
            </div>
          </div>
        )}

        {mode === "custom" && (
          <div style={{
            background: t.bg2, border: `1px solid ${t.line}`,
            padding: "12px 14px",
            fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.dim, lineHeight: 1.5
          }}>
            {t.ui("Tryb własny. W ", "Custom mode. In ")}
            <strong style={{color: t.text}}>{t.ui("Bazie wiedzy", "Knowledge base")}</strong>
            {t.ui(" samodzielnie włączasz zadania jako „Aktywne”. Przełącz na plan, gdy chcesz, by system prowadził Cię etapem.", " you manually mark tasks as active. Switch to plan mode when you want the system to guide you by stage.")}
          </div>
        )}
      </section>
    );
  }

  function OptionsScreen({t, refresh}){
    const SAMPLE = window.SAMPLE;
    const [lane, setLane] = useState(SAMPLE.championPool.lane || "MID");
    const [champs, setChamps] = useState(() => {
      const arr = SAMPLE.championPool.champions || [];
      const filled = [...arr, "", "", ""].slice(0, 3);
      return filled;
    });
    const [currentChamp, setCurrentChamp] = useState(SAMPLE.currentChampion || "");
    const [importText, setImportText] = useState("");
    const [savedMessage, setSavedMessage] = useState("");

    const LANES = ["TOP","JG","MID","ADC","SUP"];

    const saveChampionPool = () => {
      const cleaned = champs.map(c => c.trim()).filter(Boolean);
      SAMPLE.setChampionPool({ lane, champions: cleaned });
      // If currentChamp not in new pool, clear it.
      if (currentChamp && !cleaned.includes(currentChamp)) {
        SAMPLE.setCurrentChampion("");
        setCurrentChamp("");
      }
      setSavedMessage(t.ui("Pool zapisany", "Pool saved"));
      setTimeout(() => setSavedMessage(""), 2000);
      refresh?.();
    };
    const pickCurrent = (name) => {
      setCurrentChamp(name);
      SAMPLE.setCurrentChampion(name);
      refresh?.();
    };

    const handleExport = () => {
      const data = SAMPLE.exportState();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `master-track-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const handleImport = () => {
      if (!importText.trim()) return;
      if (!confirm(t.ui("Importujesz dane — zastąpi obecny stan. Kontynuować?", "Importing data will replace the current state. Continue?"))) return;
      const ok = SAMPLE.importState(importText);
      if (ok) {
        setSavedMessage(t.ui("Dane zaimportowane — przeładuj stronę", "Data imported — reload the app"));
        refresh?.();
      } else {
        setSavedMessage(t.ui("Błąd: niepoprawny JSON", "Error: invalid JSON"));
      }
      setTimeout(() => setSavedMessage(""), 3000);
    };

    const handleClearHistory = () => {
      if (!confirm(t.ui("Usunąć całą historię gier? Tej operacji nie da się cofnąć.", "Delete all game history? This cannot be undone."))) return;
      SAMPLE.clearHistory();
      setSavedMessage(t.ui("Historia wyczyszczona", "History cleared"));
      setTimeout(() => setSavedMessage(""), 2000);
      refresh?.();
    };

    const cardStyle = {
      background: t.surface, border: `1px solid ${t.line}`,
      padding: "16px 18px", display:"flex", flexDirection:"column", gap: 12
    };
    const labelStyle = {
      fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.mute,
      letterSpacing:"0.14em", textTransform:"uppercase"
    };
    const inputStyle = {
      background: t.bg2, border: `1px solid ${t.line}`,
      color: t.text, padding: "9px 12px",
      fontFamily: OP_FONT_BODY, fontSize: 12.5, outline: "none"
    };
    const btnPrimary = {
      background: t.accent, color: t.bg, border: "none",
      padding: "10px 18px",
      fontFamily: OP_FONT_BODY, fontSize: 11, fontWeight: 700,
      letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer"
    };
    const btnGhost = {
      background: "transparent", color: t.dim,
      border: `1px solid ${t.line}`,
      padding: "10px 18px",
      fontFamily: OP_FONT_BODY, fontSize: 11, fontWeight: 700,
      letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer"
    };
    const btnDanger = {
      ...btnGhost, color: t.bad, borderColor: `${t.bad}55`
    };

    return (
      <div style={{padding: "20px 24px", overflow:"auto", maxWidth: 820}}>
        <header style={{marginBottom: 18}}>
          <div style={{...labelStyle, marginBottom: 4}}>{t.ui("Opcje", "Options")}</div>
          <h1 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, color: t.text, fontWeight: 600,
            margin: 0, letterSpacing:"-0.02em"}}>{t.ui("Konfiguracja sesji", "Session configuration")}</h1>
          <p style={{fontFamily: OP_FONT_BODY, fontSize: 12, color: t.dim, marginTop: 6, lineHeight: 1.5}}>
            {t.ui("Champion pool, progi opanowania, eksport / import danych.", "Champion pool, mastery thresholds, export / import.")}
          </p>
        </header>

        {savedMessage && (
          <div style={{
            padding: "10px 14px", marginBottom: 14,
            background: `${t.good}15`, border: `1px solid ${t.good}60`,
            color: t.good, fontFamily: OP_FONT_BODY, fontSize: 12, fontWeight: 600,
            letterSpacing: "0.06em"
          }}>{savedMessage}</div>
        )}

        <div style={{display:"grid", gap: 14}}>
          <PreferencesCard t={t} cardStyle={cardStyle} labelStyle={labelStyle}
                           refresh={refresh} setSavedMessage={setSavedMessage}/>

          {/* Tryb nauki */}
          <LearningModeCard t={t} cardStyle={cardStyle} labelStyle={labelStyle}
                            refresh={refresh} setSavedMessage={setSavedMessage}/>

          {/* Champion pool */}
          <section style={cardStyle}>
            <div>
              <h2 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: t.text,
                fontWeight: 600, margin: 0, letterSpacing:"-0.01em"}}>{t.ui("Champion pool", "Champion pool")}</h2>
              <div style={{fontFamily: OP_FONT_BODY, fontSize: 11, color: t.dim, marginTop: 3}}>
                {t.ui("Max 3 postacie · trzymaj się małej puli (zasada SoloQ)", "Max 3 champions · keep a small pool (SoloQ rule)")}
              </div>
            </div>

            {/* Lane selector */}
            <div>
              <div style={{...labelStyle, marginBottom: 6}}>{t.ui("Główna rola", "Main role")}</div>
              <div style={{display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap: 0,
                border: `1px solid ${t.line}`}}>
                {LANES.map(l => {
                  const a = lane === l;
                  return (
                    <button key={l} onClick={()=>setLane(l)} style={{
                      padding: "9px 4px",
                      background: a ? t.accent : "transparent",
                      color: a ? t.bg : t.dim,
                      border: "none",
                      fontFamily: OP_FONT_BODY, fontSize: 11, fontWeight: 700,
                      letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer"
                    }}>{l}</button>
                  );
                })}
              </div>
            </div>

            {/* Champion slots */}
            <div>
              <div style={{...labelStyle, marginBottom: 6}}>{t.ui("Postacie (1-3)", "Champions (1-3)")}</div>
              <div style={{display:"flex", flexDirection:"column", gap: 8}}>
                {champs.map((ch, i) => (
                  <div key={i} style={{display:"grid", gridTemplateColumns:"32px 1fr", gap:10, alignItems:"center"}}>
                    <div style={{
                      fontFamily: OP_FONT_DISP, fontSize: 14, color: t.mute,
                      textAlign: "center"
                    }}>#{i+1}</div>
                    <input
                      value={ch}
                      onChange={e=>{
                        const next = [...champs];
                        next[i] = e.target.value;
                        setChamps(next);
                      }}
                      placeholder={`np. ${["Sylas","LeBlanc","Akali"][i] || ""}`}
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button onClick={saveChampionPool} style={btnPrimary}>{t.ui("Zapisz pool", "Save pool")}</button>

            {/* Current champion picker — only show if pool has entries */}
            {champs.some(c => c.trim()) && (
              <div>
                <div style={{...labelStyle, marginBottom: 6}}>{t.ui("Aktualny champion (na następną grę)", "Current champion (next game)")}</div>
                <div style={{display:"flex", gap: 6, flexWrap:"wrap"}}>
                  {champs.filter(c => c.trim()).map(c => {
                    const a = currentChamp === c;
                    return (
                      <button key={c} onClick={()=>pickCurrent(c)} style={{
                        padding: "8px 14px",
                        background: a ? t.good : "transparent",
                        color: a ? t.bg : t.dim,
                        border: `1px solid ${a ? t.good : t.line}`,
                        fontFamily: OP_FONT_BODY, fontSize: 11.5, fontWeight: 700,
                        letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer"
                      }}>{c}</button>
                    );
                  })}
                </div>
                {!currentChamp && (
                  <div style={{fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.warn, marginTop: 8}}>
                    {t.ui("↑ Wybierz championa — bez niego nie zaczniesz gry.", "↑ Pick a champion — you cannot start a game without one.")}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Mastery thresholds (read-only display for now — edit support later) */}
          <section style={cardStyle}>
            <div>
              <h2 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: t.text,
                fontWeight: 600, margin: 0, letterSpacing:"-0.01em"}}>{t.ui("Progi opanowania", "Mastery thresholds")}</h2>
              <div style={{fontFamily: OP_FONT_BODY, fontSize: 11, color: t.dim, marginTop: 3}}>
                {t.ui("Min liczba gier × min % compliance dla każdego poziomu", "Minimum games × minimum compliance for each level")}
              </div>
            </div>
            <div style={{display:"grid", gap: 8}}>
              {[
                {label:t.ui("Wstępnie opanowane", "Initially mastered"), v: SAMPLE.thresholds.initial, color: t.dim},
                {label:t.ui("Utrwalone", "Consolidated"), v: SAMPLE.thresholds.consolidated, color: t.accent},
                {label:t.ui("Opanowane", "Mastered"), v: SAMPLE.thresholds.mastered, color: t.good},
              ].map(row => (
                <div key={row.label} style={{
                  display:"grid", gridTemplateColumns:"1fr auto", alignItems:"center", gap:14,
                  padding: "10px 13px",
                  background: t.bg2, border: `1px solid ${t.line}`,
                  borderLeft: `2px solid ${row.color}`
                }}>
                  <div style={{fontFamily: OP_FONT_BODY, fontSize: 12, color: t.text, fontWeight: 600}}>
                    {row.label}
                  </div>
                  <div style={{fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.dim}}>
                    {row.v.games} {t.ui("gier", "games")} · {row.v.rate}% compliance
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Data */}
          <section style={cardStyle}>
            <div>
              <h2 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: t.text,
                fontWeight: 600, margin: 0, letterSpacing:"-0.01em"}}>{t.ui("Dane", "Data")}</h2>
              <div style={{fontFamily: OP_FONT_BODY, fontSize: 11, color: t.dim, marginTop: 3}}>
                {t.ui("Eksport / import / czyszczenie historii. Apka jest 100% lokalna (localStorage).", "Export / import / history cleanup. The app is 100% local (localStorage).")}
              </div>
            </div>
            <div style={{display:"flex", gap: 8, flexWrap:"wrap"}}>
              <button onClick={handleExport} style={btnPrimary}>{t.ui("Eksportuj JSON", "Export JSON")}</button>
              <button onClick={handleClearHistory} style={btnDanger}>{t.ui("Wyczyść historię", "Clear history")}</button>
            </div>
            <div>
              <div style={{...labelStyle, marginBottom: 6, marginTop: 4}}>{t.ui("Import (wklej JSON)", "Import (paste JSON)")}</div>
              <textarea
                value={importText}
                onChange={e=>setImportText(e.target.value)}
                rows={4}
                placeholder='{"championPool":{...},"history":[...]}'
                style={{...inputStyle, width: "100%", resize:"vertical", lineHeight: 1.5}}
              />
              <button onClick={handleImport} style={{...btnGhost, marginTop: 8}}>
                {t.ui("Importuj", "Import")}
              </button>
            </div>
          </section>

          {/* Storage stats */}
          <section style={{...cardStyle, padding: "12px 16px"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontFamily: OP_FONT_BODY, fontSize: 11.5}}>
              <div style={{color: t.mute, letterSpacing:"0.1em", textTransform:"uppercase"}}>
                {t.ui("Gier w bazie", "Games in database")}
              </div>
              <div style={{color: t.text, fontWeight: 600}}>{SAMPLE.HISTORY.length}</div>
            </div>
            <div style={{display:"flex", justifyContent:"space-between", fontFamily: OP_FONT_BODY, fontSize: 11.5}}>
              <div style={{color: t.mute, letterSpacing:"0.1em", textTransform:"uppercase"}}>
                {t.ui("Aktywne zadania", "Active tasks")}
              </div>
              <div style={{color: t.text, fontWeight: 600}}>{SAMPLE.activeGoals?.length || 0}</div>
            </div>
            <div style={{display:"flex", justifyContent:"space-between", fontFamily: OP_FONT_BODY, fontSize: 11.5}}>
              <div style={{color: t.mute, letterSpacing:"0.1em", textTransform:"uppercase"}}>
                {t.ui("Wszystkich zadań", "Total tasks")}
              </div>
              <div style={{color: t.text, fontWeight: 600}}>{window.SAMPLE.GOALS.length}</div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  window.OperatorApp = OperatorApp;
})();
