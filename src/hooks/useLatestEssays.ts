import { useEffect, useRef, useState } from 'react'
import { RSS_TO_JSON_URL, SUBSTACK_FEED_URL } from '../lib/links'

export interface Essay {
  title: string
  hook: string
  href: string
}

type EssaysState = { status: 'loading' } | { status: 'error' } | { status: 'success'; essays: Essay[] }

const CACHE_KEY = 'latest-essays-cache-v1'
const CACHE_TTL_MS = 45 * 60 * 1000 // 45 minutes

interface CacheEntry {
  essays: Essay[]
  fetchedAt: number
}

interface RssToJsonItem {
  title: string
  link: string
  description: string
}

interface RssToJsonResponse {
  status: string
  items: RssToJsonItem[]
}

function toHook(raw: string, maxLen = 140): string {
  const stripped = raw
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
  if (stripped.length <= maxLen) return stripped
  return stripped.slice(0, maxLen).replace(/\s+\S*$/, '') + '…'
}

function readCache(): Essay[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry: CacheEntry = JSON.parse(raw)
    if (Date.now() - entry.fetchedAt > CACHE_TTL_MS) return null
    return entry.essays
  } catch {
    return null
  }
}

function writeCache(essays: Essay[]) {
  try {
    const entry: CacheEntry = { essays, fetchedAt: Date.now() }
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // sessionStorage unavailable (private browsing, etc.) -- not fatal, just skip caching
  }
}

/**
 * Fetches the 2 most recent posts from the real Substack publication feed
 * (via rss2json, since Substack's own feed doesn't send CORS headers for
 * direct browser fetches). Falls back to `{ status: 'error' }` on any
 * failure -- callers should render static fallback content in that case,
 * never a broken/empty state.
 */
export function useLatestEssays(): EssaysState {
  const [state, setState] = useState<EssaysState>(() => {
    const cached = readCache()
    return cached ? { status: 'success', essays: cached } : { status: 'loading' }
  })
  const hasCachedResult = useRef(state.status === 'success')

  useEffect(() => {
    if (hasCachedResult.current) return

    const controller = new AbortController()

    fetch(RSS_TO_JSON_URL(SUBSTACK_FEED_URL), { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`rss2json responded ${res.status}`)
        return res.json() as Promise<RssToJsonResponse>
      })
      .then((json) => {
        if (json.status !== 'ok' || !Array.isArray(json.items) || json.items.length < 2) {
          throw new Error('unexpected rss2json response shape')
        }
        const essays: Essay[] = json.items.slice(0, 2).map((item) => ({
          title: item.title,
          hook: toHook(item.description ?? ''),
          href: item.link,
        }))
        writeCache(essays)
        setState({ status: 'success', essays })
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        console.error('Failed to load latest essays', error)
        setState({ status: 'error' })
      })

    return () => controller.abort()
  }, [])

  return state
}
