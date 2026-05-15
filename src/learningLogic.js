export function isTrainableGoal(goal) {
  return !!goal && goal.type !== "setup";
}

export function getTrainableActiveGoalIds(activeGoals, goals) {
  return activeGoals.filter(goalId => isTrainableGoal(goals[goalId]));
}

export function getOrderedLearningItems(goals, learningPath) {
  const seen = new Set();
  const ordered = [];

  learningPath.forEach((stage, stageIndex) => {
    stage.goalIds.forEach((id, positionInStage) => {
      if (!goals[id] || seen.has(id)) return;
      seen.add(id);
      ordered.push({
        id,
        ...goals[id],
        stageIndex,
        positionInStage,
        stageTitle: stage.title,
        stageDesc: stage.desc || ""
      });
    });
  });

  Object.entries(goals).forEach(([id, goal]) => {
    if (!goal || seen.has(id)) return;
    ordered.push({ id, ...goal, stageIndex: learningPath.length, positionInStage: 0, stageTitle: "Pozostałe", stageDesc: "" });
  });

  return ordered;
}

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
    .filter(([, goal]) => isTrainableGoal(goal))
    .map(([id, goal]) => {
      const trend = getGoalTrend(games, id, 5);
      const category = goal.category;
      const categoryAttempts = games
        .filter(game => Array.isArray(game.focusGoals))
        .slice(0, 10)
        .flatMap(game => game.focusGoals)
        .filter(goalId => isTrainableGoal(goals[goalId]) && goals[goalId]?.category === category).length;

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
