"use client";

import { useState, useTransition, useEffect, useRef } from "react";
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

  const [localData, setLocalData] = useState(data);


  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { showToast } = useToast();
  const todayDone = data[data.length - 1]?.count > 0;

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);


  function toggleToday() {
    const todayIndex = localData.length - 1;

    setLocalData(prev => {
      const copy = [...prev];
      copy[todayIndex] = {
        ...copy[todayIndex],
        count: copy[todayIndex].count ? 0 : 1
      };
      return copy;
    });

    fetch(`/api/habits/${habit.id}/toggle`, { method: "POST" })
      .then(() =>
        showToast(
          todayDone ? "Marked as undone" : "Marked as done",
          "success"
        )
      )
      .catch(() => {
        showToast("Failed to update", "error");
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

        <Heatmap data={localData} baseColor={habit.color} />

        {/* Menu */}
        {menuOpen && (
          <div ref={menuRef}>
            <HabitMenu
              onEdit={() => {
                setMenuOpen(false);
                setEditOpen(true);
              }}
              onAdd={() => {
                setMenuOpen(false);
                setAddOpen(true);
              }}
              onDelete={() => {
                setMenuOpen(false);
                setDeleteOpen(true);
              }}
            />
          </div>
        )}
      </div>




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
