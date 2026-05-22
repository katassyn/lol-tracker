// LIVE DATA ADAPTER
// Bridges real goals.js (186 goals · 3 tabs · sections) into the prepared-ui contract.
// Persists champion pool, history of games and current session in localStorage.
// Exposes everything on `window.SAMPLE` (back-compat with existing screens).

import {
  GOALS as REAL_GOALS,
  TABS as REAL_TABS,
  SECTIONS as REAL_SECTIONS,
  CATEGORIES as REAL_CATEGORIES,
  PLAN_STAGES as REAL_PLAN_STAGES,
  PLAN_SECTION_FLAT,
  getPlanCursorProgress as getRealPlanCursorProgress,
  getPlanFocus,
  nextPlanFocus,
  getGoalsBySection
} from "../goals.js";
import {
  getLocalizedCategoryDefinition,
  getLocalizedGoalDefinition,
  getLocalizedPlanStageDefinition,
  getLocalizedSectionDefinition,
  getLocalizedTabDefinition,
  localizeGoalStatus
} from "../contentI18n.js";
import { normalizePreferences } from "../preferences.js";

// ---------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------
const STORAGE_KEY = "master-track-v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Failed to read state:", err);
    return {};
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn("Failed to save state:", err);
  }
}

// ---------------------------------------------------------------
// Initial state (read once at module load)
// ---------------------------------------------------------------
const stored = loadState();

const state = {
  championPool: stored.championPool || { lane: "MID", champions: [] },
  currentChampion: stored.currentChampion || "",
  history: Array.isArray(stored.history) ? stored.history : [],
  activeGoals: Array.isArray(stored.activeGoals) ? stored.activeGoals : [],
  readGoals: Array.isArray(stored.readGoals) ? stored.readGoals : [],
  preGameSnapshot: stored.preGameSnapshot || null,
  sessionStartedAt: stored.sessionStartedAt || null,
  // Plan / learning mode
  mode: stored.mode || null,              // "plan" | "custom" | null (= first-run not done)
  planCursor: stored.planCursor || { stageIdx: 0, sectionIdx: 0 },
  firstRunDone: !!stored.firstRunDone,
  preferences: normalizePreferences(stored.preferences),
  thresholds: stored.thresholds || {
    initial: { games: 3, rate: 66 },
    consolidated: { games: 8, rate: 75 },
    mastered: { games: 20, rate: 85 }
  }
};

function currentLanguage() {
  return state.preferences?.language || "en";
}

function persist() {
  saveState(state);
}

// ---------------------------------------------------------------
// Convert real GOALS object into the array shape screens expect.
// real goal -> { id, cat, phase, week, label, short, success, when, whenNot, mistakes, how, what, tab, section }
// ---------------------------------------------------------------
const GOALS = Object.entries(REAL_GOALS).map(([id, g]) => {
  const goal = {
    id,
    cat: g.category || "macro",
    phase: g.phase ?? "ongoing",
    week: g.week ?? null,
    order: g.order ?? 999,
    // new structural fields
    tab: g.tab || "macro",
    section: g.section || null,
    info_only: !!g.info_only
  };
  const localized = () => getLocalizedGoalDefinition(id, g, currentLanguage());
  Object.defineProperties(goal, {
    label: { enumerable: true, get: () => localized().label },
    short: { enumerable: true, get: () => localized().short || "" },
    // pull details into top-level too (for older screens that read directly)
    what: { enumerable: true, get: () => localized().details?.what || "" },
    how: { enumerable: true, get: () => localized().details?.how || [] },
    when: { enumerable: true, get: () => localized().details?.when || "" },
    whenNot: { enumerable: true, get: () => localized().details?.whenNot || "" },
    success: { enumerable: true, get: () => localized().details?.success || "" },
    mistakes: { enumerable: true, get: () => localized().details?.mistakes || [] },
    notes: { enumerable: true, get: () => localized().details?.notes || "" }
  });
  return goal;
});

