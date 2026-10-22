import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductBuilderHero } from "@/components/hero/ProductBuilderHero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Capabilities } from "@/components/home/Capabilities";
import { HowIWork } from "@/components/home/HowIWork";
import { ToolsIUse } from "@/components/home/ToolsIUse";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { OWNER_PROFILE } from "@/lib/constants";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hamza Barki",
  jobTitle: "Full-Stack Developer",
  email: OWNER_PROFILE.contacts.email,
  sameAs: [
    OWNER_PROFILE.contacts.github,
    OWNER_PROFILE.contacts.facebook,
  ],
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen min-h-[100svh] flex-col bg-surface-base selection:bg-brand-navy selection:text-brand-yellow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (01)                                                      */}
        {/* ========================================================================= */}
        <ProductBuilderHero />

        {/* ========================================================================= */}
        {/* 2. SELECTED WORK (#work) (02)                                             */}
        {/* ========================================================================= */}
        <SelectedWork />

        {/* ========================================================================= */}
        {/* 3. WHAT I CAN BUILD (#capabilities) (03)                                  */}
        {/* ========================================================================= */}
        <Capabilities />

        {/* ========================================================================= */}
        {/* 4. HOW I WORK (#process) (04)                                             */}
        {/* ========================================================================= */}
        <HowIWork />

        {/* ========================================================================= */}
        {/* 5. THE TOOLS I USE (#stack) (05)                                          */}
        {/* ========================================================================= */}
        <ToolsIUse />

        {/* ========================================================================= */}
        {/* 6. ABOUT (#about) (06)                                                    */}
        {/* ========================================================================= */}
        <AboutSection />

        {/* ========================================================================= */}
        {/* 7. CONTACT (#contact)                                                     */}
        {/* ========================================================================= */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
