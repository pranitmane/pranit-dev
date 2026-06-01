import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://pranitmane.com"),
  title: {
    default: "Pranit Mane | अनंत",
    template: "%s | Pranit Mane",
  },
  description: "Pranit Mane — developer building stuff with code.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pranit Mane",
    description: "Pranit Mane — developer building stuff with code.",
    url: "https://pranitmane.com",
    siteName: "Pranit Mane",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pranit Mane",
    description: "Pranit Mane — developer building stuff with code.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Pranit Mane",
              url: "https://pranitmane.com",
              sameAs: [
                "https://x.com/pranitbmane",
                "https://github.com/pranitmane",
                "https://youtube.com/@pranitmane",
              ],
              description: "Developer building stuff with code.",
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
