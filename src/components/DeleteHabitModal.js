"use client";

export default function DeleteHabitModal({ habit, onClose, onDeleted }) {
  async function confirmDelete() {
    await fetch(`/api/habits/${habit.id}`, {
      method: "DELETE",
    });

    onDeleted();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="w-[360px] bg-[#161b22] border border-[#30363d] rounded-md p-5">
        <h2 className="text-sm font-semibold text-[#f0f6fc] mb-3">
          Delete habit
        </h2>

        <p className="text-sm text-[#c9d1d9] mb-5">
          Are you sure you want to delete{" "}
          <span className="font-medium">{habit.name}</span>?  
          This will remove all its entries permanently.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm rounded-md border border-[#30363d]"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
