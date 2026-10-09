import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { OWNER_PROFILE } from "@/lib/constants";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#0B1F38",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${OWNER_PROFILE.name} — ${OWNER_PROFILE.title}`,
    template: `%s | ${OWNER_PROFILE.name}`,
  },
  description: `${OWNER_PROFILE.tagline} Based in ${OWNER_PROFILE.location}. Real business systems, custom web applications, and database-connected solutions.`,
  keywords: [
    "Hamza Barki",
    "Full-Stack Developer",
    "Peshawar",
    "Next.js Developer",
    "React",
    "Node.js",
    "POS Systems",
    "Web Application Developer",
  ],
  authors: [{ name: OWNER_PROFILE.name }],
  creator: OWNER_PROFILE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hamzabarki.dev",
    title: `${OWNER_PROFILE.name} — ${OWNER_PROFILE.title}`,
    description: OWNER_PROFILE.tagline,
    siteName: `${OWNER_PROFILE.name} Portfolio`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body className="min-h-screen bg-surface-base text-ink antialiased selection:bg-brand-navy selection:text-brand-yellow">
        {children}
      </body>
    </html>
  );
}
