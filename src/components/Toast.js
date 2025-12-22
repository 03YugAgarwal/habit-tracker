"use client";

import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles =
    type === "error"
      ? {
          bg: "bg-[#161b22]",
          border: "border-red-600",
          text: "text-red-400",
        }
      : {
          bg: "bg-[#161b22]",
          border: "border-green-600",
          text: "text-green-400",
        };

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50
        ${styles.bg}
        border ${styles.border}
        ${styles.text}
        text-sm
        px-4 py-3
        rounded-md
        shadow-lg
        animate-toast
      `}
    >
      {message}
    </div>
  );
}
