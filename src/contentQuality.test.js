import test from "node:test";
import assert from "node:assert/strict";
import {
  CATEGORIES,
  GOALS,
  PHASES,
  PLAN_STAGES,
  SECTIONS,
  TABS
} from "./goals.js";
import CONTENT_EN from "./content.en.js";

function collectTextEntries() {
  const entries = [];
  const add = (path, value) => {
    if (typeof value === "string" && value) entries.push({ path, value });
  };

  for (const [id, item] of Object.entries(CATEGORIES)) {
    add(`categories.${id}.name`, item.name);
    add(`categories.${id}.subtitle`, item.subtitle);
  }
  for (const [id, item] of Object.entries(PHASES)) {
    add(`phases.${id}.name`, item.name);
    add(`phases.${id}.subtitle`, item.subtitle);
    add(`phases.${id}.weeks`, item.weeks);
    add(`phases.${id}.description`, item.description);
  }
  for (const [id, item] of Object.entries(TABS)) {
    add(`tabs.${id}.name`, item.name);
    add(`tabs.${id}.subtitle`, item.subtitle);
    add(`tabs.${id}.description`, item.description);
  }
  for (const [id, item] of Object.entries(SECTIONS)) {
    add(`sections.${id}.name`, item.name);
    add(`sections.${id}.subtitle`, item.subtitle);
  }
  for (const [index, stage] of PLAN_STAGES.entries()) {
    add(`planStages.${index}.name`, stage.name);
    add(`planStages.${index}.short`, stage.short);
    add(`planStages.${index}.description`, stage.description);
  }
  for (const [id, goal] of Object.entries(GOALS)) {
    add(`goals.${id}.label`, goal.label);
    add(`goals.${id}.short`, goal.short);
    const details = goal.details || {};
    for (const field of ["what", "when", "whenNot", "success", "notes"]) {
      add(`goals.${id}.details.${field}`, details[field]);
    }
    for (const [index, value] of (details.how || []).entries()) {
      add(`goals.${id}.details.how.${index}`, value);
    }
    for (const [index, value] of (details.mistakes || []).entries()) {
      add(`goals.${id}.details.mistakes.${index}`, value);
    }
  }

  return entries;
}

test("Polish content avoids known typos and unclear shorthand", () => {
  const forbidden = [
    { pattern: /objektiw/i, reason: "use objective/cel mapowy consistently" },
    { pattern: /\bcanon/i, reason: "use cannon for cannon minions/waves" },
    { pattern: /wbiij/i, reason: "typo: wbijasz" },
    { pattern: /biorenia/i, reason: "typo: brania/przyjmowania" },
    { pattern: /cwiczenia/i, reason: "typo: ćwiczenia" },
    { pattern: /nizsz/i, reason: "typo: niższ" },
    { pattern: /tillt/i, reason: "typo: tilt" },
    { pattern: /nieigrow/i, reason: "typo: niegrowy" },
    { pattern: /pickow/i, reason: "typo: picków" },
    { pattern: /^Wyzbyć się/i, reason: "use a clear imperative instead of an infinitive" },
    { pattern: /^Zostanie dłużej/i, reason: "use a clear conditional sentence" },
    { pattern: /\b(spella|spelli|spellem|spellu|spelle|spela|speli|spele)\b/i, reason: "keep spell/spells in English without Polish endings" },
    { pattern: /\b(skilla|skilli|skille|skili|skillu|skillami)\b/i, reason: "keep skill/spell terms in English without Polish endings" },
    { pattern: /\b(cooldowny|cooldownu|cooldownem|cooldownie|cooldownach|cooldownami|cooldownów)\b/i, reason: "keep cooldown/cooldowns in English without Polish endings" },
    { pattern: /\b(recallu|recalli|recall'e|recallem|recallować|recallnąć|recalluj\w*)\b/i, reason: "keep recall/recalls in English without Polish endings" },
    { pattern: /\bobjective('u|'em|'y|em|ami|ach)\b/i, reason: "keep objective/objectives in English without Polish endings" },
    { pattern: /\bside('a|'em|'ach)\b/i, reason: "keep side/side lane in English without Polish endings" },
    { pattern: /\bwave('a|'em|'y|'ów)\b/i, reason: "keep wave in English without Polish endings" },
    { pattern: /\b(z|do|w|przy)\s+baz(y|ie)\b/i, reason: "use base for the in-game base" }
  ];

  for (const { path, value } of collectTextEntries()) {
    for (const { pattern, reason } of forbidden) {
      assert.doesNotMatch(value, pattern, `${path}: ${reason}`);
    }
  }
});

function collectNestedStrings(value, path = "contentEn") {
  if (typeof value === "string" && value) return [{ path, value }];
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectNestedStrings(item, `${path}.${index}`));
  }
  return Object.entries(value).flatMap(([key, item]) => collectNestedStrings(item, `${path}.${key}`));
}

test("English content avoids known machine-translation artifacts", () => {
  const forbidden = [
    { pattern: /\bspels\b/i, reason: "use spells" },
    { pattern: /\bdatabase\b/i, reason: "base was mistranslated as database" },
    { pattern: /\bobjectivies\b/i, reason: "use objectives" },
    { pattern: /\bteamfighties\b/i, reason: "use teamfights" },
    { pattern: /\bcliques\b/i, reason: "use clicks" },
    { pattern: /\blenses\b/i, reason: "use objectives" },
    { pattern: /\b(spella|spelli|spellu|spele|skilli|recallu|recalli|cooldowny|objective'u|wave'a|side'a)\b/i, reason: "do not leak Polish-inflected game terms into English content" }
  ];

  for (const { path, value } of collectNestedStrings(CONTENT_EN)) {
    for (const { pattern, reason } of forbidden) {
      assert.doesNotMatch(value, pattern, `${path}: ${reason}`);
    }
  }
});
