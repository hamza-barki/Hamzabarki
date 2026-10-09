"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence, type Variants } from "framer-motion";
import { OWNER_PROFILE } from "@/lib/constants";
import {
  ArrowRight,
  MessageCircle,
  Database,
  Layers,
  Terminal,
  Server,
  Sparkles,
  Workflow,
} from "lucide-react";

/**
 * 5-Stage Product Lifecycle Model
 * Factual representation of Hamza Barki's engineering methodology,
 * strictly verified against source files in Hadi Market POS and HisaabHub.
 */
interface LifecycleStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  badge: string;
  problemOrGoal: string;
  technicalDeliverable: string;
  verifiedArtifact: string;
  icon: React.ElementType;
}

const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: "idea",
    step: "01",
    title: "IDEA",
    subtitle: "Problem Scoping",
    badge: "Operational Bottlenecks",
    problemOrGoal:
      "Map out cashier queues, unrecorded store credit, and inventory tracking needs.",
    technicalDeliverable:
      "User workflow definition, receipt requirements, and architecture scope.",
    verifiedArtifact: "Hadi Market POS & HisaabHub specifications",
    icon: Sparkles,
  },
  {
    id: "plan",
    step: "02",
    title: "PLAN",
    subtitle: "Architecture",
    badge: "Database & Peripherals",
    problemOrGoal:
      "Structure persistent local schemas and hardware communication protocols.",
    technicalDeliverable:
      "SQLite WAL schemas (POS) & Cloud Firestore data models (HisaabHub).",
    verifiedArtifact: "SQL foreign keys & Firestore real-time listeners",
    icon: Database,
  },
  {
    id: "design",
    step: "03",
    title: "DESIGN",
    subtitle: "Ergonomic UI",
    badge: "Speed-Oriented UX",
    problemOrGoal:
      "Design fast cashier checkout workflows centered on Enter-key navigation.",
    technicalDeliverable:
      "Tailwind responsive layout and CSS print rules for 58mm/80mm receipt rolls.",
    verifiedArtifact: "CSS3 Paged Media thermal printing formatting",
    icon: Layers,
  },
  {
    id: "build",
    step: "04",
    title: "BUILD",
    subtitle: "Implementation",
    badge: "Full-Stack Code",
    problemOrGoal:
      "Engineer reliable client interfaces and secure REST or cloud backend services.",
    technicalDeliverable:
      "React 18 + Node Express REST API (POS), React + Firebase (HisaabHub).",
    verifiedArtifact: "JWT authentication & dynamic ledger balance math",
    icon: Terminal,
  },
  {
    id: "deploy",
    step: "05",
    title: "DEPLOY",
    subtitle: "Client Setup",
    badge: "Operational Launch",
    problemOrGoal:
      "Deliver a stable desktop-web installation for local client store cashiers.",
    technicalDeliverable:
      "Windows silent background batch launcher and automated SQLite backup scripts.",
    verifiedArtifact: "Installed on client store system (Hadi Market POS)",
    icon: Server,
  },
];

