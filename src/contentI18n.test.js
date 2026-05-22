import test from "node:test";
import assert from "node:assert/strict";
import { GOALS, SECTIONS, TABS } from "./goals.js";
import {
  getLocalizedGoalDefinition,
  getLocalizedSectionDefinition,
  getLocalizedTabDefinition,
  localizeGoalStatus
} from "./contentI18n.js";

test("English content translation covers knowledge goal text", () => {
  const en = getLocalizedGoalDefinition("minimap_3s", GOALS.minimap_3s, "en");

  assert.notEqual(en.label, GOALS.minimap_3s.label);
  assert.notEqual(en.short, GOALS.minimap_3s.short);
  assert.notEqual(en.details.what, GOALS.minimap_3s.details.what);
  assert.match(en.label, /minimap/i);
  assert.ok(Array.isArray(en.details.how));
  assert.equal(en.details.how.length, GOALS.minimap_3s.details.how.length);
});

test("English content translation covers tabs, sections, and statuses", () => {
  const enTab = getLocalizedTabDefinition("soloq", TABS.soloq, "en");
  const enSection = getLocalizedSectionDefinition("soloq_system", SECTIONS.soloq_system, "en");

  assert.notEqual(enTab.description, TABS.soloq.description);
  assert.notEqual(enSection.subtitle, SECTIONS.soloq_system.subtitle);
  assert.equal(localizeGoalStatus("NIE ROZPOCZĘTE", "en"), "NOT STARTED");
  assert.equal(localizeGoalStatus("OPANOWANE", "en"), "MASTERED");
});
