import Link from "next/link"
import { fetchPosts, fetchStats } from "@/lib/nowu"
import NowFeed from "./NowFeed"
import Socials from "@/components/Socials"

export const metadata = {
  title: "Now",
  description: "What Pranit Mane is up to right now.",
  alternates: {
    canonical: "/now",
  },
  openGraph: {
    title: "Now | Pranit Mane",
    description: "What Pranit Mane is up to right now.",
    url: "https://pranit.dev/now",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Now | Pranit Mane",
    description: "What Pranit Mane is up to right now.",
    creator: "@pranitbmane",
  },
}

export default async function NowPage() {
  const [{ items, nextCursor }, { visible }] = await Promise.all([
    fetchPosts(),
    fetchStats(),
  ])

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-16 sm:px-12">
      <div
        className="pointer-events-none absolute -top-60 left-1/2 h-120 w-120 -translate-x-1/2 rounded-full bg-accent/8 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-xl">
        <p className="font-mono text-xs text-faint">
          <Link href="/" className="text-accent transition-colors hover:text-foreground">
            pranit@dev
          </Link>
          :~$ tail -f thoughts
        </p>
        <h1 className="mb-2 mt-4 font-serif text-4xl italic text-foreground">now</h1>
        <p className="font-mono text-sm text-muted">
          what i&apos;m up to right now — raw, realtime.
        </p>
        <p className="mb-10 font-mono text-xs text-faint">{visible} posts</p>
        <NowFeed initialPosts={items} initialNextCursor={nextCursor} />
        <Socials className="mt-16" />
      </div>
    </main>
  )
}
