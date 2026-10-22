import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { OWNER_PROFILE } from "@/lib/constants";
import { IntroLoader, IntroProvider } from "@/components/ui/IntroLoader";
import { WaterCursor } from "@/components/ui/WaterCursor";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: "italic",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F7FA" },
    { media: "(prefers-color-scheme: dark)", color: "#071322" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hamza Barki — Full-Stack Developer",
    template: "%s | Hamza Barki",
  },
  description:
    "I build websites, online stores, web apps and custom software for businesses, schools and startups.",
  keywords: [
    "Hamza Barki",
    "Full-Stack Developer",
    "Product Builder",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "TypeScript",
    "Custom Software",
    "Web Applications",
  ],
  authors: [{ name: OWNER_PROFILE.name }],
  creator: OWNER_PROFILE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Hamza Barki — Full-Stack Developer",
    description:
      "I build websites, online stores, web apps and custom software for businesses, schools and startups.",
    siteName: "Hamza Barki",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Barki — Full-Stack Developer",
    description:
      "I build websites, online stores, web apps and custom software for businesses, schools and startups.",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}}catch(e){}})();(function(){try{var p=new URLSearchParams(window.location.search);var f=p.get("intro")==="1";var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var s=sessionStorage.getItem("intro_seen");if(!r&&(f||!s)){document.documentElement.setAttribute("data-intro","play");}else{document.documentElement.setAttribute("data-intro","skip");}}catch(e){document.documentElement.setAttribute("data-intro","skip");}})();`,
          }}
        />
        <noscript>
          <style>{`
            #intro-loader-root { display: none !important; }
            section[aria-label="Hero Introduction"] * {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className="min-h-screen min-h-[100svh] bg-surface-base text-ink antialiased selection:bg-brand-navy selection:text-brand-yellow">
        <IntroProvider>
          <IntroLoader />
          <WaterCursor />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-brand-yellow focus:text-[#0B1F38] focus:font-bold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            Skip to main content
          </a>
          {children}
        </IntroProvider>
      </body>
    </html>
  );
}
