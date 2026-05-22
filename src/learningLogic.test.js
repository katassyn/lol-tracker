import test from "node:test";
import assert from "node:assert/strict";
import {
  createDefaultSessionPlan,
  getGoalTrend,
  getRecentMistakes,
  getWeaknessSuggestions,
  getPhaseProgress,
  getSectionProgress,
  getSuggestedNextGoal,
  getCurrentUserPhase,
  getChampionStats,
  getReflectionStreak,
  getTopMistakeCategories
} from "./learningLogic.js";

const goals = {
  minimap_3s: { label: "Minimapa co 3 sekundy", category: "info", phase: 1, week: 1, order: 1 },
  tab_check: { label: "TAB", category: "info", phase: 1, week: 1, order: 2 },
  freeze: { label: "Freeze fali", category: "wave", phase: 2, week: 5, order: 16, section: "wave_macro" },
  slow_push: { label: "Slow push", category: "wave", phase: 2, week: 5, order: 15, section: "wave_macro" },
  prio_basic: { label: "Prio", category: "macro", phase: 3, week: 9, order: 29, section: "prio_tempo" },
  skillshot_angles: { label: "Trafianie skillshotów", category: "micro", phase: 1, week: 3, order: 8, section: "skills" }
};

test("getRecentMistakes returns the latest non-empty mistakes", () => {
  const mistakes = getRecentMistakes([
    { id: 1, mistake: "  zły recall  ", timestamp: 10, focusGoals: ["freeze"] },
    { id: 2, mistake: "", timestamp: 9, focusGoals: [] },
    { id: 3, mistake: "brak mapy", timestamp: 8, focusGoals: ["minimap_3s"] },
    { id: 4, mistake: "fight bez itemu", timestamp: 7, focusGoals: [] }
  ]);

  assert.deepEqual(mistakes.map(item => item.mistake), [
    "zły recall",
    "brak mapy",
    "fight bez itemu"
  ]);
});

test("getGoalTrend marks repeated failed attempts as falling", () => {
  const trend = getGoalTrend([
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: false } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: true } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: false } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: false } }
  ], "minimap_3s");

  assert.equal(trend.rate, 25);
  assert.equal(trend.label, "SPADA");
  assert.equal(trend.tone, "bad");
});

test("getWeaknessSuggestions prioritizes recently failed skills", () => {
  const suggestions = getWeaknessSuggestions([
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: false } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: false } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: true } },
    { focusGoals: ["freeze"], goalCompliance: { freeze: true } },
    { focusGoals: ["freeze"], goalCompliance: { freeze: true } },
    { focusGoals: ["skillshot_angles"], goalCompliance: { skillshot_angles: false } }
  ], goals);

  assert.equal(suggestions[0].id, "minimap_3s");
  assert.equal(suggestions[0].reason, "1/3 wykonane w ostatnich próbach");
});

test("createDefaultSessionPlan uses active goals and latest mistake", () => {
  const plan = createDefaultSessionPlan(
    ["freeze", "minimap_3s"],
    [{ mistake: "nie patrzyłem na mapę" }]
  );

  assert.deepEqual(plan, {
    primaryGoalId: "freeze",
    secondaryGoalId: "minimap_3s",
    avoidMistake: "nie patrzyłem na mapę",
    note: ""
  });
});

test("getPhaseProgress groups goals by phase and marks mastered", () => {
  const games = [
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: true } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: true } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: true } },
    { focusGoals: ["freeze"], goalCompliance: { freeze: false } }
  ];
  const progress = getPhaseProgress(games, goals);
  assert.equal(progress[1].mastered, 1);
  assert.ok(progress[1].total >= 2); // minimap_3s + tab_check + skillshot_angles
  assert.equal(progress[2].mastered, 0);
});

test("getSectionProgress groups goals by section and marks mastered", () => {
  const games = [
    { focusGoals: ["freeze"], goalCompliance: { freeze: true } },
    { focusGoals: ["freeze"], goalCompliance: { freeze: true } },
    { focusGoals: ["freeze"], goalCompliance: { freeze: true } },
    { focusGoals: ["prio_basic"], goalCompliance: { prio_basic: false } }
  ];
  const progress = getSectionProgress(games, goals);
  assert.equal(progress.wave_macro.mastered, 1);
  assert.equal(progress.wave_macro.total, 2);
  assert.equal(progress.prio_tempo.mastered, 0);
});

test("getSuggestedNextGoal returns next not-yet-active not-mastered goal in phase", () => {
  const games = [
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: true } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: true } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: true } }
  ];
  const next = getSuggestedNextGoal(games, goals, ["minimap_3s"], 1);
  assert.equal(next, "tab_check");
});

test("getCurrentUserPhase identifies phase user should focus on", () => {
  const games = [];
  for (let i = 0; i < 5; i++) {
    games.push({ focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: true } });
    games.push({ focusGoals: ["tab_check"], goalCompliance: { tab_check: true } });
    games.push({ focusGoals: ["skillshot_angles"], goalCompliance: { skillshot_angles: true } });
  }
  const phase = getCurrentUserPhase(games, goals);
  assert.equal(phase, 2); // phase 1 mastered enough → move to 2
});

test("getChampionStats aggregates by champion", () => {
  const games = [
    { champion: "Syndra", focusGoals: ["freeze"], goalCompliance: { freeze: true } },
    { champion: "Syndra", focusGoals: ["freeze"], goalCompliance: { freeze: false } },
    { champion: "Ahri", focusGoals: ["slow_push"], goalCompliance: { slow_push: true } }
  ];
  const stats = getChampionStats(games, "Syndra");
  assert.equal(stats.total, 2);
  assert.equal(stats.complianceRate, 50);
});

test("getReflectionStreak counts consecutive days with games", () => {
  const today = new Date();
  const day = (offset) => {
    const d = new Date(today);
    d.setDate(d.getDate() - offset);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const games = [
    { date: day(0) },
    { date: day(1) },
    { date: day(2) },
    { date: day(4) }
  ];
  const streak = getReflectionStreak(games);
  assert.equal(streak, 3);
});

test("getTopMistakeCategories returns ordered by frequency", () => {
  const games = [
    { focusGoals: ["minimap_3s", "freeze"], goalCompliance: { minimap_3s: false, freeze: false } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: false } },
    { focusGoals: ["skillshot_angles"], goalCompliance: { skillshot_angles: false } }
  ];
  const top = getTopMistakeCategories(games, goals);
  assert.equal(top[0].cat, "info"); // minimap_3s = info, twice
  assert.equal(top[0].count, 2);
});
