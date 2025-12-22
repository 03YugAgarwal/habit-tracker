"use client";

import { useState } from "react";
import { useToast } from "@/components/ToastManager";

export default function AddEntriesModal({ habitId, onClose, onSaved }) {
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);

  const { showToast } = useToast();

  async function submit() {
    if (!date) {
      showToast("Please select a date", "error");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/habits/${habitId}/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });

      if (!res.ok) {
        throw new Error();
      }

      showToast("Entry added successfully", "success");
      onSaved();
      onClose();
    } catch {
      showToast("Failed to add entry", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#161b22] border border-[#30363d] rounded-md p-5 w-[360px]">
        <h2 className="text-sm font-semibold mb-4 text-[#f0f6fc]">
          Add entry
        </h2>

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full mb-4 bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#c9d1d9]"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            type="button"
            className="px-3 py-1 text-sm rounded-md border border-[#30363d]"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={saving}
            className="bg-[#238636] px-3 py-1 rounded-md text-white text-sm disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
