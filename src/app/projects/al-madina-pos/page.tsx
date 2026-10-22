import React from "react";
import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/projects/CaseStudyPage";
import { CASE_STUDIES } from "@/lib/projects-data";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Al-Madina POS — Case Study",
  description:
    "A keyboard-first desktop system that handles counter checkout, customer credit records, and local data storage by Hamza Barki.",
  alternates: {
    canonical: "/projects/al-madina-pos",
  },
  openGraph: {
    title: "Al-Madina POS — Case Study | Hamza Barki",
    description:
      "A keyboard-first desktop system that handles counter checkout, customer credit records, and local data storage by Hamza Barki.",
    url: "/projects/al-madina-pos",
    type: "article",
    siteName: "Hamza Barki",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al-Madina POS — Case Study | Hamza Barki",
    description:
      "A keyboard-first desktop system that handles counter checkout, customer credit records, and local data storage by Hamza Barki.",
  },
};

export default function AlMadinaPosPage() {
  const project = CASE_STUDIES["al-madina-pos"];
  if (!project) notFound();

  return <CaseStudyPage project={project} />;
}
