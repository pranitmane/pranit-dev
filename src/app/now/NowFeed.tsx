"use client"
import { useEffect, useRef, useState } from "react"
import { loadMorePosts } from "./actions"
import type { Post } from "@/lib/nowu"

function PostCard({ post }: { post: Post }) {
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="border-b border-white/10 py-6">
      <p className="text-gray-300 font-mono text-sm whitespace-pre-wrap leading-relaxed">
        {post.content}
      </p>
      <time className="mt-3 block text-xs text-gray-500 font-mono">{date}</time>
    </article>
  )
}

interface NowFeedProps {
  initialPosts: Post[]
  initialNextCursor: number | null
}

export default function NowFeed({ initialPosts, initialNextCursor }: NowFeedProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [cursor, setCursor] = useState(initialNextCursor)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cursor || !sentinelRef.current) return
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || loading) return
      setLoading(true)
      const { items, nextCursor } = await loadMorePosts(cursor)
      setPosts((prev) => [...prev, ...items])
      setCursor(nextCursor)
      setLoading(false)
    })
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [cursor, loading])

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.uid} post={post} />
      ))}
      <div ref={sentinelRef} />
      {loading && (
        <p className="py-6 text-center text-xs text-gray-500 font-mono">Loading...</p>
      )}
      {!cursor && !loading && posts.length > 0 && (
        <p className="py-6 text-center text-xs text-gray-500 font-mono">— end —</p>
      )}
    </>
  )
}
