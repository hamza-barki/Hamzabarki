"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RotateCcw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen min-h-[100svh] flex items-center justify-center bg-surface-base dark:bg-[#071322] px-4 text-ink transition-colors">
      <Container size="narrow" className="text-center space-y-6">
        <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3.5 py-1.5 rounded-full border border-rose-200 dark:border-rose-900">
          Something went wrong
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy dark:text-white tracking-tight">
          An error occurred.
        </h1>

        <p className="text-base text-ink-secondary dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          The page could not be displayed properly. You can try refreshing the page or return to the home page.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="min-h-[44px] inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-brand-navy text-white hover:bg-brand-navy-700 dark:bg-brand-yellow dark:text-[#0B1F38] dark:hover:bg-brand-yellow-hover text-base font-bold transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <RotateCcw className="w-5 h-5 text-brand-yellow dark:text-[#0B1F38]" />
            <span>Try again</span>
          </button>

          <Link
            href="/"
            className="min-h-[44px] inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white dark:bg-surface-card text-brand-navy dark:text-white border border-border-medium dark:border-border-color hover:bg-surface-muted dark:hover:bg-brand-navy-700 text-base font-semibold transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <Home className="w-5 h-5 text-brand-blue" />
            <span>Return home</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
