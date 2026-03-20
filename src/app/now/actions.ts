"use server"
import { fetchPosts } from "@/lib/nowu"

export async function loadMorePosts(cursor: number) {
  return fetchPosts(cursor)
}
