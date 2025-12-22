"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddHabitModal from "@/components/AddHabitModal";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default function NavbarClient({ user }) {
    const [open, setOpen] = useState(false);
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
        router.refresh();
    }

    return (
        <>
            <header className="bg-[#161b22] border-b border-[#30363d]">
                <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
                    <span
                        onClick={() => router.push("/")}
                        className="text-sm font-semibold text-[#f0f6fc] cursor-pointer"
                    >
                        HabitTracker
                    </span>

                    {/* RIGHT SIDE */}
                    <div className="flex gap-2 items-center">
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
                </div>
            </header>

            {/* Modal only when logged in */}
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
