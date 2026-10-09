"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence, type Variants } from "framer-motion";
import { OWNER_PROFILE } from "@/lib/constants";
import {
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Terminal,
  Server,
  Zap,
  ShieldCheck,
  Workflow,
  Sparkles,
} from "lucide-react";

/**
 * 5-Stage Product Lifecycle Model
 * Factual representation of Hamza Barki's engineering methodology.
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
    subtitle: "Problem Definition",
    badge: "Operational Bottlenecks",
    problemOrGoal:
      "Pinpoint store queues, manual debt miscalculations, and inventory slippage.",
    technicalDeliverable:
      "User journey mapping, peripheral requirements, and scope boundaries.",
    verifiedArtifact: "Verified in Hadi Market POS & HisaabHub ledgers",
    icon: Sparkles,
  },
  {
    id: "plan",
    step: "02",
    title: "PLAN",
    subtitle: "System Architecture",
    badge: "Schema & Hardware Layer",
    problemOrGoal:
      "Design zero-latency local database models and hardware communication channels.",
    technicalDeliverable:
      "SQLite WAL schemas, USB HID keystroke parsing, and role permissions.",
    verifiedArtifact: "ACID transactions & real-time Firestore listeners",
    icon: Database,
  },
  {
    id: "design",
    step: "03",
    title: "DESIGN",
    subtitle: "Ergonomic Interface",
    badge: "Speed-First UX",
    problemOrGoal:
      "Craft high-speed cashier billing workflows with Enter-key navigation.",
    technicalDeliverable:
      "Tailwind responsive layout, thermal receipt paged media, bilingual Urdu/EN.",
    verifiedArtifact: "Tested on 58mm & 80mm thermal receipt printers",
    icon: Layers,
  },
  {
    id: "build",
    step: "04",
    title: "BUILD",
    subtitle: "Full-Stack Implementation",
    badge: "Production Codebase",
    problemOrGoal:
      "Develop reliable frontend clients and secure REST/cloud backend gateways.",
    technicalDeliverable:
      "React 18, Vite/Next.js, Node.js Express APIs, and JWT authentication.",
    verifiedArtifact: "Clean modular architecture with robust error boundaries",
    icon: Terminal,
  },
  {
    id: "deploy",
    step: "05",
    title: "DEPLOY",
    subtitle: "Client System Launch",
    badge: "Operational Reality",
    problemOrGoal:
      "Deliver a stable desktop/cloud setup that runs without technical intervention.",
    technicalDeliverable:
      "Silent background runners, automated timestamped database backup crons.",
    verifiedArtifact: "Installed on client store machine & in active use",
    icon: Server,
  },
];

export function ProductBuilderHero() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Subtle auto-advance cycle across stages (disabled when user hovers or prefers reduced motion)
  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;

    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % LIFECYCLE_STAGES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isPaused]);

  const activeStage = LIFECYCLE_STAGES[activeStageIndex];
  const IconComponent = activeStage.icon;

  // Staggered motion variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.45,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      aria-label="Hero Introduction"
      className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-border-subtle bg-gradient-to-b from-white via-surface-base/50 to-surface-base"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* =================================================================== */}
          {/* LEFT COLUMN: Editorial Value Proposition & Direct Conversion Path   */}
          {/* =================================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Identity & Availability Line */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy-50 border border-brand-navy-100 text-xs font-semibold text-brand-navy">
                <span className="w-2 h-2 rounded-full bg-brand-yellow"></span>
                <span>{OWNER_PROFILE.title} · Peshawar, Pakistan</span>
              </span>

              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                <span className="relative flex h-2 w-2">
                  {!shouldReduceMotion && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  )}
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{OWNER_PROFILE.availability.status}</span>
              </span>
            </motion.div>

            {/* 2. Main Expressive Headline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy leading-[1.12]">
                I build digital products that solve{" "}
                <span className="text-brand-blue relative inline-block">
                  real business problems
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-2 text-brand-yellow"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    fill="currentColor"
                  >
                    <path d="M0,8 Q50,0 100,8 L100,12 Q50,4 0,12 Z" />
                  </svg>
                </span>
                —from idea to deployment.
              </h1>
            </motion.div>

            {/* 3. Supporting Editorial Copy */}
            <motion.div variants={itemVariants}>
              <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl">
                Helping store owners, founders, and teams transform operational requirements into dependable, fast, and production-ready software. From custom retail POS systems with hardware peripherals to real-time collaborative web applications.
              </p>
            </motion.div>

            {/* 4. Primary & Secondary Conversion Actions */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href={OWNER_PROFILE.contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 h-12 px-6 rounded-lg bg-brand-navy text-white text-sm font-semibold hover:bg-brand-navy-700 transition-all shadow-subtle hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                <MessageCircle className="w-4 h-4 text-brand-yellow" />
                <span>Start a Project</span>
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-lg bg-white text-brand-navy border border-border-medium text-sm font-semibold hover:bg-surface-muted hover:border-brand-navy transition-all shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                <span>View Selected Work</span>
                <ArrowRight className="w-4 h-4 text-ink-secondary" />
              </a>
            </motion.div>

            {/* 5. Factual Ground-Truth Trust Cues */}
            <motion.div
              variants={itemVariants}
              className="pt-2 grid grid-cols-3 gap-3 max-w-xl border-t border-border-subtle"
            >
              <div className="pt-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted block">
                  Discipline
                </span>
                <span className="text-xs sm:text-sm font-bold text-brand-navy">
                  Full-Stack Architecture
                </span>
              </div>
              <div className="pt-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted block">
                  Methodology
                </span>
                <span className="text-xs sm:text-sm font-bold text-brand-navy">
                  Idea → Deployment
                </span>
              </div>
              <div className="pt-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted block">
                  Execution
                </span>
                <span className="text-xs sm:text-sm font-bold text-brand-green">
                  Installed & Active Systems
                </span>
              </div>
            </motion.div>
          </div>

          {/* =================================================================== */}
          {/* RIGHT COLUMN: Signature Product-Builder Interactive Blueprint Visual */}
          {/* =================================================================== */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none bg-brand-navy text-white rounded-2xl shadow-elevated border border-brand-navy-700 overflow-hidden">
              {/* Header: Verified Portrait & Software Builder Lockup */}
              <div className="p-5 sm:p-6 bg-brand-navy-900/60 border-b border-brand-navy-700 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-yellow shrink-0 bg-brand-navy-950">
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
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold text-white tracking-tight">
                        {OWNER_PROFILE.name}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                    </div>
                    <span className="text-xs text-brand-navy-200 block">
                      Product Builder · Peshawar
                    </span>
                    <span className="text-[11px] font-mono text-brand-yellow">
                      ● Active Client Projects
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-navy-300 block">
                    Core Stack
                  </span>
                  <span className="text-xs font-mono font-medium text-brand-navy-100">
                    Next · Node · SQL
                  </span>
                </div>
              </div>

              {/* Lifecycle Stage Switcher Tabs */}
              <div className="px-5 sm:px-6 pt-5 pb-3">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-yellow flex items-center gap-1.5 font-semibold">
                    <Workflow className="w-3.5 h-3.5" />
                    <span>Product Lifecycle Architecture</span>
                  </span>
                  <span className="text-[11px] font-mono text-brand-navy-300">
                    Stage {activeStage.step}/05
                  </span>
                </div>

                {/* Interactive 5-Step Strip */}
                <div
                  role="tablist"
                  aria-label="Development lifecycle stages"
                  className="grid grid-cols-5 gap-1.5 p-1 rounded-lg bg-surface-dark-card border border-brand-navy-700"
                >
                  {LIFECYCLE_STAGES.map((stage, idx) => {
                    const isActive = idx === activeStageIndex;
                    return (
                      <button
                        key={stage.id}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`stage-panel-${stage.id}`}
                        id={`stage-tab-${stage.id}`}
                        onClick={() => {
                          setActiveStageIndex(idx);
                          setIsPaused(true);
                        }}
                        className={`py-1.5 px-1 rounded text-center transition-all focus:outline-none focus:ring-1 focus:ring-brand-blue ${
                          isActive
                            ? "bg-brand-yellow text-brand-navy font-bold shadow-sm"
                            : "text-brand-navy-300 hover:text-white hover:bg-brand-navy-700/50"
                        }`}
                      >
                        <span className="block text-[10px] font-mono leading-none">
                          {stage.step}
                        </span>
                        <span className="block text-[11px] font-semibold tracking-tight mt-0.5 truncate">
                          {stage.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Stage Canvas Panel */}
              <div
                id={`stage-panel-${activeStage.id}`}
                role="tabpanel"
                aria-labelledby={`stage-tab-${activeStage.id}`}
                className="px-5 sm:px-6 pb-6 pt-1 min-h-[220px] flex flex-col justify-between"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage.id}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                    transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
                    className="space-y-3.5"
                  >
                    <div className="flex items-center justify-between border-b border-brand-navy-700/70 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded bg-brand-navy-800 text-brand-yellow border border-brand-navy-700">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">
                            Stage {activeStage.step}: {activeStage.subtitle}
                          </span>
                          <span className="text-[11px] font-mono text-brand-navy-200">
                            {activeStage.badge}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                        Verified Workflow
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg bg-brand-navy-900/60 border border-brand-navy-700/80">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-brand-navy-300 block">
                          Operational Challenge
                        </span>
                        <p className="text-xs text-white mt-0.5 leading-relaxed">
                          {activeStage.problemOrGoal}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-surface-dark-card border border-brand-navy-700/80">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-brand-yellow block">
                          Engineering Deliverable
                        </span>
                        <p className="text-xs text-brand-navy-100 mt-0.5 leading-relaxed">
                          {activeStage.technicalDeliverable}
                        </p>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-brand-navy-300">
                      <span className="flex items-center gap-1.5 truncate">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-green shrink-0" />
                        <span className="truncate">{activeStage.verifiedArtifact}</span>
                      </span>
                      <span className="text-brand-yellow shrink-0 pl-2">
                        Proof-First
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Blueprint Footer Bar */}
              <div className="px-5 sm:px-6 py-3 bg-brand-navy-950 border-t border-brand-navy-700 flex items-center justify-between text-xs text-brand-navy-300 font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                  <span>Architecture Verified</span>
                </span>
                <a
                  href="#work"
                  className="text-brand-yellow hover:text-white transition-colors flex items-center gap-1 text-[11px] font-semibold"
                >
                  <span>See Live Systems</span>
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
