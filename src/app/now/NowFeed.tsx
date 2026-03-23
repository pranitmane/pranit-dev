"use client"
import { useEffect, useRef, useState } from "react"
import { loadMorePosts } from "./actions"
import type { Post } from "@/lib/nowu"

function formatTimestamp(createdAt: string): string {
  const diffMs = Date.now() - new Date(createdAt).getTime()
  const diffHours = diffMs / (1000 * 60 * 60)

  if (diffHours < 24) {
    if (diffMs < 3_600_000) return `${Math.floor(diffMs / 60_000)} min ago`
    return `${Math.floor(diffHours)} hrs ago`
  }

  const date = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata",
  })
  const time = new Date(createdAt).toLocaleTimeString("en-GB", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata",
  })
  return `${date}, ${time}`
}

function PostCard({ post }: { post: Post }) {
  const diffMs = Date.now() - new Date(post.createdAt).getTime()
  const isRecent = diffMs < 24 * 60 * 60 * 1000
  const [showAbsolute, setShowAbsolute] = useState(false)

  const absoluteTimeOnly = new Date(post.createdAt).toLocaleTimeString("en-GB", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata",
  })

  const timestampDisplay = isRecent
    ? (showAbsolute ? absoluteTimeOnly : formatTimestamp(post.createdAt))
    : formatTimestamp(post.createdAt)

  function handleAnchor() {
    history.pushState(null, "", `/now#${post.uid}`)
    document.getElementById(post.uid)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <article
      id={post.uid}
      className={`border-b border-white/10 py-6 ${!isRecent ? "cursor-pointer" : ""}`}
      onClick={!isRecent ? handleAnchor : undefined}
    >
      <p
        className="text-gray-300 font-mono text-sm whitespace-pre-wrap leading-relaxed cursor-pointer"
        onClick={isRecent ? (e) => { e.stopPropagation(); handleAnchor() } : undefined}
      >
        {post.content}
      </p>
      <time
        className={`mt-3 block text-xs text-gray-500 font-mono ${isRecent ? "cursor-pointer select-none" : ""}`}
        onClick={isRecent ? (e) => { e.stopPropagation(); setShowAbsolute((v) => !v) } : undefined}
      >
        {timestampDisplay} · {post.origin}
      </time>
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

  const scrolledToHash = useRef(false)

  useEffect(() => {
    const uid = window.location.hash.slice(1)
    if (!uid) { scrolledToHash.current = true; return }
    if (document.getElementById(uid)) { scrolledToHash.current = true; return } // browser handles natively
  }, [])

  useEffect(() => {
    if (scrolledToHash.current) return
    const uid = window.location.hash.slice(1)
    if (!uid) return
    const el = document.getElementById(uid)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      scrolledToHash.current = true
    }
  }, [posts])

  const loadingRef = useRef(false)

  useEffect(() => {
    if (!cursor || !sentinelRef.current) return
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || loadingRef.current) return
      loadingRef.current = true
      setLoading(true)
      try {
        const { items, nextCursor } = await loadMorePosts(cursor)
        setPosts((prev) => [...prev, ...items])
        setCursor(nextCursor)
      } finally {
        loadingRef.current = false
        setLoading(false)
      }
    })
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [cursor])

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
