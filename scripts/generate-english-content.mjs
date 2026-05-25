import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CATEGORIES,
  GOALS,
  PHASES,
  PLAN_STAGES,
  SECTIONS,
  TABS
} from "../src/goals.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = new URL("../src/content.en.js", import.meta.url);
const CACHE_PATH = new URL("./.translation-cache.en.json", import.meta.url);

async function readCache() {
  try {
    return JSON.parse(await readFile(CACHE_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function saveCache(cache) {
  await writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
}

function tidyEnglish(text, source = "") {
  let out = String(text || "")
    .replace(/\bLOL\b/g, "LoL")
    .replace(/\blol\b/g, "LoL")
    .replace(/\bsolo q\b/gi, "soloQ")
    .replace(/\bSolo Q\b/g, "soloQ")
    .replace(/\bMMR \/ LP\b/g, "MMR/LP")
    .replace(/\bMMR\/ LP\b/g, "MMR/LP")
    .replace(/\bLP \/ MMR\b/g, "LP/MMR")
    .replace(/\bCS \/ KDA\b/g, "CS/KDA")
    .replace(/\bW \/ L\b/g, "W/L")
    .replace(/\bwin\/loss\b/gi, "WIN/LOSS")
    .replace(/\blenses\b/gi, "objectives")
    .replace(/\blens\b/gi, "objective")
    .replace(/\bteamfighties\b/gi, "teamfights")
    .replace(/\bspels\b/gi, "spells")
    .replace(/\b(spella|spellu)\b/gi, "spell")
    .replace(/\b(spelli|spelle|spele)\b/gi, "spells")
    .replace(/\b(skilla|skillu)\b/gi, "skill")
    .replace(/\b(skilli|skille|skili)\b/gi, "skills")
    .replace(/\b(recallu|recallem)\b/gi, "recall")
    .replace(/\b(recalli|recall'e)\b/gi, "recalls")
    .replace(/\b(cooldowny|cooldownów)\b/gi, "cooldowns")
    .replace(/\b(cooldownu|cooldownie)\b/gi, "cooldown")
    .replace(/\bdatabase\b/gi, "base")
    .replace(/\bobjectiwy\b/gi, "objectives")
    .replace(/\bobjektiw\b/gi, "objective")
    .replace(/\bobjectivies\b/gi, "objectives")
    .replace(/\bobjectivy\b/gi, "objective")
    .replace(/\bobjectiva\b/gi, "objective")
    .replace(/\b(wave'a|wave'y|wave'ów)\b/gi, "wave")
    .replace(/\bside'a\b/gi, "side")
    .replace(/\bheros\b/gi, "champions")
    .replace(/\bchampionie\b/gi, "champion")
    .replace(/\bjungler\b/gi, "jungler")
    .replace(/\bteam'u\b/gi, "team")
    .replace(/\bcliques\b/gi, "clicks")
    .replace(/\blana\b/gi, "lane")
    .replace(/\binhiba\b/gi, "inhib")
    .replace(/\bmida\b/gi, "mid")
    .replace(/\bnobka\b/gi, "enemy champion")
    .replace(/\bvol\b/gi, "objective")
    .replace(/\bpinki\b/gi, "control wards")
    .replace(/\bpinkies\b/gi, "control wards")
    .replace(/\bwardy\b/gi, "wards")
    .replace(/mech \+ lane/gi, "mechanics + lane fundamentals")
    .replace(/a mechanics \+ lane fundamentals/gi, "mechanics + lane fundamentals")
    .replace(/\bline phase\b/gi, "laning phase")
    .replace(/\bLine foundation\b/g, "Foundation of laning")
    .replace(/Nie ginąć\. SCHODZIĆ na mid\./g, "Do not die. MOVE to mid.")
    .replace(/Walka prawdopodobna\. Sprawdź gold\./g, "Fight likely. Check gold.")
    .replace(/\s+([,.!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (/\bprio\b/i.test(source)) {
    out = out
      .replace(/\bFirst\b/g, "Prio")
      .replace(/\bfirst\b/g, "prio")
      .replace(/\bpriority\b/gi, "prio");
  }
  if (/\btempo\b/i.test(source)) {
    out = out.replace(/\bpace\b/gi, "tempo");
  }
  return out;
}

async function translate(text, cache) {
  if (!text) return text;
  if (cache[text]) {
    const tidied = tidyEnglish(cache[text], text);
    cache[text] = tidied;
    return tidied;
  }

  const params = new URLSearchParams({
    client: "gtx",
    sl: "pl",
    tl: "en",
    dt: "t",
    q: text
  });

  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const translated = tidyEnglish((payload?.[0] || []).map(part => part?.[0] || "").join(""), text);
      cache[text] = translated || text;
      return cache[text];
    } catch (err) {
      lastErr = err;
      await new Promise(resolve => setTimeout(resolve, 350 * attempt));
    }
  }
  throw lastErr;
}

function collectFields(source, fields, into) {
  for (const field of fields) {
    if (typeof source?.[field] === "string" && source[field]) {
      into.add(source[field]);
    }
  }
}

function collectSourceStrings() {
  const strings = new Set();
  for (const item of Object.values(CATEGORIES)) {
    collectFields(item, ["name", "subtitle"], strings);
  }
  for (const item of Object.values(PHASES)) {
    collectFields(item, ["name", "subtitle", "weeks", "description"], strings);
  }
  for (const item of Object.values(TABS)) {
    collectFields(item, ["name", "subtitle", "description"], strings);
  }
  for (const item of Object.values(SECTIONS)) {
    collectFields(item, ["name", "subtitle"], strings);
  }
  for (const stage of PLAN_STAGES) {
    collectFields(stage, ["name", "short", "description"], strings);
  }
  for (const goal of Object.values(GOALS)) {
    collectFields(goal, ["label", "short"], strings);
    const details = goal.details || {};
    collectFields(details, ["what", "when", "whenNot", "success", "notes"], strings);
    for (const item of details.how || []) strings.add(item);
    for (const item of details.mistakes || []) strings.add(item);
  }
  return [...strings].filter(Boolean);
}

async function translateAll(strings, cache) {
  const missing = strings.filter(text => !cache[text]);
  if (missing.length === 0) {
    console.log(`Translation cache hit: ${strings.length} strings.`);
    return;
  }

  console.log(`Translating ${missing.length}/${strings.length} strings...`);
  let cursor = 0;
  let completed = 0;
  const concurrency = 12;

  async function worker() {
    while (cursor < missing.length) {
      const idx = cursor;
      cursor += 1;
      await translate(missing[idx], cache);
      completed += 1;
      if (completed % 50 === 0 || completed === missing.length) {
        console.log(`  ${completed}/${missing.length}`);
        await saveCache(cache);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  await saveCache(cache);
}

async function translateFields(source, fields, cache) {
  const out = {};
  for (const field of fields) {
    if (typeof source?.[field] === "string") {
      out[field] = await translate(source[field], cache);
    }
  }
  return out;
}

async function mapObject(obj, mapper) {
  const entries = [];
  for (const [id, value] of Object.entries(obj)) {
    entries.push([id, await mapper(id, value)]);
  }
  return Object.fromEntries(entries);
}

async function main() {
  const cache = await readCache();
  await translateAll(collectSourceStrings(), cache);

  const content = {
    categories: await mapObject(CATEGORIES, async (_id, item) =>
      translateFields(item, ["name", "subtitle"], cache)
    ),
    phases: await mapObject(PHASES, async (_id, item) =>
      translateFields(item, ["name", "subtitle", "weeks", "description"], cache)
    ),
    tabs: await mapObject(TABS, async (_id, item) =>
      translateFields(item, ["name", "subtitle", "description"], cache)
    ),
    sections: await mapObject(SECTIONS, async (_id, item) =>
      translateFields(item, ["name", "subtitle"], cache)
    ),
    planStages: await Promise.all(PLAN_STAGES.map(async stage => ({
      id: stage.id,
      ...(await translateFields(stage, ["name", "short", "description"], cache))
    }))),
    goals: await mapObject(GOALS, async (_id, goal) => {
      const details = goal.details || {};
      return {
        ...(await translateFields(goal, ["label", "short"], cache)),
        details: {
          ...(await translateFields(details, ["what", "when", "whenNot", "success", "notes"], cache)),
          how: Array.isArray(details.how)
            ? await Promise.all(details.how.map(item => translate(item, cache)))
            : [],
          mistakes: Array.isArray(details.mistakes)
            ? await Promise.all(details.mistakes.map(item => translate(item, cache)))
            : []
        }
      };
    })
  };

  await saveCache(cache);
  await mkdir(dirname(fileURLToPath(OUT_PATH)), { recursive: true });
  await writeFile(
    OUT_PATH,
    `// Generated by scripts/generate-english-content.mjs from src/goals.js.\n` +
    `// Keep edits in src/goals.js + regenerate unless a translation needs manual correction.\n` +
    `const CONTENT_EN = ${JSON.stringify(content, null, 2)};\n\n` +
    `export default CONTENT_EN;\n`,
    "utf8"
  );
  console.log(`Wrote ${fileURLToPath(OUT_PATH)}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
