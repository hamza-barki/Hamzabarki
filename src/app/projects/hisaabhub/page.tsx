import React from "react";
import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/projects/CaseStudyPage";
import { CASE_STUDIES } from "@/lib/projects-data";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "HisaabHub — Case Study",
  description:
    "A mobile-friendly web app for tracking customer balances, recording supplier transactions, and sending payment reminders by Hamza Barki.",
  alternates: {
    canonical: "/projects/hisaabhub",
  },
  openGraph: {
    title: "HisaabHub — Case Study | Hamza Barki",
    description:
      "A mobile-friendly web app for tracking customer balances, recording supplier transactions, and sending payment reminders by Hamza Barki.",
    url: "/projects/hisaabhub",
    type: "article",
    siteName: "Hamza Barki",
  },
  twitter: {
    card: "summary_large_image",
    title: "HisaabHub — Case Study | Hamza Barki",
    description:
      "A mobile-friendly web app for tracking customer balances, recording supplier transactions, and sending payment reminders by Hamza Barki.",
  },
};

export default function HisaabHubPage() {
  const project = CASE_STUDIES["hisaabhub"];
  if (!project) notFound();

  return <CaseStudyPage project={project} />;
}
