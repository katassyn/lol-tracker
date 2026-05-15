import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Play, Square, Check, X, Clock, AlertTriangle, ChevronDown, ChevronUp,
  Save, History, Settings, AlertCircle, Target, Activity, Flame, Coffee,
  Zap, BarChart3, BookOpen, XCircle, Eye, EyeOff, GraduationCap, Trash2,
  Brain, Lightbulb, Map, Crosshair, Swords, Wand2,
  Calendar, FileText, Search
} from "lucide-react";
import {
  createDefaultSessionPlan,
  getGoalTrend,
  getRecentMistakes,
  getWeaknessSuggestions,
  getPhaseProgress,
  getSuggestedNextGoal,
  getCurrentUserPhase,
  getChampionStats,
  getReflectionStreak,
  getTopMistakeCategories
} from "./learningLogic.js";
import {
  GOALS, CATEGORIES, ALWAYS_ON_RULES, PHASES, LANES
} from "./goals.js";

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

// KNOWLEDGE BASE — wiedza z notatek importowana z goals.js
// ============================================================

const DEFAULT_STATE = {
  activeGoals: ["minimap_3s", "continuous_clicking"],
  games: [],
  sessionPlan: null,
  theme: "dark",
  todayDate: null,
  gamesToday: 0,
  lastGameEndTime: null,
  sessionLocked: false,
  sessionLockReason: null,
  preGameSnapshot: null,
  // Champion pool — z Excela: max 3 postacie na linii, jedna linia
  championPool: {
    lane: "",        // top/jg/mid/adc/sup
    champions: ["", "", ""]
  },
  // Currently selected champion for next game (zapisuje się w grze)
  currentChampion: ""
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
    return { label: "NIE ROZPOCZĘTE", color: c.textMute, level: 0, progress: 0, nextThreshold: MASTERY.MIN_GAMES_FOR_INITIAL };
  }
  const rate = gamesCount > 0 ? Math.round((complianceCount / gamesCount) * 100) : 0;

  if (gamesCount >= MASTERY.WARN_MIN_GAMES && rate < MASTERY.WARN_COMPLIANCE) {
    return { label: "WYMAGA POPRAWY", color: c.accent, level: -1, progress: rate, isWarning: true };
  }

  if (gamesCount >= MASTERY.MIN_GAMES_FOR_MASTERED && rate >= MASTERY.COMPLIANCE_FOR_MASTERED) {
    return { label: "OPANOWANE", color: c.success, level: 3, progress: 100 };
  }
  if (gamesCount >= MASTERY.MIN_GAMES_FOR_CONSOLIDATED && rate >= MASTERY.COMPLIANCE_FOR_CONSOLIDATED) {
    return {
      label: "UTRWALONE",
      color: c.amber,
      level: 2,
      progress: Math.round((gamesCount / MASTERY.MIN_GAMES_FOR_MASTERED) * 100),
      nextThreshold: MASTERY.MIN_GAMES_FOR_MASTERED,
      currentGames: gamesCount
    };
  }
  if (gamesCount >= MASTERY.MIN_GAMES_FOR_INITIAL && rate >= MASTERY.COMPLIANCE_FOR_INITIAL) {
    return {
      label: "WSTĘPNIE OPANOWANE",
      color: c.textDim,
      level: 1,
      progress: Math.round((gamesCount / MASTERY.MIN_GAMES_FOR_CONSOLIDATED) * 100),
      nextThreshold: MASTERY.MIN_GAMES_FOR_CONSOLIDATED,
      currentGames: gamesCount
    };
  }
  // In progress, less than 3 games OR low compliance
  return {
    label: "W TRENINGU",
    color: c.warning,
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
  panel: "#0e0e0e",
  inset: "#0a0a0a",
  activeBg: "#0c1810",
  dangerBg: "#1a0808",
  warningBg: "#1a1408",
  progressBg: "#1a1a1a",
  overlay: "rgba(0,0,0,0.85)",
  border: "#2a2a2a",
  borderHi: "#3a3a3a",
  text: "#f5f5f5",
  textDim: "#a3a3a3",
  textMute: "#525252",
  accent: "#ef4444",
  success: "#22c55e",
  warning: "#f59e0b",
  amber: "#fbbf24",
  onAccent: "#fff",
  onSuccess: "#000"
};

const LIGHT_THEME = {
  bg: "#f5f1e8",
  card: "#fffaf0",
  cardHi: "#f0e7d8",
  panel: "#fffdf7",
  inset: "#f8f1e7",
  activeBg: "#eaf7ee",
  dangerBg: "#fff1f2",
  warningBg: "#fff7ed",
  progressBg: "#e7dac9",
  overlay: "rgba(24,20,15,0.45)",
  border: "#d7c8b5",
  borderHi: "#bda98f",
  text: "#18140f",
  textDim: "#5f5245",
  textMute: "#8a7a68",
  accent: "#dc2626",
  success: "#15803d",
  warning: "#b45309",
  amber: "#92400e",
  onAccent: "#fff",
  onSuccess: "#fff"
};

