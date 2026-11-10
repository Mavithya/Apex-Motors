'use client'

import { useCallback, useMemo, useSyncExternalStore } from 'react'

const KEY = 'apex-motors:wishlist'
const EVENT = 'apex-wishlist-change'
const EMPTY = '[]'
let memory = EMPTY

function snapshot() {
  try {
    return window.localStorage.getItem(KEY) ?? memory
  } catch {
    return memory
  }
}

function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw)
    return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === 'string'))] : []
  } catch {
    return []
  }
}

function subscribe(onChange: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key === KEY || event.key === null) {
      memory = EMPTY
      onChange()
    }
  }
  window.addEventListener(EVENT, onChange)
  window.addEventListener('storage', storage)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener('storage', storage)
  }
}

/** A stable empty server snapshot keeps persisted saves hydration-safe. */
export function useWishlist() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => EMPTY)
  const ids = useMemo(() => parse(raw), [raw])
  const toggle = useCallback((id: string) => {
    const current = parse(snapshot())
    memory = JSON.stringify(current.includes(id) ? current.filter((value) => value !== id) : [...current, id])
    try {
      window.localStorage.setItem(KEY, memory)
    } catch {
      // The same store continues working in memory when storage is unavailable.
    }
    window.dispatchEvent(new Event(EVENT))
  }, [])
  return { ids, has: (id: string) => ids.includes(id), toggle, count: ids.length }
}
