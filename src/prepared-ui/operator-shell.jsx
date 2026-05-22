import React from "react";

// OPERATOR — main app shell (sidebar + topbar) and the Dashboard screen.
(function(){
  const { useState } = React;
  const { SAMPLE, OP_TOKENS, OP_FONT_BODY, OP_FONT_DISP,
          OpPill, OpKpi, OpBar, OpStripe, OpSpark, OpTabs } = window;
  const { GOALS, CATEGORIES, computeGoalStats, computeStreak } = SAMPLE;

  // ICON SET (tiny SVG icons; no external deps)
  const Icon = ({n, size=16, color="currentColor", strokeWidth=1.6}) => {
    const p = {
      dashboard: <><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="10" width="7" height="11" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></>,
      book:      <><path d="M4 4h11a3 3 0 0 1 3 3v14H7a3 3 0 0 1-3-3V4Z"/><path d="M4 17h14"/></>,
      target:    <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill={color}/></>,
      flag:      <><path d="M5 21V4"/><path d="M5 5h12l-2 3 2 3H5"/></>,
      activity:  <><polyline points="3 12 7 12 10 5 14 19 17 12 21 12"/></>,
      clock:     <><circle cx="12" cy="12" r="9"/><polyline points="12 6 12 12 16 14"/></>,
      settings:  <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.13-1.4l2-1.55-2-3.46-2.42.97a7 7 0 0 0-2.42-1.4L13.6 2h-3.2l-.43 3.16a7 7 0 0 0-2.42 1.4L5.13 5.59l-2 3.46 2 1.55A7 7 0 0 0 5 12c0 .48.05.95.13 1.4l-2 1.55 2 3.46 2.42-.97a7 7 0 0 0 2.42 1.4L10.4 22h3.2l.43-3.16a7 7 0 0 0 2.42-1.4l2.42.97 2-3.46-2-1.55c.08-.45.13-.92.13-1.4Z"/></>,
      chev:      <><polyline points="9 6 15 12 9 18"/></>,
      play:      <><polygon points="6 4 20 12 6 20 6 4" fill={color} stroke="none"/></>,
      check:     <><polyline points="4 12 10 18 20 6"/></>,
      x:         <><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></>,
      search:    <><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></>,
      mini:      <><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></>,
    }[n];
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
           stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {p}
      </svg>
    );
  };

  // ===== SIDEBAR =====
  function Sidebar({screen, setScreen, t}){
    const mode = SAMPLE.mode || "custom";
    const focus = SAMPLE.getCurrentPlanFocus?.();
    const progress = SAMPLE.getPlanCursorProgress?.();
    const sectionMeta = focus?.sectionId ? SAMPLE.SECTIONS.find(s => s.id === focus.sectionId) : null;
    const stages = SAMPLE.PLAN_STAGES || [];
    const currentStageIdx = focus?.stage ? stages.findIndex(stage => stage.id === focus.stage.id) : -1;
    const nav = [
      {id:"dash",  label:t.ui("Dashboard", "Dashboard"), icon:"dashboard"},
      {id:"know",  label:t.ui("Baza wiedzy", "Knowledge base"), icon:"book"},
      {id:"pre",   label:t.ui("Plan sesji", "Session plan"), icon:"target"},
      {id:"post",  label:t.ui("Refleksja", "Reflection"), icon:"flag"},
      {id:"prog",  label:t.ui("Tracker postępu", "Progress tracker"), icon:"activity"},
      {id:"hist",  label:t.ui("Historia", "History"), icon:"clock"},
    ];
    return (
      <aside style={{
        width: 224, flexShrink: 0,
        background: t.bg2,
        borderRight: `1px solid ${t.line}`,
        display: "flex", flexDirection: "column"
      }}>
        {/* Brand */}
        <div style={{
          padding: "18px 18px 22px", borderBottom: `1px solid ${t.line}`,
          display: "flex", alignItems: "center", gap: 10
        }}>
          <img src="/master-track-icon.svg" alt=""
               width="28" height="28"
               style={{display:"block", flexShrink: 0}}/>
          <div>
            <div style={{
              fontFamily: OP_FONT_DISP, color: t.text, fontWeight: 600,
              fontSize: 14, letterSpacing: "-0.01em"
            }}>Master Track</div>
            <div style={{fontFamily: OP_FONT_BODY, color: t.mute, fontSize: 9.5,
              letterSpacing: "0.18em", textTransform: "uppercase", marginTop:2}}>v2.0 · local</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{padding: "10px 8px", display:"flex", flexDirection:"column", gap: 1}}>
          {nav.map(n => {
            const a = n.id === screen;
            return (
              <button key={n.id} onClick={()=>setScreen(n.id)} style={{
                display: "flex", alignItems: "center", gap: 11,
                padding: "9px 11px", textAlign: "left",
                background: a ? t.surface : "transparent",
                color: a ? t.text : t.dim,
                border: "none",
                borderLeft: `2px solid ${a ? t.accent : "transparent"}`,
                fontFamily: OP_FONT_BODY, fontSize: 12, fontWeight: 500,
                cursor: "pointer", letterSpacing: "0.02em"
              }}>
                <Icon n={n.icon} size={14} color={a ? t.accent : t.mute}/>
                {n.label}
              </button>
            );
          })}
        </nav>

        {/* Footer plan info */}
        <div style={{marginTop:"auto", padding:"14px 14px 18px",
          borderTop: `1px solid ${t.line}`}}>
          <div style={{fontFamily: OP_FONT_BODY, fontSize: 9.5, color: t.mute,
            letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6}}>
            {mode === "plan" ? t.ui("Faza planu", "Plan phase") : t.ui("Tryb nauki", "Learning mode")}
          </div>
          <div style={{display: "flex", gap: 3, marginBottom: 10}}>
            {(stages.length ? stages : [1,2,3,4]).map((stage, idx) => {
              const isCurrent = mode === "plan" && idx === currentStageIdx;
              const isDone = mode === "plan" && idx < currentStageIdx;
              return (
                <div key={stage.id || idx} style={{
                  flex: 1, height: 4,
                  background: isCurrent ? t.accent : (isDone ? t.accentDim : t.line)
                }}/>
              );
            })}
          </div>
          <div style={{fontFamily: OP_FONT_DISP, fontSize: 13, color: t.text, fontWeight: 500}}>
            {mode === "plan" && focus
              ? `${focus.stage.short} · ${progress?.current || 0}/${progress?.total || 0}`
              : t.ui("Tryb własny", "Custom mode")}
          </div>
          <div style={{fontFamily: OP_FONT_BODY, fontSize: 11, color: t.dim, marginTop: 4, lineHeight: 1.4}}>
            {mode === "plan" && focus
              ? `${focus.stage.name}: ${sectionMeta?.name || focus.sectionId}`
              : t.ui("Sam wybierasz aktywne zadania w Bazie wiedzy.", "You choose active tasks in the Knowledge base.")}
          </div>
        </div>

        <button onClick={()=>setScreen("opt")} style={{
          display:"flex", alignItems:"center", gap:10,
          padding: "12px 18px",
          background: "transparent", color: t.dim,
          border: "none", borderTop: `1px solid ${t.line}`,
          fontFamily: OP_FONT_BODY, fontSize: 11,
          letterSpacing: "0.08em", textTransform: "uppercase",
          cursor:"pointer"
        }}>
          <Icon n="settings" size={14} color={t.mute}/>
          {t.ui("Opcje", "Options")}
        </button>
      </aside>
    );
  }

  // ===== TOPBAR =====
  function Topbar({title, breadcrumb, t, onStart, startLabel = "Zacznij grę"}){
    const streak = SAMPLE.computeStreak ? SAMPLE.computeStreak() : 0;
    return (
      <header style={{
        height: 52, flexShrink: 0,
        borderBottom: `1px solid ${t.line}`,
        background: t.bg,
        display: "flex", alignItems: "center",
        padding: "0 20px", gap: 16
      }}>
        <div style={{flex: 1, display:"flex", alignItems:"baseline", gap: 10, minWidth: 0}}>
          <div style={{fontFamily: OP_FONT_DISP, color: t.text, fontSize: 15, fontWeight: 600,
            letterSpacing:"-0.01em"}}>{title}</div>
          {breadcrumb && (
            <>
              <span style={{color: t.mute}}>›</span>
              <div style={{
                fontFamily: OP_FONT_BODY, color: t.dim, fontSize: 11,
                letterSpacing:"0.06em", textTransform: "uppercase",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
              }}>{breadcrumb}</div>
            </>
          )}
        </div>

        {/* Streak chip */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "5px 10px",
          border: `1px solid ${t.line}`, flexShrink: 0
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 999,
            background: streak > 0 ? t.good : t.mute
          }}/>
          <span style={{fontFamily: OP_FONT_BODY, color: t.dim, fontSize: 10.5,
            letterSpacing:"0.12em", textTransform: "uppercase"}}>{t.ui("Streak", "Streak")}</span>
          <span style={{fontFamily: OP_FONT_DISP, color: t.text, fontSize: 13, fontWeight: 600}}>{streak}d</span>
        </div>

        <button onClick={onStart} style={{
          display:"flex", alignItems:"center", gap:8,
          background: t.accent, color: t.bg,
          border: "none", padding: "8px 14px",
          fontFamily: OP_FONT_BODY, fontSize: 11, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", flexShrink: 0
        }}>
          <Icon n="play" size={10} color={t.bg}/>
          {startLabel}
        </button>
      </header>
    );
  }

  // ===== DASHBOARD =====
  function Dashboard({t, setScreen}){
    const [expandedGoal, setExpandedGoal] = useState(null);
    const [planTick, setPlanTick] = useState(0);

    // === LIVE DATA from SAMPLE ===
    const history = SAMPLE.HISTORY;
    const snap = SAMPLE.preGameSnapshot;
    const sessionActive = !!snap;
    const totalGames = history.length;
    const totalCompliance = history.reduce((acc, g) => {
      const vals = Object.values(g.compliance || {});
      return acc + (vals.length ? vals.filter(Boolean).length / vals.length : 0);
    }, 0);
    const avgCompliance = totalGames ? Math.round((totalCompliance / totalGames) * 100) : 0;

    // Compliance trend — last 7 distinct days
    const spark = (() => {
      const byDay = {};
      history.forEach(g => {
        const v = Object.values(g.compliance || {});
        if (!v.length) return;
        const rate = v.filter(Boolean).length / v.length * 100;
        if (!byDay[g.date]) byDay[g.date] = [];
        byDay[g.date].push(rate);
      });
      const days = Object.keys(byDay).sort().slice(-7);
      const data = days.map(d => Math.round(byDay[d].reduce((a, b) => a + b, 0) / byDay[d].length));
      while (data.length < 7) data.unshift(0);
      return { data, labels: days };
    })();

    // Live active goals
    const activeGoals = SAMPLE.activeGoals && SAMPLE.activeGoals.length > 0
      ? SAMPLE.activeGoals
      : [];
    const activeGoalModels = activeGoals.map(id => GOALS.find(g => g.id === id)).filter(Boolean);
    const activeInfoCount = activeGoalModels.filter(g => g.info_only).length;
    const activeTrainCount = activeGoalModels.length - activeInfoCount;
    const activeSummary = activeGoals.length === 0
      ? t.ui("Brak aktywnych zadań", "No active tasks")
      : activeTrainCount === 0
        ? t.ui(`${activeInfoCount} do przeczytania`, `${activeInfoCount} to read`)
        : activeInfoCount > 0
          ? t.ui(`${activeTrainCount} trening · ${activeInfoCount} info`, `${activeTrainCount} training · ${activeInfoCount} info`)
          : t.ui(`${activeTrainCount} trenowane teraz`, `${activeTrainCount} training now`);
    const activeKpiSub = activeGoals.length === 0
      ? t.ui("Włącz w Bazie wiedzy", "Enable in Knowledge base")
      : activeTrainCount === 0
        ? t.ui("Wiedza przed treningiem", "Reading before training")
        : activeInfoCount > 0
          ? t.ui("Trening + wiedza", "Training + reading")
          : t.ui("Trenowane teraz", "Training now");

    // Today's session info (from snapshot if active)
    const todayGames = history.filter(g => g.date === SAMPLE.TODAY);
    const todayDurationMin = todayGames.reduce((a, g) => a + (g.durationMin || 0), 0);
    const todayDurationLabel = todayDurationMin >= 60
      ? `${Math.floor(todayDurationMin / 60)}h ${todayDurationMin % 60}m`
      : `${todayDurationMin}m`;

    // Mastery counts
    const totalGoalCount = GOALS.length;
    const masteredCount = GOALS.filter(g => computeGoalStats(g.id).level >= 1).length;

    // Sessions's primary/secondary focus (from snapshot)
    const focusIds = snap?.focusGoals || [];
    const primaryFocus = focusIds[0] ? GOALS.find(g => g.id === focusIds[0]) : null;
    const secondaryFocus = focusIds[1] ? GOALS.find(g => g.id === focusIds[1]) : null;
    const planMode = SAMPLE.mode === "plan";
    const planFocus = SAMPLE.getCurrentPlanFocus?.();
    const planProgress = SAMPLE.getPlanCursorProgress?.();
    const planSectionMeta = planFocus?.sectionId ? SAMPLE.SECTIONS.find(s => s.id === planFocus.sectionId) : null;
    const advancePlanFromDashboard = () => {
      SAMPLE.advancePlanSection?.();
      setExpandedGoal(null);
      setPlanTick(n => n + 1);
    };

    // Day-of-month label "DD.MM"
    const fmtDay = (iso) => {
      if (!iso) return "";
      const d = new Date(iso);
      return `${String(d.getDate()).padStart(2,"0")}.${String(d.getMonth()+1).padStart(2,"0")}`;
    };

    // Recent mistakes (review queue) — last 3 from real history
    const recentMistakes = history.slice(0, 3).filter(g => g.mistake);

    return (
      <div style={{padding: 20, display: "flex", flexDirection: "column", gap: 20, overflow: "auto"}}>

        {planMode && (
          <section style={{
            background: `${t.accent}0d`,
            border: `1px solid ${t.accent}55`,
            borderLeft: `3px solid ${t.accent}`,
            padding: "14px 18px",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: 14,
            alignItems: "center"
          }}>
            {planFocus ? (
              <>
                <div style={{minWidth: 0}}>
                  <div style={{
                    fontFamily: OP_FONT_BODY, fontSize: 10, color: t.accent,
                    letterSpacing:"0.16em", textTransform:"uppercase", marginBottom: 5,
                    fontWeight: 700
                  }}>
                    {t.ui("Plan automatyczny", "Automatic plan")} · {planFocus.stage.short} · {planProgress?.current || 0}/{planProgress?.total || 0}
                  </div>
                  <div style={{
                    fontFamily: OP_FONT_DISP, fontSize: 18, color: t.text, fontWeight: 600,
                    letterSpacing:"-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                  }}>
                    {planFocus.stage.name} · {planSectionMeta?.name || planFocus.sectionId}
                  </div>
                  <div style={{
                    fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.dim, lineHeight: 1.45,
                    marginTop: 5, maxWidth: 860
                  }}>
                    {t.ui("System sam dobiera aktywne zadania z tej sekcji. Gdy wiedza jest przeczytana albo trening osiągnie próg opanowania, plan przejdzie dalej.", "The system selects active tasks from this section. When reading is complete or training reaches the mastery threshold, the plan moves forward.")}
                  </div>
                </div>
                <div style={{display:"flex", alignItems:"center", gap: 10, flexWrap:"wrap", justifyContent:"flex-end"}}>
                  <button onClick={() => setScreen?.("know")} style={{
                    background: "transparent", color: t.accent,
                    border: `1px solid ${t.accent}70`,
                    padding: "8px 12px",
                    fontFamily: OP_FONT_BODY, fontSize: 10.5, fontWeight: 700,
                    letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer"
                  }}>{t.ui("Otwórz sekcję", "Open section")}</button>
                  <button onClick={advancePlanFromDashboard} style={{
                    background: t.accent, color: t.bg,
                    border: "none",
                    padding: "8px 12px",
                    fontFamily: OP_FONT_BODY, fontSize: 10.5, fontWeight: 700,
                    letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer"
                  }}>{t.ui("Następna sekcja", "Next section")}</button>
                </div>
              </>
            ) : (
              <div style={{fontFamily: OP_FONT_BODY, fontSize: 12, color: t.text}}>
                {t.ui("Plan ukończony. Możesz przełączyć się na tryb własny albo zresetować plan w Opcjach.", "Plan complete. You can switch to custom mode or reset the plan in Options.")}
              </div>
            )}
          </section>
        )}

        {/* Top row: today snapshot + KPIs */}
        <section style={{display: "grid", gridTemplateColumns: "minmax(320px, 1.4fr) repeat(3, minmax(150px, 1fr))", gap: 12}}>
          {/* Today panel */}
          <div style={{
            background: t.surface, border: `1px solid ${t.line}`, padding: "16px 18px",
            display:"flex", flexDirection: "column", gap: 10, minHeight: 200
          }}>
            <div style={{display:"flex", justifyContent: "space-between", alignItems:"baseline", gap: 10}}>
              <div style={{minWidth: 0}}>
                  <div style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
                    letterSpacing:"0.16em", textTransform:"uppercase"}}>{t.ui("Dzisiaj", "Today")} · {SAMPLE.TODAY}</div>
                <div style={{fontFamily: OP_FONT_DISP, fontSize: 22, color: t.text, fontWeight: 600,
                  letterSpacing:"-0.02em", marginTop: 4}}>
                  {todayGames.length > 0
                    ? t.ui(`Sesja: ${todayGames.length} ${todayGames.length === 1 ? "gra" : "gier"} · ${todayDurationLabel}`, `Session: ${todayGames.length} ${todayGames.length === 1 ? "game" : "games"} · ${todayDurationLabel}`)
                    : t.ui("Brak gier dzisiaj", "No games today")}
                </div>
              </div>
              {sessionActive
                ? <OpPill tone="good" t={t}>{t.ui("Sesja aktywna", "Active session")}</OpPill>
                : <OpPill tone="dim" t={t}>{t.ui("Brak sesji", "No session")}</OpPill>}
            </div>

            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 14, marginTop: 6}}>
              <div>
                <div style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
                  letterSpacing:"0.14em", textTransform:"uppercase", marginBottom: 4}}>{t.ui("Mood pre", "Pre mood")}</div>
                <div style={{fontFamily: OP_FONT_DISP, fontSize: 15, color: t.text, fontWeight: 500}}>
                  {snap?.mood ? ({fresh:t.ui("Świeży", "Fresh"),ok:"OK",tired:t.ui("Zmęczony", "Tired"),tilt:"Tilt"}[snap.mood]) : "—"}
                </div>
              </div>
              <div>
                <div style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
                  letterSpacing:"0.14em", textTransform:"uppercase", marginBottom: 4}}>Champion</div>
                <div style={{fontFamily: OP_FONT_DISP, fontSize: 15, color: t.text, fontWeight: 500}}>
                  {snap?.champion
                    ? `${snap.champion} · ${snap.lane || SAMPLE.championPool?.lane || "—"}`
                    : SAMPLE.currentChampion
                      ? `${SAMPLE.currentChampion} · ${SAMPLE.championPool?.lane || "—"}`
                      : "—"}
                </div>
              </div>
              <div>
                <div style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
                  letterSpacing:"0.14em", textTransform:"uppercase", marginBottom: 4}}>{t.ui("Primary focus", "Primary focus")}</div>
                <div style={{fontFamily: OP_FONT_BODY, fontSize: 12, color: t.text, lineHeight: 1.4}}>
                  {primaryFocus?.label || "—"}
                </div>
              </div>
              <div>
                <div style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
                  letterSpacing:"0.14em", textTransform:"uppercase", marginBottom: 4}}>Secondary</div>
                <div style={{fontFamily: OP_FONT_BODY, fontSize: 12, color: t.text, lineHeight: 1.4}}>
                  {secondaryFocus?.label || "—"}
                </div>
              </div>
            </div>

            {snap?.avoidMistake && (
              <div style={{
                marginTop: "auto",
                padding: "10px 12px",
                background: `${t.warn}10`, border: `1px solid ${t.warn}40`,
                display: "flex", alignItems: "center", gap: 10
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: 999, background: t.warn, flexShrink: 0
                }}/>
                <div style={{flex:1, fontFamily: OP_FONT_BODY, fontSize: 11, color: t.text, lineHeight: 1.4}}>
                  {snap.avoidMistake}
                </div>
              </div>
            )}
          </div>

          <OpKpi label="Compliance" value={`${avgCompliance}%`}
                 sub={t.ui(`${totalGames} ${totalGames === 1 ? "gra" : "gier"}`, `${totalGames} ${totalGames === 1 ? "game" : "games"}`)}
                 tone={avgCompliance >= 75 ? "good" : avgCompliance >= 50 ? "warn" : "dim"} t={t}/>
          <OpKpi label={t.ui("Aktywne zadania", "Active tasks")} value={String(activeGoals.length)}
                 sub={activeKpiSub} t={t}/>
          <OpKpi label={t.ui("Opanowane", "Mastered")} value={`${masteredCount} / ${totalGoalCount}`}
                 sub={t.ui("poziom 1+", "level 1+")} tone="warn" t={t}/>
        </section>

        {/* Second row: trend + recent mistakes */}
        <section style={{display: "grid", gridTemplateColumns: "minmax(320px, 1.4fr) minmax(280px, 1fr)", gap: 12}}>
          <div style={{
            background: t.surface, border: `1px solid ${t.line}`, padding: "16px 18px",
            display:"flex", flexDirection:"column", gap: 12, minHeight: 200
          }}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
              <div>
                <div style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
                  letterSpacing:"0.16em", textTransform:"uppercase"}}>{t.ui("Compliance · ostatnie dni", "Compliance · recent days")}</div>
                <div style={{fontFamily: OP_FONT_DISP, fontSize: 18, color: t.text, fontWeight: 600, marginTop: 4}}>
                  {totalGames === 0
                    ? t.ui("Brak danych — zagraj pierwszą grę", "No data — play your first game")
                    : avgCompliance >= 75
                      ? t.ui("Dobre tempo — utrzymaj", "Good pace — keep it up")
                      : avgCompliance >= 50
                        ? t.ui("Trend średni", "Average trend")
                        : t.ui("Trend słaby — wybierz łatwiejszy goal", "Weak trend — pick an easier goal")}
                </div>
              </div>
            </div>
            {totalGames > 0 ? (
              <div style={{position: "relative", minHeight: 130}}>
                <OpSpark data={spark.data} t={t} height={120}/>
                <div style={{display:"flex", justifyContent:"space-between", marginTop: 6,
                  fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute, letterSpacing:"0.1em"}}>
                  {spark.labels.length > 0
                    ? spark.labels.map(d => <span key={d}>{fmtDay(d)}</span>)
                    : <span style={{opacity:0.5}}>—</span>}
                </div>
              </div>
            ) : (
              <div style={{
                display: "flex", flexDirection: "column", justifyContent: "center", flex: 1,
                gap: 8, paddingBottom: 10
              }}>
                <div style={{
                  fontFamily: OP_FONT_BODY, fontSize: 12, color: t.dim, lineHeight: 1.5
                }}>
                  {t.ui(
                    "Zacznij grę i zapisz refleksję po jej zakończeniu. Wykres compliance pojawi się tutaj automatycznie.",
                    "Start a game and save the reflection after it ends. The compliance chart will appear here automatically."
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Recent mistakes */}
          <div style={{
            background: t.surface, border: `1px solid ${t.line}`, padding: "16px 18px",
            display:"flex", flexDirection:"column", gap: 10, minHeight: 200
          }}>
            <div style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
              letterSpacing:"0.16em", textTransform:"uppercase"}}>{t.ui("Review queue · ostatnie błędy", "Review queue · recent mistakes")}</div>
            {recentMistakes.length > 0 ? recentMistakes.map((g, i) => (
              <div key={g.id} style={{
                display:"flex", gap: 10, padding: "8px 0",
                borderTop: i === 0 ? "none" : `1px solid ${t.line}`
              }}>
                <span style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.accent,
                  fontWeight: 700, minWidth: 22}}>{String(i + 1).padStart(2, "0")}</span>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.text, lineHeight: 1.45}}>
                    {g.mistake}
                  </div>
                  <div style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute, marginTop: 3,
                    letterSpacing:"0.08em", textTransform:"uppercase"}}>
                    {fmtDay(g.date)} {g.time && `· ${g.time}`} · {g.champion}
                  </div>
                </div>
              </div>
            )) : (
              <div style={{
                fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.mute, lineHeight: 1.5,
                paddingTop: 4
              }}>
                {t.ui(
                  "Brak zapisanych błędów. Po pierwszej refleksji pojawi się tu lista 3 ostatnich.",
                  "No saved mistakes yet. After the first reflection, the 3 most recent ones will show up here."
                )}
              </div>
            )}
          </div>
        </section>

        {/* Active goals — list, click to expand */}
        <section style={{
          background: t.surface, border: `1px solid ${t.line}`
        }}>
          <div style={{
            padding: "12px 18px",
            borderBottom: `1px solid ${t.line}`,
            display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 14, flexWrap: "wrap"
          }}>
            <div>
              <div style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
                letterSpacing:"0.16em", textTransform:"uppercase"}}>{t.ui("Aktywne zadania", "Active tasks")}</div>
              <div style={{fontFamily: OP_FONT_DISP, fontSize: 16, color: t.text, fontWeight: 600, marginTop: 2}}>
                {activeGoals.length === 0
                  ? t.ui("Brak aktywnych zadań", "No active tasks")
                  : activeSummary}
              </div>
              <div style={{fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.dim, marginTop: 4, lineHeight: 1.4}}>
                {t.ui("Kliknij zadanie, by przeczytać pełny opis przed sesją.", "Click a task to read the full description before the session.")}
              </div>
            </div>
            <button onClick={() => setScreen?.("know")} style={{
              background: t.accent, color: t.bg,
              border: "none", padding: "8px 14px",
              fontFamily: OP_FONT_BODY, fontSize: 10.5, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer"
            }}>{activeGoals.length === 0 ? t.ui("Wybierz zadania", "Pick tasks") : t.ui("Zarządzaj", "Manage")}</button>
          </div>

          {activeGoals.length === 0 ? (
            <div style={{
              padding: "28px 24px", textAlign: "center",
              fontFamily: OP_FONT_BODY, fontSize: 12, color: t.mute, lineHeight: 1.6
            }}>
              {t.ui("Wejdź do ", "Go to ")}
              <strong style={{color: t.text}}>{t.ui("Bazy wiedzy", "Knowledge base")}</strong>
              {t.ui(" i włącz 2-4 zadania jako aktywne.", " and enable 2-4 active tasks.")}
              <br/>{t.ui("Mała lista = lepsze utrwalenie. Plan 12-tygodniowy podpowiada od czego zacząć.", "Small list = better retention. The 12-week plan suggests where to start.")}
            </div>
          ) : (
            <div style={{padding: "4px 0"}}>
              {activeGoals.map(gid => {
                const goal = GOALS.find(g => g.id === gid);
                if (!goal) return null;
                const st = computeGoalStats(gid);
                const isInfo = !!goal.info_only;
                const progress = isInfo ? 100
                               : st.level === 1 ? Math.min(100, Math.round((st.games / 8) * 100))
                               : st.level === 2 ? Math.min(100, Math.round((st.games / 20) * 100))
                               : st.level === 0 ? Math.min(100, Math.round((st.games / 3) * 100))
                               : 100;
                const statusTone = isInfo ? "accent"
                                 : st.level === -1 ? "bad"
                                 : st.level >= 1 ? "good" : "warn";
                const color = statusTone === "good" ? t.good
                            : statusTone === "bad" ? t.bad
                            : statusTone === "accent" ? t.accent : t.warn;
                const isExp = expandedGoal === gid;
                const sectionMeta = goal.section ? window.SAMPLE.SECTIONS.find(s => s.id === goal.section) : null;

                return (
                  <div key={gid} style={{borderBottom: `1px solid ${t.line}`}}>
                    <div onClick={() => setExpandedGoal(isExp ? null : gid)} style={{
                      padding: "12px 18px",
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 2.4fr) 80px 90px minmax(140px, 1.4fr) 110px auto",
                      gap: 14, alignItems: "center",
                      cursor: "pointer"
                    }}>
                      <div style={{minWidth: 0}}>
                        <div style={{
                          fontFamily: OP_FONT_BODY, fontSize: 12.5, color: t.text, fontWeight: 600,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                        }}>{goal.label}</div>
                        <div style={{
                          fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute, marginTop: 3,
                          letterSpacing:"0.08em", textTransform:"uppercase",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                        }}>
                          {(goal.tab || "macro").toUpperCase()}
                          {sectionMeta && ` · ${sectionMeta.name}`}
                        </div>
                      </div>
                      <div style={{fontFamily: OP_FONT_DISP, fontSize: 14, color: isInfo ? t.mute : t.text, fontWeight: 500}}>
                        {isInfo ? "—" : st.games}
                      </div>
                      <div style={{fontFamily: OP_FONT_DISP, fontSize: 14, color, fontWeight: 500}}>
                        {isInfo ? "INFO" : `${st.rate}%`}
                      </div>
                      <div style={{minWidth: 0}}>
                        {!isInfo ? (
                          <>
                            <div style={{display:"flex", justifyContent:"space-between",
                              fontFamily: OP_FONT_BODY, fontSize: 9.5, color: t.mute, marginBottom: 4,
                              letterSpacing:"0.1em", textTransform:"uppercase"}}>
                              <span>{st.games}/{st.level >= 1 ? (st.level === 2 ? 20 : 8) : 3}</span>
                              <span>{t.ui("nast.", "next")} {st.level >= 1 ? (st.level === 2 ? t.ui("opan.", "master") : t.ui("utrw.", "consol.")) : t.ui("wstęp.", "initial")}</span>
                            </div>
                            <OpBar value={progress} color={color} bg={t.lineHi + "30"}/>
                          </>
                        ) : (
                          <div style={{
                            fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.mute,
                            letterSpacing:"0.08em", textTransform:"uppercase"
                          }}>{t.ui("Wiedza · przeczytaj raz", "Knowledge · read once")}</div>
                        )}
                      </div>
                      <div><OpPill tone={statusTone} t={t}>{isInfo ? "INFO" : st.status}</OpPill></div>
                      <div style={{
                        color: t.mute, transform: isExp ? "rotate(90deg)" : "none",
                        transition:"transform .15s"
                      }}>
                        <Icon n="chev" size={14}/>
                      </div>
                    </div>

                    {isExp && (
                      <div style={{
                        padding: "14px 22px 18px",
                        background: t.bg2, borderTop: `1px solid ${t.line}`,
                        display: "flex", flexDirection: "column", gap: 12
                      }}>
                        <div style={{
                          fontFamily: OP_FONT_BODY, fontSize: 12.5, color: t.text, lineHeight: 1.6
                        }}>{goal.short}</div>

                        {goal.what && (
                          <div>
                            <div style={{
                              fontFamily: OP_FONT_BODY, fontSize: 9.5, color: t.mute,
                              letterSpacing:"0.18em", textTransform:"uppercase", marginBottom: 6
                            }}>{t.ui("Czym jest", "What it is")}</div>
                            <div style={{
                              fontFamily: OP_FONT_BODY, fontSize: 12, color: t.text, lineHeight: 1.55
                            }}>{goal.what}</div>
                          </div>
                        )}

                        {Array.isArray(goal.how) && goal.how.length > 0 && (
                          <div>
                            <div style={{
                              fontFamily: OP_FONT_BODY, fontSize: 9.5, color: t.accent,
                              letterSpacing:"0.18em", textTransform:"uppercase", marginBottom: 6
                            }}>{t.ui("Jak wykonać", "How to execute")}</div>
                            <ul style={{margin:0, paddingLeft: 0, listStyle:"none",
                              display:"flex", flexDirection:"column", gap: 5}}>
                              {goal.how.map((h, i) => (
                                <li key={i} style={{
                                  fontFamily: OP_FONT_BODY, fontSize: 12, color: t.text, lineHeight: 1.55,
                                  display:"flex", gap: 10
                                }}>
                                  <span style={{color: t.accent, fontWeight: 700, minWidth: 16}}>{i + 1}.</span>
                                  <span style={{flex: 1}}>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div style={{display:"grid", gridTemplateColumns: "1fr 1fr", gap: 14}}>
                          {goal.when && (
                            <div>
                              <div style={{
                                fontFamily: OP_FONT_BODY, fontSize: 9.5, color: t.mute,
                                letterSpacing:"0.18em", textTransform:"uppercase", marginBottom: 4
                              }}>{t.ui("Kiedy stosować", "When to use")}</div>
                              <div style={{
                                fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.text, lineHeight: 1.5
                              }}>{goal.when}</div>
                            </div>
                          )}
                          {goal.success && (
                            <div>
                              <div style={{
                                fontFamily: OP_FONT_BODY, fontSize: 9.5, color: t.good,
                                letterSpacing:"0.18em", textTransform:"uppercase", marginBottom: 4
                              }}>{t.ui("Kryterium sukcesu", "Success criterion")}</div>
                              <div style={{
                                fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.text, lineHeight: 1.5
                              }}>{goal.success}</div>
                            </div>
                          )}
                        </div>

                        <div style={{
                          display:"flex", justifyContent:"flex-end", gap: 8, marginTop: 4
                        }}>
                          <button onClick={(e) => { e.stopPropagation(); setScreen?.("know"); }} style={{
                            background: "transparent", color: t.dim,
                            border: `1px solid ${t.line}`,
                            padding: "7px 12px",
                            fontFamily: OP_FONT_BODY, fontSize: 10.5, fontWeight: 700,
                            letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer"
                          }}>{t.ui("Otwórz w bazie wiedzy", "Open in knowledge base")}</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    );
  }

  Object.assign(window, {OpIcon: Icon, OpSidebar: Sidebar, OpTopbar: Topbar, OpDashboard: Dashboard});
})();
