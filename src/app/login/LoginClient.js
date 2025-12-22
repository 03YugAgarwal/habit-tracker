"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Toast from "@/components/Toast";

export default function LoginClient() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const [toast, setToast] = useState(null);
    const params = useSearchParams();

    useEffect(() => {
        if (params.get("reason") === "auth") {
            setToast({
                message: "You need to sign in to continue",
                type: "error",
            });
        }
    }, [params]);

    async function submit(e) {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const d = await res.json();
            setError(d.error || "Login failed");
            return;
        }
        setToast({
            message: "Signed in successfully",
            type: "success",
        });

        setTimeout(() => router.push("/dashboard"), 500);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117]">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <h1 className="text-2xl font-semibold text-[#f0f6fc] mb-6">
                Sign in to Habit Tracker
            </h1>

            <form
                onSubmit={submit}
                className="w-[340px] bg-[#161b22] border border-[#30363d] rounded-md p-4"
            >
                {error && (
                    <p className="text-sm text-red-400 mb-3">{error}</p>
                )}

                <label className="block text-sm font-medium text-[#c9d1d9] mb-1">
                    Email address
                </label>
                <input
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
                />

                <button className="w-full bg-[#238636] hover:bg-[#2ea043] text-white text-sm py-2 rounded-md">
                    Sign in
                </button>
            </form>

            <div className="w-[340px] mt-4 p-4 text-sm text-center bg-[#0d1117] border border-[#30363d] rounded-md">
                New here?{" "}
                <a href="/register" className="text-[#58a6ff] hover:underline">
                    Create an account
                </a>
            </div>
        </div>
    );
}
