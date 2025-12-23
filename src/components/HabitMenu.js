export default function HabitMenu({ onClose, onEdit, onAdd, onDelete }) {
  return (
    <div
      className="
        absolute top-12 right-4 z-40
        w-40 bg-[#161b22]
        border border-[#30363d]
        rounded-md shadow-lg text-sm
      "
    >
      <button
        onClick={onEdit}
        className="w-full px-3 py-2 text-left hover:bg-[#21262d]"
      >
        Edit habit
      </button>
      <button
        onClick={onAdd}
        className="w-full px-3 py-2 text-left hover:bg-[#21262d]"
      >
        Add entries
      </button>
      <button
        onClick={onDelete}
        className="w-full px-3 py-2 text-left text-red-500 hover:bg-[#21262d]"
      >
        Delete
      </button>
    </div>
  );
}
