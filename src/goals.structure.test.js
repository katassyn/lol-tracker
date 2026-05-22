import test from "node:test";
import assert from "node:assert/strict";
import {
  GOALS,
  PLAN_SECTION_FLAT,
  PLAN_STAGES,
  SECTIONS,
  TABS,
  getPlanCursorProgress,
  getPlanFocus,
  nextPlanFocus,
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

test("knowledge tabs expose macro, micro, and soloq goals", () => {
  const macroGoals = getGoalsByTab("macro");
  const microGoals = getGoalsByTab("micro");
  const soloqGoals = getGoalsByTab("soloq");
  const allIds = new Set(Object.keys(GOALS));

  assert.ok(macroGoals.some(goal => goal.id === "decision_eval_100x"));
  assert.ok(microGoals.some(goal => goal.id === "game_settings"));
  assert.ok(soloqGoals.some(goal => goal.id === "err_8_areas"));
  assert.equal(macroGoals.length + microGoals.length + soloqGoals.length, allIds.size);
  assert.equal(new Set([...macroGoals, ...microGoals, ...soloqGoals].map(goal => goal.id)).size, allIds.size);
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

test("learning plan follows SoloQ theory, micro, then macro", () => {
  assert.deepEqual(PLAN_STAGES.map(stage => stage.id), [
    "stage_soloq",
    "stage_micro",
    "stage_macro"
  ]);

  assert.equal(PLAN_STAGES[0].sections[0], "soloq_system");
  assert.equal(PLAN_STAGES[1].sections[0], "micro_basics");
  assert.equal(PLAN_STAGES[2].sections[0], "awareness");
  assert.ok(!PLAN_SECTION_FLAT.some(item => item.sectionId === "settings"));

  const plannedSections = PLAN_SECTION_FLAT.map(item => item.sectionId);
  assert.equal(new Set(plannedSections).size, plannedSections.length);
  for (const sectionId of plannedSections) {
    assert.ok(SECTIONS[sectionId], `${sectionId} is not a valid section`);
    assert.ok(Object.values(GOALS).some(goal => goal.section === sectionId), `${sectionId} has no goals`);
  }
});

test("plan cursor helpers expose current section and progress", () => {
  assert.deepEqual(getPlanFocus(0, 0), {
    stage: PLAN_STAGES[0],
    sectionId: "soloq_system"
  });
  assert.deepEqual(nextPlanFocus(0, PLAN_STAGES[0].sections.length - 1), {
    stageIdx: 1,
    sectionIdx: 0
  });

  const progress = getPlanCursorProgress({ stageIdx: 1, sectionIdx: 1 });
  assert.equal(progress.current, 9);
  assert.equal(progress.total, PLAN_SECTION_FLAT.length);
  assert.equal(progress.sectionId, "skills");
  assert.equal(progress.percent, Math.round((9 / PLAN_SECTION_FLAT.length) * 100));
});