// Sort the array by tab order, section order, then goal order
const TAB_ORDER = { macro: 1, micro: 2, soloq: 3 };
GOALS.sort((a, b) => {
  const tabDelta = (TAB_ORDER[a.tab] || 99) - (TAB_ORDER[b.tab] || 99);
  if (tabDelta !== 0) return tabDelta;
  const aSec = a.section ? REAL_SECTIONS[a.section]?.order || 999 : 999;
  const bSec = b.section ? REAL_SECTIONS[b.section]?.order || 999 : 999;
  if (aSec !== bSec) return aSec - bSec;
  return (a.order || 999) - (b.order || 999);
});

// Categories: convert from object to array shape with glyphs (re-using category metadata)
const CATEGORY_GLYPHS = {
  info: "◉", micro: "△", wave: "≋", early: "◆", macro: "□",
  vision: "◉", teamfight: "✕", mindset: "○", max: "*"
};
const CATEGORIES = Object.entries(REAL_CATEGORIES).map(([id, c]) => {
  const category = {
    id,
    glyph: CATEGORY_GLYPHS[id] || "·"
  };
  const localized = () => getLocalizedCategoryDefinition(id, c, currentLanguage());
  Object.defineProperties(category, {
    name: { enumerable: true, get: () => localized().name },
    desc: { enumerable: true, get: () => localized().subtitle || "" }
  });
  return category;
});

// Tabs and sections passed through with array shape
const TABS = Object.values(REAL_TABS).map(t => {
  const tab = { id: t.id, icon: t.icon };
  const localized = () => getLocalizedTabDefinition(t.id, t, currentLanguage());
  Object.defineProperties(tab, {
    name: { enumerable: true, get: () => localized().name },
    subtitle: { enumerable: true, get: () => localized().subtitle },
    description: { enumerable: true, get: () => localized().description }
  });
  return tab;
});

const SECTIONS = Object.values(REAL_SECTIONS).map(s => {
  const section = { id: s.id, tab: s.tab, icon: s.icon, order: s.order };
  const localized = () => getLocalizedSectionDefinition(s.id, s, currentLanguage());
  Object.defineProperties(section, {
    name: { enumerable: true, get: () => localized().name },
    subtitle: { enumerable: true, get: () => localized().subtitle }
  });
  return section;
});

const PLAN_STAGES = REAL_PLAN_STAGES.map(stage => {
  const localizedStage = {
    id: stage.id,
    tab: stage.tab,
    sections: [...stage.sections]
  };
  const localized = () => getLocalizedPlanStageDefinition(stage, currentLanguage());
  Object.defineProperties(localizedStage, {
    name: { enumerable: true, get: () => localized().name },
    short: { enumerable: true, get: () => localized().short },
    description: { enumerable: true, get: () => localized().description }
  });
  return localizedStage;
});

// ---------------------------------------------------------------
// Stats: derived live from state.history
// ---------------------------------------------------------------
function computeGoalStats(goalId) {
  const games = state.history.filter(
    g => Array.isArray(g.focusGoals) && g.focusGoals.includes(goalId)
  );
  const passed = games.filter(g => g.compliance?.[goalId]).length;
  const rate = games.length ? Math.round((passed / games.length) * 100) : 0;
  const th = state.thresholds;
  let status = "NIE ROZPOCZĘTE";
  let level = 0;
  if (games.length >= th.mastered.games && rate >= th.mastered.rate) {
    status = "OPANOWANE";
    level = 3;
  } else if (games.length >= th.consolidated.games && rate >= th.consolidated.rate) {
    status = "UTRWALONE";
    level = 2;
  } else if (games.length >= th.initial.games && rate >= th.initial.rate) {
    status = "WSTĘPNIE OPANOWANE";
    level = 1;
  } else if (games.length >= 5 && rate < 50) {
    status = "WYMAGA POPRAWY";
    level = -1;
  } else if (games.length > 0) {
    status = "W TRENINGU";
    level = 0;
  }
  return { games: games.length, passed, rate, status: localizeGoalStatus(status, currentLanguage()), level };
}

