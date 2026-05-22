export const DEFAULT_PREFERENCES = {
  themeMode: "dark",
  language: "en"
};

const VALID_THEME_MODES = new Set(["dark", "light"]);
const VALID_LANGUAGES = new Set(["pl", "en"]);

export function normalizePreferences(input = {}) {
  const source = input && typeof input === "object" ? input : {};
  return {
    themeMode: VALID_THEME_MODES.has(source.themeMode)
      ? source.themeMode
      : DEFAULT_PREFERENCES.themeMode,
    language: VALID_LANGUAGES.has(source.language)
      ? source.language
      : DEFAULT_PREFERENCES.language
  };
}
