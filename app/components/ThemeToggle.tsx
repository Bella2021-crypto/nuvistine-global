"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="rounded-full border border-[#C9A227] px-3 py-2 text-sm"
      >
        Theme
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="rounded-full border border-[#C9A227] px-3 py-2 text-sm transition hover:bg-[#C9A227] hover:text-white"
    >
      {theme === "dark" ? "☀ Light" : "☾ Dark"}
    </button>
  );
}