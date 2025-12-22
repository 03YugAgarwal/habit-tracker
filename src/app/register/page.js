"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Registration failed");
      setLoading(false);
      return;
    }

    router.push("/login");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117]">
      <h1 className="text-2xl font-semibold text-[#f0f6fc] mb-6">
        Create your account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-[340px] bg-[#161b22] border border-[#30363d] rounded-md p-4"
      >
        {error && (
          <p className="text-sm text-red-400 mb-3">{error}</p>
        )}

        <label className="block text-sm font-medium text-[#c9d1d9] mb-1">
          Email address
        </label>
        <input
          type="email"
          className="
            w-full rounded-md
            bg-[#0d1117]
            border border-[#30363d]
            px-3 py-2 text-sm
            text-[#c9d1d9]
            placeholder:text-[#8b949e]
            focus:outline-none
            focus:ring-2
            focus:ring-[#58a6ff]
            mb-3
          "
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label className="block text-sm font-medium text-[#c9d1d9] mb-1">
          Password
        </label>
        <input
          type="password"
          className="
            w-full rounded-md
            bg-[#0d1117]
            border border-[#30363d]
            px-3 py-2 text-sm
            text-[#c9d1d9]
            placeholder:text-[#8b949e]
            focus:outline-none
            focus:ring-2
            focus:ring-[#58a6ff]
            mb-4
          "
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="
            w-full
            bg-[#238636]
            hover:bg-[#2ea043]
            text-white
            text-sm
            py-2
            rounded-md
            disabled:opacity-60
          "
        >
          {loading ? "Creating..." : "Sign up"}
        </button>
      </form>

      <div className="w-[340px] mt-4 p-4 text-sm text-center bg-[#0d1117] border border-[#30363d] rounded-md">
        Already have an account?{" "}
        <a href="/login" className="text-[#58a6ff] hover:underline">
          Sign in
        </a>
      </div>
    </div>
  );
}