function computeStreak() {
  if (state.history.length === 0) return 0;
  const days = Array.from(new Set(state.history.map(g => g.date))).sort().reverse();
  // count consecutive days from latest
  let streak = 0;
  let cursor = new Date(days[0]);
  for (const d of days) {
    const dt = new Date(d);
    const diff = Math.round((cursor - dt) / 86400000);
    if (diff <= 1) {
      streak++;
      cursor = dt;
    } else {
      break;
    }
  }
  return streak;
}

function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

// ---------------------------------------------------------------
// Mutators (used by Pre/Post game flow, settings)
// ---------------------------------------------------------------
function setChampionPool(pool) {
  state.championPool = pool;
  persist();
}
function setCurrentChampion(name) {
  state.currentChampion = name;
  persist();
}
function setActiveGoals(ids) {
  state.activeGoals = ids;
  persist();
}
function setPreferences(nextPreferences) {
  state.preferences = normalizePreferences({
    ...state.preferences,
    ...(nextPreferences || {})
  });
  persist();
}
function toggleReadGoal(id) {
  const idx = state.readGoals.indexOf(id);
  if (idx >= 0) state.readGoals.splice(idx, 1);
  else state.readGoals.push(id);
  if (state.mode === "plan") {
    syncActiveGoalsToPlan();
  } else {
    persist();
  }
}

// ---------- PLAN / MODE ----------
function completeFirstRun({ mode = "plan" } = {}) {
  state.mode = mode;
  state.firstRunDone = true;
  // When entering plan mode for the first time, auto-fill active goals from cursor.
  if (mode === "plan") {
    syncActiveGoalsToPlan();
  }
  persist();
}

function setMode(mode, { resetPlan = false } = {}) {
  const previousMode = state.mode;
  state.mode = mode;
  if (mode === "plan") {
    if (resetPlan || previousMode === "custom") {
      state.planCursor = { stageIdx: 0, sectionIdx: 0 };
    }
    syncActiveGoalsToPlan();
  }
  persist();
}

// In plan mode: active goals = current section's NOT-mastered, NOT-read trainables (excluding info_only that are read)
function syncActiveGoalsToPlan() {
  const nextCursor = findNextPendingPlanCursor(state.planCursor);
  if (!nextCursor) {
    state.activeGoals = [];
    persist();
    return;
  }
  state.planCursor = nextCursor;
  const focus = getPlanFocus(nextCursor.stageIdx, nextCursor.sectionIdx);
  if (!focus) {
    state.activeGoals = [];
    persist();
    return;
  }
  const sectionGoals = getPlanSectionGoalIds(focus.sectionId);
  // Auto-select pending goals in this section
  state.activeGoals = sectionGoals.filter(id => !isDoneForPlan(id));
  persist();
}

function getPlanSectionGoalIds(sectionId) {
  return Object.entries(REAL_GOALS)
    .filter(([, goal]) => goal.section === sectionId)
    .sort(([, a], [, b]) => (a.order || 999) - (b.order || 999))
    .map(([id]) => id);
}

function isDoneForPlan(goalId) {
  const goal = REAL_GOALS[goalId];
  if (!goal) return true;
  if (goal.info_only) return state.readGoals.includes(goalId);
  return isMastered(goalId);
}

function findNextPendingPlanCursor(cursor = state.planCursor) {
  let current = {
    stageIdx: Number.isInteger(cursor?.stageIdx) ? cursor.stageIdx : 0,
    sectionIdx: Number.isInteger(cursor?.sectionIdx) ? cursor.sectionIdx : 0
  };

  for (let guard = 0; guard < PLAN_SECTION_FLAT.length; guard += 1) {
    const focus = getPlanFocus(current.stageIdx, current.sectionIdx);
    if (!focus) return null;
    const hasPending = getPlanSectionGoalIds(focus.sectionId).some(id => !isDoneForPlan(id));
    if (hasPending) return current;
    const next = nextPlanFocus(current.stageIdx, current.sectionIdx);
    if (!next) return null;
    current = next;
  }
  return null;
}

function isMastered(goalId) {
  const games = state.history.filter(
    g => Array.isArray(g.focusGoals) && g.focusGoals.includes(goalId)
  );
  if (games.length < state.thresholds.initial.games) return false;
  const passed = games.filter(g => g.compliance?.[goalId]).length;
  const rate = (passed / games.length) * 100;
  return rate >= state.thresholds.initial.rate;
}

