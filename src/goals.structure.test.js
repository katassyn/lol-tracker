import test from "node:test";
import assert from "node:assert/strict";
import {
  GOALS,
  SECTIONS,
  TABS,
  getGoalsBySection,
  getGoalsByTab
} from "./goals.js";

test("all goals are assigned to exactly one valid macro or micro section", () => {
  for (const [id, goal] of Object.entries(GOALS)) {
    assert.ok(goal.tab, `${id} has no tab`);
    assert.ok(goal.section, `${id} has no section`);
    assert.ok(TABS[goal.tab], `${id} has invalid tab ${goal.tab}`);
    assert.ok(SECTIONS[goal.section], `${id} has invalid section ${goal.section}`);
    assert.equal(SECTIONS[goal.section].tab, goal.tab, `${id} tab does not match section tab`);
  }
});

test("knowledge tabs expose macro and micro goals without a middle bucket", () => {
  const macroGoals = getGoalsByTab("macro");
  const microGoals = getGoalsByTab("micro");
  const allIds = new Set(Object.keys(GOALS));

  assert.ok(macroGoals.some(goal => goal.id === "decision_eval_100x"));
  assert.ok(microGoals.some(goal => goal.id === "game_settings"));
  assert.equal(macroGoals.length + microGoals.length, allIds.size);
  assert.equal(new Set([...macroGoals, ...microGoals].map(goal => goal.id)).size, allIds.size);
});

test("section helper returns goals sorted by section order and goal order", () => {
  const grouped = getGoalsBySection("macro");
  const sectionIds = grouped.map(section => section.id);

  assert.deepEqual(sectionIds, [
    "awareness",
    "wave_macro",
    "prio_tempo",
    "early_mid",
    "mid_late",
    "vision",
    "teamfight",
    "mindset_meta"
  ]);
  assert.equal(grouped[0].goals[0].id, "minimap_3s");
});
