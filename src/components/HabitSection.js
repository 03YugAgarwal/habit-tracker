"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Heatmap from "@/components/Heatmap";
import HabitMenu from "./HabitMenu";
import EditHabitModal from "./EditHabitModal";
import AddEntriesModal from "./AddEntriesModal";
import DeleteHabitModal from "./DeleteHabitModal";
import { useToast } from "./ToastManager";

export default function HabitSection({ habit, data }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { showToast } = useToast();
  const todayDone = data[data.length - 1]?.count > 0;

  function toggleToday() {
    startTransition(async () => {
      await fetch(`/api/habits/${habit.id}/toggle`, { method: "POST" });

      showToast(
        todayDone ? "Marked as undone" : "Marked as done",
        "success"
      );

      router.refresh();
    });
  }

  return (
    <>
      {/* Card */}
      <div
        role="button"
        tabIndex={0}
        onClick={toggleToday}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleToday();
          }
        }}
        className="
          relative w-full text-left rounded-md border px-4 py-3
          overflow-hidden cursor-pointer
          active:scale-[0.995] transition
        "
        style={{
          borderColor: habit.color,
          backgroundColor: `${habit.color}05`,
        }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{habit.icon}</span>
            <h2 className="text-sm font-medium text-[#f0f6fc]">
              {habit.name}
            </h2>
          </div>

          {/* Three dots menu */}
          <button
            onClick={e => {
              e.stopPropagation(); // 🔥 prevent card toggle
              setMenuOpen(true);
            }}
            className="text-[#8b949e] hover:text-[#f0f6fc]"
            aria-label="Habit options"
          >
            ⋯
          </button>
        </div>

        <Heatmap data={data} baseColor={habit.color} />
      </div>

      {/* Menu */}
      {menuOpen && (
        <HabitMenu
          onClose={() => setMenuOpen(false)}
          onEdit={() => setEditOpen(true)}
          onAdd={() => setAddOpen(true)}
          onDelete={() => setDeleteOpen(true)}
        />
      )}

      {/* Modals */}
      {editOpen && (
        <EditHabitModal
          habit={habit}
          onClose={() => setEditOpen(false)}
          onSaved={router.refresh}
        />
      )}

      {addOpen && (
        <AddEntriesModal
          habitId={habit.id}
          onClose={() => setAddOpen(false)}
          onSaved={router.refresh}
        />
      )}

      {deleteOpen && (
        <DeleteHabitModal
          habit={habit}
          onClose={() => setDeleteOpen(false)}
          onDeleted={router.refresh}
        />
      )}
    </>
  );
}