function advancePlanSection() {
  const next = nextPlanFocus(state.planCursor.stageIdx, state.planCursor.sectionIdx);
  if (!next) {
    // Plan finished — keep cursor at end, no change
    return false;
  }
  state.planCursor = next;
  if (state.mode === "plan") {
    syncActiveGoalsToPlan();
  }
  persist();
  return true;
}

function resetPlanProgress() {
  // Keep mastered (history) and read (readGoals). Reset only cursor.
  state.planCursor = { stageIdx: 0, sectionIdx: 0 };
  if (state.mode === "plan") {
    syncActiveGoalsToPlan();
  }
  persist();
}

function getCurrentPlanFocus() {
  const focus = getPlanFocus(state.planCursor.stageIdx, state.planCursor.sectionIdx);
  if (!focus) return null;
  return {
    ...focus,
    stage: getLocalizedPlanStageDefinition(focus.stage, currentLanguage())
  };
}
function startSession(snapshot) {
  state.preGameSnapshot = snapshot;
  state.sessionStartedAt = snapshot.startedAt || Date.now();
  persist();
}
function endSession() {
  state.preGameSnapshot = null;
  state.sessionStartedAt = null;
  persist();
}
function recordGame(game) {
  const id = Date.now();
  const date = game.date || getTodayISO();
  const now = new Date();
  const time = game.time || `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  state.history.unshift({ id, date, time, ...game });
  state.preGameSnapshot = null;
  state.sessionStartedAt = null;
  if (state.mode === "plan") {
    syncActiveGoalsToPlan();
    return;
  }
  persist();
}
function clearHistory() {
  state.history = [];
  persist();
}
function exportState() {
  return JSON.stringify(state, null, 2);
}
function importState(json) {
  try {
    const next = JSON.parse(json);
    Object.assign(state, next);
    state.preferences = normalizePreferences(state.preferences);
    persist();
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------
// Live SAMPLE binding for screens
// Screens grab HISTORY by destructuring, so we use a getter via property.
// ---------------------------------------------------------------
const TODAY = getTodayISO();

const SAMPLE = {
  GOALS,
  CATEGORIES,
  TABS,
  SECTIONS,
  // history & state are exposed as live getters so screens always see latest
  get HISTORY() { return state.history; },
  get championPool() { return state.championPool; },
  get currentChampion() { return state.currentChampion; },
  get activeGoals() { return state.activeGoals; },
  get readGoals() { return state.readGoals; },
  get mode() { return state.mode; },
  get firstRunDone() { return state.firstRunDone; },
  get preferences() { return state.preferences; },
  get planCursor() { return state.planCursor; },
  PLAN_STAGES,
  PLAN_SECTION_FLAT,
  get preGameSnapshot() { return state.preGameSnapshot; },
  get thresholds() { return state.thresholds; },
  TODAY,
  // stats
  computeGoalStats,
  computeStreak,
  // mutators
  setChampionPool,
  setCurrentChampion,
  setActiveGoals,
  setPreferences,
  toggleReadGoal,
  completeFirstRun,
  setMode,
  advancePlanSection,
  resetPlanProgress,
  syncActiveGoalsToPlan,
  getCurrentPlanFocus,
  getPlanCursorProgress(cursor = state.planCursor) {
    const progress = getRealPlanCursorProgress(cursor);
    return {
      ...progress,
      stage: progress.stage
        ? getLocalizedPlanStageDefinition(progress.stage, currentLanguage())
        : progress.stage
    };
  },
  startSession,
  endSession,
  recordGame,
  clearHistory,
  exportState,
  importState,
  // helpers for screens
  goalsByTab(tabId) { return GOALS.filter(g => g.tab === tabId); },
  sectionsByTab(tabId) { return SECTIONS.filter(s => s.tab === tabId); },
  goalsInSection(sectionId) { return GOALS.filter(g => g.section === sectionId); }
};

window.SAMPLE = SAMPLE;
