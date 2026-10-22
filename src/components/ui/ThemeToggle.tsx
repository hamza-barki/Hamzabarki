"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    if (nextIsDark) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {
        // Ignore localStorage access failures
      }
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {
        // Ignore localStorage access failures
      }
    }
  };

  const label = isDark ? "Switch to day mode" : "Switch to night mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      className={`group relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-[#CBD5E1] dark:border-[rgba(255,255,255,0.14)] bg-white dark:bg-[#0F1A2E] text-[#0F172A] dark:text-[#E6EDF7] hover:bg-slate-100 dark:hover:bg-[#15233D] transition-colors duration-200 active:scale-[0.94] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] dark:focus-visible:ring-[#7DB4FF] ${className}`}
    >
      {/* If not yet mounted, render fallback icon shell to prevent hydration mismatch */}
      {!mounted ? (
        <span className="w-5 h-5 opacity-0" />
      ) : isDark ? (
        <span className="inline-flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:scale-110 motion-reduce:transform-none">
          <Sun className="w-5 h-5 text-brand-yellow shrink-0" />
          {showLabel && <span className="text-base font-semibold ml-2">Switch to day mode</span>}
        </span>
      ) : (
        <span className="inline-flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12 group-hover:scale-110 motion-reduce:transform-none">
          <Moon className="w-5 h-5 text-[#0F172A] dark:text-white shrink-0" />
          {showLabel && <span className="text-base font-semibold ml-2">Switch to night mode</span>}
        </span>
      )}
    </button>
  );
}
