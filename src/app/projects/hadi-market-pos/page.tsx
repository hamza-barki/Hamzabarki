import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ArrowLeft, CheckCircle2, Terminal, Database, Cpu, MessageCircle } from "lucide-react";
import { PROJECTS } from "@/lib/projects-data";
import { OWNER_PROFILE } from "@/lib/constants";

export default function HadiMarketPosPage() {
  const project = PROJECTS.find((p) => p.slug === "hadi-market-pos")!;

  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <Container size="narrow">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-navy hover:text-brand-blue mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio Overview</span>
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="success">{project.statusLabel}</Badge>
              <span className="text-xs font-mono text-ink-muted">{project.year}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              {project.title}
            </h1>
            <p className="text-lg text-ink-secondary">{project.subtitle}</p>
          </div>

          {/* Executive Overview */}
          <div className="mt-10 p-6 rounded-xl bg-white border border-border-subtle shadow-subtle space-y-4">
            <h2 className="text-base font-bold text-brand-navy uppercase tracking-wider text-xs">
              Project Architecture Overview
            </h2>
            <p className="text-sm text-ink-secondary leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">The Business Problem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {project.problemStatement}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">The Technical Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {project.solutionOverview}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Verified Capabilities */}
          <div className="mt-10">
            <h3 className="text-lg font-bold text-brand-navy mb-4">
              Verified Technical Capabilities
            </h3>
            <div className="space-y-3">
              {project.verifiedFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-white border border-border-subtle shadow-subtle"
                >
                  <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                    {feat.title}
                  </h4>
                  <p className="text-xs text-ink-secondary mt-1">{feat.description}</p>
                  {feat.technicalDetail && (
                    <p className="text-[11px] font-mono text-brand-navy-600 mt-2 bg-brand-navy-50 p-2 rounded border border-brand-navy-100">
                      Technical Spec: {feat.technicalDetail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Breakdown */}
          <div className="mt-10 p-6 rounded-xl bg-brand-navy text-white space-y-4">
            <h3 className="text-base font-bold text-white">Full-Stack Technology Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {project.techStack.map((stack, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-surface-dark-card border border-brand-navy-700">
                  <p className="text-xs font-mono uppercase text-brand-yellow font-semibold">
                    {stack.category}
                  </p>
                  <p className="text-xs text-brand-navy-100 mt-1">
                    {stack.tools.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Next phase notice */}
          <div className="mt-12 p-5 rounded-lg border border-dashed border-border-strong text-center text-xs text-ink-muted">
            <p>
              [Phase 1 Architecture Shell] Full deep-dive case study with workflow diagrams, code breakdowns, and production screenshots will be fully implemented in the dedicated Case Study phase.
            </p>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
