import React from "react";
import { OWNER_PROFILE, BRAND_COLORS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Mail, MessageCircle, Github, Facebook } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface-card py-12 transition-colors">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-border-subtle">
          {/* Identity column */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-lg font-bold text-brand-navy">
              {OWNER_PROFILE.name}
            </h3>
            <p className="text-sm text-ink-secondary max-w-sm leading-relaxed">
              {OWNER_PROFILE.tagline}
            </p>
            <p className="text-xs text-ink-muted">
              {OWNER_PROFILE.location} · {OWNER_PROFILE.education.degree}, {OWNER_PROFILE.education.institution}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-ink-muted">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#work" className="text-ink-secondary hover:text-brand-navy transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#capabilities" className="text-ink-secondary hover:text-brand-navy transition-colors">
                  What I Build
                </a>
              </li>
              <li>
                <a href="#process" className="text-ink-secondary hover:text-brand-navy transition-colors">
                  How I Work
                </a>
              </li>
              <li>
                <a href="#about" className="text-ink-secondary hover:text-brand-navy transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Verified Channels */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-ink-muted">
              Direct Channels
            </h4>
            <div className="flex flex-col space-y-2.5 text-sm">
              <a
                href={`mailto:${OWNER_PROFILE.contacts.email}`}
                className="inline-flex items-center gap-2.5 text-ink-secondary hover:text-brand-navy transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-blue" />
                <span>{OWNER_PROFILE.contacts.email}</span>
              </a>
              <a
                href={OWNER_PROFILE.contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-ink-secondary hover:text-brand-navy transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Direct Chat</span>
              </a>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={OWNER_PROFILE.contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-surface-muted text-ink-secondary hover:text-brand-navy hover:bg-border-subtle transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={OWNER_PROFILE.contacts.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-surface-muted text-ink-secondary hover:text-brand-navy hover:bg-border-subtle transition-colors"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>© {currentYear} {OWNER_PROFILE.name}. All rights reserved.</p>
          <p>Designed with intentional engineering and real project proof.</p>
        </div>
      </Container>
    </footer>
  );
}
