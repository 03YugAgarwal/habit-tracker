"use client";

import { useState } from "react";
import { HABIT_COLORS } from "@/lib/colors";

const ICONS = [
  "🔥", "💪", "🏃", "🏋️", "🧘", "🚴",
  "🧠", "📚", "📝", "✍️", "📖", "🎓",
  "💻", "⌨️", "📊", "📈", "📅", "⏰",
  "🎯", "🏆", "🚀", "⭐", "💯", "⚡",
  "🥗", "🍎", "🥦", "💧", "🍵", "🍳",
  "😴", "🛌", "🌙", "🧖",
  "🎨", "🎵", "🎧", "📷",
  "🌱", "🌿", "☀️", "🕊️"
];


export default function AddHabitModal({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(ICONS[0]);
  const [color, setColor] = useState(HABIT_COLORS[0]);

  const [customHex, setCustomHex] = useState("");
  const [hexError, setHexError] = useState("");

  if (!open) return null;

  function submit() {
    if (!name.trim()) return;

    if (customHex && !isValidHex(customHex)) {
      setHexError("Invalid hex color");
      return;
    }

    onAdd({ name, icon, color });
    onClose();

    // reset
    setName("");
    setIcon(ICONS[0]);
    setColor(HABIT_COLORS[0]);
    setCustomHex("");
    setHexError("");
  }

  function handleHexChange(value) {
    setCustomHex(value);
    if (!value) {
      setHexError("");
      return;
    }

    if (!isValidHex(value)) {
      setHexError("Use format #RRGGBB");
      return;
    }

    setHexError("");
    setColor(value);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[420px] bg-[#161b22] border border-[#30363d] rounded-md p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold text-[#f0f6fc]">
            Add new habit
          </h2>
          <button
            onClick={onClose}
            className="text-[#8b949e] hover:text-[#f0f6fc]"
          >
            ✕
          </button>
        </div>

        {/* Name */}
        <label className="block text-sm text-[#c9d1d9] mb-1">
          Habit name
        </label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-4 rounded-md bg-[#0d1117] border border-[#30363d] px-3 py-2 text-sm text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-[#58a6ff]"
          placeholder="e.g. Workout"
        />

        {/* Icon picker */}
        <div className="mb-4">
          <p className="text-sm text-[#c9d1d9] mb-2">Icon</p>
          <div className="flex gap-2 flex-wrap">
            {ICONS.map(i => (
              <button
                key={i}
                onClick={() => setIcon(i)}
                className={`w-9 h-9 flex items-center justify-center rounded-md border text-lg ${icon === i
                    ? "border-[#58a6ff] bg-[#21262d]"
                    : "border-[#30363d] hover:bg-[#21262d]"
                  }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* Preset colors */}
        <div className="mb-3">
          <p className="text-sm text-[#c9d1d9] mb-2">Color</p>
          <div className="grid grid-cols-8 gap-2">
            {HABIT_COLORS.map(c => (
              <button
                key={c}
                onClick={() => {
                  setColor(c);
                  setCustomHex("");
                  setHexError("");
                }}
                className={`w-6 h-6 rounded-sm border ${color === c ? "border-white" : "border-[#30363d]"
                  }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Custom hex */}
        <div className="mb-5">
          <p className="text-sm text-[#c9d1d9] mb-1">
            Custom hex
          </p>

          <div className="flex items-center gap-2">
            <input
              value={customHex}
              onChange={e => handleHexChange(e.target.value)}
              placeholder="#22c55e"
              className="flex-1 rounded-md bg-[#0d1117] border border-[#30363d] px-3 py-2 text-sm text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-[#58a6ff]"
            />

            {/* Preview */}
            <div
              className="w-8 h-8 rounded border border-[#30363d]"
              style={{
                backgroundColor:
                  isValidHex(customHex) ? customHex : "transparent",
              }}
            />
          </div>

          {hexError && (
            <p className="text-xs text-red-400 mt-1">
              {hexError}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm px-3 py-1 rounded-md border border-[#30363d] text-[#c9d1d9] hover:bg-[#21262d]"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="text-sm px-3 py-1 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white"
          >
            Add habit
          </button>
        </div>
      </div>
    </div>
  );
}

function isValidHex(value) {
  return /^#([0-9a-fA-F]{6})$/.test(value);
}
