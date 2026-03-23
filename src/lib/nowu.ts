export interface Post {
  uid: string
  content: string
  createdAt: string // ISO timestamp
  origin: string    // e.g. "tg", "cli"
}

export interface Stats {
  visible: number
}

export interface PaginatedPosts {
  items: Post[]
  nextCursor: number | null
}

export async function fetchPosts(cursor = 0, limit = 50): Promise<PaginatedPosts> {
  const res = await fetch(
    `${process.env.NOWU_API_BASE_URL}/posts?limit=${limit}&cursor=${cursor}`,
    {
      headers: { Authorization: `Bearer ${process.env.NOWU_API_TOKEN}` },
      next: { revalidate: 60 },
    }
  )
  if (!res.ok) throw new Error(`fetchPosts failed: ${res.status}`)
  const data = await res.json()
  // API returns { posts: [...], nextCursor: number | null }
  return { items: data.posts ?? [], nextCursor: data.nextCursor ?? null }
}

export async function fetchStats(): Promise<Stats> {
  const res = await fetch(
    `${process.env.NOWU_API_BASE_URL}/posts/stats`,
    {
      headers: { Authorization: `Bearer ${process.env.NOWU_API_TOKEN}` },
      next: { revalidate: 60 },
    }
  )
  if (!res.ok) throw new Error(`fetchStats failed: ${res.status}`)
  const data = await res.json()
  return { visible: Number(data.visible) }
}
