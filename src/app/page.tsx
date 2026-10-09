import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductBuilderHero } from "@/components/hero/ProductBuilderHero";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { OWNER_PROFILE } from "@/lib/constants";
import { PROJECTS } from "@/lib/projects-data";
import { ArrowRight, CheckCircle2, MessageCircle, Mail } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION — Premium Interactive Product Builder & Identity System     */}
        {/* ========================================================================= */}
        <ProductBuilderHero />

        {/* ========================================================================= */}
        {/* SELECTED WORK — Real Client Project Proof                                 */}
        {/* ========================================================================= */}
        <section id="work" className="py-20 border-b border-border-subtle bg-white">
          <Container>
            <div className="max-w-2xl mb-12">
              <Badge variant="tech" className="mb-3">
                Verified Product Proof
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                Real Systems Built & Deployed
              </h2>
              <p className="text-base text-ink-secondary mt-2">
                Ground-truth software engineered for actual business operations, not generic template mockups.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {PROJECTS.filter((p) => p.featured).map((project) => (
                <Card key={project.id} className="flex flex-col justify-between border-border-medium hover:border-brand-navy transition-all duration-200">
                  <div>
                    <CardHeader>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge
                          variant={project.status === "production" ? "success" : "tech"}
                        >
                          {project.statusLabel}
                        </Badge>
                        <span className="text-xs font-mono text-ink-muted">
                          {project.year}
                        </span>
                      </div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.subtitle}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-ink-secondary leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Verified Highlights list */}
                      <div className="space-y-2 pt-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                          Key Verified Architectural Capabilities:
                        </p>
                        <ul className="space-y-1.5">
                          {project.verifiedHighlights.slice(0, 3).map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-ink">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack chips */}
                      <div className="pt-3 flex flex-wrap gap-1.5">
                        {project.techStack.flatMap((ts) => ts.tools).slice(0, 6).map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-muted text-ink-secondary border border-border-subtle"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </div>

                  <div className="p-6 pt-0 mt-4 border-t border-border-subtle flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy hover:text-brand-blue transition-colors"
                    >
                      <span>Explore Technical Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] text-ink-muted font-mono">
                      {project.clientType}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* HOW I WORK — Signature 5-Stage Lifecycle                                 */}
        {/* ========================================================================= */}
        <section id="process" className="py-20 border-b border-border-subtle bg-surface-base">
          <Container>
            <div className="max-w-2xl mb-12">
              <Badge variant="accent" className="mb-3">
                Methodology
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                How I Work: Idea to Deployment
              </h2>
              <p className="text-base text-ink-secondary mt-2">
                Every project follows a disciplined engineering progression designed to eliminate misunderstandings and guarantee operational stability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: "01",
                  title: "IDEA",
                  desc: "Understand the core business problem, workflows, and exact user constraints.",
                },
                {
                  step: "02",
                  title: "PLAN",
                  desc: "Structure data models, user roles, API routes, and required peripheral hardware.",
                },
                {
                  step: "03",
                  title: "DESIGN",
                  desc: "Develop intuitive, high-speed, distraction-free interfaces built for rapid real-world use.",
                },
                {
                  step: "04",
                  title: "BUILD",
                  desc: "Implement robust frontend code, RESTful backend services, and ACID-compliant databases.",
                },
                {
                  step: "05",
                  title: "DEPLOY",
                  desc: "Production release, client installation, automated backups, and operational testing.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-5 rounded-xl bg-white border border-border-subtle shadow-subtle flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-blue">
                      STAGE {item.step}
                    </span>
                    <h3 className="text-base font-bold text-brand-navy mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink-secondary mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* CONTACT BANNER — Clear Project Inquiry Conversion                        */}
        {/* ========================================================================= */}
        <section id="contact" className="py-20 bg-brand-navy text-white">
          <Container size="narrow" className="text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-700 border border-brand-navy-600 text-xs font-semibold text-brand-yellow">
              Available for selected projects
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Have a business problem that needs a reliable digital product?
            </h2>

            <p className="text-sm sm:text-base text-brand-navy-200 max-w-xl mx-auto leading-relaxed">
              Whether you need a custom retail management system, a cloud-connected web application, or a business website, let&apos;s discuss your requirements directly.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href={OWNER_PROFILE.contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-brand-yellow text-brand-navy font-bold hover:bg-brand-yellow-hover transition-colors shadow-glow"
              >
                <MessageCircle className="w-4 h-4 text-brand-navy" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`mailto:${OWNER_PROFILE.contacts.email}`}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-surface-dark-card border border-brand-navy-600 text-white font-medium hover:bg-brand-navy-700 transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-blue" />
                <span>{OWNER_PROFILE.contacts.email}</span>
              </a>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
