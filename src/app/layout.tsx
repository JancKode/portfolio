import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { SiteNav } from "@/components/site-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { siteUrl } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jan Cyngynn Kristoffer Frigillana — Senior Software Engineer",
  description:
    "Senior Software Engineer specialising in AI systems and automation. 9+ years building production web applications.",
  openGraph: {
    title: "Jan Cyngynn Kristoffer Frigillana — Senior Software Engineer",
    description:
      "Senior Software Engineer specialising in AI systems and automation. 9+ years building production web applications.",
    url: siteUrl,
    siteName: "jckfrigillana.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: next-themes stamps the theme class on <html>
    // pre-paint, so the server markup intentionally differs.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Motion bakes its hidden `initial` state into server HTML; only
            Motion's own runtime ever un-hides it. <noscript> content is
            inert once JS runs, so this fallback is invisible to hydrated
            visitors and only fires when the showcase would otherwise stay
            blank (issue #12, user story 6). */}
        <noscript>
          <style>{`[data-motion-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-contrast focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-contrast"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <MotionProvider>
            <SiteNav />
            {children}
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
