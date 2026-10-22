/**
 * Owner Profile & Portfolio Constants
 * Strictly reflects factual information provided by the owner.
 * Location-independent professional profile.
 */

export const WHATSAPP_BASE_URL = "https://wa.me/message/C7IX2L6KIRPDA1";
export const WHATSAPP_PREFILLED_MESSAGE =
  "Hi Hamza, I came across your portfolio and would like to discuss a project with you.";

export const getWhatsAppUrl = (message: string = WHATSAPP_PREFILLED_MESSAGE): string => {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
};

export const EMAIL_SUBJECT = "Project Inquiry — Hamza Barki Portfolio";
export const EMAIL_BODY_TEMPLATE =
  "Hi Hamza,\n\nI would like to discuss a new project with you.\n\nProject Scope:\nTimeline:\nEstimated Budget:\n\nLooking forward to speaking with you!";

export const getMailtoUrl = (
  subject: string = EMAIL_SUBJECT,
  body: string = EMAIL_BODY_TEMPLATE
): string => {
  return `mailto:hamzabarki330@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

export const OWNER_PROFILE = {
  name: "Hamza Barki",
  title: "Full-Stack Developer & Product Builder",
  tagline: "I build digital products that solve real business problems — from idea to deployment.",
  supportingCopy: "I build websites, online stores, web apps and custom software for businesses, schools and startups.",
  education: {
    degree: "BS Computer Science",
    status: "Final Year",
  },
  training: [
    {
      title: "Completed a Full-Stack Web Development course at SMIT",
      organization: "SMIT",
      status: "Completed",
    },
  ],
  availability: {
    status: "Available for selected projects.",
    badgeText: "Available for selected projects.",
    isAvailable: true,
  },
  metadata: {
    location: "Pakistan / Open to Remote Worldwide",
    timezone: "UTC+5 (PKT) — Flexible overlap with US, UK & EU",
    sla: "Responses within 24 hours",
  },
  contacts: {
    email: "hamzabarki330@gmail.com",
    whatsapp: getWhatsAppUrl(),
    whatsappRaw: WHATSAPP_BASE_URL,
    mailto: getMailtoUrl(),
    github: "https://github.com/hamza-barki",
    facebook: "https://web.facebook.com/profile.php?id=61573175301827",
  },
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Build", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
] as const;

export const BRAND_COLORS = {
  navy: "#0B1F38",
  yellow: "#FFC107",
  blue: "#2E80FF",
  background: "#F5F7FA",
  textInk: "#1E293B",
  successGreen: "#00B87A",
} as const;
