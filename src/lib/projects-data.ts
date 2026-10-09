import { Project } from "@/types/project";

/**
 * Verified Project Data
 * Strictly factual: no fabricated revenue figures, no fake testimonials.
 */
export const PROJECTS: Project[] = [
  {
    id: "hadi-market-pos",
    slug: "hadi-market-pos",
    title: "Hadi Market POS",
    subtitle: "Enterprise Retail & Wholesale Management System",
    category: "Business System / POS",
    status: "production",
    statusLabel: "Installed & In Active Client Use",
    clientType: "Retail General Store / Supermarket",
    year: "2024–2025",
    summary:
      "A complete desktop-web Point of Sale and Inventory Management system built end-to-end to replace slow manual paper billing, track credit (Udhaar) ledgers, and streamline daily checkout with hardware barcode scanners and thermal printers.",
    problemStatement:
      "The client relied on manual bookkeeping and slow checkout calculation, leading to peak-hour cashier queues, unrecorded supplier credits, inventory stockouts, and risk of data loss on store power disruptions.",
    solutionOverview:
      "Engineered an offline-first, high-speed POS architecture with an Express & SQLite WAL backend, React fast billing interface with Enter-key workflows, automatic thermal receipt formatting, credit ledger tracking, and automated timestamped database backups.",
    verifiedHighlights: [
      "End-to-end custom build: architecture, REST API, UI, database, and client installation",
      "Native USB barcode gun integration supporting instant global keystroke parsing",
      "Thermal printer driver rules with CSS3 Paged Media (58mm, 80mm & A4 formats)",
      "Customer Udhaar (Credit) ledger with itemized transaction history",
      "Automated SQLite backup schedule with zero external database configuration",
      "Silent Windows background service launcher for store cashiers",
    ],
    verifiedFeatures: [
      {
        title: "High-Speed Cashier Terminal",
        description: "Optimized for fast keyboard-only checkout, rapid barcode addition, and 1-key receipt generation.",
        technicalDetail: "React 18 + Vite with custom Enter-key navigation flow and low-latency cart updates.",
      },
      {
        title: "Credit (Udhaar) Ledger System",
        description: "Records customer balances, partial cash settlements, and full debt histories.",
        technicalDetail: "SQL transactions with ACID compliance in SQLite 3 (WAL mode) ensuring financial consistency.",
      },
      {
        title: "Thermal Receipt Engine",
        description: "Prints cleanly formatted invoices directly to standard thermal receipt printers without external print drivers.",
        technicalDetail: "CSS3 Paged Media @media print rules tuned for 58mm & 80mm paper rolls.",
      },
      {
        title: "Role-Based Authentication",
        description: "Separates Admin controls (cost prices, reports, deletions) from Salesman operations (billing, returns).",
        technicalDetail: "JWT token authentication with Express middleware and BCrypt password hashing.",
      },
    ],
    techStack: [
      {
        category: "Frontend",
        tools: ["React 18", "Vite", "Tailwind CSS", "Lucide React"],
      },
      {
        category: "Backend",
        tools: ["Node.js", "Express.js", "JWT", "Bcrypt"],
      },
      {
        category: "Database",
        tools: ["SQLite 3 (WAL Mode)", "Automated Cron Backups"],
      },
      {
        category: "Hardware / Infra",
        tools: ["USB HID Barcode Guns", "58mm/80mm Thermal Printers", "Windows VBScript Runner"],
      },
    ],
    featured: true,
  },
  {
    id: "hisaabhub",
    slug: "hisaabhub",
    title: "HisaabHub",
    subtitle: "Shared Shop Account & Udhaar Management System",
    category: "Collaborative Web App",
    status: "deployed",
    statusLabel: "Deployed & Production Tested",
    clientType: "Small Businesses & Retail Shops",
    year: "2024",
    summary:
      "A mobile-first Progressive Web Application designed for shop owners and staff to manage shared receivables ('Wasool Karna Hai') and payables ('Dena Hai') in real time with dynamic audit trails and 1-tap WhatsApp payment reminders.",
    problemStatement:
      "Informal retail merchants struggle to coordinate credit balances between owners and multiple workers. Paper ledgers get misplaced, numbers conflict across shifts, and tracking payment follow-ups manually is time-consuming.",
    solutionOverview:
      "Designed a real-time ledger application featuring dynamic balance calculation from raw ledger transactions, role-based worker access, live Firestore synchronization across mobile and desktop devices, and automated WhatsApp reminder message generators.",
    verifiedHighlights: [
      "Dynamic ledger calculations guaranteeing balance integrity without manual totals",
      "Real-time multi-device synchronization via Firestore listeners (phone, tablet, PC)",
      "Role-Based Access Control (Admin vs. Staff) with instant worker deactivation",
      "1-tap WhatsApp polite reminder generator with exact balance and customer details",
      "Mobile-first PWA with installable home screen experience and bottom navigation",
      "Pre-seeded local demo mode alongside live Firebase cloud connection",
    ],
    verifiedFeatures: [
      {
        title: "Dynamic Ledger Calculation",
        description: "Automatically computes balances ('Wasool Karna Hai' and 'Dena Hai') directly from audited transaction events.",
        technicalDetail: "Calculated client-side and cloud-synced to prevent race conditions and accounting mismatch.",
      },
      {
        title: "Multi-Role Shop Operations",
        description: "Allows staff to record credit and collections while reserving deletions and financial summaries for owners.",
        technicalDetail: "Firebase Auth with Firestore security rules and audit stamps (createdBy, timestamp).",
      },
      {
        title: "1-Tap WhatsApp Reminders",
        description: "Generates personalized bilingual payment reminder notices ready to send with one click.",
        technicalDetail: "Encodes URL-safe WhatsApp deep links with customer name, outstanding debt, and polite phrasing.",
      },
    ],
    techStack: [
      {
        category: "Frontend",
        tools: ["React", "Tailwind CSS", "Vite", "PWA Manifest"],
      },
      {
        category: "Backend",
        tools: ["Firebase Auth", "Cloud Firestore", "Security Rules"],
      },
      {
        category: "Database",
        tools: ["Firestore Real-Time Listeners", "IndexedDB Offline Cache"],
      },
      {
        category: "Deployment",
        tools: ["Firebase Hosting", "PWA Installable"],
      },
    ],
    featured: true,
  },
  {
    id: "zuno",
    slug: "zuno",
    title: "ZUNO",
    subtitle: "Professional Services Marketplace Platform",
    category: "Marketplace Concept",
    status: "in-development",
    statusLabel: "Concept / In Development",
    clientType: "Service Marketplace Concept",
    year: "2025",
    summary:
      "A modern multi-sided marketplace concept connecting local home-service professionals (electricians, plumbers, repair technicians) with residential clients through transparent pricing, verified worker profiles, and scheduled booking workflows.",
    problemStatement:
      "Homeowners struggle to find vetted local service providers with transparent pricing, while skilled workers lack structured digital visibility to receive steady client inquiries.",
    solutionOverview:
      "Architecting a structured marketplace experience with role-based buyer/provider workflows, interactive service category discovery, and booking management pipelines.",
    verifiedHighlights: [
      "SMIT final-year capstone project currently under active development",
      "Multi-category service directory architecture",
      "User role separation for clients and registered trade professionals",
    ],
    verifiedFeatures: [
      {
        title: "Service Discovery Engine",
        description: "Categorized directory with service filtering, pricing indicators, and ratings.",
      },
      {
        title: "Booking & Inquiry Workflow",
        description: "Direct structured inquiry flow connecting customers with available tradespeople.",
      },
    ],
    techStack: [
      {
        category: "Frontend",
        tools: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "Backend",
        tools: ["Node.js / Serverless", "REST API"],
      },
    ],
    featured: false,
  },
];
