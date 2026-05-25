import React from "react";

// OPERATOR — Knowledge base + Pre-game + Post-game + Progress + History screens.
(function(){
  const { SAMPLE, OP_FONT_BODY, OP_FONT_DISP, OpPill, OpBar, OpIcon, getOpTokens } = window;
  const { GOALS, HISTORY, CATEGORIES, TABS, SECTIONS, computeGoalStats,
          setActiveGoals: persistActiveGoals,
          toggleReadGoal: persistToggleRead,
          toggleMasteredGoal: persistToggleMastered } = SAMPLE;
  const { useState, useMemo } = React;
  const Icon = OpIcon;

  // ===== KNOWLEDGE =====
  // Top-level tabs (MACRO / MICRO / SOLOQ) → sections (collapsible) → goals (expandable).
  function Knowledge({t}){
    const initialPlanFocus = SAMPLE.mode === "plan" ? SAMPLE.getCurrentPlanFocus?.() : null;
    const [tab, setTab] = useState(initialPlanFocus?.stage?.tab || "macro");
    const [search, setSearch] = useState("");
    const [expanded, setExpanded] = useState(null);
    const [collapsedSections, setCollapsedSections] = useState({});
    // Live active goals (persisted)
    const [activeGoals, setActive] = useState(() => SAMPLE.activeGoals || []);
    const [readGoals, setRead] = useState(() => SAMPLE.readGoals || []);
    const [masteredGoals, setMastered] = useState(() => SAMPLE.masteredGoals || []);
    const planMode = SAMPLE.mode === "plan";
    const currentPlanFocus = SAMPLE.getCurrentPlanFocus?.();

    // Plan mode locks goals OUTSIDE the current section. Goals INSIDE the
    // current plan section are freely clickable.
    const isGoalLockedByPlan = (gid) => {
      if (!planMode) return false;
      const g = GOALS.find(x => x.id === gid);
      return g?.section !== currentPlanFocus?.sectionId;
    };

    const toggleActive = (gid) => {
      if (isGoalLockedByPlan(gid)) return;
      setActive(prev => {
        const next = prev.includes(gid) ? prev.filter(x => x !== gid) : [...prev, gid];
        persistActiveGoals(next);
        return next;
      });
    };
    const toggleRead = (gid) => {
      if (isGoalLockedByPlan(gid)) return;
      persistToggleRead(gid);
      setRead([...(SAMPLE.readGoals || [])]);
      setActive([...(SAMPLE.activeGoals || [])]);
    };
    const toggleMastered = (gid) => {
      if (isGoalLockedByPlan(gid)) return;
      persistToggleMastered(gid);
      setMastered([...(SAMPLE.masteredGoals || [])]);
      setActive([...(SAMPLE.activeGoals || [])]);
    };
    const toggleSection = (sid) => {
      setCollapsedSections(s => ({ ...s, [sid]: !s[sid] }));
    };

    // Filter goals by current tab + search
    const visibleGoals = useMemo(() => {
      const lower = search.toLowerCase();
      return GOALS.filter(g => {
        if (g.tab !== tab) return false;
        if (!lower) return true;
        const hay = `${g.label} ${g.short} ${g.what} ${g.how.join(" ")}`.toLowerCase();
        return hay.includes(lower);
      });
    }, [tab, search]);

    // Group by section, preserving section order
    const sectionsForTab = useMemo(
      () => SECTIONS.filter(s => s.tab === tab).sort((a, b) => (a.order || 999) - (b.order || 999)),
      [tab]
    );
    const grouped = sectionsForTab
      .map(s => ({ ...s, goals: visibleGoals.filter(g => g.section === s.id) }))
      .filter(s => s.goals.length > 0);

    // Section-level mastery: % of goals at level ≥ 1
    function sectionMastery(goals) {
      if (goals.length === 0) return null;
      const mastered = goals.filter(g => computeGoalStats(g.id).level >= 1).length;
      return Math.round((mastered / goals.length) * 100);
    }

    const totalGoalsThisTab = GOALS.filter(g => g.tab === tab).length;
    const activeInTab = activeGoals.filter(id => {
      const g = GOALS.find(x => x.id === id);
      return g && g.tab === tab;
    }).length;
    const masteredInTab = GOALS.filter(g => g.tab === tab && computeGoalStats(g.id).level >= 1).length;

    return (
      <div style={{display:"grid", gridTemplateColumns: "260px 1fr", height: "100%", minHeight: 0}}>
        {/* Left rail: tab selector + search + section index */}
        <aside style={{
          background: t.bg2, borderRight: `1px solid ${t.line}`,
          padding: "16px 14px", display:"flex", flexDirection:"column", gap: 16, overflow:"auto"
        }}>
          {/* Search */}
          <div style={{position: "relative"}}>
            <div style={{position:"absolute", left: 9, top: "50%", transform: "translateY(-50%)"}}>
              <Icon n="search" size={12} color={t.mute}/>
            </div>
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              placeholder={t.ui("Szukaj w bazie…", "Search knowledge…")}
              style={{
                width: "100%", background: t.surface, border: `1px solid ${t.line}`,
                color: t.text, padding: "8px 8px 8px 28px",
                fontFamily: OP_FONT_BODY, fontSize: 11, outline: "none"
              }}
            />
          </div>

          {/* 3-tab toggle: MACRO / MICRO / SOLOQ */}
          <div>
            <div style={{fontFamily: OP_FONT_BODY, fontSize: 9.5, color: t.mute,
              letterSpacing:"0.18em", textTransform:"uppercase", marginBottom: 8}}>{t.ui("Tab", "Tab")}</div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap: 0,
              border: `1px solid ${t.line}`}}>
              {TABS.map(tb => {
                const a = tab === tb.id;
                return (
                  <button key={tb.id} onClick={()=>setTab(tb.id)} style={{
                    padding: "9px 6px",
                    background: a ? t.accent : "transparent",
                    color: a ? t.bg : t.dim,
                    border: "none",
                    fontFamily: OP_FONT_BODY, fontSize: 10.5, fontWeight: 700,
                    letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer"
                  }}>{tb.name}</button>
                );
              })}
            </div>
            {TABS.find(x=>x.id===tab)?.subtitle && (
              <div style={{
                fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.dim,
                marginTop: 8, lineHeight: 1.5
              }}>
                {TABS.find(x=>x.id===tab).subtitle}
              </div>
            )}
          </div>

          {/* Section index (jumps to anchor) */}
          <div>
            <div style={{fontFamily: OP_FONT_BODY, fontSize: 9.5, color: t.mute,
              letterSpacing:"0.18em", textTransform:"uppercase", marginBottom: 8}}>{t.ui("Sekcje", "Sections")}</div>
            <div style={{display:"flex", flexDirection:"column", gap: 1}}>
              {sectionsForTab.map(s => {
                const goalCount = GOALS.filter(g => g.section === s.id).length;
                const mastery = sectionMastery(GOALS.filter(g => g.section === s.id));
                const isPlanSection = planMode && currentPlanFocus?.sectionId === s.id;
                return (
                  <a key={s.id} href={`#sec-${s.id}`} style={{
                    display:"flex", alignItems:"center", gap: 10,
                    padding: "7px 9px", textDecoration: "none",
                    color: isPlanSection ? t.accent : t.text,
                    fontFamily: OP_FONT_BODY, fontSize: 11.5, fontWeight: 500,
                    borderLeft: `2px solid ${isPlanSection ? t.accent : "transparent"}`,
                    background: isPlanSection ? `${t.accent}0d` : "transparent"
                  }} onMouseEnter={(e)=>{e.currentTarget.style.background=t.surface}}
                     onMouseLeave={(e)=>{e.currentTarget.style.background=isPlanSection ? `${t.accent}0d` : "transparent"}}>
                    <span style={{flex:1, lineHeight:1.3}}>{s.name}</span>
                    <span style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute, minWidth: 24, textAlign:"right"}}>
                      {goalCount}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer status */}
          <div style={{marginTop:"auto", padding: "10px 0",
            borderTop: `1px solid ${t.line}`,
            fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute, lineHeight: 1.6
          }}>
            <div>{totalGoalsThisTab} {t.ui("zadań w tabie", "tasks in tab")}</div>
            <div>{activeInTab} {t.ui("aktywne", "active")} · {masteredInTab} {t.ui("opanowane", "mastered")}</div>
            <div style={{marginTop: 6, color: t.dim}}>{GOALS.length} {t.ui("łącznie", "total")}</div>
          </div>
        </aside>

        {/* Main goal stream */}
        <div style={{overflow:"auto", padding: "20px 24px 40px"}}>
          {grouped.length === 0 && (
            <div style={{
              padding: 40, textAlign:"center",
              fontFamily: OP_FONT_BODY, fontSize: 12, color: t.mute
            }}>
              {search ? t.ui(`Brak wyników dla „${search}”.`, `No results for “${search}”.`) : t.ui("Brak zadań w tym tabie.", "No tasks in this tab.")}
            </div>
          )}
          {grouped.map(sec => {
            const isCollapsed = collapsedSections[sec.id];
            const mastery = sectionMastery(sec.goals);
            const isPlanSection = planMode && currentPlanFocus?.sectionId === sec.id;
            return (
              <section key={sec.id} id={`sec-${sec.id}`} style={{
                marginBottom: 22,
                scrollMarginTop: 16,
                borderLeft: isPlanSection ? `3px solid ${t.accent}` : "3px solid transparent",
                paddingLeft: isPlanSection ? 12 : 0
              }}>
                <div onClick={() => toggleSection(sec.id)} style={{
                  display:"flex", alignItems:"baseline", justifyContent:"space-between", gap: 12,
                  marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${t.line}`,
                  cursor: "pointer"
                }}>
                  <div style={{display:"flex", alignItems:"baseline", gap: 12, flex: 1, minWidth: 0}}>
                    <div style={{
                      color: t.mute, transform: isCollapsed ? "rotate(0deg)" : "rotate(90deg)",
                      transition:"transform .15s", flexShrink: 0, paddingTop: 2
                    }}>
                      <Icon n="chev" size={14}/>
                    </div>
                    <div style={{minWidth: 0}}>
                      <div style={{
                        fontFamily: OP_FONT_DISP, fontSize: 18, color: t.text, fontWeight: 600,
                        letterSpacing:"-0.01em"
                      }}>
                        {sec.name}
                        {isPlanSection && (
                          <span style={{
                            marginLeft: 10,
                            fontFamily: OP_FONT_BODY,
                            fontSize: 10,
                            color: t.accent,
                            letterSpacing:"0.14em",
                            textTransform:"uppercase"
                          }}>{t.ui("Aktualny etap", "Current stage")}</span>
                        )}
                      </div>
                      <div style={{
                        fontFamily: OP_FONT_BODY, fontSize: 11, color: t.dim, marginTop: 3
                      }}>{sec.subtitle}</div>
                    </div>
                  </div>
                  <div style={{
                    display:"flex", gap: 14, alignItems: "baseline", flexShrink: 0
                  }}>
                    {mastery !== null && (
                      <div style={{
                        fontFamily: OP_FONT_BODY, fontSize: 10.5, color: mastery >= 50 ? t.good : t.mute,
                        letterSpacing:"0.12em", textTransform:"uppercase"
                      }}>
                        {mastery}% {t.ui("opanowane", "mastered")}
                      </div>
                    )}
                    <div style={{
                      fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.mute,
                      letterSpacing:"0.12em", textTransform:"uppercase"
                    }}>
                      {sec.goals.length} {t.ui("zadań", "tasks")}
                    </div>
                  </div>
                </div>

                {!isCollapsed && (
                  <div style={{display:"flex", flexDirection:"column", gap: 8}}>
                    {sec.goals.map(g => {
                      const st = computeGoalStats(g.id);
                      const isActive = activeGoals.includes(g.id);
                      const isRead = readGoals.includes(g.id);
                      const isExp = expanded === g.id;
                      const isInfo = !!g.info_only;
                      const isManuallyMastered = !!st.isManuallyMastered;
                      const statusTone = st.level === -1 ? "bad"
                                       : st.level >= 1  ? "good"
                                       : st.games > 0   ? "warn" : "dim";
                      // Visual treatment:
                      // - active (training): green left bar + tinted background
                      // - info_only + read: muted appearance
                      // - info_only + not read: subtle accent left bar
                      const leftBar = isActive ? t.good : (isInfo && !isRead) ? t.accent : t.line;
                      const bgTint = isActive ? `${t.good}08` : t.surface;
                      return (
                        <div key={g.id} style={{
                          background: bgTint,
                          border: `1px solid ${isActive ? t.good+"60" : t.line}`,
                          borderLeft: `3px solid ${leftBar}`,
                          boxShadow: isActive ? `inset 0 0 0 1px ${t.good}30` : "none"
                        }}>
                          <div onClick={()=>setExpanded(isExp ? null : g.id)} style={{
                            display:"grid", gridTemplateColumns: "1fr auto auto",
                            gap: 14, alignItems: "center",
                            padding: "12px 16px", cursor:"pointer"
                          }}>
                            <div style={{minWidth: 0}}>
                              <div style={{display:"flex", alignItems:"center", gap: 8, marginBottom: 4, flexWrap:"wrap"}}>
                                <div style={{
                                  fontFamily: OP_FONT_BODY, fontSize: 13,
                                  color: isInfo && isRead ? t.dim : t.text, fontWeight: 600
                                }}>{g.label}</div>
                                {isActive && <OpPill tone="good" t={t}>● {t.ui("Aktywne", "Active")}</OpPill>}
                                {isInfo && (
                                  <OpPill tone={isRead ? "dim" : "accent"} t={t}>
                                    {isRead ? `✓ ${t.ui("Przeczytane", "Read")}` : "Info"}
                                  </OpPill>
                                )}
                                {!isInfo && g.phase && g.phase !== "ongoing" && (
                                  <OpPill tone="dim" t={t}>F{g.phase}{g.week?` · t${g.week}`:""}</OpPill>
                                )}
                                {!isInfo && g.phase === "ongoing" && <OpPill tone="dim" t={t}>{t.ui("Ciągłe", "Ongoing")}</OpPill>}
                                {!isInfo && (st.games > 0 || isManuallyMastered) && <OpPill tone={statusTone} t={t}>{st.status}</OpPill>}
                                {isManuallyMastered && <OpPill tone="dim" t={t}>{t.ui("Pominięte", "Skipped")}</OpPill>}
                              </div>
                              <div style={{
                                fontFamily: OP_FONT_BODY, fontSize: 11.5,
                                color: isInfo && isRead ? t.mute : t.dim, lineHeight: 1.45
                              }}>{g.short}</div>
                            </div>
                            <div style={{textAlign:"right", minWidth: 100}}>
                              {isInfo ? (
                                <div style={{
                                  fontFamily: OP_FONT_BODY, fontSize: 10.5,
                                  color: isRead ? t.good : t.mute,
                                  letterSpacing:"0.1em", textTransform:"uppercase"
                                }}>{isRead ? t.ui("Przeczytane", "Read") : t.ui("Do przeczytania", "To read")}</div>
                              ) : isManuallyMastered ? (
                                <>
                                  <div style={{
                                    fontFamily: OP_FONT_DISP, fontSize: 18, color: t.good, fontWeight: 500
                                  }}>100%</div>
                                  <div style={{
                                    fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
                                    letterSpacing:"0.12em", textTransform:"uppercase", marginTop: 2
                                  }}>{t.ui("ręcznie", "manual")}</div>
                                </>
                              ) : st.games > 0 ? (
                                <>
                                  <div style={{
                                    fontFamily: OP_FONT_DISP, fontSize: 18, color: t.text, fontWeight: 500
                                  }}>{st.rate}%</div>
                                  <div style={{
                                    fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
                                    letterSpacing:"0.12em", textTransform:"uppercase", marginTop: 2
                                  }}>{st.passed}/{st.games} {t.ui("gier", "games")}</div>
                                </>
                              ) : (
                                <div style={{
                                  fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.mute,
                                  letterSpacing:"0.1em", textTransform:"uppercase"
                                }}>{t.ui("Niezaczęte", "Not started")}</div>
                              )}
                            </div>
                            <div style={{
                              color: t.mute, transform: isExp?"rotate(90deg)":"none",
                              transition:"transform .15s"
                            }}>
                              <Icon n="chev" size={14}/>
                            </div>
                          </div>

                          {isExp && (
                            <div style={{
                              padding: "16px 18px 18px",
                              borderTop: `1px solid ${t.line}`,
                              background: t.bg2,
                              display:"grid", gridTemplateColumns:"1fr 1fr", gap: 22
                            }}>
                              {g.what && (
                                <div style={{gridColumn: "1 / -1"}}>
                                  <SectionLabel t={t}>{t.ui("Czym jest", "What it is")}</SectionLabel>
                                  <p style={detailBody(t)}>{g.what}</p>
                                </div>
                              )}
                              {Array.isArray(g.how) && g.how.length > 0 && (
                                <div style={{gridColumn: "1 / -1"}}>
                                  <SectionLabel t={t} tone="accent">{t.ui("Jak wykonać", "How to execute")}</SectionLabel>
                                  <ul style={{margin:0, padding: 0, listStyle:"none", display:"flex",
                                    flexDirection:"column", gap: 6}}>
                                    {g.how.map((h,i)=>(
                                      <li key={i} style={{
                                        fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.text, lineHeight: 1.55,
                                        display:"flex", gap: 10
                                      }}>
                                        <span style={{color: t.accent, fontWeight:700, minWidth: 14}}>{i+1}.</span>
                                        <span style={{flex:1}}>{h}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              <div>
                                <SectionLabel t={t}>{t.ui("Kiedy stosować", "When to use")}</SectionLabel>
                                <p style={detailBody(t)}>{g.when || "—"}</p>
                                {g.whenNot && (
                                  <>
                                    <SectionLabel t={t} tone="bad" style={{marginTop:14}}>{t.ui("Kiedy NIE", "When NOT to")}</SectionLabel>
                                    <p style={detailBody(t)}>{g.whenNot}</p>
                                  </>
                                )}
                              </div>
                              <div>
                                <SectionLabel t={t} tone="good">{t.ui("Kryterium sukcesu", "Success criterion")}</SectionLabel>
                                <p style={detailBody(t)}>{g.success || "—"}</p>
                                {(g.mistakes||[]).length > 0 && (
                                  <>
                                    <SectionLabel t={t} tone="warn" style={{marginTop:14}}>{t.ui("Typowe błędy", "Common mistakes")}</SectionLabel>
                                    <ul style={{margin:0, padding: 0, listStyle:"none", display:"flex",
                                      flexDirection:"column", gap: 6}}>
                                      {g.mistakes.map((m,i)=>(
                                        <li key={i} style={{
                                          fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.dim, lineHeight: 1.5,
                                          display:"flex", gap: 8
                                        }}>
                                          <span style={{color: t.bad, fontWeight:700}}>×</span>{m}
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                )}
                              </div>
                              <div style={{
                                gridColumn: "1 / -1", paddingTop: 14, marginTop: 4,
                                borderTop: `1px solid ${t.line}`,
                                display:"flex", justifyContent:"space-between", alignItems:"center", gap: 12, flexWrap: "wrap"
                              }}>
                                <div style={{
                                  fontFamily: OP_FONT_BODY, fontSize: 11, color: t.mute,
                                  letterSpacing:"0.1em", textTransform:"uppercase"
                                }}>
                                  {isInfo
                                    ? t.ui("Wiedza do przyswojenia — oznacz gdy zrozumiałeś", "Knowledge to absorb — mark it when you understand it")
                                    : st.games > 0
                                      ? t.ui(`${st.games} gier · ${st.passed} zaliczone · ${st.rate}% compliance`, `${st.games} games · ${st.passed} passed · ${st.rate}% compliance`)
                                      : t.ui("Włącz aby zacząć trenować", "Enable it to start training")}
                                </div>
                                {(() => {
                                  const locked = isGoalLockedByPlan(g.id);
                                  const lockedLabel = t.ui("Plan wybiera", "Plan controls this");
                                  const baseStyle = {
                                    padding: "8px 14px",
                                    fontFamily: OP_FONT_BODY, fontSize: 10.5, fontWeight: 700,
                                    letterSpacing: "0.12em", textTransform: "uppercase"
                                  };
                                  if (locked) {
                                    return (
                                      <button
                                        disabled
                                        title={t.ui(
                                          "Plan kontroluje wybór zadań. Zmień sekcję planu w Opcjach lub przełącz na tryb własny.",
                                          "Plan controls task selection. Change plan section in Options or switch to custom mode."
                                        )}
                                        style={{
                                          ...baseStyle,
                                          background: t.line, color: t.mute,
                                          border: `1px solid ${t.line}`,
                                          cursor: "not-allowed",
                                          opacity: 0.7
                                        }}
                                      >{lockedLabel}</button>
                                    );
                                  }
                                  if (isInfo) {
                                    return (
                                      <button
                                        onClick={(e) => { e.stopPropagation(); toggleRead(g.id); }}
                                        style={{
                                          ...baseStyle,
                                          background: isRead ? "transparent" : t.accent,
                                          color: isRead ? t.dim : t.bg,
                                          border: isRead ? `1px solid ${t.line}` : "none",
                                          cursor: "pointer"
                                        }}
                                      >{isRead ? t.ui("Cofnij przeczytanie", "Undo read") : t.ui("Oznacz jako przeczytane", "Mark as read")}</button>
                                    );
                                  }
                                  if (isManuallyMastered) {
                                    return (
                                      <button
                                        onClick={(e) => { e.stopPropagation(); toggleMastered(g.id); }}
                                        style={{
                                          ...baseStyle,
                                          background: "transparent",
                                          color: t.dim,
                                          border: `1px solid ${t.line}`,
                                          cursor: "pointer"
                                        }}
                                      >{t.ui("Cofnij opanowanie", "Undo mastered")}</button>
                                    );
                                  }
                                  return (
                                    <div style={{display:"flex", gap: 8, flexWrap:"wrap"}}>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); toggleMastered(g.id); }}
                                        style={{
                                          ...baseStyle,
                                          background: "transparent",
                                          color: t.good,
                                          border: `1px solid ${t.good}60`,
                                          cursor: "pointer"
                                        }}
                                      >{t.ui("Pomiń — już opanowane", "Skip — already mastered")}</button>
                                      <button
                                        onClick={(e) => { e.stopPropagation(); toggleActive(g.id); }}
                                        style={{
                                          ...baseStyle,
                                          background: isActive ? "transparent" : t.accent,
                                          color: isActive ? t.dim : t.bg,
                                          border: isActive ? `1px solid ${t.line}` : "none",
                                          cursor: "pointer"
                                        }}
                                      >{isActive ? t.ui("Wyłącz trening", "Disable training") : t.ui("Włącz trening", "Enable training")}</button>
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    );
  }

  function SectionLabel({children, t, tone, style}){
    const c = tone==="good"?t.good : tone==="bad"?t.bad : tone==="warn"?t.warn : t.mute;
    return (
      <div style={{
        fontFamily: OP_FONT_BODY, fontSize: 9.5, color: c,
        letterSpacing:"0.18em", textTransform:"uppercase",
        marginBottom: 6, ...style
      }}>{children}</div>
    );
  }
  const detailBody = t => ({
    margin:0, fontFamily: OP_FONT_BODY, fontSize: 12, color: t.text, lineHeight: 1.55
  });

  // ===== PRE-GAME =====
  function PreGame({t, setScreen, refresh}){
    const [mood, setMood] = useState("fresh");
    const activeGoals = SAMPLE.activeGoals || [];
    const focusableGoals = activeGoals.filter(gid => !GOALS.find(x => x.id === gid)?.info_only);
    const hasOnlyInfoGoals = activeGoals.length > 0 && focusableGoals.length === 0;
    const [focus, setFocus] = useState(() => focusableGoals.slice(0, 2));
    const lastMistake = SAMPLE.HISTORY?.[0]?.mistake || "";
    const [avoidMistake, setAvoidMistake] = useState(
      lastMistake ? t.ui(`Nie powtórz: „${lastMistake}"`, `Do not repeat: “${lastMistake}”`) : ""
    );
    const champion = SAMPLE.currentChampion || "";
    const lane = SAMPLE.championPool?.lane || "MID";
    const moods = [
      {v:"fresh", l:t.ui("Świeży", "Fresh"),   tone:"good"},
      {v:"ok",    l:"OK",       tone:"warn"},
      {v:"tired", l:t.ui("Zmęczony", "Tired"), tone:"warn"},
      {v:"tilt",  l:"Tilt",     tone:"bad"},
    ];

    const canStart = mood !== "tilt" && focus.length >= 1 && !!champion;

    const handleStart = () => {
      if (!canStart) return;
      SAMPLE.startSession({
        startedAt: Date.now(),
        mood,
        focusGoals: focus,
        champion,
        lane,
        avoidMistake
      });
      refresh?.();
      setScreen?.("dash");
    };
    return (
      <div style={{padding: "20px 24px", display:"flex", flexDirection:"column", gap: 18, overflow:"auto", maxWidth: 920, margin:"0 auto"}}>
        <header>
          <div style={{fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.mute,
            letterSpacing:"0.18em", textTransform:"uppercase"}}>{t.ui("Plan sesji", "Session plan")}</div>
          <h1 style={{fontFamily: OP_FONT_DISP, fontSize: 28, color: t.text, fontWeight: 600,
            margin: "4px 0 0", letterSpacing:"-0.02em"}}>
            {t.ui("Jedna intencja na najbliższą grę", "One intention for the next game")}
          </h1>
          <p style={{fontFamily: OP_FONT_BODY, fontSize: 12, color: t.dim, margin: "6px 0 0",
            lineHeight: 1.5, maxWidth: 600}}>
            {t.ui(
              "Mood → focus → recall ostatnich błędów. Po kliknięciu „Zaczynam grę” startuje timer i zapisuje się snapshot do localStorage.",
              "Mood → focus → latest mistake recall. After clicking “Start game”, the timer starts and a snapshot is saved to localStorage."
            )}
          </p>
        </header>

        {!champion && (
          <div style={{
            padding: "12px 16px",
            background: `${t.warn}15`, border: `1px solid ${t.warn}80`,
            display:"flex", gap: 14, alignItems:"center", justifyContent:"space-between", flexWrap:"wrap"
          }}>
            <div style={{
              fontFamily: OP_FONT_BODY, fontSize: 12, color: t.warn, fontWeight: 600
            }}>
              ⚠ {t.ui("Brak championa. Ustaw pool i wybierz w Opcjach przed startem gry.", "No champion selected. Set your pool and choose one in Options before starting.")}
            </div>
            <button onClick={()=>setScreen?.("opt")} style={{
              background: t.warn, color: t.bg, border: "none",
              padding: "8px 14px",
              fontFamily: OP_FONT_BODY, fontSize: 10.5, fontWeight: 700,
              letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer"
            }}>{t.ui("Przejdź do Opcji", "Go to Options")}</button>
          </div>
        )}

        {champion && (
          <div style={{
            display:"flex", gap: 18, alignItems:"baseline",
            padding: "10px 14px", background: t.surface, border: `1px solid ${t.line}`
          }}>
            <Stat t={t} label="Champion" value={champion}/>
            <Stat t={t} label={t.ui("Rola", "Role")} value={lane}/>
            <Stat t={t} label={t.ui("Ostatnie gry", "Recent games")} value={`${SAMPLE.HISTORY?.length || 0}`}/>
          </div>
        )}

        {/* 1. Mood */}
        <Card t={t} step="01" title="Mood check" caption={t.ui("Jeśli tilt → blokada sesji.", "If tilted → session blocked.")}>
          <div style={{display:"grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8}}>
            {moods.map(m => {
              const a = mood===m.v;
              const col = m.tone==="good"?t.good : m.tone==="bad"?t.bad : t.warn;
              return (
                <button key={m.v} onClick={()=>setMood(m.v)} style={{
                  background: a ? `${col}15` : t.surface,
                  border: `1px solid ${a ? col : t.line}`,
                  color: a ? col : t.dim,
                  padding: "16px 12px",
                  fontFamily: OP_FONT_BODY, fontSize: 11.5, fontWeight: 700,
                  letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer",
                  display:"flex", flexDirection:"column", gap: 8, alignItems:"center"
                }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: 999, background: a?col:t.lineHi
                  }}/>
                  {m.l}
                </button>
              );
            })}
          </div>
          {mood==="tilt" && (
            <div style={{marginTop: 10, padding: "10px 14px",
              background:`${t.bad}10`, border:`1px solid ${t.bad}`,
              fontFamily: OP_FONT_BODY, fontSize: 12, color: t.bad
            }}>
              ✕ {t.ui("NIE GRAJ. Przerwa min. 1h. Sesja zablokowana po zapisie.", "DO NOT PLAY. Take at least a 1h break. The session is blocked after saving.")}
            </div>
          )}
        </Card>

        {/* 2. Focus */}
        <Card t={t} step="02" title={t.ui("Co trenujesz (max 2)", "What you train (max 2)")} caption={t.ui("Kliknij aby wybrać. Limit = 2.", "Click to choose. Limit = 2.")}>
          <div style={{display:"flex", flexDirection:"column", gap: 8}}>
            {focusableGoals.length === 0 && (
              <div style={{
                padding: "12px 14px",
                background: t.bg2,
                border: `1px solid ${hasOnlyInfoGoals ? t.accent+"60" : t.line}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap"
              }}>
                <div style={{
                  fontFamily: OP_FONT_BODY,
                  fontSize: 11.5,
                  color: t.dim,
                  lineHeight: 1.5,
                  maxWidth: 560
                }}>
                  {hasOnlyInfoGoals
                    ? t.ui("Aktualny etap planu to teoria. Przeczytaj aktywne materiały w Bazie wiedzy i oznacz je jako przeczytane.", "The current plan stage is theory. Read the active Knowledge base materials and mark them as read.")
                    : t.ui("Brak aktywnych zadań treningowych. Wybierz 1-2 zadania w Bazie wiedzy.", "No active training tasks. Choose 1-2 tasks in the Knowledge base.")}
                </div>
                <button onClick={() => setScreen?.("know")} style={{
                  background: hasOnlyInfoGoals ? t.accent : "transparent",
                  color: hasOnlyInfoGoals ? t.bg : t.dim,
                  border: hasOnlyInfoGoals ? "none" : `1px solid ${t.line}`,
                  padding: "8px 12px",
                  fontFamily: OP_FONT_BODY,
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing:"0.12em",
                  textTransform:"uppercase",
                  cursor:"pointer"
                }}>{t.ui("Baza wiedzy", "Knowledge base")}</button>
              </div>
            )}
            {focusableGoals.map(gid=>{
              const g = GOALS.find(x=>x.id===gid);
              const checked = focus.includes(gid);
              return (
                <div key={gid} onClick={()=>setFocus(f => f.includes(gid) ? f.filter(x=>x!==gid)
                  : (f.length>=2 ? f : [...f, gid]))} style={{
                  display:"grid", gridTemplateColumns: "auto 1fr auto",
                  gap: 14, alignItems:"center",
                  padding: "12px 14px",
                  background: checked ? `${t.good}10` : t.surface,
                  border: `1px solid ${checked ? t.good+"80" : t.line}`,
                  cursor:"pointer"
                }}>
                  <div style={{
                    width: 18, height: 18,
                    border: `1.5px solid ${checked ? t.good : t.mute}`,
                    background: checked ? t.good : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {checked && <Icon n="check" size={12} color={t.bg} strokeWidth={3}/>}
                  </div>
                  <div>
                    <div style={{fontFamily: OP_FONT_BODY, fontSize: 12.5, color: t.text, fontWeight: 600}}>
                      {g.label}
                    </div>
                    <div style={{fontFamily: OP_FONT_BODY, fontSize: 11, color: t.dim, marginTop: 3, lineHeight: 1.45}}>
                      {g.short}
                    </div>
                  </div>
                  <OpPill tone="dim" t={t}>
                    {g.phase === "ongoing" ? t.ui("Ciągłe", "Ongoing") : `${t.ui("F", "P")}${g.phase}${g.week ? ` · ${t.ui("tydz", "week")} ${g.week}` : ""}`}
                  </OpPill>
                </div>
              );
            })}
          </div>
        </Card>

        {/* 3. Avoid mistake */}
        <Card t={t} step="03" title={t.ui("Nie powtórz błędu", "Do not repeat the mistake")} caption={t.ui("Z ostatniej gry. Dopisz jedną intencję.", "From the last game. Add one intention.")}>
          {lastMistake && (
            <div style={{
              padding: "10px 12px",
              background: t.bg2, border: `1px solid ${t.line}`,
              fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.dim, lineHeight: 1.5,
              marginBottom: 10
            }}>
              <span style={{color: t.mute, marginRight: 8}}>↩ {t.ui("ostatnio:", "last:")}</span>
              „{lastMistake}"
            </div>
          )}
          <input
            value={avoidMistake}
            onChange={e=>setAvoidMistake(e.target.value)}
            placeholder={t.ui("np. Cofać na canon zawsze gdy >50% wave po mojej stronie.", "e.g. Recall on cannon whenever >50% of the wave is on my side.")}
            style={{
              width: "100%", background: t.surface, border: `1px solid ${t.line}`,
              color: t.text, padding: "11px 13px",
              fontFamily: OP_FONT_BODY, fontSize: 13, outline: "none"
            }}
          />
        </Card>

        {/* Start */}
        <div style={{display:"flex", gap: 10, marginTop: 4}}>
          <button onClick={()=>setScreen?.("dash")} style={{
            background: "transparent", color: t.dim,
            border: `1px solid ${t.line}`,
            padding: "13px 20px",
            fontFamily: OP_FONT_BODY, fontSize: 11.5, fontWeight: 600,
            letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer"
          }}>{t.ui("Anuluj", "Cancel")}</button>
          <button onClick={handleStart} disabled={!canStart} style={{
            flex: 1,
            background: !canStart ? t.line : t.accent,
            color: !canStart ? t.mute : t.bg,
            border: "none",
            padding: "13px 20px",
            fontFamily: OP_FONT_BODY, fontSize: 12, fontWeight: 700,
            letterSpacing:"0.18em", textTransform:"uppercase",
            cursor: !canStart ? "not-allowed" : "pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap: 10
          }}>
            <Icon n="play" size={11} color={!canStart?t.mute:t.bg}/>
            {mood === "tilt"
              ? t.ui("Tilt — nie graj", "Tilt — do not play")
              : focus.length === 0
                ? hasOnlyInfoGoals ? t.ui("Najpierw przeczytaj etap", "Read the stage first") : t.ui("Wybierz min 1 zadanie", "Pick at least 1 task")
                : !champion
                  ? t.ui("Brak championa", "No champion")
                  : t.ui("Zaczynam grę", "Start game")}
          </button>
        </div>
      </div>
    );
  }

  function Card({step, title, caption, children, t}){
    return (
      <section style={{
        background: t.surface, border: `1px solid ${t.line}`,
        padding: "18px 20px",
        display: "flex", flexDirection: "column", gap: 12
      }}>
        <div style={{display:"flex", alignItems:"baseline", gap: 14}}>
          <div style={{
            fontFamily: OP_FONT_DISP, fontSize: 22, color: t.accent, fontWeight: 600,
            letterSpacing:"-0.02em"
          }}>{step}</div>
          <div style={{flex:1}}>
            <h2 style={{fontFamily: OP_FONT_DISP, fontSize: 16, color: t.text, fontWeight: 600,
              margin: 0, letterSpacing:"-0.01em"}}>{title}</h2>
            {caption && <div style={{fontFamily: OP_FONT_BODY, fontSize: 11, color: t.dim, marginTop: 2}}>
              {caption}
            </div>}
          </div>
        </div>
        <div>{children}</div>
      </section>
    );
  }

  // ===== POST-GAME =====
  function PostGame({t, setScreen, refresh}){
    // Read focus goals from the live pre-game snapshot if present, else fall back to starter set.
    const STARTER_ACTIVE = ["minimap_3s", "continuous_clicking"];
    const snap = SAMPLE.preGameSnapshot;
    const focusFromSnapshot = snap?.focusGoals?.length ? snap.focusGoals : STARTER_ACTIVE.slice(0, 2);
    const [compliance, setCompliance] = useState(() => {
      const initial = {};
      focusFromSnapshot.forEach(id => { initial[id] = false; });
      return initial;
    });
    const [remembered, setRemembered] = useState(true);
    const [postMood, setPostMood] = useState("ok");
    const [mistake, setMistake] = useState("");
    const [winThing, setWinThing] = useState("");

    const champion = snap?.champion || SAMPLE.currentChampion || "—";
    const lane = snap?.lane || SAMPLE.championPool?.lane || "—";
    const preMood = snap?.mood || "ok";
    const startedAt = snap?.startedAt;
    const durationMin = startedAt ? Math.max(1, Math.round((Date.now() - startedAt) / 60000)) : 0;
    const gamesToday = SAMPLE.HISTORY.filter(g => g.date === SAMPLE.TODAY).length;
    const gameNo = gamesToday + 1;

    const canSave = remembered !== null
                 && Object.keys(compliance).length > 0
                 && mistake.trim().length > 0
                 && winThing.trim().length > 0;

    const handleSave = () => {
      if (!canSave) return;
      SAMPLE.recordGame({
        durationMin,
        champion,
        lane,
        mood: preMood,
        postMood,
        focusGoals: Object.keys(compliance),
        compliance,
        remembered,
        mistake: mistake.trim(),
        winThing: winThing.trim()
      });
      SAMPLE.endSession();
      refresh?.();
      setScreen?.("dash");
    };

    const moodLabels = { fresh:t.ui("Świeży", "Fresh"), ok:"OK", tired:t.ui("Zmęczony", "Tired"), tilt:"Tilt" };

    return (
      <div style={{padding: "20px 24px", overflow:"auto",
        display:"flex", flexDirection:"column", gap: 18, maxWidth: 920, margin: "0 auto"}}>
        <header>
          <div style={{fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.mute,
            letterSpacing:"0.18em", textTransform:"uppercase"}}>{t.ui("Refleksja po grze", "Post-game reflection")}</div>
          <h1 style={{fontFamily: OP_FONT_DISP, fontSize: 28, color: t.text, fontWeight: 600,
            margin: "4px 0 0", letterSpacing:"-0.02em"}}>
            {t.ui("Wygrana / Przegrana nie ma znaczenia", "Win / Loss does not matter")}
          </h1>
        </header>

        <div style={{
          background: `${t.good}10`, border: `1px solid ${t.good}60`,
          padding: "14px 16px",
          display:"flex", gap: 12, alignItems:"flex-start"
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: 999, background: t.good,
            marginTop: 6, flexShrink: 0
          }}/>
          <div>
            <div style={{fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.good, fontWeight: 700,
              letterSpacing:"0.1em", textTransform:"uppercase", marginBottom: 4}}>
              {t.ui("Refleksja poza wynikiem", "Result-independent reflection")}
            </div>
            <div style={{fontFamily: OP_FONT_BODY, fontSize: 12, color: t.dim, lineHeight: 1.55}}>
              {t.ui(
                "Liczy się WYŁĄCZNIE jak wykonałeś trenowane zadania. Wygrana ze słabym wykonaniem = strata. Przegrana z dobrym wykonaniem = postęp.",
                "Only execution of trained tasks matters. A win with weak execution is a loss for training. A loss with good execution is progress."
              )}
            </div>
          </div>
        </div>

        {/* Game meta strip */}
        <div style={{
          background: t.surface, border: `1px solid ${t.line}`,
          padding: "12px 16px",
          display:"flex", gap: 24, alignItems:"center", flexWrap:"wrap"
        }}>
          <Stat t={t} label={t.ui("Czas gry", "Game time")} value={durationMin ? `${durationMin} min` : "—"}/>
          <Stat t={t} label="Champion" value={`${champion} · ${lane}`}/>
          <Stat t={t} label="Mood pre" value={moodLabels[preMood] || "—"}/>
          <Stat t={t} label={t.ui("Sesja", "Session")} value={t.ui(`Gra ${gameNo} z dziś`, `Game ${gameNo} today`)}/>
        </div>

        {!snap && (
          <div style={{
            padding: "10px 14px",
            background: `${t.warn}12`, border: `1px solid ${t.warn}80`,
            fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.warn
          }}>
            ⚠ {t.ui(
              "Brak aktywnej sesji — zapis nadal zadziała, ale champion/duration będą puste. Zacznij grę przez „Zacznij grę”.",
              "No active session — saving still works, but champion/duration may be empty. Start through “Start game”."
            )}
          </div>
        )}

        {/* Step 1: Compliance */}
        <Card t={t} step="01" title={t.ui("Wykonanie trenowanych zadań", "Execution of trained tasks")} caption={t.ui("Świadomie, w kluczowych momentach.", "Consciously, in key moments.")}>
          <div style={{display:"flex", flexDirection:"column", gap: 8}}>
            {Object.entries(compliance).map(([gid, v]) => {
              const g = GOALS.find(x=>x.id===gid);
              return (
                <div key={gid} style={{
                  display:"grid", gridTemplateColumns:"1fr auto", gap: 14, alignItems:"center",
                  padding: "14px 16px",
                  background: t.bg2, border: `1px solid ${t.line}`
                }}>
                  <div>
                    <div style={{fontFamily: OP_FONT_BODY, fontSize: 12.5, color: t.text, fontWeight: 600}}>
                      {g.label}
                    </div>
                    <div style={{fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.dim,
                      marginTop: 4, lineHeight: 1.5}}>
                      <span style={{color:t.warn}}>{t.ui("kryterium:", "criterion:")}</span> {g.success}
                    </div>
                  </div>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 6}}>
                    <button onClick={()=>setCompliance(c=>({...c, [gid]: true}))} style={{
                      background: v===true ? t.good : "transparent",
                      color: v===true ? t.bg : t.dim,
                      border: `1px solid ${v===true ? t.good : t.line}`,
                      padding: "8px 14px",
                      fontFamily: OP_FONT_BODY, fontSize: 10.5, fontWeight: 700,
                      letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer",
                      display:"flex", alignItems:"center", gap: 6
                    }}>
                      <Icon n="check" size={12} color={v===true?t.bg:t.dim} strokeWidth={2.5}/>
                      {t.ui("Zal.", "Pass")}
                    </button>
                    <button onClick={()=>setCompliance(c=>({...c, [gid]: false}))} style={{
                      background: v===false ? t.bad : "transparent",
                      color: v===false ? "#fff" : t.dim,
                      border: `1px solid ${v===false ? t.bad : t.line}`,
                      padding: "8px 14px",
                      fontFamily: OP_FONT_BODY, fontSize: 10.5, fontWeight: 700,
                      letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer",
                      display:"flex", alignItems:"center", gap: 6
                    }}>
                      <Icon n="x" size={12} color={v===false?"#fff":t.dim} strokeWidth={2.5}/>
                      {t.ui("Nie", "No")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Step 2: Remembered */}
        <Card t={t} step="02" title={t.ui("Czy pamiętasz tę grę?", "Do you remember this game?")} caption={t.ui("Lane → mid game → walka. Nie pamiętasz = koniec sesji.", "Lane → mid game → fight. If you do not remember it, end the session.")}>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 8}}>
            <button onClick={()=>setRemembered(true)} style={{
              padding: "16px 18px",
              background: remembered===true ? `${t.good}15` : t.surface,
              color: remembered===true ? t.good : t.dim,
              border: `1px solid ${remembered===true ? t.good : t.line}`,
              fontFamily: OP_FONT_BODY, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer"
            }}>{t.ui("Tak, pamiętam", "Yes, I remember")}</button>
            <button onClick={()=>setRemembered(false)} style={{
              padding: "16px 18px",
              background: remembered===false ? `${t.bad}15` : t.surface,
              color: remembered===false ? t.bad : t.dim,
              border: `1px solid ${remembered===false ? t.bad : t.line}`,
              fontFamily: OP_FONT_BODY, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer"
            }}>{t.ui("Nie / Słabo", "No / Barely")}</button>
          </div>
        </Card>

        {/* Step 3/4: Mistake + Win */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12}}>
          <TextStep t={t} step="03" title={t.ui("Jeden konkretny błąd", "One specific mistake")} tone="bad"
            placeholder={t.ui("np. Cofnąłem nie na canon w 12 min, oddałem 3 CS.", "e.g. I did not recall on cannon at 12:00 and gave up 3 CS.")}
            value={mistake} onChange={setMistake}/>
          <TextStep t={t} step="04" title={t.ui("Jedna rzecz która wyszła", "One thing that went well")} tone="good"
            placeholder={t.ui("np. Trzy razy out-roamowałem enemy mida.", "e.g. I out-roamed enemy mid three times.")}
            value={winThing} onChange={setWinThing}/>
        </div>

        {/* Step 5: post mood */}
        <Card t={t} step="05" title={t.ui("Mood po grze", "Post-game mood")}>
          <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap: 8}}>
            {[
              {v:"fresh", l:t.ui("Świeży", "Fresh"),   tone:"good"},
              {v:"ok",    l:"OK",       tone:"warn"},
              {v:"tired", l:t.ui("Zmęczony", "Tired"), tone:"warn"},
              {v:"tilt",  l:"Tilt",     tone:"bad"},
            ].map(m=>{
              const a = postMood===m.v;
              const col = m.tone==="good"?t.good : m.tone==="bad"?t.bad : t.warn;
              return (
                <button key={m.v} onClick={()=>setPostMood(m.v)} style={{
                  background: a ? `${col}15` : t.bg2,
                  color: a ? col : t.dim,
                  border: `1px solid ${a?col:t.line}`,
                  padding: "12px 14px",
                  fontFamily: OP_FONT_BODY, fontSize: 11, fontWeight: 700,
                  letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer"
                }}>{m.l}</button>
              );
            })}
          </div>
        </Card>

        <div style={{display:"flex", gap: 10, marginTop: 4}}>
          <button onClick={()=>setScreen?.("dash")} style={{
            background: "transparent", color: t.dim,
            border: `1px solid ${t.line}`,
            padding: "14px 20px",
            fontFamily: OP_FONT_BODY, fontSize: 11.5, fontWeight: 600,
            letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer"
          }}>{t.ui("Anuluj", "Cancel")}</button>
          <button onClick={handleSave} disabled={!canSave} style={{
            flex: 1,
            background: canSave ? t.accent : t.line,
            color: canSave ? t.bg : t.mute,
            border: "none",
            padding: "14px 20px",
            fontFamily: OP_FONT_BODY, fontSize: 12, fontWeight: 700,
            letterSpacing:"0.18em", textTransform:"uppercase",
            cursor: canSave ? "pointer" : "not-allowed"
          }}>
            {canSave
              ? t.ui("Zapisz refleksję", "Save reflection")
              : !mistake.trim()
                ? t.ui("Dopisz błąd", "Add a mistake")
                : !winThing.trim()
                  ? t.ui("Dopisz co wyszło", "Add what went well")
                  : t.ui("Wypełnij wszystkie pola", "Fill all fields")}
          </button>
        </div>
      </div>
    );
  }

  function Stat({label, value, t}){
    return (
      <div>
        <div style={{fontFamily: OP_FONT_BODY, fontSize: 9.5, color: t.mute,
          letterSpacing:"0.16em", textTransform:"uppercase", marginBottom: 3}}>{label}</div>
        <div style={{fontFamily: OP_FONT_BODY, fontSize: 13, color: t.text, fontWeight: 500}}>{value}</div>
      </div>
    );
  }

  function TextStep({step, title, tone, placeholder, value, onChange, t}){
    const col = tone==="good"?t.good : tone==="bad"?t.bad : t.warn;
    return (
      <section style={{
        background: t.surface, border: `1px solid ${t.line}`,
        borderLeft: `2px solid ${col}`,
        padding: "16px 18px", display:"flex", flexDirection:"column", gap: 10
      }}>
        <div style={{display:"flex", alignItems:"baseline", gap: 14}}>
          <div style={{fontFamily: OP_FONT_DISP, fontSize: 20, color: col, fontWeight: 600}}>{step}</div>
          <h2 style={{fontFamily: OP_FONT_DISP, fontSize: 15, color: t.text, fontWeight: 600,
            margin: 0, letterSpacing:"-0.01em"}}>{title}</h2>
        </div>
        <textarea
          value={value || ""}
          onChange={e => onChange?.(e.target.value)}
          rows={3}
          placeholder={placeholder}
          style={{
            width: "100%", background: t.bg2, border: `1px solid ${t.line}`,
            color: t.text, padding: "11px 13px",
            fontFamily: OP_FONT_BODY, fontSize: 12.5, outline: "none",
            resize: "vertical", lineHeight: 1.5
          }}
        />
      </section>
    );
  }

  // ===== PROGRESS =====
  function Progress({t}){
    const PLAN_STAGES = (window.SAMPLE.PLAN_STAGES) || [];
    const planCursor = window.SAMPLE.planCursor || { stageIdx: 0, sectionIdx: 0 };
    const sectionsArr = window.SAMPLE.SECTIONS || [];
    const mode = window.SAMPLE.mode || "custom";

    // === Real mastery distribution over ALL goals ===
    const stats = GOALS.map(g => ({ g, st: computeGoalStats(g.id) }));
    const buckets = {
      mastered:    stats.filter(x => x.st.level === 3).length,                      // OPANOWANE (trainable)
      consolid:    stats.filter(x => x.st.level === 2).length,                      // UTRWALONE
      initial:     stats.filter(x => x.st.level === 1 && !x.st.isInfoOnly).length,  // WSTĘPNIE
      readInfo:    stats.filter(x => x.st.level === 1 && x.st.isInfoOnly).length,   // INFO: PRZECZYTANE
      training:    stats.filter(x => x.st.level === 0 && x.st.games > 0).length,    // W TRENINGU
      needsWork:   stats.filter(x => x.st.level === -1).length,                     // WYMAGA POPRAWY
      notStarted:  stats.filter(x => x.st.level === 0 && x.st.games === 0).length   // NIE ROZPOCZĘTE
    };
    const totalGoals = GOALS.length;
    const totalDone = buckets.mastered + buckets.consolid + buckets.initial + buckets.readInfo;
    const overallRate = totalGoals ? Math.round((totalDone / totalGoals) * 100) : 0;

    const masteryStates = [
      {key: "mastered",   label: t.ui("Opanowane", "Mastered"),                count: buckets.mastered,   color: t.good},
      {key: "consolid",   label: t.ui("Utrwalone", "Consolidated"),            count: buckets.consolid,   color: "oklch(0.65 0.16 150)"},
      {key: "initial",    label: t.ui("Wstępnie opan.", "Initially mastered"), count: buckets.initial,    color: t.accent},
      {key: "readInfo",   label: t.ui("Przeczytane (info)", "Read (info)"),    count: buckets.readInfo,   color: "oklch(0.62 0.13 220)"},
      {key: "training",   label: t.ui("W treningu", "In training"),            count: buckets.training,   color: t.warn},
      {key: "needsWork",  label: t.ui("Wymaga poprawy", "Needs work"),         count: buckets.needsWork,  color: t.bad},
      {key: "notStarted", label: t.ui("Nie zaczęte", "Not started"),           count: buckets.notStarted, color: t.lineHi}
    ];

    // === Per-stage progress ===
    const stageProgress = PLAN_STAGES.map((stage, idx) => {
      const stageGoals = stage.sections.flatMap(secId => GOALS.filter(g => g.section === secId));
      const masteredCount = stageGoals.filter(g => computeGoalStats(g.id).level >= 1).length;
      const rate = stageGoals.length ? Math.round((masteredCount / stageGoals.length) * 100) : 0;
      return { stage, idx, stageGoals, masteredCount, rate };
    });

    const overallPlanRate = (() => {
      const total = stageProgress.reduce((a, s) => a + s.stageGoals.length, 0);
      const done  = stageProgress.reduce((a, s) => a + s.masteredCount, 0);
      return total ? Math.round((done / total) * 100) : 0;
    })();

    return (
      <div style={{padding: "20px 24px", display:"flex", flexDirection:"column", gap: 20, overflow:"auto"}}>
        <header>
          <div style={{fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.mute,
            letterSpacing:"0.18em", textTransform:"uppercase"}}>{t.ui("Tracker postępu", "Progress tracker")}</div>
          <h1 style={{fontFamily: OP_FONT_DISP, fontSize: 28, color: t.text, fontWeight: 600,
            margin: "4px 0 0", letterSpacing:"-0.02em"}}>
            {t.ui(
              `Plan nauki · ${totalDone} / ${totalGoals} (${overallRate}%)`,
              `Learning plan · ${totalDone} / ${totalGoals} (${overallRate}%)`
            )}
          </h1>
          <p style={{fontFamily: OP_FONT_BODY, fontSize: 12, color: t.dim, marginTop: 6, lineHeight: 1.5, margin: "6px 0 0"}}>
            {mode === "plan"
              ? t.ui(
                  `Tryb planu · etap ${planCursor.stageIdx + 1} / ${PLAN_STAGES.length} · sekcja ${planCursor.sectionIdx + 1} / ${PLAN_STAGES[planCursor.stageIdx]?.sections?.length || "?"}`,
                  `Plan mode · stage ${planCursor.stageIdx + 1} / ${PLAN_STAGES.length} · section ${planCursor.sectionIdx + 1} / ${PLAN_STAGES[planCursor.stageIdx]?.sections?.length || "?"}`
                )
              : t.ui("Tryb własny — sam wybierasz co trenować.", "Custom mode — you pick what to train.")}
          </p>
        </header>

        {/* Mastery distribution */}
        <section style={{background: t.surface, border: `1px solid ${t.line}`, padding: "18px 20px"}}>
          <div style={{display:"flex", justifyContent:"space-between", marginBottom: 14, alignItems:"baseline", flexWrap:"wrap", gap: 10}}>
            <div>
              <div style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
                letterSpacing:"0.16em", textTransform:"uppercase"}}>{t.ui("Dystrybucja masterowania", "Mastery distribution")}</div>
              <div style={{fontFamily: OP_FONT_DISP, fontSize: 17, color: t.text, fontWeight: 600, marginTop: 2}}>
                {totalGoals} {t.ui("zadań w bazie", "tasks in base")} · {totalDone} {t.ui("zaliczonych", "completed")}
              </div>
            </div>
            <div style={{fontFamily: OP_FONT_DISP, fontSize: 22, color: t.text, fontWeight: 600}}>
              {overallRate}%
            </div>
          </div>
          <div style={{display:"flex", height: 28, border: `1px solid ${t.line}`, overflow:"hidden"}}>
            {masteryStates.filter(s => s.count > 0).map(s => (
              <div key={s.key} style={{
                flex: s.count, background: s.color, position: "relative", minWidth: 2
              }} title={`${s.label}: ${s.count}`}/>
            ))}
            {totalDone === 0 && buckets.notStarted === totalGoals && (
              <div style={{flex: 1, background: t.lineHi, display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily: OP_FONT_BODY, fontSize: 10, color: t.dim, letterSpacing:"0.12em", textTransform:"uppercase"}}>
                {t.ui("Brak postępu — zacznij pierwszą grę / przeczytaj pierwszą sekcję", "No progress yet — start your first game or read a section")}
              </div>
            )}
          </div>
          <div style={{display:"flex", flexWrap:"wrap", gap: 14, marginTop: 12}}>
            {masteryStates.map(s => (
              <div key={s.key} style={{display:"flex", alignItems:"center", gap: 7,
                opacity: s.count === 0 ? 0.5 : 1}}>
                <span style={{width: 10, height: 10, background: s.color}}/>
                <span style={{fontFamily: OP_FONT_BODY, fontSize: 11, color: t.dim,
                  letterSpacing:"0.06em"}}>{s.label}</span>
                <span style={{fontFamily: OP_FONT_DISP, fontSize: 13, color: t.text, fontWeight: 600}}>
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Plan stages */}
        <section style={{display:"flex", flexDirection:"column", gap: 12}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
            <div style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
              letterSpacing:"0.16em", textTransform:"uppercase"}}>{t.ui("Etapy planu", "Plan stages")}</div>
            <div style={{fontFamily: OP_FONT_BODY, fontSize: 11, color: t.dim}}>
              {t.ui(`Łącznie: ${overallPlanRate}% planu`, `Overall: ${overallPlanRate}% of plan`)}
            </div>
          </div>
          <div style={{display:"grid", gridTemplateColumns: `repeat(${Math.max(1, PLAN_STAGES.length)}, 1fr)`, gap: 12}}>
            {stageProgress.map(({ stage, idx, stageGoals, masteredCount, rate }) => {
              const isCurrent = mode === "plan" && idx === planCursor.stageIdx;
              const isDone = rate === 100 && stageGoals.length > 0;
              return (
                <div key={stage.id} style={{
                  background: t.surface,
                  border: `1px solid ${isCurrent ? t.accent : isDone ? t.good : t.line}`,
                  padding: "16px 18px", display:"flex", flexDirection:"column", gap: 12
                }}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", gap: 8}}>
                    <div style={{minWidth: 0}}>
                      <div style={{fontFamily: OP_FONT_BODY, fontSize: 9.5, color: t.mute,
                        letterSpacing:"0.18em", textTransform:"uppercase"}}>
                        {stage.short || `${t.ui("Etap", "Stage")} ${idx + 1}`}
                      </div>
                      <div style={{fontFamily: OP_FONT_DISP, fontSize: 17, color: t.text, fontWeight: 600,
                        letterSpacing:"-0.01em", marginTop: 2}}>{stage.name}</div>
                    </div>
                    {isCurrent && <OpPill tone="accent" t={t}>{t.ui("Tu jesteś", "You are here")}</OpPill>}
                    {isDone && !isCurrent && <OpPill tone="good" t={t}>{t.ui("Ukończone", "Done")}</OpPill>}
                  </div>
                  <div>
                    <div style={{display:"flex", justifyContent:"space-between", marginBottom: 5,
                      fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.dim}}>
                      <span>{masteredCount}/{stageGoals.length} {t.ui("zaliczone", "completed")}</span>
                      <span style={{color: t.text, fontWeight: 600}}>{rate}%</span>
                    </div>
                    <OpBar value={rate} color={isDone ? t.good : isCurrent ? t.accent : t.dim} bg={t.line} height={6}/>
                  </div>
                  {/* Sections inside stage */}
                  <div style={{display:"flex", flexDirection:"column", gap: 8, marginTop: 2}}>
                    {stage.sections.map((secId, secIdx) => {
                      const sec = sectionsArr.find(s => s.id === secId);
                      const secGoals = GOALS.filter(g => g.section === secId);
                      const secDone = secGoals.filter(g => computeGoalStats(g.id).level >= 1).length;
                      const secRate = secGoals.length ? Math.round((secDone / secGoals.length) * 100) : 0;
                      const isSecCurrent = isCurrent && secIdx === planCursor.sectionIdx;
                      const col = secRate === 100 && secGoals.length > 0 ? t.good
                                 : isSecCurrent ? t.accent
                                 : secDone > 0 ? t.warn : t.lineHi;
                      return (
                        <div key={secId} style={{
                          padding: "8px 10px",
                          background: isSecCurrent ? `${t.accent}10` : t.bg2,
                          border: `1px solid ${isSecCurrent ? t.accent : t.line}`,
                          display:"flex", flexDirection:"column", gap: 4
                        }}>
                          <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", gap: 8}}>
                            <div style={{
                              fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.text, fontWeight: 600,
                              overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"
                            }}>{sec?.name || secId}</div>
                            <div style={{display:"flex", gap: 8, alignItems:"baseline", flexShrink: 0}}>
                              <span style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
                                letterSpacing:"0.1em"}}>{secDone}/{secGoals.length}</span>
                              <span style={{fontFamily: OP_FONT_DISP, fontSize: 12, color: t.text, fontWeight: 600}}>
                                {secRate}%
                              </span>
                            </div>
                          </div>
                          <OpBar value={secRate} color={col} bg={t.line} height={3}/>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    );
  }

  // ===== HISTORY =====
  function History({t}){
    return (
      <div style={{padding: "20px 24px", display:"flex", flexDirection:"column", gap: 16, overflow:"auto"}}>
        <header>
          <div style={{fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.mute,
            letterSpacing:"0.18em", textTransform:"uppercase"}}>{t.ui("Historia gier", "Game history")}</div>
          <h1 style={{fontFamily: OP_FONT_DISP, fontSize: 28, color: t.text, fontWeight: 600,
            margin: "4px 0 0", letterSpacing:"-0.02em"}}>
            {t.ui("Ostatnie sesje · bez W/L", "Recent sessions · no W/L")}
          </h1>
        </header>

        <section style={{background: t.surface, border: `1px solid ${t.line}`}}>
          <div style={{
            padding: "12px 20px",
            borderBottom: `1px solid ${t.line}`,
            display:"flex", justifyContent:"space-between", alignItems:"baseline"
          }}>
            <div>
              <div style={{fontFamily: OP_FONT_BODY, fontSize: 10, color: t.mute,
                letterSpacing:"0.16em", textTransform:"uppercase"}}>{t.ui("Lista gier", "Game list")}</div>
              <div style={{fontFamily: OP_FONT_DISP, fontSize: 16, color: t.text, fontWeight: 600, marginTop: 2}}>
                {HISTORY.length === 0
                  ? t.ui("Brak zapisanych gier", "No saved games")
                  : t.ui(`Ostatnie ${HISTORY.length} gier`, `Last ${HISTORY.length} games`)}
              </div>
            </div>
          </div>
          <div>
            <div style={{
              display:"grid",
              gridTemplateColumns: "100px 1fr 70px 80px 90px minmax(180px, 1fr)",
              padding: "9px 20px",
              fontFamily: OP_FONT_BODY, fontSize: 9.5, color: t.mute,
              letterSpacing:"0.16em", textTransform:"uppercase",
              borderBottom: `1px solid ${t.line}`,
              gap: 12
            }}>
              <div>{t.ui("Data", "Date")}</div>
              <div>Focus</div>
              <div>{t.ui("Czas", "Time")}</div>
              <div>Mood</div>
              <div>Compliance</div>
              <div>{t.ui("Błąd", "Mistake")}</div>
            </div>
            {HISTORY.length === 0 ? (
              <div style={{
                padding: "28px 20px",
                fontFamily: OP_FONT_BODY,
                fontSize: 12,
                color: t.mute,
                lineHeight: 1.6
              }}>
                {t.ui(
                  "Po zapisaniu refleksji po grze pojawi się tutaj chronologiczna lista sesji.",
                  "After saving a post-game reflection, a chronological session list will appear here."
                )}
              </div>
            ) : HISTORY.map(g => {
              const compliance = g.compliance || {};
              const rate = Math.round(
                Object.values(compliance).filter(Boolean).length /
                Math.max(1, Object.values(compliance).length) * 100);
              const col = rate >= 75 ? t.good : rate >= 50 ? t.warn : t.bad;
              return (
                <div key={g.id} style={{
                  display:"grid",
                  gridTemplateColumns: "100px 1fr 70px 80px 90px minmax(180px, 1fr)",
                  padding: "11px 20px",
                  fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.text,
                  borderBottom: `1px solid ${t.line}`,
                  alignItems:"center", gap: 12
                }}>
                  <div style={{color: t.dim}}>
                    <div>{g.date?.slice(5) || "—"}</div>
                    <div style={{fontSize: 10, color: t.mute}}>{g.time || ""}</div>
                  </div>
                  <div style={{display:"flex", gap: 6, flexWrap:"wrap"}}>
                    {(g.focusGoals || []).map(gid => {
                      const goal = GOALS.find(x=>x.id===gid);
                      const passed = !!compliance[gid];
                      return (
                        <span key={gid} style={{
                          display:"inline-flex", alignItems:"center", gap: 6,
                          padding:"3px 7px",
                          background: passed ? `${t.good}12` : `${t.bad}12`,
                          border: `1px solid ${passed ? t.good+"50" : t.bad+"50"}`,
                          fontSize: 10.5, color: passed ? t.good : t.bad,
                          fontWeight: 600
                        }}>
                          {passed ? "✓" : "×"} {(goal?.label || gid).slice(0, 24)}
                        </span>
                      );
                    })}
                  </div>
                  <div style={{color: t.dim}}>{g.durationMin || 0}m</div>
                  <div style={{color: g.postMood==="tilt"?t.bad:t.dim, fontWeight: 600,
                    fontSize: 10.5, letterSpacing:"0.1em", textTransform:"uppercase"}}>
                    {g.mood || "—"}→{g.postMood || "—"}
                  </div>
                  <div style={{display:"flex", alignItems:"center", gap: 6}}>
                    <span style={{fontFamily: OP_FONT_DISP, color: col, fontWeight: 600}}>{rate}%</span>
                  </div>
                  <div style={{color: t.dim, fontSize: 11, lineHeight: 1.4,
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>
                    {g.mistake || "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // ===== FIRST-RUN WIZARD =====
  // Rendered as a full-screen overlay when state.firstRunDone is false.
  function FirstRunWizard({t, onDone}){
    const [step, setStep] = useState(0);
    const [lane, setLane] = useState(SAMPLE.championPool?.lane || "MID");
    const [champs, setChamps] = useState(() => {
      const arr = SAMPLE.championPool?.champions || [];
      return [...arr, "", "", ""].slice(0, 3);
    });
    const [currentChamp, setCurrentChamp] = useState(SAMPLE.currentChampion || "");
    const [mode, setMode] = useState("plan"); // default recommendation
    const [prefs, setPrefs] = useState(SAMPLE.preferences || { themeMode: "dark", language: "en" });
    t = {
      ...getOpTokens({ mode: prefs.themeMode || "dark", accent: "amber" }),
      themeMode: prefs.themeMode || "dark",
      language: prefs.language || "en",
      ui(pl, en) {
        return (prefs.language || "en") === "en" ? (en || pl) : pl;
      }
    };
    const LANES = ["TOP","JG","MID","ADC","SUP"];
    const totalSteps = 4;

    const cleanedChamps = champs.map(c => c.trim()).filter(Boolean);
    const canAdvanceFrom1 = cleanedChamps.length >= 1;
    const canAdvanceFrom2 = currentChamp && cleanedChamps.includes(currentChamp);

    const setPreference = (patch) => {
      const nextPrefs = { ...prefs, ...patch };
      setPrefs(nextPrefs);
      SAMPLE.setPreferences(nextPrefs);
      document.documentElement.dataset.opTheme = nextPrefs.themeMode;
      document.documentElement.lang = nextPrefs.language === "pl" ? "pl" : "en";
      onDone?.();
    };

    const finish = () => {
      SAMPLE.setPreferences(prefs);
      SAMPLE.setChampionPool({ lane, champions: cleanedChamps });
      SAMPLE.setCurrentChampion(currentChamp);
      SAMPLE.completeFirstRun({ mode });
      onDone?.();
    };

    const next = () => setStep(s => Math.min(s + 1, totalSteps - 1));
    const prev = () => setStep(s => Math.max(s - 1, 0));

    // Common styles
    const labelStyle = {
      fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.mute,
      letterSpacing:"0.14em", textTransform:"uppercase"
    };
    const inputStyle = {
      background: t.bg2, border: `1px solid ${t.line}`,
      color: t.text, padding: "10px 12px",
      fontFamily: OP_FONT_BODY, fontSize: 13, outline: "none"
    };
    const btnPrimary = (enabled = true) => ({
      background: enabled ? t.accent : t.line,
      color: enabled ? t.bg : t.mute,
      border: "none",
      padding: "12px 22px",
      fontFamily: OP_FONT_BODY, fontSize: 11.5, fontWeight: 700,
      letterSpacing:"0.16em", textTransform:"uppercase",
      cursor: enabled ? "pointer" : "not-allowed"
    });
    const btnGhost = {
      background: "transparent", color: t.dim,
      border: `1px solid ${t.line}`,
      padding: "12px 18px",
      fontFamily: OP_FONT_BODY, fontSize: 11, fontWeight: 600,
      letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer"
    };

    return (
      <div style={{
        position:"absolute", inset: 0,
        background: t.bg,
        overflow: "auto",
        display: "flex", alignItems: "flex-start", justifyContent: "center"
      }}>
        <div style={{
          width: "100%", maxWidth: 720, padding: "48px 32px"
        }}>
          {/* Header */}
          <div style={{display:"flex", alignItems:"center", gap: 14, marginBottom: 28}}>
            <img src="/master-track-icon.svg" alt="" width="48" height="48"/>
            <div>
              <div style={{...labelStyle, marginBottom: 4}}>{t.ui("Pierwsze uruchomienie", "First run")}</div>
              <h1 style={{
                fontFamily: OP_FONT_DISP, fontSize: 26, color: t.text, fontWeight: 600,
                margin: 0, letterSpacing:"-0.02em"
              }}>{t.ui("Witaj w Master Track", "Welcome to Master Track")}</h1>
            </div>
          </div>

          {/* Progress strip */}
          <div style={{
            display:"flex", gap: 4, marginBottom: 28
          }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{
                flex: 1, height: 3,
                background: i <= step ? t.accent : t.line
              }}/>
            ))}
          </div>

          {/* STEP 0 — Welcome + preferences */}
          {step === 0 && (
            <div style={{display:"flex", flexDirection:"column", gap: 18}}>
              <div>
                <h2 style={{
                  fontFamily: OP_FONT_DISP, fontSize: 22, color: t.text,
                  fontWeight: 600, margin: 0, letterSpacing:"-0.01em"
                }}>{t.ui("O co chodzi w tej aplikacji", "What this app is for")}</h2>
              </div>
              <div style={{
                fontFamily: OP_FONT_BODY, fontSize: 13.5, color: t.text, lineHeight: 1.65
              }}>
                {t.ui(
                  "Master Track to lokalny tracker dyscypliny treningowej w soloQ. Nie patrzysz na WIN/LOSS — patrzysz na jakość wykonania: czy zrealizowałeś trenowane zadania świadomie?",
                  "Master Track is a local soloQ training discipline tracker. You do not judge WIN/LOSS — you judge execution quality: did you consciously perform the tasks you trained?"
                )}
                <br/><br/>
                {t.ui(
                  "Baza wiedzy ma 186 zadań z 3 obszarów: SoloQ (teoria, mindset), MICRO (wykonanie) i MACRO (decyzje). Wybierz tryb, który pasuje do twojego stylu nauki:",
                  "The knowledge base has 186 tasks across 3 areas: SoloQ (theory, mindset), MICRO (execution), and MACRO (decisions). Choose the mode that fits your learning style:"
                )}
              </div>

              <div style={{
                display:"grid", gridTemplateColumns:"1fr 1fr", gap: 10,
                background: t.surface, border: `1px solid ${t.line}`, padding: "14px 16px"
              }}>
                <div>
                  <div style={{...labelStyle, marginBottom: 6}}>{t.ui("Motyw", "Theme")}</div>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", border: `1px solid ${t.line}`}}>
                    {[
                      { k: "dark", label: t.ui("Ciemny", "Dark") },
                      { k: "light", label: t.ui("Jasny", "Light") }
                    ].map(opt => {
                      const active = prefs.themeMode === opt.k;
                      return (
                        <button key={opt.k} onClick={() => setPreference({ themeMode: opt.k })} style={{
                          padding: "10px 8px",
                          background: active ? t.accent : "transparent",
                          color: active ? t.bg : t.dim,
                          border: "none",
                          fontFamily: OP_FONT_BODY,
                          fontSize: 10.5,
                          fontWeight: 700,
                          letterSpacing:"0.12em",
                          textTransform:"uppercase",
                          cursor:"pointer"
                        }}>{opt.label}</button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div style={{...labelStyle, marginBottom: 6}}>{t.ui("Język", "Language")}</div>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", border: `1px solid ${t.line}`}}>
                    {[
                      { k: "en", label: "English" },
                      { k: "pl", label: "Polski" }
                    ].map(opt => {
                      const active = prefs.language === opt.k;
                      return (
                        <button key={opt.k} onClick={() => setPreference({ language: opt.k })} style={{
                          padding: "10px 8px",
                          background: active ? t.accent : "transparent",
                          color: active ? t.bg : t.dim,
                          border: "none",
                          fontFamily: OP_FONT_BODY,
                          fontSize: 10.5,
                          fontWeight: 700,
                          letterSpacing:"0.12em",
                          textTransform:"uppercase",
                          cursor:"pointer"
                        }}>{opt.label}</button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div style={{display:"grid", gap: 10, marginTop: 6}}>
                {[
                  {k: "plan",   l: t.ui("Plan automatyczny", "Automatic plan"), d: t.ui("System prowadzi Cię etapem: najpierw SoloQ → Micro → Macro. Ustawienia zostają jako jednorazowa checklista poza planem.", "The system guides you by stage: SoloQ first → Micro → Macro. Settings remain a one-time checklist outside the plan.")},
                  {k: "custom", l: t.ui("Tryb własny", "Custom mode"), d: t.ui("Sam decydujesz co trenować. Dla osób które wiedzą co robią.", "You decide what to train. For players who know exactly what they want to work on.")}
                ].map(m => {
                  const a = mode === m.k;
                  return (
                    <button key={m.k} onClick={()=>setMode(m.k)} style={{
                      textAlign: "left",
                      background: a ? `${t.accent}10` : t.surface,
                      border: `1px solid ${a ? t.accent : t.line}`,
                      borderLeft: `3px solid ${a ? t.accent : t.line}`,
                      padding: "14px 16px",
                      cursor: "pointer",
                      display: "grid", gap: 4
                    }}>
                      <div style={{
                        fontFamily: OP_FONT_BODY, fontSize: 13, color: t.text, fontWeight: 700
                      }}>{m.l} {m.k === "plan" && <span style={{color: t.accent, fontSize: 10, letterSpacing: "0.1em", marginLeft: 8}}>{t.ui("ZALECANY", "RECOMMENDED")}</span>}</div>
                      <div style={{
                        fontFamily: OP_FONT_BODY, fontSize: 11.5, color: t.dim, lineHeight: 1.5
                      }}>{m.d}</div>
                    </button>
                  );
                })}
              </div>
              <div style={{display:"flex", justifyContent:"flex-end", marginTop: 14}}>
                <button onClick={next} style={btnPrimary(true)}>{t.ui("Dalej", "Next")}</button>
              </div>
            </div>
          )}

          {/* STEP 1 — Lane + champion pool */}
          {step === 1 && (
            <div style={{display:"flex", flexDirection:"column", gap: 18}}>
              <div>
                <h2 style={{
                  fontFamily: OP_FONT_DISP, fontSize: 22, color: t.text,
                  fontWeight: 600, margin: 0, letterSpacing:"-0.01em"
                }}>{t.ui("Lane + champion pool", "Lane + champion pool")}</h2>
                <div style={{fontFamily: OP_FONT_BODY, fontSize: 12, color: t.dim, marginTop: 6, lineHeight: 1.5}}>
                  {t.ui(
                    "Wybierz główną rolę i maksymalnie 3 postacie. Mała pula → szybsza automatyzacja gry → więcej zasobów na decyzje.",
                    "Choose your main role and up to 3 champions. A small pool means faster automation and more mental resources for decisions."
                  )}
                </div>
              </div>

              <div>
                <div style={{...labelStyle, marginBottom: 6}}>{t.ui("Główna rola", "Main role")}</div>
                <div style={{display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap: 0,
                  border: `1px solid ${t.line}`}}>
                  {LANES.map(l => {
                    const a = lane === l;
                    return (
                      <button key={l} onClick={()=>setLane(l)} style={{
                        padding: "10px 4px",
                        background: a ? t.accent : "transparent",
                        color: a ? t.bg : t.dim,
                        border: "none",
                        fontFamily: OP_FONT_BODY, fontSize: 11, fontWeight: 700,
                        letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer"
                      }}>{l}</button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div style={{...labelStyle, marginBottom: 6}}>{t.ui("Postacie (min 1, max 3)", "Champions (min 1, max 3)")}</div>
                <div style={{display:"flex", flexDirection:"column", gap: 8}}>
                  {champs.map((ch, i) => (
                    <div key={i} style={{display:"grid", gridTemplateColumns:"32px 1fr", gap:10, alignItems:"center"}}>
                      <div style={{
                        fontFamily: OP_FONT_DISP, fontSize: 14, color: t.mute, textAlign:"center"
                      }}>#{i+1}</div>
                      <input
                        value={ch}
                        onChange={e=>{
                          const next = [...champs];
                          next[i] = e.target.value;
                          setChamps(next);
                        }}
                        placeholder={`${t.ui("np.", "e.g.")} ${["Sylas","LeBlanc","Akali"][i] || "champion"}`}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{display:"flex", justifyContent:"space-between", marginTop: 14}}>
                <button onClick={prev} style={btnGhost}>{t.ui("Wstecz", "Back")}</button>
                <button onClick={next} disabled={!canAdvanceFrom1} style={btnPrimary(canAdvanceFrom1)}>
                  {canAdvanceFrom1 ? t.ui("Dalej", "Next") : t.ui("Dodaj min 1 postać", "Add at least 1 champion")}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — current champion */}
          {step === 2 && (
            <div style={{display:"flex", flexDirection:"column", gap: 18}}>
              <div>
                <h2 style={{
                  fontFamily: OP_FONT_DISP, fontSize: 22, color: t.text,
                  fontWeight: 600, margin: 0, letterSpacing:"-0.01em"
                }}>{t.ui("Wybierz championa na pierwsze gry", "Pick the champion for your first games")}</h2>
                <div style={{fontFamily: OP_FONT_BODY, fontSize: 12, color: t.dim, marginTop: 6, lineHeight: 1.5}}>
                  {t.ui(
                    "Możesz go zmieniać między grami w Opcjach. Tu wybierz jednego, którym zaczynasz.",
                    "You can change it between games in Options. Pick the one you want to start with."
                  )}
                </div>
              </div>
              <div style={{display:"flex", gap: 8, flexWrap:"wrap"}}>
                {cleanedChamps.map(c => {
                  const a = currentChamp === c;
                  return (
                    <button key={c} onClick={()=>setCurrentChamp(c)} style={{
                      padding: "12px 18px",
                      background: a ? t.good : "transparent",
                      color: a ? t.bg : t.dim,
                      border: `1px solid ${a ? t.good : t.line}`,
                      fontFamily: OP_FONT_BODY, fontSize: 12.5, fontWeight: 700,
                      letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer"
                    }}>{c}</button>
                  );
                })}
              </div>
              <div style={{display:"flex", justifyContent:"space-between", marginTop: 14}}>
                <button onClick={prev} style={btnGhost}>{t.ui("Wstecz", "Back")}</button>
                <button onClick={next} disabled={!canAdvanceFrom2} style={btnPrimary(canAdvanceFrom2)}>
                  {canAdvanceFrom2 ? t.ui("Dalej", "Next") : t.ui("Wybierz championa", "Pick a champion")}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — summary */}
          {step === 3 && (
            <div style={{display:"flex", flexDirection:"column", gap: 18}}>
              <div>
                <h2 style={{
                  fontFamily: OP_FONT_DISP, fontSize: 22, color: t.text,
                  fontWeight: 600, margin: 0, letterSpacing:"-0.01em"
                }}>{t.ui("Podsumowanie", "Summary")}</h2>
                <div style={{fontFamily: OP_FONT_BODY, fontSize: 12, color: t.dim, marginTop: 6, lineHeight: 1.5}}>
                  {t.ui("Kliknij „Zaczynam”, żeby otworzyć Dashboard i zacząć pierwszą sesję.", "Click “Start” to open the Dashboard and begin your first session.")}
                </div>
              </div>
              <div style={{
                background: t.surface, border: `1px solid ${t.line}`,
                padding: "16px 18px",
                display: "grid", gap: 10
              }}>
                <Row t={t} label={t.ui("Rola", "Role")} value={lane}/>
                <Row t={t} label="Pool" value={cleanedChamps.join(" · ")}/>
                <Row t={t} label={t.ui("Aktualny champion", "Current champion")} value={currentChamp}/>
                <Row t={t} label={t.ui("Tryb nauki", "Learning mode")} value={
                  mode === "plan"
                    ? t.ui("Plan automatyczny — zaczynasz od SoloQ teorii", "Automatic plan — you start with SoloQ theory")
                    : t.ui("Tryb własny — sam wybierasz zadania", "Custom mode — you choose tasks yourself")
                }/>
                <Row t={t} label={t.ui("Motyw", "Theme")} value={prefs.themeMode === "dark" ? t.ui("Ciemny", "Dark") : t.ui("Jasny", "Light")}/>
                <Row t={t} label={t.ui("Język", "Language")} value={prefs.language === "pl" ? "Polski" : "English"}/>
              </div>
              {mode === "plan" && (
                <div style={{
                  background: `${t.accent}10`, border: `1px solid ${t.accent}60`,
                  padding: "12px 16px"
                }}>
                  <div style={{fontFamily: OP_FONT_BODY, fontSize: 11, color: t.accent,
                    letterSpacing:"0.14em", textTransform:"uppercase", marginBottom: 6, fontWeight: 700
                  }}>{t.ui("Plan startowy", "Starting plan")}</div>
                  <div style={{fontFamily: OP_FONT_BODY, fontSize: 12.5, color: t.text, lineHeight: 1.6}}>
                    {t.ui("System ustawi Ci aktywne zadania z pierwszej sekcji:", "The system will set active tasks from the first section:")}
                    <strong style={{color: t.text}}> SoloQ → {t.ui("System gry", "Game system")}</strong>.
                    {" "}
                    {t.ui(
                      "Większość to wiedza do przyswojenia (oznacz „Przeczytane”). Po skończeniu sekcji kliknij „Następna sekcja” w Opcjach lub na Dashboardzie.",
                      "Most of it is reading material (mark it as “Read”). After finishing the section, click “Next section” in Options or on the Dashboard."
                    )}
                  </div>
                </div>
              )}
              <div style={{display:"flex", justifyContent:"space-between", marginTop: 14}}>
                <button onClick={prev} style={btnGhost}>{t.ui("Wstecz", "Back")}</button>
                <button onClick={finish} style={btnPrimary(true)}>{t.ui("Zaczynam", "Start")}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  function Row({t, label, value}){
    return (
      <div style={{display:"grid", gridTemplateColumns:"160px 1fr", alignItems:"baseline", gap: 14}}>
        <div style={{
          fontFamily: OP_FONT_BODY, fontSize: 10.5, color: t.mute,
          letterSpacing:"0.14em", textTransform:"uppercase"
        }}>{label}</div>
        <div style={{
          fontFamily: OP_FONT_BODY, fontSize: 13, color: t.text, fontWeight: 600
        }}>{value || "—"}</div>
      </div>
    );
  }

  Object.assign(window, {
    OpKnowledge: Knowledge, OpPreGame: PreGame, OpPostGame: PostGame,
    OpProgress: Progress, OpHistory: History, OpFirstRunWizard: FirstRunWizard
  });
})();
