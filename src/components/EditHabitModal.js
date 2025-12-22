"use client";

import { useState } from "react";
import { HABIT_COLORS } from "@/lib/colors";
import { useToast } from "@/components/ToastManager";

const ICONS = ["🔥", "💪", "📚", "🧠", "🏃", "🧘", "💻", "🎯", "📝", "🥗"];

export default function EditHabitModal({ habit, onClose, onSaved }) {
  const [name, setName] = useState(habit.name);
  const [icon, setIcon] = useState(habit.icon);
  const [color, setColor] = useState(habit.color);
  const [saving, setSaving] = useState(false);

  const { showToast } = useToast();

  async function save() {
    if (!name.trim()) {
      showToast("Habit name cannot be empty", "error");
      return;
    }
    if (!name.trim()) return;

    setSaving(true);

    try {
      const res = await fetch(`/api/habits/${habit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, icon, color }),
      });

      if (!res.ok) {
        throw new Error();
      }

      showToast("Habit updated successfully", "success");
      onSaved();
      onClose();
    } catch {
      showToast("Failed to update habit", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="w-[420px] bg-[#161b22] border border-[#30363d] rounded-md p-5">
        <h2 className="text-sm font-semibold text-[#f0f6fc] mb-4">
          Edit habit
        </h2>

        {/* Name */}
        <label className="block text-sm text-[#c9d1d9] mb-1">
          Habit name
        </label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-4 rounded-md bg-[#0d1117] border border-[#30363d] px-3 py-2 text-sm text-[#c9d1d9]"
        />

        {/* Icons */}
        <p className="text-sm text-[#c9d1d9] mb-2">Icon</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {ICONS.map(i => (
            <button
              key={i}
              onClick={() => setIcon(i)}
              className={`w-9 h-9 flex items-center justify-center rounded-md border text-lg
                ${icon === i ? "border-[#58a6ff] bg-[#21262d]" : "border-[#30363d]"}
              `}
            >
              {i}
            </button>
          ))}
        </div>

        {/* Colors */}
        <p className="text-sm text-[#c9d1d9] mb-2">Color</p>
        <div className="grid grid-cols-8 gap-2 mb-5">
          {HABIT_COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-sm border ${color === c ? "border-white" : "border-[#30363d]"
                }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm rounded-md border border-[#30363d]"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="px-3 py-1 text-sm rounded-md bg-[#238636] text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
