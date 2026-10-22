import React from "react";
import { OWNER_PROFILE, NAV_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Mail, MessageCircle, Github, Facebook } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#CBD5E1] dark:border-white/10 bg-[#F4F6F9] dark:bg-[#0B1220] py-12 transition-colors duration-250 motion-reduce:transition-none">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#CBD5E1] dark:border-white/10">
          {/* Identity column: name and role on the left */}
          <div className="md:col-span-5 space-y-2">
            <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">
              {OWNER_PROFILE.name}
            </h3>
            <p className="text-base text-[#334155] dark:text-[#B6C2D6]">
              Full-Stack Developer &amp; Product Builder
            </p>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
              {OWNER_PROFILE.education.degree} ({OWNER_PROFILE.education.status})
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold tracking-wider uppercase text-[#64748B] dark:text-[#94A3B8]">
              Navigation
            </h4>
            <ul className="space-y-1 text-base">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="min-h-[44px] min-w-[44px] inline-flex items-center text-[#334155] hover:text-[#0F172A] dark:text-[#B6C2D6] dark:hover:text-white transition-all duration-200 hover:translate-x-1 motion-reduce:transform-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center text-[#334155] hover:text-[#0F172A] dark:text-[#B6C2D6] dark:hover:text-white transition-all duration-200 hover:translate-x-1 motion-reduce:transform-none"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact channels */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-semibold tracking-wider uppercase text-[#64748B] dark:text-[#94A3B8]">
              Contact
            </h4>
            <div className="flex flex-col space-y-1 text-base">
              <a
                href={`mailto:${OWNER_PROFILE.contacts.email}`}
                className="group min-h-[44px] inline-flex items-center gap-2.5 text-[#334155] hover:text-[#0F172A] dark:text-[#B6C2D6] dark:hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 text-[#1D5FD6] dark:text-[#7DB4FF] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span className="break-all">{OWNER_PROFILE.contacts.email}</span>
              </a>
              <a
                href={OWNER_PROFILE.contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-h-[44px] inline-flex items-center gap-2.5 text-[#334155] hover:text-[#0F172A] dark:text-[#B6C2D6] dark:hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span>WhatsApp Direct Chat</span>
              </a>
              <div className="flex items-center gap-3 pt-3">
                <a
                  href={OWNER_PROFILE.contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-[#CBD5E1] dark:border-white/10 bg-white dark:bg-[#0F1A2E] text-[#0F172A] dark:text-white hover:text-[#1D5FD6] dark:hover:text-[#7DB4FF] hover:border-[#1D5FD6]/40 dark:hover:border-[#7DB4FF]/40 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.93] transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] motion-reduce:transform-none"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={OWNER_PROFILE.contacts.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-[#CBD5E1] dark:border-white/10 bg-white dark:bg-[#0F1A2E] text-[#0F172A] dark:text-white hover:text-[#1D5FD6] dark:hover:text-[#7DB4FF] hover:border-[#1D5FD6]/40 dark:hover:border-[#7DB4FF]/40 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.93] transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] motion-reduce:transform-none"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] dark:text-[#94A3B8]">
          <p>© {currentYear} {OWNER_PROFILE.name}. All rights reserved.</p>
          <p>Full-Stack Developer &amp; Product Builder.</p>
        </div>
      </Container>
    </footer>
  );
}
