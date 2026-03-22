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
  title: "अनंत",
  description: "Building stuff with code.",
  openGraph: {
    title: "Pranit Mane",
    description: "Building stuff with code.",
    url: "https://pranitmane.com",
    siteName: "Pranit Mane",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pranit Mane",
    description: "Building stuff with code.",
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
