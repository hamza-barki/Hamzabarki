"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LazyMotion, AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { OWNER_PROFILE, NAV_LINKS } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MessageCircle, Menu, X } from "lucide-react";

const loadFeatures = () => import("@/lib/motion-features").then((res) => res.default);
const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track window scroll position to smoothly morph navbar into floating capsule
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to track active section for nav link highlight
  useEffect(() => {
    const sectionIds = ["work", "capabilities", "process", "stack", "about"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close menu on Escape key press without trapping focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <LazyMotion features={loadFeatures}>
      <header
        className={`sticky top-0 z-50 w-full flex justify-center pointer-events-none transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? "pt-2.5 sm:pt-3.5 pb-1 px-3 sm:px-4" : "pt-0 pb-0 px-0"
        }`}
      >
        <div
          className={`relative pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? "w-[94%] sm:w-[86%] lg:w-[80%] max-w-6xl h-12 sm:h-12 rounded-full border border-[#CBD5E1]/90 dark:border-[rgba(255,255,255,0.18)] bg-[#F4F6F9]/92 dark:bg-[#0B1220]/92 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)] px-3.5 sm:px-6"
              : "w-full max-w-full h-20 rounded-none border-b border-[#CBD5E1] dark:border-[rgba(255,255,255,0.14)] bg-[#F4F6F9]/95 dark:bg-[#0B1220]/95 backdrop-blur-md shadow-none px-4 sm:px-8 lg:px-12"
          }`}
        >
          {/* Internal Content Container */}
          <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
            {/* Brand Lockup */}
            <Link
              href="/"
              className="group flex flex-col justify-center min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] rounded-full px-1.5 shrink-0 active:scale-[0.98] transition-transform"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span
                className={`font-extrabold tracking-tight text-[#0F172A] dark:text-[#E6EDF7] group-hover:text-[#1D5FD6] dark:group-hover:text-[#7DB4FF] transition-all duration-300 whitespace-nowrap ${
                  isScrolled ? "text-sm sm:text-base" : "text-lg sm:text-xl"
                }`}
              >
                {OWNER_PROFILE.name}
              </span>
              <span
                className={`transition-all duration-300 font-medium text-[#475569] dark:text-[#94A3B8] tracking-wide -mt-0.5 whitespace-nowrap ${
                  isScrolled ? "hidden" : "hidden sm:block text-[12px]"
                }`}
              >
                Full-Stack Developer &amp; Product Builder
              </span>
            </Link>

            {/* Desktop Navigation - Capsule Buttons with Light Blue Active Highlighting */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] rounded-full whitespace-nowrap inline-flex items-center justify-center ${
                      isScrolled
                        ? "text-xs px-3 py-1 min-h-[30px]"
                        : "text-sm px-4 py-1.5 min-h-[36px]"
                    } ${
                      isActive
                        ? "bg-[#DCEBFF] text-[#124BBA] border border-[#BFDBFE] dark:bg-[#142C4F] dark:text-[#93C5FD] dark:border-[rgba(147,197,253,0.35)] font-bold shadow-sm"
                        : "text-[#334155] hover:text-[#0F172A] dark:text-[#B6C2D6] dark:hover:text-[#E6EDF7] hover:bg-[#CBD5E1]/35 dark:hover:bg-white/10 font-medium border border-transparent"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right CTA & Theme Toggle (Capsule Shaped) */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Day / Night Theme Toggle */}
              <ThemeToggle
                className={
                  isScrolled
                    ? "w-8 h-8 sm:w-8.5 sm:h-8.5 min-w-[32px] min-h-[32px]"
                    : "w-10 h-10 min-w-[40px] min-h-[40px]"
                }
              />

              {/* Start a Project CTA Button - Capsule Shape */}
              <a
                href={OWNER_PROFILE.contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`group hidden lg:inline-flex items-center gap-1.5 rounded-full bg-[#0F172A] text-white font-semibold hover:bg-[#1E293B] dark:bg-[#E6EDF7] dark:text-[#0F172A] dark:hover:bg-white transition-all duration-300 shadow-subtle hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] whitespace-nowrap active:scale-[0.97] ${
                  isScrolled ? "h-8 sm:h-8.5 px-3.5 text-xs" : "h-10 sm:h-11 px-5 text-xs"
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-white dark:text-[#0F172A] transition-transform duration-200 group-hover:scale-110" />
                <span>Start a Project</span>
              </a>

              {/* Mobile Menu Button - Capsule Circle (Min 40px Tap Target) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                className={`lg:hidden inline-flex items-center justify-center rounded-full border border-[#CBD5E1] dark:border-[rgba(255,255,255,0.14)] bg-white dark:bg-[#0F1A2E] text-[#0F172A] dark:text-[#E6EDF7] hover:bg-slate-100 dark:hover:bg-[#15233D] transition-all duration-300 active:scale-[0.93] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] ${
                  isScrolled
                    ? "w-8 h-8 sm:w-8.5 sm:h-8.5 min-w-[32px] min-h-[32px]"
                    : "w-10 h-10 min-w-[40px] min-h-[40px]"
                }`}
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4 text-[#0F172A] dark:text-[#E6EDF7] transition-transform duration-200 rotate-90" />
                ) : (
                  <Menu className="w-4 h-4 text-[#0F172A] dark:text-[#E6EDF7] transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown Anchor */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <m.div
                id="mobile-navigation"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: -6 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -6 }}
                transition={{ duration: reducedMotion ? 0.05 : 0.22, ease: EASING }}
                className={`lg:hidden shadow-2xl ${
                  isScrolled
                    ? "absolute top-full mt-2.5 left-0 right-0 rounded-3xl border border-[#CBD5E1] dark:border-white/15 bg-[#F4F6F9]/98 dark:bg-[#0B1220]/98 backdrop-blur-xl overflow-hidden"
                    : "absolute top-full left-0 right-0 border-t border-[#CBD5E1] dark:border-[rgba(255,255,255,0.14)] bg-[#F4F6F9] dark:bg-[#0B1220] shadow-elevated overflow-hidden"
                }`}
              >
                <div className="px-5 py-4">
                  <nav aria-label="Mobile navigation" className="flex flex-col space-y-1.5">
                    {NAV_LINKS.map((link, idx) => {
                      const sectionId = link.href.replace("#", "");
                      const isActive = activeSection === sectionId;
                      return (
                        <m.a
                          key={link.href}
                          href={link.href}
                          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -8 }}
                          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                          transition={{
                            delay: reducedMotion ? 0 : 0.03 * idx,
                            duration: 0.22,
                            ease: EASING,
                          }}
                          aria-current={isActive ? "true" : undefined}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center min-h-[42px] px-5 py-2 rounded-full text-base whitespace-nowrap transition-all active:scale-[0.98] ${
                            isActive
                              ? "font-bold text-[#124BBA] bg-[#DCEBFF] border border-[#BFDBFE] dark:bg-[#142C4F] dark:text-[#93C5FD] dark:border-[rgba(147,197,253,0.35)] shadow-sm"
                              : "font-semibold text-[#334155] hover:text-[#0F172A] dark:text-[#B6C2D6] dark:hover:text-[#E6EDF7] hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
                          }`}
                        >
                          {link.label}
                        </m.a>
                      );
                    })}
                  </nav>

                  <div className="mt-3 pt-3 border-t border-[#CBD5E1] dark:border-white/10 flex flex-col gap-2.5">
                    {/* Mobile Theme Toggle */}
                    <ThemeToggle
                      showLabel
                      className="w-full justify-start px-5 min-h-[44px] h-11 rounded-full text-[#334155] hover:text-[#0F172A] dark:text-[#B6C2D6] dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
                    />

                    {/* Mobile CTA Button - Capsule Shape */}
                    <a
                      href={OWNER_PROFILE.contacts.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] h-11 w-full rounded-full bg-brand-yellow text-[#0B1F38] hover:bg-brand-yellow-hover text-sm font-bold transition-all shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy whitespace-nowrap active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4 text-[#0B1F38]" />
                      <span className="text-[#0B1F38] font-bold">Start a Project on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </LazyMotion>
  );
}
