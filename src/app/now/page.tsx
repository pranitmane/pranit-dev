import { fetchPosts } from "@/lib/nowu"
import NowFeed from "./NowFeed"
import Socials from "@/components/Socials"

export const metadata = {
  title: "Nowu | Pranit",
  description: "What I'm up to right now.",
}

export default async function NowPage() {
  const { items, nextCursor } = await fetchPosts()

  return (
    <main className="min-h-screen bg-[#05080a] px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-2 font-mono text-2xl text-white">/now</h1>
        <p className="mb-10 font-mono text-sm text-gray-500">
          What I&apos;m up to right now.
        </p>
        <NowFeed initialPosts={items} initialNextCursor={nextCursor} />
        <Socials className="mt-16" />
      </div>
    </main>
  )
}