export function ProductBuilderHero() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Tabs DOM reference array for roving tabIndex and keyboard navigation
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation strictly adhering to WAI-ARIA Tabs Design Pattern
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % LIFECYCLE_STAGES.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + LIFECYCLE_STAGES.length) % LIFECYCLE_STAGES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = LIFECYCLE_STAGES.length - 1;
    } else {
      return;
    }

    setActiveStageIndex(nextIndex);
    tabsRef.current[nextIndex]?.focus();
  };

  const activeStage = LIFECYCLE_STAGES[activeStageIndex];
  const IconComponent = activeStage.icon;

  // Staggered motion variants — zero motion when prefers-reduced-motion is active
  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
        duration: shouldReduceMotion ? 0 : 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      aria-label="Hero Introduction"
      className="relative pt-6 pb-14 sm:pt-10 sm:pb-18 md:pt-16 md:pb-24 overflow-hidden border-b border-border-subtle bg-gradient-to-b from-white via-surface-base/50 to-surface-base"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* =================================================================== */}
          {/* LEFT COLUMN: Value Proposition & Direct Conversion Path             */}
          {/* =================================================================== */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* 1. Identity & Availability Line */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy-50 border border-brand-navy-100 text-xs font-semibold text-brand-navy">
                <span className="w-2 h-2 rounded-full bg-brand-yellow shrink-0"></span>
                <span>{OWNER_PROFILE.title} · Peshawar, Pakistan</span>
              </span>

              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                <span className="relative flex h-2 w-2 shrink-0">
                  {!shouldReduceMotion && (
                    <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  )}
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{OWNER_PROFILE.availability.status}</span>
              </span>
            </motion.div>

            {/* 2. Primary Headline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy leading-[1.14]">
                I build digital products that solve{" "}
                <span className="text-brand-blue relative inline-block">
                  real business problems
                  <svg
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 w-full h-2 text-brand-yellow"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    fill="currentColor"
                  >
                    <path d="M0,8 Q50,0 100,8 L100,12 Q50,4 0,12 Z" />
                  </svg>
                </span>
                {" "}— from idea to deployment.
              </h1>
            </motion.div>

            {/* 3. Supporting Editorial Copy */}
            <motion.div variants={itemVariants}>
              <p className="text-sm sm:text-base md:text-lg text-ink-secondary leading-relaxed max-w-2xl">
                Helping store owners, founders, and teams transform operational requirements into dependable, fast, and production-ready software. From custom retail POS systems with hardware peripherals to real-time collaborative web applications.
              </p>
            </motion.div>

            {/* 4. Conversion Actions */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={OWNER_PROFILE.contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-lg bg-brand-navy text-white text-xs sm:text-sm font-semibold hover:bg-brand-navy-700 transition-all shadow-subtle hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                <MessageCircle className="w-4 h-4 text-brand-yellow" />
                <span>Start a Project</span>
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-2 h-11 sm:h-12 px-4 sm:px-5 rounded-lg bg-white text-brand-navy border border-border-medium text-xs sm:text-sm font-semibold hover:bg-surface-muted hover:border-brand-navy transition-all shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                <span>View Selected Work</span>
                <ArrowRight className="w-4 h-4 text-ink-secondary" />
              </a>
            </motion.div>

            {/* 5. Factual Ground-Truth Trust Cues */}
            <motion.div
              variants={itemVariants}
              className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 max-w-xl border-t border-border-subtle"
            >
              <div className="pt-2 sm:pt-3">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-ink-muted block">
                  Discipline
                </span>
                <span className="text-xs sm:text-sm font-bold text-brand-navy">
                  Full-Stack Architecture
                </span>
              </div>
              <div className="pt-2 sm:pt-3">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-ink-muted block">
                  Methodology
                </span>
                <span className="text-xs sm:text-sm font-bold text-brand-navy">
                  Idea → Deployment
                </span>
              </div>
              <div className="pt-2 sm:pt-3">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-ink-muted block">
                  Focus
                </span>
                <span className="text-xs sm:text-sm font-bold text-brand-green">
                  Business Systems & PWAs
                </span>
              </div>
            </motion.div>
          </div>

          {/* =================================================================== */}
          {/* RIGHT COLUMN: Signature Product-Builder Interactive Blueprint Visual */}
          {/* =================================================================== */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-brand-navy text-white rounded-2xl shadow-elevated border border-brand-navy-700 overflow-hidden">
              {/* Header: Neutral Professional Identity Lockup */}
              <div className="p-4 sm:p-5 bg-brand-navy-900/60 border-b border-brand-navy-700 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-brand-yellow shrink-0 bg-brand-navy-950">
                    <Image
                      src="/images/hamza.webp"
                      alt="Hamza Barki — Full-Stack Developer"
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-bold text-white tracking-tight block">
                      {OWNER_PROFILE.name}
                    </span>
                    <span className="text-xs text-brand-navy-200 block">
                      Full-Stack Developer · Peshawar
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 block mt-0.5">
                      Available for selected projects
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-navy-300 block">
                    Core Stack
                  </span>
                  <span className="text-xs font-mono font-medium text-brand-navy-100">
                    React · Node · SQL
                  </span>
                </div>
              </div>

              {/* Lifecycle Stage Switcher Strip */}
              <div className="px-4 sm:px-5 pt-4 pb-2.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-yellow flex items-center gap-1.5 font-semibold">
                    <Workflow className="w-3.5 h-3.5" />
                    <span>Product Lifecycle Workflow</span>
                  </span>
                  <span className="text-[10px] font-mono text-brand-navy-300">
                    Stage {activeStage.step}/05
                  </span>
                </div>

                {/* Keyboard Accessible WAI-ARIA Tablist with Stable aria-controls */}
                <div
                  role="tablist"
                  aria-label="Development lifecycle stages"
                  className="grid grid-cols-5 gap-1 p-1 rounded-lg bg-surface-dark-card border border-brand-navy-700"
                >
                  {LIFECYCLE_STAGES.map((stage, idx) => {
                    const isActive = idx === activeStageIndex;
                    return (
                      <button
                        key={stage.id}
                        ref={(el) => {
                          tabsRef.current[idx] = el;
                        }}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="lifecycle-stage-panel"
                        id={`stage-tab-${stage.id}`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => {
                          setActiveStageIndex(idx);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        className={`py-1.5 px-0.5 rounded text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                          isActive
                            ? "bg-brand-yellow text-brand-navy font-bold shadow-sm"
                            : "text-brand-navy-300 hover:text-white hover:bg-brand-navy-700/50"
                        }`}
                      >
                        <span className="block text-[9px] sm:text-[10px] font-mono leading-none">
                          {stage.step}
                        </span>
                        <span className="block text-[10px] sm:text-[11px] font-semibold tracking-tight mt-0.5 truncate">
                          {stage.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Single Stable WAI-ARIA Tabpanel referenced by all tabs */}
              <div
                id="lifecycle-stage-panel"
                role="tabpanel"
                aria-labelledby={`stage-tab-${activeStage.id}`}
                className="px-4 sm:px-5 pb-5 pt-1 min-h-[210px] flex flex-col justify-between"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage.id}
                    initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -6 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-brand-navy-700/70 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-brand-navy-800 text-brand-yellow border border-brand-navy-700 shrink-0">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">
                            Stage {activeStage.step}: {activeStage.subtitle}
                          </span>
                          <span className="text-[10px] font-mono text-brand-navy-200">
                            {activeStage.badge}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-navy-800 text-brand-navy-200 border border-brand-navy-700">
                        Engineering Phase
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2 sm:p-2.5 rounded-lg bg-brand-navy-900/60 border border-brand-navy-700/80">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-brand-navy-300 block">
                          Operational Focus
                        </span>
                        <p className="text-xs text-white mt-0.5 leading-relaxed">
                          {activeStage.problemOrGoal}
                        </p>
                      </div>

                      <div className="p-2 sm:p-2.5 rounded-lg bg-surface-dark-card border border-brand-navy-700/80">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-brand-yellow block">
                          Technical Architecture
                        </span>
                        <p className="text-xs text-brand-navy-100 mt-0.5 leading-relaxed">
                          {activeStage.technicalDeliverable}
                        </p>
                      </div>
                    </div>

                    <div className="pt-0.5 flex items-center justify-between text-[11px] font-mono text-brand-navy-300">
                      <span className="truncate pr-2">
                        {activeStage.verifiedArtifact}
                      </span>
                      <span className="text-brand-yellow shrink-0">
                        Production Focused
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Blueprint Footer Bar */}
              <div className="px-4 sm:px-5 py-2.5 bg-brand-navy-950 border-t border-brand-navy-700 flex items-center justify-between text-xs text-brand-navy-300 font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-green motion-reduce:animate-none"></span>
                  <span>Development Progression</span>
                </span>
                <a
                  href="#work"
                  className="text-brand-yellow hover:text-white transition-colors flex items-center gap-1 text-[11px] font-semibold focus-visible:outline-none focus-visible:underline"
                >
                  <span>Explore Case Studies</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
