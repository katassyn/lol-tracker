import test from "node:test";
import assert from "node:assert/strict";
import {
  createDefaultSessionPlan,
  getGoalTrend,
  getOrderedLearningItems,
  getRecentMistakes,
  getTrainableActiveGoalIds,
  getWeaknessSuggestions
} from "./learningLogic.js";

const goals = {
  minimap_3s: { label: "Minimapa co 3 sekundy", category: "macro" },
  freeze: { label: "Freeze fali", category: "wave" },
  skillshot_angles: { label: "Trafianie skillshotów", category: "micro" }
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

test("getWeaknessSuggestions ignores one-time setup goals", () => {
  const suggestions = getWeaknessSuggestions([
    { focusGoals: ["game_settings"], goalCompliance: { game_settings: false } },
    { focusGoals: ["game_settings"], goalCompliance: { game_settings: false } },
    { focusGoals: ["game_settings"], goalCompliance: { game_settings: false } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: false } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: false } },
    { focusGoals: ["minimap_3s"], goalCompliance: { minimap_3s: false } }
  ], {
    ...goals,
    game_settings: { label: "Ustawienia pod naukę", category: "setup", type: "setup" }
  });

  assert.deepEqual(suggestions.map(item => item.id), ["minimap_3s"]);
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

test("getTrainableActiveGoalIds excludes one-time setup goals from game focus", () => {
  const availableGoals = {
    game_settings: { label: "Ustawienia pod naukę", type: "setup" },
    slow_push: { label: "Slow push", category: "wave" },
    missing_goal: null
  };

  assert.deepEqual(
    getTrainableActiveGoalIds(["game_settings", "slow_push", "missing_goal"], availableGoals),
    ["slow_push"]
  );
});

test("getOrderedLearningItems follows the learning path and appends leftovers", () => {
  const availableGoals = {
    slow_push: { label: "Slow push", category: "wave" },
    game_settings: { label: "Ustawienia pod naukę", type: "setup" },
    skillshot_angles: { label: "Trafianie skillshotów", category: "micro" }
  };
  const path = [
    { title: "Setup", goalIds: ["game_settings"] },
    { title: "Lane", goalIds: ["slow_push"] }
  ];

  assert.deepEqual(
    getOrderedLearningItems(availableGoals, path).map(item => [item.id, item.stageTitle]),
    [
      ["game_settings", "Setup"],
      ["slow_push", "Lane"],
      ["skillshot_angles", "Pozostałe"]
    ]
  );
});
