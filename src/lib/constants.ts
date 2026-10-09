/**
 * Verified Owner Profile & Portfolio Constants
 * Strictly reflects verified information provided by the owner.
 */

export const OWNER_PROFILE = {
  name: "Hamza Barki",
  title: "Full-Stack Developer",
  tagline: "Building digital products that solve real business problems — from idea to deployment.",
  location: "Peshawar, Pakistan",
  education: {
    degree: "BS Computer Science",
    institution: "University of Peshawar",
    status: "Final Year (7th Semester)",
  },
  training: [
    {
      title: "Full-Stack Web Development",
      organization: "Saylani Mass IT Training (SMIT)",
      status: "Completed",
    },
  ],
  journey: {
    started: 2021,
    professionalFocus: 2025,
    approxProjects: 20,
  },
  availability: {
    status: "Available for selected projects",
    badgeText: "Available for selected projects",
    isAvailable: true,
  },
  contacts: {
    email: "hamzabarki330@gmail.com",
    whatsapp: "https://wa.me/message/C7IX2L6KIRPDA1",
    whatsappDisplay: "+92 316 9363065", // from verified whatsapp link or format
    github: "https://github.com/hamza-barki",
    facebook: "https://web.facebook.com/profile.php?id=61573175301827",
  },
} as const;

export const NAV_LINKS = [
  { label: "Selected Work", href: "#work" },
  { label: "What I Build", href: "#capabilities" },
  { label: "How I Work", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const BRAND_COLORS = {
  navy: "#0B1F38",
  yellow: "#FFC107",
  blue: "#2E80FF",
  background: "#F5F7FA",
  textInk: "#1E293B",
  successGreen: "#00B87A",
} as const;
