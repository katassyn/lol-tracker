// ============================================================
// LEARNING LOGIC — helpers do analizy gier, trendów, fazowości
// ============================================================

export function getRecentMistakes(games, limit = 3) {
  return games
    .filter(game => typeof game.mistake === "string" && game.mistake.trim())
    .slice(0, limit)
    .map(game => ({
      id: game.id,
      mistake: game.mistake.trim(),
      timestamp: game.timestamp,
      focusGoals: Array.isArray(game.focusGoals) ? game.focusGoals : []
    }));
}

export function getGoalTrend(games, goalId, recentLimit = 5) {
  const attempts = games
    .filter(game => Array.isArray(game.focusGoals) && game.focusGoals.includes(goalId))
    .slice(0, recentLimit);

  if (attempts.length === 0) {
    return { attempts: 0, passed: 0, rate: null, label: "BRAK DANYCH", tone: "neutral" };
  }

  const passed = attempts.filter(game => !!game.goalCompliance?.[goalId]).length;
  const rate = Math.round((passed / attempts.length) * 100);

  if (attempts.length >= 3 && rate < 50) {
    return { attempts: attempts.length, passed, rate, label: "SPADA", tone: "bad" };
  }

  if (attempts.length >= 3 && rate >= 75) {
    return { attempts: attempts.length, passed, rate, label: "ROŚNIE", tone: "good" };
  }

  return { attempts: attempts.length, passed, rate, label: "STABILNIE", tone: "warning" };
}

export function getWeaknessSuggestions(games, goals, limit = 3) {
  return Object.entries(goals)
    .map(([id, goal]) => {
      const trend = getGoalTrend(games, id, 5);
      const category = goal.category;
      const categoryAttempts = games
        .filter(game => Array.isArray(game.focusGoals))
        .slice(0, 10)
        .flatMap(game => game.focusGoals)
        .filter(goalId => goals[goalId]?.category === category).length;

      const score =
        trend.attempts >= 3 && trend.rate !== null
          ? (100 - trend.rate) + trend.attempts * 4 + categoryAttempts
          : 0;

      return {
        id,
        label: goal.label,
        category,
        trend,
        score,
        reason: trend.rate === null
          ? "Brak ostatnich prób"
          : `${trend.passed}/${trend.attempts} wykonane w ostatnich próbach`
      };
    })
    .filter(item => item.score > 0 && item.trend.rate < 60)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function createDefaultSessionPlan(activeGoals, recentMistakes) {
  return {
    primaryGoalId: activeGoals[0] || "",
    secondaryGoalId: activeGoals[1] || "",
    avoidMistake: recentMistakes[0]?.mistake || "",
    note: ""
  };
}

// ============================================================
// PHASE PROGRESS — postęp w 12-tygodniowym planie
// ============================================================

// Per-phase compliance summary
export function getPhaseProgress(games, goals) {
  const phaseStats = { 1: { goals: [], total: 0, mastered: 0 }, 2: { goals: [], total: 0, mastered: 0 }, 3: { goals: [], total: 0, mastered: 0 }, ongoing: { goals: [], total: 0, mastered: 0 } };
  Object.entries(goals).forEach(([id, goal]) => {
    const phase = goal.phase || "ongoing";
    const gamesWithGoal = games.filter(g => Array.isArray(g.focusGoals) && g.focusGoals.includes(id));
    const compliance = gamesWithGoal.filter(g => g.goalCompliance?.[id]).length;
    const isMastered = gamesWithGoal.length >= 3 && compliance / gamesWithGoal.length >= 0.66;
    if (!phaseStats[phase]) phaseStats[phase] = { goals: [], total: 0, mastered: 0 };
    phaseStats[phase].goals.push({ id, attempts: gamesWithGoal.length, passed: compliance, isMastered });
    phaseStats[phase].total++;
    if (isMastered) phaseStats[phase].mastered++;
  });
  return phaseStats;
}

// Suggested next goal to start training (small steps technique)
// Logic: within current phase find first goal that user hasn't activated AND hasn't mastered yet
export function getSuggestedNextGoal(games, goals, activeGoals, currentPhase = 1) {
  const allInPhase = Object.entries(goals)
    .filter(([_, g]) => g.phase === currentPhase || g.phase === Number(currentPhase))
    .sort((a, b) => (a[1].order || 999) - (b[1].order || 999));

  for (const [id] of allInPhase) {
    if (activeGoals.includes(id)) continue;
    const gamesWithGoal = games.filter(g => Array.isArray(g.focusGoals) && g.focusGoals.includes(id));
    const compliance = gamesWithGoal.filter(g => g.goalCompliance?.[id]).length;
    const isMastered = gamesWithGoal.length >= 3 && compliance / gamesWithGoal.length >= 0.66;
    if (isMastered) continue;
    return id;
  }
  return null;
}

// Determine which phase user is currently in (most points still not mastered)
export function getCurrentUserPhase(games, goals) {
  const phaseStats = getPhaseProgress(games, goals);
  for (const phase of [1, 2, 3]) {
    const s = phaseStats[phase];
    if (s.total === 0) continue;
    const ratio = s.mastered / s.total;
    if (ratio < 0.8) return phase;
  }
  return 3;
}

// ============================================================
// CHAMPION POOL & STREAK helpers
// ============================================================

export function getChampionStats(games, championName) {
  if (!championName) return null;
  const gamesWithChamp = games.filter(g => g.champion === championName);
  const total = gamesWithChamp.length;
  const totalGoals = gamesWithChamp.reduce((sum, g) => sum + (g.focusGoals?.length || 0), 0);
  const metGoals = gamesWithChamp.reduce((sum, g) => sum + Object.values(g.goalCompliance || {}).filter(Boolean).length, 0);
  const complianceRate = totalGoals > 0 ? Math.round((metGoals / totalGoals) * 100) : 0;
  return { total, complianceRate, totalGoals, metGoals };
}

// Liczba kolejnych dni z minimum 1 grą z refleksją
export function getReflectionStreak(games) {
  if (!games.length) return 0;
  const days = new Set(games.map(g => g.date).filter(Boolean));
  const sortedDays = Array.from(days).sort().reverse();
  if (sortedDays.length === 0) return 0;
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  let streak = 0;
  let cursor = new Date(today);
  // streak liczy się tylko jeśli dziś LUB wczoraj było grane (dziś nie zawsze trzeba grać)
  for (let i = 0; i < 365; i++) {
    const cursorStr = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
    if (sortedDays.includes(cursorStr)) {
      streak++;
    } else if (i === 0 && cursorStr === todayStr) {
      // dziś brak — przesuń na wczoraj bez przerywania
    } else {
      break;
    }
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// Najczęstsze błędy z ostatnich N gier (do review queue)
export function getTopMistakeCategories(games, goals, limit = 5) {
  const counter = {};
  games.slice(0, 20).forEach(g => {
    (g.focusGoals || []).forEach(gid => {
      if (g.goalCompliance?.[gid] === false || g.goalCompliance?.[gid] === undefined) {
        const cat = goals[gid]?.category || "other";
        counter[cat] = (counter[cat] || 0) + 1;
      }
    });
  });
  return Object.entries(counter)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([cat, count]) => ({ cat, count }));
}
