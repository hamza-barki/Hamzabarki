"use client";

import React, { useState } from "react";
import { LazyMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { Container } from "@/components/ui/Container";
import { OWNER_PROFILE } from "@/lib/constants";
import { TextReveal, AnimatedWord } from "@/components/ui/TextReveal";
import { ContactForm } from "@/components/home/ContactForm";
import { Copy, Check, ArrowUpRight, MessageCircle, Mail } from "lucide-react";

import domAnimation from "@/lib/motion-features";
const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OWNER_PROFILE.contacts.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API not available
      const textarea = document.createElement("textarea");
      textarea.value = OWNER_PROFILE.contacts.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="contact"
        className="py-20 sm:py-28 bg-[#F4F6F9] dark:bg-[#0E1B33] border-b border-[#BFDBFE] dark:border-white/10 transition-colors duration-250 motion-reduce:transition-none relative"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* ============================================================= */}
            {/* LEFT COLUMN: Overview, Direct Email, Metadata & Channels       */}
            {/* ============================================================= */}
            <div className="lg:col-span-6 space-y-8">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/40 text-xs font-mono font-semibold uppercase tracking-wider text-[#00875A] dark:text-[#00B87A] select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B87A] opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B87A]" />
                </span>
                <span>OPEN FOR CONTRACT &amp; FULL-TIME ROLES</span>
              </div>

              {/* Big Section Headline */}
              <div className="space-y-3">
                <h2 className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.05] break-words">
                  <TextReveal text="Let's build something" delay={0.05} />{" "}
                  <AnimatedWord delay={0.25} className="font-serif italic font-normal text-brand-navy dark:text-[#7DB4FF]">
                    meaningful.
                  </AnimatedWord>
                </h2>
                <p className="text-base sm:text-lg text-[#334155] dark:text-[#B6C2D6] leading-relaxed max-w-xl font-normal">
                  Have a project, idea, or opportunity in mind? Let&apos;s turn it into a thoughtful digital experience. Whether you need a full-scale web application, e-commerce store, or custom management system, I&apos;m ready to collaborate.
                </p>
              </div>

              {/* Direct Email Box with One-Click Copy */}
              <div className="p-5 rounded-2xl border border-[#CBD5E1] dark:border-white/15 bg-white dark:bg-[#0B1220] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8] tracking-wider uppercase">
                    DIRECT EMAIL //
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#CBD5E1] dark:border-white/20 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-xs font-mono font-semibold text-[#0F172A] dark:text-white transition-all active:scale-[0.96]"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#64748B] dark:text-[#94A3B8]" />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-1">
                  <a
                    href={OWNER_PROFILE.contacts.mailto}
                    className="text-lg sm:text-xl font-bold font-mono text-[#0F172A] dark:text-white hover:text-[#1D5FD6] dark:hover:text-[#7DB4FF] transition-colors break-all flex items-center gap-2 group"
                  >
                    <span>{OWNER_PROFILE.contacts.email}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                  <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-1 font-mono">
                    * Clicking opens your default mail client with prefilled template.
                  </p>
                </div>
              </div>

              {/* Metadata Table (Location, Timezone, SLA) */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm font-mono border-t border-[#CBD5E1] dark:border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1.5">
                  <span className="text-[#64748B] dark:text-[#94A3B8] font-semibold">LOCATION</span>
                  <span className="text-[#0F172A] dark:text-white font-medium">
                    {OWNER_PROFILE.metadata.location}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1.5 border-t border-[#CBD5E1]/60 dark:border-white/5">
                  <span className="text-[#64748B] dark:text-[#94A3B8] font-semibold">TIMEZONE</span>
                  <span className="text-[#0F172A] dark:text-white font-medium">
                    {OWNER_PROFILE.metadata.timezone}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1.5 border-t border-[#CBD5E1]/60 dark:border-white/5">
                  <span className="text-[#64748B] dark:text-[#94A3B8] font-semibold">SLA</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    {OWNER_PROFILE.metadata.sla}
                  </span>
                </div>
              </div>

              {/* Quick Action Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* WhatsApp Chat Button - Direct with Prefilled Text */}
                <a
                  href={OWNER_PROFILE.contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow text-[#0B1F38] hover:bg-brand-yellow-hover text-xs font-bold font-mono transition-all shadow-sm active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 text-[#0B1F38]" />
                  <span>WHATSAPP CHAT ↗</span>
                </a>

                {/* Email Client Link */}
                <a
                  href={OWNER_PROFILE.contacts.mailto}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#CBD5E1] dark:border-white/20 bg-white dark:bg-[#0B1220] hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-semibold font-mono text-[#0F172A] dark:text-white transition-all shadow-sm active:scale-[0.98]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#1D5FD6] dark:text-[#7DB4FF]" />
                  <span>EMAIL CLIENT ↗</span>
                </a>

                {/* GitHub */}
                <a
                  href={OWNER_PROFILE.contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#CBD5E1] dark:border-white/20 bg-white dark:bg-[#0B1220] hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-mono font-medium text-[#475569] dark:text-[#B6C2D6] transition-all"
                >
                  <span>GITHUB ↗</span>
                </a>

                {/* Facebook */}
                <a
                  href={OWNER_PROFILE.contacts.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#CBD5E1] dark:border-white/20 bg-white dark:bg-[#0B1220] hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-mono font-medium text-[#475569] dark:text-[#B6C2D6] transition-all"
                >
                  <span>FACEBOOK ↗</span>
                </a>
              </div>
            </div>

            {/* ============================================================= */}
            {/* RIGHT COLUMN: Terminal DISPATCH_MESSAGE.TS Contact Form       */}
            {/* ============================================================= */}
            <div className="lg:col-span-6 w-full">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
