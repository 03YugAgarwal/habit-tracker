export function getCurrentStreak(data) {
  let streak = 0;

  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].count > 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function getMaxStreak(data) {
  let max = 0;
  let current = 0;

  for (const day of data) {
    if (day.count > 0) {
      current++;
      max = Math.max(max, current);
    } else {
      current = 0;
    }
  }

  return max;
}
