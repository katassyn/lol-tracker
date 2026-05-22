import CONTENT_EN from "./content.en.js";

const STATUS_EN = {
  "NIE ROZPOCZĘTE": "NOT STARTED",
  "OPANOWANE": "MASTERED",
  "UTRWALONE": "CONSOLIDATED",
  "WSTĘPNIE OPANOWANE": "INITIALLY MASTERED",
  "WYMAGA POPRAWY": "NEEDS WORK",
  "W TRENINGU": "IN TRAINING"
};

function wantsEnglish(language) {
  return language === "en";
}

function mergeStringFields(base, translation, fields) {
  if (!translation) return base;
  const next = { ...base };
  for (const field of fields) {
    if (typeof translation[field] === "string" && translation[field]) {
      next[field] = translation[field];
    }
  }
  return next;
}

export function getLocalizedGoalDefinition(id, goal, language) {
  if (!wantsEnglish(language)) return goal;
  const translation = CONTENT_EN.goals?.[id];
  if (!translation) return goal;

  const details = goal.details || {};
  const translatedDetails = translation.details || {};
  return {
    ...goal,
    ...mergeStringFields(goal, translation, ["label", "short"]),
    details: {
      ...details,
      ...mergeStringFields(details, translatedDetails, ["what", "when", "whenNot", "success", "notes"]),
      how: Array.isArray(translatedDetails.how) && translatedDetails.how.length > 0
        ? translatedDetails.how
        : (details.how || []),
      mistakes: Array.isArray(translatedDetails.mistakes) && translatedDetails.mistakes.length > 0
        ? translatedDetails.mistakes
        : (details.mistakes || [])
    }
  };
}

export function getLocalizedCategoryDefinition(id, category, language) {
  if (!wantsEnglish(language)) return category;
  return mergeStringFields(category, CONTENT_EN.categories?.[id], ["name", "subtitle"]);
}

export function getLocalizedPhaseDefinition(id, phase, language) {
  if (!wantsEnglish(language)) return phase;
  return mergeStringFields(phase, CONTENT_EN.phases?.[id], ["name", "subtitle", "weeks", "description"]);
}

export function getLocalizedTabDefinition(id, tab, language) {
  if (!wantsEnglish(language)) return tab;
  return mergeStringFields(tab, CONTENT_EN.tabs?.[id], ["name", "subtitle", "description"]);
}

export function getLocalizedSectionDefinition(id, section, language) {
  if (!wantsEnglish(language)) return section;
  return mergeStringFields(section, CONTENT_EN.sections?.[id], ["name", "subtitle"]);
}

export function getLocalizedPlanStageDefinition(stage, language) {
  if (!wantsEnglish(language)) return stage;
  const translation = CONTENT_EN.planStages?.find(item => item.id === stage?.id);
  return mergeStringFields(stage, translation, ["name", "short", "description"]);
}

export function localizeGoalStatus(status, language) {
  if (!wantsEnglish(language)) return status;
  return STATUS_EN[status] || status;
}
