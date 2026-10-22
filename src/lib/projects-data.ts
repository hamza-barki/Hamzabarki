import { CaseStudyProject } from "@/types/project";

export const CASE_STUDIES: Record<string, CaseStudyProject> = {
  "al-madina-pos": {
    id: "al-madina-pos",
    slug: "al-madina-pos",
    numberLabel: "Case study 01",
    title: "Al-Madina POS",
    typeLabel: "Local desktop management software",
    summary:
      "A keyboard-first desktop system that handles counter checkout, customer credit records, and local data storage.",
    facts: {
      role: "Full-Stack Developer",
      type: "Local desktop software",
      status: "Installed at a client's shop and in use",
      tools: "React 18, Node.js, Express, SQLite 3",
    },
    screenshot: {
      src: "/images/al-madina-pos-preview-clean.png",
      alt: "Al-Madina POS cashier checkout screen showing item lookup, item cart, and counter billing",
      chip: "Checkout screen",
      width: 1024,
      height: 470,
    },
    overview:
      "A billing and stock system I built for a real shop. It runs on the shop's own computer and is used for daily billing at the counter.",
    problem:
      "Billing was slow and done by hand. Prices, customer credit and stock were kept on paper, so mistakes were easy and records were hard to find.",
    whatIBuilt:
      "A fast cashier screen that works from the keyboard, a customer credit record, printable receipts and a low-stock warning. All data is stored in a local database on the same computer.",
    features: [
      "Fast billing from the keyboard",
      "Customer credit records",
      "Printable receipts",
      "Low-stock warnings",
    ],
    decisions: [
      {
        title: "A local SQLite database",
        description:
          "Shop data stays on the shop computer, so the system does not depend on a cloud service.",
      },
      {
        title: "A keyboard-first screen",
        description: "Cashiers can bill without reaching for the mouse.",
      },
      {
        title: "Barcode scanner input",
        description:
          "The scanner types like a keyboard, so it works with the normal input box.",
      },
      {
        title: "Printing through the browser",
        description: "Receipts print with the normal print window.",
      },
    ],
    nextProject: {
      slug: "hisaabhub",
      title: "HisaabHub",
    },
  },
  hisaabhub: {
    id: "hisaabhub",
    slug: "hisaabhub",
    numberLabel: "Case study 02",
    title: "HisaabHub",
    typeLabel: "Shared ledger web app",
    summary:
      "A mobile-friendly web app for tracking customer balances, recording supplier transactions, and sending payment reminders.",
    facts: {
      role: "Full-Stack Developer",
      type: "Shared ledger web app",
      status: "Live web app",
      tools: "React 19, Firebase, Tailwind CSS",
    },
    screenshot: {
      src: "/images/hisaabhub-preview.png",
      alt: "HisaabHub ledger dashboard showing total money to receive, total money to pay, and recent transactions",
      chip: "Ledger screen",
      width: 840,
      height: 681,
    },
    overview:
      "A web app for shop owners and partners to track daily credit balances. It is made to work well on a phone.",
    problem:
      "Customer and supplier balances were kept in paper notebooks. Partners and workers each had their own copy, so records did not match and reminders were slow.",
    whatIBuilt:
      "One shared ledger that updates for everyone at the same time. It keeps customer and supplier balances, opens ready-written payment reminders in WhatsApp, and has a simple shop diary and low-stock checklist.",
    features: [
      "Customer and supplier ledgers",
      "Live updates for everyone",
      "WhatsApp payment reminders",
      "Shop diary and low-stock checklist",
    ],
    decisions: [
      {
        title: "Firebase sign-in",
        description: "Only signed-in people can open the shop's records.",
      },
      {
        title: "Live updates",
        description:
          "A change shows on every phone without refreshing the page.",
      },
      {
        title: "Balances from entries",
        description: "Each balance is worked out from the saved entries.",
      },
      {
        title: "WhatsApp message links",
        description:
          "A ready-written message opens in WhatsApp and you tap send.",
      },
    ],
    nextProject: {
      slug: "al-madina-pos",
      title: "Al-Madina POS",
    },
  },
};

export const SELECTED_WORK_ITEMS = [
  {
    slug: "al-madina-pos",
    title: "Al-Madina POS",
    typeLabel: "Local desktop management software",
    tools: ["React 18", "Node.js", "Express", "SQLite 3"],
    screenshot: {
      src: "/images/al-madina-pos-preview-clean.png",
      alt: "Al-Madina POS checkout preview",
      width: 1024,
      height: 470,
    },
  },
  {
    slug: "hisaabhub",
    title: "HisaabHub",
    typeLabel: "Shared ledger web app",
    tools: ["React 19", "Firebase", "Tailwind CSS"],
    screenshot: {
      src: "/images/hisaabhub-preview.png",
      alt: "HisaabHub ledger dashboard preview",
      width: 840,
      height: 681,
    },
  },
];
