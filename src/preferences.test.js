import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_PREFERENCES,
  normalizePreferences
} from "./preferences.js";

test("normalizePreferences keeps valid theme and language", () => {
  assert.deepEqual(normalizePreferences({ themeMode: "light", language: "en" }), {
    themeMode: "light",
    language: "en"
  });
  assert.deepEqual(normalizePreferences({ themeMode: "dark", language: "pl" }), {
    themeMode: "dark",
    language: "pl"
  });
});

test("normalizePreferences falls back for missing or invalid preferences", () => {
  assert.deepEqual(normalizePreferences(null), DEFAULT_PREFERENCES);
  assert.equal(DEFAULT_PREFERENCES.language, "en");
  assert.deepEqual(normalizePreferences({ themeMode: "blue", language: "de" }), DEFAULT_PREFERENCES);
  assert.deepEqual(normalizePreferences({ themeMode: "light" }), {
    ...DEFAULT_PREFERENCES,
    themeMode: "light"
  });
});