function applyTheme(theme) {
  Object.assign(c, theme === "light" ? LIGHT_THEME : {
    bg: "#0a0a0a",
    card: "#141414",
    cardHi: "#1c1c1c",
    panel: "#0e0e0e",
    inset: "#0a0a0a",
    activeBg: "#0c1810",
    dangerBg: "#1a0808",
    warningBg: "#1a1408",
    progressBg: "#1a1a1a",
    overlay: "rgba(0,0,0,0.85)",
    border: "#2a2a2a",
    borderHi: "#3a3a3a",
    text: "#f5f5f5",
    textDim: "#a3a3a3",
    textMute: "#525252",
    accent: "#ef4444",
    success: "#22c55e",
    warning: "#f59e0b",
    amber: "#fbbf24",
    onAccent: "#fff",
    onSuccess: "#000"
  });
}

const fMono = "'JetBrains Mono', monospace";
const fDisplay = "'Archivo Black', sans-serif";

// ============================================================
// UI PRIMITIVES
// ============================================================
function Btn({ children, onClick, variant = "default", disabled, style, fullWidth }) {
  const variants = {
    default: { bg: c.cardHi, border: c.border, color: c.text, hover: c.border },
    primary: { bg: c.accent, border: c.accent, color: c.onAccent, hover: c.accent },
    success: { bg: c.success, border: c.success, color: c.onSuccess, hover: c.success },
    danger: { bg: c.dangerBg, border: c.accent, color: c.accent, hover: c.dangerBg },
    ghost: { bg: "transparent", border: c.border, color: c.textDim, hover: c.cardHi },
    amber: { bg: c.warningBg, border: c.warning, color: c.warning, hover: c.warningBg }
  };
  const v = variants[variant];
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: disabled ? c.progressBg : (hover ? v.hover : v.bg),
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
    <div style={{ height, background: c.progressBg, borderRadius: 0 }}>
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
      background: isActive ? c.activeBg : c.card,
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
            {isActive && <Pill color={c.success} bg={c.activeBg}>AKTYWNY</Pill>}
            {goal.phase && <Pill color={c.warning}>{goal.phase === "ongoing" ? "CIĄGLE" : `F${goal.phase}`}{goal.week ? ` · TYDZ ${goal.week}` : ""}</Pill>}
            {mastery.level > 0 && <Pill color={mastery.color}>{mastery.label}</Pill>}
            {mastery.isWarning && <Pill color={c.accent} bg={c.dangerBg}>{mastery.label}</Pill>}
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
              background: c.warningBg, border: `1px solid ${c.warning}`,
              padding: "10px 12px", display: "flex", gap: 10, alignItems: "flex-start"
            }}>
              <AlertCircle size={14} color={c.warning} style={{ marginTop: 2, flexShrink: 0 }} />
              <Text style={{ fontSize: "11px", lineHeight: 1.5, color: c.warning }}>{d.notes}</Text>
            </div>
          )}

          {/* STATS RECAP */}
          {stats && stats.gamesWithGoal > 0 && (
            <div style={{
              background: c.panel, padding: "12px 14px",
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
      background: checked ? c.activeBg : c.card,
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
          {checked && <Check size={14} color={c.onSuccess} strokeWidth={4} />}
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
          padding: "12px 14px", background: c.inset,
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
            background: active ? c.dangerBg : c.card,
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
    <Box style={{ padding: "14px 16px", background: c.warningBg, borderColor: c.warning }}>
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
    <Box style={{ padding: compact ? "12px 14px" : "16px", background: c.panel }}>
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

  // Champion z poola
  const pool = state.championPool || { champions: [] };
  const poolChamps = (pool.champions || []).filter(Boolean);
  const [champion, setChampion] = useState(state.currentChampion || poolChamps[0] || "");

  const activeGoals = state.activeGoals
    .map(id => ({ id, ...GOALS[id] }))
    .filter(g => g.label);

  const allReady = focusGoals.length >= 1;

  const startGame = () => {
    const snapshot = {
      startedAt: Date.now(),
      mood,
      focusGoals,
      sessionPlan: plan,
      champion
    };
    setState(s => ({ ...s, preGameSnapshot: snapshot, currentChampion: champion }));
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
            background: c.dangerBg, border: `1px solid ${c.accent}`,
            display: "flex", alignItems: "center", gap: 10
          }}>
            <AlertTriangle size={16} color={c.accent} />
            <Text style={{ color: c.accent, fontWeight: 700 }}>NIE GRAJ. Przerwa min. 1h.</Text>
          </div>
        )}
        {mood === "tired" && (
          <div style={{
            marginTop: 10, padding: "10px 14px",
            background: c.warningBg, border: `1px solid ${c.warning}`,
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

      {poolChamps.length > 0 ? (
        <div>
          <Label>2 / Champion (z twojego poola)</Label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {poolChamps.map(ch => (
              <button key={ch} onClick={() => setChampion(ch)} style={{
                padding: "10px 14px",
                background: champion === ch ? c.success : c.card,
                border: `1px solid ${champion === ch ? c.success : c.border}`,
                color: champion === ch ? c.onSuccess : c.textDim,
                fontFamily: fMono, fontSize: "12px", fontWeight: 700,
                cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em"
              }}>{ch}</button>
            ))}
          </div>
          <Text mute style={{ fontSize: "10px", display: "block", marginTop: 6 }}>
            Wybór championa daje ci personal stats per champ. Pool ustawiasz w OPCJACH.
          </Text>
        </div>
      ) : (
        <div style={{ padding: 12, background: c.warningBg, border: `1px solid ${c.warning}`, display: "flex", gap: 10, alignItems: "center" }}>
          <AlertCircle size={16} color={c.warning} />
          <Text style={{ color: c.warning, fontSize: "11px" }}>
            Brak champion poola. Ustaw w OPCJACH (max 3 postacie na linii — przysięga z Excela).
          </Text>
        </div>
      )}

      <div>
        <Label>3 / Co trenujesz w tej grze (max 2 zadania)</Label>
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
      durationMin: Math.round((Date.now() - snap.startedAt) / 60000),
      champion: snap.champion || ""
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
        background: c.activeBg, border: `1px solid ${c.success}`,
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
        background: c.panel, border: `1px solid ${c.border}`,
        padding: "12px 14px", display: "flex", gap: 16,
        alignItems: "center", flexWrap: "wrap"
      }}>
        <div>
          <Label style={{ marginBottom: 2 }}>Czas gry</Label>
          <Text>{Math.round((Date.now() - snap.startedAt) / 60000)} min</Text>
        </div>
        {snap.champion && (
          <div>
            <Label style={{ marginBottom: 2 }}>Champion</Label>
            <Text>{snap.champion}</Text>
          </div>
        )}
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
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [groupBy, setGroupBy] = useState("category"); // "category" | "phase"

  const goalStats = useMemo(() => {
    const stats = {};
    Object.keys(GOALS).forEach(id => {
      const gamesWithGoal = state.games.filter(g => Array.isArray(g.focusGoals) && g.focusGoals.includes(id));
      const compliance = gamesWithGoal.filter(g => g.goalCompliance?.[id]);
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

  const searchLower = search.trim().toLowerCase();
  const matchesSearch = (g) => {
    if (!searchLower) return true;
    const haystack = [
      g.label, g.short,
      g.details?.what, g.details?.when, g.details?.whenNot, g.details?.success,
      ...(g.details?.how || []), ...(g.details?.mistakes || [])
    ].filter(Boolean).join(" ").toLowerCase();
    return haystack.includes(searchLower);
  };

  const filteredGoals = useMemo(() => {
    return Object.entries(GOALS)
      .map(([id, g]) => ({ id, ...g }))
      .filter(g => {
        if (filter === "active" && !state.activeGoals.includes(g.id)) return false;
        if (filter !== "all" && filter !== "active" && filter !== g.category) return false;
        if (phaseFilter !== "all" && String(g.phase) !== String(phaseFilter)) return false;
        if (!matchesSearch(g)) return false;
        return true;
      })
      .sort((a, b) => (a.order || 999) - (b.order || 999));
  }, [filter, phaseFilter, search, state.activeGoals]);

  const grouped = useMemo(() => {
    const out = {};
    filteredGoals.forEach(g => {
      const key = groupBy === "phase" ? String(g.phase || "ongoing") : g.category;
      if (!out[key]) out[key] = [];
      out[key].push(g);
    });
    return out;
  }, [filteredGoals, groupBy]);

  const filters = [
    { id: "all", label: "WSZYSTKIE" },
    { id: "active", label: `AKTYWNE (${state.activeGoals.length})` },
    ...Object.entries(CATEGORIES).map(([id, cat]) => ({ id, label: cat.name }))
  ];

  const phaseFilters = [
    { id: "all", label: "WSZYSTKIE FAZY" },
    { id: "1", label: "FAZA 1" },
    { id: "2", label: "FAZA 2" },
    { id: "3", label: "FAZA 3" },
    { id: "ongoing", label: "UNIWERSALNE" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <Text dim style={{ fontSize: "12px", display: "block", marginBottom: 12 }}>
          {Object.keys(GOALS).length} zadań w bazie · 54 punkty z planu Claude (technika małych kroczków) + extra splity.
          Po 3+ grach z 66%+ skutecznością — status <strong style={{ color: c.textDim }}>WSTĘPNIE OPANOWANE</strong>.
        </Text>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 12 }}>
          <Search size={14} color={c.textMute} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Szukaj w zadaniach (label, opis, jak wykonać)..."
            style={{
              width: "100%", background: c.card, border: `1px solid ${c.border}`,
              color: c.text, padding: "10px 12px 10px 36px", fontFamily: fMono, fontSize: "12px",
              outline: "none", boxSizing: "border-box"
            }}
          />
        </div>

        {/* Phase filters */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
          {phaseFilters.map(f => (
            <button key={f.id} onClick={() => setPhaseFilter(f.id)} style={{
              padding: "6px 12px",
              background: phaseFilter === f.id ? c.warning : c.card,
              border: `1px solid ${phaseFilter === f.id ? c.warning : c.border}`,
              color: phaseFilter === f.id ? c.bg : c.textDim,
              fontFamily: fMono, fontSize: "10px", fontWeight: 700,
              cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em"
            }}>{f.label}</button>
          ))}
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: "6px 12px",
              background: filter === f.id ? c.accent : c.card,
              border: `1px solid ${filter === f.id ? c.accent : c.border}`,
              color: filter === f.id ? c.onAccent : c.textDim,
              fontFamily: fMono, fontSize: "11px", fontWeight: 700,
              cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em"
            }}>{f.label}</button>
          ))}
        </div>

        {/* Group by toggle */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Text mute style={{ fontSize: "11px" }}>Grupuj wg:</Text>
          {[["category", "KATEGORII"], ["phase", "FAZY"]].map(([k, l]) => (
            <button key={k} onClick={() => setGroupBy(k)} style={{
              padding: "4px 8px",
              background: groupBy === k ? c.cardHi : "transparent",
              border: `1px solid ${groupBy === k ? c.borderHi : c.border}`,
              color: groupBy === k ? c.text : c.textMute,
              fontFamily: fMono, fontSize: "10px", fontWeight: 700,
              cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em"
            }}>{l}</button>
          ))}
        </div>

        {filteredGoals.length === 0 && (
          <div style={{ padding: 24, textAlign: "center", marginTop: 12, background: c.card, border: `1px solid ${c.border}` }}>
            <Text mute style={{ display: "block" }}>Brak zadań dla wybranych filtrów.</Text>
          </div>
        )}
      </div>

      {Object.entries(grouped).map(([groupKey, goals]) => {
        if (goals.length === 0) return null;
        let headerName, headerSub, Icon;
        if (groupBy === "phase") {
          const p = PHASES[groupKey] || PHASES.ongoing;
          headerName = p.name;
          headerSub = p.weeks + " · " + p.subtitle;
          Icon = Calendar;
        } else {
          const cat = CATEGORIES[groupKey] || { name: groupKey, subtitle: "", icon: BookOpen };
          headerName = cat.name;
          headerSub = cat.subtitle;
          Icon = cat.icon || BookOpen;
        }
        return (
          <div key={groupKey}>
            <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <Icon size={18} color={c.amber} />
              <div>
                <H2>{headerName}</H2>
                <Text mute style={{ fontSize: "11px", display: "block", marginTop: 2 }}>{headerSub} · {goals.length} zadań</Text>
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
                  background: c.panel,
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
                {!g.remembered && <Pill color={c.accent} bg={c.dangerBg}>NIE PAMIĘTAŁ</Pill>}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
              {g.focusGoals.map(gid => {
                const goal = GOALS[gid];
                const ok = g.goalCompliance[gid];
                return goal ? (
                  <Pill key={gid} color={ok ? c.success : c.accent} bg={ok ? c.activeBg : c.dangerBg}>
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
            <Label style={{ color: c.textDim }}>WSTĘPNIE OPANOWANE ({masteryGroups.initial.length})</Label>
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
// ============================================================
// PROGRAM VIEW — 12-tygodniowy plan (z Excela Claude)
// ============================================================
function ProgramView({ state, setState, setView }) {
  const phaseProgress = useMemo(() => getPhaseProgress(state.games, GOALS), [state.games]);
  const currentPhase = useMemo(() => getCurrentUserPhase(state.games, GOALS), [state.games]);
  const suggestedNext = useMemo(
    () => getSuggestedNextGoal(state.games, GOALS, state.activeGoals, currentPhase),
    [state.games, state.activeGoals, currentPhase]
  );

  const goalsByPhaseWeek = useMemo(() => {
    const out = { 1: {}, 2: {}, 3: {}, ongoing: {} };
    Object.entries(GOALS).forEach(([id, g]) => {
      const phase = g.phase || "ongoing";
      const week = g.week || "—";
      if (!out[phase]) out[phase] = {};
      if (!out[phase][week]) out[phase][week] = [];
      out[phase][week].push({ id, ...g });
    });
    Object.keys(out).forEach(p => {
      Object.keys(out[p]).forEach(w => {
        out[p][w].sort((a, b) => (a.order || 999) - (b.order || 999));
      });
    });
    return out;
  }, []);

  const isMastered = (id) => {
    const games = state.games.filter(g => Array.isArray(g.focusGoals) && g.focusGoals.includes(id));
    if (games.length < 3) return false;
    const compliance = games.filter(g => g.goalCompliance?.[id]).length;
    return compliance / games.length >= 0.66;
  };

  const activate = (id) => setState(s => ({
    ...s,
    activeGoals: s.activeGoals.includes(id) ? s.activeGoals : [...s.activeGoals, id]
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Box style={{ padding: "16px 18px", background: c.activeBg, borderColor: c.success }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <Calendar size={20} color={c.success} />
          <H2 style={{ color: c.success }}>PROGRAM 12-TYGODNIOWY</H2>
        </div>
        <Text dim style={{ fontSize: "12px", lineHeight: 1.5, display: "block" }}>
          54 punkty z notatek podzielone na 3 fazy. Każdy element trenujesz 3-4 gry zanim przejdziesz dalej. Sugerowana faza dla ciebie:{" "}
          <strong style={{ color: c.success }}>FAZA {currentPhase}</strong>.
        </Text>
        {suggestedNext && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div>
              <Label style={{ color: c.amber }}>NASTĘPNE ZADANIE DO TRENINGU</Label>
              <Text style={{ fontSize: "14px", fontWeight: 700, display: "block" }}>{GOALS[suggestedNext].label}</Text>
              <Text mute style={{ fontSize: "11px" }}>{GOALS[suggestedNext].short}</Text>
            </div>
            <Btn variant="success" onClick={() => activate(suggestedNext)}>
              WŁĄCZ DO TRENINGU
            </Btn>
          </div>
        )}
      </Box>

      {/* Phase summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
        {[1, 2, 3, "ongoing"].map(p => {
          const phase = PHASES[p];
          const stats = phaseProgress[p];
          const rate = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;
          const isCurrent = String(currentPhase) === String(p);
          return (
            <Box key={p} style={{ padding: "12px 14px", borderColor: isCurrent ? c.success : c.border }}>
              <Label style={{ color: isCurrent ? c.success : c.textMute, marginBottom: 4 }}>{phase.weeks}</Label>
              <Text style={{ fontSize: "12px", fontWeight: 700, display: "block" }}>{phase.name}</Text>
              <div style={{ marginTop: 8 }}>
                <ProgressBar value={rate} color={isCurrent ? c.success : c.amber} height={4} />
                <Text mute style={{ fontSize: "10px", display: "block", marginTop: 4 }}>{stats.mastered}/{stats.total} opanowane ({rate}%)</Text>
              </div>
            </Box>
          );
        })}
      </div>

      {/* Phases & weeks roadmap */}
      {[1, 2, 3, "ongoing"].map(p => {
        const phase = PHASES[p];
        const weeks = goalsByPhaseWeek[p];
        const weekKeys = Object.keys(weeks).sort((a, b) => {
          if (a === "—") return 1;
          if (b === "—") return -1;
          return Number(a) - Number(b);
        });
        return (
          <div key={p}>
            <div style={{ marginBottom: 12 }}>
              <H2>{phase.name}</H2>
              <Text mute style={{ fontSize: "11px", display: "block", marginTop: 2 }}>{phase.weeks} · {phase.subtitle}</Text>
              <Text dim style={{ fontSize: "12px", display: "block", marginTop: 8, lineHeight: 1.5 }}>{phase.description}</Text>
            </div>
            {weekKeys.map(wk => {
              const items = weeks[wk];
              if (!items?.length) return null;
              return (
                <Box key={wk} style={{ padding: "12px 14px", marginBottom: 10 }}>
                  <Label style={{ color: c.amber, marginBottom: 8 }}>
                    {wk === "—" ? "BEZ TYGODNIA" : `TYDZIEŃ ${wk}`}
                  </Label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {items.map(g => {
                      const active = state.activeGoals.includes(g.id);
                      const mastered = isMastered(g.id);
                      return (
                        <div key={g.id} style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10,
                          padding: "8px 10px", background: c.panel, border: `1px solid ${mastered ? c.success : c.border}`
                        }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                              <Text style={{ fontSize: "12px", fontWeight: 700 }}>{g.label}</Text>
                              {mastered && <Pill color={c.success} bg={c.activeBg}>✓ OPANOWANE</Pill>}
                              {active && !mastered && <Pill color={c.amber}>W TRAKCIE</Pill>}
                            </div>
                            <Text mute style={{ fontSize: "10px", display: "block", marginTop: 2 }}>{g.short}</Text>
                          </div>
                          {!active && (
                            <Btn variant="ghost" onClick={() => activate(g.id)} style={{ padding: "5px 9px", fontSize: "10px" }}>
                              WŁĄCZ
                            </Btn>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Box>
              );
            })}
          </div>
        );
      })}

      <Box style={{ padding: "14px 16px", background: c.warningBg, borderColor: c.warning }}>
        <H2 style={{ color: c.warning, marginBottom: 8 }}>ZASADY PROGRAMU</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "3-4 gry na każdy element (technika małych kroczków)",
            "Refleksja po grze = NIE win/lose, tylko JAK wykonałem element",
            "Nie pamiętasz właśnie zagranej gry = KONIEC NA DZIŚ",
            "Strata LP z nauką = ZYSK. Gra to nauka, nie LP.",
            "Po 3 przegranych z rzędu — koniec na dziś. Bez wyjątków.",
            "Przejdź do następnej fazy gdy 80%+ obecnej jest OPANOWANE"
          ].map((rule, i) => (
            <div key={i} style={{ display: "flex", gap: 8 }}>
              <span style={{ color: c.warning, fontFamily: fMono, fontSize: "11px", fontWeight: 800 }}>{String(i + 1).padStart(2, "0")}</span>
              <Text style={{ fontSize: "12px", lineHeight: 1.5 }}>{rule}</Text>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

// ============================================================
// CHEATSHEET VIEW — ściąga do wydruku (z Excela)
// ============================================================
function CheatsheetView() {
  const sections = [
    {
      title: "TIMERY — FALE I LEVEL",
      icon: Clock,
      items: [
        ["SOLO LANE", "Lvl 2 = 7 CS · Lvl 3 = 14 CS · Lvl 4 = 24 CS · Lvl 6 = po fali 8"],
        ["BOT LANE", "Lvl 2 = 9 CS (1 fala + 3 mele) · Lvl 3 = 21 CS"],
        ["CANNON FALA", "Co 3. fala. Hard push PRZED canonem → recall"],
        ["JG CAMP", "1 camp = 4 CS. Liczy się od pierwszego widzianego CS junglera"]
      ]
    },
    {
      title: "OBJEKTIVE TIMERY",
      icon: Target,
      items: [
        ["SMOK", "Spawn 5:00. Co 5 min od śmierci. Soul point po 3-4 smoku."],
        ["HERALD", "Spawn 14:00. Despawn 19:30 (lub gdy nie wzięty)"],
        ["GRUBSY", "Spawn ~7:30 (jeśli dostępne)"],
        ["BARON", "Spawn 20:00. Co 6 min od śmierci. Empower 3:30."],
        ["ELDER DRAGON", "Po wzięciu 4 smoków. Burn debuff = WIN walkę = WIN gra."]
      ]
    },
    {
      title: "FLASH I SUMMONERS",
      icon: Zap,
      items: [
        ["FLASH BAZA", "5 min (300s) bez ulta z F"],
        ["FLASH Z ULTEM", "4 min (240s) z Cosmic Insight"],
        ["TELEPORT", "4 min (240s) early → później 5 min"],
        ["IGNITE", "180s. Dmg = ~70-410 (level)"],
        ["EXHAUST", "210s. -40% dmg na enemy"]
      ]
    },
    {
      title: "5 CZYNNIKÓW OBJEKTIVA",
      icon: Map,
      items: [
        ["1. PRIO", "Fala wpushowana przed enemy"],
        ["2. TEMPO", "Przewaga czasu — możesz coś zrobić pierwszy"],
        ["3. SIŁA W WALCE", "Fed, item spike up"],
        ["4. WYGRANA WALKA", "Enemy 2+ down → obj za darmo"],
        ["5. ROTACJE", "Nafedowany champ rotuje → enemy musi odpuścić"]
      ]
    },
    {
      title: "SCHEMATY MACRO",
      icon: Activity,
      items: [
        ["BAZA", "wave → objective → wave → objective"],
        ["SMOK", "wave → wizja → wave → smok"],
        ["HERALD", "Mobilny mid → BOT tower. Niemobilny → MID. Top NIE."],
        ["ROTACJA T1", "BOT T1 → mid. MID T1 → side. TOP T1 → top zostaje."],
        ["4-1 T2", "Toplaner sajt, JG+supp między, carry mid. Enemy 5 mid → supp+JG do topa = 3v1"]
      ]
    },
    {
      title: "WAVE MGMT",
      icon: Crosshair,
      items: [
        ["SLOW PUSH", "Ostatnie hity. 3 fale stack. Crash pod tower enemy = okno akcji"],
        ["FREEZE", "+3 caster minionów enemy. NIE bij z ręki."],
        ["HARD PUSH", "Pełną siłą. Tylko przed canonem/roamem/objective"],
        ["RECALL", "TYLKO na canon falę. Hard push przed canonem → recall."]
      ]
    },
    {
      title: "ZASADY ŻELAZNE",
      icon: AlertCircle,
      items: [
        ["LP vs SKILL", "Gram pod NAUKĘ, nie pod LP. Strata LP z nauką = zysk."],
        ["3-4 GRY", "Każdy element trenuję 3-4 gry. Potem następny."],
        ["REFLEKSJA", "Po grze: JAK wykonałem, NIE win/lose."],
        ["PAMIĘĆ", "Nie pamiętam gry = KONIEC NA DZIŚ. Więcej gier = mniej nauki."],
        ["CHAT", "All chat OFF. Team chat — mute jak szczekają."],
        ["PRZERWA", "Po przegranej min 5 min od kompa. Bez wyjątków."]
      ]
    },
    {
      title: "TEAMFIGHT — TRÓJKĄT",
      icon: Swords,
      items: [
        ["ENGAGE", "Mobilni z CC: Malphite, Diana. Bije POKE."],
        ["POKE", "Długi range, mało CC: Xerath, Varus. Bije DISENGAGE."],
        ["DISENGAGE", "Tarcze, zerowanie engage: Galio, Braum. Bije ENGAGE."],
        ["FRONT-TO-BACK", "Silne carry zza frontu. Mage → najbliższy target."],
        ["FLANKA", "Wejście z boku, łamie front-to-back."]
      ]
    },
    {
      title: "0+ / 0- AKCJE",
      icon: Lightbulb,
      items: [
        ["F-KEY CHECK", "Sprawdź side podczas animacji. Zwykle 0, czasem info kluczowa."],
        ["FOG ENTRY", "Wejdź w fog gdy nic nie tracisz = enemy musi respect."],
        ["PING FLASH", "Ping cyferki 1-5 dla użytego flasha enemy."],
        ["NIE 2 STAKI", "Trzymanie 2 staków wardów = strata info."],
        ["NIE FACECHECK", "Klasyczne 0- = łatwa śmierć."]
      ]
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Box style={{ padding: "16px 18px", background: c.warningBg, borderColor: c.warning }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FileText size={20} color={c.warning} />
          <div>
            <H2 style={{ color: c.warning }}>ŚCIĄGA</H2>
            <Text dim style={{ fontSize: "11px", display: "block", marginTop: 2 }}>
              Timery i zasady z notatek. Możesz wydrukować i położyć obok monitora.
            </Text>
          </div>
        </div>
      </Box>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
        {sections.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Box key={idx} style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Icon size={16} color={c.amber} />
                <H2 style={{ fontSize: "13px" }}>{s.title}</H2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {s.items.map(([key, val], i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2, paddingBottom: 6, borderBottom: i < s.items.length - 1 ? `1px solid ${c.border}` : "none" }}>
                    <Text style={{ fontSize: "10px", color: c.accent, fontWeight: 800, letterSpacing: "0.1em" }}>{key}</Text>
                    <Text dim style={{ fontSize: "11px", lineHeight: 1.4 }}>{val}</Text>
                  </div>
                ))}
              </div>
            </Box>
          );
        })}
      </div>
    </div>
  );
}

function SettingsView({ state, setState }) {
  const pool = state.championPool || { lane: "", champions: ["", "", ""] };
  const updatePool = (patch) => setState(s => ({ ...s, championPool: { ...pool, ...patch } }));
  const updateChamp = (idx, val) => {
    const champions = [...pool.champions];
    champions[idx] = val;
    updatePool({ champions });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* CHAMPION POOL — przysięga z Excela */}
      <div>
        <H2 style={{ marginBottom: 6 }}>CHAMPION POOL — PRZYSIĘGA</H2>
        <Text mute style={{ fontSize: "12px", display: "block", marginBottom: 12 }}>
          Z Excela: gram MAKSYMALNIE 3 postacie na jednej linii. Trzymam się ich.
          Nie zmieniam co tydzień. Pozwala wyczuć limity (mało zmiennych).
        </Text>
        <Box style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <Label>LINIA</Label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {LANES.map(l => (
                <button key={l.id} onClick={() => updatePool({ lane: l.id })} style={{
                  padding: "8px 14px",
                  background: pool.lane === l.id ? c.accent : c.card,
                  border: `1px solid ${pool.lane === l.id ? c.accent : c.border}`,
                  color: pool.lane === l.id ? c.onAccent : c.textDim,
                  fontFamily: fMono, fontSize: "11px", fontWeight: 700,
                  cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em"
                }}>{l.label}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[0, 1, 2].map(idx => (
              <div key={idx}>
                <Label>CHAMP #{idx + 1}</Label>
                <input
                  value={pool.champions[idx] || ""}
                  onChange={e => updateChamp(idx, e.target.value)}
                  placeholder={idx === 0 ? "np. Syndra" : idx === 1 ? "np. Ahri" : "np. Qiyana"}
                  style={{
                    width: "100%", background: c.card, border: `1px solid ${c.border}`,
                    color: c.text, padding: "10px 12px", fontFamily: fMono, fontSize: "12px",
                    outline: "none", boxSizing: "border-box"
                  }}
                />
              </div>
            ))}
          </div>
          <Text mute style={{ fontSize: "10px", display: "block" }}>
            Zmiana champion poola robi się raz na ~miesiąc, nie co tydzień. Tylko mając pełen pool możesz wypełnić champa w pre-game.
          </Text>
        </Box>
      </div>

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
  const streak = useMemo(() => getReflectionStreak(state.games), [state.games]);
  const currentPhase = useMemo(() => getCurrentUserPhase(state.games, GOALS), [state.games]);
  const suggestedNext = useMemo(
    () => getSuggestedNextGoal(state.games, GOALS, state.activeGoals, currentPhase),
    [state.games, state.activeGoals, currentPhase]
  );

  const goalStats = useMemo(() => {
    const stats = {};
    Object.keys(GOALS).forEach(id => {
      const gamesWithGoal = state.games.filter(g => Array.isArray(g.focusGoals) && g.focusGoals.includes(id));
      const compliance = gamesWithGoal.filter(g => g.goalCompliance?.[id]);
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
          background: c.dangerBg, border: `2px solid ${c.accent}`,
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
        <Box style={{ padding: "14px" }}>
          <Label>DZIŚ</Label>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontFamily: fDisplay, fontSize: "32px", color: c.text }}>{state.gamesToday}</span>
          </div>
          <Text mute style={{ fontSize: "11px" }}>gier z refleksją</Text>
        </Box>
        <Box style={{ padding: "14px" }}>
          <Label>STREAK</Label>
          <div style={{ fontFamily: fDisplay, fontSize: "32px", color: streak > 0 ? c.success : c.textMute }}>
            {streak}
          </div>
          <Text mute style={{ fontSize: "11px" }}>{streak === 1 ? "dzień" : "dni z rzędu"}</Text>
        </Box>
        <Box style={{ padding: "14px" }}>
          <Label>FAZA</Label>
          <div style={{ fontFamily: fDisplay, fontSize: "32px", color: c.warning }}>
            {currentPhase === "ongoing" ? "U" : currentPhase}
          </div>
          <Text mute style={{ fontSize: "11px" }}>sugerowana</Text>
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

      {/* Suggested next from program */}
      {suggestedNext && !state.activeGoals.includes(suggestedNext) && (
        <Box style={{ padding: "14px 16px", background: c.activeBg, borderColor: c.success }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <Label style={{ color: c.success }}>NASTĘPNE Z PROGRAMU (FAZA {currentPhase})</Label>
              <Text style={{ fontSize: "14px", fontWeight: 700, display: "block", marginBottom: 2 }}>
                {GOALS[suggestedNext].label}
              </Text>
              <Text mute style={{ fontSize: "11px" }}>{GOALS[suggestedNext].short}</Text>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <Btn variant="ghost" onClick={() => setView("program")} style={{ padding: "8px 12px", fontSize: "11px" }}>
                ZOBACZ PROGRAM
              </Btn>
              <Btn variant="success" onClick={() => setState(s => ({ ...s, activeGoals: [...s.activeGoals, suggestedNext] }))} style={{ padding: "8px 12px", fontSize: "11px" }}>
                WŁĄCZ
              </Btn>
            </div>
          </div>
        </Box>
      )}

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
                background: c.warningBg, border: `1px solid ${c.warning}`,
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
                background: c.warningBg, border: `1px solid ${c.warning}`,
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
            <Box style={{ padding: "16px 18px", marginBottom: 12, background: c.activeBg, borderColor: c.success }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <Label style={{ color: c.success }}>W TRAKCIE GRY</Label>
                  <H2 style={{ fontSize: "14px" }}>Aktywna sesja treningowa</H2>
                </div>
                <Text dim style={{ fontSize: "12px" }}>
                  Start: {new Date(state.preGameSnapshot.startedAt).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}
                </Text>
              </div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
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
                    background: c.panel,
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

  // Theme apply: synchronously mutate c before children render
  applyTheme(state.theme || "dark");

  // Keep document.body background in sync with theme to avoid white flash
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.background = c.bg;
      document.body.style.color = c.text;
    }
  }, [state.theme]);

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
    { id: "program", label: "PROGRAM", icon: Calendar },
    { id: "cheatsheet", label: "ŚCIĄGA", icon: FileText },
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
        {view === "program" && <ProgramView state={state} setState={setState} setView={setView} />}
        {view === "cheatsheet" && <CheatsheetView />}
        {view === "history" && <HistoryView state={state} />}
        {view === "stats" && <StatsView state={state} />}
        {view === "settings" && <SettingsView state={state} setState={setState} />}
      </div>

      {modal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: c.overlay, zIndex: 100,
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
