"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <button
      onClick={logout}
      className="
        text-sm
        text-[#c9d1d9]
        border border-[#30363d]
        rounded-md
        px-3 py-1
        hover:bg-[#21262d]
        hover:text-[#f0f6fc]
      "
    >
      Logout
    </button>
  );
}
