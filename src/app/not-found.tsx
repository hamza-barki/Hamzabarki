import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen min-h-[100svh] flex items-center justify-center bg-surface-base dark:bg-[#071322] px-4 text-ink transition-colors">
      <Container size="narrow" className="text-center space-y-6">
        <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-brand-blue dark:text-brand-yellow bg-brand-navy-50 dark:bg-brand-navy-900 px-3.5 py-1.5 rounded-full border border-border-subtle">
          404 — Page Not Found
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy dark:text-white tracking-tight">
          Page not found.
        </h1>

        <p className="text-base text-ink-secondary dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="min-h-[44px] inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-brand-navy text-white hover:bg-brand-navy-700 dark:bg-brand-yellow dark:text-[#0B1F38] dark:hover:bg-brand-yellow-hover text-base font-bold transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <ArrowLeft className="w-5 h-5 text-brand-yellow dark:text-[#0B1F38]" />
            <span>Return to home page</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
