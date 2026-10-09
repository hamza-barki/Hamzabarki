import React from "react";
import Link from "next/link";
import { OWNER_PROFILE, NAV_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { MessageCircle } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-surface-base/90 backdrop-blur-md transition-all">
      <Container className="flex h-20 items-center justify-between">
        {/* Brand Lockup */}
        <Link
          href="/"
          className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md"
        >
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-brand-navy group-hover:text-brand-blue transition-colors">
            {OWNER_PROFILE.name}
          </span>
          <span className="text-[12px] font-medium text-ink-muted tracking-wide -mt-0.5">
            {OWNER_PROFILE.title} · Peshawar
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-secondary hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-1.5 py-0.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Availability Indicator */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-800">
              {OWNER_PROFILE.availability.status}
            </span>
          </div>

          <a
            href={OWNER_PROFILE.contacts.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-brand-navy text-white text-xs font-medium hover:bg-brand-navy-700 transition-colors shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <MessageCircle className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Start a Project</span>
          </a>
        </div>
      </Container>
    </header>
  );
}
