import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPersonJsonLd } from "@/lib/seo/json-ld";
import { rootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
});

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  ...rootMetadata,
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = buildPersonJsonLd();

  return (
    <html
      lang={rootMetadata.openGraph?.locale?.split("_")[0] ?? "en"}
      className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="llm" href="/llm.txt" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        <JsonLd data={personJsonLd} />
      </head>
      <body>
        <SkipLink />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
