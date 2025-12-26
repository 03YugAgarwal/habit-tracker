"use client";

import HabitSection from "@/components/HabitSection";
import { useMemo } from "react";

function build365(logs) {
  const map = {};

  logs.forEach(l => {
    const key = new Date(l.date).toISOString().slice(0, 10);
    map[key] = (map[key] || 0) + 1;
  });

  const today = new Date();
  const data = [];

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const key = d.toISOString().slice(0, 10);
    data.push({ date: key, count: map[key] || 0 });
  }

  return data;
}

export default function DashboardClient({ habits, logs }) {
  return (
    <div className="space-y-4">
      {habits.map(habit => {
        const habitLogs = logs.filter(l => l.habitId === habit.id);

        const data = useMemo(
          () => build365(habitLogs),
          [habitLogs]
        );

        return (
          <HabitSection
            key={habit.id}
            habit={habit}
            data={data}
          />
        );
      })}
    </div>
  );
}
