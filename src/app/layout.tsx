import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pranit.dev"),
  title: {
    default: "Pranit Mane | अनंत",
    template: "%s | Pranit Mane",
  },
  description:
    "Pranit Mane — builder & software engineer. Making phonedown, radial and maptym. Thinking out loud at /now.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pranit Mane",
    description:
      "Pranit Mane — builder & software engineer. Making phonedown, radial and maptym. Thinking out loud at /now.",
    url: "https://pranit.dev",
    siteName: "Pranit Mane",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pranit Mane",
    description:
      "Pranit Mane — builder & software engineer. Making phonedown, radial and maptym. Thinking out loud at /now.",
    creator: "@pranitbmane",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} grain antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Pranit Mane",
              url: "https://pranit.dev",
              sameAs: [
                "https://x.com/pranitbmane",
                "https://github.com/pranitmane",
                "https://youtube.com/@pranitmane",
              ],
              description:
                "Builder & software engineer. Making phonedown, radial and maptym.",
            }),
          }}
        />
        {children}

        {/* Microsoft Clarity */}
        <Script
          src="https://www.clarity.ms/tag/vgs7wkmltb"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
