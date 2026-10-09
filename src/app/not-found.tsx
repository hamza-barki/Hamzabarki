import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-base px-4">
      <Container size="narrow" className="text-center space-y-6">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-blue bg-brand-navy-50 px-3 py-1 rounded-full border border-brand-navy-100">
          404 — Page Not Found
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy tracking-tight">
          The requested route does not exist.
        </h1>

        <p className="text-sm sm:text-base text-ink-secondary max-w-md mx-auto leading-relaxed">
          The page or project study you are looking for has been moved or is currently being structured.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-brand-navy text-white text-sm font-medium hover:bg-brand-navy-700 transition-colors shadow-subtle"
          >
            <ArrowLeft className="w-4 h-4 text-brand-yellow" />
            <span>Return to Portfolio Home</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
