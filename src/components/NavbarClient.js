"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddHabitModal from "@/components/AddHabitModal";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default function NavbarClient({ user }) {
  const [open, setOpen] = useState(false); // add habit modal
  const [menuOpen, setMenuOpen] = useState(false); // hamburger
  const router = useRouter();

  async function handleAdd(habit) {
    const res = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habit),
    });

    if (!res.ok) {
      console.error("Failed to create habit");
      return;
    }

    setOpen(false);
    setMenuOpen(false);
    router.refresh();
  }

  return (
    <>
      <header className="bg-[#161b22] border-b border-[#30363d]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <span
            onClick={() => router.push("/")}
            className="text-sm font-semibold text-[#f0f6fc] cursor-pointer"
          >
            HabitTracker
          </span>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-2 items-center">
            {user ? (
              <>
                <button
                  onClick={() => setOpen(true)}
                  className="text-sm px-3 py-1 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white"
                >
                  + Add habit
                </button>
                <Link
                  href="/dashboard"
                  className="text-sm px-3 py-1 rounded-md border border-[#30363d] hover:bg-[#21262d]"
                >
                  Dashboard
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm px-3 py-1 rounded-md border border-[#30363d] hover:bg-[#21262d]"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm px-3 py-1 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#c9d1d9] p-2 rounded hover:bg-[#21262d]"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#30363d] bg-[#161b22] px-4 py-3 space-y-2">
            {user ? (
              <>
                <button
                  onClick={() => {
                    setOpen(true);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left text-sm px-3 py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white"
                >
                  + Add habit
                </button>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm px-3 py-2 rounded-md border border-[#30363d] hover:bg-[#21262d]"
                >
                  Dashboard
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm px-3 py-2 rounded-md border border-[#30363d] hover:bg-[#21262d]"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm px-3 py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* Add Habit Modal */}
      {user && (
        <AddHabitModal
          open={open}
          onClose={() => setOpen(false)}
          onAdd={handleAdd}
        />
      )}
    </>
  );
}
